"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { $api } from "../api/api";
import Profile from "../profile/Profile";
// import NoMoreUpdates from "../atoms/NoMoreUpdates";

const ProfilePage = ({ params }: { params: { userId: string } }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Получаем посты пользователя
  const getPosts = async () => {
    try {
      const response = await $api.get(`/post/all?userId=${params.userId}`);
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [params.userId]);

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
      {/* User Profile */}
      <div className="flex self-start">
        <Profile userId={params.userId} /> {/* Передаем userId в компонент Profile */}
      </div>

      {/* PostList */}
      <div className="mt-[80px]">
        {isLoading ? (
          <div>Loading posts...</div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
            {posts.map((post) => (
              <div key={post._id} className="w-full relative">
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
      {/* <NoMoreUpdates /> */}
    </div>
  );
};

export default ProfilePage;
