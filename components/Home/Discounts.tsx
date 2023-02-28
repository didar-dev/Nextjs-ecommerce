"use client";
import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
export default function Discounts({ data }: any) {
  return (
    <>
      {data.length > 0 && (
        <div className="flex flex-col mt-4 flex-wrap justify-center items-start w-full h-full">
          <h1 className="text-4xl font-bold text-red-700">
            More Then 50% Off 😍
          </h1>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-row justify-center items-center w-full h-full"></div>
          </div>
        </div>
      )}
    </>
  );
}
