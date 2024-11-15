import { useState } from 'react';
import { $api } from '../api/api';

export interface Post {
  _id: string;
  user_id: string;
  image_url: string;
  caption: string;
  created_at: string;
  user_name: string;
  profile_image: string;
  likes_count?: number;
  comments_count?: number;
  last_comment?: string;
}

interface UsePosts {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: string | null;
  getPosts: () => Promise<void>;
  getPostById: (postId: string) => Promise<void>;
  getPublicPosts: () => Promise<void>;  // Новый метод
  createPost: (postData: { caption: string; image: File }) => Promise<void>;
  updatePost: (postId: string, postData: { caption?: string; image_url?: string }) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

const usePosts = (): UsePosts => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Очистка ошибки
  const clearError = () => setError(null);

  // Получение всех постов
  const getPosts = async (): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const response = await $api.get("/post/all/public");
      setPosts(response.data);
    } catch (err) {
      console.error("Ошибка при загрузке постов:", err);
      setError("Ошибка при загрузке постов");
    } finally {
      setLoading(false);
    }
  };

  // Получение публичных постов
  const getPublicPosts = async (): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const response = await $api.get("/post/all/public");
      setPosts(response.data);  // Сохраняем публичные посты в состояние
    } catch (err) {
      console.error("Ошибка при загрузке публичных постов:", err);
      setError("Ошибка при загрузке публичных постов");
    } finally {
      setLoading(false);
    }
  };

  // Получение одного поста по ID
  const getPostById = async (postId: string): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const response = await $api.get(`/post/${postId}`);
      setPost(response.data);
    } catch (err) {
      console.error("Ошибка при загрузке поста:", err);
      setError("Ошибка при загрузке поста");
    } finally {
      setLoading(false);
    }
  };

  // Создание нового поста
  const createPost = async (postData: { caption: string; image: File }): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const formData = new FormData();
      formData.append("caption", postData.caption);
      formData.append("image", postData.image);

      const response = await $api.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
      setError("Ошибка при создании поста");
    } finally {
      setLoading(false);
    }
  };

  // Обновление поста
  const updatePost = async (postId: string, postData: { caption?: string; image_url?: string }): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const response = await $api.put(`/post/${postId}`, postData);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? response.data : post))
      );
      setPost(response.data);
    } catch (err) {
      console.error("Ошибка при обновлении поста:", err);
      setError("Ошибка при обновлении поста");
    } finally {
      setLoading(false);
    }
  };

  // Удаление поста
  const deletePost = async (postId: string): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      await $api.delete(`/post/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Ошибка при удалении поста:", err);
      setError("Ошибка при удалении поста");
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    post,
    loading,
    error,
    getPosts,
    getPostById,
    getPublicPosts,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;