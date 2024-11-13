
// // рабочий дист айтем и фоллоу
// "use client"

// import { useEffect, useState } from "react";
// import { $api } from "../api/api";
// import { parseData } from "../helpers/parseData"; // Импортируем parseData
// import { matchUserId } from "../helpers/matchUsersId";
// import Image from "next/image";
// import Like from "../atoms/Like";
// import CommentIcon from "../atoms/CommentIcon";

// // Типы данных
// type Post = {
//   _id: string;
//   user_id: string;
//   image_url: string;
//   caption: string;
//   likes_count?: number;
//   comments_count?: number;
//   created_at: string;
//   __v: number;
//   last_comment?: string;
// };

// type UserData = {
//   profile_image: string;
//   user_name: string;
// };

// export const PostsList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [usersData, setUsersData] = useState<{ [key: string]: UserData }>({});
//   const [follows, setFollows] = useState([]);
//   const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const handleLikeChange = (postId: string, newCount: number) => {
//     setLikesCount((prevLikesCount) => ({
//       ...prevLikesCount,
//       [postId]: newCount, // Обновляем конкретный пост по его id
//     }));
//   };

//   // Получение постов с сервера
//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const res = await $api.get("/post/all/public"); // Публичные посты
//         const shuffledPosts = res.data.sort(() => Math.random() - 0.5);
//         setPosts(shuffledPosts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     const getFollowers = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         if (userId) {
//           const response = await $api.get(`/follow/${userId}/following`);
//           setFollows(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching follows:", error);
//       }
//     };

//     getFollowers();
//     getPosts();
//   }, []);

//   // Получение данных пользователей для каждого поста
//   useEffect(() => {
//     const getUsersData = async () => {
//       try {
//         const userPromises = posts.map((post) =>
//           $api.get(`/user/${post.user_id}`)
//         );
//         const userResponses = await Promise.all(userPromises);

//         const users = userResponses.reduce((acc: any, user: any) => {
//           acc[user.data._id] = {
//             profile_image: user.data.profile_image,
//             user_name: user.data.user_name,
//           };
//           return acc;
//         }, {});

//         setUsersData(users);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (posts.length > 0) {
//       getUsersData();
//     }
//   }, [posts]);

//   return (
//     <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
//       {posts.length > 0 ? (
//         posts.map((item: Post) => (
//           <PostItem
//             key={item._id}
//             item={{
//               ...item,
//               profile_image:
//                 usersData[item.user_id]?.profile_image || "/default-avatar.png",
//               user_name: usersData[item.user_id]?.user_name || "Unknown",
//             }}
//             isFollow={matchUserId(follows, item.user_id)} // Проверяем, подписан ли текущий пользователь
//             likesCount={likesCount[item._id] || item.likes_count || 0} // Используем состояние для likesCount
//             setLikesCount={handleLikeChange} // Передаем handleLikeChange
//           />
//         ))
//       ) : (
//         <li>No Posts</li>
//       )}
//     </ul>
//   );
// };

// type ItemProps = {
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
//   setLikesCount: (postId: string, newCount: number) => void; // Функция обновления likesCount
// };

// const PostItem = ({ item, isFollow, likesCount, setLikesCount }: ItemProps) => {
//   const handleLike = () => {
//     const newLikesCount = likesCount + 1; // Пример увеличения лайков
//     setLikesCount(item._id, newLikesCount); // Обновляем количество лайков для поста
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
//             src={item.profile_image}
//             alt="avatar"
//             width={1}
//             height={1}
//             className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
//           />
//         </div>
//         <div className="flex gap-[6px] ml-[6px]">
//           <span className="font-semibold text-[12px] ">
//             {item.user_name || "username"}
//           </span>
//           <span className="text-color-dark-gray text-[12px]">
//             &#8226; {parseData(item.created_at)} &#8226;
//           </span>

//           <FollowButton
//             isFollow={isFollow}
//             userId={item.user_id}
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
//           <Like
//             postId={item._id}
//             userId={item.user_id}
//             onLikesCountChange={handleLike} // Передаем функцию изменения лайков
//           />
//           <CommentIcon postId={item._id} />
//         </div>
//         <span>{likesCount} likes</span>
//         <span>
//           <span className="font-semibold italic">
//             {item.user_name || "username"}
//           </span>
//           : {item.caption}
//         </span>
//       </div>

