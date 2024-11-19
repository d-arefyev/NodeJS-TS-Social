import React from "react";

interface IconProps {
  liked: boolean;
}

export const LikeIcon: React.FC<IconProps> = ({ liked }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M14.1655 2.6936C15.3081 2.75676 16.3794 3.26896 17.1459 4.11857C17.9125 4.96819 18.3122 6.08634 18.2579 7.22938C18.2579 9.89974 15.9527 11.54 13.7404 13.5072C11.5568 15.4569 10.3807 16.5226 10 16.7686C9.58536 16.5 8.13718 15.184 6.25958 13.5072C4.03776 11.5322 1.74205 9.87627 1.74205 7.22938C1.68778 6.08634 2.08749 4.96819 2.85406 4.11857C3.62063 3.26896 4.69194 2.75676 5.83452 2.6936C6.46746 2.67441 7.09456 2.8198 7.65449 3.11553C8.21443 3.41127 8.68804 3.84724 9.02904 4.38083C9.75922 5.4022 9.88091 5.91333 10.0026 5.91333C10.1243 5.91333 10.2443 5.4022 10.9675 4.37822C11.3065 3.84217 11.7803 3.40447 12.3415 3.10885C12.9027 2.81324 13.5316 2.67005 14.1655 2.6936ZM14.1655 0.955082C13.3761 0.92981 12.5913 1.08293 11.8693 1.40305C11.1473 1.72317 10.5069 2.20204 9.99565 2.80399C9.48485 2.20379 8.84572 1.72603 8.12549 1.40601C7.40525 1.08599 6.62231 0.931884 5.83452 0.955082C4.23063 1.0178 2.71682 1.71306 1.62413 2.88883C0.531439 4.06459 -0.0512286 5.6252 0.00353939 7.22938C0.00353939 10.3674 2.22015 12.2945 4.36286 14.1574C4.60886 14.3712 4.85747 14.5868 5.10434 14.8067L5.99707 15.6047C6.97067 16.5311 7.99138 17.4067 9.05512 18.2281C9.33657 18.4103 9.66471 18.5073 10 18.5073C10.3353 18.5073 10.6634 18.4103 10.9449 18.2281C12.0425 17.3817 13.0946 16.4778 14.0968 15.5204L14.8983 14.8041C15.153 14.5781 15.4111 14.3529 15.6676 14.1313C17.6964 12.371 19.9965 10.3761 19.9965 7.22938C20.0512 5.6252 19.4686 4.06459 18.3759 2.88883C17.2832 1.71306 15.7694 1.0178 14.1655 0.955082Z"
      fill={liked ? "#FF0000" : "#000000"}
    />
  </svg>
);

export const LikedIcon: React.FC<IconProps> = ({ liked }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M14.1681 0.952393C13.3858 0.952393 12.6035 1.03971 11.9082 1.38896C11.1259 1.73821 10.5174 2.17478 9.9959 2.78597C9.47438 2.17478 8.86593 1.73821 8.08364 1.38896C7.38828 1.12702 6.60599 0.952393 5.8237 0.952393C4.25912 1.03971 2.69455 1.73821 1.6515 2.87329C0.608446 4.00836 0 5.58 0 7.23896C0 10.3822 2.25994 12.3031 4.34605 14.224C4.60681 14.3987 4.86757 14.6606 5.12833 14.8352L5.99754 15.621C6.95367 16.5815 7.99672 17.4546 9.03977 18.2405C9.30054 18.4151 9.64822 18.5024 9.9959 18.5024C10.3436 18.5024 10.6913 18.4151 10.952 18.2405C12.082 17.3673 13.1251 16.4942 14.0812 15.5337L14.8635 14.8352C15.1242 14.5733 15.385 14.3987 15.6458 14.1367C17.6449 12.3905 19.9918 10.3822 19.9918 7.23896C20.0787 5.66732 19.4703 4.09568 18.3403 2.87329C17.2973 1.73821 15.7327 1.03971 14.1681 0.952393Z"
      fill="#FF0000"
    />
  </svg>
);




// // LikeIcon.tsx

// import React from "react";

// // Типы пропсов для иконок
// interface IconProps {
//   liked: boolean;
// }

