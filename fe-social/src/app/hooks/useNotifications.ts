import { useState, useEffect } from "react";
import { $api } from "../api/api";

// Типы уведомлений
export interface Notification {
  [x: string]: any; // Обязательно экспортируйте тип
  _id: string;
  user_id: string;
  type: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await $api.get(`/notifications/${userId}/notifications`);
      setNotifications(response.data);
      setError(null);
    } catch (err) {
      setError("Ошибка при загрузке уведомлений");
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationStatus = async (notificationId: string, isRead: boolean) => {
    try {
      await $api.patch(`/notifications/${notificationId}`, { is_read: isRead });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId ? { ...notification, is_read: isRead } : notification
        )
      );
    } catch (err) {
      setError("Ошибка при обновлении статуса уведомления");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  return {
    notifications,
    loading,
    error,
    updateNotificationStatus,
  };
};

export default useNotifications; // Экспортируем по умолчанию
