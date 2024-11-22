"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import FollowButton from "../atoms/FollowButton";
import ProfileLinkIcon from "../atoms/ProfileLinkIcon";
import { useFollow } from "../context/FollowContext";
import { $api } from "../api/api";

interface UserProfile {
  isFollow: boolean;
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
  userProfile: UserProfile;
  userId: string;
  onFollowChange: (
    currentUserId: string,
    targetUserId: string,
    newFollowStatus: boolean
  ) => void;
}

const OtherProfile: React.FC<OtherProfileProps> = ({
  userProfile,
  userId,
  onFollowChange,
}) => {
  const { following } = useFollow(); // Используем контекст для управления подписками
  const [isFollowing, setIsFollowing] = useState(following[userProfile._id] || false); // Локальное состояние подписки

  // Загружаем подписки при монтировании компонента
  useEffect(() => {
    const fetchFollowingStatus = async () => {
      try {
        // Получаем список пользователей, на которых подписан текущий пользователь
        const response = await $api.get(`/follow/${userId}/following`);
        const followingData = response.data;

        // Устанавливаем локальное состояние подписки на основе данных с сервера
        const initialFollowingStatus = followingData.includes(userProfile._id);
        setIsFollowing(initialFollowingStatus); // Обновляем локальное состояние подписки
      } catch (error) {
        console.error("Error fetching following data:", error);
      }
    };

    fetchFollowingStatus();
  }, [userId, userProfile._id]);

  // Обработчик изменения состояния подписки (передаем его в кнопку FollowButton)
  const handleFollowChange = (newFollowStatus: boolean) => {
    setIsFollowing(newFollowStatus); // Обновляем локальное состояние подписки
    onFollowChange(userId, userProfile._id, newFollowStatus); // Передаем обновление родительскому компоненту
  };

  return (
    <div className="flex w-full lg:flex-row lg:gap-[85px] sm:flex-col sm:gap-[40px]">
      {/* Аватар */}
      <div className="relative w-[168px] h-[168px]">
        <img
          src="/ava-b-frame.png"
          alt="Avatar frame"
          width={168}
          height={168}
          className="w-full h-full"
        />
        <img
          src={userProfile.profile_image || "/default-avatar.png"}
          alt="Profile Avatar"
          width={150}
          height={150}
          className="absolute inset-0 w-[150px] h-[150px] m-auto border bg-color-gray rounded-full"
        />
      </div>

      {/* Биография */}
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center gap-[24px]">
          <span className="text-[20px] font-semibold">{userProfile.username}</span>
          <div className="flex gap-[8px]">
            {/* Кнопка подписки */}
            <FollowButton
              userId={userId}
              targetUserId={userProfile._id}
              onFollowChange={handleFollowChange} // Обработчик для изменения подписки
              className="py-[6px] px-[50px] bg-color-accent hover:bg-color-dark text-[14px] font-semibold text-color-light rounded-[8px] hover:text-color-light" isFollow={false}            />
            {/* Кнопка сообщений */}
            <Link
              href={`/message/${userProfile._id}`}
              className="py-[6px] px-[50px] bg-color-gray hover:bg-color-accent text-[14px] font-semibold text-color-darkor rounded-[8px] hover:text-color-light"
            >
              Message
            </Link>
          </div>
        </div>

        {/* Статистика пользователя */}
        <div className="flex">
          <span className="font-semibold mr-[6px]">{userProfile.posts_count}</span>
          <span className="mr-[40px]">posts</span>
          <span className="font-semibold mr-[6px]">{userProfile.followers_count}</span>
          <span className="mr-[40px]">followers</span>
          <span className="font-semibold mr-[6px]">{userProfile.following_count}</span>
          <span className="mr-[40px]">following</span>
        </div>

        {/* Биография */}
        <div className="max-w-sm">
          <span className="text-[14px] text-gcolor-gray line-clamp-3">
            {userProfile.bio || "Write something about yourself..."}
          </span>
        </div>

        {/* Ссылка на сайт */}
        <div className="max-w-sm mt-2">
          <span className="text-[14px] text-gcolor-gray line-clamp-1">
            {userProfile.bio_website ? (
              <Link
                href={userProfile.bio_website}
                className="text-[#00376B]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-block mr-[8px]">
                  <ProfileLinkIcon />
                </span>
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












// // кнопка подписки работает отлично, записывается и удаляется из ДБ (только остальные посты не меняются на unfollow)
// "use client";

// import React from "react";
// import Link from "next/link";
// import FollowButton from "../atoms/FollowButton";
// import ProfileLinkIcon from "../atoms/ProfileLinkIcon";

// interface UserProfile {
//   isFollow: boolean;
//   _id: string;
//   username: string;
//   full_name: string;
//   bio: string;
//   profile_image: string;
//   posts_count: number;
//   followers_count: number;
//   following_count: number;
//   bio_website?: string;
// }

// interface OtherProfileProps {
//   userProfile: UserProfile;
//   userId: string;
//   onFollowChange: (
//     currentUserId: string,
//     targetUserId: string,
//     newFollowStatus: boolean
//   ) => void;
// }

// const OtherProfile: React.FC<OtherProfileProps> = ({
//   userProfile,
//   userId,
//   onFollowChange,
// }) => {
//   // Обработчик изменения подписки
//   const handleFollowChange = (newFollowStatus: boolean) => {
//     onFollowChange(userId, userProfile._id, newFollowStatus); // Передаем currentUserId и targetUserId
//   };

//   return (
//     <div className="flex w-full lg:flex-row lg:gap-[85px] sm:flex-col sm:gap-[40px]">
//       {/* Аватар */}
//       <div className="relative w-[168px] h-[168px]">
//         <img
//           src="/ava-b-frame.png"
//           alt="Avatar frame"
//           width={168}
//           height={168}
//           className="w-full h-full"
//         />
//         <img
//           src={userProfile.profile_image || "/default-avatar.png"}
//           alt="Profile Avatar"
//           width={150}
//           height={150}
//           className="absolute inset-0 w-[150px] h-[150px] m-auto border bg-color-gray rounded-full"
//         />
//       </div>

//       {/* Биография */}
//       <div className="flex flex-col gap-[20px]">
//         <div className="flex items-center gap-[24px]">
//           <span className="text-[20px]">{userProfile.username}</span>
//           <div className="flex gap-[8px]">
//             <FollowButton
//               isFollow={userProfile.isFollow}
//               userId={userId}
//               targetUserId={userProfile._id}
//               onFollowChange={handleFollowChange}
//               className="py-[6px] px-[50px] bg-color-accent hover:bg-color-dark text-[14px] font-semibold text-color-light rounded-[8px] hover:text-color-light"
//             />
//             <Link
//               href={`/message/${userProfile._id}`}
//               className="py-[6px] px-[50px] bg-color-gray hover:bg-color-accent text-[14px] font-semibold text-color-darkor rounded-[8px] hover:text-color-light"
//             >
//               Message
//             </Link>
//           </div>
//         </div>
//         <div className="flex">
//           <span className="font-semibold mr-[6px]">
//             {userProfile.posts_count}
//           </span>
//           <span className="mr-[40px]">posts</span>
//           <span className="font-semibold mr-[6px]">
//             {userProfile.followers_count}
//           </span>
//           <span className="mr-[40px]">followers</span>
//           <span className="font-semibold mr-[6px]">
//             {userProfile.following_count}
//           </span>
//           <span className="mr-[40px]">following</span>
//         </div>
//         <div className="max-w-sm">
//           <span className="text-[14px] text-gcolor-gray line-clamp-3">
//             {userProfile.bio || "Write something about yourself..."}
//           </span>
//         </div>
//         <div className="max-w-sm mt-2">
//           <span className="text-[14px] text-gcolor-gray line-clamp-1">
//             {userProfile.bio_website ? (
//               <Link
//                 href={userProfile.bio_website}
//                 className="text-[#00376B]"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <span className="inline-block mr-[8px]">
//                   <ProfileLinkIcon />
//                 </span>
//                 {userProfile.bio_website}
//               </Link>
//             ) : (
//               "No website available"
//             )}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtherProfile;
