"use client"

import React, { useEffect, useState } from "react";
import { $api } from "../api/api";
import Image from "next/image";
import ActionButton from "../atoms/ActionButton";
import ModalConfirm from "../modal/ModalConfirm";
import Notification from "../modal/Notification";
import UploadIcon from "../atoms/UploadIcon";
import EmojiPicker from "../components/EmojiPicker";

interface ModalCreatePostProps {
  onClose: () => void;
  profileImage: string; 
  username: string;
}

const ModalCreatePost: React.FC<ModalCreatePostProps> = ({
  onClose,
  profileImage,
  username,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    username: string;
    profile_image: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Извлекаем данные пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserProfile({
        username: user.username,
        profile_image: user.profile_image,
      });
    }
  }, []);

  // Function to handle emoji click
  const handleEmojiClick = (emoji: string) => {
    setContent(content + emoji);
  };

  const handlePostSubmit = async () => {
    if (!content || !file) {
      setNotification({
        message: "Please add text and image",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", content);

    try {
      setLoading(true);
      await $api.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNotification({
        message: "The post has been successfully published!",
        type: "success",
      });
      onClose();
    } catch (error) {
      setNotification({
        message: "Error creating post!",
        type: "error",
      });
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div
        className="bg-color-light w-[914px] h-[564px] rounded-[12px] shadow-lg relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center h-[43px] border-b-[1px] border-color-gray">
          <h2 className="font-semibold text-center flex-1">Create New Post</h2>
          <ActionButton
            label="Share"
            onClick={handlePostSubmit}
            className="absolute right-0 text-color-accent"
          />
        </div>

        {/* Body */}
        <div className="flex h-[calc(100%-43px)]">
          {/* Left - Upload Section */}
          <div className="flex flex-col items-center justify-center w-[60%] h-full relative">
            {/* Upload image */}
            <div className="flex flex-col items-center justify-center w-full h-full bg-color-light-gray relative">
              {/* Drop area */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {/* Upload Icon */}
              <label className="absolute flex flex-col items-center justify-center w-full h-full cursor-pointer text-color-dark-gray z-0">
                <UploadIcon />
                <span>Drag or select an image</span>
              </label>

              {/* Image preview */}
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="object-cover w-full h-full z-20"
                />
              )}
            </div>
          </div>

          {/* Right - User Info Section */}
          <div className="flex flex-col items-center justify-between w-[40%] h-full">
            {/* Avatar and Cancel Button */}
            <div className="flex items-center w-full p-[16px]">
              <div className="relative w-[36px] h-[36px]">
                <Image
                  src="/ava-frame.png"
                  alt="Avatar frame"
                  width={36}
                  height={36}
                  className="w-full h-full"
                />
                <Image
                  src={userProfile?.profile_image || "/default-avatar.png"}
                  alt="Profile Avatar"
                  width={24}
                  height={24}
                  className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
                />
              </div>
              <span className="text-[14px] font-semibold ml-[10px]">
                {userProfile?.username || "username"}
              </span>
              <button
                onClick={() => setShowConfirmModal(true)}
                className="text-color-dark-gray hover:text-color-accent absolute right-[16px]"
              >
                ✕
              </button>
            </div>

            {/* Text Content Section */}
            <div className="w-full h-full flex flex-col justify-between">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Что нового сегодня?"
                maxLength={1000}
                className="w-full p-[16px] border-b-[1px] border-color-gray resize-none mb-[8px] flex-grow"
              />
              <div className="text-right text-[12px] text-color-dark-gray mr-[16px] placeholder:text-color-dark-gray">
                {content.length}/1000
              </div>

              {/* Emoji Section */}
              <div className="flex flex-wrap gap-2 p-[12px]">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Exit Modal */}
      {showConfirmModal && (
        <ModalConfirm
          message="Unpublish? If you exit, your changes will not be saved."
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={onClose}
        />
      )}

      {/* Notification Modal */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ModalCreatePost;


// "use client";

// import React, { useState } from "react";
// import { $api } from "../api/api";
// import Image from "next/image";
// import ActionButton from "../atoms/ActionButton";
// import ModalConfirm from "../modal/ModalConfirm";
// import Notification from "../modal/Notification";
// import UploadIcon from "../atoms/UploadIcon";

// interface ModalCreatePostProps {
//   onClose: () => void;
//   profileImage: string; // URL изображения профиля пользователя
//   username: string;     // Имя пользователя
// }

// const ModalCreatePost: React.FC<ModalCreatePostProps> = ({
//   onClose,
//   profileImage,
//   username,
// }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [content, setContent] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [notification, setNotification] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);

//   const handlePostSubmit = async () => {
//     if (!content || !file) {
//       setNotification({
//         message: "Please add text and image",
//         type: "error",
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("caption", content);

//     try {
//       setLoading(true);
//       await $api.post("/post", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setNotification({
//         message: "The post has been successfully published!",
//         type: "success",
//       });
//       onClose();
//     } catch (error) {
//       setNotification({
//         message: "Error creating post!",
//         type: "error",
//       });
//       console.error("Error creating post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
//       <div
//         className="bg-color-light w-[914px] h-[564px] rounded-[12px] shadow-lg relative overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center h-[43px] border-b-[1px] border-color-gray">
//           <h2 className="font-semibold text-center flex-1">Create New Post</h2>
//           <ActionButton
//             label="Share"
//             onClick={handlePostSubmit}
//             className="absolute right-0 text-color-accent"
//           />
//         </div>

//         {/* Body */}
//         <div className="flex h-[calc(100%-43px)]">
//           {/* Left - Upload Section */}
//           <div className="flex flex-col items-center justify-center w-[60%] h-full relative">
//             {/* Upload image */}
//             <div className="flex flex-col items-center justify-center w-full h-full bg-color-light-gray relative">
//               {/* Drop area */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//               />

//               {/* Upload Icon */}
//               <label className="absolute flex flex-col items-center justify-center w-full h-full cursor-pointer text-color-dark-gray z-0">
//                 <UploadIcon />
//                 <span>Drag or select an image</span>
//               </label>

//               {/* Image preview */}
//               {file && (
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt="Preview"
//                   className="object-cover w-full h-full z-20"
//                 />
//               )}
//             </div>
//           </div>

//           {/* Right - User Info Section */}
//           <div className="flex flex-col items-center justify-between w-[40%] h-full">
//             {/* Avatar and Cancel Button */}
//             <div className="flex items-center w-full p-[16px]">
//               <div className="relative w-[36px] h-[36px]">
//                 <Image
//                   src="/ava-frame.png"
//                   alt="Avatar frame"
//                   width={36}
//                   height={36}
//                   className="w-full h-full"
//                 />
//                 <Image
//                   src={profileImage}
//                   alt="avatar"
//                   width={1}
//                   height={1}
//                   className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
//                 />
//               </div>
//               <span className="text-[14px] font-semibold ml-[10px]">{username || "username"}</span>
//               <button
//                 onClick={() => setShowConfirmModal(true)}
//                 className="text-color-dark-gray hover:text-color-accent absolute right-[16px]"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Text Content Section */}
//             <div className="w-full h-full flex flex-col justify-between">
//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Что нового сегодня?"
//                 maxLength={1000}
//                 className="w-full h-full p-2 border-b-[1px] border-color-gray resize-none mb-[8px]"
//               />
//               <div className="text-right text-[12px] text-color-dark-gray mr-[16px] placeholder:text-color-dark-gray">
//                 {content.length}/1000
//               </div>

//               {/* Emoji Section */}
//               <div className="flex gap-2 mb-[16px] ml-[16px]">
//                 <span role="img" aria-label="smile">😊</span>
//                 <span role="img" aria-label="heart">❤️</span>
//                 <span role="img" aria-label="thumbs-up">👍</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirm Exit Modal */}
//       {showConfirmModal && (
//         <ModalConfirm
//           message="Unpublish? If you exit, your changes will not be saved."
//           onCancel={() => setShowConfirmModal(false)}
//           onConfirm={onClose}
//         />
//       )}

//       {/* Notification Modal */}
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default ModalCreatePost;
