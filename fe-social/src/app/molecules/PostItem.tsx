"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Like from "../atoms/Like";
import CommentIcon from "../atoms/CommentIcon";
import parseData from "../helpers/parseData";
import FollowButton from "../atoms/FollowButton";
import { $api } from "../api/api";
import ModalPost from "../modal/ModalPost";

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
  };
  likesCount: number;
  setLikesCount: (postId: string, newCount: number) => void;
  onFollowChange: (newFollowStatus: boolean) => void;
  isAuthenticated: boolean;
  onClick?: () => void;
};

const PostItem = ({
  item,
  likesCount,
  setLikesCount,
  onFollowChange,
  isAuthenticated,
  onClick,
}: PostItemProps) => {
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [comments, setComments] = useState<
    { text: string; createdAt: string; user_id: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastComment, setLastComment] = useState<{
    text: string;
    user_name: string | undefined;
  } | null>(null);

  // Состояние для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Логика для текущего пользователя
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUserId(userData._id);
    }
  }, []);

  // Загружаем комментарии
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await $api.get(`/comment/${item._id}`);

        if (Array.isArray(response.data)) {
          setComments(response.data || []);
          if (response.data.length > 0) {
            const last = response.data[response.data.length - 1];
            const userResponse = await $api.get(`/user/${last.user_id}`);
            setLastComment({
              text: last.comment_text,
              user_name: userResponse.data.username || "Unknown",
            });
          } else {
            setLastComment(null);
          }
        } else {
          setComments([]);
          setLastComment(null);
        }
      } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [item._id]);

  const targetUserId =
    typeof item.user_id === "string" ? item.user_id : item.user_id._id;

  const handleLikesCountChange = (newLikesCount: number) => {
    const validLikesCount = Math.max(0, newLikesCount);
    setLikesCount(item._id, validLikesCount);
  };

  // Открытие модалки
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className="flex flex-col text-[12px] border-b-[1px] border-b-color-gray pb-[40px]">
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
            <FollowButton
              userId={currentUserId}
              targetUserId={targetUserId}
              onFollowChange={onFollowChange}
              className="font-semibold text-color-accent"
            />
          </div>
        </div>

        <div className="cursor-pointer" onClick={onClick}>
          <Image
            src={item.image_url}
            alt="Post Image"
            width={403}
            height={505}
            className="w-full max-h-[580px] min-h-[580px] object-cover rounded-[4px]"
          />
        </div>

        <div className="flex flex-col my-[10px] gap-[8px]">
          <div className="flex items-center gap-[14px]">
            <Like
              postId={item._id}
              userId={currentUserId}
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

        <div className="flex flex-col gap-[2px]">
          {isLoading ? (
            <span>Loading comments...</span>
          ) : (
            <>
              {lastComment ? (
                <div>
                  <span className="flex">
                    <span className="font-semibold whitespace-nowrap mr-[6px]">
                      {lastComment.user_name}
                    </span>{" "}
                    <span className="max-w-[150px] truncate">
                      {lastComment.text}
                    </span>
                  </span>
                </div>
              ) : (
                <span className="text-color-dark-gray">No comments yet</span>
              )}
            </>
          )}

          <span
            className="text-color-dark-gray cursor-pointer hover:text-color-accent"
            onClick={handleOpenModal}
          >
            View all comments ({comments.length || item.comments_count || 0})
          </span>
        </div>
      </li>

      {/* Модалка с подробностями поста */}
      {isModalOpen && (
        <ModalPost
          onClose={handleCloseModal}
          post={{
            _id: item._id,
            caption: item.caption,
            created_at: item.created_at,
            image_url: item.image_url,
            profile_image: item.profile_image,
            user_name: item.user_name,
            user_id:
              typeof item.user_id === "string"
                ? item.user_id
                : item.user_id._id, // Преобразуем user_id в строку
            likes_count: item.likes_count ?? 0,
            comments_count: item.comments_count ?? 0,
            last_comment: lastComment ? lastComment.text : undefined,
          }}
          userProfile={{
            _id:
              typeof item.user_id === "string"
                ? item.user_id
                : item.user_id._id, // Преобразуем user_id в строку
            user_name: item.user_name,
            profile_image: item.profile_image,
            posts_count: 0, // Можно добавить количество постов, если нужно
          }}
        />
      )}
    </>
  );
};

