import React, { useState, useEffect, useRef } from "react";
import { TabContent, TabPane, Nav, NavItem } from "reactstrap";
import { Link, useNavigate, useParams, NavLink} from "react-router-dom";
// import classnames from "classnames";
import Config from "../vendor/Config";
// import TranslateModule from "./sidebar-switch/TranslateModule";
import TranslateCollapse from "./collapses/translate-collapse/TranslateCollapse";
// import WriteModules from "./collapses/write-collapse/WriteCollapse";
// import LocalizeModules from "./collapses/localize-collapse/LocalizeCollapse";
// import DesignModules from "./collapses/design-collapse/DesignCollapse";
// import AnalyseModules from "./collapses/analyse-collapse/AnalyseCollapse";
// import DevelopCollapse from "./collapses/develop-collapse/DevelopCollapse";
import AssetsCollapse from "./collapses/assets-collapse/AssetsCollapse";
// import SpeechCollapse from "./collapses/speech-collapse/SpeechCollapse";
import ToolkitCollapse from "./collapses/tool-kit-collapse/ToolkitCollapse";
import { useTranslation } from "react-i18next";
import WriteCollapse from "./collapses/write-collapse/WriteCollapse";
// import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import { Collapse } from "reactstrap";
import SpeechesMenu from "../assets/images/new-create-hub/speeches-menu.svg"

