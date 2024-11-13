// src/app/atoms/Button.tsx
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
}) => {
  const baseStyles = "flex justify-center items-center h-[32px] rounded-[8px] px-[8px] text-[14px] font-semibold text-color-light";
  const primaryStyles = "bg-color-accent hover:bg-color-dark";
  const secondaryStyles = "bg-gray-500";

  const buttonStyles =
    variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${buttonStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;



// // src/app/atoms/Button.tsx

// import React from "react";

// interface ButtonProps {
//   onClick?: () => void;
//   children: React.ReactNode;
//   type?: "button" | "submit" | "reset";
//   className?: string;
//   disabled?: boolean;
//   variant?: "primary" | "secondary";
// }

// const Button: React.FC<ButtonProps> = ({
//   onClick,
//   children,
//   type = "button",
//   className = "",
//   disabled = false,
//   variant = "primary",
// }) => {
//   const baseStyles = "flex justify-center items-center h-[32px] rounded-[8px] px-[8px] text-[14px] font-semibold text-color-light";
//   const primaryStyles = "bg-color-accent hover:bg-color-dark";
//   const secondaryStyles = "bg-gray-500";

//   const buttonStyles =
//     variant === "primary" ? primaryStyles : secondaryStyles;

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`${baseStyles} ${buttonStyles} ${className}`}
//       disabled={disabled}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;