//       <div className="flex flex-col ap-[14px]">
//         <span className="">{item.last_comment || "Last comment"}</span>
//         <span className="text-color-dark-gray">
//           View all comments ({item.comments_count})
//         </span>
//       </div>
//     </li>
//   );
// };

// // Компонент кнопки Follow
// type FollowButtonProps = {
//   isFollow: boolean;
//   userId: string;
//   targetUserId: string;
// };

// function FollowButton({ isFollow, userId, targetUserId }: FollowButtonProps) {
//   const [follow, setFollow] = useState(isFollow);

//   const handleFollow = () => {
//     if (!follow) {
//       $api.post(`/follow/${userId}/follow/${targetUserId}`);
//       setFollow(true);
//     } else {
//       $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
//       setFollow(false);
//     }
//   };

//   return (
//     <button
//       className="font-semibold text-color-accent hover:text-color-dark"
//       onClick={handleFollow}
//     >
//       {!follow ? "follow" : "unfollow"}
//     </button>
//   );
// }

// export default PostsList;





// // PostsList рабочий (привязываются пользователи)
// "use client";

// import { useEffect, useState } from "react";
// import { $api } from "../api/api";
// import matchUserId from "../helpers/matchUsersId";
// import PostItem from "./PostItem";

// type Post = {
//   _id: string;
//   user_id: string;
//   image_url: string;
//   caption: string;
//   likes_count?: number;
//   comments_count?: number;
//   created_at: string;
//   __v: number;
//   last_comment?: string;
// };

// type UserData = {
//   profile_image: string;
//   user_name: string;
// };

// const PostsList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [usersData, setUsersData] = useState<{ [key: string]: UserData }>({});
//   const [follows, setFollows] = useState([]);
//   const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const handleLikeChange = (postId: string, newCount: number) => {
//     setLikesCount((prevLikesCount) => ({
//       ...prevLikesCount,
//       [postId]: newCount,
//     }));
//   };

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const res = await $api.get("/post/all/public");
//         const shuffledPosts = res.data.sort(() => Math.random() - 0.5);
//         setPosts(shuffledPosts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     const getFollowers = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         if (userId) {
//           const response = await $api.get(`/follow/${userId}/following`);
//           setFollows(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching follows:", error);
//       }
//     };

//     getFollowers();
//     getPosts();
//   }, []);

//   useEffect(() => {
//     const getUsersData = async () => {
//       if (posts.length === 0) return;

//       try {
//         // Запрашиваем пользователей для каждого поста
//         const userPromises = posts.map((post) =>
//           $api.get(`/user/${post.user_id}`)
//         );
//         const userResponses = await Promise.all(userPromises);

//         const users = userResponses.reduce((acc: any, user: any) => {
//           if (user.data) {
//             acc[user.data._id] = {
//               profile_image: user.data.profile_image || "/default-avatar.png",
//               user_name: user.data.username || user.data.full_name || "Unknown",
//             };
//           }
//           return acc;
//         }, {});

//         setUsersData(users);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     getUsersData();
//   }, [posts]);

//   return (
//     <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
//       {posts.length > 0 ? (
//         posts.map((item: Post) => (
//           <PostItem
//             key={item._id}
//             item={{
//               ...item,
//               profile_image:
//                 usersData[item.user_id]?.profile_image || "/default-avatar.png",
//               user_name: usersData[item.user_id]?.user_name || "Unknown",
//             }}
//             isFollow={matchUserId(follows, item.user_id)}
//             likesCount={likesCount[item._id] || item.likes_count || 0}
//             setLikesCount={handleLikeChange}
//           />
//         ))
//       ) : (
//         <li>No Posts</li>
//       )}
//     </ul>
//   );
// };

// export default PostsList;




// PostItem.tsx
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




// // FollowButton
// // "use client";

// import { useState } from "react";
// import { $api } from "../api/api";

// type FollowButtonProps = {
//   isFollow: boolean;
//   userId: string;
//   targetUserId: string;
// };

// export const FollowButton = ({ isFollow, userId, targetUserId }: FollowButtonProps) => {
//   const [follow, setFollow] = useState(isFollow);

//   const handleFollow = () => {
//     if (!follow) {
//       $api.post(`/follow/${userId}/follow/${targetUserId}`);
//       setFollow(true);
//     } else {
//       $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
//       setFollow(false);
//     }
//   };

//   return (
//     <button
//       className="font-semibold text-color-accent hover:text-color-dark"
//       onClick={handleFollow}
//     >
//       {!follow ? "follow" : "unfollow"}
//     </button>
//   );
// };

// export default FollowButton