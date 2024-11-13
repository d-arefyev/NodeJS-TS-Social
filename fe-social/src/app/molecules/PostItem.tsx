// PostItem.tsx

"use client";
import Image from "next/image";
import Like from "../atoms/Like";
import CommentIcon from "../atoms/CommentIcon";
import parseData from "../helpers/parseData";
import FollowButton from "../atoms/FollowButton";

type PostItemProps = {
  item: {
    _id: string;
    caption: string;
    created_at: string;
    image_url: string;
    profile_image: string;
    user_name: string;
    user_id: string;
    likes_count?: number;
    comments_count?: number;
    last_comment?: string;
  };
  isFollow: boolean;
  likesCount: number;
  setLikesCount: (postId: string, newCount: number) => void;
};

const PostItem = ({ item, isFollow, likesCount, setLikesCount }: PostItemProps) => {
  const handleLike = () => {
    const newLikesCount = likesCount + 1;
    setLikesCount(item._id, newLikesCount);
  };

  return (
    <li className="flex flex-col max-h-[720px] text-[12px] pb-[40px] border-b-[1px] border-b-color-gray">
      <div className="flex items-center py-[6px]">
        <div className="relative w-[36px] h-[36px]">
          <Image
            src="/ava-frame.png"
            alt="Avatar frame"
            width={36}
            height={36}
            className="w-full h-full"
          />
          <Image
            src={item.profile_image || "/default-avatar.png"}
            alt="avatar"
            width={1}
            height={1}
            className="absolute inset-0 w-[26px] h-[26px] m-auto border bg-color-gray rounded-full"
          />
        </div>
        <div className="flex gap-[6px] ml-[6px]">
          <span className="font-semibold text-[12px] ">{item.user_name}</span>
          <span className="text-color-dark-gray text-[12px]">
            &#8226; {parseData(item.created_at)} &#8226;
          </span>
          <FollowButton
            isFollow={isFollow}
            userId={localStorage.getItem("userId") || ""}
            targetUserId={item.user_id}
          />
        </div>
      </div>
      <Image
        src={item.image_url}
        alt="Post Image"
        width={403}
        height={505}
        className="w-full min-h-[505px] object-cover rounded-[4px]"
      />
      <div className="flex flex-col my-[10px] gap-[8px]">
        <div className="flex items-center gap-[14px]">
          <Like postId={item._id} userId={item.user_id} onLikesCountChange={handleLike} />
          <CommentIcon postId={item._id} />
        </div>
        <span>{likesCount} likes</span>
        <span>
          <span className="font-semibold italic">{item.user_name}</span>: {item.caption}
        </span>
      </div>
      <div className="flex flex-col ap-[14px]">
        <span>{item.last_comment || "Last comment"}</span>
        <span className="text-color-dark-gray">
          View all comments ({item.comments_count})
        </span>
      </div>
    </li>
  );
};

export default PostItem;