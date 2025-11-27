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
import GetStories from '../federal-news/GetStories';
// import DashboardNewProjDrpDown from '../dashboard/DashboardNewProjDrpDown';
import StorySingleViewModal from '../federal-news/StorySingleViewModal';
import MyStories from './MyStories';
import AddStoryModal from '../federal-news/AddStoryModal';
import AddStory from './AddStory';

const PIBNewsProjects = () => {
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const userDetails = useSelector((state) => state.userDetails.value);
    const isFederal = useSelector((state) => state.isFederalNews.value);
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value);
    const [tourStepIndex, setTourStepIndex] = useState(0);
    const [languageOptions, setLanguageOptions] = useState(null);
    const [isProductTourSeen, setIsProductTourSeen] = useState(true);
    const [isViewStoryModal, setIsViewStoryModal] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedStoryDetails, setSelectedStoryDetails] = useState(null);
    const [showAddStoryModal, setShowAddStoryModal] = useState(false);
    const [ministryDepartmentList, setMinistryDepartmentList] = useState([]);
    const [activeProjTab, setActiveProjTab] = useState(2);
    const mainContainerRef = useRef(null);  
    const isIncompleteEditorSettings = useSelector((state) => state.editorSettingStatus.value);
    const BeaconComponent = React.forwardRef((props, ref) => <div ref={ref} className="d-none"></div>);

    const targetLanguageOptionsRef = useRef([]);
    

    useEffect(() => {
        const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
        let filterParam = URL_SEARCH_PARAMS.get('filter');
        if (window.location.pathname?.includes("my-stories")) {
            setActiveProjTab(2);
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
        if (window.location.pathname.includes("my-stories")) {
            let browserUrl = `/my-stories?page=1`;
            history(browserUrl);
        }
        getLanguagesList();
        getMinistryDepartmentList();      
        document.title = 'Ailaysa | News Projects';
    }, []); 

    /* Product tour callback handler */
    const handleJoyrideCallback = (data) => {
        let { action, index, status, type } = data;
        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            let projectRows = document.getElementsByClassName("file-edit-list-table-row");
            if (projectRows[0]) {
                const isTasksOpened = projectRows[0].classList.contains("focused-proj-row");
                if (index === 0) {
                    if (!isTasksOpened)
                        projectRows[0]?.click();
                    let openButton = null;
                    const waitForOpenButton = setInterval(() => {
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
            setIsProductTourSeen(true); 
        }
    };

    /* Show the tour */
    const showHowToTour = () => {
        setTourStepIndex(0);
        setIsProductTourSeen(false);
    };

    /**
     * This  mehtod used to fetch the list of languages from the server and update the state with the retrieved data.
     * 
     * @author Padmabharathi Subiramanian 
     * @since 24 Nov 2025
     */
    const getLanguagesList = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                targetLanguageOptionsRef.current = response.data;
                setLanguageOptions(response.data);
            },
            error: (error) => {
                if(error.response.status === 500){
                    Helper.showToast('Something went wrong. Please try again later.', 'error');
                }
            }
        };
        Config.axios(params);
    };
 
    /**
     * This  mehtod used to fetch the list of Ministry/Department from the server and update the state with the retrieved data.
     * 
     * @author Padmabharathi Subiramanian 
     * @since 24 Nov 2025
     */
    const getMinistryDepartmentList = () => {
        let params = {
            url: Config.BASE_URL + "/workspace/ministry_names",                     
            auth: true,
            success: (response) => {
                setMinistryDepartmentList(response.data);
            },
            error: (error) => {
                if(error.response.status === 500){
                    Helper.showToast('Something went wrong. Please try again later.', 'error');
                }
            }
        };  
        Config.axios(params);
    }

    const tabList = [{
        id: 1,
        name: t("all_stories"),
        link: '/all-stories',
        isEnabled: false
    }, {
        id: 2,
        name: t("my_stories"),
        link: '/my-stories',
        isEnabled: true
    }, {
        id: 3,
        name: 'Add stories',
        link: '/add-stories',
        isEnabled: true
    }];

    /**
     * This mehtod used to set the active project tab while change.
     * @param {*} tab 
     * 
     * @auhtor Padmabharathi Subiramanian 
     * @since 24 Nov 2025
     */
    const onTabChange = (tab) => {
        setActiveProjTab(tab.id);
        history(tab.link + '?page=1');
    }

    return (
        <React.Fragment>
            <Navbar showHowToTour={showHowToTour} showTourOption={activeTab == 1} />
            <section className="padding-correction" ref={mainContainerRef}>
                <div className="projects-list-wrap-header-main">
                    {isIncompleteEditorSettings && <CVErrorAlert />}
                    <div className="projects-list-wrap-header">
                        <div className="projects-list-main-header">
                            <h1>{'Story/Press release'}</h1>
                        </div>
                        <div className="project-setup-tabs">
                            <Nav tabs className="setup-container-tab">
                                    {tabList.map(tab => (tab.isEnabled && (
                                        <NavItem
                                            className={"setup-button-global " + classnames({ active: activeProjTab == tab.id })}
                                            onClick={() => onTabChange(tab)}>
                                                <NavLink
                                                    key={tab.id}
                                                    className={"project-setup-btn " + (activeProjTab == tab.id ? 'active' : '')}>{tab.name}
                                                </NavLink>
                                        </NavItem>)
                                    ))}
                            </Nav>
                        </div>
                    </div>
                </div>
                <TabContent className="setup-container" activeTab={activeProjTab}>
                    {activeProjTab === 2 && (
                        <TabPane tabId={2}>
                            <MyStories
                                languageOptions= {languageOptions}
                                targetLanguageOptionsRef={targetLanguageOptionsRef}
                            />
                        </TabPane>
                    )}
                    {activeProjTab === 3 && (
                        <TabPane tabId={3}>
                            <AddStory 
                                languageOptions= {languageOptions}
                                ministryDepartmentOptions = {ministryDepartmentList}
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

export default PIBNewsProjects;