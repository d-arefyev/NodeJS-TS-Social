// // original
// import Like from '../models/likeModel.js';
// import Post from '../models/postModel.js';

// // Получение лайков для поста
// export const getPostLikes = async (req, res) => {
//   try {
//     const likes = await Like.find({ post_id: req.params.postId });
//     res.status(200).json(likes);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при получении лайков' });
//   }
// };

// // Лайк поста
// export const likePost = async (req, res) => {
//   const { postId, userId } = req.params;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ error: 'Пост не найден' });

//     const existingLike = await Like.findOne({ post_id: postId, user_id: userId });
//     if (existingLike) return res.status(400).json({ error: 'Пост уже лайкнут' });

//     const like = new Like({
//       post_id: postId,
//       user_id: userId,
//       created_at: new Date(),
//     });

//     await like.save();

//     post.likes_count += 1;
//     await post.save();

//     res.status(201).json(like);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при лайке поста' });
//   }
// };

// // Удаление лайка
// export const unlikePost = async (req, res) => {
//   const { postId, userId } = req.params;

//   try {
//     // Проверяем, существует ли лайк
//     const like = await Like.findOne({ post_id: postId, user_id: userId });
//     if (!like) return res.status(404).json({ error: 'Лайк не найден' });

//     // Удаляем лайк
//     await Like.findByIdAndDelete(like._id);

//     // Обновляем количество лайков у поста
//     const post = await Post.findById(postId);
//     if (post) {
//       post.likes_count -= 1;
//       await post.save();
//     }

//     res.status(200).json({ message: 'Лайк удалён' });
//   } catch (error) {
//     console.error("Ошибка на сервере:", error);
//     res.status(500).json({ error: 'Ошибка при удалении лайка' });
//   }
// };


// // new
import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";

// Получение лайков для поста и проверка, лайкнул ли текущий пользователь
export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.query; // Получаем userId из query

    // Получаем все лайки для поста
    const likes = await Like.find({ post_id: postId });

    // Проверяем, лайкнул ли текущий пользователь
    const userLiked = likes.some((like) => like.user_id.toString() === userId);

    // Отправляем информацию о лайкнутом статусе и количестве лайков
    res.status(200).json({
      liked: userLiked,
      likesCount: likes.length,
    });
  } catch (error) {
    console.error("Ошибка при получении лайков:", error);
    res.status(500).json({ error: "Ошибка при получении лайков" });
  }
};

// Лайк поста
export const likePost = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Пост не найден" });

    // Проверяем, лайкнул ли уже пользователь этот пост
    const existingLike = await Like.findOne({ post_id: postId, user_id: userId });
    if (existingLike) {
      return res.status(400).json({ error: "Пост уже лайкнут" });
    }

    // Создаем новый лайк
    const like = new Like({
      post_id: postId,
      user_id: userId,
      created_at: new Date(),
    });
    await like.save();

    // Увеличиваем количество лайков на посте
    post.likes_count += 1;
    await post.save();

    res.status(201).json(like); // Возвращаем новый лайк
  } catch (error) {
    console.error("Ошибка при лайке поста:", error);
    res.status(500).json({ error: "Ошибка при лайке поста" });
  }
};

// Удаление лайка
export const unlikePost = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    // Находим лайк, который нужно удалить
    const like = await Like.findOne({ post_id: postId, user_id: userId });
    if (!like) return res.status(404).json({ error: "Лайк не найден" });

    // Удаляем лайк из базы
    await Like.findByIdAndDelete(like._id);

    // Уменьшаем количество лайков на посте
    const post = await Post.findById(postId);
    if (post) {
      post.likes_count -= 1;
      await post.save();
    }

    res.status(200).json({ message: "Лайк удалён" });
  } catch (error) {
    console.error("Ошибка при удалении лайка:", error);
    res.status(500).json({ error: "Ошибка при удалении лайка" });
  }
};






// import Like from '../models/likeModel.js';
// import Post from '../models/postModel.js';

// // Получение лайков для поста
// export const getPostLikes = async (req, res) => {
//   try {
//     const likes = await Like.find({ post_id: req.params.postId });
//     res.status(200).json(likes);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при получении лайков' });
//   }
// };

// // Лайк поста
// export const likePost = async (req, res) => {
//   const { postId, userId } = req.params;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ error: 'Пост не найден' });

//     const existingLike = await Like.findOne({ post_id: postId, user_id: userId });
//     if (existingLike) return res.status(400).json({ error: 'Пост уже лайкнут' });

//     const like = new Like({
//       post_id: postId,
//       user_id: userId,
//       created_at: new Date(),
//     });

//     await like.save();

//     post.likes_count += 1;
//     await post.save();

//     res.status(201).json(like);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при лайке поста' });
//   }
// };

// // Удаление лайка
// export const unlikePost = async (req, res) => {
//   const { postId, userId } = req.params;

//   try {
//     const like = await Like.findOne({ post_id: postId, user_id: userId });
//     if (!like) return res.status(404).json({ error: 'Лайк не найден' });

//     await Like.findByIdAndDelete(like._id);

//     const post = await Post.findById(postId);
//     post.likes_count -= 1;
//     await post.save();

//     res.status(200).json({ message: 'Лайк удалён' });
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при удалении лайка' });
//   }
// };