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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  // Загружаем посты пользователя
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

  useEffect(() => {
    getPosts(); // Загружаем данные при изменении userId
  }, [params.userId]);

  // Открытие модалки по клику на пост
  const handleOpenModal = (post: any) => {
    setSelectedPost(post); // Устанавливаем выбранный пост
    setIsModalOpen(true); // Открываем модалку
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null); // Очищаем выбранный пост
  };

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[50px]">
      {/* User Profile */}
      <div className="flex self-start">
        <Profile userId={params.userId} />{" "}
        {/* Передаем userId в компонент Profile */}
      </div>

      {/* PostList */}
      <div className="mt-[80px]">
        {isLoading ? (
          <div>Loading posts...</div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
            {posts.map((post) => (
              <div key={post._id} className="w-full relative">
                <div
                  className="w-full h-0 pb-[100%] relative cursor-pointer"
                  onClick={() => handleOpenModal(post)}
                >
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

      {/* Открытие модалки, если выбран пост */}
      {isModalOpen && selectedPost && (
        <ModalPost
          post={selectedPost}
          userProfile={{
            _id: params.userId,
            user_name: "user",
            profile_image: "",
            posts_count: posts.length,
          }} // Передаем профиль пользователя
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProfilePage;
