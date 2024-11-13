// src/app/atoms/LogoutIcon.tsx

import React from "react";

interface IconProps {
  className?: string;
}

export const LogoutIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 12V15.45C2 18.299 2.698 19.455 3.606 20.394C4.546 21.303 5.704 22.002 8.552 22.002H15.448C18.296 22.002 19.454 21.302 20.394 20.394C21.302 19.455 22 18.3 22 15.45V8.552C22 5.703 21.302 4.546 20.394 3.607C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.699 3.606 3.607C2.698 4.547 2 5.703 2 8.552V12Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 12L17 12.0009"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M15.5 9L17.5 12L15.5 15"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const LogoutIconHover = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clipPath="url(#clip0_0_1)">
      <path
        d="M21.1 2.9C19.9 1.8 18.5 1 15.4 1H8.6C5.5 1 4.1 1.8 2.9 2.9C1.8 4.1 1 5.5 1 8.6V15.5C1 18.6 1.8 20 2.9 21.2C4.1 22.2 5.5 23 8.6 23H15.5C18.6 23 20 22.2 21.2 21.1C22.3 19.9 23.1 18.5 23.1 15.5V8.6C23 5.5 22.2 4.1 21.1 2.9ZM12 19C8.1 19 5 15.9 5 12C5 8.1 8.1 5 12 5C12.6 5 13 5.4 13 6C13 6.6 12.6 7 12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C12.6 17 13 17.4 13 18C13 18.6 12.6 19 12 19ZM16.3 15.6C16 16.1 15.4 16.2 14.9 15.9C14.4 15.6 14.3 15 14.6 14.5L15.6 13.1L10 13C9.4 13 9 12.6 9 12C9 11.4 9.4 11 10 11H15.6L14.6 9.6C14.3 9.1 14.4 8.5 14.9 8.2C15.4 7.9 16 8 16.3 8.4L18.7 12L16.3 15.6Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_0_1">
        <rect width="22" height="22" fill="white" transform="translate(1 1)" />
      </clipPath>
    </defs>
  </svg>
);
