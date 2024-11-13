// src/hooks/useUser.ts
import { useState, useEffect } from "react";
import { $api } from "../api/api";

interface User {
  username: string;
  full_name: string;
  bio: string;
  avatar?: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await $api.get("/user/current"); // Замените на нужный путь API
        setUser(response.data);
        setUserAvatar(response.data.avatar || null); // Если аватар есть, то сохраняем его
      } catch (error) {
        setError("Ошибка при загрузке данных пользователя.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const updateUser = async (formData: FormData) => {
    try {
      const response = await $api.put("/user/current", formData); // Путь для обновления данных пользователя
      setUser(response.data); // Обновляем данные пользователя
      setUserAvatar(response.data.avatar || null); // Если был обновлен аватар
      return true;
    } catch (error) {
      setError("Ошибка при обновлении данных.");
      return false;
    }
  };

  return {
    user,
    isLoading,
    error,
    updateUser,
    userAvatar,
  };
}
