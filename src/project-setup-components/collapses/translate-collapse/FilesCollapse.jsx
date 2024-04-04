import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams, useNavigate} from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
import { useTranslation } from "react-i18next";
import TranslateFileMenu from "../../../assets/images/new-create-hub/translate-files-menu.svg"

const FilesCollapse = (props) => {
    const { t } = useTranslation();
    const history = useNavigate();
    const { category, menu, action } = useParams();
    const [filesCollapse, setFilesCollapse] = useState(false);

    // useEffect(() => {
    //     if (category === "translate" && menu === "files" && action === "translate-files") {
    //         setFilesCollapse(true);
    //     } else {
    //         setFilesCollapse(false);
    //     }
    // }, [props.selectedMenu]);

    useEffect(() => {
        let pathname = window.location.pathname;
        if(pathname?.includes("translate/files")){
            setFilesCollapse(true);
        } else {
            setFilesCollapse(false);
        }
    }, [window.location.pathname])

    const handleFilesCollapser = () => {
        setFilesCollapse(!filesCollapse);
    };

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap">
                <div className={"header no-collapse-header " + (filesCollapse ? "active" : "")} onClick={()=> {handleFilesCollapser(); history("/create/translate/files/translate-files")}}>
                    {/* <NavLink activeClassName="active" className="title" to="/create/translate/files/translate-files">
                        {t("files")}
                    </NavLink> */}
                    <div className="icon-wrap">
                        <span className="icon"><img src={TranslateFileMenu} /></span>
                        <span className="title">Translate files</span>
                    </div>
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

export default FilesCollapse;
