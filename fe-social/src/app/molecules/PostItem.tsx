// src/components/PostItem.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Like from "../atoms/Like";
import CommentIcon from "../atoms/CommentIcon";
import parseData from "../helpers/parseData";
import FollowButton from "../atoms/FollowButton";

type PostItemProps = {
  item: {
    _id: string;
    caption: string;
    created_at: string;
    image_url: string;
    profile_image: string;
    user_name: string;
    user_id: string | { _id: string };
    likes_count?: number;
    comments_count?: number;
    last_comment?: string;
  };
  likesCount: number;
  setLikesCount: (postId: string, newCount: number) => void;
  onFollowChange: (newFollowStatus: boolean) => void;
  isAuthenticated: boolean; // Пропс для проверки авторизации
};

const PostItem = ({
  item,
  likesCount,
  setLikesCount,
  onFollowChange,
  isAuthenticated, // Принимаем пропс
}: PostItemProps) => {
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUserId(userData._id);
    }
  }, []);

  const targetUserId =
    typeof item.user_id === "string" ? item.user_id : item.user_id._id;

  // Обработчик лайка
  const handleLikesCountChange = (newLikesCount: number) => {
    setLikesCount(item._id, newLikesCount); // Обновляем количество лайков
  };

  return (
    <li className="flex flex-col max-h-[720px] text-[12px] pb-[40px] border-b-[1px] border-b-color-gray">
      {/* Информация о пользователе */}
      <div className="flex items-center py-[6px]">
        <div className="relative w-[36px] h-[36px]">
          <Image
            src="/ava-frame.png"
            alt="Avatar frame"
            width={36}
            height={36}
            className="w-full h-full"
          />
          <Image
            src={item.profile_image || "/default-avatar.png"}
            alt="avatar"
            width={36}
            height={36}
            className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
          />
        </div>
        <div className="flex gap-[6px] ml-[6px]">
          <span className="font-semibold text-[12px]">{item.user_name}</span>
          <span className="text-color-dark-gray text-[12px]">
            &#8226; {parseData(item.created_at)} &#8226;
          </span>
          {/* Кнопка Follow */}
          <FollowButton
            userId={currentUserId}
            targetUserId={targetUserId}
            onFollowChange={onFollowChange}
            className="font-semibold text-color-accent"
          />
        </div>
      </div>

      {/* Изображение поста */}
      <Image
        src={item.image_url}
        alt="Post Image"
        width={403}
        height={505}
        className="w-full min-h-[505px] object-cover rounded-[4px]"
      />

      {/* Описание поста */}
      <div className="flex flex-col my-[10px] gap-[8px]">
        <div className="flex items-center gap-[14px]">
          <Like
            postId={item._id}
            userId={currentUserId} // ID текущего пользователя
            likesCount={item.likes_count || 0}
            onLikesCountChange={handleLikesCountChange}
            isAuthenticated={isAuthenticated}
          />
          <CommentIcon postId={item._id} />
        </div>
        <span>{likesCount} likes</span>
        <span className="flex">
          <span className="font-semibold whitespace-nowrap mr-[6px]">
            {item.user_name}
          </span>{" "}
          <span className="line-clamp-1">{item.caption}</span>
        </span>
      </div>

      {/* Комментарии */}
      <div className="flex flex-col ap-[14px]">
        <span>{item.last_comment || "Last comment"}</span>
        <span className="text-color-dark-gray">
          View all comments ({item.comments_count || 0})
        </span>
      </div>
    </li>
  );
};

export default PostItem;

// // загружается все, только лайки доступны ото всюду
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Like from "../atoms/Like";
// import CommentIcon from "../atoms/CommentIcon";
// import parseData from "../helpers/parseData";
// import FollowButton from "../atoms/FollowButton";

// type PostItemProps = {
//   item: {
//     _id: string;
//     caption: string;
//     created_at: string;
//     image_url: string;
//     profile_image: string;
//     user_name: string;
//     user_id: string | { _id: string };
//     likes_count?: number;
//     comments_count?: number;
//     last_comment?: string;
//   };
//   likesCount: number;
//   setLikesCount: (postId: string, newCount: number) => void;
//   onFollowChange: (newFollowStatus: boolean) => void;
// };

// const PostItem = ({
//   item,
//   likesCount,
//   setLikesCount,
//   onFollowChange,
// }: PostItemProps) => {
//   const [currentUserId, setCurrentUserId] = useState<string>("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setCurrentUserId(userData._id);
//     }
//   }, []);

//   const targetUserId =
//     typeof item.user_id === "string" ? item.user_id : item.user_id._id;

//   // Обработчик лайка
//   const handleLikesCountChange = (newLikesCount: number) => {
//     setLikesCount(item._id, newLikesCount); // Обновляем количество лайков
//   };

//   return (
//     <li className="flex flex-col max-h-[720px] text-[12px] pb-[40px] border-b-[1px] border-b-color-gray">
//       {/* Информация о пользователе */}
//       <div className="flex items-center py-[6px]">
//         <div className="relative w-[36px] h-[36px]">
//           <Image
//             src="/ava-frame.png"
//             alt="Avatar frame"
//             width={36}
//             height={36}
//             className="w-full h-full"
//           />
//           <Image
//             src={item.profile_image || "/default-avatar.png"}
//             alt="avatar"
//             width={36}
//             height={36}
//             className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
//           />
//         </div>
//         <div className="flex gap-[6px] ml-[6px]">
//           <span className="font-semibold text-[12px]">{item.user_name}</span>
//           <span className="text-color-dark-gray text-[12px]">
//             &#8226; {parseData(item.created_at)} &#8226;
//           </span>
//           {/* Кнопка Follow */}
//           <FollowButton
//             userId={currentUserId}
//             targetUserId={targetUserId}
//             onFollowChange={onFollowChange}
//             className="font-semibold text-color-accent"
//           />
//         </div>
//       </div>

//       {/* Изображение поста */}
//       <Image
//         src={item.image_url}
//         alt="Post Image"
//         width={403}
//         height={505}
//         className="w-full min-h-[505px] object-cover rounded-[4px]"
//       />

//       {/* Описание поста */}
//       <div className="flex flex-col my-[10px] gap-[8px]">
//         <div className="flex items-center gap-[14px]">
//           <Like
//             postId={item._id}
//             userId={targetUserId}
//             likesCount={likesCount}
//             onLikesCountChange={handleLikesCountChange}
//           />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span className="flex">
//           <span className="font-semibold whitespace-nowrap mr-[6px]">{item.user_name}</span>{" "}
//           <span className="line-clamp-1">{item.caption}</span>
//         </span>
//       </div>

//       {/* Комментарии */}
//       <div className="flex flex-col ap-[14px]">
//         <span>{item.last_comment || "Last comment"}</span>
//         <span className="text-color-dark-gray">
//           View all comments ({item.comments_count || 0})
//         </span>
//       </div>
//     </li>
//   );
// };

// export default PostItem;
