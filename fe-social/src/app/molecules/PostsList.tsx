"use client";

import React, { useEffect, useState, useCallback } from "react";
import { $api } from "../api/api";
import PostItem from "./PostItem";
import ModalPost from "../modal/ModalPost";  // Импортируем ModalPost

// Типизация данных для поста
interface Post {
  _id: string;
  caption: string;
  created_at: string;
  image_url: string;
  profile_image: string;
  user_name: string;
  user_id: string | { _id: string };
  likes_count: number;
  comments_count: number;
  last_comment: string;
}

// Типизация данных для счетчика лайков
interface LikesCounts {
  [key: string]: number;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likesCounts, setLikesCounts] = useState<LikesCounts>({});
  const [shuffledPosts, setShuffledPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Состояние для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Загружаем информацию о текущем пользователе
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Загружаем посты при монтировании компонента
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await $api.get("/post/all/public");
        setPosts(response.data); // Сохраняем все посты
        setLoading(false);

        // Инициализируем счетчик лайков
        const initialLikesCounts = response.data.reduce((acc: LikesCounts, post: Post) => {
          acc[post._id] = post.likes_count || 0;
          return acc;
        }, {});
        setLikesCounts(initialLikesCounts);
      } catch (err) {
        setError("Error fetching posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Используем useCallback для мемоизации функции перемешивания постов
  const shufflePosts = useCallback(() => {
    const shuffled = [...posts].sort(() => Math.random() - 0.5);
    setShuffledPosts(shuffled); // Перемешиваем посты
  }, [posts]);

  // Перемешиваем посты только при изменении списка постов
  useEffect(() => {
    if (posts.length > 0) {
      shufflePosts();
    }
  }, [posts, shufflePosts]);

  // Обработчик изменения лайков
  const handleLikesCountChange = (postId: string, newCount: number) => {
    setLikesCounts((prevLikes) => ({
      ...prevLikes,
      [postId]: newCount,
    }));
  };

  // Обработчик изменения подписки
  const handleFollowChange = (targetUserId: string, newFollowStatus: boolean) => {
    console.log(`User is toggling follow status for ${targetUserId}: ${newFollowStatus}`);
  };

  // Открытие модалки
  const handleOpenModal = (post: Post) => {
    setSelectedPost(post); // Устанавливаем выбранный пост
    setIsModalOpen(true); // Открываем модалку
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null); // Очищаем выбранный пост
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
        {shuffledPosts.map((post) => (
          <PostItem
            key={post._id}
            item={post} // Передаем пост с полными данными
            likesCount={likesCounts[post._id] || 0}
            setLikesCount={handleLikesCountChange}
            onFollowChange={(newFollowStatus) => handleFollowChange(post.user_id as string, newFollowStatus)} // Передаем только обработчик
            isAuthenticated={isAuthenticated} // Передаем статус авторизации
            onClick={() => handleOpenModal(post)} // Обработчик для открытия модалки
          />
        ))}
      </ul>

      {/* Открытие модалки, если выбран пост */}
      {isModalOpen && selectedPost && (
        <ModalPost
          post={selectedPost}
          userProfile={{
            _id: selectedPost.user_id as string,
            user_name: selectedPost.user_name,
            profile_image: selectedPost.profile_image,
            posts_count: posts.length,
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default PostsList;



// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { $api } from "../api/api";
// import PostItem from "./PostItem";
// import ModalPost from "../modal/ModalPost";  // Импортируем ModalPost

// // Типизация данных для поста
// interface Post {
//   _id: string;
//   caption: string;
//   created_at: string;
//   image_url: string;
//   profile_image: string;
//   user_name: string;
//   user_id: string | { _id: string };
//   likes_count: number;
//   comments_count: number;
//   last_comment: string;
// }

// // Типизация данных для счетчика лайков
// interface LikesCounts {
//   [key: string]: number;
// }

// const PostsList: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [likesCounts, setLikesCounts] = useState<LikesCounts>({});
//   const [shuffledPosts, setShuffledPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
//   // Состояние для модалки
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);

//   // Загружаем информацию о текущем пользователе
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Загружаем посты при монтировании компонента
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await $api.get("/post/all/public");
//         setPosts(response.data); // Сохраняем все посты
//         setLoading(false);

//         // Инициализируем счетчик лайков
//         const initialLikesCounts = response.data.reduce((acc: LikesCounts, post: Post) => {
//           acc[post._id] = post.likes_count || 0;
//           return acc;
//         }, {});
//         setLikesCounts(initialLikesCounts);
//       } catch (err) {
//         setError("Error fetching posts.");
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Используем useCallback для мемоизации функции перемешивания постов
//   const shufflePosts = useCallback(() => {
//     const shuffled = [...posts].sort(() => Math.random() - 0.5);
//     setShuffledPosts(shuffled); // Перемешиваем посты
//   }, [posts]);

//   // Перемешиваем посты только при изменении списка постов
//   useEffect(() => {
//     if (posts.length > 0) {
//       shufflePosts();
//     }
//   }, [posts, shufflePosts]);

//   // Обработчик изменения лайков
//   const handleLikesCountChange = (postId: string, newCount: number) => {
//     setLikesCounts((prevLikes) => ({
//       ...prevLikes,
//       [postId]: newCount,
//     }));
//   };

//   // Обработчик изменения подписки
//   const handleFollowChange = (targetUserId: string, newFollowStatus: boolean) => {
//     console.log(`User is toggling follow status for ${targetUserId}: ${newFollowStatus}`);
//   };

//   // Открытие модалки
//   const handleOpenModal = (post: Post) => {
//     setSelectedPost(post); // Устанавливаем выбранный пост
//     setIsModalOpen(true); // Открываем модалку
//   };

//   // Закрытие модалки
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedPost(null); // Очищаем выбранный пост
//   };

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
//         {shuffledPosts.map((post) => (
//           <PostItem
//             key={post._id}
//             item={post} // Передаем пост с полными данными
//             likesCount={likesCounts[post._id] || 0}
//             setLikesCount={handleLikesCountChange}
//             onFollowChange={(newFollowStatus) => handleFollowChange(post.user_id as string, newFollowStatus)} // Передаем только обработчик
//             isAuthenticated={isAuthenticated} // Передаем статус авторизации
//             onClick={() => handleOpenModal(post)} // Обработчик для открытия модалки
//           />
//         ))}
//       </ul>

//       {/* Открытие модалки, если выбран пост */}
//       {isModalOpen && selectedPost && (
//         <ModalPost
//           post={selectedPost}
//           userProfile={{
//             _id: selectedPost.user_id as string,
//             user_name: selectedPost.user_name,
//             profile_image: selectedPost.profile_image,
//             posts_count: posts.length,
//           }}
//           onClose={handleCloseModal}
//         />
//       )}
//     </>
//   );
// };

// export default PostsList;
