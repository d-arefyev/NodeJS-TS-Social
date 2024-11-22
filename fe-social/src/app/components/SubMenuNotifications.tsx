"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { $api } from "../api/api";

interface Notification {
  _id: string;
  user_id: string;
  type: string;
  content: string;
  post_preview?: string;
  created_at: string;
  is_read: boolean;
}

interface SubMenuNotificationsProps {
  userId: string;
  onClose: () => void;
}

const SubMenuNotifications: React.FC<SubMenuNotificationsProps> = ({ userId, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Получение уведомлений из API
  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await $api.get(`/notifications/${userId}/notifications`);
      setNotifications(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Ошибка загрузки уведомлений";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Пометить уведомление как прочитанное
  const markAsRead = async (notificationId: string) => {
    try {
      await $api.patch(`/notifications/${notificationId}`, { is_read: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Ошибка при обновлении статуса уведомления:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".submenu-notifications")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="submenu-notifications absolute left-[244px] top-0 h-full w-[395px] bg-color-light rounded-tr-[16px] rounded-br-[16px]">
      <div className="px-[16px] py-[24px]">
        <h2>Notifications</h2>
        <div className="mt-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-color-gray">{error}</div>
          ) : notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`py-[8px] flex items-center space-x-[12px] border-b-[1px] border-color-gray ${
                    notification.is_read ? "opacity-70" : "font-semibold"
                  }`}
                >
                  {/* Аватарка пользователя */}
                  <div className="relative w-[36px] h-[36px]">
                    <Image
                      src="/default-avatar.png" // Замените на реальное поле аватарки, если доступно
                      alt="Profile Avatar"
                      width={36}
                      height={36}
                      className="absolute inset-0 w-[30px] h-[30px] m-auto border bg-color-gray rounded-full"
                    />
                  </div>
                  {/* Сообщение уведомления */}
                  <div className="flex-1">
                    <p className="text-color-dark">
                      {notification.content}
                    </p>
                    {/* Превью поста, если доступно */}
                    {notification.post_preview && (
                      <Link href={`/post/${notification.post_preview}`}>
                        <a
                          className="text-blue-500 hover:underline"
                          onClick={() => markAsRead(notification._id)}
                        >
                          View post
                        </a>
                      </Link>
                    )}
                  </div>
                  {/* Отметка прочтения */}
                  {!notification.is_read && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div>No notifications found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubMenuNotifications;
