import React, { useState } from "react";

interface CommentProps {
  onAddComment: (commentText: string) => void;
}

const Comment: React.FC<CommentProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  return (
    <div className="comment-section mt-4 flex space-x-2">
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Написать комментарий..."
        value={commentText}
        onChange={handleCommentChange}
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Отправить
      </button>
    </div>
  );
};

export default Comment;
