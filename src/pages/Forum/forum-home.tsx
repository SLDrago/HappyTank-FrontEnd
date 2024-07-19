import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Input,
  Avatar,
} from "@material-tailwind/react";
import {
  CameraIcon,
  PaperAirplaneIcon,
  HeartIcon as HeartIconOutline,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import DefaultLayout from "../../layout/default_layout";

// Mock data for initial posts
const initialPosts = [
  {
    id: 1,
    author: "John Doe",
    avatar:
      "https://ui-avatars.com/api/?name=J+D&color=7F9CF5&background=EBF4FF",
    content: "What's your favorite programming language and why?",
    image:
      "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?cs=srgb&dl=pexels-crisdip-35358-128756.jpg&fm=jpg",
    likes: 15,
    comments: [
      {
        id: 1,
        author: "Jane Smith",
        avatar:
          "https://ui-avatars.com/api/?name=J+S&color=7F9CF5&background=EBF4FF",
        content: "I love Python for its simplicity and versatility!",
        likes: 5,
        replies: [
          {
            id: 1,
            author: "Bob Johnson",
            avatar:
              "https://ui-avatars.com/api/?name=B+J&color=7F9CF5&background=EBF4FF",
            content: "Agreed! Python is great for beginners and experts alike.",
            likes: 2,
          },
        ],
      },
    ],
  },
];

const Comment = ({ comment, level = 0, onReply }) => {
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className={`mt-4 ${level > 0 ? "ml-6" : ""}`}>
      <div className="flex items-start">
        <Avatar src={comment.avatar} alt={comment.author} size="sm" />
        <div className="ml-3 flex-grow">
          <Typography variant="h6">{comment.author}</Typography>
          <Typography>{comment.content}</Typography>
          <div className="flex items-center mt-2">
            <Button
              size="sm"
              variant="text"
              className="flex items-center p-1"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <HeartIconSolid className="w-4 h-4 text-red-500" />
              ) : (
                <HeartIconOutline className="w-4 h-4" />
              )}
              <span className="ml-1">{comment.likes + (liked ? 1 : 0)}</span>
            </Button>
            <Button
              size="sm"
              variant="text"
              className="flex items-center ml-4 p-1"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
              <span className="ml-1">Reply</span>
            </Button>
          </div>
          {showReplyInput && (
            <div className="mt-2 flex items-center">
              <Input
                type="text"
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="flex-grow"
              />
              <Button className="ml-2" onClick={handleReply}>
                <PaperAirplaneIcon className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              level={level + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Post = ({ post, updatePost }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedPost = {
        ...post,
        comments: [
          ...post.comments,
          {
            id: Date.now(),
            author: "Current User",
            avatar:
              "https://ui-avatars.com/api/?name=C+U&color=7F9CF5&background=EBF4FF",
            content: newComment,
            likes: 0,
            replies: [],
          },
        ],
      };
      updatePost(updatedPost);
      setNewComment("");
    }
  };

  const handleReply = (commentId, replyContent) => {
    const updatedPost = {
      ...post,
      comments: post.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: Date.now(),
                author: "Current User",
                avatar:
                  "https://ui-avatars.com/api/?name=C+U&color=7F9CF5&background=EBF4FF",
                content: replyContent,
                likes: 0,
              },
            ],
          };
        }
        return comment;
      }),
    };
    updatePost(updatedPost);
  };

  return (
    <Card className="mb-6">
      <CardHeader
        shadow={false}
        floated={false}
        className="flex items-center space-x-4 p-4"
      >
        <Avatar src={post.avatar} alt={post.author} size="md" />
        <Typography variant="h5">{post.author}</Typography>
      </CardHeader>
      <CardBody className="p-0">
        <div className="p-4">
          <Typography>{post.content}</Typography>
        </div>
        <img
          src={post.image}
          alt="Post image"
          className="w-full object-cover"
        />
      </CardBody>
      <CardFooter className="pt-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button
              size="sm"
              variant="text"
              className="flex items-center p-1"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIconOutline className="w-5 h-5" />
              )}
              <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
            </Button>
            <Button
              size="sm"
              variant="text"
              className="flex items-center p-1"
              onClick={() => setShowComments(!showComments)}
            >
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
              <span className="ml-1">{post.comments.length} Comments</span>
            </Button>
          </div>
          <Button size="sm" variant="text" className="p-1">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </Button>
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
            {post.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const NewPostDialog = ({ open, handleOpen, addNewPost }) => {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        author: "Current User",
        avatar:
          "https://ui-avatars.com/api/?name=C+U&color=7F9CF5&background=EBF4FF",
        content: postContent,
        image:
          image ||
          "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?cs=srgb&dl=pexels-crisdip-35358-128756.jpg&fm=jpg",
        likes: 0,
        comments: [],
      };
      addNewPost(newPost);
      handleOpen();
      setPostContent("");
      setImage(null);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Create a New Post</DialogHeader>
      <DialogBody divider>
        <Textarea
          label="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows={4}
        />
        <div className="mt-4">
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="mt-4 max-w-full h-auto"
            />
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          <span>Post</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

const QuoraLikeForum = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [openNewPost, setOpenNewPost] = useState(false);

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto lg:px-72 py-8">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3">HappyTank Forum</Typography>
          <Button
            className="flex items-center"
            onClick={() => setOpenNewPost(true)}
          >
            <CameraIcon className="w-5 h-5 mr-2" />
            Create Post
          </Button>
        </div>
        {posts.map((post) => (
          <Post key={post.id} post={post} updatePost={updatePost} />
        ))}
        <NewPostDialog
          open={openNewPost}
          handleOpen={() => setOpenNewPost(!openNewPost)}
          addNewPost={addNewPost}
        />
      </div>
    </DefaultLayout>
  );
};

export default QuoraLikeForum;
