import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Fileupload from "../../vendor/Fileupload";
import SpeechToText from "../speech-component/SpeechToText";
import TextToSpeech from "../speech-component/TextToSpeech";

const SpeechModule = (props) => {
    const {
        setSidebarActiveTab={setSidebarActiveTab}
    } = props;
    const params = useParams();

    if (!params?.category && !params?.menu) {
        <Navigate to="speech/speech-to-text" />;
    }

    if (params?.menu === "speech-to-text") {
        return <SpeechToText
        setSidebarActiveTab={setSidebarActiveTab}  />;
    } else if (params?.menu === "text-to-speech") {
        return <TextToSpeech
        setSidebarActiveTab={setSidebarActiveTab}
         />;
    } 
};

export default SpeechModule;
