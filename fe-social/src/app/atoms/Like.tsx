import React, { useState, useEffect } from "react";
import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
import { $api } from "../api/api";

interface LikeProps {
  postId: string;
  userId: string;
  likesCount: number;
  className?: string;
  isAuthenticated: boolean;
  onLikesCountChange: (newCount: number) => void;
}

const Like: React.FC<LikeProps> = ({
  postId,
  userId,
  likesCount,
  className = "",
  isAuthenticated,
  onLikesCountChange,
}) => {
  const [liked, setLiked] = useState<boolean | null>(null); // Установим null, чтобы вначале не было "undefined"
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Универсальная обработка ошибок
  const handleError = (error: any, defaultMessage: string) => {
    const errorMessage =
      error.response?.data?.message || error.message || defaultMessage;
    console.error("Ошибка:", errorMessage);
  };

  // Получаем информацию о лайке только если пользователь аутентифицирован
  useEffect(() => {
    const fetchLikesData = async () => {
      if (isAuthenticated) { // Только если пользователь авторизован
        try {
          setIsLoading(true); // Начинаем загрузку данных
          const response = await $api.get(`/likes/${postId}/likes`, {
            params: { userId }, // Передаем userId в query
          });

          const userLiked = response.data.liked; // Информация о том, лайкнул ли пользователь
          setLiked(userLiked);
        } catch (error) {
          handleError(error, "Ошибка при получении данных о лайках");
        } finally {
          setIsLoading(false); // Останавливаем индикатор загрузки
        }
      }
    };

    fetchLikesData();
  }, [postId, userId, isAuthenticated]); // Зависимость от postId, userId и isAuthenticated

  // Обработчик клика на иконку лайка
  const handleLikeToggle = async () => {
    if (isLoading || liked === null || !isAuthenticated) return; // Если загрузка еще не завершена или пользователь не авторизован, не выполняем запрос

    setIsLoading(true);

    try {
      const url = liked
        ? `/likes/${postId}/unlike/${userId}` // Запрос для удаления лайка
        : `/likes/${postId}/like/${userId}`; // Запрос для добавления лайка
      const method = liked ? "delete" : "post";

      const response = await $api({ method, url });

      if (response.status === 200 || response.status === 201) {
        const newLikedState = !liked;
        const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

        setLiked(newLikedState);
        onLikesCountChange(newLikesCount);
      } else {
        console.error("Ошибка изменения состояния лайка:", response.status);
      }
    } catch (error) {
      handleError(error, "Ошибка при переключении состояния лайка");
    } finally {
      setIsLoading(false);
    }
  };

  if (liked === null) {
    return <div>Загрузка...</div>; // Показываем индикатор загрузки, пока состояние лайков не получено
  }

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
        <LikedIcon liked={liked} /> // Лайкнуто
      ) : (
        <LikeIcon liked={liked} /> // Не лайкнуто
      )}
    </button>
  );
};

export default Like;





// все работает корректно, но подгружаются свои же лайки, с 5-6 попытки перезагрузки страницы
// "use client"

// import React, { useState, useEffect } from "react";
// import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
// import { $api } from "../api/api";

// interface LikeProps {
//   postId: string;
//   userId: string;
//   likesCount: number;
//   className?: string;
//   isAuthenticated: boolean;  // Добавляем isAuthenticated
//   onLikesCountChange: (newCount: number) => void;
// }

// const Like: React.FC<LikeProps> = ({
//   postId,
//   userId,
//   likesCount,
//   className = "",
//   isAuthenticated,
//   onLikesCountChange,
// }) => {
//   const [liked, setLiked] = useState<boolean>(false); // Состояние лайка
//   const [isLoading, setIsLoading] = useState<boolean>(false); // Статус загрузки

//   // Универсальная обработка ошибок
//   const handleError = (error: any, defaultMessage: string) => {
//     const errorMessage =
//       error.response?.data?.message || error.message || defaultMessage;
//     console.error("Ошибка:", errorMessage);
//   };

//   // Получаем информацию о лайке только если пользователь аутентифицирован
//   useEffect(() => {
//     const fetchLikesData = async () => {
//       if (isAuthenticated) { // Только если пользователь авторизован
//         try {
//           const response = await $api.get(`/likes/${postId}/likes`, {
//             params: { userId }, // Передаем userId в query
//           });

//           const userLiked = response.data.liked; // Информация о том, лайкнул ли пользователь
//           setLiked(userLiked);
//         } catch (error) {
//           handleError(error, "Ошибка при получении данных о лайках");
//         }
//       }
//     };

//     fetchLikesData();
//   }, [postId, userId, isAuthenticated]); // Зависимость от postId, userId и isAuthenticated

//   // Обработчик клика на иконку лайка
//   const handleLikeToggle = async () => {
//     if (isLoading || !isAuthenticated) return; // Если запрос в процессе или пользователь не авторизован, не выполняем запрос
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
//         onLikesCountChange(newLikesCount);
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
//     </button>
//   );
// };

// export default Like;










// // все работает, есть переключение на красный, но со всех аккаунтов видны красные лайки
// "use client";

// import React, { useState, useEffect } from "react";
// import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
// import { $api } from "../api/api";

// interface LikeProps {
//   postId: string;
//   userId: string;
//   likesCount: number;
//   className?: string; // Сделал опциональным
//   onLikesCountChange: (newCount: number) => void;
// }

// const Like: React.FC<LikeProps> = ({
//   postId,
//   userId,
//   likesCount,
//   className = "",
//   onLikesCountChange,
// }) => {
//   const [liked, setLiked] = useState<boolean>(false); // Состояние лайка
//   const [isLoading, setIsLoading] = useState<boolean>(false); // Статус загрузки

//   // Универсальная обработка ошибок
//   const handleError = (error: any, defaultMessage: string) => {
//     const errorMessage =
//       error.response?.data?.message || error.message || defaultMessage;
//     console.error("Ошибка:", errorMessage);
//   };

//   // Получаем информацию о лайке, чтобы отобразить правильное состояние
//   useEffect(() => {
//     const fetchLikesData = async () => {
//       try {
//         const response = await $api.get(`/likes/${postId}/likes`);
//         const userLiked = response.data.some(
//           (like: any) => like.user_id === userId
//         );
//         setLiked(userLiked);
//       } catch (error) {
//         handleError(error, "Ошибка при получении данных о лайках");
//       }
//     };

//     fetchLikesData();
//   }, [postId, userId]);

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
//         onLikesCountChange(newLikesCount);
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
