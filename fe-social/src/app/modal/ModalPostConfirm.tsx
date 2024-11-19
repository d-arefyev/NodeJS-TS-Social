"use client";

import React, { useState } from "react";
import { $api } from "../api/api";
import { useRouter } from "next/navigation"; // Для app директории
import ModalConfirm from "../modal/ModalConfirm";
import Notification from "../modal/Notification";

// Обновим интерфейс пропсов, чтобы он включал userProfile
interface ModalPostConfirmProps {
  post: {
    user_name: string;
    username: string;
    _id: string;
    image_url: string;
    caption: string;
    created_at: string;
  };
  userProfile: {
    _id: string;
    username: string;
    profile_image: string;
    posts_count: number;
  };
  onClose: () => void;
}

const ModalPostConfirm: React.FC<ModalPostConfirmProps> = ({ post, userProfile, onClose }) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // Исправим запрос на удаление, передаем только ID поста
      await $api.delete(`/posts/${post._id}`);
      router.push("/"); // Перенаправляем на главную страницу после удаления поста
      setNotification({
        message: "Post deleted successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
      setNotification({
        message: "Error deleting post.",
        type: "error",
      });
    }
    onClose();
  };

  const handleEdit = () => {
    console.log("Edit post");
    onClose();
  };

  const handleGoToPost = () => {
    router.push(`/post/${post._id}`); // Используем _id поста для перехода
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setNotification({
      message: "Link copied!",
      type: "success",
    });
    onClose();
  };

  // Обработчик клика по фону для закрытия только ModalPostConfirm
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие события
    onClose(); // Закрываем только ModalPostConfirm
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]"
      onClick={handleModalClick} 
    >
      <div
        className="bg-color-light rounded-[12px] shadow-lg w-[400px] text-center"
        onClick={(e) => e.stopPropagation()} // Останавливаем всплытие для самого окна
      >
        <div className="flex flex-col justify-center">
          {/* Кнопка Delete с красным цветом */}
          <button
            onClick={handleDelete}
            className="text-[14px] h-[48px] font-semibold text-red-500"
          >
            Delete
          </button>

          {/* Остальные кнопки без изменений */}
          <button
            onClick={handleEdit}
            className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
          >
            Edit
          </button>
          <button
            onClick={handleGoToPost}
            className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
          >
            Go to Post
          </button>
          <button
            onClick={handleCopyLink}
            className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
          >
            Copy Link
          </button>
          <button
            onClick={onClose}
            className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
          >
            Cancel
          </button>
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

export default ModalPostConfirm;





// "use client";

// import React, { useState } from "react";
// import { $api } from "../api/api";
// import { useRouter } from "next/navigation"; // Для app директории
// import ModalConfirm from "../modal/ModalConfirm";
// import Notification from "../modal/Notification";

// interface ModalPostConfirmProps {
//   post: {
//     user_name: string;
//     username: string;
//     _id: string;
//     image_url: string;
//     caption: string;
//     created_at: string;
//   };
//   onClose: () => void;
// }

// const ModalPostConfirm: React.FC<ModalPostConfirmProps> = ({ post, onClose }) => {
//   const [notification, setNotification] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     try {
//       await $api.delete(`/posts/${post}`);
//       router.push("/"); // Перенаправляем на главную страницу после удаления поста
//       setNotification({
//         message: "Post deleted successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Ошибка при удалении поста:", error);
//       setNotification({
//         message: "Error deleting post.",
//         type: "error",
//       });
//     }
//     onClose();
//   };

//   const handleEdit = () => {
//     console.log("Edit post");
//     onClose();
//   };

//   const handleGoToPost = () => {
//     router.push(`/post/${post}`);
//     onClose();
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setNotification({
//       message: "Link copied!",
//       type: "success",
//     });
//     onClose();
//   };

//   // Обработчик клика по фону для закрытия только ModalPostConfirm
//   const handleModalClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Останавливаем всплытие события
//     onClose(); // Закрываем только ModalPostConfirm
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//       onClick={handleModalClick} 
//     >
//       <div
//         className="bg-color-light rounded-[12px] shadow-lg w-[400px] text-center"
//         onClick={(e) => e.stopPropagation()} // Останавливаем всплытие для самого окна
//       >
//         <div className="flex flex-col justify-center">
//           {/* Кнопка Delete с красным цветом */}
//           <button
//             onClick={handleDelete}
//             className="text-[14px] h-[48px] font-semibold text-red-500"
//           >
//             Delete
//           </button>

//           {/* Остальные кнопки без изменений */}
//           <button
//             onClick={handleEdit}
//             className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleGoToPost}
//             className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
//           >
//             Go to Post
//           </button>
//           <button
//             onClick={handleCopyLink}
//             className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
//           >
//             Copy Link
//           </button>
//           <button
//             onClick={onClose}
//             className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
//           >
//             Cancel
//           </button>
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

// export default ModalPostConfirm;
