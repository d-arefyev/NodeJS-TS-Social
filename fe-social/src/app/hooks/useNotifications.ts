import { useState, useEffect } from 'react';
import { $api } from '../api/api';

// Типы уведомлений
interface Notification {
  _id: string;
  user_id: string;
  type: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => void;
  createNotification: (userId: string, type: string, content: string) => void;
  deleteNotification: (notificationId: string) => void;
  updateNotificationStatus: (notificationId: string, isRead: boolean) => void;
}

const useNotifications = (userId: string): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения уведомлений
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await $api.get(`/notifications/${userId}/notifications`);
      setNotifications(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке уведомлений');
    } finally {
      setLoading(false);
    }
  };

  // Функция для создания уведомления
  const createNotification = async (userId: string, type: string, content: string) => {
    try {
      const response = await $api.post('/notifications/notifications', {
        userId, type, content
      });
      setNotifications((prevNotifications) => [response.data, ...prevNotifications]);
    } catch (err) {
      setError('Ошибка при создании уведомления');
    }
  };

  // Функция для удаления уведомления
  const deleteNotification = async (notificationId: string) => {
    try {
      await $api.delete(`/notifications/notifications/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
    } catch (err) {
      setError('Ошибка при удалении уведомления');
    }
  };

  // Функция для обновления статуса уведомления
  const updateNotificationStatus = async (notificationId: string, isRead: boolean) => {
    try {
      const response = await $api.patch(
        `/notifications/notifications/${notificationId}`,
        { is_read: isRead }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId ? { ...notification, is_read: isRead } : notification
        )
      );
    } catch (err) {
      setError('Ошибка при обновлении статуса уведомления');
    }
  };

  // Загружаем уведомления при монтировании компонента
  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    createNotification,
    deleteNotification,
    updateNotificationStatus,
  };
};

export default useNotifications;
