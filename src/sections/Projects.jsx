import React, {useRef, useState,useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function Project({ title = "", img = "", link = "" }) {
  return (
    <div
      className="keen-slider__slide flex justify-center"
      style={{ overflow: "visible" }}
    >
      <div
        className="w-[300px] backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl
        shadow-lg transition-transform duration-300 transform-gpu hover:scale-105 hover:z-30 z-10
        px-3 pt-3 pb-6 rounded-br-none"
      >
        <h3 className="text-white text-lg mb-4">{title}</h3>
        <hr className="w-full border-t border-white/20 mb-10" />

        <div className="relative mt-8 -mb-6 -mx-3">
          <div className="absolute inset-0 -translate-y-6 scale-[0.92] rounded-3xl
            bg-white/10 backdrop-blur-md border border-white/10 z-0 shadow-md" />
          <div className="absolute inset-0 -translate-y-3 scale-[0.96] rounded-3xl
            bg-white/15 backdrop-blur-md border border-white/10 z-0 shadow-md" />

          <img
            src={img}
            alt={title}
            className="relative z-10 w-full rounded-3xl object-cover shadow-xl rounded-br-none"
          />

          <div className="absolute bottom-1 right-1 bg-neutral-900 rounded-full p-3 shadow-lg z-20">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <FaArrowRight className="text-white w-4 h-4 -rotate-45 transition hover:scale-125" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {

    const animation = { duration: 1000, easing: (t) => t };

    const [sliderRef,slider] = useKeenSlider({
        loop: true,
        renderMode: "performance",
        slides: {
        perView: 4,
        spacing: 15,
        },
        dragSpeed: 0.5,
        created(s) {
            setTimeout(() => {
                s.moveToIdx(s.track.details.abs + 1, true, animation);
            }, 3000);
        },
        animationEnded(s) {
            setTimeout(() => {
              s.moveToIdx(s.track.details.abs + 1, true, animation);
            }, 3000);
        },
    });

    const intervalRef = useRef(null);

    const [sliderInstance, setSliderInstance] = useKeenSlider({
      loop: true,
      slides: { perView: 4, spacing: 15 },
    });
    
    const projects = [
        { title: "Projeto 1", img: "src/imgs/breakfast_timeseries.png", link: "#" },
        { title: "Projeto 2", img: "src/imgs/breakfast_timeseries.png", link: "#" },
        { title: "Projeto 3", img: "src/imgs/breakfast_timeseries.png", link: "#" },
        { title: "Projeto 4", img: "src/imgs/breakfast_timeseries.png", link: "#" },
        { title: "Projeto 5", img: "src/imgs/breakfast_timeseries.png", link: "#" },
        { title: "Projeto 6", img: "src/imgs/breakfast_timeseries.png", link: "#" },
    ];


    return (
        <div className="w-full py-24 bg-[url('./imgs/bg-texture.png')] overflow-x-hidden bg-cover bg-center">
        <div className="-mt-10 ml-[20px]">
            <h1 className="text-5xl whitespace-nowrap text-white font-medium leading right text-gray-900 font-inter">
            My <span className="text-mainPurple font-semibold">Projects</span>
            </h1>

            <div
            ref={sliderRef}
            className="keen-slider mt-12"
            style={{ overflow: "visible" }}
            >
            {projects.map((proj, i) => (
                <Project key={i} title={proj.title} img={proj.img} link={proj.link} />
            ))}
            </div>
        </div>
        </div>
    );
}