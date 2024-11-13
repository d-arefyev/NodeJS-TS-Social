"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import SideBar from "./SideBar";
import Footer from "./Footer";

// Функция для проверки срока действия токена
const checkTokenExpiration = (token: string | null) => {
  if (!token) return true; // Если токен отсутствует, считаем его истекшим
  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Декодируем JWT
  const expirationTime = decodedToken.exp * 1000; // Переводим время из секунд в миллисекунды
  return expirationTime < Date.now(); // Проверяем, не истек ли токен
};

const ProtectedWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/reset-pass" ||
    pathname === "/";

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Функции для открытия/закрытия фона
  const openOverlay = () => setIsOverlayVisible(true);
  const closeOverlay = () => setIsOverlayVisible(false);

  // Проверка токена при монтировании компонента
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && checkTokenExpiration(token)) {
      router.push("/login");
    } else if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="relative h-full">
      <div className="">
        {!isAuthPage && (
          <div className="">
            <SideBar openOverlay={openOverlay} closeOverlay={closeOverlay} />
          </div>
        )}
        <div className="">
          <main className="min-h-[calc(100vh-158px)]">
            {children}
          </main>
          {!isAuthPage && (
            <div className="">
              <Footer />
            </div>
          )}
          {isOverlayVisible && (
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-50"
              onClick={closeOverlay}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedWrapper;





// рабочая версия
// "use client";

// import React, { useState } from "react";
// import { usePathname } from "next/navigation";
// import SideBar from "./SideBar";
// import Footer from "./Footer";

// const ProtectedWrapper: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const pathname = usePathname();

//   const isAuthPage =
//     pathname === "/login" ||
//     pathname === "/register" ||
//     pathname === "/reset-pass" ||
//     pathname === "/";

//   const [isOverlayVisible, setIsOverlayVisible] = useState(false);

//   // Функции для открытия/закрытия фона
//   const openOverlay = () => setIsOverlayVisible(true);
//   const closeOverlay = () => setIsOverlayVisible(false);

//   return (
//     <div className="relative h-full">
//       <div className="">
//         {!isAuthPage && (
//           <div className="">
//             <SideBar openOverlay={openOverlay} closeOverlay={closeOverlay} />
//           </div>
//         )}
//         <div className="flex flex-col min-h-[calc(100vh-158px)] w-full">
//           <main className="flex-grow">{children}</main>
//           {!isAuthPage && <Footer />}
//           {/* Если фон должен быть видим, показываем затемнение */}
//           {isOverlayVisible && (
//             <div
//               className="fixed inset-0 w-full h-full bg-black opacity-50"
//               onClick={closeOverlay}
//             ></div>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProtectedWrapper;
