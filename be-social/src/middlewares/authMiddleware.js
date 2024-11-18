import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  // Получаем токен из заголовков запроса
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Если токен не предоставлен
  if (!token) {
    return res.status(401).json({ message: 'Доступ запрещен. Токен не предоставлен.' });
  }

  try {
    // Проверяем токен с помощью JWT и получаем данные о пользователе
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Находим пользователя по id из декодированного токена
    const user = await User.findById(decoded.user_id);
    
    // Если пользователь не найден
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден.' });
    }

    // Прикрепляем информацию о пользователе к запросу
    req.user = user;

    // Передаем управление следующему обработчику
    next();
  } catch (error) {
    // В случае ошибок, например, неверный токен
    return res.status(401).json({ message: 'Неверный токен.' });
  }
};

export default authMiddleware;



// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const authMiddleware = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Доступ запрещен. Токен не предоставлен.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.user_id);

//     if (!user) {
//       return res.status(401).json({ message: 'Пользователь не найден.' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Неверный токен.' });
//   }
// };

// export default authMiddleware;