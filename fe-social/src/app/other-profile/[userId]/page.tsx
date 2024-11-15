"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Извлекаем userId с помощью useParams
import Image from "next/image";
import { $api } from "../../api/api"; // Путь к вашему API
import { FollowButton } from "../../atoms/FollowButton"; // Кнопка Follow
import ProfileLinkIcon from "../../atoms/ProfileLinkIcon"; // Для ссылки на сайт
import Link from "next/link"; // Для ссылок

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

interface Post {
  _id: string;
  image_url: string;
  description?: string;
}

const OtherProfilePage = () => {
  const { userId } = useParams(); // Извлекаем userId с помощью useParams
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]); // Состояние для хранения постов
  const [isLoading, setIsLoading] = useState(true); // Для отслеживания загрузки
  const [postsLoading, setPostsLoading] = useState(true); // Для отслеживания загрузки постов
  const [error, setError] = useState<string | null>(null); // Для ошибок

  // Загружаем данные профиля другого пользователя, когда userId доступен
  useEffect(() => {
    if (userId) {
      const getUserProfile = async () => {
        try {
          const response = await $api.get(`/user/${userId}`); // Замените на правильный эндпоинт для получения профиля
          setUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError("Не удалось загрузить профиль.");
        } finally {
          setIsLoading(false);
        }
      };

      getUserProfile();
    }
  }, [userId]); // Зависимость от userId

  // Загружаем посты пользователя
  useEffect(() => {
    if (userId) {
      const getUserPosts = async () => {
        try {
          const response = await $api.get(`/post/all?userId=${userId}`); // Исправлено: теперь передаем userId
          setPosts(response.data); // Сохраняем посты
        } catch (error) {
          console.error("Error fetching posts:", error);
          setError("Не удалось загрузить посты.");
        } finally {
          setPostsLoading(false);
        }
      };

      getUserPosts();
    }
  }, [userId]);

  if (isLoading) {
    return <div>Загрузка профиля...</div>;
  }

  if (!userProfile) {
    return <div>Профиль не найден</div>;
  }

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
      {/* Профиль пользователя */}
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
            src={userProfile.profile_image || "/default-avatar.png"}
            alt="Profile Avatar"
            width={150}
            height={150}
            className="absolute inset-0 w-[150px] h-[150px] m-auto border bg-color-gray rounded-full"
          />
        </div>

        {/* Информация о пользователе */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center gap-[24px]">
            <span className="text-[20px]">{userProfile.username}</span>
            <FollowButton
              isFollow={userProfile.isFollow}
              userId={userProfile._id}
              targetUserId={userId as string} // Используем userId из query
            />
            <button
              className="bg-color-accent text-white px-4 py-2 rounded"
              onClick={() => {/* Удаляем alert, если кнопка не используется */}}
            >
              Message
            </button>
          </div>
          <div className="flex">
            <span className="font-semibold mr-[6px]">{userProfile.posts_count}</span>
            <span className="mr-[40px]">posts</span>
            <span className="font-semibold mr-[6px]">{userProfile.followers_count}</span>
            <span className="mr-[40px]">followers</span>
            <span className="font-semibold mr-[6px]">{userProfile.following_count}</span>
            <span className="mr-[40px]">following</span>
          </div>
          <div className="max-w-sm">
            <span className="text-[14px] text-gcolor-gray line-clamp-3">
              {userProfile.bio || "Write something about yourself..."}
            </span>
          </div>
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

      {/* Сетка постов */}
      <div className="mt-[80px]">
        {postsLoading ? (
          <div>Загрузка постов...</div>
        ) : error ? (
          <div>{error}</div>
        ) : posts.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
            {posts.map((post) => (
              <div key={post._id} className="w-full relative">
                <div className="w-full h-0 pb-[100%] relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-200">
                    <Image
                      src={post.image_url}
                      alt={`Post Image ${post._id}`}
                      layout="fill"
                      className="w-full h-full object-cover rounded-[4px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Нет постов для отображения</div>
        )}
      </div>
    </div>
  );
};

export default OtherProfilePage;














// // загружается все, только код громоздкий
// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation"; // Извлекаем userId с помощью useParams
// import Image from "next/image";
// import { $api } from "../../api/api"; // Путь к вашему API
// import { FollowButton } from "../../atoms/FollowButton"; // Кнопка Follow
// import ProfileLinkIcon from "../../atoms/ProfileLinkIcon"; // Для ссылки на сайт

// interface UserProfile {
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

// interface Post {
//   _id: string;
//   image_url: string;
//   description?: string;
// }

// const OtherProfilePage = () => {
//   const { userId } = useParams(); // Извлекаем userId с помощью useParams
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]); // Состояние для хранения постов
//   const [isLoading, setIsLoading] = useState(true); // Для отслеживания загрузки
//   const [isFollow, setIsFollow] = useState(false); // Для отслеживания подписки
//   const [postsLoading, setPostsLoading] = useState(true); // Для отслеживания загрузки постов
//   const [error, setError] = useState<string | null>(null); // Для ошибок

