"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileLinkIcon from "../atoms/ProfileLinkIcon";
import { FollowButton } from "../atoms/FollowButton"; 
import { $api } from "../api/api"; 

interface UserProfile {
  _id: string;
  username: string;
  full_name: string;
  bio: string;
  profile_image: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
  bio_website?: string;
}

interface OtherProfileProps {
  userId: string; // Идентификатор пользователя, чей профиль мы загружаем
}

const OtherProfile: React.FC<OtherProfileProps> = ({ userId }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Загружаем данные о пользователе через API
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await $api.get(`/user/${userId}`); // API запрос для получения данных пользователя
        setUserProfile(response.data); // Сохраняем данные пользователя
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    getUserProfile();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full lg:flex-row lg:gap-[85px] sm:flex-col sm:gap-[40px]">
      {/* Аватар пользователя */}
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

      {/* Информация о пользователе */}
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center gap-[24px]">
          <span className="text-[20px]">{userProfile?.username || "username"}</span>
          
          {/* Кнопка Follow и Message */}
          <FollowButton isFollow={false} userId={userProfile?._id || ""} targetUserId={userId} />
          
          <Link href={`/message/${userId}`}>
            <button className="h-[32px] px-[50px] bg-color-accent text-white text-[14px] font-semibold rounded-[8px] hover:bg-color-darkor">
              Message
            </button>
          </Link>
        </div>

        {/* Статистика */}
        <div className="flex">
          <span className="font-semibold mr-[6px]">{userProfile?.posts_count}</span> posts
          <span className="font-semibold mr-[6px]">{userProfile?.followers_count}</span> followers
          <span className="font-semibold mr-[6px]">{userProfile?.following_count}</span> following
        </div>

        {/* Биография */}
        <div className="max-w-sm">
          <span className="text-[14px] text-gcolor-gray line-clamp-3">
            {userProfile?.bio || "Write something about yourself..."}
          </span>
        </div>

        {/* Сайт */}
        <div className="max-w-sm mt-2">
          <span className="text-[14px] text-gcolor-gray line-clamp-1">
            {userProfile?.bio_website ? (
              <Link
                href={userProfile.bio_website}
                className="text-[#00376B]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-block mr-[8px]"><ProfileLinkIcon /></span>
                {userProfile.bio_website}
              </Link>
            ) : (
              "No website available"
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
