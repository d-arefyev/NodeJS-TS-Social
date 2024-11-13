"use client";

import PostsList from "../molecules/PostsList";
import NoMoreUpdates from "../atoms/NoMoreUpdates";

export const HomePage = () => {
  return (
    <div className="globalContainer flex flex-col items-center pt-[60px]">
      <PostsList />
      <NoMoreUpdates />
    </div>
  );
};

export default HomePage;
