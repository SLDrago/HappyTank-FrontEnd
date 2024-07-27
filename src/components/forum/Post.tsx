import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Avatar,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  HeartIcon as HeartIconOutline,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BuildingStorefrontIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Comment from "./Comment";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface User {
  id: number;
  name: string;
  profile_photo_url: string;
  profile_photo_path: string;
}

interface CommentData {
  id: number;
  user: User;
  content: string;
  created_at: string;
  replies: CommentData[];
}

interface PostData {
  id: number;
  user: User;
  content: string;
  image_url: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  comments: CommentData[];
}

interface PostProps {
  post: PostData;
  updatePost: (post: PostData) => void;
}

const Post: React.FC<PostProps> = ({ post, updatePost }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(2);
  const { token, user } = useAuth();

  useEffect(() => {
    // Check if the post is already liked by the user
    const isLiked = post.likes.some((like) => like.user_id === user?.id);
    setLiked(isLiked);
  }, [post.likes, user?.id]);

  const handleLike = async () => {
    try {
      await axios.post(
        `${backEndURL}/api/posts/like`,
        { post_id: post.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(true);
      setLikesCount(likesCount + 1);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.post(
        `${backEndURL}/api/posts/unlike`,
        { post_id: post.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(false);
      setLikesCount(likesCount - 1);
    } catch (error) {
      console.error("Failed to unlike post:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `${backEndURL}/api/posts/addComments`,
          {
            post_id: post.id,
            content: newComment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedPost = {
          ...post,
          comments: [
            ...post.comments,
            {
              ...response.data,
              user: {
                id: user?.id,
                name: user?.name,
                profile_photo_url: user?.profile_photo_url,
                profile_photo_path: user?.profile_photo_path,
              },
            },
          ],
          comments_count: post.comments_count + 1,
        };

        updatePost(updatedPost);
        setNewComment("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  const handleReply = async (commentId: number, replyContent: string) => {
    if (replyContent.trim()) {
      try {
        const response = await axios.post(
          `${backEndURL}/api/posts/addComments`,
          {
            post_id: post.id,
            content: replyContent,
            parent_id: commentId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedPost = {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    ...response.data,
                    user: {
                      id: user?.id,
                      name: user?.name,
                      profile_photo_url: user?.profile_photo_url,
                      profile_photo_path: user?.profile_photo_path,
                    },
                  },
                ],
              };
            }
            return comment;
          }),
        };

        updatePost(updatedPost);
      } catch (error) {
        console.error("Failed to reply to comment:", error);
      }
    }
  };

  const urlify = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.split(urlPattern).map((part, index) =>
      urlPattern.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader
        shadow={false}
        floated={false}
        className="flex items-center space-x-4 p-4"
      >
        {post.user.profile_photo_path ? (
          <Avatar
            src={`${backEndURL}${post.user.profile_photo_path}`}
            alt={post.user.name}
            size="md"
          />
        ) : (
          <Avatar
            src={post.user.profile_photo_url}
            alt={post.user.name}
            size="md"
          />
        )}
        <div>
          <Typography variant="h5" className="flex items-center gap-2">
            {post.user.name}
            {post.user.role === "shop" ? (
              <BuildingStorefrontIcon className="h-5 w-5 text-gray-700" />
            ) : post.user.role === "user" ? (
              <UserIcon className="h-5 w-5 text-gray-700" />
            ) : null}
          </Typography>
          <Typography variant="small">
            {moment(post.created_at).format("YYYY-MM-DD h:mm A")}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <div className="p-4">
          {post.image_url ? (
            <Typography>{post.content}</Typography>
          ) : (
            <Typography
              variant="h3"
              className="text-center"
              style={{ wordBreak: "break-word" }}
            >
              {urlify(post.content)}
            </Typography>
          )}
        </div>
        {post.image_url && (
          <img
            src={backEndURL + post.image_url}
            alt="Post image"
            className="w-full object-cover"
          />
        )}
      </CardBody>
      <CardFooter className="pt-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button
              size="md"
              variant="text"
              className="flex items-center p-1"
              onClick={liked ? handleUnlike : handleLike}
            >
              {liked ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIconOutline className="w-5 h-5" />
              )}
              <span className="ml-1">{likesCount}</span>
            </Button>
            <Button
              size="md"
              variant="text"
              className="flex items-center p-1"
              onClick={() => setShowComments(!showComments)}
            >
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
              <span className="ml-1">{post.comments.length} Comments</span>
            </Button>
          </div>
          <Popover placement="top-end">
            <PopoverHandler>
              <Button size="md" variant="text" className="p-1">
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </Button>
            </PopoverHandler>
            <PopoverContent className="flex align-middle flex-col">
              <Button
                size="sm"
                variant="text"
                color="red"
                className="w-full flex items-center"
              >
                <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                Report
              </Button>
              <Button
                size="sm"
                variant="text"
                className="w-full flex items-center"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="text"
                color="red"
                className="w-full flex items-center"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-4 flex items-center">
          <Input
            type="text"
            placeholder="Add a comment..."
            className="flex-grow"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button className="ml-2" onClick={handleAddComment}>
            <PaperAirplaneIcon className="w-4 h-4" />
          </Button>
        </div>
        {showComments && (
          <div className="mt-4">
            {post.comments.slice(0, visibleComments).map((comment: any) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))}
            {visibleComments < post.comments.length && (
              <Button
                size="sm"
                variant="text"
                onClick={() => setVisibleComments(visibleComments + 3)}
              >
                See More Comments
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
