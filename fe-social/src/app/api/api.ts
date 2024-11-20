// import axios from "axios";

// const base_url = "http://localhost:5005/api/";

// export const $api = axios.create({ baseURL: base_url });

// $api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // ???
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });


// Docker version
import axios from "axios";

const base_url = "http://localhost:5005/api/";

export const $api = axios.create({ baseURL: base_url });

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ???
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const socketURL = "http://be-ichgram: 5005";













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
