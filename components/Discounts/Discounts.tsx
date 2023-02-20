"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import ProductCard from "@/components/ProductCard/ProductCard";
export default function Discounts({ data }: any) {
  const splideOptions = {
    perPage: 6,
    perMove: 1,
    type: "loop",
    rewind: false,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: false,
    arrows: false,
    drag: true,
    lazyLoad: "nearby",
    keyboard: "global",
    pagination: false,
    padding: "1rem",
    breakpoints: {
      1200: { perPage: 3 },
      991: { perPage: 2 },
      768: { perPage: 2 },
      500: { perPage: 1 },
      425: { perPage: 1 },
    },
  };
  return (
    <div className="flex flex-col mt-4 flex-wrap justify-center items-start w-full h-full">
      <h1 className="text-4xl font-bold text-red-700">More Then 50% Off 😍</h1>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-row justify-center items-center w-full h-full">
          <Splide options={splideOptions as any} className="w-full h-full ">
            {data.map((item: any = {}, i: number) => (
              <SplideSlide key={i} className="mb-0.5  p-4 ">
                <ProductCard item={item} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}
