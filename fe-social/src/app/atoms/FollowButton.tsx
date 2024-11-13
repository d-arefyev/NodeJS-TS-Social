// FollowButton
"use client";

import { useState } from "react";
import { $api } from "../api/api";

type FollowButtonProps = {
  isFollow: boolean;
  userId: string;
  targetUserId: string;
};

export const FollowButton = ({ isFollow, userId, targetUserId }: FollowButtonProps) => {
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
      className="font-semibold text-color-accent hover:text-color-dark"
      onClick={handleFollow}
    >
      {!follow ? "follow" : "unfollow"}
    </button>
  );
};

export default FollowButton