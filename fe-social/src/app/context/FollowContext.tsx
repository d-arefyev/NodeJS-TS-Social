import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
  profile_image?: string;
  bio?: string;
  bio_website?: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
}

interface FollowContextType {
  following: { [key: string]: boolean };
  toggleFollow: (userId: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => void;
}

const FollowContext = createContext<FollowContextType>({
  following: {},
  toggleFollow: () => {},
  user: null,
  setUser: () => {},
  fetchUser: () => {},
});

interface FollowProviderProps {
  children: ReactNode;
}

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const [following, setFollowing] = useState<{ [key: string]: boolean }>(JSON.parse(localStorage.getItem("following") || "{}"));
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("user") || "null"));

  const toggleFollow = (userId: string) => {
    setFollowing((prev) => {
      const newFollowing = {
        ...prev,
        [userId]: !prev[userId],
      };
      localStorage.setItem("following", JSON.stringify(newFollowing));
      return newFollowing;
    });
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage.");
      return;
    }

    try {
      const response = await axios.get("/api/user/current", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <FollowContext.Provider value={{ following, toggleFollow, user, setUser, fetchUser }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => useContext(FollowContext);









// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// // Типизация состояния подписок
// interface FollowingState {
//   [userId: string]: boolean;
// }

// // Типизация пользователя
// interface User {
//   id: string;
//   username: string;
//   email: string;
//   profile_image?: string;
//   posts_count: number;
//   followers_count: number;
//   following_count: number;
//   bio: string;
//   bio_website: string;
// }

// // Типизация контекста
// interface FollowContextType {
//   following: FollowingState;
//   toggleFollow: (userId: string) => void;
//   user: User | null;
//   setUser: (user: User | null) => void;
//   fetchUser: () => Promise<void>;
// }

// const FollowContext = createContext<FollowContextType>({
//   following: {},
//   toggleFollow: () => {},
//   user: null,
//   setUser: () => {},
//   fetchUser: async () => {},
// });

// interface FollowProviderProps {
//   children: ReactNode;
// }

// export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
//   const [following, setFollowing] = useState<FollowingState>({});
//   const [user, setUser] = useState<User | null>(null);

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

//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       try {
//         setUser(JSON.parse(savedUser)); // Восстанавливаем данные о пользователе
//       } catch (error) {
//         console.error("Error loading user data from localStorage", error);
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

//   // Функция для загрузки данных о пользователе с сервера
//   const fetchUser = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.warn("No token found");
//       return;
//     }

//     try {
//       const response = await fetch ("/api/user/current", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }

//       const data: User = await response.json();
//       setUser(data); // Обновляем пользователя в контексте
//       localStorage.setItem("user", JSON.stringify(data)); // Сохраняем данные о пользователе в localStorage
//     } catch (error) {
//       console.error("Error fetching user data", error);
//     }
//   };

//   return (
//     <FollowContext.Provider
//       value={{ following, toggleFollow, user, setUser, fetchUser }}
//     >
//       {children}
//     </FollowContext.Provider>
//   );
// };

// // Хук для получения доступа к контексту
// export const useFollow = () => useContext(FollowContext);











// криво работающая версия
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
