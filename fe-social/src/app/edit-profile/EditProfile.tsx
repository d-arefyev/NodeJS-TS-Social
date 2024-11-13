"use client";

import { useState, useEffect } from "react";
import { $api } from "../api/api";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("/default-profile.png");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Загрузка данных профиля из localStorage или с сервера
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsername(userData.username);
      setBio(userData.bio);
      setWebsite(userData.website || "");
      setProfileImageUrl(userData.profile_image || "/default-profile.png");
    } else {
      getUserProfile();
    }
  }, []);

  // Функция получения данных профиля с сервера
  const getUserProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID not found");
        return;
      }

      const response = await $api.get(`/user/${userId}`);
      const userData = response.data;
      setUsername(userData.username);
      setBio(userData.bio);
      setWebsite(userData.website || "");
      setProfileImageUrl(userData.profile_image || "/default-profile.png");
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      setError("Не удалось загрузить профиль");
      console.error("Ошибка получения профиля:", error);
    }
  };

  // Обработчик загрузки изображения
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageUrl(reader.result as string); // Отображаем превью изображения
    };
    reader.readAsDataURL(file);

    setProfileImageFile(file); // Сохраняем файл для отправки на сервер
  };

  // Функция обработки отправки формы для обновления профиля
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Создаем объект FormData для отправки данных
    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("website", website);
    if (profileImageFile) {
      formData.append("profile_image", profileImageFile); // Добавляем файл, если он выбран
    }

    try {
      const response = await $api.put("/user/current", formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Указываем, что это multipart форма
        },
      });

      if (response.status === 200) {
        // Обновление данных в localStorage и UI
        localStorage.setItem("user", JSON.stringify(response.data));
        router.refresh(); // Перезагрузка страницы или данных
      } else {
        setError("Ошибка обновления профиля");
      }
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      setError("Ошибка обновления профиля");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-center">Редактировать профиль</h3>

      {/* Аватар и имя пользователя */}
      <div className="flex items-center gap-4 mb-6 bg-gray-100 p-4 rounded-lg">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border border-gray-300"
        />
        <div>
          <p className="text-lg font-semibold">{username}</p>
        </div>
      </div>

      {/* Компонент загрузки изображения */}
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 file:hover:bg-gray-100"
        />
      </div>

      {/* Форма для обновления данных профиля */}
      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 mt-4">
        <div>
          <label className="block font-medium text-gray-700">Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Веб-сайт</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">О себе</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={150}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Расскажите о себе"
          />
          <p className="text-right text-gray-500 text-sm">{bio.length} / 150</p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition mt-4"
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

