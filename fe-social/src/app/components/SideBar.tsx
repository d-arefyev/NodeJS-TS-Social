"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../atoms/Logo";
import {
  HomeIcon,
  HomeIconHover,
  SearchIcon,
  SearchIconHover,
  ExploreIcon,
  ExploreIconHover,
  MessagesIcon,
  MessagesIconHover,
  NotificationsIcon,
  NotificationsIconHover,
  CreateIcon,
  CreateIconHover,
} from "../atoms/SideBarIcons";
import SubMenuSearch from "./SubMenuSearch";
import SubMenuMessages from "./SubMenuMessages";
import SubMenuNotifications from "./SubMenuNotifications";
import ModalCreatePost from "../modal/ModalCreatePost";
import SideBarButton from "../atoms/SideBarButton";
import Image from "next/image";
import { LogoutIcon, LogoutIconHover } from "../atoms/LogoutIcon";

interface SideBarProps {
  openOverlay: () => void;
  closeOverlay: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ openOverlay, closeOverlay }) => {
  const router = useRouter();
  const [isSubMenuVisible, setSubMenuVisible] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("home");
  const [userProfile, setUserProfile] = useState<{ username: string; profile_image: string } | null>(null);

  // Извлекаем данные пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserProfile({ username: user.username, profile_image: user.profile_image });
    }
  }, []);

  const handleHomeClick = () => {
    setActiveButton("home");
    router.push("/home");
  };

  const handleSearchClick = () => {
    setActiveButton("search");
    toggleSubMenu("search");
    openOverlay();
  };

  const handleExploreClick = () => {
    setActiveButton("explore");
    router.push("/explore");
  };

  const handleMessagesClick = () => {
    setActiveButton("messages");
    toggleSubMenu("messages");
    openOverlay();
  };

  const handleNotificationsClick = () => {
    setActiveButton("notifications");
    toggleSubMenu("notifications");
    openOverlay();
  };

  const handleCreateClick = () => setModalVisible(true);

  const handleProfileClick = () => {
    setActiveButton("profile");
    router.push("/profile");
  };

  const handleLogout = () => {
    // Удаляем данные пользователя и токен из localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    // Перенаправляем на страницу входа
    router.push("/login");
  };

  const toggleSubMenu = (menu: string) => {
    setSubMenuVisible((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="absolute left-0 top-0 flex flex-col min-h-[calc(100%-158px)] py-[38px] px-[12px] w-[244px] bg-color-light border-r-[1px] border-color-gray z-[10000]">
      <div className="w-[90px] ml-[16px] mb-[38px]">
        <Logo />
      </div>
      <div className="flex flex-col gap-[6px]">
        <SideBarButton
          label="Home"
          Icon={<HomeIcon />}
          HoverIcon={<HomeIconHover />}
          onClick={handleHomeClick}
          isActive={activeButton === "home"}
        />
        <SideBarButton
          label="Search"
          Icon={<SearchIcon />}
          HoverIcon={<SearchIconHover />}
          onClick={handleSearchClick}
          isActive={activeButton === "search"}
        />
        {isSubMenuVisible === "search" && <SubMenuSearch onClose={() => { setSubMenuVisible(null); closeOverlay(); }} />}

        <SideBarButton
          label="Explore"
          Icon={<ExploreIcon />}
          HoverIcon={<ExploreIconHover />}
          onClick={handleExploreClick}
          isActive={activeButton === "explore"}
        />

        <SideBarButton
          label="Messages"
          Icon={<MessagesIcon />}
          HoverIcon={<MessagesIconHover />}
          onClick={handleMessagesClick}
          isActive={activeButton === "messages"}
        />
        {isSubMenuVisible === "messages" && <SubMenuMessages onClose={() => { setSubMenuVisible(null); closeOverlay(); }} />}

        <SideBarButton
          label="Notifications"
          Icon={<NotificationsIcon />}
          HoverIcon={<NotificationsIconHover />}
          onClick={handleNotificationsClick}
          isActive={activeButton === "notifications"}
        />
        {isSubMenuVisible === "notifications" && <SubMenuNotifications onClose={() => { setSubMenuVisible(null); closeOverlay(); }} />}

        <SideBarButton
          label="Create"
          Icon={<CreateIcon />}
          HoverIcon={<CreateIconHover />}
          onClick={handleCreateClick}
        />
        {isModalVisible && <ModalCreatePost onClose={() => setModalVisible(false)} profileImage={""} username={""} />}
      </div>

      {/* Профиль */}
      <div className="mt-[50px]">
        <SideBarButton
          label={userProfile?.username || "Profile"}
          Icon={
            <Image
              src={userProfile?.profile_image || "/default-avatar.png"}
              alt="Profile Avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
          }
          HoverIcon={
            <Image
              src={userProfile?.profile_image || "/default-avatar.png"}
              alt="Profile Avatar Hover"
              width={24}
              height={24}
              className="rounded-full border-[2px] border-color-dark"
            />
          }
          onClick={handleProfileClick}
          isActive={activeButton === "profile"}
        />
      </div>

      {/* Кнопка Logout */}
        <SideBarButton
          label="Logout"
          Icon={<LogoutIcon />}
          HoverIcon={<LogoutIconHover />}
          onClick={handleLogout}
        />
    </div>
  );
};

export default SideBar;





// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Logo } from "../atoms/Logo";
// import {
//   HomeIcon,
//   HomeIconHover,
//   SearchIcon,
//   SearchIconHover,
//   ExploreIcon,
//   ExploreIconHover,
//   MessagesIcon,
//   MessagesIconHover,
//   NotificationsIcon,
//   NotificationsIconHover,
//   CreateIcon,
//   CreateIconHover,
// } from "../atoms/SideBarIcons";
// import SubMenuSearch from "./SubMenuSearch";
// import SubMenuMessages from "./SubMenuMessages";
// import SubMenuNotifications from "./SubMenuNotifications";
// import ModalCreatePost from "../modal/ModalCreatePost";
// import SideBarButton from "../atoms/SideBarButton";
// import Image from "next/image";

// interface SideBarProps {
//   openOverlay: () => void;
//   closeOverlay: () => void;
// }

// const SideBar: React.FC<SideBarProps> = ({ openOverlay, closeOverlay }) => {
//   const router = useRouter();
//   const [isSubMenuVisible, setSubMenuVisible] = useState<string | null>(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [activeButton, setActiveButton] = useState<string>("home");
//   const [userProfile, setUserProfile] = useState<{ username: string; profile_image: string } | null>(null);

//   // Извлекаем данные пользователя из localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserProfile({ username: user.username, profile_image: user.profile_image });
//     }
//   }, []);

//   const handleHomeClick = () => {
//     setActiveButton("home");
//     router.push("/home");
//   };
//   const handleSearchClick = () => {
//     setActiveButton("search");
//     toggleSubMenu("search");
//     openOverlay();
//   };
//   const handleExploreClick = () => {
//     setActiveButton("explore");
//     router.push("/explore");
//   };
//   const handleMessagesClick = () => {
//     setActiveButton("messages");
//     toggleSubMenu("messages");
//     openOverlay();
//   };
//   const handleNotificationsClick = () => {
//     setActiveButton("notifications");
//     toggleSubMenu("notifications");
//     openOverlay();
//   };
//   const handleCreateClick = () => setModalVisible(true);
//   const handleProfileClick = () => {
//     setActiveButton("profile");
//     router.push("/profile");
//   };

//   const toggleSubMenu = (menu: string) => {
//     setSubMenuVisible((prev) => (prev === menu ? null : menu));
//   };

//   return (
//     <div className="absolute left-0 top-0 flex flex-col min-h-[calc(100%-158px)] py-[38px] px-[12px] w-[244px] bg-color-light border-r-[1px] border-color-gray z-[10000]">
//       <div className="w-[90px] ml-[16px] mb-[38px]">
//         <Logo />
//       </div>
//       <div className="flex flex-col gap-[6px]">
//         <SideBarButton
//           label="Home"
//           Icon={<HomeIcon />}
//           HoverIcon={<HomeIconHover />}
//           onClick={handleHomeClick}
//           isActive={activeButton === "home"}
//         />
//         <SideBarButton
//           label="Search"
//           Icon={<SearchIcon />}
//           HoverIcon={<SearchIconHover />}
//           onClick={handleSearchClick}
//           isActive={activeButton === "search"}
//         />
//         {isSubMenuVisible === "search" && <SubMenuSearch onClose={() => {setSubMenuVisible(null); closeOverlay();}} />}

//         <SideBarButton
//           label="Explore"
//           Icon={<ExploreIcon />}
//           HoverIcon={<ExploreIconHover />}
//           onClick={handleExploreClick}
//           isActive={activeButton === "explore"}
//         />

//         <SideBarButton
//           label="Messages"
//           Icon={<MessagesIcon />}
//           HoverIcon={<MessagesIconHover />}
//           onClick={handleMessagesClick}
//           isActive={activeButton === "messages"}
//         />
//         {isSubMenuVisible === "messages" && <SubMenuMessages onClose={() => {setSubMenuVisible(null); closeOverlay();}} />}

//         <SideBarButton
//           label="Notifications"
//           Icon={<NotificationsIcon />}
//           HoverIcon={<NotificationsIconHover />}
//           onClick={handleNotificationsClick}
//           isActive={activeButton === "notifications"}
//         />
//         {isSubMenuVisible === "notifications" && <SubMenuNotifications onClose={() => {setSubMenuVisible(null); closeOverlay();}} />}

//         <SideBarButton
//           label="Create"
//           Icon={<CreateIcon />}
//           HoverIcon={<CreateIconHover />}
//           onClick={handleCreateClick}
//         />
//         {isModalVisible && <ModalCreatePost onClose={() => setModalVisible(false)} profileImage={""} username={""} />}
//       </div>
//       <div className="mt-[50px]">
//         <SideBarButton
//           label={userProfile?.username || "Profile"}
//           Icon={
//             <Image
//               src={userProfile?.profile_image || "/default-avatar.png"}
//               alt="Profile Avatar"
//               width={24}
//               height={24}
//               className="rounded-full"
//             />
//           }
//           HoverIcon={
//             <Image
//               src={userProfile?.profile_image || "/default-avatar.png"}
//               alt="Profile Avatar Hover"
//               width={24}
//               height={24}
//               className="rounded-full border-[2px] border-color-dark"
//             />
//           }
//           onClick={handleProfileClick}
//           isActive={activeButton === "profile"}
//         />
//       </div>
//     </div>
//   );
// };

// export default SideBar;
