// рабочая версия
// src/app/components/SubMenuNotifications.tsx
import React, { useEffect } from "react";

interface SubMenuNotificationsProps {
  onClose: () => void;
}

const SubMenuNotifications: React.FC<SubMenuNotificationsProps> = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".submenu-notifications")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="submenu-notifications absolute left-[244px] top-0 h-full w-[395px] bg-color-light rounded-tr-[16px] rounded-br-[16px]">
      <div className="p-4">Уведомления</div>
    </div>
  );
};

export default SubMenuNotifications;
