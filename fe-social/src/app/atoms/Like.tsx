"use client";

import React, { useState, useEffect } from "react";
import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
import { $api } from "../api/api";

interface LikeProps {
  postId: string;
  userId: string;
  likesCount: number;
  isAuthenticated: boolean;
  className?: string;
  onClick?: () => void;
  onLikesCountChange: (newCount: number) => void;
}

const Like: React.FC<LikeProps> = ({
  postId,
  userId,
  likesCount,
  className = "",
  onLikesCountChange,
}) => {
  const [liked, setLiked] = useState<boolean>(false); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Универсальная обработка ошибок
  const handleError = (error: any, defaultMessage: string) => {
    console.error("Полная ошибка:", error); // Полное логирование
    const errorMessage =
      error?.response?.data?.message || error?.message || defaultMessage;
    console.error("Ошибка:", errorMessage);
  };

  // Получаем информацию о лайке, чтобы отобразить правильное состояние
  useEffect(() => {
    const fetchLikesData = async () => {
      if (!postId || !userId) return;

      try {
        const response = await $api.get(`/likes/${postId}/likes`);
        if (Array.isArray(response.data)) {
          const userLiked = response.data.some(
            (like: any) => like.user_id === userId
          );
          setLiked(userLiked);
        } else {
          console.error("Неверный формат данных лайков:", response.data);
        }
      } catch (error) {
        handleError(error, "Ошибка при получении данных о лайках");
      }
    };

    fetchLikesData();
  }, [postId, userId]);

  // Обработчик клика на иконку лайка
  const handleLikeToggle = async () => {
    if (isLoading) return; 
    setIsLoading(true);

    try {
      const url = liked
        ? `/likes/${postId}/unlike/${userId}`
        : `/likes/${postId}/like/${userId}`;
      const method = liked ? "delete" : "post";

      const response = await $api({ method, url });

      if (response.status === 200 || response.status === 201) {
        const newLikedState = !liked;
        const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

        setLiked(newLikedState);
        onLikesCountChange(newLikesCount); // Обновляем количество лайков
      } else {
        console.error("Ошибка изменения состояния лайка:", response.status);
      }
    } catch (error) {
      handleError(error, "Ошибка при переключении состояния лайка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center space-x-2 ${className} ${
        liked ? "text-red-500" : "text-color-dark"
      } cursor-pointer`}
      onClick={handleLikeToggle}
      disabled={isLoading}
      aria-pressed={liked}
    >
      {liked ? (
        <LikedIcon liked={liked} />
      ) : (
        <LikeIcon liked={liked} /> 
      )}
    </button>
  );
};

export default Like;




// "use client";

// import React, { useState, useEffect } from "react";
// import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
// import { $api } from "../api/api";

// interface LikeProps {
//   postId: string;
//   userId: string;
//   likesCount: number;
//   isAuthenticated: boolean;
//   className?: string;
//   onClick?: () => void;
//   onLikesCountChange: (newCount: number) => void;
// }

// const Like: React.FC<LikeProps> = ({
//   postId,
//   userId,
//   likesCount,
//   className = "",
//   onLikesCountChange,
// }) => {
//   const [liked, setLiked] = useState<boolean>(false); 
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // Универсальная обработка ошибок
//   const handleError = (error: any, defaultMessage: string) => {
//     const errorMessage =
//       error.response?.data?.message || error.message || defaultMessage;
//     console.error("Ошибка:", errorMessage);
//   };

//   // Получаем информацию о лайке, чтобы отобразить правильное состояние
//   useEffect(() => {
//     const fetchLikesData = async () => {
//       if (likesCount !== undefined) {
//         try {
//           const response = await $api.get(`/likes/${postId}/likes`);
//           const userLiked = response.data.some(
//             (like: any) => like.user_id === userId
//           );
//           setLiked(userLiked);
//         } catch (error) {
//           handleError(error, "Ошибка при получении данных о лайках");
//         }
//       }
//     };

//     fetchLikesData();
//   }, [postId, userId, likesCount]);

//   // Обработчик клика на иконку лайка
//   const handleLikeToggle = async () => {
//     if (isLoading) return; // Если запрос в процессе, не делаем новый запрос
//     setIsLoading(true);

//     try {
//       const url = liked
//         ? `/likes/${postId}/unlike/${userId}` // Запрос для удаления лайка
//         : `/likes/${postId}/like/${userId}`; // Запрос для добавления лайка
//       const method = liked ? "delete" : "post";

//       const response = await $api({ method, url });

//       if (response.status === 200 || response.status === 201) {
//         const newLikedState = !liked;
//         const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

//         setLiked(newLikedState);
//         onLikesCountChange(newLikesCount); // Обновляем количество лайков
//       } else {
//         console.error("Ошибка изменения состояния лайка:", response.status);
//       }
//     } catch (error) {
//       handleError(error, "Ошибка при переключении состояния лайка");
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
//         <LikedIcon liked={liked} /> // Лайкнуто
//       ) : (
//         <LikeIcon liked={liked} /> // Не лайкнуто
//       )}
//       {/* <span>{likesCount}</span>  */}
//     </button>
//   );
// };

// export default Like;
