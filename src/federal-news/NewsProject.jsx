import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Config from '../Config';
import MyDocuments from '../project-setup-components/myfiles-component/MyDocuments';
import Navbar from '../vendor/Navbar';
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import TourTooltip from '../tour/TourTooltip';
import Fileupload from '../vendor/AllTemplateMain';
import AllProjectList from '../vendor/ailaysa-projects/AllProjectList';
import { useDispatch, useSelector } from 'react-redux';
import CVErrorAlert from '../vendor/model-select/CVErrorAlert';
import { setEditorSettingStatus } from '../features/EditorSettingStatusSlice';
import { useTranslation } from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import { ButtonBase } from '@mui/material'
import { setShowGlobalTransition } from "../features/GlobalTransitionSlice";
import GetStories from './GetStories';
// import DashboardNewProjDrpDown from '../dashboard/DashboardNewProjDrpDown';
import StorySingleViewModal from "./StorySingleViewModal";
import MyStories from './MyStories';
import AddStoryModal from './AddStoryModal';

const NewsProjects = () => {
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const userDetails = useSelector((state) => state.userDetails.value);
    const isFederal = useSelector((state) => state.isFederalNews.value);
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value);
    const [tourStepIndex, setTourStepIndex] = useState(0);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [isProductTourSeen, setIsProductTourSeen] = useState(true);
    const [isViewStoryModal, setIsViewStoryModal] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedStoryDetails, setSelectedStoryDetails] = useState(null);
    const [showAddStoryModal, setShowAddStoryModal] = useState(false);
    const [editorsListOption, setEditorsListOption] = useState([]);

    const mainContainerRef = useRef(null);
    const targetLanguageOptionsRef = useRef([]);

    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor';
    const [activeProjTab, setActiveProjTab] = useState(isDinamalar || is_internal_meber_editor ? 2 : 1);
    const isIncompleteEditorSettings = useSelector((state) => state.editorSettingStatus.value);
         
    const BeaconComponent = React.forwardRef((props, ref) => <div ref={ref} className="d-none"></div>);

    useEffect(() => {
        const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
        let filterParam = URL_SEARCH_PARAMS.get('filter');
        if (window.location.pathname?.includes("all-stories")) {
            setActiveProjTab(1);
        } else if (window.location.pathname?.includes("my-stories")) {
            if(filterParam === 'submitted'){
                setActiveProjTab(3);
            }else if(filterParam === 'approved'){
                setActiveProjTab(4);
            }else{
                setActiveProjTab(2);
            }
        } else if (window.location.pathname?.includes("add-stories")){
            setActiveProjTab(3);
        }
    }, [window.location.pathname, URL_SEARCH_PARAMS.get('filter')]);

    // clear the story details when view story modal is closed
    useEffect(() => {
        if(!isViewStoryModal){
            setSelectedStoryDetails(null);
        }
    }, [isViewStoryModal]) ;

    useEffect(() => {
        // let pageParam = window.location.pathname;
        if (window.location.pathname.includes("all-stories")) {
            // let orderParam = URL_SEARCH_PARAMS.get("order_by");
            // let filterParam = URL_SEARCH_PARAMS.get("filter");
            // let searchParam = URL_SEARCH_PARAMS.get("search");
            let browserUrl = `/all-stories?page=1`;
            history(browserUrl);
        }
        getLanguagesList();
        if (userDetails?.is_vendor) {
            getEdiorSettingStatus();
        }        
        document.title = 'Ailaysa | News Projects';
    }, []);

    // get the editors list for dinamalar user
    useEffect(() => {
        if(isDinamalar){
            getEditorsListOption();
        }
    }, [isDinamalar]);
    
    const getEdiorSettingStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/vendor/editor_settings_status/`,
            auth: true,
            success: (response) => {
                dispatch(setEditorSettingStatus(response.data['incomplete status']));
            },
            error: (err) => {
                if (err.response?.data?.msg === "Unauthorised" || err.response?.data?.code === "bad_authorization_header") {
                    // AppConfigs.logout();
                }
            }
        });
    }

    const getEditorsListOption = () => {
        Config.axios({
            url: `${Config.BASE_URL}/auth/editors_list/`,
            auth: true,
            success: (response) => {
                setEditorsListOption(response.data);
            },
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

    const openAddStoryModal = () => {
        setShowAddStoryModal(true);
    } 

    const handlePorjectListSwitch = (tab, filter) => {
        const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
        setActiveProjTab(tab);
        URL_SEARCH_PARAMS.set('page', 1);
        URL_SEARCH_PARAMS.set('filter', filter);
        history(window.location.pathname + '?' + URL_SEARCH_PARAMS.toString());
        // history("/my-stories?page=1&filter=inprogress");
    } 

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
                            <h1>{t("news_project")}</h1>
                            {/* <DashboardNewProjDrpDown /> */}
                        </div>
                        <div className="project-setup-tabs">
                            <Nav tabs className="setup-container-tab">
                                {/* CMS All Stories */}
                                {(isFederal && !is_internal_meber_editor) && (
                                    <NavItem
                                        className={"setup-button-global " + classnames({ active: activeProjTab == 1 })}
                                        onClick={() => {
                                            setActiveProjTab(1);
                                            history("/all-stories?page=1")
                                        }}>
                                        <NavLink className={"project-setup-btn " + (activeProjTab == 1 ? 'active' : '')}>{t("all_stories")}</NavLink>
                                    </NavItem>
                                )}

                                {/* My Story project  */}
                                {/* below condition is for restricting the dinamalar internal editor from getting seperated task status based list */}
                                {(isDinamalar) ? (
                                    <>
                                        <NavItem
                                            className={"setup-button-global " + classnames({ active: activeProjTab == 2 })}
                                            onClick={() => {
                                                handlePorjectListSwitch(2, 'inprogress')
                                            }}>
                                            <NavLink className={"project-setup-btn " + (activeProjTab == 2 ? 'active' : '')}>{t("in_progress")}</NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={"setup-button-global " + classnames({ active: activeProjTab == 3 })}
                                            onClick={() => {
                                                handlePorjectListSwitch(3, 'submitted')
                                                // setActiveProjTab(3);
                                                // history("/my-stories?page=1&filter=submitted")
                                            }}>
                                            <NavLink className={"project-setup-btn " + (activeProjTab == 3 ? 'active' : '')}>{t("submitted")}</NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={"setup-button-global " + classnames({ active: activeProjTab == 4 })}
                                            onClick={() => {
                                                handlePorjectListSwitch(4, 'approved')
                                                // setActiveProjTab(4);
                                                // history("/my-stories?page=1&filter=approved")
                                            }} >
                                            <NavLink className={"project-setup-btn " + (activeProjTab == 4 ? 'active' : '')}>{t("approved")}</NavLink>
                                        </NavItem>
                                    </>
                                ) : (
                                    <NavItem
                                        className={"setup-button-global " + classnames({ active: activeProjTab == 2 })}
                                        onClick={() => {
                                            setActiveProjTab(2);
                                            history("/my-stories?page=1")
                                        }}>
                                        <NavLink className={"project-setup-btn " + (activeProjTab == 2 ? 'active' : '')}>{t("my_stories")}</NavLink>
                                    </NavItem>
                                )} 
                            </Nav>
                        </div>
                    </div>
                </div>
                <TabContent className="setup-container" activeTab={activeProjTab}>
                    {/* CMS stories list section */}
                    {(!is_internal_meber_editor && activeProjTab === 1) && (
                        <TabPane tabId={1}>
                            <GetStories 
                                activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                                setSelectedStoryDetails={setSelectedStoryDetails}
                                setIsViewStoryModal={setIsViewStoryModal}
                                openAddStoryModal={openAddStoryModal}
                                editorsListOption={editorsListOption}/>
                        </TabPane>
                    )}

                    {/* My stories project section */}
                    {activeProjTab === 2 && (
                        <TabPane tabId={2}>
                            <MyStories 
								activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                                setIsViewStoryModal={setIsViewStoryModal}
                                setSelectedStoryDetails={setSelectedStoryDetails}
                                openAddStoryModal={openAddStoryModal}
                                editorsListOption={editorsListOption}/>
                        </TabPane>
                    )}
                    {activeProjTab === 3 && (
                        <TabPane tabId={3}>
                            <MyStories 
								activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                                setIsViewStoryModal={setIsViewStoryModal}
                                setSelectedStoryDetails={setSelectedStoryDetails}
                                openAddStoryModal={openAddStoryModal}
                                editorsListOption={editorsListOption}/>
                        </TabPane>
                    )}
                    {activeProjTab === 4 && (
                        <TabPane tabId={4}>
                            <MyStories 
								activeProjTab={activeProjTab}
                                targetLanguageOptions={targetLanguageOptions}
                                setTargetLanguageOptions={setTargetLanguageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                                mainContainerRef={mainContainerRef}
                                setIsViewStoryModal={setIsViewStoryModal}
                                setSelectedStoryDetails={setSelectedStoryDetails}
                                openAddStoryModal={openAddStoryModal}
                                editorsListOption={editorsListOption}/>
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
                run={!isProductTourSeen} />
            {isViewStoryModal &&
                <StorySingleViewModal
                    isViewStoryModal={isViewStoryModal}
                    setIsViewStoryModal={setIsViewStoryModal}
                    selectedStoryDetails={selectedStoryDetails}
                    setSelectedStoryDetails={setSelectedStoryDetails} />
            }
            {showAddStoryModal && (
                <AddStoryModal 
                    showAddStoryModal={showAddStoryModal}
                    setShowAddStoryModal={setShowAddStoryModal}
                    setActiveProjTab={setActiveProjTab}
                />
            )}

        </React.Fragment>
    )
}

export default NewsProjects;