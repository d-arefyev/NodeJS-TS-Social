// import Comment from '../models/commentModel.js';
// import Post from '../models/postModel.js';

// // Получение комментариев к посту
// export const getPostComments = async (req, res) => {
//   try {
//     const comments = await Comment.find({ post_id: req.params.postId })
//                                   .populate('user_id', 'username profile_image') // Заполнение данных пользователя
//                                   .sort({ created_at: -1 }); // Сортировка по времени создания
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при получении комментариев', message: error.message });
//   }
// };

// // Создание комментария
// export const createComment = async (req, res) => {
//   const { postId, userId } = req.params;
//   const { comment_text } = req.body;

//   try {
//     // Проверка, существует ли пост
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ error: 'Пост не найден' });

//     // Создание нового комментария
//     const comment = new Comment({
//       post_id: postId,
//       user_id: userId,
//       comment_text,
//       created_at: new Date(),
//     });

//     // Сохранение комментария
//     await comment.save();

//     // Обновление количества комментариев в посте
//     post.comments_count += 1;
//     await post.save();

//     // Возвращаем комментарий в ответ
//     res.status(201).json(comment);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при создании комментария', message: error.message });
//   }
// };

// // Удаление комментария
// export const deleteComment = async (req, res) => {
//   const { commentId } = req.params;

//   try {
//     // Находим комментарий
//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).json({ error: 'Комментарий не найден' });

//     // Удаляем комментарий
//     await Comment.findByIdAndDelete(commentId);

//     // Обновляем количество комментариев в посте
//     const post = await Post.findById(comment.post_id);
//     if (post) {
//       post.comments_count -= 1;
//       await post.save();
//     }

//     res.status(200).json({ message: 'Комментарий удалён' });
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при удалении комментария', message: error.message });
//   }
// };


// // new-1
// import Comment from '../models/commentModel.js';
// import Post from '../models/postModel.js';

// // Получение комментариев к посту
// export const getPostComments = async (req, res) => {
//   try {
//     const comments = await Comment.find({ post_id: req.params.postId });
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при получении комментариев' });
//   }
// };

// // Создание комментария
// export const createComment = async (req, res) => {
//   const { postId, userId } = req.params;
//   const { comment_text } = req.body;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ error: 'Пост не найден' });

//     const comment = new Comment({
//       post_id: postId,
//       user_id: userId,
//       comment_text,
//       created_at: new Date(),
//     });

//     await comment.save();

//     post.comments_count += 1;
//     await post.save();

//     res.status(201).json(comment);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при создании комментария' });
//   }
// };

// // Удаление комментария
// export const deleteComment = async (req, res) => {
//   const { commentId } = req.params;

//   try {
//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).json({ error: 'Комментарий не найден' });

//     await Comment.findByIdAndDelete(commentId);

//     const post = await Post.findById(comment.post_id);
//     post.comments_count -= 1;
//     await post.save();

//     res.status(200).json({ message: 'Комментарий удалён' });
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при удалении комментария' });
//   }
// };




// new-2
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';

// Получение комментариев к посту
export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении комментариев' });
  }
};

// Создание комментария
export const createComment = async (req, res) => {
  const { postId } = req.params; // id поста из URL
  const { userId, comment_text } = req.body; // userId и comment_text из тела запроса

  try {
    // Проверяем, что postId есть в запросе
    if (!postId) {
      return res.status(400).json({ error: 'postId обязателен' });
    }

    // Ищем пост по его ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Пост не найден' });
    }

    // Проверяем, что userId и comment_text были переданы
    if (!userId || !comment_text) {
      return res.status(400).json({ error: 'userId и comment_text обязательны' });
    }

    // Создаем новый комментарий
    const comment = new Comment({
      post_id: postId,
      user_id: userId,
      comment_text,
      created_at: new Date(),
    });

    // Сохраняем комментарий
    await comment.save();

    // Увеличиваем количество комментариев в посте
    post.comments_count += 1;
    await post.save();

    // Возвращаем созданный комментарий
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании комментария' });
  }
};

// Удаление комментария
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: 'Комментарий не найден' });

    await Comment.findByIdAndDelete(commentId);

    const post = await Post.findById(comment.post_id);
    post.comments_count -= 1;
    await post.save();

    res.status(200).json({ message: 'Комментарий удалён' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении комментария' });
  }
};