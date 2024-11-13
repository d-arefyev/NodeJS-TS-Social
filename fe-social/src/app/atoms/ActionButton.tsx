import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-[12px] ${className}`}
    >
      {label}
    </button>
  );
};

export default ActionButton;

