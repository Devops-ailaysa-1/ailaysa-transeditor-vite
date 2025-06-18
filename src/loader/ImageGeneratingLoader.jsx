import React from 'react';
import loaderSparkles from "./loader-sparkles.json";
// import Lottie from 'react-lottie';
import { useLottie } from "lottie-react";

export const ImageGeneratingLoader = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderSparkles,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };
    const { View } = useLottie(defaultOptions);

  return (
    <>
      { View }
    </>
  )
}
