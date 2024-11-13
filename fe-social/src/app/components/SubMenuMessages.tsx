// рабочая версия
// src/app/components/SubMenuMessages.tsx
import React, { useEffect } from "react";

interface SubMenuMessagesProps {
  onClose: () => void;
}

const SubMenuMessages: React.FC<SubMenuMessagesProps> = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".submenu-messages")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="absolute left-[244px] top-0 h-full w-[395px] bg-color-light rounded-tr-[16px] rounded-br-[16px]">
      <div className="p-4">Сообщения</div>
    </div>
  );
};

export default SubMenuMessages;

