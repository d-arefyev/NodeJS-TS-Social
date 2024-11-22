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


Доустанавливал в процессе:
npm install next@latest
npm install react@latest react-dom@latest
npm install typescript@latest


для сервера:
npm install express-validator



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

-------------------------------------------------------------------------------------------------

Сборка Docker

BackEnd ---------------------------------------------------------
1. Создание в текущей директории be-social

dockerfile (файл)
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
# RUN npm install bcrypt
COPY . .
EXPOSE 5005 
EXPOSE 5000
# CMD ["sh", "-c", "npm run dev & npm run chat && wait"]
CMD ["npm", "run", "dev"]

CMD ["nodemon”, "server.js"]?????

.dockerignore (файл)
node_modules/

2. Запуск в текущей директории be-social
сборка:
docker build . -t be-social
запуск:
docker run -it be-social



FrontEnd ---------------------------------------------------------

dockerfile (файл)
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 
CMD ["npm", "run", "dev"]

2. Запуск в текущей директории fe-social
сборка:
docker build . -t fe-social
запуск:
docker run -it fe-social


В корневой директории создать 3 файла -------------------------------

.env
.gitignore

docker-compose.yml (файл)
ersion: "3.9"

services:
  be-ichgram:
    build:
      context: ./be-social
      dockerfile: dockerfile
    container_name: be-social
    ports:
      - "5000:5000"
      - "5005:5005"
    # env_file: // нельзя публиковать env таким образом
    #   - .env
    depends_on:
      - mongo
    # // env таким образом не выгружается
    volumes: 
      - .env:/app/.env

  fe-ichgram:
    build:
      context: ./fe-social
      dockerfile: dockerfile
    container_name: fe-social
    ports:
      - "3000:3000"

# Настройка БД
#   mongo-database:
#     container_name: mongo-database
#     image: mongo:7
#     restart: always
#     ports:
#       - 27017:27017
#     # разрешаем подключиться к БД откуда угодно 0.0.0.0
#     command: --auth --bind_ip 0.0.0.0
#     environment:
#        MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
#        MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
#        MONGO_INITDB_DATABASE: ${MONGO_INITDB_DATABASE}
#     env_file:
#       - .env
#     # Дублирование БД параллельно на машине (для случая потери БД на удаленном сервере)
#     volumes:
#       - ./data/db:/data/db

# volumes:
#   mongo-data:


// Пример создания healthcheck, который будет корректно запускать приложение в доккере
healthcheck:
      test: ["CMD", "curl","-XGET", "localhost:9200/_cluster/health?wait_for_status=yellow&timeout=650s&pretty"]
      interval: 30s
      timeout: 5m
      retries: 30
depends_on:
      elasticsearch:
          condition: service_healthy

Запуск: 
docker-compose up

-------------------------------------------------------------------------------------------------

vite_configs.ts (если сборка проекта на Vite, то обязательно прописать) -------

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
   server: 
    { host: true, port: 5173 }, // нужно прописать порт
  plugins: [react()],
  resolve: {
    alias: {
      'i18next': path.resolve(__dirname, 'node_modules/i18next'),
    },
  },
});






github

Сбросить последний коммит:
git reset --hard HEAD
git reset --hard HEAD~1
