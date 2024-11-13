import React from 'react'
import Image from "next/image";

const NoMoreUpdates = () => {
  return (
    <div >
      <div className="flex flex-col w-[404px] h-[216px] justify-center items-center">
        <Image
          src="/post-check.png"
          alt="Check updates"
          width={82}
          height={82}
          className="flex justify-center items-center"
          priority
        />
        <span className="mt-[10px]">You've seen all the updates</span>
        <span className="text-[12px] text-color-dark-gray">
          You have viewed all new publications
        </span>
      </div>
    </div>
  )
}

export default NoMoreUpdates
