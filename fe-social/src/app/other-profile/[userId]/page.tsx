"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { $api } from "../../api/api";
import OtherProfile from "../OtherProfile";

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
  const { userId } = useParams(); // Получаем userId из URL
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Получаем currentUserId из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUserId(userData._id);
    }
  }, []);

  // Загружаем профиль пользователя
  useEffect(() => {
    if (userId) {
      const getUserProfile = async () => {
        try {
          const response = await $api.get(`/user/${userId}`);
          setUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError("Failed to load profile.");
        } finally {
          setIsLoading(false);
        }
      };

      getUserProfile();
    }
  }, [userId]);

  // Загружаем посты пользователя
  useEffect(() => {
    if (userId) {
      const getUserPosts = async () => {
        try {
          const response = await $api.get("/post/all", { params: { userId } });
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setError("Failed to load posts.");
        } finally {
          setPostsLoading(false);
        }
      };

      getUserPosts();
    }
  }, [userId]);

  // Обработчик изменения подписки
  const handleFollowChange = async (
    currentUserId: string,
    targetUserId: string,
    newFollowStatus: boolean
  ) => {
    try {
      if (newFollowStatus) {
        await $api.post(`/follow/${currentUserId}/follow/${targetUserId}`);
      } else {
        await $api.delete(`/follow/${currentUserId}/unfollow/${targetUserId}`);
      }
      // После успешной подписки/отписки обновляем данные профиля
      setUserProfile((prevProfile) => {
        if (prevProfile) {
          return { ...prevProfile, isFollow: newFollowStatus };
        }
        return prevProfile;
      });
    } catch (error) {
      console.error("Error updating follow status:", error);
      setError("Failed to update follow status.");
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!userProfile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
      {/* Информация о пользователе */}
      {currentUserId && userProfile && (
        <OtherProfile
          userProfile={userProfile}
          userId={currentUserId}
          onFollowChange={handleFollowChange} // Передаем обработчик изменения подписки
        />
      )}

      {/* Сетка постов */}
      <div className="mt-[80px]">
        {postsLoading ? (
          <div>Loading posts...</div>
        ) : error ? (
          <div>{error}</div>
        ) : posts.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
            {posts.map((post) => (
              <div key={post._id} className="w-full relative">
                <div className="w-full h-0 pb-[100%] relative">
                  <div className="absolute top-0 left-0 w-full h-full">
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
          <div>There are no posts to display</div>
        )}
      </div>
    </div>
  );
};

export default OtherProfilePage;




// // кнопка подписки работает отлично, записывается и удаляется из ДБ (только остальные посты не меняются на unfollow)
// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { $api } from "../../api/api";
// import OtherProfile from "../OtherProfile";

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

// interface Post {
//   _id: string;
//   image_url: string;
//   description?: string;
// }

// const OtherProfilePage = () => {
//   const { userId } = useParams();
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [postsLoading, setPostsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentUserId, setCurrentUserId] = useState<string | null>(null);

//   // Получаем userId из localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setCurrentUserId(userData._id);
//     }
//   }, []);

//   // Загружаем профиль другого пользователя
//   useEffect(() => {
//     if (userId) {
//       const getUserProfile = async () => {
//         try {
//           const response = await $api.get(`/user/${userId}`);
//           setUserProfile(response.data);
//         } catch (error) {
//           console.error("Error fetching user profile:", error);
//           setError("Failed to load profile.");
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       getUserProfile();
//     }
//   }, [userId]);

//   // Загружаем посты пользователя
//   useEffect(() => {
//     if (userId) {
//       const getUserPosts = async () => {
//         try {
//           const response = await $api.get("/post/all", { params: { userId } });
//           setPosts(response.data);
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
//       {/* Информация о пользователе */}
//       {currentUserId && userProfile && (
//         <OtherProfile
//           userProfile={userProfile}
//           userId={currentUserId}
//           onFollowChange={(currentUserId, targetUserId, newFollowStatus) => {
//             console.log("Follow status changed:", currentUserId, targetUserId, newFollowStatus);
//           }}
//         />
//       )}

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
//                   <div className="absolute top-0 left-0 w-full h-full">
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
//           <div>There are no posts to display</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OtherProfilePage;
