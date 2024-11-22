"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { $api } from "../api/api";

interface Message {
  _id: string;
  sender_id: string;
  sender_username: string;
  sender_avatar?: string; // Аватарка отправителя
  content: string; // Текст сообщения
  created_at: string; // Время отправки
  is_read: boolean;
}

interface SubMenuMessagesProps {
  userId: string; // ID текущего пользователя
  onClose: () => void;
}

const SubMenuMessages: React.FC<SubMenuMessagesProps> = ({ userId, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Получение сообщений из API
  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await $api.get(`/messages/${userId}/messages`); // Замените URL на ваш реальный роут
      setMessages(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Ошибка загрузки сообщений";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Пометить сообщение как прочитанное
  const markAsRead = async (messageId: string) => {
    try {
      await $api.patch(`/messages/${messageId}`, { is_read: true }); // Замените URL на ваш реальный роут
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === messageId ? { ...message, is_read: true } : message
        )
      );
    } catch (err) {
      console.error("Ошибка при обновлении статуса сообщения:", err);
    }
  };

  useEffect(() => {
    fetchMessages();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".submenu-messages")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="submenu-messages absolute left-[244px] top-0 h-full w-[395px] bg-color-light rounded-tr-[16px] rounded-br-[16px]">
      <div className="px-[16px] py-[24px]">
        <h2>Messages</h2>
        <div className="mt-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-color-gray">{error}</div>
          ) : messages.length > 0 ? (
            <ul>
              {messages.map((message) => (
                <li
                  key={message._id}
                  className={`py-[8px] flex items-center space-x-[12px] border-b-[1px] border-color-gray ${
                    message.is_read ? "opacity-70" : "font-semibold"
                  }`}
                >
                  {/* Аватарка отправителя */}
                  <div className="relative w-[36px] h-[36px]">
                    <Image
                      src={message.sender_avatar || "/default-avatar.png"} // Укажите поле аватарки
                      alt={`${message.sender_username}'s Avatar`}
                      width={36}
                      height={36}
                      className="absolute inset-0 w-[30px] h-[30px] m-auto border bg-color-gray rounded-full"
                    />
                  </div>
                  {/* Сообщение */}
                  <div className="flex-1">
                    <p className="text-color-dark">
                      <span className="font-bold">{message.sender_username}: </span>
                      {message.content}
                    </p>
                    <p className="text-sm text-color-gray">
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {/* Кнопка прочтения */}
                  {!message.is_read && (
                    <button
                      onClick={() => markAsRead(message._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div>No messages found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubMenuMessages;
