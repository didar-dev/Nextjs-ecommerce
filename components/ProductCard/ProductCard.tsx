"use client";

import React from "react";
import "swiper/swiper.min.css";

export default function ProductCard({ item }: any) {
  return (
    <div
      className={`  h-60 w-60
      flex flex-col justify-center items-center
      bg-gray-200
      rounded-md shadow-md
      m-2 p-2
      `}
      style={{
        backgroundImage: `url(${item.Thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {item.Thumbnail}
    </div>
  );
}
