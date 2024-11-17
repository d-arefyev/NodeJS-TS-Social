
"use client";

import { useState } from "react";
import { $api } from "../api/api";

type FollowButtonProps = {
  isFollow: boolean;
  userId: string;
  targetUserId: string;
  className?: string;
};

export const FollowButton = ({
  isFollow,
  userId,
  targetUserId,
  className = "",
}: FollowButtonProps) => {
  const [follow, setFollow] = useState(isFollow);

  const handleFollow = () => {
    if (!follow) {
      $api.post(`/follow/${userId}/follow/${targetUserId}`);
      setFollow(true);
    } else {
      $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
      setFollow(false);
    }
  };

  return (
    <button
    className={`${className}`}
      onClick={handleFollow}
    >
      {!follow ? "Follow" : "Unfollow"}
    </button>
  );
};

export default FollowButton;
