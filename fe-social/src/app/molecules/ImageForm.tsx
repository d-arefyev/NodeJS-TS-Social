"use client";

import { useState } from "react";
import { $api } from "../api/api";

const ImageForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      console.error("Файл не выбран");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await $api.post("/post", formData);
      setFilePath(response.data.url);
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        onChange={(e) => {
          if (e.target.files) setFile(e.target.files[0]);
        }}
        type="file"
        accept="image/*"
      />
      <button type="submit">Отправить картинку</button>
      {filePath && <span>URL изображения: {filePath}</span>}
    </form>
  );
};

export default ImageForm;


// "use client"; // Убедитесь, что это клиентский код

// import { useState } from "react";
// import { $api } from "../api/api"; // Убедитесь, что у вас есть правильная настройка для $api

// const ImageForm = () => {
//   const [file, setFile] = useState<File | null>(null); // Обновил на правильный тип
//   const [filePath, setFilePath] = useState<string>(""); // Для хранения пути до загруженной картинки
//   const [loading, setLoading] = useState<boolean>(false); // Для статуса загрузки

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setLoading(true); // Включаем индикатор загрузки
//       // Отправляем запрос на сервер
//       const response = await $api.post("/api/post/upload", formData); // Замените на правильный API маршрут
//       setFilePath(response.data.url); // Сохраняем URL загруженной картинки
//     } catch (error) {
//       console.error("Ошибка при загрузке изображения:", error);
//     } finally {
//       setLoading(false); // Отключаем индикатор загрузки
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-semibold text-center mb-4">Загрузить изображение</h2>

//       <div className="mb-4">
//         <label htmlFor="image-upload" className="block text-lg font-medium mb-2">
//           Выберите изображение
//         </label>
//         <input
//           id="image-upload"
//           required
//           type="file"
//           accept="image/*"
//           className="w-full p-2 border border-gray-300 rounded-md"
//           onChange={(e) => {
//             if (e.target.files) {
//               setFile(e.target.files[0]);
//             }
//           }}
//         />
//       </div>

//       <div className="flex justify-center mb-4">
//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
//         >
//           {loading ? "Загрузка..." : "Отправить картинку"}
//         </button>
//       </div>

//       {filePath && (
//         <div className="text-center text-sm text-gray-700">
//           <p>URL до картинки:</p>
//           <a
//             href={filePath}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline"
//           >
//             {filePath}
//           </a>
//         </div>
//       )}
//     </form>
//   );
// };

// export default ImageForm;





// "use client";

// import { useState } from "react";
// import { $api } from "../api/api";

// const ImageForm = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [filePath, setFilePath] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false); 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setLoading(true);
//       const response = await $api.post("/api/post/upload", formData);
//       setFilePath(response.data.url); 
//     } catch (error) {
//       console.error("Ошибка при загрузке изображения:", error);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         required
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files) {
//             setFile(e.target.files[0]);
//           }
//         }}
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Загрузка..." : "Отправить картинку"}
//       </button>
//       {filePath && <span>URL до картинки: {filePath}</span>}
//     </form>
//   );
// };

// export default ImageForm


// // import { useState } from "react";
// // import { $api } from "../api/api";

// // export const ImageForm = () => {
// //   const [file, setFile] = useState<File>();
// //   const [filePath, setfilePath] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!file) {
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("image", file);

// //     const response = $api
// //       .post("/post", formData) // тут была ошибка
// //       .then((res) => setfilePath(res.data.url));
// //   };
// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         required
// //         //@ts-ignore
// //         onChange={(e) => setFile(e.target.files[0])}
// //         type="file"
// //         accept="image/*"
// //       />
// //       <button>Отпправить картинку</button>
// //       <span>url до картинки {filePath}</span>
// //     </form>
// //   );
// // };



// // // src/app/molecules/ImageForm.tsx
// // "use client";

// // import { useState } from "react";
// // import { $api } from "../api/api";

// // const ImageForm = () => {
// //   const [file, setFile] = useState<File>();
// //   const [filePath, setfilePath] = useState("");

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!file) {
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       const response = await $api.post("/post", formData);
// //       setfilePath(response.data.url);
// //     } catch (error) {
// //       console.error("Ошибка при загрузке изображения:", error);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         required
// //         onChange={(e) => setFile(e.target.files![0])}
// //         type="file"
// //         accept="image/*"
// //       />
// //       <button type="submit">Отправить картинку</button>
// //       <span>url до картинки: {filePath}</span>
// //     </form>
// //   );
// // };

// // export default ImageForm;
