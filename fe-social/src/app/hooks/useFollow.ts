import { useState, useEffect, useCallback } from "react";
import { $api } from "../api/api"; // Используем импортированное API

type FollowUserResponse = {
  id: string;
  username: string;
};

interface UseFollowResponse {
  followers: FollowUserResponse[] | null;
  following: FollowUserResponse[] | null;
  loading: boolean;
  error: string | null;
  followUser: (targetUserId: string) => Promise<void>;
  unfollowUser: (targetUserId: string) => Promise<void>;
}

const useFollow = (userId: string, token: string): UseFollowResponse => {
  const [followers, setFollowers] = useState<FollowUserResponse[] | null>(null);
  const [following, setFollowing] = useState<FollowUserResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения подписчиков
  const getFollowers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await $api.get(`/follow/${userId}/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFollowers(response.data);
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке подписчиков');
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  // Функция для получения списка подписок
  const getFollowing = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await $api.get(`/follow/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFollowing(response.data);
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке подписок');
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  // Функция для подписки на пользователя
  const followUser = async (targetUserId: string) => {
    setLoading(true);
    setError(null);

    try {
      await $api.post(
        `/follow/${userId}/follow/${targetUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // После успешной подписки, обновляем локальные состояния
      setFollowing((prevFollowing) => 
        prevFollowing ? [...prevFollowing, { id: targetUserId, username: 'Username'}] : [{ id: targetUserId, username: 'Username'}]
      );
      setFollowers((prevFollowers) => 
        prevFollowers ? [...prevFollowers, { id: targetUserId, username: 'Username'}] : [{ id: targetUserId, username: 'Username'}]
      );

    } catch (err: any) {
      setError(err.message || 'Ошибка при подписке');
    } finally {
      setLoading(false);
    }
  };

  // Функция для отписки от пользователя
  const unfollowUser = async (targetUserId: string) => {
    setLoading(true);
    setError(null);

    try {
      await $api.delete(
        `/follow/${userId}/unfollow/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // После успешной отписки, обновляем локальные состояния
      setFollowing((prevFollowing) =>
        prevFollowing ? prevFollowing.filter(user => user.id !== targetUserId) : []
      );
      setFollowers((prevFollowers) =>
        prevFollowers ? prevFollowers.filter(user => user.id !== targetUserId) : []
      );

    } catch (err: any) {
      setError(err.message || 'Ошибка при отписке');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Загружаем подписчиков и подписки при монтировании компонента
    getFollowers();
    getFollowing();
  }, [getFollowers, getFollowing]);

  return { followers, following, loading, error, followUser, unfollowUser };
};

export default useFollow;
