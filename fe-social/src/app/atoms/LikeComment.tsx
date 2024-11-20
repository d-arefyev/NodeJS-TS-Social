"use client";

import React, { useState, useEffect } from "react";
import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
import { $api } from "../api/api";

interface LikeCommentProps {
  commentId: string;
  postId: string;
  userId: string;
  likesCount: number;
  onLikesCountChange: (newCount: number) => void;
  isAuthenticated: boolean;
  className?: string;
  onLikeChange: () => Promise<void>;
}

const LikeComment: React.FC<LikeCommentProps> = ({
  commentId,
  postId,
  userId,
  likesCount,
  className = "",
  onLikesCountChange,
  isAuthenticated,
  onLikeChange,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        const response = await $api.get(`/comment-likes/comment/${commentId}`);
        const userLiked = response.data.some(
          (like: any) => like.user_id === userId
        );
        setLiked(userLiked);
      } catch (error) {
        console.error("Ошибка при получении данных о лайках:", error);
      }
    };

    fetchLikesData();
  }, [commentId, userId]);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      console.error("Пользователь не авторизован.");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      const url = liked
        ? `/comment-likes/post/${postId}/comment/${commentId}`
        : `/comment-likes/post/${postId}/comment/${commentId}`;
      const method = liked ? "delete" : "post";

      const response = await $api({ method, url });

      if (response.status === 200 || response.status === 201) {
        const newLikedState = !liked;
        const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

        setLiked(newLikedState);
        onLikesCountChange(newLikesCount);

        await onLikeChange();
      }
    } catch (error) {
      console.error("Ошибка при переключении лайка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center space-x-2 ${className} ${
        liked ? "text-red-500" : "text-gray-500"
      }`}
      onClick={handleLikeToggle}
      disabled={isLoading}
      aria-pressed={liked}
    >
      {liked ? <LikedIcon liked={false} /> : <LikeIcon liked={false} />}
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeComment;




// NaN и после перезагрузки страницы, появляются красные сердечки
// "use client";

// import React, { useState, useEffect } from "react";
// import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
// import { $api } from "../api/api";

// interface LikeCommentProps {
//   commentId: string;
//   postId: string; // Добавим postId для соответствия серверу
//   userId: string;
//   likesCount: number;
//   onLikesCountChange: (newCount: number) => void;
//   isAuthenticated: boolean;
//   className: string;
//   onLikeChange: () => Promise<void>;
// }

// const LikeComment: React.FC<LikeCommentProps> = ({
//   commentId,
//   postId, // Принимаем postId
//   userId,
//   likesCount,
//   className = "",
//   onLikesCountChange,
//   isAuthenticated,
//   onLikeChange,
// }) => {
//   const [liked, setLiked] = useState<boolean>(false); // Состояние лайка для комментария
//   const [isLoading, setIsLoading] = useState<boolean>(false); // Статус загрузки

//   // Универсальная обработка ошибок
//   const handleError = (error: any, defaultMessage: string) => {
//     const errorMessage =
//       error.response?.data?.message || error.message || defaultMessage;
//     console.error("Ошибка:", errorMessage);
//   };

//   // Получаем информацию о лайке комментария, чтобы отобразить правильное состояние
//   useEffect(() => {
//     const fetchLikesData = async () => {
//       try {
//         const response = await $api.get(`/comment-likes/comment/${commentId}`);
//         const userLiked = response.data.some(
//           (like: any) => like.user_id === userId
//         );
//         setLiked(userLiked); // Устанавливаем состояние лайка
//       } catch (error) {
//         handleError(error, "Ошибка при получении данных о лайках для комментария");
//       }
//     };

//     fetchLikesData();
//   }, [commentId, userId, likesCount]);

//   // Обработчик клика на иконку лайка
//   const handleLikeToggle = async () => {
//     if (!isAuthenticated) {
//       console.error("Пользователь не авторизован");
//       return;
//     }

//     if (isLoading) return;
//     setIsLoading(true);

//     try {
//       const url = liked
//         ? `/comment-likes/post/${postId}/comment/${commentId}`
//         : `/comment-likes/post/${postId}/comment/${commentId}`;
//       const method = liked ? "delete" : "post";

//       const response = await $api({ method, url });

//       if (response.status === 200 || response.status === 201) {
//         const newLikedState = !liked;
//         const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

//         setLiked(newLikedState);
//         onLikesCountChange(newLikesCount);
        
//         // Вызываем onLikeChange после изменения состояния лайка
//         await onLikeChange();
//       } else {
//         console.error("Ошибка изменения состояния лайка комментария:", response.status);
//       }
//     } catch (error) {
//       handleError(error, "Ошибка при переключении состояния лайка комментария");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       className={`flex items-center space-x-2 ${className} ${
//         liked ? "text-red-500" : "text-color-dark"
//       } cursor-pointer`}
//       onClick={handleLikeToggle}
//       disabled={isLoading}
//       aria-pressed={liked}
//     >
//       {liked ? (
//         <LikedIcon liked={liked} />
//       ) : (
//         <LikeIcon liked={liked} />
//       )}
//       <span>{likesCount}</span>
//     </button>
//   );
// };

// export default LikeComment;