// export const LikeIcon: React.FC<IconProps> = ({ liked }) => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//     <path
//       d="M14.1655 2.6936C15.3081 2.75676 16.3794 3.26896 17.1459 4.11857C17.9125 4.96819 18.3122 6.08634 18.2579 7.22938C18.2579 9.89974 15.9527 11.54 13.7404 13.5072C11.5568 15.4569 10.3807 16.5226 10 16.7686C9.58536 16.5 8.13718 15.184 6.25958 13.5072C4.03776 11.5322 1.74205 9.87627 1.74205 7.22938C1.68778 6.08634 2.08749 4.96819 2.85406 4.11857C3.62063 3.26896 4.69194 2.75676 5.83452 2.6936C6.46746 2.67441 7.09456 2.8198 7.65449 3.11553C8.21443 3.41127 8.68804 3.84724 9.02904 4.38083C9.75922 5.4022 9.88091 5.91333 10.0026 5.91333C10.1243 5.91333 10.2443 5.4022 10.9675 4.37822C11.3065 3.84217 11.7803 3.40447 12.3415 3.10885C12.9027 2.81324 13.5316 2.67005 14.1655 2.6936ZM14.1655 0.955082C13.3761 0.92981 12.5913 1.08293 11.8693 1.40305C11.1473 1.72317 10.5069 2.20204 9.99565 2.80399C9.48485 2.20379 8.84572 1.72603 8.12549 1.40601C7.40525 1.08599 6.62231 0.931884 5.83452 0.955082C4.23063 1.0178 2.71682 1.71306 1.62413 2.88883C0.531439 4.06459 -0.0512286 5.6252 0.00353939 7.22938C0.00353939 10.3674 2.22015 12.2945 4.36286 14.1574C4.60886 14.3712 4.85747 14.5868 5.10434 14.8067L5.99707 15.6047C6.97067 16.5311 7.99138 17.4067 9.05512 18.2281C9.33657 18.4103 9.66471 18.5073 10 18.5073C10.3353 18.5073 10.6634 18.4103 10.9449 18.2281C12.0425 17.3817 13.0946 16.4778 14.0968 15.5204L14.8983 14.8041C15.153 14.5781 15.4111 14.3529 15.6676 14.1313C17.6964 12.371 19.9965 10.3761 19.9965 7.22938C20.0512 5.6252 19.4686 4.06459 18.3759 2.88883C17.2832 1.71306 15.7694 1.0178 14.1655 0.955082Z"
//       fill={liked ? "#FF0000" : "#000000"} // Используем проп liked для изменения цвета
//     />
//   </svg>
// );

// export const LikedIcon: React.FC<IconProps> = ({ liked }) => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//     <path
//       d="M14.1681 0.952393C13.3858 0.952393 12.6035 1.03971 11.9082 1.38896C11.1259 1.73821 10.5174 2.17478 9.9959 2.78597C9.47438 2.17478 8.86593 1.73821 8.08364 1.38896C7.38828 1.12702 6.60599 0.952393 5.8237 0.952393C4.25912 1.03971 2.69455 1.73821 1.6515 2.87329C0.608446 4.00836 0 5.58 0 7.23896C0 10.3822 2.25994 12.3031 4.34605 14.224C4.60681 14.3987 4.86757 14.6606 5.12833 14.8352L5.99754 15.621C6.95367 16.5815 7.99672 17.4546 9.03977 18.2405C9.30054 18.4151 9.64822 18.5024 9.9959 18.5024C10.3436 18.5024 10.6913 18.4151 10.952 18.2405C12.082 17.3673 13.1251 16.4942 14.0812 15.5337L14.8635 14.8352C15.1242 14.5733 15.385 14.3987 15.6458 14.1367C17.6449 12.3905 19.9918 10.3822 19.9918 7.23896C20.0787 5.66732 19.4703 4.09568 18.3403 2.87329C17.2973 1.73821 15.7327 1.03971 14.1681 0.952393Z"
//       fill="#FF0000" // Это всегда будет красный цвет для уже лайкнутой иконки
//     />
//   </svg>
// );




// import React from "react";

// export interface IconProps {
//   liked: boolean;
//   className?: string;
// }

