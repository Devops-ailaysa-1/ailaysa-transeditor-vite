import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";

const TextCollapse = () => {
    const [textCollapse, setTextCollapse] = useState(false);

    const handleTextCollapser = () => {
        setTextCollapse(!textCollapse);
    };

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap">
                <div className="header no-collapse-header">
                    <NavLink activeClassName="active" className="title" to="/create/translate/integrations">
                        Integrations
                    </NavLink>
                    {/* <span className={textCollapse ? "img" : "img-rotate"}><img src={Config.HOST_URL+"assets/images/new-ui-icons/expand_more.svg"} alt="expand-more"/></span> */}
                </div>
                {/* <Collapse isOpen={textCollapse}>
                    <ul className="ai-subtask-link-list">
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/text/instant-text-translation">
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

export default TextCollapse;