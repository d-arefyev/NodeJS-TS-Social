"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import ProfileLinkIcon from "../atoms/ProfileLinkIcon";

const EditProfile: React.FC = () => {
  const { isLoading, userData, updateUserProfile, error } = useUser();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState(""); // Храним website
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>("");

  const router = useRouter();

  // Загружаем данные профиля из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username || "");
      setBio(user.bio || "");
      setWebsite(user.website || "");
      setImagePreview(user.profile_image || "");
    }
  }, []);

  // Загружаем превью изображения при изменении файла
  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImage]);

  // Обработчик изменения изображения
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file); // Обновляем состояние с выбранным изображением
    }
  };

  // Обработчик сохранения данных
  const handleSave = async () => {
    if (username && bio) {
      try {
        const updatedData = await updateUserProfile(
          username,
          bio,
          website,
          profileImage
        );

        if (updatedData) {
          // Сохраняем обновленные данные в localStorage
          const userWithWebsite = {
            ...updatedData,
            website,
          };

          localStorage.setItem("user", JSON.stringify(userWithWebsite)); // Сохраняем в localStorage
          router.push("/profile"); // Редирект на страницу профиля
        }
      } catch (err) {
        console.error("Error updating profile:", err);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Показываем индикатор загрузки
  }

  return (
    <div className="globalContainer max-w-[610px] pt-[50px] pb-[117px] flex justify-center">
      <div className="w-[700px] flex flex-col">
        <h2 className="mb-6">Edit Profile</h2>

        <div className="flex justify-between items-center gap-[16px] h-[88px] bg-color-light-gray rounded-[20px] p-[16px] mt-[40px]">
          {/* аватар и загрузка фото */}
          <div className="flex items-center gap-[16px] pr-[16px]">
            <div className="w-[56px] min-w-[56px] h-[56px]">
              <img
                src={imagePreview || "/default-avatar.png"} // Показываем превью изображения
                alt="Profile Avatar"
                className="w-full h-full m-auto border bg-color-gray rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{username}</span>
              <span className="text-[14px] text-color-dark-gray leading-5 line-clamp-2">
                {bio}
              </span>
            </div>
          </div>
          <div className="relative inline-block">
            {/* Скрытый input для загрузки изображения */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              id="fileInput"
            />
            {/* Кнопка для загрузки изображения */}
            <label
              htmlFor="fileInput"
              className="whitespace-nowrap text-[14px] font-semibold bg-color-accent hover:bg-color-dark text-white px-[16px] py-[8px] rounded-[8px] cursor-pointer transition-all"
            >
              New photo
            </label>
          </div>
        </div>

        {/* Форма для редактирования данных профиля */}
        <div className="flex flex-col w-full gap-[20px] mt-[33px]">
          {/* Заголовок и редактируемый инпут для username */}
          <div className="flex flex-col w-full gap-[7px]">
            <label className="font-semibold" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Обновляем состояние при изменении
              className="text-[14px] text-color-dark-gray p-[10px] border border-color-gray rounded-[12px]"
            />
          </div>

          {/* Заголовок и редактируемый инпут для website */}
          <div className="flex flex-col w-full gap-[7px]">
            <label className="font-semibold" htmlFor="website">
              Website
            </label>
            <div className="flex items-center text-[14px] p-[10px] border border-color-gray rounded-[12px] ">
              <ProfileLinkIcon />
              <input
                id="website"
                type="text"
                value={website} // Привязываем значение
                onChange={(e) => setWebsite(e.target.value)} // Обновляем состояние
                className="ml-2 w-full text-[#00376B]"
              />
            </div>
          </div>
          {/* Заголовок и редактируемый текстареа для bio */}
          <div className="relative flex flex-col w-full gap-[7px]">
            <label className="font-semibold" htmlFor="bio">
              About
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)} // Обновляем состояние
              maxLength={150}
              className="text-[14px] text-color-dark-gray p-[10px] border border-color-gray rounded-[12px] resize-none h-[66px]"
            ></textarea>
            <span className="absolute right-2 bottom-2 text-[12px] text-color-dark-gray">
              {bio.length}/150
            </span>
          </div>

          {/* Кнопка сохранения */}
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-[268px] px-[100px] py-[7px] rounded-[8px] self-start text-[14px] font-semibold text-color-light bg-color-accent hover:bg-color-dark  hover:text-color-light mt-[67px]"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default EditProfile;
