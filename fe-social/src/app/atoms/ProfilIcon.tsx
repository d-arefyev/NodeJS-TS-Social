// src/app/atoms/ProfilIcon.tsx

import React from "react";

interface IconProps {
  className?: string;
}

// Home ProfilIcon
export const ProfilIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12C13.5341 12 14.7778 10.632 14.7778 8.94447C14.7778 7.25693 13.5341 5.88892 12 5.88892C10.4659 5.88892 9.2222 7.25693 9.2222 8.94447C9.2222 10.632 10.4659 12 12 12Z"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M18.111 19.7778C17.9481 16.8863 17.0417 14.7778 11.9998 14.7778C6.95805 14.7778 6.0517 16.8863 5.88876 19.7778"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ProfilIconHover = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.8 8.9C15.8 11.1 14.1 13 12 13C9.9 13 8.2 11.2 8.2 8.9C8.2 6.6 9.9 4.9 12 4.9C14.1 4.9 15.8 6.7 15.8 8.9ZM23 12C23 18.1 18.1 23 12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12ZM21 12C21 7 17 3 12 3C7 3 3 7 3 12C3 14.2 3.8 16.3 5.2 17.8C5.8 15.6 7.4 13.7 12 13.7C16.7 13.7 18.3 15.5 18.8 17.8C20.2 16.3 21 14.2 21 12Z"
      fill="black"
    />
  </svg>
);
