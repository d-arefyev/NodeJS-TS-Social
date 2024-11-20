"use client";

import React, { useState } from "react";
import { $api } from "../api/api";
import { useRouter } from "next/navigation";
import ModalConfirm from "../modal/ModalConfirm";
import Notification from "../modal/Notification";

interface ModalPostConfirmProps {
  post: {
    user_name: string;
    _id: string;
    image_url: string;
    caption: string;
    created_at: string;
    user_id: string | { _id: string };
  };
  userProfile: {
    _id: string;
    user_name: string;
    profile_image: string;
    posts_count: number;
  };
  onClose: () => void;
}

const ModalPostConfirm: React.FC<ModalPostConfirmProps> = ({
  post,
  userProfile,
  onClose,
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await $api.delete(`/post/${post._id}`);
      setNotification({
        message: "Post deleted successfully!",
        type: "success",
      });
      router.push("/home"); // Перенаправляем на главную
    } catch (error) {
      console.error("Error deleting post:", error);
      setNotification({
        message: "Error deleting post.",
        type: "error",
      });
    } finally {
      setShowConfirmModal(false); // Закрыть ModalConfirm
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true); // Показать модалку подтверждения
  };

  const handleEdit = () => {
    console.log("Edit post");
    onClose();
  };

  const handleGoToPost = () => {
    router.push(`/post/${post._id}`); // Переход к посту
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

  // Проверка, является ли пользователь автором поста
  const isAuthor =
    typeof post.user_id === "string"
      ? post.user_id === userProfile._id
      : post.user_id._id === userProfile._id;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]"
      onClick={onClose} // Закрываем модалку при клике на фон
    >
      <div
        className="bg-color-light rounded-[12px] shadow-lg w-[400px] text-center"
        onClick={(e) => e.stopPropagation()} // Останавливаем всплытие для окна
      >
        <div className="flex flex-col justify-center">
          {/* Кнопка Delete доступна только для автора */}
          {isAuthor && (
            <button
              onClick={handleDeleteClick}
              className="text-[14px] h-[48px] font-semibold  text-red-500 border-b-[1px] border-color-gray hover:text-color-dark"
            >
              Delete
            </button>
          )}
          {isAuthor && (
            <button
              onClick={handleEdit}
              className="text-[14px] h-[48px] border-b-[1px] border-color-gray hover:text-color-accent"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleGoToPost}
            className="text-[14px] h-[48px] border-b-[1px] border-color-gray hover:text-color-accent"
          >
            Go to Post
          </button>
          <button
            onClick={handleCopyLink}
            className="text-[14px] h-[48px] border-b-[1px] border-color-gray hover:text-color-accent"
          >
            Copy Link
          </button>
          <button onClick={onClose} className="text-[14px] h-[48px] hover:text-color-accent">
            Cancel
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <ModalConfirm
          message="Are you sure you want to delete the post?"
          onCancel={() => setShowConfirmModal(false)} // Закрыть модалку
          onConfirm={handleDelete} // Выполнить удаление
        />
      )}

      {/* Notification Modal */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} // Закрыть уведомление
        />
      )}
    </div>
  );
};

export default ModalPostConfirm;




// "use client";

// import React, { useState } from "react";
// import { $api } from "../api/api";
// import { useRouter } from "next/navigation";
// import ModalConfirm from "../modal/ModalConfirm";
// import Notification from "../modal/Notification";

// interface ModalPostConfirmProps {
//   post: {
//     user_name: string;
//     _id: string;
//     image_url: string;
//     caption: string;
//     created_at: string;
//   };
//   userProfile: {
//     _id: string;
//     user_name: string;
//     profile_image: string;
//     posts_count: number;
//   };
//   onClose: () => void;
// }

