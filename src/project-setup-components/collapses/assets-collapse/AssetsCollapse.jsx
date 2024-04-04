import { Link } from "react-router-dom";
import React from "react";
import Glossaries from "./Glossaries"
import TranslationMemories from "./TranslationMemories"
import Stylers from "./Stylers"

const DevelopCollapse = () => {
    return (
        <React.Fragment>
            <div className="ai-subtask-glb-wrapper">
                <Glossaries />
                {/* <TranslationMemories />
                <Stylers /> */}
            </div>

        </React.Fragment>
    );
};

export default DevelopCollapse;