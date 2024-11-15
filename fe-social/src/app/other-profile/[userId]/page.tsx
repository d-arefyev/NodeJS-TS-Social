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
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные профиля
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

  // Загружаем посты
  useEffect(() => {
    if (userId) {
      const getUserPosts = async () => {
        try {
          // Теперь передаем userId в запросе
          const response = await $api.get('/post/all', {
            params: { userId },
          });
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
          setError('Failed to load posts.');
        } finally {
          setPostsLoading(false);
        }
      };
  
      getUserPosts();
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!userProfile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
      {/* Информация о пользователе */}
      <OtherProfile userProfile={userProfile} />

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
