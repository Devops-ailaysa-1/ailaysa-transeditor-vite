import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Config from "../../Config";
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import Tooltip from '@mui/material/Tooltip';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useTranslation } from "react-i18next";
import RestoreIcon from '@mui/icons-material/Restore';
// mui icons
import CloseIcon from '@mui/icons-material/Close';
import DownloadAnimation from "../../animation-styles/downloading-animation/DownloadAnimation";
import ButtonBase from '@mui/material/ButtonBase';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { toggleDialogDisplay } from '../../features/WriterDialogToggleSlice';
import SplitViewIcon from "../../vendor/styles-svg/SplitViewIcon";
import AppsIcon from "../../vendor/styles-svg/AppsIcon";
import { useSelector } from 'react-redux';
import StartUpTNCampaignOffer from './../../vendor/model-select/StartUpTNCampaignOffer';
import { CircularProgress } from "@mui/material";
import TransWriterLogo from "../../assets/images/trans-writer-logo-new.svg";
import ChevronLeftBlack from "../../assets/images/new-ui-icons/chevron_left_black.svg";
import NavIconOne from "../../assets/images/navIconOne.svg";
import NavIconTwo from "../../assets/images/navIconTwo.svg";
import FileDownload from "../../assets/images/new-ui-icons/file_download.svg";
import ProjectsIcon from "../../assets/images/ai-projects.svg";
import TranseditorIcon from "../../assets/images/ai-transeditor.svg";
import DesignerIcon from "../../assets/images/ai-designer.svg";
import TranscribeIcon from "../../assets/images/ai-transcribe.svg";
import VoiceIcon from "../../assets/images/ai-voice.svg";
import ChatbookIcon from "../../assets/images/ai-chatbook.svg";
import MarketplaceIcon from "../../assets/images/ai-marketplace.svg";
import ReactRouterPrompt from 'react-router-prompt';

