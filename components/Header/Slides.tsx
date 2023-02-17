"use client";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import { EffectFade, Autoplay, Pagination, Navigation } from "swiper";

export default function Slides({ data }: any) {
  return (
    <div className="h-1/6 w-full flex justify-center items-center">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect={"slide"}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "0 0 10px 10px",
        }}
      >
        {data?.map((slide: any) => (
          <SwiperSlide
            key={slide.id}
            style={{
              background: " url(" + slide.Image + ")",
              backgroundPosition: "center center",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#000",
              width: "100%",
              maxWidth: "none",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div
              dir="ltr"
              style={{
                width: "100%",
                height: "100%",
                backgroundImage:
                  "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,) 100%)",
              }}
            >
              <p
                key={slide.id + 1}
                className={
                  "text-white font-bold absolute top-2 left-2 p-2 rounded-md pt-3 px-4 text-2xl "
                }
              >
                {slide.Title}
              </p>

              <p
                key={slide.id}
                className={
                  "text-white absolute top-12 left-2 p-2 rounded-md pt-3 px-4 text-xl"
                }
              >
                {slide.Subtitle}
              </p>
              <br />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
