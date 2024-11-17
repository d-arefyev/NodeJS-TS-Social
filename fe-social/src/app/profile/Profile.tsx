"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  bio_website?: string;
}

interface ProfileProps {
  userId: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем данные профиля из localStorage, если они есть
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full lg:flex-row lg:gap-[85px] sm:flex-col sm:gap-[40px]">
      {/* Avatar */}
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

      {/* Bio */}
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center gap-[24px]">
          <span className="text-[20px]">
            {userProfile?.username || "username"}
          </span>
          <Link href="/edit-profile">
            <button className="py-[6px] px-[50px] bg-color-gray hover:bg-color-accent text-[14px] font-semibold text-color-darkor rounded-[8px] hover:text-color-light">
              Edit profile
            </button>
          </Link>
        </div>
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
        <div className="max-w-sm">
          <span className="text-[14px] text-gcolor-gray line-clamp-3">
            {userProfile?.bio || "Write something about yourself..."}
          </span>
        </div>
        <div className="max-w-sm mt-2">
          <span className="text-[14px] text-gcolor-gray line-clamp-1">
            {userProfile?.bio_website ? ( 
              <Link
                href={userProfile.bio_website} 
                className="text-[#00376B]"
                target="_blank"
                rel="noopener noreferrer" 
              >
                <span className="inline-block mr-[8px]" ><ProfileLinkIcon /></span>
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

export default Profile;