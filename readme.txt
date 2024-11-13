NodeJS TypeScript FinalProject -----------------------------------------------------------------

Цель проекта
Создание backend API для сервиса, подобного Instagram.

Макет
https://www.figma.com/design/YLRBZlrYStKhG9SeKbkWwC/WebDev%3A-Final-project-(Copy)?node-id=0-1&node-type=canvas
Бэкэнд
https://github.com/d-arefyev/be-social-andrey/tree/main
Фронтэнд
https://github.com/d-arefyev/fe-social-andrey

base_url = https://be-social-cxau.onrender.com/api


NextJS
Create project:
npx create-next-app@latest
npm run dev
npm install mongodb
npm install axios

Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Отслеживание сss
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch


Подключение мессенджера:
npm i socket.io-client


Использование стабильной версии React 18
rm -rf node_modules package-lock.json
npm install react@18 react-dom@18
npm install next-auth


Хостинг для ранения изображений (на бэке)
https://console.cloudinary.com/pm/c-74943dfe7409bbdbde3c659dd1a735/getting-started
npm i cloudinary

// app.js ----------------------------------
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';

// Настройка Cloudinary в 
cloudinary.config({
  cloud_name: 'dts0qhqwh',
  api_key: '388115639224338',
  api_secret: 'wsFmZkS78A5DRfFRhPY2DyUbdlo'
})

// postController.js ------------------------
import { cloud } from '../app.js';
import multer from 'multer'

const storage = multer.memoryStorage();
const upload = multer({ storage })

try {
// get image
    const bufferStream = new stream.PassThrough()
    bufferStream.end(req.file.buffer)

    let image_url = ''

    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Ошибка загрузки' })
      }
      image_url = result.secure_url
      res.status(201).json({ message: 'Картинка сохранилась', url: result.secure_url })
    }).end(req.file.buffer)
};






src
└── app
    ├── api
    │   └── api.ts
    ├── login
    │   ├── page.tsx
    │   └── Login.tsx
    ├── register
    │   ├── page.tsx
    │   └── Register.tsx
    ├── reset-pass
    │   ├── page.tsx
    │   └── ResetPass.tsx
    ├── molecules
    │   ├── ImageForm.tsx
    ├── components
    │   ├── ProtectedRoute.tsx
    ├── layout.tsx
    ├── page.tsx
    └── globals.css