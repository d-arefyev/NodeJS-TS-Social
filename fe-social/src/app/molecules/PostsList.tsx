"use client";

import React, { useEffect, useState, useCallback } from "react";
import { $api } from "../api/api";
import PostItem from "./PostItem";

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

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
      {shuffledPosts.map((post) => (
        <PostItem
          key={post._id}
          item={post} // Передаем пост с полными данными
          likesCount={likesCounts[post._id] || 0}
          setLikesCount={handleLikesCountChange}
          onFollowChange={(newFollowStatus) => handleFollowChange(post.user_id as string, newFollowStatus)} // Передаем только обработчик
        />
      ))}
    </ul>
  );
};

export default PostsList;













// // загружается все, только работает кнопка подписки (только остальные посты не меняются на unfollow)
// "use client";

// import React, { useEffect, useState } from "react";
// import { $api } from "../api/api";
// import PostItem from "./PostItem";

// const PostsList: React.FC = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [likesCounts, setLikesCounts] = useState<{ [key: string]: number }>({});
//   const [shuffledPosts, setShuffledPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await $api.get("/post/all/public");
//         setPosts(response.data); // Сохраняем все посты
//         setLoading(false);

//         // Инициализируем счетчик лайков
//         const initialLikesCounts = response.data.reduce((acc: any, post: any) => {
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

//   useEffect(() => {
//     if (posts.length > 0) {
//       const shuffled = [...posts].sort(() => Math.random() - 0.5);
//       setShuffledPosts(shuffled); // Перемешиваем посты
//     }
//   }, [posts]);

//   const handleLikesCountChange = (postId: string, newCount: number) => {
//     setLikesCounts((prevLikes) => ({
//       ...prevLikes,
//       [postId]: newCount,
//     }));
//   };

//   const handleFollowChange = (userId: string, targetUserId: string, newFollowStatus: boolean) => {
//     console.log(`User ${userId} is now ${newFollowStatus ? "following" : "unfollowing"} user ${targetUserId}`);
//   };

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
//       {shuffledPosts.map((post) => (
//         <PostItem
//           key={post._id}
//           item={post}
//           isFollow={false} // Поставь состояние follow в true/false по потребности
//           likesCount={likesCounts[post._id] || 0}
//           setLikesCount={handleLikesCountChange}
//           onFollowChange={handleFollowChange}
//         />
//       ))}
//     </ul>
//   );
// };

// export default PostsList;







// // загружается все, только не работает кнопка подписки (нет совственного id)
// "use client";

// import React, { useEffect, useState } from "react";
// import { $api } from "../api/api";
// import PostItem from "./PostItem";

// const PostsList: React.FC = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [likesCounts, setLikesCounts] = useState<{ [key: string]: number }>({});
//   const [shuffledPosts, setShuffledPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await $api.get("/post/all/public");
//         setPosts(response.data); // Сохраняем все посты
//         setLoading(false);

//         // Инициализируем счетчик лайков
//         const initialLikesCounts = response.data.reduce((acc: any, post: any) => {
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

//   useEffect(() => {
//     if (posts.length > 0) {
//       const shuffled = [...posts].sort(() => Math.random() - 0.5);
//       setShuffledPosts(shuffled); // Перемешиваем посты
//     }
//   }, [posts]);

//   const handleLikesCountChange = (postId: string, newCount: number) => {
//     setLikesCounts((prevLikes) => ({
//       ...prevLikes,
//       [postId]: newCount,
//     }));
//   };

//   const handleFollowChange = (userId: string, targetUserId: string, newFollowStatus: boolean) => {
//     console.log(`User ${userId} is now ${newFollowStatus ? "following" : "unfollowing"} user ${targetUserId}`);
//   };

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
//       {shuffledPosts.map((post) => (
//         <PostItem
//           key={post._id}
//           item={post}
//           isFollow={false} // Поставь состояние follow в true/false по потребности
//           likesCount={likesCounts[post._id] || 0}
//           setLikesCount={handleLikesCountChange}
//           onFollowChange={handleFollowChange}
//         />
//       ))}
//     </ul>
//   );
// };

// export default PostsList;





// // загружается все, только не работает кнопка подписки
// "use client";

// import React, { useEffect, useState } from "react";
// import { $api } from "../api/api";
// import PostItem from "./PostItem";

// const PostsList: React.FC = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [likesCounts, setLikesCounts] = useState<{ [key: string]: number }>({});
//   const [shuffledPosts, setShuffledPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await $api.get("/post/all/public");
//         setPosts(response.data); // Сохраняем все посты
//         setLoading(false);

//         // Инициализируем счетчик лайков
//         const initialLikesCounts = response.data.reduce((acc: any, post: any) => {
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

//   useEffect(() => {
//     if (posts.length > 0) {
//       const shuffled = [...posts].sort(() => Math.random() - 0.5);
//       setShuffledPosts(shuffled); // Перемешиваем посты
//     }
//   }, [posts]);

//   const handleLikesCountChange = (postId: string, newCount: number) => {
//     setLikesCounts((prevLikes) => ({
//       ...prevLikes,
//       [postId]: newCount,
//     }));
//   };

//   const handleFollowChange = (userId: string, targetUserId: string, newFollowStatus: boolean) => {
//     console.log(`User ${userId} is now ${newFollowStatus ? "following" : "unfollowing"} user ${targetUserId}`);
//   };

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
//       {shuffledPosts.map((post) => (
//         <PostItem
//           key={post._id}
//           item={post}
//           isFollow={false} // Поставь состояние follow в true/false по потребности
//           likesCount={likesCounts[post._id] || 0}
//           setLikesCount={handleLikesCountChange}
//           onFollowChange={handleFollowChange}
//         />
//       ))}
//     </ul>
//   );
// };

// export default PostsList;












// попытка реализовать показа на главной постов м подпиской
// "use client";

// import React, { useEffect, useState } from "react";
// import usePosts from "../hooks/usePosts";
// import PostItem from "./PostItem";

// const PostsList: React.FC = () => {
//   const { posts, loading, error, getFollowPosts } = usePosts();
//   const [shuffledPosts, setShuffledPosts] = useState<any[]>([]);
//   const [likesCounts, setLikesCounts] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     getFollowPosts(); // Загружаем только посты подписок
//   }, []);

//   useEffect(() => {
//     if (posts.length > 0) {
//       const shuffled = posts.sort(() => Math.random() - 0.5);
//       setShuffledPosts(shuffled);

//       // Initialize likesCounts after shuffling
//       const initialLikesCounts = shuffled.reduce((acc, post) => {
//         acc[post._id] = post.likes_count || 0;
//         return acc;
//       }, {} as { [key: string]: number });
//       setLikesCounts(initialLikesCounts);
//     }
//   }, [posts]);

//   const handleLikesCountChange = (postId: string, newCount: number) => {
//     setLikesCounts((prevLikes) => ({
//       ...prevLikes,
//       [postId]: newCount,
//     }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
//       {shuffledPosts.map((post) => (
//         <PostItem
//           key={post._id}
//           item={post}
//           isFollow={true}
//           likesCount={likesCounts[post._id] || 0}
//           setLikesCount={handleLikesCountChange}
//         />
//       ))}
//     </ul>
//   );
// };

// export default PostsList;