//   // Загружаем данные профиля другого пользователя, когда userId доступен
//   useEffect(() => {
//     if (userId) {
//       const getUserProfile = async () => {
//         try {
//           const response = await $api.get(`/user/${userId}`);
//           setUserProfile(response.data);
//           setIsFollow(response.data.isFollow); // Статус "Follow"
//         } catch (error) {
//           console.error("Error fetching user profile:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       getUserProfile();
//     }
//   }, [userId]); // Зависимость от userId

//   // Загружаем посты пользователя
//   useEffect(() => {
//     if (userId) {
//       const getUserPosts = async () => {
//         try {
//           const response = await $api.get(`/post/all?userId=${userId}`);
//           setPosts(response.data); // Сохраняем посты
//         } catch (error) {
//           console.error("Error fetching posts:", error);
//           setError("Failed to load posts.");
//         } finally {
//           setPostsLoading(false);
//         }
//       };

//       getUserPosts();
//     }
//   }, [userId]);

//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }

//   if (!userProfile) {
//     return <div>Profile not found</div>;
//   }

//   return (
//     <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
//       {/* Профиль пользователя */}
//       <div className="flex w-full lg:flex-row lg:gap-[85px] sm:flex-col sm:gap-[40px]">
//         {/* Аватар пользователя */}
//         <div className="relative w-[168px] h-[168px]">
//           <Image
//             src="/ava-b-frame.png"
//             alt="Avatar frame"
//             width={168}
//             height={168}
//             className="w-full h-full"
//           />
//           <Image
//             src={userProfile.profile_image || "/default-avatar.png"}
//             alt="Profile Avatar"
//             width={150}
//             height={150}
//             className="absolute inset-0 w-[150px] h-[150px] m-auto border bg-color-gray rounded-full"
//           />
//         </div>

//         {/* Информация о пользователе */}
//         <div className="flex flex-col gap-[20px]">
//           <div className="flex items-center gap-[24px]">
//             <span className="text-[20px]">{userProfile.username}</span>
//             <FollowButton
//               isFollow={isFollow}
//               userId={userProfile._id}
//               targetUserId={userId as string} // Используем userId из query
//             />
//             <button
//               className="bg-color-accent text-white px-4 py-2 rounded"
//               onClick={() => alert("Message button clicked!")}
//             >
//               Message
//             </button>
//           </div>
//           <div className="flex">
//             <span className="font-semibold mr-[6px]">{userProfile.posts_count}</span>
//             <span className="mr-[40px]">posts</span>
//             <span className="font-semibold mr-[6px]">{userProfile.followers_count}</span>
//             <span className="mr-[40px]">followers</span>
//             <span className="font-semibold mr-[6px]">{userProfile.following_count}</span>
//             <span className="mr-[40px]">following</span>
//           </div>
//           <div className="max-w-sm">
//             <span className="text-[14px] text-gcolor-gray line-clamp-3">
//               {userProfile.bio || "Write something about yourself..."}
//             </span>
//           </div>
//           <div className="max-w-sm mt-2">
//             <span className="text-[14px] text-gcolor-gray line-clamp-1">
//               {userProfile.bio_website ? (
//                 <a
//                   href={userProfile.bio_website}
//                   className="text-[#00376B]"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <span className="inline-block mr-[8px]">
//                     <ProfileLinkIcon />
//                   </span>
//                   {userProfile.bio_website}
//                 </a>
//               ) : (
//                 "No website available"
//               )}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Сетка постов */}
//       <div className="mt-[80px]">
//         {postsLoading ? (
//           <div>Loading posts...</div>
//         ) : error ? (
//           <div>{error}</div>
//         ) : posts.length > 0 ? (
//           <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
//             {posts.map((post) => (
//               <div key={post._id} className="w-full relative">
//                 <div className="w-full h-0 pb-[100%] relative">
//                   <div className="absolute top-0 left-0 w-full h-full bg-gray-200">
//                     <Image
//                       src={post.image_url}
//                       alt={`Post Image ${post._id}`}
//                       layout="fill"
//                       className="w-full h-full object-cover rounded-[4px]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>No posts available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OtherProfilePage;







