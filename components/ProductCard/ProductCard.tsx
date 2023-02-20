"use client";

import React from "react";
import "swiper/swiper.min.css";

export default function ProductCard({ item }: any) {
  return (
    <div
      className="h-60 w-60  bg-white 
      flex flex-col justify-center items-center
      rounded-md shadow-lg border border-gray-200 border-opacity-50"
    >
      <div
        className={`h-full w-full `}
        style={{
          backgroundImage: `url(${item.Thumbnail})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        dw
      </div>
    </div>
  );
}
