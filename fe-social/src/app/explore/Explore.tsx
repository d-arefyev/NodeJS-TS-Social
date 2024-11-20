"use client";

import { useEffect, useState } from "react";
import { $api } from "../api/api";
import Image from "next/image";
import ModalPost from "../modal/ModalPost"; // Импортируем ModalPost
import styles from './Explore.module.css'; // Импортируем стили

type Post = {
  _id: string;
  image_url: string;
  caption: string;
  user_name: string;
  user_id: string | { _id: string };
  created_at: string;
  profile_image: string;
  likes_count: number;
  comments_count: number;
};

export const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Состояние для выбранного поста
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Состояние для отображения модалки

  // Получение постов
  useEffect(() => {
    const getPublicPosts = async () => {
      try {
        const res = await $api.get("/post/all/public");
        // Перемешиваем посты в случайном порядке перед сохранением
        const shuffledPosts = res.data.sort(() => Math.random() - 0.5);

        // Добавляем недостающие поля для каждого поста
        const postsWithMissingFields = shuffledPosts.map((post: any) => ({
          ...post,
          created_at: post.created_at || "", // Добавить дефолтное значение, если поле отсутствует
          profile_image: post.profile_image || "", // Дефолтное изображение профиля
          likes_count: post.likes_count || 0, // Если отсутствует, ставим 0
          comments_count: post.comments_count || 0, // Если отсутствует, ставим 0
        }));

        setPosts(postsWithMissingFields);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPublicPosts();
  }, []);

  // Обработчик открытия модалки
  const handleOpenModal = (post: Post) => {
    setSelectedPost(post); // Устанавливаем выбранный пост
    setIsModalOpen(true); // Открываем модалку
  };

  // Обработчик закрытия модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null); // Сбрасываем выбранный пост
  };

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[60px]">
      {/* Grid с изображениями постов */}
      <div className={`grid ${styles.grid}`}>
        {posts.length > 0 ? (
          posts.map((item: Post, index: number) => {
            // Для 3-го элемента в ряду (он будет занимать 2 строки по высоте)
            const isThirdInRow = index % 6 === 2;

            return (
              <div
                key={item._id}
                className={`${styles.gridItem} ${isThirdInRow ? 'grid-row-span-2' : ''}`}
              >
                <div
                  className="w-full h-0 pb-[100%] relative cursor-pointer"
                  onClick={() => handleOpenModal(item)} // Открытие модалки при клике
                >
                  <Image
                    src={item.image_url}
                    alt="Post Image"
                    layout="fill"
                    className="object-cover rounded-[4px]"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <span>No Posts</span>
        )}
      </div>

      {/* Модалка с постом, если она открыта */}
      {isModalOpen && selectedPost && (
        <ModalPost
          post={selectedPost}
          userProfile={{
            _id: selectedPost.user_id as string, // Получаем user_id
            user_name: selectedPost.user_name,
            profile_image: selectedPost.profile_image,
            posts_count: posts.length, // Количество постов пользователя
          }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Explore;











// "use client";

// import { useEffect, useState } from "react";
// import { $api } from "../api/api";
// import Image from "next/image";
// // import ProfileImageUploader from "../molecules/ProfileImageUploder";

// // Тип данных для поста
// type Post = {
//   _id: string;
//   image_url: string;
// };

// export const Explore = () => {
//   const [posts, setPosts] = useState<Post[]>([]);

//   // Получение постов
//   useEffect(() => {
//     const getPublicPosts = async () => {
//       try {
//         const res = await $api.get("/post/all/public");
//         // Перемешиваем посты в случайном порядке перед сохранением
//         const shuffledPosts = res.data.sort(() => Math.random() - 0.5);
//         setPosts(shuffledPosts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     getPublicPosts();
//   }, []);

//   return (
//     <div className="globalContainer flex flex-col max-w-[975px] py-[60px]">
//       {/* <ProfileImageUploader /> */}
//       <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
//         {posts.length > 0 ? (
//           posts.map((item: Post, index: number) => (
//             <div
//               key={item._id}
//               className={`
//                 ${index % 6 === 2 ? "row-span-2" : "h-[316px]"}
//                 w-full relative aspect-w-1 aspect-h-1 
//               `}
//             >
//               <Image
//                 src={item.image_url}
//                 alt="Post Image"
//                 layout="fill"
//                 className="object-cover rounded-[4px]"
//               />
//             </div>
//           ))
//         ) : (
//           <span>No Posts</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Explore;
