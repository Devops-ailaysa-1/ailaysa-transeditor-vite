import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import SpeechToTextCollapse from "./SpeechToTextCollapse";
import TextToSpeechCollapse from "./TextToSpeechCollapse";

const SpeechCollapse = () => {
    return (
        <React.Fragment>
            <div className="ai-subtask-glb-wrapper">
                <SpeechToTextCollapse />
                <TextToSpeechCollapse />
            </div>
        </React.Fragment>
    );
};

export default SpeechCollapse;
