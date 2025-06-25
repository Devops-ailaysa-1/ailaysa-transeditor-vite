import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Config from '../vendor/Config';
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
import { ButtonBase } from '@mui/material';
import { setShowGlobalTransition } from "../features/GlobalTransitionSlice";
import GetStories from './GetStories';
// import DashboardNewProjDrpDown from '../dashboard/DashboardNewProjDrpDown';
import StorySingleViewModal from "./StorySingleViewModal";
import DashboardOverview from './DashboardOverview';
import { ButtonLoader } from '../loader/CommonBtnLoader';
import EditorRolesList from './EditorRolesList';
import ModifiedStoriesFilter from './ModifiedStoriesFilter';

const BIReport = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails.value);
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value);
    const isIncompleteEditorSettings = useSelector((state) => state.editorSettingStatus.value);
    const [activeTab, setActiveTab] = useState(2);
    const [showEditorReportModal, setShowEditorReportModal] = useState(false);
    const [workReport, setWorkReport] = useState(null);
    const [isDataFetching, setIsDataFetching] = useState(false);
    const [userReportFilterSelectedValue, setUserReportFilterSelectedValue] = useState({ value: 'today', label: "Today" });
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [isReportDownloading, setIsReportDownloading] = useState(false);

    const axiosUserReportAbortControllerRef = useRef(null);
    
    let is_internal_member_editor = userDetails?.internal_member_team_detail?.role === 'Editor';

    useEffect(() => {
        if(is_internal_member_editor){
            setActiveTab(1);
        }
    }, [is_internal_member_editor]);
    
    // get the user work report 
    useEffect(() => {
        if(userDetails){
            if(is_internal_member_editor){
                setShowEditorReportModal(true);
            }
            if(isDinamalar){
                if(userReportFilterSelectedValue?.value !== "custom"){
                    setFromDate(null);
                    setToDate(null);
                }
                getUserWorkReport();
            }
        }
    }, [userDetails, userReportFilterSelectedValue, isDinamalar, activeTab]);
    
    useEffect(() => {
        if(toDate !== null && fromDate !== null && Config.changeToSimpleDateFormat(toDate) !== "" && Config.changeToSimpleDateFormat(fromDate) !== ""){
            setUserReportFilterSelectedValue({ value: 'custom', label: "Custom" });
        }
    }, [toDate, fromDate]);

    const getUserWorkReport = () => {
        if (axiosUserReportAbortControllerRef.current) {
            axiosUserReportAbortControllerRef.current.abort();
        }
        if(userReportFilterSelectedValue?.value === 'custom' && (Config.changeToSimpleDateFormat(fromDate) === '' || Config.changeToSimpleDateFormat(toDate) === '')) return;
        const controller = new AbortController();
        axiosUserReportAbortControllerRef.current = controller;        
        setIsDataFetching(true);        
        let url = `${Config.BASE_URL}/workspace/task_report/?`;
        if(userReportFilterSelectedValue?.value !== 'custom') url += `time_range=${userReportFilterSelectedValue?.value}`;
        else url += `from_date=${Config.changeToSimpleDateFormat(fromDate)}&to_date=${Config.changeToSimpleDateFormat(toDate)}`;
        if(activeTab === 2) url += `&billing=True`;
        if(activeTab === 3) url += `&glossary=True`;

        Config.axios({
            url: url,
            auth: true,
            ...((controller !== undefined && controller !== null) && {signal: controller.signal}),
            success: (response) => {                
                let activeUser = response?.data?.Additional_info?.filter(each => each.state === "active");
                let deletedUser = response?.data?.Additional_info?.filter(each => each.state === "deleted");
                let sortedArr = [...activeUser, ...deletedUser];
                let data = {
                    over_all: {
                        ...response.data
                    },
                    userData: sortedArr
                };
                delete data?.over_all['Additional_info'];
                setIsDataFetching(false);
                setWorkReport(data);
            },
            error: (err) => {
                setIsDataFetching(false);
            }
        });
    } 

    const downloadBIReport = async() =>{
        setIsReportDownloading(true);
        let url = `${Config.BASE_URL}/workspace/task_report/?`;
        if(userReportFilterSelectedValue?.value !== 'custom') url += `time_range=${userReportFilterSelectedValue?.value}`;
        else url += `from_date=${Config.changeToSimpleDateFormat(fromDate)}&to_date=${Config.changeToSimpleDateFormat(toDate)}`;
        url += `&download_report=True`;
        if(activeTab === 2) url += `&billing=True`;
        if(activeTab === 3) url += `&glossary=True`;

        try{
            const response = await Config.downloadFileFromApi(url);
            if(response?.status === 200){
                Config.downloadFileInBrowser(response);
                setIsReportDownloading(false);
            }else{
                Config.toast('Download failed', 'error');
                setIsReportDownloading(false);
            }
        }catch(e){
            console.error(e);
            Config.toast('Download failed', 'error');
            setIsReportDownloading(false);
        }
    } 

    return (
        <React.Fragment>
            <Navbar />
            <section className="padding-correction">
                {/* {isIncompleteEditorSettings && (
                    <CVErrorAlert />
                )} */}
                <div className="projects-list-wrap-header-main">
                    {isIncompleteEditorSettings && (
                        <CVErrorAlert />
                    )}
                    <div className="projects-list-wrap-header">
                        <div className="projects-list-main-header">
                            <h1>{t("detailed_report")}</h1>
                        </div>
                        <div className="project-setup-tabs">
                            <Nav tabs className="setup-container-tab">
                                {!is_internal_member_editor && (
                                    <NavItem
                                        className={"setup-button-global " + classnames({ active: activeTab == 2 })}
                                        onClick={() => {
                                            setActiveTab(2);
                                        }}
                                    >
                                        <NavLink className={"project-setup-btn " + (activeTab == 2 ? 'active' : '')}>{t("billing")}</NavLink>
                                    </NavItem>
                                )}
                                <NavItem
                                    className={"setup-button-global " + classnames({ active: activeTab == 1 })}
                                    onClick={() => {
                                        setActiveTab(1);
                                    }}
                                >
                                    <NavLink className={"project-setup-btn " + (activeTab == 1 ? 'active' : '')}>{t("general")}</NavLink>
                                </NavItem>
                                {!is_internal_member_editor && (
                                    <NavItem
                                        className={"setup-button-global " + classnames({ active: activeTab == 3 })}
                                        onClick={() => {
                                            setActiveTab(3);
                                        }}
                                    >
                                        <NavLink className={"project-setup-btn " + (activeTab == 3 ? 'active' : '')}>{t("glossary")}</NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                        </div>
                    </div>
                </div>
                <TabContent className="setup-container" activeTab={activeTab}>
                    <div className="report-main-wrapper">
                        <div className="dashboard-header-wrap">
                            <h1 className="dashboard-overview-title">{t("assign_story_overview")}</h1>
                            <div className="report-btn-wrap-row">
                                {!is_internal_member_editor && (
                                    <ButtonBase 
                                        className="report-down-btn"
                                        style={isReportDownloading ? {padding: '10px'} : {}}
                                        onClick={() => !isReportDownloading && downloadBIReport()}>
                                        {isReportDownloading && <ButtonLoader />}
                                        <span className={isReportDownloading ? 'ml-2' : ''}>
                                            {isReportDownloading ? ("downloading") : ("download")}
                                        </span>
                                    </ButtonBase>
                                )}
                                <ModifiedStoriesFilter
                                    userReportFilterSelectedValue={userReportFilterSelectedValue}
                                    setUserReportFilterSelectedValue={setUserReportFilterSelectedValue} 
                                    toDate={toDate}
                                    setToDate={setToDate}
                                    fromDate={fromDate}
                                    setFromDate={setFromDate}
                                />
                            </div>
                        </div>
                        <DashboardOverview
                            isDataFetching={isDataFetching}
                            showEditorReportModal={showEditorReportModal}
                            workReport={workReport}
                            userReportFilterSelectedValue={userReportFilterSelectedValue}
                            setUserReportFilterSelectedValue={setUserReportFilterSelectedValue}
                            toDate={toDate}
                            setToDate={setToDate}
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                            activeTab={activeTab}
                        />
                        {(!showEditorReportModal && workReport?.userData?.length !== undefined) ? (
                            <EditorRolesList workReport={workReport} activeTab={activeTab} />
                        ) : ""}                        
                    </div>
                </TabContent>
            </section>
        </React.Fragment>
    )
}

export default BIReport;