// // загружается профиль, а посты нет
// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation"; // Используем useParams для динамического маршрута
// import Image from "next/image";
// import { $api } from "../../api/api"; // Путь к вашему API
// import { FollowButton } from "../../atoms/FollowButton"; // Кнопка Follow
// import ProfileLinkIcon from "../../atoms/ProfileLinkIcon"; // Для ссылки на сайт

// interface UserProfile {
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

// const OtherProfilePage = () => {
//   const { userId } = useParams(); // Извлекаем userId с помощью useParams
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFollow, setIsFollow] = useState(false); // Для отслеживания подписки

//   // Загружаем данные профиля другого пользователя, когда userId доступен
//   useEffect(() => {
//     if (userId) {
//       const getUserProfile = async () => {
//         try {
//           const response = await $api.get(`/user/${userId}`);
//           setUserProfile(response.data);
//           setIsFollow(response.data.isFollow); // Статус "Follow"
//         } catch (error) {
//           console.error("Error fetching user profile:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       getUserProfile();
//     }
//   }, [userId]); // Зависимость от userId

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!userProfile) {
//     return <div>Profile not found</div>;
//   }

//   return (
//     <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
//       {/* Профиль пользователя */}
//       <div className="flex w-full lg:flex-row lg:gap-[85px] sm:flex-col sm:gap-[40px]">
//         {/* Аватар пользователя */}
//         <div className="relative w-[168px] h-[168px]">
//           <Image
//             src="/ava-b-frame.png"
//             alt="Avatar frame"
//             width={168}
//             height={168}
//             className="w-full h-full"
//           />
//           <Image
//             src={userProfile.profile_image || "/default-avatar.png"}
//             alt="Profile Avatar"
//             width={150}
//             height={150}
//             className="absolute inset-0 w-[150px] h-[150px] m-auto border bg-color-gray rounded-full"
//           />
//         </div>

//         {/* Информация о пользователе */}
//         <div className="flex flex-col gap-[20px]">
//           <div className="flex items-center gap-[24px]">
//             <span className="text-[20px]">{userProfile.username}</span>
//             <FollowButton
//               isFollow={isFollow}
//               userId={userProfile._id}
//               targetUserId={userId as string} // Используем userId из query
//             />
//             <button
//               className="bg-color-accent text-white px-4 py-2 rounded"
//               onClick={() => alert("Message button clicked!")}
//             >
//               Message
//             </button>
//           </div>
//           <div className="flex">
//             <span className="font-semibold mr-[6px]">{userProfile.posts_count}</span>
//             <span className="mr-[40px]">posts</span>
//             <span className="font-semibold mr-[6px]">{userProfile.followers_count}</span>
//             <span className="mr-[40px]">followers</span>
//             <span className="font-semibold mr-[6px]">{userProfile.following_count}</span>
//             <span className="mr-[40px]">following</span>
//           </div>
//           <div className="max-w-sm">
//             <span className="text-[14px] text-gcolor-gray line-clamp-3">
//               {userProfile.bio || "Write something about yourself..."}
//             </span>
//           </div>
//           <div className="max-w-sm mt-2">
//             <span className="text-[14px] text-gcolor-gray line-clamp-1">
//               {userProfile.bio_website ? (
//                 <a
//                   href={userProfile.bio_website}
//                   className="text-[#00376B]"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <span className="inline-block mr-[8px]">
//                     <ProfileLinkIcon />
//                   </span>
//                   {/* Иконка перед текстом */}
//                   {userProfile.bio_website}
//                 </a>
//               ) : (
//                 "No website available"
//               )}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Сетка постов (пока не загружаются) */}
//       <div className="mt-[80px]">
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
//           {/* Здесь можно добавить посты, если они будут загружаться */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtherProfilePage;
