import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import http from "http"
import { Server } from 'socket.io';
import { messageSocketHandler, authenticateSocket } from './routes/messageRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();
connectDB();

const server = http.createServer(app)

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Инициализация WebSocket сервера
const io = new Server(server, {
  cors: {
    origin: '*', // Разрешить подключения с любого источника
  },
});

// Middleware для WebSocket-аутентификации
// io.use((socket, next) => {
//   authenticateSocket(socket, next); // Проверка JWT токена
// });

// Обработка WebSocket-соединений
io.on('connection', (socket) => {
  console.log('Новое WebSocket соединение');

  // Подключаем обработчики сообщений
  // messageSocketHandler(socket, io);
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});