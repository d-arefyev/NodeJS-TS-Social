"use client";

import { useEffect, useState } from "react";
import { $api } from "../api/api";
import Image from "next/image";

// Тип данных для поста
type Post = {
  _id: string;
  image_url: string;
};

export const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Получение постов
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await $api.get("/post/all/public");
        // Перемешиваем посты в случайном порядке перед сохранением
        const shuffledPosts = res.data.sort(() => Math.random() - 0.5);
        setPosts(shuffledPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="globalContainer flex flex-col max-w-[975px] py-[60px]">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[4px]">
        {posts.length > 0 ? (
          posts.map((item: Post, index: number) => (
            <div
              key={item._id}
              className={`
                ${
                  index % 6 === 2
                    ? "row-span-2"
                    : "h-[316px]"
                }
                w-full relative aspect-w-1 aspect-h-1
              `}
            >
              <Image
                src={item.image_url}
                alt="Post Image"
                layout="fill"
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <span>No Posts</span>
        )}
      </div>
      {/* <NoMoreUpdates /> */}
    </div>
  );
};

export default Explore;
