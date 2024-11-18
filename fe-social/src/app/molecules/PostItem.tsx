"use client";

import React, { useEffect, useState } from "react";
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
};

const PostItem = ({
  item,
  likesCount,
  setLikesCount,
  onFollowChange,
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
            userId={targetUserId}
            likesCount={likesCount}
            onLikesCountChange={handleLikesCountChange}
          />
          <CommentIcon postId={item._id} />
        </div>
        <span>{likesCount} likes</span>
        <span>
          <span className="font-semibold italic">{item.user_name}</span>:{" "}
          {item.caption}
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
//   const handleLike = () => {
//     const newLikesCount = likesCount + 1;
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
//             onLikesCountChange={handleLike}
//           />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span>
//           <span className="font-semibold italic">{item.user_name}</span>:{" "}
//           {item.caption}
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






// // загружается все, только работает кнопка подписки (только остальные посты не меняются на unfollow)
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
//   isFollow: boolean;
//   likesCount: number;
//   setLikesCount: (postId: string, newCount: number) => void;
//   onFollowChange: (
//     userId: string,
//     targetUserId: string,
//     newFollowStatus: boolean
//   ) => void;
// };

// const PostItem = ({
//   item,
//   isFollow,
//   likesCount,
//   setLikesCount,
//   onFollowChange,
// }: PostItemProps) => {
//   const [currentUserId, setCurrentUserId] = useState<string>("");

//   // Получаем userId из localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setCurrentUserId(userData._id);
//     }
//   }, []);

//   const handleLike = () => {
//     const newLikesCount = likesCount + 1;
//     setLikesCount(item._id, newLikesCount);
//   };

//   // Проверяем, если user_id приходит как объект, извлекаем _id
//   const targetUserId =
//     typeof item.user_id === "string" ? item.user_id : item.user_id._id;

//   const handleFollowChange = () => {
//     if (currentUserId === targetUserId) {
//       console.error("You can't follow yourself.");
//       return;
//     }
//     onFollowChange(currentUserId, targetUserId, !isFollow);
//   };

//   return (
//     <li className="flex flex-col max-h-[720px] text-[12px] pb-[40px] border-b-[1px] border-b-color-gray">
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
//             width={1}
//             height={1}
//             className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
//           />
//         </div>
//         <div className="flex gap-[6px] ml-[6px]">
//           <span className="font-semibold text-[12px]">{item.user_name}</span>
//           <span className="text-color-dark-gray text-[12px]">
//             &#8226; {parseData(item.created_at)} &#8226;
//           </span>
//           <FollowButton
//             userId={currentUserId}
//             targetUserId={targetUserId} // Передаем targetUserId как строку
//             isFollow={isFollow}
//             onFollowChange={handleFollowChange}
//             className="py-[6px] px-[50px] bg-color-accent hover:bg-color-dark text-[14px] font-semibold text-color-light rounded-[8px] hover:text-color-light"
//           />
//         </div>
//       </div>
//       <Image
//         src={item.image_url}
//         alt="Post Image"
//         width={403}
//         height={505}
//         className="w-full min-h-[505px] object-cover rounded-[4px]"
//       />
//       <div className="flex flex-col my-[10px] gap-[8px]">
//         <div className="flex items-center gap-[14px]">
//           <Like
//             postId={item._id}
//             userId={
//               typeof item.user_id === "string" ? item.user_id : item.user_id._id
//             }
//             onLikesCountChange={handleLike}
//           />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span>
//           <span className="font-semibold italic">{item.user_name}</span>:{" "}
//           {item.caption}
//         </span>
//       </div>
//       <div className="flex flex-col ap-[14px]">
//         <span>{item.last_comment || "Last comment"}</span>
//         <span className="text-color-dark-gray">
//           View all comments ({item.comments_count})
//         </span>
//       </div>
//     </li>
//   );
// };

// export default PostItem;

// // // загружается все, только не работает кнопка подписки (нет совственного id)
// "use client";

// import React from "react";
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
//     user_id: string;
//     likes_count?: number;
//     comments_count?: number;
//     last_comment?: string;
//   };
//   isFollow: boolean;
//   likesCount: number;
//   setLikesCount: (postId: string, newCount: number) => void;
//   onFollowChange: (userId: string, targetUserId: string, newFollowStatus: boolean) => void;
// };

// const PostItem = ({
//   item,
//   isFollow,
//   likesCount,
//   setLikesCount,
//   onFollowChange,
// }: PostItemProps) => {
//   const handleLike = () => {
//     const newLikesCount = likesCount + 1;
//     setLikesCount(item._id, newLikesCount);
//   };

//   // Получаем userId из localStorage
//   const userId = localStorage.getItem("userId") || "";
//   const targetUserId = item.user_id;

//   console.log("Current User ID: ", userId);
//   console.log("Target User ID: ", targetUserId);

//   const handleFollowChange = () => {
//     if (userId === targetUserId) {
//       console.error("You can't follow yourself.");
//       return;
//     }
//     onFollowChange(userId, targetUserId, !isFollow);
//   };
//   return (
//     <li className="flex flex-col max-h-[720px] text-[12px] pb-[40px] border-b-[1px] border-b-color-gray">
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
//             width={1}
//             height={1}
//             className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
//           />
//         </div>
//         <div className="flex gap-[6px] ml-[6px]">
//           <span className="font-semibold text-[12px] ">{item.user_name}</span>
//           <span className="text-color-dark-gray text-[12px]">
//             &#8226; {parseData(item.created_at)} &#8226;
//           </span>
//           <FollowButton
//             userId={localStorage.getItem("userId") || ""}
//             targetUserId={item.user_id}
//             isFollow={isFollow}
//             onFollowChange={handleFollowChange}
//             className="py-[6px] px-[50px] bg-color-accent hover:bg-color-dark text-[14px] font-semibold text-color-light rounded-[8px] hover:text-color-light"
//           />
//         </div>
//       </div>
//       <Image
//         src={item.image_url}
//         alt="Post Image"
//         width={403}
//         height={505}
//         className="w-full min-h-[505px] object-cover rounded-[4px]"
//       />
//       <div className="flex flex-col my-[10px] gap-[8px]">
//         <div className="flex items-center gap-[14px]">
//           <Like postId={item._id} userId={item.user_id} onLikesCountChange={handleLike} />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span>
//           <span className="font-semibold italic">{item.user_name}</span>: {item.caption}
//         </span>
//       </div>
//       <div className="flex flex-col ap-[14px]">
//         <span>{item.last_comment || "Last comment"}</span>
//         <span className="text-color-dark-gray">
//           View all comments ({item.comments_count})
//         </span>
//       </div>
//     </li>
//   );
// };

// export default PostItem;

// // PostItem.tsx

// "use client";
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
//     user_id: string;
//     likes_count?: number;
//     comments_count?: number;
//     last_comment?: string;
//   };
//   isFollow: boolean;
//   likesCount: number;
//   setLikesCount: (postId: string, newCount: number) => void;
// };

// const PostItem = ({ item, isFollow, likesCount, setLikesCount }: PostItemProps) => {
//   const handleLike = () => {
//     const newLikesCount = likesCount + 1;
//     setLikesCount(item._id, newLikesCount);
//   };

//   return (
//     <li className="flex flex-col max-h-[720px] text-[12px] pb-[40px] border-b-[1px] border-b-color-gray">
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
//             width={1}
//             height={1}
//             className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
//           />
//         </div>
//         <div className="flex gap-[6px] ml-[6px]">
//           <span className="font-semibold text-[12px] ">{item.user_name}</span>
//           <span className="text-color-dark-gray text-[12px]">
//             &#8226; {parseData(item.created_at)} &#8226;
//           </span>
//           <FollowButton
//             isFollow={isFollow}
//             userId={localStorage.getItem("userId") || ""}
//             targetUserId={item.user_id}
//           />
//         </div>
//       </div>
//       <Image
//         src={item.image_url}
//         alt="Post Image"
//         width={403}
//         height={505}
//         className="w-full min-h-[505px] object-cover rounded-[4px]"
//       />
//       <div className="flex flex-col my-[10px] gap-[8px]">
//         <div className="flex items-center gap-[14px]">
//           <Like postId={item._id} userId={item.user_id} onLikesCountChange={handleLike} />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span>
//           <span className="font-semibold italic">{item.user_name}</span>: {item.caption}
//         </span>
//       </div>
//       <div className="flex flex-col ap-[14px]">
//         <span>{item.last_comment || "Last comment"}</span>
//         <span className="text-color-dark-gray">
//           View all comments ({item.comments_count})
//         </span>
//       </div>
//     </li>
//   );
// };

// export default PostItem;

// "use client";

// import React from "react";
// import Image from "next/image";
// import Like from "../atoms/Like";
// import CommentIcon from "../atoms/CommentIcon";
// import parseData from "../helpers/parseData";
// import FollowButton from "../atoms/FollowButton";

// type Post = {
//   _id: string;
//   user_id: string;
//   image_url: string;
//   caption: string;
//   created_at: string;
//   user_name: string;
//   profile_image: string;
//   likes_count?: number;
//   comments_count?: number;
//   last_comment?: string;
// };

// type PostItemProps = {
//   item: Post;
//   isFollow: boolean;
//   likesCount: number;
//   setLikesCount: (postId: string, newCount: number) => void;
// };

// const PostItem: React.FC<PostItemProps> = ({
//   item,
//   isFollow,
//   likesCount,
//   setLikesCount,
// }) => {
//   const userId = localStorage.getItem("userId") || ""; // We receive userId from localStorage

//   const handleLike = () => {
//     const newLikesCount = likesCount + 1;
//     setLikesCount(item._id, newLikesCount);
//   };

//   return (
//     <li className="flex flex-col max-h-[720px] text-[12px] pb-[40px] border-b-[1px] border-b-color-gray">
//       <div className="flex items-center py-[6px]">
//         {/* Avatar */}
//         <div className="relative w-[36px] h-[36px]">
//           <Image
//             src={item.profile_image || "/default-avatar.png"}
//             alt="avatar"
//             width={36}
//             height={36}
//             className="absolute inset-0 w-[30px] h-[30px] m-auto border rounded-full"
//           />
//           <Image
//             src="/ava-frame.png"
//             alt="Avatar frame"
//             width={38}
//             height={38}
//             className="w-full h-full"
//           />
//         </div>
//         <div className="flex gap-[6px] ml-[6px]">
//           <span className="font-semibold text-[12px] ">{item.user_name}</span>
//           <span className="text-color-dark-gray text-[12px]">
//             &#8226; {parseData(item.created_at)} &#8226;
//           </span>
//           <FollowButton
//             isFollow={user.following.includes(targetUser._id)}
//             userId={user._id}
//             targetUserId={targetUser._id}
//             onFollowChange={handleFollowChange}
//           />
//         </div>
//       </div>
//       {/* Post Image */}
//       <Image
//         src={item.image_url}
//         alt="Post Image"
//         width={403}
//         height={505}
//         className="w-full min-h-[505px] object-cover rounded-[4px]"
//       />
//       <div className="flex flex-col my-[10px] gap-[8px]">
//         <div className="flex items-center gap-[14px]">
//           {/* Like and Comment */}
//           <Like
//             postId={item._id}
//             userId={item.user_id}
//             onLikesCountChange={handleLike}
//           />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span>
//           <span className="font-semibold italic">{item.user_name}</span>:{" "}
//           {item.caption}
//         </span>
//       </div>

//       <div className="flex flex-col gap-[4px]">
//         {/* Last Comment */}
//         <span>{item.last_comment || "Last comment"}</span>
//         <span className="text-color-dark-gray">
//           View all comments ({item.comments_count})
//         </span>
//       </div>
//     </li>
//   );
// };

// export default PostItem;
