"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { $api } from "../api/api";
import Profile from "../profile/Profile";
import ModalPost from "../modal/ModalPost";

const ProfilePage = ({ params }: { params: { userId: string } }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<any | null>(null); 

  // Функция для загрузки постов пользователя
  const getPosts = async () => {
    try {
      const response = await $api.get(`/post/all`);
      console.log("User's posts:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем посты при изменении userId
  useEffect(() => {
    getPosts();
  }, [params.userId]);

  // Открытие модалки при клике на пост
  const handlePostClick = (post: any) => {
    setSelectedPost(post);
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
      {/* Профиль пользователя */}
      <div className="flex self-start">
        <Profile userId={params.userId} />
      </div>

      {/* Список постов */}
      <div className="mt-[80px]">
        {isLoading ? (
          <div>Loading posts...</div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
            {posts.map((post) => (
              <div
                key={post._id}
                className="w-full relative cursor-pointer"
                onClick={() => handlePostClick(post)} // Обработчик клика
              >
                <div className="w-full h-0 pb-[100%] relative">
                  <Image
                    src={post.image_url}
                    alt="Post Image"
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 rounded-[4px]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Модалка для выбранного поста */}
      {selectedPost && (
        <ModalPost
          post={selectedPost} // Передаем данные выбранного поста
          onClose={handleCloseModal} // Передаем функцию для закрытия модалки
        />
      )}
    </div>
  );
};

export default ProfilePage;






// // все работает отлично
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { $api } from "../api/api";
// import Profile from "../profile/Profile";
// // import NoMoreUpdates from "../atoms/NoMoreUpdates";

// const ProfilePage = ({ params }: { params: { userId: string } }) => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

// // Загружаем посты пользователя
// const getPosts = async () => {
//   try {
//     const response = await $api.get(`/post/all`);
//     console.log("User's posts:", response.data);
//     setPosts(response.data);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//   } finally {
//     setIsLoading(false);
//   }
// };


// useEffect(() => {
//   getPosts(); // Загружаем данные при изменении userId
// }, [params.userId]);

//   return (
//     <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
//       {/* User Profile */}
//       <div className="flex self-start">
//         <Profile userId={params.userId} /> {/* Передаем userId в компонент Profile */}
//       </div>

//       {/* PostList */}
//       <div className="mt-[80px]">
//         {isLoading ? (
//           <div>Loading posts...</div>
//         ) : (
//           <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
//             {posts.map((post) => (
//               <div key={post._id} className="w-full relative">
//                 <div className="w-full h-0 pb-[100%] relative">
//                   <Image
//                     src={post.image_url}
//                     alt="Post Image"
//                     layout="fill"
//                     objectFit="cover"
//                     className="absolute top-0 left-0 rounded-[4px]"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {/* <NoMoreUpdates /> */}
//     </div>
//   );
// };

// export default ProfilePage;