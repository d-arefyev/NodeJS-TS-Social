import React, { useState } from "react";
import { $api } from "../api/api";
import { useFollow } from "../context/FollowContext";

interface FollowButtonProps {
  userId: string;
  targetUserId: string;
  className: string;
  isFollow: boolean
  onFollowChange: (newFollowStatus: boolean) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  targetUserId,
  className,
  onFollowChange,
}) => {
  const { following, toggleFollow } = useFollow(); // Используем контекст для обновления состояния подписки
  const [loading, setLoading] = useState(false);

  // Определяем, подписан ли текущий пользователь на targetUserId
  const isFollow = following[targetUserId] || false;

  // Обработчик клика на кнопку "Follow"/"Unfollow"
  const handleFollow = async () => {
    if (!userId || !targetUserId) {
      console.error("User ID or target user ID is missing");
      return;
    }

    if (userId === targetUserId) {
      console.log("You can't follow yourself.");
      return;
    }

    setLoading(true);

    // Сначала меняем состояние подписки в локальном контексте
    toggleFollow(targetUserId);
    onFollowChange(!isFollow); // Обновляем состояние подписки в родительском компоненте

    try {
      if (isFollow) {
        // Отправляем запрос на отмену подписки
        await $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
      } else {
        // Отправляем запрос на подписку
        await $api.post(`/follow/${userId}/follow/${targetUserId}`);
      }
    } catch (error) {
      console.error("Error while following/unfollowing:", error);
      // Если ошибка при запросе, откатываем локальное состояние
      toggleFollow(targetUserId);
      onFollowChange(isFollow); // Восстанавливаем старое состояние подписки
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`${className} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading} // Блокируем кнопку, если идет загрузка
    >
      {loading ? "Loading..." : isFollow ? "Unfollow" : "Follow"} {/* Показываем текст в зависимости от состояния */}
    </button>
  );
};

export default FollowButton;



// "use client";

// import React, { useState } from "react";
// import { $api } from "../api/api";
// import { useFollow } from "../context/FollowContext";

// interface FollowButtonProps {
//   userId: string;
//   targetUserId: string;
//   className: string;
//   onFollowChange: (newFollowStatus: boolean) => void;
// }

// const FollowButton: React.FC<FollowButtonProps> = ({
//   userId,
//   targetUserId,
//   className,
//   onFollowChange,
// }) => {
//   const { following, toggleFollow } = useFollow(); // Используем контекст для обновления состояния подписки

//   const [loading, setLoading] = useState(false);

//   // Определяем, подписан ли текущий пользователь на targetUserId
//   const isFollow = following[targetUserId] || false;

//   // Обработчик клика на кнопку "Follow"/"Unfollow"
//   const handleFollow = async () => {
//     if (!userId || !targetUserId) {
//       console.error("User ID or target user ID is missing");
//       return;
//     }

//     if (userId === targetUserId) {
//       console.log("You can't follow yourself.");
//       return;
//     }

//     setLoading(true);

//     try {
//       if (isFollow) {
//         // Отправляем запрос на отмену подписки
//         await $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
//         toggleFollow(targetUserId); // Меняем состояние подписки через контекст
//         onFollowChange(false); // Обновляем состояние подписки в родительском компоненте
//       } else {
//         // Отправляем запрос на подписку
//         await $api.post(`/follow/${userId}/follow/${targetUserId}`);
//         toggleFollow(targetUserId); // Меняем состояние подписки через контекст
//         onFollowChange(true); // Обновляем состояние подписки в родительском компоненте
//       }
//     } catch (error) {
//       console.error("Error while following/unfollowing:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleFollow}
//       className={`${className} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//       disabled={loading} // Блокируем кнопку, если идет загрузка
//     >
//       {loading ? "Loading..." : isFollow ? "Unfollow" : "Follow"} {/* Показываем текст в зависимости от состояния */}
//     </button>
//   );
// };

// export default FollowButton;

















// // работает хорошо на странице стороннего пользователя (только остальные посты не меняются на unfollow)
// "use client"

// import React, { useState } from "react";
// import { $api } from "../api/api";

// interface FollowButtonProps {
//   userId: string;
//   targetUserId: string;
//   isFollow: boolean;
//   className: string;
//   onFollowChange: (newFollowStatus: boolean) => void;
// }

// const FollowButton: React.FC<FollowButtonProps> = ({
//   userId,
//   targetUserId,
//   isFollow,
//   className,
//   onFollowChange,
// }) => {
//   const [following, setFollowing] = useState(isFollow);

//   const handleFollow = async () => {
//     console.log('userId:', userId);
//     console.log('targetUserId:', targetUserId);

//     // Проверяем, что userId и targetUserId не пустые
//     if (!userId || !targetUserId) {
//       console.error("User ID or target user ID is missing");
//       return;
//     }

//     // Проверяем, пытаемся ли мы подписаться на себя
//     if (userId === targetUserId) {
//       console.log("You can't follow yourself.");
//       return;
//     }

//     // Логика подписки или отписки
//     try {
//       if (following) {
//         const response = await $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
//         if (response.status === 200) {
//           setFollowing(false);
//           onFollowChange(false);
//         }
//       } else {
//         const response = await $api.post(`/follow/${userId}/follow/${targetUserId}`);
//         if (response.status === 201) {
//           setFollowing(true);
//           onFollowChange(true);
//         }
//       }
//     } catch (error) {
//       console.error('Ошибка при подписке/отписке:', error);
//     }
//   };

//   return (
//     <button onClick={handleFollow} className={className}>
//       {following ? "Unfollow" : "Follow"}
//     </button>
//   );
// };

// export default FollowButton;
