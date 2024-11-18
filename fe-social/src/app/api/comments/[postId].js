import { connectToDatabase } from '../../../lib/mongodb'; // Подключение к MongoDB
import { ObjectId } from 'mongodb'; // Для работы с ObjectId в MongoDB

export default async function handler(req, res) {
  const { postId } = req.query; // Получаем dynamic параметр postId из запроса

  // Если метод GET - получаем все комментарии для данного поста
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      
      // Получаем все комментарии для конкретного поста
      const comments = await db.collection('comments').find({ post_id: postId }).toArray();

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Ошибка при получении комментариев:', error);
      return res.status(500).json({ error: 'Ошибка при получении комментариев' });
    }
  }

  // Если метод POST - добавляем новый комментарий
  if (req.method === 'POST') {
    const { comment_text, user_id } = req.body; // Получаем данные комментария из тела запроса

    // Проверка на наличие текста комментария и user_id
    if (!comment_text || !user_id) {
      return res.status(400).json({ error: 'Комментарий и user_id обязательны' });
    }

    try {
      const { db } = await connectToDatabase();
      
      // Создаем новый комментарий
      const newComment = await db.collection('comments').insertOne({
        post_id: postId, // Пост, к которому относится комментарий
        user_id: user_id, // ID пользователя, который оставил комментарий
        comment_text: comment_text, // Текст комментария
        created_at: new Date(), // Дата создания комментария
      });

      return res.status(201).json(newComment.ops[0]); // Отправляем созданный комментарий
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      return res.status(500).json({ error: 'Ошибка при создании комментария' });
    }
  }

  // Если метод DELETE - удаляем комментарий по его ID
  if (req.method === 'DELETE') {
    const { commentId } = req.query; // Получаем ID комментария, который нужно удалить

    if (!commentId) {
      return res.status(400).json({ error: 'Необходимо указать ID комментария' });
    }

    try {
      const { db } = await connectToDatabase();

      // Находим комментарий по его ID и удаляем
      const result = await db.collection('comments').deleteOne({ _id: new ObjectId(commentId) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Комментарий не найден' });
      }

      return res.status(200).json({ message: 'Комментарий удален' });
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
      return res.status(500).json({ error: 'Ошибка при удалении комментария' });
    }
  }

  // Обработка случая, если метод не поддерживается
  res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
}
