"use client";

import React, { useState, useEffect } from "react";
import { LikeIcon, LikedIcon } from "../atoms/LikeIcon";
import { $api } from "../api/api";

interface LikeProps {
  postId: string;
  userId: string;
  onLikesCountChange: (newCount: number) => void;
}

const Like: React.FC<LikeProps> = ({ postId, userId, onLikesCountChange }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Первоначальная загрузка данных
  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        const response = await $api.get(`/likes/${postId}/likes`);
        setLikesCount(response.data.likesCount); // инициализация счетчика
        setLiked(response.data.likedByUser); // инициализация состояния
      } catch (error) {
        console.error("Ошибка при получении данных о лайках:", error);
      }
    };

    fetchLikesData();
  }, [postId]);

  // Функция для переключения состояния лайка
  const handleLikeToggle = async () => {
    if (isLoading) return; // Предотвращаем повторные клики во время запроса
    setIsLoading(true);

    try {
      // Определение URL и метода запроса
      const url = liked
        ? `/likes/${postId}/unlike/${userId}`
        : `/likes/${postId}/like/${userId}`;
      const method = liked ? "delete" : "post";

      // Выполняем запрос на сервер
      const response = await $api({ method, url });

      if (response.status === 200 || response.status === 201) {
        // Обновляем локальные состояния только после успешного ответа от сервера
        const newLikedState = !liked;
        const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;

        setLiked(newLikedState);
        setLikesCount(newLikesCount);
        onLikesCountChange(newLikesCount); // обновляем счетчик родительского компонента
      } else {
        console.error("Ошибка изменения состояния лайка:", response.status);
      }
    } catch (error) {
      console.error("Ошибка при переключении состояния лайка:", error);
    } finally {
      setIsLoading(false); // Разблокируем клики
    }
  };

  return (
    <div className="flex items-center space-x-1">
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
