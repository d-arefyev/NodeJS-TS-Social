import React, { useState } from "react";

// Список эмодзи
const emojis = [
  "😂", "😍", "😢", "👏", "🔥", "🥳", "❤️", "🤔", "😘", "🎉", "😆", "😊", "😁",
  "😎", "🤗", "🙌", "👌", "👍", "💪", "🥰", "😜", "🤩", "🤯", "🥺", "😅", "🤣",
  "😋", "😇", "🤤", "😈", "🥴", "😏", "🤓", "🙄", "😩", "🤥", "😴", "💀", "👻",
  "😳", "😤", "😱", "💩", "🤡"
];

interface EmojiPickerProps {
  onEmojiClick: (emoji: string) => void; 
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiClick }) => {
  return (
    <div className="flex w-full">
      {/* Список эмодзи, который отображается внутри контейнера */}
      <div className="w-full grid grid-cols-10 gap-[4px]">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-xl cursor-pointer"
            onClick={() => onEmojiClick(emoji)} 
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;





// import React, { useState } from "react";

// // Список эмодзи
// const emojis = [
//   "😂", "😍", "😢", "👏", "🔥", "🥳", "❤️", "🤔", "😘", "🎉", "😆", "😊", "😁",
//   "😎", "🤗", "🙌", "👌", "👍", "💪", "🥰", "😜", "🤩", "🤯", "🥺", "😅", "🤣",
//   "😋", "😇", "🤤", "😈", "🥴", "😏", "🤓", "🙄", "😩", "🤥", "😴", "💀", "👻",
//   "😳", "😤", "😱", "💩", "🤡"
// ];

// const EmojiPicker = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

//   // Функция для переключения состояния раскрытия списка эмодзи
//   const toggleEmojiList = () => {
//     setIsOpen(!isOpen);
//   };

//   // Функция для выбора эмодзи и добавления его в отображаемые эмодзи
//   const handleEmojiClick = (emoji: string) => {
//     setSelectedEmojis([...selectedEmojis, emoji]); // Добавление эмодзи в массив
//   };

//   return (
//     <div className="relative w-full">
//       {/* Кнопка для отображения эмодзи */}
//       <button
//         onClick={toggleEmojiList}
//         className="p-2 bg-transparent border-none cursor-pointer"
//       >
//         <img
//           src="/icons/smile.svg"  // Путь к вашему SVG-файлу
//           alt="Emoji Icon"
//           width={20}
//           height={20}
//         />
//       </button>

//       {/* Список эмодзи в строках */}
//       {isOpen && (
//         <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-full z-20 max-h-60 overflow-auto">
//           <div className="grid grid-cols-4 gap-2 p-2">
//             {emojis.map((emoji, index) => (
//               <div
//                 key={index}
//                 className="text-xl cursor-pointer hover:bg-gray-200 rounded p-1"
//                 onClick={() => handleEmojiClick(emoji)} // Добавление эмодзи в массив
//               >
//                 {emoji}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Отображение выбранных эмодзи внутри родительского блока */}
//       <div className="flex flex-wrap mt-2">
//         {selectedEmojis.map((emoji, index) => (
//           <div key={index} className="text-xl p-1">
//             {emoji}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmojiPicker;
