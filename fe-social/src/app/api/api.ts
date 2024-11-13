// 1-st V
import axios from "axios";

const base_url = "http://localhost:5005/api/";
// const base_url = "https://be-social-cxau.onrender.com/api";

export const $api = axios.create({ baseURL: base_url });

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ???
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});


// // 2-nd V
// import axios from "axios";

// const base_url = "http://localhost:5005/api"; // development
// const base_url_prod = "https://be-social-cxau.onrender.com/api";

// //
// export const $api = axios.create({ baseURL: base_url || base_url_prod });

// $api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // ???
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });

// // 3-d V
// import axios from "axios";

// // Получаем базовый URL из переменной окружения
// const base_url = process.env.NEXT_PUBLIC_API_URL;

// export const $api = axios.create({ baseURL: base_url });

// $api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Получаем токен из localStorage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовки запроса
//   }
//   return config;
// });

// // api/api.ts

// export const fetchPostLikes = async (postId: string, userId: string, remove = false) => {
//   const response = await fetch(`/api/posts/${postId}/likes`, {
//     method: remove ? 'DELETE' : 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userId }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update like');
//   }
// };

// export const followUser = async (userId: string, targetUserId: string) => {
//   const response = await fetch(`/api/users/${targetUserId}/follow`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userId }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to follow user');
//   }
// };

// export const unfollowUser = async (userId: string, targetUserId: string) => {
//   const response = await fetch(`/api/users/${targetUserId}/unfollow`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userId }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to unfollow user');
//   }
// };
