import React, { useState } from "react";
import { Avatar, Button, Typography, Input } from "@material-tailwind/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
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
  replies?: CommentData[];
}

interface CommentProps {
  comment: CommentData;
  onReply: (commentId: number, replyContent: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [reply, setReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState(2);
  const { token } = useAuth();

  const handleReply = () => {
    if (reply.trim()) {
      onReply(comment.id, reply);
      setReply("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-start space-x-4">
        {comment.user.profile_photo_path ? (
          <Avatar
            src={backEndURL + comment.user.profile_photo_path}
            alt={comment.user.name}
            size="sm"
          />
        ) : (
          <Avatar
            src={comment.user.profile_photo_url}
            alt={comment.user.name}
            size="sm"
          />
        )}
        <div>
          <Typography variant="h6">{comment.user.name}</Typography>
          <Typography variant="paragraph">{comment.content}</Typography>
          {comment.replies && comment.replies.length >= 0 && token && (
            <Button
              size="sm"
              variant="text"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </Button>
          )}
        </div>
      </div>
      {showReplyInput && (
        <div className="flex items-center mt-1 mb-3">
          <Input
            type="text"
            placeholder="Write a reply..."
            className="flex-grow"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button className="ml-2" onClick={handleReply}>
            <PaperAirplaneIcon className="w-4 h-4" />
          </Button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8">
          {comment.replies.slice(0, visibleReplies).map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
          {visibleReplies < comment.replies.length && (
            <Button
              size="sm"
              variant="text"
              color="blue"
              onClick={() => setVisibleReplies(visibleReplies + 2)}
            >
              See More Replies
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
