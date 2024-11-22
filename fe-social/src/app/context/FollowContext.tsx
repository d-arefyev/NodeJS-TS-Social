import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Типизация состояния подписок
interface FollowingState {
  [userId: string]: boolean;
}

// Контекст подписок
const FollowContext = createContext<{
  following: FollowingState;
  toggleFollow: (userId: string) => void;
}>({
  following: {},
  toggleFollow: () => {},
});

interface FollowProviderProps {
  children: ReactNode;
}

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const [following, setFollowing] = useState<FollowingState>({});

  // Загружаем данные из localStorage при монтировании компонента
  useEffect(() => {
    const savedFollowing = localStorage.getItem("following");
    if (savedFollowing) {
      try {
        setFollowing(JSON.parse(savedFollowing)); // Восстанавливаем состояние из localStorage
      } catch (error) {
        console.error("Error loading following data from localStorage", error);
      }
    }
  }, []);

  // Функция для обновления состояния подписки
  const toggleFollow = (userId: string) => {
    setFollowing((prevFollowing) => {
      const isFollowing = prevFollowing[userId] || false;
      const newFollowing = {
        ...prevFollowing,
        [userId]: !isFollowing, // Переключаем состояние подписки
      };

      // Сохраняем состояние в localStorage только если оно изменилось
      if (JSON.stringify(newFollowing) !== JSON.stringify(prevFollowing)) {
        localStorage.setItem("following", JSON.stringify(newFollowing)); // Сохраняем обновленное состояние
      }

      return newFollowing;
    });
  };

  return (
    <FollowContext.Provider value={{ following, toggleFollow }}>
      {children}
    </FollowContext.Provider>
  );
};

// Хук для получения доступа к контексту
export const useFollow = () => useContext(FollowContext);



// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// // Типизация состояния подписок
// interface FollowingState {
//   [userId: string]: boolean;
// }

// // Контекст подписок
// const FollowContext = createContext<{
//   following: FollowingState;
//   toggleFollow: (userId: string) => void;
// }>({
//   following: {},
//   toggleFollow: () => {},
// });

// interface FollowProviderProps {
//   children: ReactNode;
// }

// export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
//   const [following, setFollowing] = useState<FollowingState>({});

//   // Загружаем данные из localStorage при монтировании компонента
//   useEffect(() => {
//     const savedFollowing = localStorage.getItem("following");
//     if (savedFollowing) {
//       try {
//         setFollowing(JSON.parse(savedFollowing)); // Восстанавливаем состояние из localStorage
//       } catch (error) {
//         console.error("Error loading following data from localStorage", error);
//       }
//     }
//   }, []);

//   // Функция для обновления состояния подписки
//   const toggleFollow = (userId: string) => {
//     setFollowing((prevFollowing) => {
//       const isFollowing = prevFollowing[userId] || false;
//       const newFollowing = {
//         ...prevFollowing,
//         [userId]: !isFollowing, // Переключаем состояние подписки
//       };

//       // Сохраняем состояние в localStorage только если оно изменилось
//       if (JSON.stringify(newFollowing) !== JSON.stringify(prevFollowing)) {
//         localStorage.setItem("following", JSON.stringify(newFollowing)); // Сохраняем обновленное состояние
//       }

//       return newFollowing;
//     });
//   };

//   return (
//     <FollowContext.Provider value={{ following, toggleFollow }}>
//       {children}
//     </FollowContext.Provider>
//   );
// };

// // Хук для получения доступа к контексту
// export const useFollow = () => useContext(FollowContext);
