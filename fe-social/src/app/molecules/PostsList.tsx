"use client";

import React, { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import PostItem from "./PostItem";

const PostsList: React.FC = () => {
  const { posts, loading, error, getFollowPosts } = usePosts();
  const [shuffledPosts, setShuffledPosts] = useState<any[]>([]);
  const [likesCounts, setLikesCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    getFollowPosts(); // Загружаем только посты подписок
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const shuffled = posts.sort(() => Math.random() - 0.5);
      setShuffledPosts(shuffled);

      // Initialize likesCounts after shuffling
      const initialLikesCounts = shuffled.reduce((acc, post) => {
        acc[post._id] = post.likes_count || 0;
        return acc;
      }, {} as { [key: string]: number });
      setLikesCounts(initialLikesCounts); 
    }
  }, [posts]);

  const handleLikesCountChange = (postId: string, newCount: number) => {
    setLikesCounts((prevLikes) => ({
      ...prevLikes,
      [postId]: newCount,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
      {shuffledPosts.map((post) => (
        <PostItem
          key={post._id}
          item={post}
          isFollow={true}
          likesCount={likesCounts[post._id] || 0}
          setLikesCount={handleLikesCountChange}
        />
      ))}
    </ul>
  );
};

export default PostsList;




// "use client"

// import React, { useEffect, useState } from "react";
// import usePosts from "../hooks/usePosts";
// import PostItem from "./PostItem";

// const PostsList: React.FC = () => {
//   const { posts, loading, error, getPosts } = usePosts();
//   const [shuffledPosts, setShuffledPosts] = useState<any[]>([]);
//   const [likesCounts, setLikesCounts] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     getPosts();
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
