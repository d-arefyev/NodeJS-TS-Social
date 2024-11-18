"use client"

import React, { useEffect, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import parseData from '../helpers/parseData'; // Утилита для парсинга даты
import Like from '../atoms/Like'; // Ваш компонент для лайков
import CommentIcon from '../atoms/CommentIcon'; // Ваш компонент для комментариев
import EmojiPicker from '../components/EmojiPicker'; // Библиотека для эмодзи

// Типы данных для поста и комментариев
interface IComment {
  _id: string;
  user: { username: string; profile_image: string };
  comment_text: string;
  created_at: string;
}

interface IUserProfile {
  _id: string;
  username: string;
  profile_image: string;
}

interface IPost {
  _id: string;
  title: string;
  image_url: string;
  description: string;
  likesCount: number;
  created_at: string;
}

interface ModalPostProps {
  post: IPost;
  onClose: () => void;
}

const ModalPost: React.FC<ModalPostProps> = ({ post, onClose }) => {
  const [commentText, setCommentText] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [likesCount, setLikesCount] = useState<number>(post.likesCount || 0);
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchCommentsData = async () => {
      const response = await fetch(`/api/comments/${post._id}`);
      const data: IComment[] = await response.json();
      setComments(data);
    };

    fetchCommentsData();

    const fetchUserProfile = async () => {
      const response = await fetch('/api/user/profile');
      const data: IUserProfile = await response.json();
      setUserProfile(data);
    };

    fetchUserProfile();
  }, [post._id]);

  const handleAddComment = async () => {
    if (!commentText) return;

    const newComment = {
      postId: post._id,
      userId: userProfile?._id,
      comment_text: commentText,
    };

    const response = await fetch(`/api/comments/${post._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    });

    const newCommentData: IComment = await response.json();
    setComments(prevComments => [...prevComments, newCommentData]);
    setCommentText('');
  };

  const handleDeleteComment = async (commentId: string) => {
    const response = await fetch(`/api/comments/${post._id}?commentId=${commentId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setCommentText(prevText => prevText + emoji); 
    setShowEmojiPicker(false);
  };

  // Обработчик клика по посту
  const handlePostClick = () => {
    console.log('Post clicked!');
    // Здесь вы можете добавить логику, например, открыть модалку или перейти на страницу
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Шапка с аватаром и информацией о посте */}
        <div className="flex p-4 items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-[36px] h-[36px]">
              <Image
                src={userProfile?.profile_image || '/default-avatar.png'}
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
              {userProfile?.username || 'username'}
            </span>
          </div>
        </div>

        {/* Основной контент поста */}
        <div className="flex" onClick={handlePostClick}> {/* Сделаем блок кликабельным */}
          <div className="w-2/3">
            <img
              src={post.image_url || '/default-post-image.png'}
              alt="Post image"
              className="w-full h-[350px] object-cover rounded-lg cursor-pointer"  {/* Добавляем курсор */}
            />
          </div>
          <div className="w-1/3 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">{post.title}</span>
              <span className="text-gray-500 text-sm">{parseData(post.created_at)}</span>
            </div>
            <p>{post.description}</p>
            <div className="flex mt-4 gap-4">
              <Like
                postId={post._id}
                userId={userProfile?._id || ''}
                likesCount={likesCount}
                onLikesCountChange={setLikesCount}
              />
              <CommentIcon postId={post._id} />
            </div>
          </div>
        </div>

        {/* Список комментариев */}
        <div className="comments-section mt-6">
          <h3 className="text-lg font-semibold">Комментарии</h3>
          {comments.map(comment => (
            <div key={comment._id} className="comment flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="relative w-[36px] h-[36px]">
                  <Image
                    src={comment.user.profile_image || '/default-avatar.png'}
                    alt="Commenter Avatar"
                    width={36}
                    height={36}
                    className="absolute inset-0 w-[30px] h-[30px] m-auto border bg-color-gray rounded-full"
                  />
                </div>
                <span className="ml-2">{comment.user.username}</span>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm">{comment.comment_text}</p>
                <span className="text-xs text-gray-500">
                  &#8226; {parseData(comment.created_at)} &#8226;
                  <span className="ml-2 cursor-pointer text-red-500" onClick={() => handleDeleteComment(comment._id)}>Удалить</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Форма добавления комментария */}
        <div className="add-comment mt-4">
          <div className="relative">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Добавьте комментарий..."
              value={commentText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
            />
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <button
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleAddComment}
          >
            Отправить
          </button>
        </div>

        {/* Кнопка закрытия модалки */}
        <button
          className="absolute top-4 right-4 text-xl text-white"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalPost;






// "use client";

// import React from "react";
// import Image from "next/image";

// interface ModalPostProps {
//   post: {
//     image_url: string;
//     caption: string;
//     _id: string;
//   };
//   onClose: () => void;
// }

// const ModalPost: React.FC<ModalPostProps> = ({ post, onClose }) => {
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] ml-[243.8px] px-[15px]"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-[80%] md:w-[600px] rounded-[12px] shadow-lg relative p-4 z-[10000]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Кнопка для закрытия */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-white bg-black rounded-full p-2"
//         >
//           ✕
//         </button>

//         {/* Изображение */}
//         <div className="relative w-full h-[400px] mb-4">
//           <Image
//             src={post.image_url}
//             alt="Post Image"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-md"
//           />
//         </div>

//         {/* Подпись к посту */}
//         <div className="text-lg font-semibold">{post.caption}</div>
//       </div>
//     </div>
//   );
// };

// export default ModalPost;
