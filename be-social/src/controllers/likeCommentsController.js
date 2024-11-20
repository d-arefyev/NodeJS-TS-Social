import LikeCommentModel from "../models/likeCommentsModel.js"; // модель лайков
import CommentModel from "../models/commentModel.js"; // модель комментариев
import UserModel from "../models/userModel.js"; // модель пользователей

// Лайкнуть комментарий
export const likeComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user.id;

  try {
    // Проверка существования комментария
    const existingComment = await CommentModel.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }

    // Проверка существования пользователя
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Проверка на существование лайка
    const existingLike = await LikeCommentModel.findOne({ comment_id: commentId, user_id: userId });
    if (existingLike) {
      return res.status(400).json({ message: "Вы уже лайкнули этот комментарий" });
    }

    // Добавление лайка
    const like = new LikeCommentModel({ comment_id: commentId, user_id: userId });
    await like.save();

    res.status(201).json({ message: "Лайк добавлен", like });
  } catch (error) {
    console.error("Ошибка при добавлении лайка:", error);
    res.status(500).json({ message: "Ошибка при добавлении лайка", error });
  }
};

// Убрать лайк с комментария
export const unlikeComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user.id;

  try {
    const deleted = await LikeCommentModel.findOneAndDelete({ comment_id: commentId, user_id: userId });
    if (!deleted) {
      return res.status(404).json({ message: "Лайк не найден" });
    }

    res.status(200).json({ message: "Лайк удалён" });
  } catch (error) {
    console.error("Ошибка при удалении лайка:", error);
    res.status(500).json({ message: "Ошибка при удалении лайка", error });
  }
};

// Получить все лайки для комментария
export const getLikesForComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const likes = await LikeCommentModel.find({ comment_id: commentId });
    res.status(200).json(likes);
  } catch (error) {
    console.error("Ошибка при получении лайков:", error);
    res.status(500).json({ message: "Ошибка при получении лайков", error });
  }
};
