import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
import { useTranslation } from "react-i18next";

const TextToSpeechCollapse = (props) => {
    const { t } = useTranslation();
    const { category, menu, action } = useParams();
    const [textCollapse, setTextCollapse] = useState();

    useEffect(() => {
        if (category === "speech" && menu === "text-to-speech") {
            setTextCollapse(true);
        } else {
            setTextCollapse(false);
        }
    }, []);

    const handleTextCollapser = () => {
        setTextCollapse(!textCollapse);
    };

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap">
                <div className="header no-collapse-header">
                    <NavLink activeClassName="active" className="title" to="/create/speech/text-to-speech">
                        {t("text_to_speech")}
                    </NavLink>
                    {/* <span className="title">Text</span>
                    <span className={textCollapse ? "img" : "img-rotate"}>
                        <img src={Config.HOST_URL + "assets/images/new-ui-icons/expand_more.svg"} alt="expand-more" />
                    </span> */}
                </div>
                {/* <Collapse isOpen={textCollapse}>
                    <ul className="ai-subtask-link-list">
                        <li>
                            <NavLink activeClassName="active" to="/create/translate/text/instant-text-translation">
                                Instant text translate
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/text/create-word-document">
                                Create word document
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/text/upload-word-files-or-google-docs">
                                Upload Word files or Google Docs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/text/generate-marketing-copies">
                                Generate Marketing Copies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/text/build-your-company-profile">
                                Build your company profile
                            </NavLink>
                        </li>
                    </ul>
                </Collapse> */}
            </div>
        </React.Fragment>
    );
};

export default TextToSpeechCollapse;
