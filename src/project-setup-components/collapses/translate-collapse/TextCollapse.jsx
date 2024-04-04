import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams, useNavigate} from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
import { useTranslation } from "react-i18next";
import InstantTranslateIcon from "../../../assets/images/new-create-hub/instant-translate-menu.svg"

const TextCollapse = (props) => {
    const { t } = useTranslation();
    const history = useNavigate();
    const { category, menu, action } = useParams();
    const [textCollapse, setTextCollapse] = useState(false);     // by default open the text collapse

    // useEffect(() => {
    //     if (menu === "text" && action === "instant-text") {
    //         setTextCollapse(true);
    //     } else {
    //         setTextCollapse(false);
    //     }
    // }, []);

    const handleTextCollapser = () => {
        setTextCollapse(!textCollapse);
    };

    useEffect(() => {
        let pathname = window.location.pathname;
        if(pathname?.includes("texts-and-documents") || pathname?.includes("translate/text")){
            setTextCollapse(true);
        }else{
            setTextCollapse(false);
        }
    }, [window.location.pathname])

    useEffect(() => {
        let pathname = window.location.search;
        // console.log(window.location.pathname)
        // console.log(Config.userState?.internal_member_team_detail?.role === 'Editor')
        if(Config.userState?.internal_member_team_detail?.role === 'Editor'){
            if(!pathname?.includes("task")){
                history("/file-upload")
            }
        }
    }, [window.location])

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap">
                <div className={"header no-collapse-header " + (textCollapse ? "active" : "")} onClick={() => {handleTextCollapser(); history("/create/translate/text/instant-text")}}>
                    {/* <NavLink activeClassName="active" className="title" to="/create/translate/text/instant-text-translation">
                        Text
                    </NavLink> */}
                    <div className="icon-wrap">
                        <span className="icon"><img src={InstantTranslateIcon} /></span>
                        <span className="title">{t("instant_text")}</span>
                    </div>
                    {/* <span className={textCollapse ? "img" : "img-rotate"}>
                        <img src={Config.HOST_URL + "assets/images/new-ui-icons/expand_more.svg"} alt="expand-more" />
                    </span> */}
                </div>
                {/* <Collapse className={Config.userState?.internal_member_team_detail?.role === 'Editor' && "context-menu"} isOpen={textCollapse}>
                    <ul className="ai-subtask-link-list">
                        <li>
                            <NavLink activeClassName="active" to="/create/translate/text/instant-text">
                                {t("instant_text")}
                            </NavLink>
                        </li>
                        {
                            Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                            <li>
                                <NavLink activeClassName="active" to="/create/translate/text/standard-text">
                                    {t("standard_text")}
                                </NavLink>
                            </li>
                        }
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
