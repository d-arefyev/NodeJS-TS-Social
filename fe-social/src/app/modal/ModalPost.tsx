
// не работают корректно лайки комментов (NaN)
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModalPostConfirm from "../modal/ModalPostConfirm";
import Like from "../atoms/Like";
import CommentIcon from "../atoms/CommentIcon";
import EmojiPicker from "../components/EmojiPicker";
import parseData from "../helpers/parseData";
import EmojiIcon from "../atoms/EmojiIcon";
import LikeComment from "../atoms/LikeComment";
import usePostComments from "../hooks/usePostComments";
import type { Comment } from "../hooks/types";

interface ModalPostProps {
  post: {
    _id: string;
    caption: string;
    created_at: string;
    image_url: string;
    profile_image: string;
    user_name: string;
    user_id: string | { _id: string };
    likes_count: number;
    comments_count: number;
    last_comment?: string;
  };
  userProfile: {
    _id: string;
    user_name: string;
    profile_image: string;
    posts_count: number;
  };
  onClose: () => void;
}

// Типизация данных для счетчика лайков
interface LikesCounts {
  [key: string]: number;
}

const ModalPost: React.FC<ModalPostProps> = ({
  post,
  userProfile,
  onClose,
}: ModalPostProps) => {
  const [storedUserProfile, setStoredUserProfile] = useState<any>(null);
  const {
    comments: initialComments,
    newComment,
    setNewComment,
    likesCount: initialLikesCount,
    isLoading,
    handleAddComment,
    handlePostLikeChangeRequest,
    handleCommentLikeChange,
  } = usePostComments(post._id, storedUserProfile);

  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [likesCounts, setLikesCounts] = useState<LikesCounts>({});
  const [likesCount, setLikesCount] = useState<number>(
    isNaN(initialLikesCount) ? 0 : initialLikesCount
  );
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setStoredUserProfile(parsedUser);
      } catch (error) {
        console.error("Ошибка при парсинге данных из localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    setComments(initialComments || []);
    setLikesCount(isNaN(initialLikesCount) ? 0 : initialLikesCount); // Обновляем лайки при изменении данных
  }, [initialComments, initialLikesCount]);

  // Обработчик лайков поста
  const handlePostLikeChange = async () => {
    const newLikesCount = await handlePostLikeChangeRequest();
    if (typeof newLikesCount === "number") {
      updateLikesCountForPost(newLikesCount); // Обновляем лайки на посте
    } else {
      console.error("Ошибка: новое количество лайков не является числом");
    }
  };

  const updateLikesCountForPost = (newLikesCount: number) => {
    setLikesCount(isNaN(newLikesCount) ? 0 : newLikesCount); // Обновляем лайки на посте
  };

  const updateLikesCountForComment = (
    commentId: string,
    newLikesCount: number
  ) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, likesCount: newLikesCount }
          : comment
      )
    );
  };

  const handleCommentLike = async (commentId: string) => {
    const newLikesCount = await handleCommentLikeChange(commentId);
    if (typeof newLikesCount === "number") {
      updateLikesCountForComment(commentId, newLikesCount);
    } else {
      console.error(
        `Ошибка: новое количество лайков для комментария ${commentId} не является числом`
      );
    }
  };

  if (isLoading || !storedUserProfile) {
    return ;
    // return <div>Loading...</div>;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] ml-[243.8px] px-[15px]"
      onClick={onClose}
    >
      <div
        className="bg-color-light w-full max-w-[1000px] h-[722px] flex rounded-[12px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Левая часть: изображение поста */}
        <div className="w-[60%] h-full relative">
          <Image
            src={post.image_url}
            alt="Post Image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-[12px]"
          />
        </div>

        {/* Правая часть: информация о посте */}
        <div className="w-[45%] h-full flex flex-col">
          <div className="flex items-center justify-between px-[12px] py-[10px] border-b-[1px] border-color-gray">
            <div className="flex items-center w-full">
              <div className="relative min-w-[36px] min-h-[36px]">
                <Image
                  src={userProfile.profile_image || "/default-avatar.png"}
                  alt="Profile Avatar"
                  width={36}
                  height={36}
                  className="absolute inset-0 w-[30px] h-[30px] m-auto border bg-color-gray rounded-full"
                />
                <Image
                  src="/ava-frame.png"
                  alt="Avatar frame"
                  width={38}
                  height={38}
                  className="w-full h-full"
                />
              </div>
              <span className="text-[14px] font-semibold ml-[10px]">
                {post.user_name || "user_name"}
              </span>
              <button
                onClick={() => setShowOptions(true)}
                className="text-gray-500 hover:text-black ml-auto"
              >
                <Image
                  src="/icons/ellipsis.svg"
                  alt="Elips Icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* Описание и дата */}
          <div className="flex items-start text-[12px] px-[12px] py-[10px] ">
            <div className="relative min-w-[36px] min-h-[36px]">
              <Image
                src={userProfile.profile_image || "/default-avatar.png"}
                alt="Profile Avatar"
                width={36}
                height={36}
                className="absolute inset-0 w-[30px] h-[30px] m-auto border bg-color-gray rounded-full"
              />
              <Image
                src="/ava-frame.png"
                alt="Avatar frame"
                width={38}
                height={38}
                className="w-full h-full"
              />
            </div>
            <div className="ml-[10px]">
              <p className="">
                <span className="font-semibold">{post.user_name} </span>
                {post.caption}
              </p>
              <span className="text-[10px] text-color-dark-gray">
                {parseData(post.created_at)}
              </span>
            </div>
          </div>

          {/* Список комментариев */}
          <div className="flex-1 overflow-y-auto text-[12px] px-[12px] py-[10px] border-b-[1px] border-color-gray">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-[12px] mb-[16px]"
              >
                <div className="flex min-w-[36px] h-[36px] items-center justify-center">
                  <Image
                    src={comment.profile_image || "/default-avatar.png"}
                    alt="Comment Avatar"
                    width={27}
                    height={27}
                    className="rounded-full"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <p>{comment.comment_text}</p>
                    <span className="text-[10px] text-color-dark-gray">
                      {parseData(comment.created_at)}{" "}
                      <span className="ml-[20px]">
                        {comment.likesCount} likes
                      </span>
                    </span>
                  </div>
                  <LikeComment
                    commentId={comment._id}
                    userId={storedUserProfile._id}
                    likesCount={comment.likesCount}
                    onLikesCountChange={(newCount: number) =>
                      updateLikesCountForComment(comment._id, newCount)
                    }
                    className="w-[20px]"
                    isAuthenticated={Boolean(storedUserProfile)}
                    onLikeChange={async () =>
                      await handleCommentLike(comment._id)
                    }
                    postId={post._id}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Иконки действий */}
          <div className="flex flex-col gap-[10px] border-b-[1px] border-color-gray px-[12px] py-[10px]">
            <div className="flex gap-[14px]">
              <Like
                onClick={handlePostLikeChange}
                likesCount={likesCount}
                className="w-[20px]"
                postId={post._id}
                userId={storedUserProfile._id}
                isAuthenticated={Boolean(storedUserProfile)}
                onLikesCountChange={(newCount) =>
                  updateLikesCountForPost(newCount)
                }
              />
              <CommentIcon postId={post._id} />
            </div>
            <div className="flex flex-col text-[12px]">
              <span>{likesCount} likes</span>
              <span className="text-[10px] text-color-dark-gray">
                {parseData(post.created_at)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[10px] px-[12px] py-[10px]">
            <div className="flex items-center gap-[10px] relative">
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="w-[20px]"
              >
                <EmojiIcon />
              </button>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add comment"
                className="px-[10px] py-[8px] text-[12px] w-full"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="text-[12px] font-semibold text-color-accent hover:text-color-dark"
              >
                Send
              </button>
            </div>
            {showEmojiPicker && (
              <div className="flex">
                <EmojiPicker
                  onEmojiClick={(emoji: string) => {
                    setNewComment((prevComment) => prevComment + emoji);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модалка действий */}
      {showOptions && (
        <ModalPostConfirm
          post={post}
          onClose={() => setShowOptions(false)}
          userProfile={storedUserProfile}
        />
      )}
    </div>
  );
};

export default ModalPost;

