// рабочая версия
// src/app/components/SubMenuSearch.tsx
import React, { useEffect } from "react";

interface SubMenuSearchProps {
  onClose: () => void;
}

const SubMenuSearch: React.FC<SubMenuSearchProps> = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".submenu-search")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="submenu-search absolute left-[244px] top-0 h-full w-[395px] bg-color-light rounded-tr-[16px] rounded-br-[16px]">
      <div className="p-4">Поиск</div>
    </div>
  );
};

export default SubMenuSearch;
