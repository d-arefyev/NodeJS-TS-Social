import multer from 'multer';

// Настройка multer
const storage = multer.memoryStorage(); // Хранить файлы в памяти
const upload = multer({ storage, limits: { fileSize: 1000000 }  });


export default upload;