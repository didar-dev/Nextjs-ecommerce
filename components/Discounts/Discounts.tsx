"use client";
import React, { useRef, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
export default function Discounts({ data }: any) {
  return (
    <div className="grid mt-3 grid-cols-1 md:grid-cols-3 h-fullbg-white w-full">
      <div
        className=" w-full flex justify-center items-center
     bg-red-100 rounded-l-md   md:h-full h-40 rounded-lg"
      >
        <h1 className="text-4xl  font-bold text-red-700">
          More Then 50% Off 😍
        </h1>
      </div>
      <div className="col-span-2 h-full w-full flex justify-center items-center ">
        <div className="flex-row flex-wrap flex justify-center items-center">
          {data.map((item: any) => (
            <ProductCard item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
