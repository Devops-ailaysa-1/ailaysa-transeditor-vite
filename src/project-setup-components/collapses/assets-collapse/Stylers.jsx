import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
import ExpansMoreIcon from "../../../assets/images/new-ui-icons/expand_more.svg";

const Stylers = () => {
    const [filesCollapse, setFilesCollapse] = useState(false);

    const handleFilesCollapser = () => {
        setFilesCollapse(!filesCollapse);
    };

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap">
                <div className="header" onClick={handleFilesCollapser}>
                    <span className="title">Stylers</span>
                    <span className={filesCollapse ? "img" : "img-rotate"}><img src={ExpansMoreIcon} alt="expand-more"/></span>
                </div>
                <Collapse isOpen={filesCollapse}>
                    <ul className="ai-subtask-link-list">
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/assets/stylers/create">
                                Create
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/assets/stylers/view-list">
                                View List
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink activeClassName="active" to="/project-setup/develop/multilingual-websites/web-forms">
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

export default Stylers;