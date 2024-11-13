import { useState } from 'react';
import { $api } from '../api/api'; // Используем импортированный экземпляр API

type User = {
  _id: string;
  username: string;
  bio: string;
};

type Post = {
  _id: string;
  content: string;
  caption: string;
  user_id: {
    username: string;
  };
};

type UseSearchReturnType = {
  users: User[];
  posts: Post[];
  loading: boolean;
  error: string | null;
  searchUsers: (query: string) => void;
  searchPosts: (query: string) => void;
};

const useSearch = (): UseSearchReturnType => {
  const [users, setUsers] = useState<User[]>([]); // Список пользователей
  const [posts, setPosts] = useState<Post[]>([]); // Список постов
  const [loading, setLoading] = useState<boolean>(false); // Статус загрузки
  const [error, setError] = useState<string | null>(null); // Сообщение об ошибке

  // Функция для поиска пользователей
  const searchUsers = async (query: string) => {
    try {
      setLoading(true);
      const response = await $api.get(`/search/users?query=${query}`); // Используем $api для запроса
      setUsers(response.data);
    } catch (err) {
      setError('Не удалось найти пользователей');
    } finally {
      setLoading(false);
    }
  };

  // Функция для поиска постов
  const searchPosts = async (query: string) => {
    try {
      setLoading(true);
      const response = await $api.get(`/search/posts?query=${query}`); // Используем $api для запроса
      setPosts(response.data);
    } catch (err) {
      setError('Не удалось найти посты');
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    posts,
    loading,
    error,
    searchUsers,
    searchPosts,
  };
};

export default useSearch;