const SideBar = (props) => {
    
    const {
        setSidebarActiveTab,
        sidebarActiveTab
    } = props

    const history = useNavigate();
    const { t } = useTranslation();
    const { category, menu, action } = useParams();

    const [showSidebarCategory, setShowSidebarCategory] = useState(true);
    const [speechCollapse, setSpeechCollapse] = useState(false);
    const [commonCollapse, setCommonCollapse] = useState(false);

    const handleFilesCollapser = () => {
        setSpeechCollapse(!speechCollapse);
    };

    useEffect(() => {
        if (category === "translate" && menu === "files" && action === "translate-files") {
            activeSidebarToggle(2);
        } else if (category === "speech" && menu === "speech-to-text") {
            activeSidebarToggle(3);
        } else if (category === "tool-kit" && menu === "pdf" && action === "convert-pdf") {
            activeSidebarToggle(4);
        } else if (category === "assets" && menu === "glossaries" && action === "view-list") {
            activeSidebarToggle(8);
            setShowSidebarCategory(false)
        }
    }, []);

    useEffect(() => {
        if (window.location.pathname.includes("translate")) {
            setSidebarActiveTab(2)
        } else if (window.location.pathname.includes("speech")) {
            setSidebarActiveTab(3)
        } else if (window.location.pathname.includes("tool-kit")) {
            setSidebarActiveTab(4)
        } else if (window.location.pathname.includes("assets")) {
            setSidebarActiveTab(8)
            setShowSidebarCategory(false)
        }
        else{
            setShowSidebarCategory(true)
        }
    }, [window.location.pathname]);


    useEffect(() => {
        let pathname = window.location.pathname;
        if(pathname?.includes("speech") || pathname?.includes("speech")){
            setSpeechCollapse(true);
        } else {
            setSpeechCollapse(false);
        }
    }, [window.location.pathname])

    useEffect(() => {
        let pathname = window.location.pathname;
        if((pathname === "/create/all-templates")){
            setCommonCollapse(true);
        } else if((pathname === "/create/all-templates/speech") || (pathname === "/create/all-templates/writing") || (pathname === "/create/all-templates/tool-kit")) {
            setCommonCollapse(false);
        }
    }, [window.location.pathname])

    /* Set tab change if clicked only other tabs */
    const activeSidebarToggle = (tab) => {
        if (sidebarActiveTab != tab) {
            setSidebarActiveTab(tab);
        }
    };

    return (
        <React.Fragment>
            {/* <Nav tabs className="side-bar-tab-glb-wrapper">
                {
                    showSidebarCategory &&
                    <>
                        <NavItem
                            className={
                                "side-bar-tab-box " +
                                classnames({ active: sidebarActiveTab == 1 })
                            }
                            onClick={() => {
                                activeSidebarToggle(1);
                                history("/create/write/editor");
                            }}
                        >
                            <NavLink>
                                <img src={Config.HOST_URL + "assets/images/new-project-setup/sidebar-edit_note.svg"} alt="sidebar-home" />
                                <p>Write</p>
                            </NavLink>
                        </NavItem>
                        <NavItem
                            className={
                                    "side-bar-tab-box " + 
                                    classnames({ active: sidebarActiveTab == 2 }) +
                                    (Config.userState?.internal_member_team_detail?.role === 'Editor' ? " context-menu" : " ")
                                }
                            onClick={() => {
                                activeSidebarToggle(2);
                                history("/create/translate/files/translate-files");
                            }}
                        >
                            <NavLink>
                                <img src={Config.HOST_URL + "assets/images/new-project-setup/sidebar-translate.svg"} alt="sidebar-home" />
                                <p>{t("translate")}</p>
                            </NavLink>
                        </NavItem>
                        {
                            Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                            <>
                                <NavItem
                                    className={
                                        "side-bar-tab-box " +
                                        classnames({ active: sidebarActiveTab == 3 })
                                    }
                                    onClick={() => {
                                        activeSidebarToggle(3);
                                        history("/create/speech/speech-to-text");
                                    }}
                                >
                                    <NavLink>
                                        <img src={Config.HOST_URL + "assets/images/new-project-setup/speech-icon-new.svg"} alt="sidebar-speech" />
                                        <p>{t("speech")}</p>
                                    </NavLink>
                                </NavItem>
                                <NavItem
                                    className={
                                        "side-bar-tab-box " +
                                        classnames({ active: sidebarActiveTab == 4 })
                                    }
                                    onClick={() => {
                                        activeSidebarToggle(4);
                                        history("/create/tool-kit/pdf/convert-pdf");
                                    }}
                                >
                                    <NavLink>
                                        <img src={Config.HOST_URL + "assets/images/convert-icon.svg"} alt="sidebar-speech" />
                                        <p>{t("tool_kit")}</p>
                                    </NavLink>
                                </NavItem>
                            </>
                        }
                    </>
                }
                {
                    (sidebarActiveTab == 8 && !showSidebarCategory) &&
                    <NavItem
                        className={
                            "side-bar-tab-box " + 
                            classnames({ active: sidebarActiveTab == 8 }) 
                            // + (sidebarActiveTab == 2 ? "add-bor-rad-after" : "")
                        }
                        onClick={() => {
                            activeSidebarToggle(8);
                            history("/create/assets/glossaries/my-glossaries?page=1");
                        }}
                    >
                        <NavLink>
                            <img src={Config.HOST_URL + "assets/images/new-project-setup/sidebar-description.svg"} alt="sidebar-home" />
                            <p>{t("assets")}</p>
                        </NavLink>
                    </NavItem>
                }
                <NavItem className="side-bar-tab-box new-add-height"></NavItem>
            </Nav> */}
            {/* <TabContent className="sidebar-active-area-wrapper" activeTab={sidebarActiveTab}>
                <TabPane tabId={1}>
                    <WriteCollapse />
                </TabPane>
                <TabPane tabId={2}>
                    <TranslateCollapse />
                </TabPane>
                <TabPane tabId={3}>
                    <SpeechCollapse />
                </TabPane>
                <TabPane tabId={4}>
                    <ToolkitCollapse />
                </TabPane>
                <TabPane tabId={5}>
                    <DesignModules />
                </TabPane>
                <TabPane tabId={6}>
                    <AnalyseModules />
                </TabPane>
                <TabPane tabId={7}>
                    <DevelopCollapse />
                </TabPane>
                <TabPane tabId={8}>
                    <AssetsCollapse />
                </TabPane>
            </TabContent> */}
            <div className="project-setup-creation-wrapper">
                {
                    !showSidebarCategory ?

                    <Nav className="project-link-list">
                        <NavItem className="projects-link">
                            <AssetsCollapse />
                        </NavItem>
                    </Nav>

                    :
                    
                    <Nav className="project-link-list">
                            {/* <li><NavLink className="projects-link" to="/">
                                <span></span>
                                Home
                            </NavLink></li> */}
                            {/* <NavItem className="projects-link" onClick={() => {history("/create/my-files");}}>
                                <div className={"project-link-wrap " + ((window.location.pathname?.includes("/create/my-files") && "active"))}>
                                    <span>
                                        <FolderOutlinedIcon className="projects-link-icon"/>
                                    </span>
                                    My files
                                </div>
                            </NavItem> */}
                            <NavItem className="projects-link" onClick={() => {history("/create/all-templates");}} >
                                <div className={"project-link-wrap " + ((window.location.pathname === "/create/all-templates") ? "active" : "")}>
                                    <span>
                                        <DashboardOutlinedIcon className="projects-link-icon" />
                                    </span>
                                    All templates
                                </div>
                            </NavItem>
                            <NavItem className="projects-link">
                                <TranslateCollapse />
                            </NavItem>
                            <NavItem className="projects-link">
                                <WriteCollapse />
                            </NavItem>
                            <NavItem className="projects-link">
                                <div className="ai-subtask-collapse-wrap">
                                    <div className={"header no-collapse-header " + (speechCollapse ? "active" : "")} onClick={()=> {handleFilesCollapser();history("/create/all-templates/speech")}}>
                                        {/* <NavLink activeClassName="active" className="title" to="/create/translate/files/translate-files">
                                            {t("files")}
                                        </NavLink> */}
                                        <div className="icon-wrap">
                                            <span className="icon"><img src={SpeechesMenu} /></span>
                                            <span className="title">Speech</span>
                                        </div>
                                        {/* <span className={speechCollapse ? "img" : "img-rotate"}>
                                            <img src={Config.HOST_URL + "assets/images/new-ui-icons/expand_more.svg"} alt="expand-more" />
                                        </span> */}
                                    </div>
                                </div>
                            </NavItem>
                            <NavItem className="projects-link">
                                <ToolkitCollapse />
                            </NavItem>
                    </Nav>
                }
                {/* <button onClick={()=>{history('/prompt')}}>Prompt</button> */}
            </div>
        </React.Fragment>
    );
};

export default SideBar;
