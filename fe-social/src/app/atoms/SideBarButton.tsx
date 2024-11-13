// src/atoms/SideBarButton.tsx
import React, { useState } from "react";

interface SideBarButtonProps {
  label: string;
  Icon: React.ReactNode;
  HoverIcon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({
  label,
  Icon,
  HoverIcon,
  onClick,
  isActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`flex items-center gap-[8px] p-2 rounded-lg w-full h-[48px] px-[12px] ${
        isActive ? "font-semibold" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="w-6 h-6">
        {isHovered || isActive ? HoverIcon : Icon}
      </span>
      <span
        className={`ml-[8px] ${isHovered || isActive ? "font-semibold" : ""}`}
      >
        {label}
      </span>
    </button>
  );
};

export default SideBarButton;
