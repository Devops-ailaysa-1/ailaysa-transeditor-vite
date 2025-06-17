import React from 'react';
import MessageTypingAnime from "./message-loader.json";
// import Lottie from 'react-lottie';
import { useLottie } from "lottie-react";

export const MessageTypingAnimation = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: MessageTypingAnime,
        // rendererSettings: {
        // preserveAspectRatio: "xMidYMid slice",
        // },
    };
    const { View } = useLottie(defaultOptions);

  return (
    <>
      { View }
    </>
  )
}
