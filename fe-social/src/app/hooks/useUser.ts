"use client"

import { useState } from "react";
import { $api } from "../api/api";

interface UserProfile {
  isFollow: boolean;
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
  filteredUsers: UserProfile[]; // Добавляем filteredUsers в тип
  searchUsers: (query: string) => void;
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
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);

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
    bio_website: string,  // Используем bio_website
    profileImage: File | null
  ): Promise<UserProfile | null> => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("bio_website", bio_website);  // Добавляем bio_website

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
      setFilteredUsers(response.data); // Сохраняем всех пользователей при первом вызове
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при получении пользователей");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция поиска пользователей по имени
  const searchUsers = (query: string): void => {
    if (!query) {
      setFilteredUsers(allUsers); // Если пустой запрос, показываем всех пользователей
      return;
    }
    const filtered = allUsers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return {
    isLoading,
    error,
    userData,
    allUsers,
    filteredUsers,
    searchUsers,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
  };
};

export default useUser;