export default PostItem;

// // // все работает, осталось добавить вызов ModalPost
// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Like from "../atoms/Like";
// import CommentIcon from "../atoms/CommentIcon";
// import parseData from "../helpers/parseData";
// import FollowButton from "../atoms/FollowButton";
// import { $api } from "../api/api";

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
//   };
//   likesCount: number;
//   setLikesCount: (postId: string, newCount: number) => void;
//   onFollowChange: (newFollowStatus: boolean) => void;
//   isAuthenticated: boolean;
//   onClick?: () => void;
// };

// const PostItem = ({
//   item,
//   likesCount,
//   setLikesCount,
//   onFollowChange,
//   isAuthenticated,
//   onClick,
// }: PostItemProps) => {
//   const [currentUserId, setCurrentUserId] = useState<string>("");
//   const [comments, setComments] = useState<
//     { text: string; createdAt: string; user_id: string }[]
//   >([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [lastComment, setLastComment] = useState<{
//     text: string;
//     user_name: string | undefined;
//   } | null>(null);

//   // Логика для текущего пользователя
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setCurrentUserId(userData._id);
//     }
//   }, []);

//   // Загружаем комментарии
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await $api.get(`/comment/${item._id}`);

//         if (Array.isArray(response.data)) {
//           setComments(response.data || []);
//           if (response.data.length > 0) {
//             const last = response.data[response.data.length - 1];
//             const userResponse = await $api.get(`/user/${last.user_id}`);
//             setLastComment({
//               text: last.comment_text,
//               user_name: userResponse.data.username || "Unknown",
//             });
//           } else {
//             setLastComment(null);
//           }
//         } else {
//           setComments([]);
//           setLastComment(null);
//         }
//       } catch (error) {
//         console.error("Ошибка при загрузке комментариев:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchComments();
//   }, [item._id]);

//   const targetUserId =
//     typeof item.user_id === "string" ? item.user_id : item.user_id._id;

//   const handleLikesCountChange = (newLikesCount: number) => {
//     const validLikesCount = Math.max(0, newLikesCount);
//     setLikesCount(item._id, validLikesCount);
//   };

//   return (
//     <li className="flex flex-col text-[12px] border-b-[1px] border-b-color-gray pb-[40px]">
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
//           <FollowButton
//             userId={currentUserId}
//             targetUserId={targetUserId}
//             onFollowChange={onFollowChange}
//             className="font-semibold text-color-accent"
//           />
//         </div>
//       </div>

//       <div className="cursor-pointer" onClick={onClick}>
//         <Image
//           src={item.image_url}
//           alt="Post Image"
//           width={403}
//           height={505}
//           className="w-full min-h-[505px] object-cover rounded-[4px]"
//         />
//       </div>

//       <div className="flex flex-col my-[10px] gap-[8px]">
//         <div className="flex items-center gap-[14px]">
//           <Like
//             postId={item._id}
//             userId={currentUserId}
//             likesCount={item.likes_count || 0}
//             onLikesCountChange={handleLikesCountChange}
//             isAuthenticated={isAuthenticated}
//           />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span className="flex">
//           <span className="font-semibold whitespace-nowrap mr-[6px]">
//             {item.user_name}
//           </span>{" "}
//           <span className="line-clamp-1">{item.caption}</span>
//         </span>
//       </div>

//       <div className="flex flex-col gap-[2px]">
//         {isLoading ? (
//           <span>Loading comments...</span>
//         ) : (
//           <>
//             {lastComment ? (
//               <div>
//                 <span className="flex">
//                   <span className="font-semibold whitespace-nowrap mr-[6px]">
//                     {lastComment.user_name}
//                   </span>{" "}
//                   <span className="max-w-[150px] truncate">
//                     {lastComment.text}
//                   </span>
//                 </span>
//               </div>
//             ) : (
//               <span className="text-color-dark-gray">No comments yet</span>
//             )}
//           </>
//         )}

//         <span className="text-color-dark-gray">
//           View all comments ({comments.length || item.comments_count || 0})
//         </span>
//       </div>
//     </li>
//   );
// };

// export default PostItem;
