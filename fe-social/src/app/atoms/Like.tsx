"use client";

import React, { useState, useEffect } from "react";
import { LikeIcon, LikedIcon } from "../atoms/LikeIcon"; 
import { $api } from "../api/api";

interface LikeProps {
  postId: string;
  userId: string;
  likesCount: number;
  onLikesCountChange: (newCount: number) => void;
}

const Like: React.FC<LikeProps> = ({ postId, userId, likesCount, onLikesCountChange }) => {
  const [liked, setLiked] = useState<boolean>(false); // Состояние лайка
  const [isLoading, setIsLoading] = useState<boolean>(false); // Статус загрузки

  // Универсальная обработка ошибок
  const handleError = (error: any, defaultMessage: string) => {
    const errorMessage = error.response?.data?.message || error.message || defaultMessage;
    console.error("Ошибка:", errorMessage);
  };

  // Получаем информацию о лайке, чтобы отобразить правильное состояние
  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        // Получаем лайкнут ли пост данным пользователем
        const response = await $api.get(`/likes/${postId}/likes`);
        
        // Полагаю, что сервер возвращает массив лайков, и мы ищем свой лайк
        const userLiked = response.data.some((like: any) => like.user_id === userId); // Предполагается, что data - это список лайков
        setLiked(userLiked); // Инициализируем состояние лайка
      } catch (error) {
        handleError(error, "Ошибка при получении данных о лайках");
      }
    };

    fetchLikesData();
  }, [postId, userId]); // Запрашиваем данные при монтировании компонента или изменении postId и userId

  // Обработчик клика на иконку лайка
  const handleLikeToggle = async () => {
    if (isLoading) return; // Если запрос в процессе, не делаем новый запрос
    setIsLoading(true); // Устанавливаем состояние загрузки

    try {
      const url = liked
        ? `/likes/${postId}/unlike/${userId}`  // Запрос для удаления лайка
        : `/likes/${postId}/like/${userId}`;   // Запрос для добавления лайка
      const method = liked ? "delete" : "post"; // Определяем метод запроса

      const response = await $api({ method, url });

      if (response.status === 200 || response.status === 201) {
        const newLikedState = !liked;  // Меняем состояние лайка
        const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1; // Обновляем счетчик лайков

        setLiked(newLikedState); // Обновляем локальное состояние
        onLikesCountChange(newLikesCount); // Обновляем лайки в родительском компоненте
      } else {
        console.error("Ошибка изменения состояния лайка:", response.status);
      }
    } catch (error) {
      handleError(error, "Ошибка при переключении состояния лайка");
    } finally {
      setIsLoading(false); // Убираем статус загрузки
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {liked ? (
        <LikedIcon liked={liked} onClick={handleLikeToggle} />
      ) : (
        <LikeIcon liked={liked} onClick={handleLikeToggle} />
      )}
      {/* <span>{likesCount}</span> */}
    </div>
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
//   onLikesCountChange: (newCount: number) => void;
// }

// const Like: React.FC<LikeProps> = ({ postId, userId, onLikesCountChange }) => {
//   const [liked, setLiked] = useState(false); // Состояние лайка
//   const [likesCount, setLikesCount] = useState(0); // Количество лайков
//   const [isLoading, setIsLoading] = useState(false); // Статус загрузки

//   // Универсальная обработка ошибок
//   const handleError = (error: any, defaultMessage: string) => {
//     const errorMessage = error.response?.data?.message || error.message || defaultMessage;
//     console.error("Ошибка:", errorMessage);
//   };

//   // Первоначальная загрузка данных
//   useEffect(() => {
//     const fetchLikesData = async () => {
//       try {
//         const response = await $api.get(`/likes/${postId}/likes`);
//         setLikesCount(response.data.likesCount); // Инициализируем количество лайков
//         setLiked(response.data.likedByUser); // Инициализируем состояние лайка
//       } catch (error: any) {
//         handleError(error, "Ошибка при получении данных о лайках");
//       }
//     };

//     fetchLikesData();
//   }, [postId]);

//   // Обработчик клика на иконку лайка
//   const handleLikeToggle = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
  
//     try {
//       const url = liked
//         ? `/likes/${postId}/unlike/${userId}`
//         : `/likes/${postId}/like/${userId}`;
//       const method = liked ? "delete" : "post";
  
//       const response = await $api({ method, url });
  
//       if (response.status === 200 || response.status === 201) {
//         const newLikedState = !liked;
//         const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;
  
//         setLiked(newLikedState); // Обновляем состояние лайка
//         setLikesCount(newLikesCount); // Обновляем количество лайков
//         onLikesCountChange(newLikesCount); // Обновляем счетчик в родительском компоненте
//       } else {
//         console.error("Ошибка изменения состояния лайка:", response.status);
//       }
//     } catch (error: any) {
//       handleError(error, "Ошибка при переключении состояния лайка");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-1">
//       {liked ? (
//         <LikedIcon liked={liked} onClick={handleLikeToggle} />
//       ) : (
//         <LikeIcon liked={liked} onClick={handleLikeToggle} />
//       )}
//       <span>{likesCount}</span>
//     </div>
//   );
// };

// export default Like;
