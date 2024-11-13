import { useState } from "react";
import { $api } from "../api/api";

interface UserProfile {
  _id: string;
  username: string;
  full_name: string;
  bio: string;
  bio_website?: string;
  profile_image: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
}

interface UseUserResult {
  isLoading: boolean;
  error: string | null;
  userData: UserProfile | null;
  allUsers: UserProfile[];
  getUserProfile: (userId: string) => Promise<UserProfile | null>;
  updateUserProfile: (
    username: string,
    bio: string,
    bio_website: string,
    profileImage: File | null
  ) => Promise<UserProfile | null>;
  getAllUsers: () => Promise<UserProfile[] | null>;
}

const useUser = (): UseUserResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);

  // Получение профиля пользователя по его ID
  const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await $api.get(`/user/${userId}`);
      setUserData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при получении профиля");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление профиля пользователя
  const updateUserProfile = async (
    username: string,
    bio: string,
    bio_website: string,
    profileImage: File | null
  ): Promise<UserProfile | null> => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("bio_website", bio_website);

    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    try {
      const response = await $api.put("/user/current", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при обновлении профиля");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Получение списка всех пользователей
  const getAllUsers = async (): Promise<UserProfile[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await $api.get("/user");
      setAllUsers(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при получении пользователей");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userData,
    allUsers,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
  };
};

export default useUser;