// // Like Icon (не лайкнутое состояние)
// export const LikeIcon = ({ className = "w-6 h-6" }: IconProps) => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//     <path
//       d="M14.1655 2.6936C15.3081 2.75676 16.3794 3.26896 17.1459 4.11857C17.9125 4.96819 18.3122 6.08634 18.2579 7.22938C18.2579 9.89974 15.9527 11.54 13.7404 13.5072C11.5568 15.4569 10.3807 16.5226 10 16.7686C9.58536 16.5 8.13718 15.184 6.25958 13.5072C4.03776 11.5322 1.74205 9.87627 1.74205 7.22938C1.68778 6.08634 2.08749 4.96819 2.85406 4.11857C3.62063 3.26896 4.69194 2.75676 5.83452 2.6936C6.46746 2.67441 7.09456 2.8198 7.65449 3.11553C8.21443 3.41127 8.68804 3.84724 9.02904 4.38083C9.75922 5.4022 9.88091 5.91333 10.0026 5.91333C10.1243 5.91333 10.2443 5.4022 10.9675 4.37822C11.3065 3.84217 11.7803 3.40447 12.3415 3.10885C12.9027 2.81324 13.5316 2.67005 14.1655 2.6936ZM14.1655 0.955082C13.3761 0.92981 12.5913 1.08293 11.8693 1.40305C11.1473 1.72317 10.5069 2.20204 9.99565 2.80399C9.48485 2.20379 8.84573 1.72603 8.12549 1.40601C7.40525 1.08599 6.62231 0.931884 5.83452 0.955082C4.23063 1.0178 2.71682 1.71306 1.62413 2.88883C0.531439 4.06459 -0.0512286 5.6252 0.00353939 7.22938C0.00353939 10.3674 2.22015 12.2945 4.36286 14.1574C4.60886 14.3712 4.85747 14.5868 5.10434 14.8067L5.99707 15.6047C6.97067 16.5311 7.99138 17.4067 9.05512 18.2281C9.33657 18.4103 9.66471 18.5073 10 18.5073C10.3353 18.5073 10.6634 18.4103 10.9449 18.2281C12.0425 17.3817 13.0946 16.4778 14.0968 15.5204L14.8983 14.8041C15.153 14.5781 15.4111 14.3529 15.6676 14.1313C17.6964 12.371 19.9965 10.3761 19.9965 7.22938C20.0512 5.6252 19.4686 4.06459 18.3759 2.88883C17.2832 1.71306 15.7694 1.0178 14.1655 0.955082Z"
//       fill="#262626"
//     />
//   </svg>
// );

// // Liked Icon (лайкнутое состояние)
// export const LikedIcon = ({ className = "w-6 h-6" }: IconProps) => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//   >
//     <path
//       d="M14.1681 0.952393C13.3858 0.952393 12.6035 1.03971 11.9082 1.38896C11.1259 1.73821 10.5174 2.17478 9.9959 2.78597C9.47438 2.17478 8.86593 1.73821 8.08364 1.38896C7.38828 1.12702 6.60599 0.952393 5.8237 0.952393C4.25912 1.03971 2.69455 1.73821 1.6515 2.87329C0.608446 4.00836 0 5.58 0 7.23896C0 10.3822 2.25994 12.3031 4.34605 14.224C4.60681 14.3987 4.86757 14.6606 5.12833 14.8352L5.99754 15.621C6.95367 16.5815 7.99672 17.4546 9.03977 18.2405C9.30054 18.4151 9.64822 18.5024 9.9959 18.5024C10.3436 18.5024 10.6913 18.4151 10.952 18.2405C12.082 17.3673 13.1251 16.4942 14.0812 15.5337L14.8635 14.8352C15.1242 14.5733 15.385 14.3987 15.6458 14.1367C17.6449 12.3905 19.9918 10.3822 19.9918 7.23896C20.0787 5.66732 19.4703 4.09568 18.3403 2.87329C17.2973 1.73821 15.7327 1.03971 14.1681 0.952393Z"
//       fill="#FF0000"
//     />
//   </svg>
// );

// import React from "react";

// // Пропсы для иконки лайка
// interface LikeIconProps {
//   liked: boolean;
//   onClick: () => Promise<void>;
// }

