import User from '../models/userModel.js';
import getUserIdFromToken from '../utils/helpers.js';
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';
import multer from 'multer';

// Настройка multer для загрузки изображений
const storage = multer.memoryStorage(); // Сохраняем файл в памяти
const upload = multer({ storage });

export const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select('-password').select('-created_at');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения профиля пользователя', error: error.message });
  }
};

// Обновить профиль пользователя
export const updateUserProfile = async (req, res) => {
  const userId = getUserIdFromToken(req);

  try {
    const bufferStream = new stream.PassThrough()
    bufferStream.end(req.file.buffer)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
      const { username, bio } = req.body;

      if (username) user.username = username;
      if (bio) user.bio = bio;

      if (req.file) {
        user.profile_image = result.secure_url; // адресс до картинки
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления профиля', error: error.message });
  }
};

// Экспорт загрузки
export const uploadProfileImage = upload.single('profile_image');