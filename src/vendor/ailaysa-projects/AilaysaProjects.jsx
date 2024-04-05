import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import Config from '../Config';
import MyDocuments from './../../project-setup-components/myfiles-component/MyDocuments';
import Navbar from '../Navbar';
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import TourTooltip from '../../tour/TourTooltip';
import Fileupload from '../Fileupload';
import AllProjectList from './AllProjectList';
import { useDispatch, useSelector } from 'react-redux';
import CVErrorAlert from '../model-select/CVErrorAlert';
import { setEditorSettingStatus } from '../../features/EditorSettingStatusSlice';
import { useTranslation } from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import { ButtonBase } from '@mui/material'
import { setShowGlobalTransition } from "../../features/GlobalTransitionSlice";
import DashboardNewProjDrpDown from '../dashboard/DashboardNewProjDrpDown';

const AilaysaProjects = () => {
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const userDetails = useSelector((state) => state.userDetails.value)
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value)

    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor'
    const isIncompleteEditorSettings = useSelector((state) => state.editorSettingStatus.value)
    const showGlobalTransition = useSelector((state) => state.globalTransition.value)

    const handleOpenAllTemplates = () => {
        dispatch(setShowGlobalTransition(true))
        history("/create/all-templates/writing");
    }

    const [activeProjTab, setActiveProjTab] = useState(1);
    const [tourStepIndex, setTourStepIndex] = useState(0);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [isProductTourSeen, setIsProductTourSeen] = useState(true);
    const [activeTab, setActiveTab] = useState(1);

    const mainContainerRef = useRef(null)
    const targetLanguageOptionsRef = useRef([]);

    const BeaconComponent = React.forwardRef((props, ref) => <div ref={ref} className="d-none"></div>);

    useEffect(() => {
        if (window.location.pathname?.includes("file-upload")) {
            setActiveProjTab(1)
        } else if (window.location.pathname?.includes("documents-list")) {
            setActiveProjTab(2)
        } else if (window.location.pathname?.includes("translations")) {
            setActiveProjTab(3)
        } else if (window.location.pathname?.includes("transcriptions")) {
            setActiveProjTab(4)
        } else if (window.location.pathname?.includes("ai-voices")) {
            setActiveProjTab(5)
        } else if (window.location.pathname?.includes("assets")) {
            setActiveProjTab(6)
        } else if (window.location.pathname?.includes("toolkit")) {
            setActiveProjTab(7)
        } else if (window.location.pathname?.includes("design")) {
            setActiveProjTab(9)
        }
    }, [window.location.pathname])


    useEffect(() => {
        let pageParam = URL_SEARCH_PARAMS.get("page");
        if (pageParam == null) {
            let orderParam = URL_SEARCH_PARAMS.get("order_by");
            let filterParam = URL_SEARCH_PARAMS.get("filter");
            let searchParam = URL_SEARCH_PARAMS.get("search");
            let browserUrl = `/file-upload?page=1`;
            history(browserUrl)
        }
        // set browser tab title as "Projects"
        getLanguagesList()
        if (userDetails?.is_vendor) {
            getEdiorSettingStatus()
        }
        document.title = 'Ailaysa | Projects';
    }, []);

    useEffect(() => {
        // this is restrict the dinamalar users to access the standard project list 
        if(isDinamalar){
            history("/my-stories?page=1")
        }
    }, [isDinamalar])


    const getEdiorSettingStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/vendor/editor_settings_status/`,
            auth: true,
            success: (response) => {
                dispatch(setEditorSettingStatus(response.data['incomplete status']))
            },
            error: (err) => {
                if (err.response?.data?.msg === "Unauthorised" || err.response?.data?.code === "bad_authorization_header") {
                    // AppConfigs.logout();
                }
            }
        });
    }

    /* Product tour callback handler */
    const handleJoyrideCallback = (data) => {
        let { action, index, status, type } = data;
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            let projectRows = document.getElementsByClassName("file-edit-list-table-row");
            if (projectRows[0]) {
                const isTasksOpened = projectRows[0].classList.contains("focused-proj-row");
                if (index === 0) {
                    if (!isTasksOpened)
                        // If the project is not yet opened
                        projectRows[0]?.click();
                    let openButton = null;
                    const waitForOpenButton = setInterval(() => {
                        // Wait for a particular element to be in the DOM
                        openButton = document.querySelector(".file-edit-list-inner-table-row button");
                        if (openButton) {
                            clearInterval(waitForOpenButton);
                            setTourStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
                            return;
                        }
                    }, 0);
                    return;
                }
            }
            setTourStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        } else if ([STATUS.FINISHED, STATUS.SKIPPED, STATUS.IDLE].includes(status) || action === ACTIONS.CLOSE) {
            // Need to set our running state to false, so we can restart if we click start again.
            setIsProductTourSeen(true); //Tour seen
        }
    };


    /* Set tab change if clicked only other tabs */
    const activeToggle = (tab) => {
        if (activeTab != tab) {
            setActiveTab(tab);
        }
    };

    /* Show the tour */
    const showHowToTour = () => {
        setTourStepIndex(0);
        setIsProductTourSeen(false);
    };

    /* Get source language options */
    const getLanguagesList = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data;
                setTargetLanguageOptions(response.data);
            },
        };
        Config.axios(params);
    };

    // console.log(activeProjTab)
    return (
        <React.Fragment>
            <Navbar showHowToTour={showHowToTour} showTourOption={activeTab == 1} />
            <section className="padding-correction" ref={mainContainerRef}>
                {/* {isIncompleteEditorSettings && (
                    <CVErrorAlert />
                )} */}
                <div className="projects-list-wrap-header-main">
                    {isIncompleteEditorSettings && (
                        <CVErrorAlert />
                    )}
                    <div className="projects-list-wrap-header">
                        <div className="projects-list-main-header">
                            <h1>{t("my_projects")}</h1>
                            {/* <DashboardNewProjDrpDown /> */}
                        </div>
                        <div className="project-setup-tabs">
                            <Nav tabs className="setup-container-tab">
                                {/* All projects */}
                                <NavItem
                                    className={"setup-button-global " + classnames({ active: activeProjTab == 1 })}
                                    onClick={() => {
                                        setActiveProjTab(1);
                                        history("/file-upload?page=1")
                                    }}
                                >
                                    <NavLink className={"project-setup-btn " + (activeProjTab == 1 ? 'active' : '')}>{t("proj_list_cate_all")}</NavLink>
                                </NavItem>

                                {/* Writings */}
                                {Config.userState?.internal_member_team_detail?.role !== "Editor" && (
                                    <NavItem
                                        className={"setup-button-global " + classnames({ active: activeProjTab == 2 })}
                                        onClick={() => {
                                            setActiveProjTab(2);
                                            history("/documents-list?page=1")
                                        }}
                                    >
                                        <NavLink className={"project-setup-btn " + (activeProjTab == 2 ? 'active' : '')}>{t("proj_list_cate_writing")}</NavLink>
                                    </NavItem>
                                )}

                                {/* Translations */}
                                <NavItem
                                    className={"setup-button-global " + classnames({ active: activeProjTab == 3 })}
                                    onClick={() => {
                                        setActiveProjTab(3);
                                        history("/translations?page=1")
                                    }}
                                >
                                    <NavLink className={"project-setup-btn " + (activeProjTab == 3 ? 'active' : '')}>{t("proj_list_cate_trans")}</NavLink>
                                </NavItem>

                                {/* Designs */}
                                {/* {!is_internal_meber_editor && ( */}
                                    <NavItem
                                        className={"setup-button-global " + classnames({ active: activeProjTab == 9 })}
                                        onClick={() => {
                                            setActiveProjTab(9);
                                            history("/designs?page=1")
                                        }}
                                    >
                                        <NavLink className={"project-setup-btn " + (activeProjTab == 9 ? 'active' : '')}>{t("proj_list_cate_design")}</NavLink>
                                    </NavItem>
                                {/* )} */}

                                {/* Transcriptions */}
                                <NavItem
                                    className={"setup-button-global " + classnames({ active: activeProjTab == 4 })}
                                    onClick={() => {
                                        setActiveProjTab(4);
                                        history("/transcriptions?page=1")
                                    }}
                                >
                                    <NavLink className={"project-setup-btn " + (activeProjTab == 4 ? 'active' : '')}>{t("proj_list_cate_transcription")}</NavLink>
                                </NavItem>

                                {/* AI voices */}
                                <NavItem
                                    className={"setup-button-global " + classnames({ active: activeProjTab == 5 })}
                                    onClick={() => {
                                        setActiveProjTab(5);
                                        history("/ai-voices?page=1")
                                    }}
                                >
                                    <NavLink className={"project-setup-btn " + (activeProjTab == 5 ? 'active' : '')}>{t("proj_list_cate_ai_voice")}</NavLink>
                                </NavItem>

                                {/* Assets */}
                                <NavItem
                                    className={"setup-button-global " + classnames({ active: activeProjTab == 6 })}
                                    onClick={() => {
                                        setActiveProjTab(6);
                                        history("/assets?page=1")
                                    }}
                                >
                                    <NavLink className={"project-setup-btn " + (activeProjTab == 6 ? 'active' : '')}>{t("proj_list_cate_assets")}</NavLink>
                                </NavItem>

                                {/* Toolkit */}
                                {(!is_internal_meber_editor) && (
                                    <NavItem
                                        className={"setup-button-global " + classnames({ active: activeProjTab == 7 })}
                                        onClick={() => {
                                            setActiveProjTab(7);
                                            history("/toolkit?page=1")
                                        }}
                                    >
                                        <NavLink className={"project-setup-btn " + (activeProjTab == 7 ? 'active' : '')}>{t("proj_list_cate_toolkit")}</NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                        </div>
                    </div>
                </div>
                <TabContent className="setup-container" activeTab={activeProjTab}>

                    {/* All projects section */}
                    {activeProjTab === 1 && (
                        <TabPane tabId={1}>
                            <AllProjectList
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                            />
                        </TabPane>
                    )}

                    {/* Writing section */}
                    {(!Config.userState?.internal_member_team_detail?.role !== "Editor" && activeProjTab === 2) && (
                        <TabPane tabId={2}>
                            <MyDocuments activeProjTab={activeProjTab} mainContainerRef={mainContainerRef} />
                        </TabPane>
                    )}

                    {/* Translation section */}
                    {activeProjTab === 3 && (
                        <TabPane tabId={3}>
                            <Fileupload
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                            />
                        </TabPane>
                    )}

                    {/* Design section */}
                    {activeProjTab === 9 && (
                        <TabPane tabId={9}>
                            <Fileupload
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                            />
                        </TabPane>
                    )}

                    {/* Transcription section */}
                    {activeProjTab === 4 && (
                        <TabPane tabId={4}>
                            <Fileupload
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                            />
                        </TabPane>
                    )}

                    {/* AI voice section */}
                    {activeProjTab === 5 && (
                        <TabPane tabId={5}>
                            <Fileupload
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                            />
                        </TabPane>
                    )}

                    {/* Assets section */}
                    {activeProjTab === 6 && (
                        <TabPane tabId={6}>
                            <Fileupload
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                            />
                        </TabPane>
                    )}

                    {/* Toolkit section */}
                    {(activeProjTab === 7 && !is_internal_meber_editor) && (
                        <TabPane tabId={7}>
                            <AllProjectList
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                            />
                        </TabPane>
                    )}

                </TabContent>
            </section>
            {/* <Footer /> */}
            <Joyride
                steps={[
                    { target: ".file-edit-list-table-row", title: "View your files for translation", disableBeacon: true },
                    { target: ".file-edit-list-inner-table-row button", title: "Open the file for translation" },
                ]}
                continuous={true}
                tooltipComponent={TourTooltip}
                disableScrolling={true}
                callback={handleJoyrideCallback}
                stepIndex={tourStepIndex}
                disableCloseOnEsc={true}
                beaconComponent={BeaconComponent}
                run={!isProductTourSeen}
            />
        </React.Fragment>
    )
}

export default AilaysaProjects