function Navbar(props) {
    const { t } = useTranslation();
    const userDetails = useSelector((state) => state.userDetails.value);
    const showCampaignCouponStrip = useSelector((state) => state.campaignCouponStrip.value);
    const bookCreationResponseRedux = useSelector((state) => state.bookCreationResponse.value);
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value);
    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor';
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const location = useLocation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const [didMount, setDidMount] = useState(false);
    // const [fromAilaysa, setFromAilaysa] = useState(false);
    const [writterNav, setWritterNav] = useState(1);
    const [logoutDrpVisibility, setLogoutDrpVisibility] = useState(false);
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [AppsDrpVisibility, setAppsDrpVisibility] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isPlanCancelled, setIsPlanCancelled] = useState(false);
    const [planExpireDays, setPlanExpireDays] = useState(null);
    const [planExpireHours, setPlanExpireHours] = useState(null);
    const [subcription_status, setSubcription_status] = useState("");
    const [isTrial, setIsTrial] = useState(null);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const [downloadpending, setDownloadpending] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const { pathname } = useLocation();
    const [navigationModalVisible, setNavigationModalVisible] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const [isTranslateEnable, setIsTranslateEnable] = useState(false);
    const [availCredits, setAvailCredits] = useState(false);
    const [creditsAvailable, setCreditsAvailable] = useState(null);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [isCurrentPlanTrial, setIsCurrentPlanTrial] = useState(null);
    const [subscriptionCredit, setSubscriptionCredit] = useState(0);
    const [addonCredit, setAddonCredit] = useState(0);
    const [isAudioOrPdf, setIsAudioOrPdf] = useState(null);  // state to check if writer opened of transcription or pdf task
    const [showAudioPDFDialog, setShowAudioPDFDialog] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showDownloadDrpDown, setShowDownloadDrpDown] = useState(false);
    const [isCurrentChaperDownloading, setIsCurrentChaperDownloading] = useState(false);
    const [isFullBookDownloading, setIsFullBookDownloading] = useState(false);
    const outsideClick = useRef();
    const availCreditOutside = useRef();
    const AppDropOutside = useRef();
    const DownloadOutside = useRef();

    const executeProposalScroll = () => {
        props.documentNameRef.current.scrollTo(0, 0);
    }

    const openAddOn = () => {
        window.open(Config.USER_PORTAL_HOST + "/add-ons");
        handleAppsDrpVisibility(false);
    }

    const openSubcription = () => {
        window.open(Config.USER_PORTAL_HOST + "/subscription-plans");
        setAvailCredits(false);
    }

    const getcreditstoggle = () => {
        setAvailCredits(!availCredits);
    }

    // this is responsible for opening pdf task data in writter
    useEffect(() => {
        let taskParam = URL_SEARCH_PARAMS.get("task");
        if (taskParam) {
            setIsAudioOrPdf('pdf');
        }
    }, [URL_SEARCH_PARAMS.get("task")]);

    useEffect(() => {
        let transcripParam = URL_SEARCH_PARAMS.get("transcription-task");
        if (transcripParam) {
            setIsAudioOrPdf('audio');
        }
    }, [URL_SEARCH_PARAMS.get("transcription-task")]);

    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (outsideClick.current && !outsideClick.current.contains(e.target)) {
                setLogoutDrpVisibility(false);
                handleAppsDrpVisibility(false);
                handleDownloadDrpVisibility(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Show/Hide chat logout dropdown */
    const handleLogoutDrpVisibility = (show = true) => {
        setLogoutDrpVisibility(show);
    };

    /* Show/Hide chat logout dropdown */
    const handleDownloadDrpVisibility = (show = true) => {
        setShowDownloadDrpDown(show);
    };

    /* Show/Hide chat logout dropdown */
    const handleAppsDrpVisibility = (show = true) => {
        setAppsDrpVisibility(show);
    };

    /* Logout the user */
    const logout = () => {
        Config.logout();
    };

    const handleBlockedNavigation = nextLocation => {
        if (!confirmedNavigation && pathname) {
            setLastLocation(nextLocation);
            setNavigationModalVisible(true);
            return false;
        }
        return true;
    }

    const handleConfirmNavigationClick = () => {
        setNavigationModalVisible(false);
        setConfirmedNavigation(true);
    }

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // Navigate to the previous blocked location with your navigate function
            history(lastLocation.pathname);
        }
    }, [confirmedNavigation, history, lastLocation]);

    useEffect(() => {
        if(bookCreationResponseRedux !== null){
            props.documentNameRef.current.innerText = bookCreationResponseRedux.name !== undefined ? bookCreationResponseRedux.name : "";
        }
    }, [bookCreationResponseRedux]);
    
    const handleProjectEnter = (e) => {
        e.which === 13 ? e.target.blur() : e.target.focus();
        let len = e.target.textContent.trim().length;
        let hasSelection = false;
        let selection = window.getSelection();
        let isSpecial = utils.isSpecial(e);
        let isNavigational = utils.isNavigational(e);
        if (selection) {
            hasSelection = !!selection.toString();
        }
        if (isSpecial || isNavigational || (e.ctrlKey && e.which === 65)) {
            return true;
        }
        if (len >= settings.maxLen && !hasSelection) {
            e.preventDefault();
            return false;
        }
    };

    const removebrtag = () => {
        let rem = document.querySelector('.project-box-ai');
        var var1 = rem.getElementsByTagName('br');
        for (var i = var1.length; i--;) {
            var1[i].parentNode.removeChild(var1[i]);
        }
    }

    document.querySelector('[contenteditable]')?.addEventListener('paste', function pasteAsPlainText(event) {
        event.preventDefault();
        event.target.innerText = event.clipboardData.getData("text/plain")?.slice(0, 256);
        removebrtag();
    });

    let settings = {
        maxLen: 256,
    }

    let keys = {
        'backspace': 8,
        'shift': 16,
        'ctrl': 17,
        'alt': 18,
        'delete': 46,
        'leftArrow': 37,
        'upArrow': 38,
        'rightArrow': 39,
        'downArrow': 40,
    }

    let utils = {
        special: {},
        navigational: {},
        isSpecial(e) {
            return typeof this.special[e.keyCode] !== 'undefined';
        },
        isNavigational(e) {
            return typeof this.navigational[e.keyCode] !== 'undefined';
        }
    }

    utils.special[keys['backspace']] = true;
    utils.special[keys['shift']] = true;
    utils.special[keys['ctrl']] = true;
    utils.special[keys['alt']] = true;
    utils.special[keys['delete']] = true;
    utils.navigational[keys['upArrow']] = true;
    utils.navigational[keys['downArrow']] = true;
    utils.navigational[keys['leftArrow']] = true;
    utils.navigational[keys['rightArrow']] = true;

    const handleDocumentSubmit = () => {
        let step = 1;    // for now writer documents have only editing step (step 1)
        let formData = new FormData();
        let transcribeParam = URL_SEARCH_PARAMS.get("transcription-task");
        let taskParam = URL_SEARCH_PARAMS.get("task");
        formData.append("task", transcribeParam ? transcribeParam : taskParam);
        formData.append("step", step);
        formData.append("status", "3"); // submit: 3, in-progress: 2

        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            method: 'PUT',
            data: formData,
            auth: true,
            success: (response) => {
                Config.toast("Document submitted successfully");
                props.setShowSubmitDocment(false);
                props.isTaskInProgressRef.current = false;
            }
        });
    }

    const handleSaveBtn = (name = false) => {
        let isCoAuthor = window.location.pathname.includes('book-writing');
        if (!isCoAuthor && props.isWriterDocumentRef.current) {
            if (props.createdDocumentId.current !== null) props.globalSaveLogic();
            else props.createNewDocument();
        } else if(isCoAuthor && name){
            updateBookName();
        }else{
            props.globalSaveLogic();
        }
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    }

    const updateBookName = () => {
        let formdata = new FormData();
        let bookName = props.documentNameRef.current.innerText;
        if(bookName?.trim()?.length === 0) return; 
        if(bookCreationResponseRedux === null) return;        
        formdata.append("project_name", bookName);

        Config.axios({
            url: `${Config.BASE_URL}/writer/bookcreation/${bookCreationResponseRedux?.id}/`,
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => { },
            error: (err) => {
                if (err?.response.status === 400) { }
            }
        });
    } 

    /* Get the current user plan details */
    const getUserPlanDetails = () => {
        Config.axios({
            url: `${Config.BASE_URL}/auth/check-subscription/`,
            auth: true,
            success: (response) => {
                let todaysDate = new Date();
                let planExpiry = new Date(response.data.sub_period_end);
                // let planExpiry = new Date('2021-11-23 16:00') // For testing
                let timeDifference = planExpiry.getTime() - todaysDate.getTime();
                let dateDifference = timeDifference / (1000 * 3600 * 24);
                let hoursDifference = Math.abs(timeDifference) / 36e5;
                setIsPlanCancelled(response.data?.sub_status === 'canceled' ? true : false);
                setCurrentPlan(response.data?.subscription_name?.toUpperCase());
                setPlanExpireDays(Math.ceil(dateDifference));
                setPlanExpireHours(Math.floor(hoursDifference));
                setSubcription_status(response.data.sub_status);
                setIsTrial(response.data.trial);
            },
        });
    };

    const getCreditStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/dashboard_credit_status`,
            auth: true,
            success: (response) => {
                setCreditsAvailable(response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription);
                setAddonCredit(response?.data?.credits_left?.addon);
                setSubscriptionCredit(response?.data?.credits_left?.subscription);
                if (response?.data?.credits_left?.total_buyed === 0) {
                    setProgressPercentage(0);
                } else {
                    setProgressPercentage(
                        (((response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription) / response?.data?.credits_left?.total_buyed) * 100).toFixed(2)
                    );
                }

            },
        });
    };

    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (availCreditOutside.current && !availCreditOutside.current.contains(e.target)) {
    //             setAvailCredits(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // });
    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (AppDropOutside.current && !AppDropOutside.current.contains(e.target)) {
    //             handleAppsDrpVisibility(false)
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // });

    useEffect(() => {
        if (logoutDrpVisibility) {
            getCreditStatus();
        }
    }, [logoutDrpVisibility]);

    useEffect(() => {
        getUserPlanDetails();
        getCreditStatus();
    }, [])

    const handleDownloadCurrentChapter = () => {
        console.log(document.querySelector('#download-current-chapter'));
        setIsCurrentChaperDownloading(true);
        document.querySelector('#download-current-chapter')?.click();
        setShowDownloadDrpDown(false);
    } 
    const handleDownloadFullBook = () => {
        console.log(document.querySelector('#download-all-book'));
        setIsFullBookDownloading(true);
        document.querySelector('#download-all-book')?.click();
        setShowDownloadDrpDown(false);
    } 

    return (
        <React.Fragment>
            <div className={(userDetails?.is_campaign && showCampaignCouponStrip) ? "navbar-writer-stripe-wrapper stick-top" : "navbar-writer-stripe-wrapper"}>
                {/* {(userDetails?.is_campaign && showCampaignCouponStrip) && (
                    <StartUpTNCampaignOffer />
                )} */}
                <nav
                    style={(props.showCustomSrcLangModal || props.showCustomTarLangModal || props.showDesigner) ? {zIndex: 0} : { zIndex: (logoutDrpVisibility || availCredits || AppsDrpVisibility) ? 100 : props.mobLeftSideBar ? 0 : 1 }}
                    id="navbar"
                    className={
                        (props.isWhite
                            ? "navbar writer-wrap navbar-expand-lg navbar-light ail-work-nav ail-workspace-white-nav2 "
                            : "navbar writer-wrap navbar-expand-lg navbar-light ail-work-nav ail-workspace-blue-nav ") + (!(userDetails?.is_campaign && showCampaignCouponStrip) ? "fixed-top" : "")
                    }
                >
                    {/* <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} /> */}
                    <Link className="navbar-display-logo" to="/file-upload?page=1&order_by=-id">
                        <img
                            src={TransWriterLogo}
                            alt="logo"
                        />
                    </Link>
                    {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                    <div className="align-items-center word-processor-wrap">
                        <div className="word-processor-inner-wrapper">
                            <ul className="navbar-nav nav-project-txt-align">
                                <li>
                                    {/* <div onClick={()=> {(props.prevPageInfo?.fromProjectList) ? history(`/file-upload?page=${props.prevPageInfo?.pageNo}&order_by=${props.prevPageInfo?.orderBy}${(props.prevPageInfo?.projectTypeFilter !== 'all' && props.prevPageInfo?.projectTypeFilter != null) ? `&filter=${props.prevPageInfo?.projectTypeFilter}` : ""}${props.prevPageInfo?.search != null ? `&search=${props.prevPageInfo?.search}` : ""}&open-project=${props.prevPageInfo?.projectId}`) : 
                                    props.isDocument ? history(`/documents-list?page=${1}`) : history(`/file-upload?page=${1}&order_by=-id`)}} className={props.isWhite ? "navbar-display-show" : "navbar-display-hide"}> */}
                                    <div
                                        // onMouseUp={()=> {!Config.userState?.is_internal_member ? history('/documents-list?page=1') : history('/file-upload?page=1&order_by=-id')}} 
                                        onClick={() => props.prevPathRef.current ? history(props.prevPathRef.current) : history('/file-upload?page=1&order_by=-id')}
                                        className={props.isWhite ? "navbar-display-show" : "navbar-display-hide"}
                                    >
                                        <div className="nav-projects-link icon">
                                            {/* <img src={Config.HOST_URL + "assets/images/new-ui-icons/chevron_left_black.svg"} /> <span>{(location.state?.from !== null && location.state?.from !== undefined) ? location.state?.from : "Back"}</span> */}
                                            <img src={ChevronLeftBlack} alt="back arrow" /> 
                                            {/* <span>{t("go_back")}</span> */}
                                        </div>
                                    </div>
                                </li>
                                <li
                                    className="nav-item active project-doc-name-ai"
                                    style={
                                        (window.location.pathname.includes('book-writing') && !window.location.search.includes('book')) ? 
                                        {opacity: 0, pointerEvents: 'none'} :
                                        {}
                                    }
                                >
                                    <div className="project-input-wrap writter-wrap">
                                        <div
                                            className={"project-box-ai " + ((props.isWriterDocumentRef.current || bookCreationResponseRedux !== null) ? "writer-doc" : "")}
                                            ref={props.documentNameRef}
                                            data-max-length="10"
                                            suppressContentEditableWarning={true}
                                            contentEditable={
                                                (props.isWriterDocumentRef.current || window.location.pathname.includes('book-writing') || window.location.search?.trim()?.length === 0) ? 
                                                true : false
                                            }
                                            data-placeholder={t("untitled_project")}
                                            onBlur={() => handleSaveBtn(true)}
                                            onKeyDown={handleProjectEnter}
                                            tabIndex={0}
                                        ></div>
                                    </div>
                                    {(props.writerProjectName !== "" && props.writerProjectName !== undefined) &&
                                        <div className="project-name d-flex align-items-center gap-5">
                                            <span className="project-name-ellipse">
                                                <Tooltip
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                bgcolor: '#2A2A2A',
                                                                '& .MuiTooltip-arrow': {
                                                                    color: '#2A2A2A',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    arrow title={props.writerProjectName ? props.writerProjectName : ""} placement="top-start">
                                                    <span>{props.writerProjectName}</span>
                                                </Tooltip>
                                            </span>
                                            {
                                                !isSaving ? (
                                                    <Tooltip
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    bgcolor: '#2A2A2A',
                                                                    '& .MuiTooltip-arrow': {
                                                                        color: '#2A2A2A',
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                        arrow title={isSaving ? t("saved") : t("save")} onMouseLeave={() => setTimeout(() => { setIsSaving(false) }, 500)} placement="top">
                                                        <CloudDoneOutlinedIcon style={{ color: '#5f6368', fontSize: "21px", cursor: 'pointer' }} onClick={() => handleSaveBtn(false)} />
                                                    </Tooltip>
                                                ) : (
                                                    <>
                                                        <CachedOutlinedIcon className="rotate" style={{ color: '#5f6368', fontSize: "21px" }} />
                                                        {/* <small>{t("saving")}</small> */}
                                                    </>
                                                )
                                            }
                                        </div>
                                    }
                                </li>


                            </ul>
                            <ul className="navbar-nav nav-project-txt-align">
                                <li className="nav-item active project-doc-name-ai">
                                    <Tooltip
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    bgcolor: '#2A2A2A',
                                                    '& .MuiTooltip-arrow': {
                                                        color: '#2A2A2A',
                                                    },
                                                },
                                            },
                                        }}
                                        arrow className="dont-open-list" title={t("ai_writing")} placement="bottom">
                                        <div
                                            className={(!props.historyTab && props.leftSideBar) ? 'nav-switch-icons active' : 'nav-switch-icons'}
                                            onMouseUp={() => {
                                                props.setLeftSideBar(true)
                                                props.setRightSideBar(true)
                                                props.setHistoryTab(false)
                                                props.setSplitViewTab(false)
                                            }}
                                        >
                                            <img src={NavIconOne} style={{ color: "#000" }} alt="ai-view" />
                                        </div>
                                    </Tooltip>
                                    <Tooltip
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    bgcolor: '#2A2A2A',
                                                    '& .MuiTooltip-arrow': {
                                                        color: '#2A2A2A',
                                                    },
                                                },
                                            },
                                        }}
                                        arrow className="dont-open-list" title={t("writer_mode")} placement="bottom">
                                        <div
                                            className={(!props.leftSideBar && !props.rightSideBar && !props.historyTab && !props.splitViewTab) ? 'nav-switch-icons active' : 'nav-switch-icons'}
                                            onMouseUp={() => {
                                                if ((document.querySelector('.note-editable') && document.querySelector('.note-editable-backdrop'))) {
                                                    document.querySelector('.note-editable-backdrop').style.setProperty('padding-left', '20%', 'important');
                                                    document.querySelector('.note-editable-backdrop').style.setProperty('padding-right', '20%', 'important');
                                                    document.querySelector('.note-editable').style.setProperty('padding-left', '20%', 'important');
                                                    document.querySelector('.note-editable').style.setProperty('padding-right', '20%', 'important');
                                                }
                                                props.setLeftSideBar(false)
                                                props.setRightSideBar(false)
                                                props.setHistoryTab(false)
                                                props.setSplitViewTab(false)
                                            }}
                                        >
                                            <img src={NavIconTwo} alt="full-screen-view" />
                                        </div>
                                    </Tooltip>
                                    {(!Config.userState?.internal_member_team_detail?.role !== "Editor" && !props.isTaskAssignedToMe) && <Tooltip
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    bgcolor: '#2A2A2A',
                                                    '& .MuiTooltip-arrow': {
                                                        color: '#2A2A2A',
                                                    },
                                                },
                                            },
                                        }}
                                        arrow className="dont-open-list" title={t("content_history")} placement="bottom">
                                        <div
                                            className={props.historyTab ? 'nav-switch-icons active' : 'nav-switch-icons'}
                                            onMouseUp={() => {
                                                // props.setLeftSideBar(false)
                                                // props.setRightSideBar(false)
                                                props.setHistoryTab(true)
                                                props.setSplitViewTab(false)
                                            }}
                                        >
                                            <RestoreIcon className="history-icon" />
                                        </div>
                                    </Tooltip>}
                                    {props.isAudioOrPdf === 'pdf' && <Tooltip
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    bgcolor: '#2A2A2A',
                                                    '& .MuiTooltip-arrow': {
                                                        color: '#2A2A2A',
                                                    },
                                                },
                                            },
                                        }}
                                        arrow className="dont-open-list" title={t("pdf_split_mode")} placement="bottom">
                                        <div
                                            className={props.splitViewTab ? 'nav-switch-icons active' : 'nav-switch-icons'}
                                            onMouseUp={() => {
                                                if ((document.querySelector('.note-editable') && document.querySelector('.note-editable-backdrop'))) {
                                                    document.querySelector('.note-editable-backdrop').style.setProperty('padding-left', '5%', 'important');
                                                    document.querySelector('.note-editable-backdrop').style.setProperty('padding-right', '5%', 'important');
                                                    document.querySelector('.note-editable').style.setProperty('padding-left', '5%', 'important');
                                                    document.querySelector('.note-editable').style.setProperty('padding-right', '5%', 'important');
                                                }

                                                props.setLeftSideBar(false)
                                                props.setRightSideBar(false)
                                                props.setHistoryTab(false)
                                                props.setSplitViewTab(true)
                                            }}
                                        >
                                            <SplitViewIcon />
                                        </div>
                                    </Tooltip>}

                                </li>
                            </ul>
                            <ul className="navbar-nav navbar-nav-right-links my-2 my-lg-0" ref={outsideClick}>
                                {/* 
                            {isAudioOrPdf !== null && <li style={!props.historyTab ? {opacity: 1, whiteSpace: 'nowrap'} : {opacity: 0, pointerEvents: 'none', whiteSpace: 'nowrap'}} className="px-2  ">
                                <Tooltip 
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            bgcolor: '#2A2A2A',
                                            '& .MuiTooltip-arrow': {
                                            color: '#2A2A2A',
                                            },
                                        },
                                    },
                                }}
                                arrow className="dont-open-list" title={isAudioOrPdf === 'audio' ? "Listen to source audio file" : "View source PDF file"} placement="top">
                                    <button className="navbar-writter-translate-button" type="button" onMouseUp={() => {dispatch(toggleDialogDisplay(true))}}>
                                        <img className="writter-translate-icon"  src={import.meta.env.PUBLIC_URL + "/assets/images/new-ui-icons/translate_black.svg"} alt="translate" />
                                        <span className="writter-translate">{isAudioOrPdf === 'audio' ? 'Listen audio' : 'View PDF'}</span>
                                    </button>
                                </Tooltip>
                            </li>} */}

                                {props?.showSetAsTranslationBtn &&
                                    <li style={!props.historyTab ? { opacity: 1, whiteSpace: 'nowrap' } : { opacity: 0, pointerEvents: 'none', whiteSpace: 'nowrap' }} className="pr-1">
                                        <Tooltip
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: '#2A2A2A',
                                                        '& .MuiTooltip-arrow': {
                                                            color: '#2A2A2A',
                                                        },
                                                    },
                                                },
                                            }}
                                            arrow className="dont-open-list" title={t("create_trans_from_this_doc")} placement="top">
                                            <button className="navbar-writter-translate-button" type="button" onClick={() => !props.isTranslateProceeding && props.handleTranslateBtn()}>
                                                {/* <img className="writter-translate-icon"  src={import.meta.env.PUBLIC_URL + "/assets/images/new-ui-icons/translate_black.svg"} alt="translate" /> */}
                                                {props.isTranslateProceeding ? (
                                                    <CircularProgress sx={{ color: 'grey.500' }} style={{height: '16px', width: '16px'}} />
                                                ) : (
                                                    <TranslateIcon className="writter-translate-icon" />
                                                )}
                                                {/* <span className="writter-translate">{t("set_trans_proj")}</span> */}
                                            </button>
                                        </Tooltip>
                                    </li>
                                }

                                {
                                    props.showSubmitDocment &&
                                    <li style={!props.historyTab ? { opacity: 1, whiteSpace: 'nowrap' } : { opacity: 0, pointerEvents: 'none', whiteSpace: 'nowrap' }} className="px-3">
                                        <Tooltip
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: '#2A2A2A',
                                                        '& .MuiTooltip-arrow': {
                                                            color: '#2A2A2A',
                                                        },
                                                    },
                                                },
                                            }}
                                            arrow className="dont-open-list" title={t("submit_document")} placement="top">
                                            <button className="navbar-writter-translate-button" type="button" onMouseUp={handleDocumentSubmit}>
                                                <span className="writter-translate">{t("submit")}</span>
                                            </button>
                                        </Tooltip>
                                    </li>
                                }

                                {/* {(!Config.userState?.is_internal_member) &&  
                            <li ref={availCreditOutside}>
                                <span  onClick={() => getcreditstoggle()} className="ailaysacrediticon-grey">
                                    <img src={ Config.HOST_URL + "assets/images/icons/ailaysaCreditIcon-grey.svg"} alt='ailaysaCreditIcon'/>
                                </span>
                                {
                                    availCredits && 
                                    <div className="credits-score-box writer-credit-box">
                                        <div className="avail-credits-box">
                                            <div className="credits-num-wrap">
                                                <p>{creditsAvailable?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                <ButtonBase onClick={openAddOn} className="cred-addon-btn">
                                                    <AddIcon className="plus"/>
                                                </ButtonBase>
                                            </div>
                                            <p className="avail-cred">{t("available_credits")}</p>
                                            <div className="cred-bar-completion-wrap">
                                                <div className="cred-bar-completion">
                                                    <div
                                                        className="credits-bar-file-completion"
                                                        style={{
                                                            width: `${progressPercentage}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"plan-info-row " + (((currentPlan === "PRO" || currentPlan === "BUSINESS") && isCurrentPlanTrial ) ? "" : "pb-0")}>
                                            <div className="current-plan">
                                                <span className="title">{t("current_plan")}</span>
                                                <span className="plan-name">
                                                    {isPlanCancelled ? 'N/A' : currentPlan} 
                                                </span>
                                            </div>
                                            {
                                                currentPlan !== "PRO - V" &&
                                                <p className="subscrip-link" onClick={openSubcription}>{t("manage_subscription")}</p>
                                            }
                                        </div>
                                        {
                                            ((currentPlan === "PRO" || currentPlan === "BUSINESS") && isCurrentPlanTrial ) &&
                                            <p className="plan-content">{t("avail_credits_trial_note")}</p>
                                        }
                                    </div>
                                }
                            </li>} */}

                                {(!window.location.pathname?.includes('book-writing') && Config.userState?.internal_member_team_detail?.role !== "Editor" && !props.isTaskAssignedToMe) &&
                                    <li
                                        style={!props.historyTab ? { opacity: 1 } : { opacity: 0, pointerEvents: 'none' }}
                                        className="nav-writter-download"
                                        onMouseUp={() => !props.isDocxFileDownloading && props.getHtmlToDocxFileBlob('download')}
                                    >
                                        <Tooltip
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: '#2A2A2A',
                                                        '& .MuiTooltip-arrow': {
                                                            color: '#2A2A2A',
                                                        },
                                                    },
                                                },
                                            }}
                                            arrow className="dont-open-list" title={props.isDocxFileDownloading ? t('downloading') : t("download")} placement="top">
                                            <span>
                                                {
                                                    props.isDocxFileDownloading ?
                                                        <DownloadAnimation />
                                                        :
                                                        <img
                                                            src={FileDownload}
                                                            alt="download"
                                                        />
                                                }
                                            </span>
                                        </Tooltip>
                                    </li>
                                }

                                {(window.location.pathname?.includes('book-writing') && !props.showPlaceHolderDivForBook) &&
                                    <li className="nav-item nav-drp-down-new active">
                                        <div
                                            className="nav-icon-bg"
                                            onClick={() => {
                                                handleDownloadDrpVisibility(!showDownloadDrpDown)
                                                handleLogoutDrpVisibility(false);
                                                handleAppsDrpVisibility(false);
                                            }}>
                                            <img
                                                src={FileDownload}
                                                alt="download"
                                            />
                                        </div>
                                        <ul className={`submenu submenu-animated submenu_fadeIn ${showDownloadDrpDown ? "show" : ""}`}>
                                            
                                            <li>
                                                <a 
                                                    onClick={() => !isCurrentChaperDownloading && handleDownloadCurrentChapter()}
                                                    onMouseLeave={() => setTimeout(() => {setIsCurrentChaperDownloading(false)}, 500)}
                                                >
                                                    {t("download_current_page")}
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                onClick={() => !isFullBookDownloading && handleDownloadFullBook()}
                                                onMouseLeave={() => setTimeout(() => {setIsFullBookDownloading(false)}, 500)}
                                                >
                                                    {t("download_full_book")}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                }
                                <li>
                                    {!isDinamalar && (
                                        <Tooltip title={t("apps")} arrow placement="bottom">
                                            <div
                                                onClick={() => {
                                                    handleLogoutDrpVisibility(false);
                                                    handleAppsDrpVisibility(!AppsDrpVisibility);
                                                    handleDownloadDrpVisibility(false)
                                                }}
                                                className="nav-icon-bg apps">
                                                {/* <AppsIcon className={props.isWhite ? "black" : "white"}/> */}
                                                <AppsIcon style={props.isWhite ? "black" : "white"} />
                                            </div>
                                        </Tooltip>
                                    )}
                                    <div
                                        className={
                                            AppsDrpVisibility
                                                ? "apps-dropdown-wrapper show"
                                                : "apps-dropdown-wrapper hide"
                                        }
                                        ref={AppDropOutside}
                                    >
                                        <p className="title">{t("apps")}</p>
                                        <ul className="apps-ui-list">
                                            { !window.location.pathname.includes("file-upload") &&
                                                <li>
                                                    <a className="nav-link" target="_blank" href={'/file-upload?page=1&order_by=-id'} onClick={() => handleAppsDrpVisibility(false)}>
                                                        <img src={ProjectsIcon} alt="projects" />
                                                        <span>{t("projects")}</span>
                                                    </a>
                                                </li>
                                            }
                                            { !window.location.pathname.includes("translations") &&
                                                <li>
                                                    <a className="nav-link" target="_blank" href={'/translations?page=1'} onClick={() => handleAppsDrpVisibility(false)}>
                                                        <img src={TranseditorIcon} alt="projects" />
                                                        <span>{t("transeditor")}</span>
                                                    </a>
                                                </li>
                                            }
                                            
                                            { !window.location.pathname.includes("designs") &&
                                                    <li>
                                                        <a className="nav-link" target="_blank" href={Config.DESIGNER_HOST} onClick={() => handleAppsDrpVisibility(false)}>
                                                            <img src={DesignerIcon} alt="projects" />
                                                            <span>{t("design")}</span>
                                                        </a>
                                                    </li>
                                            }
                                             { !window.location.pathname.includes("transcriptions") &&
                                                    <li>
                                                        <a className="nav-link" target="_blank" href={'/transcriptions?page=1'} onClick={() => handleAppsDrpVisibility(false)}>
                                                            <img src={TranscribeIcon} alt="projects" />
                                                            <span>{t("transcription")}</span>
                                                        </a>
                                                    </li>
                                            }
                                            { !window.location.pathname.includes("ai-voices") &&
                                                    <li>
                                                        <a className="nav-link" target="_blank" href={'/ai-voices?page=1'} onClick={() => handleAppsDrpVisibility(false)}>
                                                            <img src={VoiceIcon} alt="projects" />
                                                            <span>{t("ai_voice")}</span>
                                                        </a>
                                                    </li>
                                            }
                                            { !window.location.pathname.includes("chat-books") &&
                                                <li>
                                                    <a className="nav-link" target="_blank" href={'/chat-books'} onClick={() => handleAppsDrpVisibility(false)}>
                                                        <img src={ChatbookIcon} alt="projects" />
                                                        <span>{t("chat_book")}</span>
                                                    </a>
                                                </li>
                                            }
                                            {/* { !window.location.pathname.includes("assets") &&
                                                    <li>
                                                        <a className="nav-link" target="_blank" href={'/assets?page=1'} onClick={() => handleAppsDrpVisibility(false)}>
                                                            <img src={Config.HOST_URL + "assets/images/ai-speech.svg"} alt="projects" />
                                                            <span>{t("glossary")}</span>
                                                        </a>
                                                    </li>
                                            } */}
                                            {Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                                                <li>
                                                    <a className="nav-link" target="_blank" href={Config.MARKETPLACE_HOST} onClick={() => handleAppsDrpVisibility(false)}>
                                                        <img src={MarketplaceIcon} alt="markteplace" />
                                                        <span>{t("marketplace")}</span>
                                                    </a>
                                                </li>
                                            }  
                                        </ul>

                                    </div>
                                </li>

                                <li
                                    onClick={(e) => {
                                        handleAppsDrpVisibility(false)
                                        handleLogoutDrpVisibility(!logoutDrpVisibility);
                                        handleDownloadDrpVisibility(false)
                                    }}
                                    className="nav-item nav-drp-down active"
                                >
                                    <span className="nav-link avatar">
                                        {(Config?.userState?.image_url != null && Config?.userState?.image_url !== undefined) ? (
                                            <>
                                                <img
                                                    className="img-align-radius"
                                                    src={
                                                        Config?.userState?.image_url?.charAt(0) === "/"
                                                            ? Config?.BASE_URL + Config.userState?.image_url
                                                            : Config?.userState?.image_url
                                                    }
                                                    alt="prof-pic"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div
                                                    className={
                                                        props.isWhite
                                                            ? "ailays-wp-avatar-blue ailays-wp-avatar-bg-grey-color"
                                                            : "ailays-wp-avatar ailays-wp-avatar-bg-blue-color"
                                                    }
                                                >
                                                    {
                                                        Config.userState?.name?.charAt(0)?.toUpperCase() !== '' ?
                                                            Config.userState?.name?.charAt(0)?.toUpperCase() :
                                                            Config.userState?.email?.charAt(0)?.toUpperCase()
                                                    }
                                                </div>
                                            </>
                                        )}
                                    </span>
                                    <ul
                                        className={
                                            logoutDrpVisibility ? "submenu-1 submenu-1-active submenu-animated submenu_fadeIn" : "submenu-1 submenu-animated submenu_fadeIn"
                                        }
                                    >
                                        <li className="acc-details">
                                            <div className="acc-details-profile">
                                                {(Config?.userState?.image_url != null && Config?.userState?.image_url !== undefined) ? (
                                                    <>
                                                        <img className="drp-down-profile-icon" src={Config.BASE_URL + Config.userState?.image_url} alt="prof-pic" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="drp-down-no-profile-icon">
                                                            {
                                                                Config.userState?.name?.charAt(0)?.toUpperCase() !== '' ?
                                                                    Config.userState?.name?.charAt(0)?.toUpperCase() :
                                                                    Config.userState?.email?.charAt(0)?.toUpperCase()
                                                            }
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="acc-member-info">
                                                <p className="name">{Config.userState?.name}</p>
                                                <p className="email">{Config.userState?.email}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="nav-link" target="_blank" href={Config.USER_PORTAL_HOST}>
                                                {t("my_account")}
                                            </a>
                                        </li>
                                        {/* <li>
                                        <a className="nav-link" target="_blank" href={'/file-upload?page=1&order_by=-id'}>
                                            My projects
                                        </a>
                                    </li>
                                    {  Config.userState?.internal_member_team_detail?.role !== 'Editor' && <li>
                                        <a className="nav-link" target="_blank" href={Config.MARKETPLACE_HOST}> 
                                            Marketplace 
                                        </a>
                                    </li>} */}
                                        {Config.userState?.user_status == false ? (
                                            <li>
                                                <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/dashboard"}>
                                                    <div className="submenu-plan-details">
                                                        <p className="plan-details deactive-acc">
                                                            {currentPlan}
                                                            <span>{t("account_deactivated")}</span>
                                                        </p>
                                                    </div>
                                                </a>
                                            </li>
                                        ) :
                                            //  subcription_status == "trialing" ? (
                                            //     <li>
                                            //         <div className="submenu-plan-details">
                                            //             <p className="plan-details">
                                            //                 {currentPlan}
                                            //                 <span>
                                            //                     {t("trail_expires_in")}
                                            //                     {planExpireDays > 1 || planExpireHours >= 24
                                            //                         ? " " + (planExpireDays + (planExpireDays > 1 ? (" " + t("days")) : (" " + t("day"))))
                                            //                         : " " + (planExpireHours + (planExpireHours > 1 ? (" " + t("hours")) : (" " + t("hour"))))}
                                            //                 </span>
                                            //             </p>
                                            //             <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/subscription-plans"}>
                                            //                 <p className="new-head">{t("subscribe")}</p>
                                            //             </a>
                                            //         </div>
                                            //     </li>
                                            // ) :
                                            //  subcription_status == "canceled" ? (
                                            //     isTrial ? (
                                            //         <li>
                                            //             <div className="submenu-plan-details">
                                            //                 <p className="plan-details">
                                            //                     {currentPlan}
                                            //                     <span>{t("plan_expired")}</span>
                                            //                 </p>
                                            //                 <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/subscription-plans"}>
                                            //                     <p className="new-head">{t("subscribe")}</p>
                                            //                 </a>
                                            //             </div>
                                            //         </li>
                                            //     ) : (
                                            //         <li>
                                            //             <div className="submenu-plan-details">
                                            //                 <p className="plan-details">
                                            //                     {currentPlan}
                                            //                     <span>{t("plan_expired")}</span>
                                            //                 </p>
                                            //                 <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/dashboard"}>
                                            //                     <p className="new-head">{t("renew")}</p>
                                            //                 </a>
                                            //             </div>
                                            //         </li>
                                            //     )
                                            // ) : subcription_status == "active" && planExpireDays <= 3 ? (
                                            //     <li>
                                            //         <a className="text-decoration-none" href="#">
                                            //             <div className="submenu-plan-details">
                                            //                 <p className="plan-details">
                                            //                     {currentPlan}
                                            //                     <span>
                                            //                         {t("plan_renews_in")}
                                            //                         {planExpireDays >= 1
                                            //                             ? " " + (planExpireDays + (planExpireDays > 1 ? (" " + t("days")) : (" " + t("day"))))
                                            //                             : " " + (planExpireHours + (planExpireHours > 1 ? (" " + t("hours")) : (" " + t("hour"))))}
                                            //                     </span>
                                            //                 </p>
                                            //             </div>
                                            //         </a>
                                            //     </li>
                                            // ) : 
                                            subcription_status == "past_due" ? (
                                                isTrial ? (
                                                    <li>
                                                        <div className="submenu-plan-details">
                                                            <p className="plan-details">
                                                                {currentPlan}
                                                                <span>{t("plan_is_overdue")}</span>
                                                            </p>
                                                            <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/subscription-plans"}>
                                                                <p className="new-head">{t("subscribe")}</p>
                                                            </a>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <div className="submenu-plan-details">
                                                            <p className="plan-details">
                                                                {currentPlan}
                                                                <span>{t("plan_is_overdue")}</span>
                                                            </p>
                                                            <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/dashboard"}>
                                                                <p className="new-head">{t("renew")}</p>
                                                            </a>
                                                        </div>
                                                    </li>
                                                )
                                            ) : null}
                                        {!is_internal_meber_editor && (
                                            <li>
                                                <div className="credits-score-box"  >
                                                    <div className="avail-credits-box">
                                                        <p className="avail-cred">{t("available_credits")}</p>
                                                        <div className="credits-num-wrap">
                                                            <div className="num-inner-wrap">
                                                                {
                                                                    progressPercentage === 0 ?
                                                                        <p className="exhausted-credit">{t("credits_exhaust")}:</p>
                                                                        :
                                                                        <p className={"credits " + (progressPercentage === 90 && "danger-credit")}>{creditsAvailable?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                                }
                                                                {
                                                                    (progressPercentage === 90 || progressPercentage === 0) ?
                                                                        <p onClick={openAddOn} className="link">{t("buy_now")}!</p>
                                                                        :
                                                                        ""
                                                                }
                                                            </div>
                                                            {
                                                                (progressPercentage === 90 || progressPercentage === 0) ?
                                                                    ""
                                                                    :
                                                                    <Tooltip title="Add more credits" arrow placement="left">
                                                                        <ButtonBase onClick={openAddOn} className="cred-addon-btn">
                                                                            <AddIcon className="plus" />
                                                                        </ButtonBase>
                                                                    </Tooltip>
                                                            }
                                                        </div>
                                                        <div className="cred-bar-completion-wrap">
                                                            <div className="cred-bar-completion">
                                                                <div
                                                                    className="credits-bar-file-completion"
                                                                    style={{
                                                                        width: `${progressPercentage}%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className={"plan-info-row " + (((currentPlan === "PRO" || currentPlan === "BUSINESS") && isCurrentPlanTrial ) ? "" : "pb-0")}>
                                                    <div className="current-plan">
                                                        <span className="title">{t("current_plan")}</span>
                                                        <span className="plan-name">
                                                            {isPlanCancelled ? 'N/A' : currentPlan} 
                                                        </span>
                                                    </div>
                                                    {
                                                        currentPlan !== "PRO - V" &&
                                                        <p className="subscrip-link" onClick={openSubcription}>{t("manage_subscription")}</p>
                                                    }
                                                </div>
                                                {
                                                    ((currentPlan === "PRO" || currentPlan === "BUSINESS") && isCurrentPlanTrial ) &&
                                                    <p className="plan-content">{t("avail_credits_trial_note")}</p>
                                                } */}
                                                </div>
                                            </li>
                                        )}
                                        <li>
                                            <span className="logout-cls nav-link" onClick={(e) => logout()}>
                                                {t("logout")}
                                            </span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            {/* <Prompt
                when={downloadpending == true}
                message={handleBlockedNavigation}
            /> */}
            <ReactRouterPrompt when={downloadpending == true}>
            {({ isActive, onConfirm, onCancel }) => {
                return (
                    <Rodal
                        // visible={navigationModalVisible}
                        visible={isActive}
                        showCloseButton={false}
                        className="ai-mark-confirm-box"
                        onClose={() => console.log()}
                    >
                        <div className="confirmation-warning-wrapper">
                            <div className="confirm-top">
                                <div><span onClick={onCancel}><CloseIcon /></span></div>
                                <div>{t("leave_page_confirm_head")}</div>
                                <div>{t("leave_page_confirm_para_when_dowload")}</div>
                            </div>
                            <div className="confirm-bottom">
                                <div>
                                    <Button onClick={onCancel}>{t("stay")}</Button>
                                    <Button onClick={onConfirm} variant="contained">{t("leave")}</Button>
                                </div>
                            </div>
                        </div>
                    </Rodal>
                )
            }}
            </ReactRouterPrompt>

            {navigationModalVisible && (<Rodal
                // visible={navigationModalVisible}
                visible={navigationModalVisible}
                showCloseButton={false}
                onclose={() => { }}
                className="ai-mark-confirm-box"
                onClose={() => console.log()}
            >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setNavigationModalVisible(false) }}><CloseIcon /></span></div>
                        <div>{t("leave_page_confirm_head")}</div>
                        <div>{t("leave_page_confirm_para_when_dowload")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setNavigationModalVisible(false) }}>{t("stay")}</Button>
                            <Button onClick={handleConfirmNavigationClick} variant="contained">{t("leave")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}

        </React.Fragment>
    );
}

export default Navbar;
