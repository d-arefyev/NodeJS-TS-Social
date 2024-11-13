// // src/app/profile/Profile.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { $api } from "../api/api";
import Link from "next/link";
import ProfileLinkIcon from "../atoms/ProfileLinkIcon";

interface UserProfile {
  _id: string;
  username: string;
  full_name: string;
  bio: string;
  profile_image: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
  website?: string;
}

interface ProfileProps {
  userId: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Получаем данные из localStorage, если они есть
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
      setIsLoading(false);
    } else {
      getUserProfile();
    }
  }, []);

  // Функция для получения данных профиля пользователя с сервера
  const getUserProfile = async () => {
    try {
      const response = await $api.get(`/user/${userId}`);
      setUserProfile(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error getting profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Если данные ещё загружаются
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {/* Профиль */}
      <div className="flex w-full lg:flex-row lg:gap-[85px] sm:flex-col sm:gap-[40px]">
        {/* Левая часть - аватар */}
        <div className="relative w-[168px] h-[168px]">
          <Image
            src="/ava-b-frame.png"
            alt="Avatar frame"
            width={168}
            height={168}
            className="w-full h-full"
          />
          <Image
            src={userProfile?.profile_image || "/default-avatar.png"}
            alt="Profile Avatar"
            width={150}
            height={150}
            className="absolute inset-0 w-[150px] h-[150px] m-auto border bg-color-gray rounded-full"
          />
        </div>

        {/* Правая часть - данные профиля */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center gap-[24px]">
            <span className="text-[20px]">
              {userProfile?.username || "username"}
            </span>
            <Link href="/edit-profile">
              <button className="h-[32px] px-[50px] bg-color-gray hover:bg-color-accent text-[14px] font-semibold text-color-darkor rounded-[8px] hover:text-color-light ">
                Edit profile
              </button>
            </Link>
          </div>

          {/* Статистика профиля */}
          <div className="flex">
            <span className="font-semibold mr-[6px]">
              {userProfile?.posts_count}
            </span>{" "}
            <span className="mr-[40px]">posts</span>
            <span className="font-semibold mr-[6px]">
              {userProfile?.followers_count}
            </span>{" "}
            <span className="mr-[40px]">followers</span>
            <span className="font-semibold mr-[6px]">
              {userProfile?.following_count}
            </span>{" "}
            <span className="mr-[40px]">following</span>
          </div>

          {/* Описание профиля */}
          <div className="max-w-sm">
            <span className="text-[14px] text-gcolor-gray line-clamp-3">
              {userProfile?.bio || "Write something about yourself..."}
            </span>
          </div>
          <Link
            href={userProfile?.website || "#"}
            className="flex items-center text-[14px] font-semibold text-[#00376B]"
            target="_blank"
          >
            <ProfileLinkIcon />
            <span className="block ml-[4px]">web-site</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;