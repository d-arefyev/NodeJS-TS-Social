import Image from "next/image";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex gap-[40px] py-20 ml-[345px] pr-[15px]">
      <div>
        <Image
          src="/login-pict.png"
          alt="Main picture"
          width={300}
          height={460}
          className="w-[300px] object-cover h-full"
          priority
        />
      </div>
      <div className="pt-[65px]">
        <h1 className="text-[36px] font-bold">Oops! Page Not Found (404 Error)</h1>
        <p className="font-semibold text-color-dark-gray leading-[20px] pt-[20px] max-w-[475px]">
          We're sorry, but the page you're looking for doesn't seem to exist. If you typed the URL
          manually, please double-check the spelling. If you clicked on a link, it may be outdated
          or broken.
        </p>
      </div>
    </div>
  );
}