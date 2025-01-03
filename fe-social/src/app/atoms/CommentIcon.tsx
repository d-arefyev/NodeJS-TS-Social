import Link from "next/link";

// Объявление типа пропсов для CommentIcon
interface CommentIconProps {
  postId: string; // Тип для postId
}

const CommentIcon: React.FC<CommentIconProps> = ({ postId }) => {
  return (
    <Link href={`/comments/${postId}`} className="hover:text-color-dark">
      <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
        <path
          d="M18.2441 14.9222C19.2907 13.1118 19.6424 10.9823 19.2336 8.93148C18.8247 6.88068 17.6832 5.04887 16.0223 3.77826C14.3614 2.50765 12.2948 1.88515 10.2085 2.02705C8.12212 2.16895 6.1588 3.06555 4.68527 4.54934C3.21174 6.03314 2.32879 8.00264 2.20137 10.0899C2.07395 12.1772 2.71077 14.2395 3.99288 15.8915C5.27498 17.5435 7.11467 18.6722 9.16825 19.0669C11.2218 19.4615 13.3489 19.095 15.152 18.0358L19.4017 19.2219L18.2441 14.9222Z"
          stroke="black"
          strokeWidth="1.72264"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};

export default CommentIcon;
