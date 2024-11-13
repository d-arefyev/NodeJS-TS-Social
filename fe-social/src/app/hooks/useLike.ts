import { useState, useEffect, useCallback } from "react";
import { $api } from "../api/api";

interface UseLikeProps {
  postId: string;
  userId: string;
  onLikesCountChange?: (newCount: number) => void;
}

const useLike = ({ postId, userId, onLikesCountChange }: UseLikeProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        const { data } = await $api.get(`/likes/${postId}/likes`);
        setLikesCount(data.likesCount);
        setLiked(data.likedByUser);
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };
    fetchLikesData();
  }, [postId]);

  const toggleLike = useCallback(async () => {
    const method = liked ? "delete" : "post";
    const url = liked
      ? `/likes/${postId}/unlike/${userId}`
      : `/likes/${postId}/like/${userId}`;

    try {
      const response = await $api({ method, url });
      if (response.status === 200 || response.status === 201) {
        const newLiked = !liked;
        const newLikesCount = likesCount + (newLiked ? 1 : -1);
        setLiked(newLiked);
        setLikesCount(newLikesCount);
        onLikesCountChange?.(newLikesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }, [liked, likesCount, postId, userId, onLikesCountChange]);

  return { liked, likesCount, toggleLike };
};

export default useLike;





// import { useState } from 'react';
// import { $api } from '../api/api';

// type Like = {
//   _id: string;
//   post_id: string;
//   user_id: string;
//   created_at: string;
// };

// type UseLikesReturnType = {
//   likes: Like[];
//   loading: boolean;
//   error: string | null;
//   getPostLikes: (postId: string) => void;
//   likePost: (postId: string, userId: string) => void;
//   unlikePost: (postId: string, userId: string) => void;
// };

// const useLikes = (): UseLikesReturnType => {
//   const [likes, setLikes] = useState<Like[]>([]); // Состояние для хранения лайков
//   const [loading, setLoading] = useState<boolean>(false); // Статус загрузки
//   const [error, setError] = useState<string | null>(null); // Сообщение об ошибке

//   // Функция для получения лайков для поста
//   const getPostLikes = async (postId: string) => {
//     try {
//       setLoading(true);
//       const response = await $api.get(`/likes/${postId}/likes`); // Используем $api для запроса
//       setLikes(response.data);
//     } catch (err) {
//       setError('Не удалось получить лайки');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функция для добавления лайка
//   const likePost = async (postId: string, userId: string) => {
//     try {
//       setLoading(true);
//       const response = await $api.post(`/likes/${postId}/like/${userId}`); // Используем $api для запроса
//       setLikes((prevLikes) => [...prevLikes, response.data]);
//     } catch (err) {
//       setError('Не удалось лайкнуть пост');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функция для удаления лайка
//   const unlikePost = async (postId: string, userId: string) => {
//     try {
//       setLoading(true);
//       await $api.delete(`/likes/${postId}/unlike/${userId}`); // Используем $api для запроса
//       setLikes((prevLikes) => prevLikes.filter(like => like.user_id !== userId));
//     } catch (err) {
//       setError('Не удалось удалить лайк');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     likes,
//     loading,
//     error,
//     getPostLikes,
//     likePost,
//     unlikePost,
//   };
// };

// export default useLikes;
