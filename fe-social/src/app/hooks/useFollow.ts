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
  followUser: (targetUserId: string) => void;
  unfollowUser: (targetUserId: string) => void;
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
      setError(err.message);
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  // Функция для подписки на пользователя
  const followUser = async (targetUserId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await $api.post(
        `/follow/${userId}/follow/${targetUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Обновляем список подписок и подписчиков
      getFollowers();
      getFollowing();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Функция для отписки от пользователя
  const unfollowUser = async (targetUserId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await $api.delete(
        `/follow/${userId}/unfollow/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Обновляем список подписок и подписчиков
      getFollowers();
      getFollowing();
    } catch (err: any) {
      setError(err.message);
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
