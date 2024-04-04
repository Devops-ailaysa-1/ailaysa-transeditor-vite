import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
import ExpandMoreIcon from "../../../assets/images/new-ui-icons/expand_more.svg"

const TranslationMemories = () => {
    const [filesCollapse, setFilesCollapse] = useState(false);

    const handleFilesCollapser = () => {
        setFilesCollapse(!filesCollapse);
    };

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap">
                <div className="header" onClick={handleFilesCollapser}>
                    <span className="title">Translation Memories</span>
                    <span className={filesCollapse ? "img" : "img-rotate"}><img src={ExpandMoreIcon} alt="expand-more"/></span>
                </div>
                <Collapse isOpen={filesCollapse}>
                    <ul className="ai-subtask-link-list">
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/assets/translation-memories/create">
                                Create
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/assets/translation-memories/view-list">
                                View List
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink activeClassName="active" to="/project-setup/assets/translation-memories/web-forms">
                                Web Forms
                            </NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/text/generate-marketing-copies">
                                Generate Marketing Copies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/text/build-your-company-profile">
                                Build your company profile
                            </NavLink>
                        </li> */}
                    </ul>
                </Collapse>
            </div>
        
        </React.Fragment>
    );
};

export default TranslationMemories;