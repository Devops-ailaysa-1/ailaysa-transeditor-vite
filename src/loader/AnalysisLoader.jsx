import React from 'react';
import AnalysisAnime from "./analysis_loader.json";
// import Lottie from 'react-lottie';
import { useLottie } from "lottie-react";

export const AnalysisLoader = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: AnalysisAnime,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };
    const { View } = useLottie(defaultOptions);

  return (
      <div className="analysis-loader-mapper">
        { View }
      </div>
  )
}