// const ModalPostConfirm: React.FC<ModalPostConfirmProps> = ({
//   post,
//   userProfile,
//   onClose,
// }) => {
//   const [notification, setNotification] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     try {
//       await $api.delete(`/post/${post._id}`);
//       setNotification({
//         message: "Post deleted successfully!",
//         type: "success",
//       });
//       router.push("/home"); // Перенаправляем на главную
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       setNotification({
//         message: "Error deleting post.",
//         type: "error",
//       });
//     } finally {
//       setShowConfirmModal(false); // Закрыть ModalConfirm
//     }
//   };

//   const handleDeleteClick = () => {
//     setShowConfirmModal(true); // Показать модалку подтверждения
//   };

//   const handleEdit = () => {
//     console.log("Edit post");
//     onClose();
//   };

//   const handleGoToPost = () => {
//     router.push(`/post/${post._id}`); // Переход к посту
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

//   const isAuthor = post.user_name === userProfile.user_name;

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]"
//       onClick={onClose} // Закрываем модалку при клике на фон
//     >
//       <div
//         className="bg-color-light rounded-[12px] shadow-lg w-[400px] text-center"
//         onClick={(e) => e.stopPropagation()} // Останавливаем всплытие для окна
//       >
//         <div className="flex flex-col justify-center">
//           {/* Кнопка Delete доступна только для автора */}
//           {isAuthor && (
//             <button
//               onClick={handleDeleteClick}
//               className="text-[14px] h-[48px] font-semibold text-red-500 hover:text-color-dark"
//             >
//               Delete
//             </button>
//           )}
//           {isAuthor && (
//             <button
//               onClick={handleEdit}
//               className="text-[14px] h-[48px] border-b-[1px] border-color-gray hover:text-color-accent"
//             >
//               Edit
//             </button>
//           )}
//           <button
//             onClick={handleGoToPost}
//             className="text-[14px] h-[48px] border-b-[1px] border-color-gray hover:text-color-accent"
//           >
//             Go to Post
//           </button>
//           <button
//             onClick={handleCopyLink}
//             className="text-[14px] h-[48px] border-b-[1px] border-color-gray hover:text-color-accent"
//           >
//             Copy Link
//           </button>
//           <button onClick={onClose} className="text-[14px] h-[48px] hover:text-color-accent">
//             Cancel
//           </button>
//         </div>
//       </div>

//       {/* Confirm Delete Modal */}
//       {showConfirmModal && (
//         <ModalConfirm
//           message="Are you sure you want to delete the post?"
//           onCancel={() => setShowConfirmModal(false)} // Закрыть модалку
//           onConfirm={handleDelete} // Выполнить удаление
//         />
//       )}

//       {/* Notification Modal */}
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)} // Закрыть уведомление
//         />
//       )}
//     </div>
//   );
// };

// export default ModalPostConfirm;




// все работает, только все могут удалять все
// "use client";

// import React, { useState } from "react";
// import { $api } from "../api/api";
// import { useRouter } from "next/navigation"; // Для app директории
// import ModalConfirm from "../modal/ModalConfirm";
// import Notification from "../modal/Notification";

// interface ModalPostConfirmProps {
//   post: {
//     user_name: string;
//     _id: string;
//     image_url: string;
//     caption: string;
//     created_at: string;
//   };
//   userProfile: {
//     _id: string;
//     user_name: string;
//     profile_image: string;
//     posts_count: number;
//   };
//   onClose: () => void;
// }

// const ModalPostConfirm: React.FC<ModalPostConfirmProps> = ({ post, userProfile, onClose }) => {
//   const [notification, setNotification] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     try {
//       await $api.delete(`/post/${post._id}`);
//       setNotification({
//         message: "Post deleted successfully!",
//         type: "success",
//       });
//       router.push("/home"); // Перенаправляем на главную
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       setNotification({
//         message: "Error deleting post.",
//         type: "error",
//       });
//     } finally {
//       setShowConfirmModal(false); // Закрыть ModalConfirm
//     }
//   };

//   const handleDeleteClick = () => {
//     setShowConfirmModal(true); // Показать модалку подтверждения
//   };

//   const handleEdit = () => {
//     console.log("Edit post");
//     onClose();
//   };

//   const handleGoToPost = () => {
//     router.push(`/post/${post._id}`); // Переход к посту
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

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]"
//       onClick={onClose} // Закрываем модалку при клике на фон
//     >
//       <div
//         className="bg-color-light rounded-[12px] shadow-lg w-[400px] text-center"
//         onClick={(e) => e.stopPropagation()} // Останавливаем всплытие для окна
//       >
//         <div className="flex flex-col justify-center">
//           <button
//             onClick={handleDeleteClick}
//             className="text-[14px] h-[48px] font-semibold text-red-500"
//           >
//             Delete
//           </button>
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

//       {/* Confirm Delete Modal */}
//       {showConfirmModal && (
//         <ModalConfirm
//           message="Are you sure you want to delete the post?"
//           onCancel={() => setShowConfirmModal(false)} // Закрыть модалку
//           onConfirm={handleDelete} // Выполнить удаление
//         />
//       )}

//       {/* Notification Modal */}
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)} // Закрыть уведомление
//         />
//       )}
//     </div>
//   );
// };

// export default ModalPostConfirm;
