// PostsList рабочий (привязываются пользователи)
"use client";

import { useEffect, useState } from "react";
import { $api } from "../api/api";
import matchUserId from "../helpers/matchUsersId";
import PostItem from "./PostItem";

type Post = {
  _id: string;
  user_id: string;
  image_url: string;
  caption: string;
  likes_count?: number;
  comments_count?: number;
  created_at: string;
  __v: number;
  last_comment?: string;
};

type UserData = {
  profile_image: string;
  user_name: string;
};

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usersData, setUsersData] = useState<{ [key: string]: UserData }>({});
  const [follows, setFollows] = useState([]);
  const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLikeChange = (postId: string, newCount: number) => {
    setLikesCount((prevLikesCount) => ({
      ...prevLikesCount,
      [postId]: newCount,
    }));
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await $api.get("/post/all/public");
        const shuffledPosts = res.data.sort(() => Math.random() - 0.5);
        setPosts(shuffledPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const getFollowers = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await $api.get(`/follow/${userId}/following`);
          setFollows(response.data);
        }
      } catch (error) {
        console.error("Error fetching follows:", error);
      }
    };

    getFollowers();
    getPosts();
  }, []);

  useEffect(() => {
    const getUsersData = async () => {
      if (posts.length === 0) return;

      try {
        // Запрашиваем пользователей для каждого поста
        const userPromises = posts.map((post) =>
          $api.get(`/user/${post.user_id}`)
        );
        const userResponses = await Promise.all(userPromises);

        const users = userResponses.reduce((acc: any, user: any) => {
          if (user.data) {
            acc[user.data._id] = {
              profile_image: user.data.profile_image || "/default-avatar.png",
              user_name: user.data.username || user.data.full_name || "Unknown",
            };
          }
          return acc;
        }, {});

        setUsersData(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUsersData();
  }, [posts]);

  return (
    <ul className="w-full grid gap-y-[14px] gap-x-[40px] lg:grid-cols-2 md:grid-cols-1">
      {posts.length > 0 ? (
        posts.map((item: Post) => (
          <PostItem
            key={item._id}
            item={{
              ...item,
              profile_image:
                usersData[item.user_id]?.profile_image || "/default-avatar.png",
              user_name: usersData[item.user_id]?.user_name || "Unknown",
            }}
            isFollow={matchUserId(follows, item.user_id)}
            likesCount={likesCount[item._id] || item.likes_count || 0}
            setLikesCount={handleLikeChange}
          />
        ))
      ) : (
        <li>No posts available</li>
      )}
    </ul>
  );
};

export default PostsList;