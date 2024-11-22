"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Notification } from "../hooks/useNotifications"; // Импортируем тип Notification
import useNotifications from "../hooks/useNotifications"; // Импортируем хук useNotifications

interface SubMenuNotificationsProps {
  userId: string;
  onClose: () => void;
}

const SubMenuNotifications: React.FC<SubMenuNotificationsProps> = ({ userId, onClose }) => {
  const { notifications, loading, error, updateNotificationStatus } = useNotifications(userId); // Используем хук для уведомлений

  // Функция для обработки клика по уведомлению (пометить как прочитанное)
  const handleMarkAsRead = (notificationId: string) => {
    updateNotificationStatus(notificationId, true); // Отметить уведомление как прочитанное
  };

  // Функция для обработки клика по внешней области, чтобы закрыть меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".submenu-notifications")) {
        onClose(); // Закрытие меню
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
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-color-gray">{error}</div>
          ) : notifications.length > 0 ? (
            <ul>
              {notifications.map((notification: Notification) => ( // Явно указываем тип уведомления
                <li
                  key={notification._id}
                  className={`py-[8px] flex items-center space-x-[12px] border-b-[1px] border-color-gray ${
                    notification.is_read ? "opacity-70" : "font-semibold"
                  }`}
                >
                  {/* Аватарка пользователя */}
                  <div className="relative w-[36px] h-[36px]">
                    <Image
                      src="/default-avatar.png" // Здесь можно заменить на реальное изображение, если есть
                      alt="Profile Avatar"
                      width={36}
                      height={36}
                      className="absolute inset-0 w-[30px] h-[30px] m-auto border bg-color-gray rounded-full"
                    />
                  </div>

                  {/* Сообщение уведомления */}
                  <div className="flex-1">
                    <p className="text-color-dark">{notification.content}</p>
                    {/* Превью поста, если оно есть */}
                    {notification.post_preview && (
                      <Link href={`/post/${notification.post_preview}`}>
                        <a
                          className="text-blue-500 hover:underline"
                          onClick={() => handleMarkAsRead(notification._id)} // Отметить как прочитанное при переходе
                        >
                          View post
                        </a>
                      </Link>
                    )}
                  </div>

                  {/* Кнопка для отметки уведомления как прочитанное */}
                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
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