// // Иконка "лайк"
// export const LikeIcon: React.FC<LikeIconProps> = ({ liked, onClick }) => (
//   <svg
//     onClick={onClick}
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//     style={{ cursor: "pointer" }}
//   >
//     <path
//       d="M14.1655 2.6936C15.3081 2.75676 16.3794 3.26896 17.1459 4.11857C17.9125 4.96819 18.3122 6.08634 18.2579 7.22938C18.2579 9.89974 15.9527 11.54 13.7404 13.5072C11.5568 15.4569 10.3807 16.5226 10 16.7686C9.58536 16.5 8.13718 15.184 6.25958 13.5072C4.03776 11.5322 1.74205 9.87627 1.74205 7.22938C1.68778 6.08634 2.08749 4.96819 2.85406 4.11857C3.62063 3.26896 4.69194 2.75676 5.83452 2.6936C6.46746 2.67441 7.09456 2.8198 7.65449 3.11553C8.21443 3.41127 8.68804 3.84724 9.02904 4.38083C9.75922 5.4022 9.88091 5.91333 10.0026 5.91333C10.1243 5.91333 10.2443 5.4022 10.9675 4.37822C11.3065 3.84217 11.7803 3.40447 12.3415 3.10885C12.9027 2.81324 13.5316 2.67005 14.1655 2.6936ZM14.1655 0.955082C13.3761 0.92981 12.5913 1.08293 11.8693 1.40305C11.1473 1.72317 10.5069 2.20204 9.99565 2.80399C9.48485 2.20379 8.84572 1.72603 8.12549 1.40601C7.40525 1.08599 6.62231 0.931884 5.83452 0.955082C4.23063 1.0178 2.71682 1.71306 1.62413 2.88883C0.531439 4.06459 -0.0512286 5.6252 0.00353939 7.22938C0.00353939 10.3674 2.22015 12.2945 4.36286 14.1574C4.60886 14.3712 4.85747 14.5868 5.10434 14.8067L5.99707 15.6047C6.97067 16.5311 7.99138 17.4067 9.05512 18.2281C9.33657 18.4103 9.66471 18.5073 10 18.5073C10.3353 18.5073 10.6634 18.4103 10.9449 18.2281C12.0425 17.3817 13.0946 16.4778 14.0968 15.5204L14.8983 14.8041C15.153 14.5781 15.4111 14.3529 15.6676 14.1313C17.6964 12.371 19.9965 10.3761 19.9965 7.22938C20.0512 5.6252 19.4686 4.06459 18.3759 2.88883C17.2832 1.71306 15.7694 1.0178 14.1655 0.955082Z"
//       fill={liked ? "#ff0000" : "#000000"} // Условие для красного или черного цвета
//     />
//   </svg>
// );

// // Иконка "лайкнуто"
// export const LikedIcon: React.FC<LikeIconProps> = ({ liked, onClick }) => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//   >
//     <path
//       d="M14.1681 0.952393C13.3858 0.952393 12.6035 1.03971 11.9082 1.38896C11.1259 1.73821 10.5174 2.17478 9.9959 2.78597C9.47438 2.17478 8.86593 1.73821 8.08364 1.38896C7.38828 1.12702 6.60599 0.952393 5.8237 0.952393C4.25912 1.03971 2.69455 1.73821 1.6515 2.87329C0.608446 4.00836 0 5.58 0 7.23896C0 10.3822 2.25994 12.3031 4.34605 14.224C4.60681 14.3987 4.86757 14.6606 5.12833 14.8352L5.99754 15.621C6.95367 16.5815 7.99672 17.4546 9.03977 18.2405C9.30054 18.4151 9.64822 18.5024 9.9959 18.5024C10.3436 18.5024 10.6913 18.4151 10.952 18.2405C12.082 17.3673 13.1251 16.4942 14.0812 15.5337L14.8635 14.8352C15.1242 14.5733 15.385 14.3987 15.6458 14.1367C17.6449 12.3905 19.9918 10.3822 19.9918 7.23896C20.0787 5.66732 19.4703 4.09568 18.3403 2.87329C17.2973 1.73821 15.7327 1.03971 14.1681 0.952393Z"
//       fill="#FF0000" // Всегда красный цвет, так как иконка для лайкнутого состояния
//     />
//   </svg>
// );
