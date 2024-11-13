// ProfileImageUploader

// работает
"use client";

import { useState } from "react";
import { $api } from "../api/api";

// Обновление типов пропсов
interface ProfileImageUploaderProps {
  onUploadSuccess: (url: string) => void; // Добавляем проп onUploadSuccess
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await $api.post("/post", formData); // Путь для загрузки изображения
      const imageUrl = response.data.url;
      setFilePath(imageUrl);
      onUploadSuccess(imageUrl); // Передаем URL изображения в родительский компонент
    } catch (err) {
      console.error("Ошибка при загрузке изображения:", err);
      alert("Ошибка при загрузке изображения");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button type="submit">Отправить картинку</button>
      {filePath && <span>URL картинки: {filePath}</span>}
    </form>
  );
};

export default ProfileImageUploader;






// // src/molecules/ProfileImageUploader.tsx

// // рабочий исходник
// "use client"

// import { useState } from "react";
// import { $api } from "../api/api";

// const ProfileImageUploder = () => {
//   const [file, setFile] = useState<File>();
//   const [filePath, setfilePath] = useState("");

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     if (!file) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);

//     const response = $api
//       .post("/post", formData) // тут была ошибка
//       .then((res) => setfilePath(res.data.url));
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         required
//         //@ts-ignore
//         onChange={(e) => setFile(e.target.files[0])}
//         type="file"
//         accept="image/*"
//       />
//       <button>Отпправить картинку</button>
//       <span>url до картинки {filePath}</span>
//     </form>
//   );
// };

// export default ProfileImageUploder