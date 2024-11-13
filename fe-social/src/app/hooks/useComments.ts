import { useState, useEffect } from 'react';
import { $api } from '../api/api';

type Comment = {
  _id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
};

type UseCommentsReturnType = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  addComment: (postId: string, userId: string, commentText: string) => void;
  deleteComment: (commentId: string) => void;
};

const useComments = (postId: string): UseCommentsReturnType => {
  const [comments, setComments] = useState<Comment[]>([]); // Массив комментариев
  const [loading, setLoading] = useState<boolean>(false); // Статус загрузки
  const [error, setError] = useState<string | null>(null); // Сообщение об ошибке

  // Функция для получения комментариев
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await $api.get(`/comment/${postId}`); // Используем $api для запроса
      setComments(response.data);
    } catch (err) {
      setError('Не удалось загрузить комментарии');
    } finally {
      setLoading(false);
    }
  };

  // Функция для добавления комментария
  const addComment = async (postId: string, userId: string, commentText: string) => {
    try {
      const response = await $api.post(`/comment/${postId}`, {
        userId,
        comment_text: commentText,
      });
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (err) {
      setError('Не удалось добавить комментарий');
    }
  };

  // Функция для удаления комментария
  const deleteComment = async (commentId: string) => {
    try {
      await $api.delete(`/comment/${commentId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      setError('Не удалось удалить комментарий');
    }
  };

  // Загружаем комментарии при первом рендере компонента
  useEffect(() => {
    fetchComments();
  }, [postId]); // Зависимость от postId

  return { comments, loading, error, addComment, deleteComment };
};

export default useComments;
