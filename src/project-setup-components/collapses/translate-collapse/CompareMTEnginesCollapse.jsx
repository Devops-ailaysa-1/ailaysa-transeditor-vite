import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";

const CompareMTEnginesCollapse = (props) => {
    const { category, menu, action } = useParams();
    const [filesCollapse, setFilesCollapse] = useState();

    useEffect(() => {
        if (category === "speech" && menu === "speech-to-text") {
            setFilesCollapse(true);
        } else {
            setFilesCollapse(false);
        }
    }, [props.selectedMenu]);

    const handleFilesCollapser = () => {
        setFilesCollapse(!filesCollapse);
    };

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap">
                <div className="header no-collapse-header">
                    <NavLink activeClassName="active" className="title" to="/create/translate/compare-mt-engines">
                        Compare MT engines
                    </NavLink>
                    {/* <span className="title">Files</span> */}
                    {/* <span className={filesCollapse ? "img" : "img-rotate"}>
                        <img src={Config.HOST_URL + "assets/images/new-ui-icons/expand_more.svg"} alt="expand-more" />
                    </span> */}
                </div>
                {/* <Collapse isOpen={filesCollapse}>
                    <ul className="ai-subtask-link-list">
                        <li>
                            <NavLink activeClassName="active" to="/create/translate/files/translate-files">
                                Translate Files
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/files/create-word-document">
                                Create word document
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/files/upload-word-files-or-google-docs">
                                Upload Word files or Google Docs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/files/generate-marketing-copies">
                                Generate Marketing Copies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/project-setup/translate/files/build-your-company-profile">
                                Build your company profile
                            </NavLink>
                        </li>
                    </ul>
                </Collapse> */}
            </div>
        </React.Fragment>
    );
};

export default CompareMTEnginesCollapse;
