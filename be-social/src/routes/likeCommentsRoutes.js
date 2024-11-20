import express from "express";
import {
  likeComment,
  unlikeComment,
  getLikesForComment,
} from "../controllers/likeCommentsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Лайкнуть комментарий
router.post("/post/:postId/comment/:commentId", authMiddleware, likeComment);

// Убрать лайк с комментария
router.delete("/post/:postId/comment/:commentId", authMiddleware, unlikeComment);

// Получить все лайки для комментария
router.get("/comment/:commentId", getLikesForComment);

export default router;
