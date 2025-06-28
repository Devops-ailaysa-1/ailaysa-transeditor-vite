import React from 'react';
import SandClockAnime from "./loader-sand-clock.json";
// import Lottie from 'react-lottie';
import { useLottie } from "lottie-react";

export const SandClockLoader = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SandClockAnime,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };
    const { View } = useLottie(defaultOptions);
  return (
    <div className='sand-clock-loader-wrap'>
      { View }
    </div>
  )
}
