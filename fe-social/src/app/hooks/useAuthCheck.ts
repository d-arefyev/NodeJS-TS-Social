// hooks/useAuth.ts
import { useState } from "react";
import { $api } from "../api/api";

interface UserData {
  _id: string;
  username: string;
  email: string;
  full_name: string;
  // Дополнительные поля профиля пользователя, если нужно
}

interface UseAuthReturn {
  isLoading: boolean;
  error: string | null;
  userData: UserData | null;
  register: (username: string, email: string, password: string, full_name: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  updatePassword: (email: string, newPassword: string) => Promise<any>;
}

const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Регистрация нового пользователя
  const register = async (
    username: string,
    email: string,
    password: string,
    full_name: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await $api.post("/auth/register", {
        username,
        email,
        password,
        full_name,
      });
      setUserData(response.data.user);
      localStorage.setItem("token", response.data.token); // Сохраняем токен в localStorage
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.errors || "Ошибка при регистрации");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Логин пользователя
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await $api.post("/auth/login", { email, password });
      setUserData(response.data.user);
      localStorage.setItem("token", response.data.token); // Сохраняем токен в localStorage
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при авторизации");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление пароля
  const updatePassword = async (email: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await $api.put("/auth/updatePassword", {
        email,
        newPassword,
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при обновлении пароля");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userData,
    register,
    login,
    updatePassword,
  };
};

export default useAuth;
