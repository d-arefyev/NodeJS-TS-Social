// src/app/atoms/Input.tsx
import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`h-[38px] px-[8px] border-[1px] border-color-gray rounded-[3px] bg-color-light-gray placeholder:text-[12px] placeholder-color-dark-gray ${className}`}
      required={required}
      disabled={disabled}
    />
  );
};

export default Input;




// // src/app/atoms/Input.tsx

// import React from "react";

// interface InputProps {
//   type?: string;
//   placeholder?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   className?: string;
//   required?: boolean;
//   disabled?: boolean;
// }

// const Input: React.FC<InputProps> = ({
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   className = "",
//   required = false,
//   disabled = false,
// }) => {
//   return (
//     <input
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className={`h-[38px] px-[8px] border-[1px] border-color-gray rounded-[3px] bg-color-light-gray placeholder:text-[12px] placeholder-color-dark-gray${className}`}
//       required={required}
//       disabled={disabled}
//     />
//   );
// };

// export default Input;
