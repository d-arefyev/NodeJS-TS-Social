
// работает, комменты отправляются, нет аватарок комментаторов
"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { $api } from "../api/api";
import ModalPostConfirm from "../modal/ModalPostConfirm";
import Like from "../atoms/Like";
import CommentIcon from "../atoms/CommentIcon";
import EmojiPicker from "../components/EmojiPicker";
import parseData from "../helpers/parseData";

interface ModalPostProps {
  post: {
    user_name: string;
    username: string;
    _id: string;
    image_url: string;
    caption: string;
    created_at: string;
  };
  userProfile: {
    _id: string;
    username: string;
    profile_image: string;
    posts_count: number;
  };
  onClose: () => void;
}

interface Comment {
  _id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  likesCount: number;
  user_name: string;
  profile_image: string;
}

const ModalPost: React.FC<ModalPostProps> = ({
  post,
  userProfile,
  onClose,
}: ModalPostProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storedUserProfile, setStoredUserProfile] = useState<any>(null);

  // Загружаем данные профиля из localStorage, если они есть
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
    setIsLoading(false);
  }, []);

  // Загрузка комментариев
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await $api.get(`/comment/${post._id}`);
        setComments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [post._id]);

  // Добавление комментария
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Проверка на пустой комментарий

    try {
      // Отправляем запрос на сервер
      const response = await $api.post(`/comment/${post._id}`, {
        userId: storedUserProfile?._id, // Используем данные из storedUserProfile
        comment_text: newComment, // Текст комментария
      });
      setComments((prevComments) => [...prevComments, response.data]); // Добавляем новый комментарий в список
      setNewComment(""); // Сбрасываем поле ввода
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error); // Логируем ошибку
    }
  };

  // Если данные еще не загружены
  if (isLoading || !storedUserProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] ml-[243.8px] px-[15px]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[1000px] h-[722px] flex rounded-[4px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Левая часть: изображение поста */}
        <div className="w-[60%] h-full relative">
          <Image
            src={post.image_url}
            alt="Post Image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-[4px]"
          />
        </div>

        {/* Правая часть: информация о посте */}
        <div className="w-[45%] h-full flex flex-col">
          {/* Хедер */}
          <div className="flex items-center justify-between px-[12px] py-[10px] border-b-[1px] border-color-gray">
            <div className="flex items-center w-full ">
              <div className="relative min-w-[36px] min-h-[36px]">
                <Image
                  src={storedUserProfile.profile_image || "/default-avatar.png"}
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
                {post.user_name || "username"}
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
                src={storedUserProfile.profile_image || "/default-avatar.png"}
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
          <div className="flex-1 mt-[20px] overflow-y-auto items-start text-[12px] px-[12px] py-[10px]">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-[12px] mb-[16px]"
              >
                <div className="relative w-[36px] h-[36px]">
                  <Image
                    src={comment.profile_image || "/default-avatar.png"}
                    alt="Comment Avatar"
                    width={36}
                    height={36}
                    className="rounded-full bg-gray-200 border"
                  />
                </div>
                <div className="flex-1">
                  <p>{comment.comment_text}</p>
                  <div className="flex justify-between text-[12px] text-color-dark-gray">
                    <span>
                      &#8226; {parseData(comment.created_at)} &#8226;{" "}
                      <span>{comment.likesCount} likes</span>
                    </span>
                    <Like
                      postId={comment._id}
                      userId={storedUserProfile._id}
                      likesCount={comment.likesCount}
                      onLikesCountChange={setLikesCount}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Иконки действий */}
          <div className="mt-[20px] flex items-center gap-[14px]">
            <Like
              postId={post._id}
              userId={storedUserProfile._id}
              likesCount={likesCount}
              onLikesCountChange={setLikesCount}
            />
            <CommentIcon postId={post._id} />
            <span>{likesCount} likes</span>
          </div>
          {/* Добавление комментария */}
          <div className="mt-[10px] flex items-center gap-[8px] relative">
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="p-[8px] border rounded-md"
            >
              <Image
                src="/icons/EmojiIcon.svg"
                alt="Emoji Icon"
                width={24}
                height={24}
              />
            </button>
            {showEmojiPicker && (
              <EmojiPicker
                onEmojiClick={function (emoji: string): void {
                  setNewComment((prevComment) => prevComment + emoji);
                }}
              />
            )}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-[10px] py-[8px]"
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="text-blue-500"
            >
              Post
            </button>
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
