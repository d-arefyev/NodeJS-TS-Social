// import express from 'express';
// import { getPostComments, createComment, deleteComment } from '../controllers/commentController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Получение всех комментариев к посту
// router.get('/:postId', authMiddleware, getPostComments);

// // Создание комментария к посту
// router.post('/:postId/:userId', authMiddleware, createComment);

// // Удаление комментария
// router.delete('/:commentId', authMiddleware, deleteComment);

// export default router;



import express from 'express';
import { createComment, getPostComments, deleteComment } from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Добавить комментарий к посту
router.post('/:postId', authMiddleware, createComment);

// Получить все комментарии к посту
router.get('/:postId', authMiddleware, getPostComments);

// Удалить комментарий
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;