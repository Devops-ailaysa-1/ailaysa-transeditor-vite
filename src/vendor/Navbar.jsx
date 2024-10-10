import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Config from "./Config";
import Tooltip from '@mui/material/Tooltip';
import useSound from "use-sound";
import notificationSound from "../sound/notification.mp3";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ButtonBase from '@mui/material/ButtonBase';
// import ConfirmationModal from "../project-setup-components/rodals/ConfirmationModal";
import SimpleRodals from "../project-setup-components/rodals/SimpleRodals";
// import LocalizationLanguageSwitcher from "../localization/LocalizationLanguageSwitch";
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import axios from "axios";
import Cookies from "js-cookie";
import { ClickAwayListener } from "@mui/base";
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useTranslation } from "react-i18next";
import DownloadAnimation from "../animation-styles/downloading-animation/DownloadAnimation";
import generateKey from "../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey";
import { useDispatch, useSelector } from "react-redux";
import { addDownloadingFiles, updateDownloadingFile, deleteDownloadingFile } from "../features/FileDownloadingListSlice";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// mui icons
import CloseIcon from '@mui/icons-material/Close';
import AppsIcon from "./styles-svg/AppsIcon";
import StartUpTNCampaignOffer from "./model-select/StartUpTNCampaignOffer";
import WorkspaceLogo from "../assets/images/new-ui-icons/new-ailyasa-wrkspace-logo.svg"
import ChatBookLogo from "../assets/images/ailaysa-chat-books.svg"
import ProjectsLogo from "../assets/images/new_projects_logo_new.svg"
import ChevronLeftBlack from "../assets/images/new-ui-icons/chevron_left_black.svg"
import ArrowRightAltColor from "../assets/images/new-ui-icons/arrow_right_alt_color.svg"
import HelpOutlineGrey from "../assets/images/new-ui-icons/help_outline_grey.svg"
import HelpOutline from "../assets/images/new-ui-icons/help_outline.svg"
import FileDownload from "../assets/images/new-ui-icons/file_download.svg"
import ProjectsIcon from "../assets/images/ai-projects.svg"
import WriterIcon from "../assets/images/ai-writer.svg"
import TranseditorIcon from "../assets/images/ai-transeditor.svg"
import DesignerIcon from "../assets/images/ai-designer.svg"
import TranscribeIcon from "../assets/images/ai-transcribe.svg"
import VoiceIcon from "../assets/images/ai-voice.svg"
import ChatbookIcon from "../assets/images/ai-chatbook.svg"
import MarketplaceIcon from "../assets/images/ai-marketplace.svg"
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TaskAssignActionButtons from "./workspace-components/TaskAssignActionButtons";
import ReactRouterPrompt from 'react-router-prompt'
import { GlossaryMenuDrpDown } from "./model-select/Ailaysa-Glossaries/glossary-menu/GlossaryMenuDrpDown";
import { Badge } from "@mui/material";
import { setShowAdaptiveMTIntroModal } from "../features/ShowAdaptiveTransIntroModalSlice";

function Navbar(props) {

    const {
        showDocumentSubmitButton,
        enableDocumentSubmitBtn,
        handleDocumentSubmitBtn,
        showReturnRequestBtn,
        isWorkspaceEditable,
        isAiChatBook,
        isFederalWorkspace,
        documentTaskIdRef,
        mobileVersion,
        aiChatMobileTab,
        handlePreviousPage,
        showTaskAssignActionBtn,
        showViewOnlyTag
    } = props

    const { t } = useTranslation();
    const queryParams = new URLSearchParams(window.location)
    const history = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails.value)
    const showCampaignCouponStrip = useSelector((state) => state.campaignCouponStrip.value)

    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor'
    let isEnterprise = userDetails?.is_enterprise 
    // && userSubscriptionDetails?.subscription_name === "Enterprise - TFN"
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value)


    const [didMount, setDidMount] = useState(false);
    // const [fromAilaysa, setFromAilaysa] = useState(false);
    const [myProjectsSelected, setMyProjectsSelected] = useState(false);
    const [AppsDrpVisibility, setAppsDrpVisibility] = useState(false);
    const [logoutDrpVisibility, setLogoutDrpVisibility] = useState(false);
    const [helpDrpVisibility, setHelpDrpVisibility] = useState(false);
    const [chatNotification, setChatNotification] = useState(null);
    const [sourceLanguage, setSourceLanguage] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState(null);
    const [targetLanguageScript, setTargetLanguageScript] = useState(null);
    const [projectName, setProjectName] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isPlanCancelled, setIsPlanCancelled] = useState(false)
    const [planExpireDays, setPlanExpireDays] = useState(null);
    const [planExpireHours, setPlanExpireHours] = useState(null);
    const [subcription_status, setSubcription_status] = useState("");
    const [isTrial, setIsTrial] = useState(null);
    const [chatNotificationsCount, setChatNotificationsCount] = useState(0);
    const [chatNotifications, setChatNotifications] = useState([]);
    const [selectedTab, setSelectedTab] = useState(1);
    const [isDownloadCondition, setIsDownloadCondition] = useState(false)
    const [downloadParameters, setDownloadParameters] = useState({})
    const [assetsBtnHide, setAssetsBtnHide] = useState(false)
    const [hideburgaricon, setHideburgaricon] = useState(false)
    const outsideClick = useRef();
    const [downloadOpen, setDownloadOpen] = useState(false);
    // const [downloadSelectedIndex, setDownloadSelectedIndex] = useState(1);

    const [playNotificationSound] = useSound(notificationSound);

    const [translatedAudioAlertModal, setTranslatedAudioAlertModal] = useState(false)
    const [downloadConfirmationModalVisible, setDownloadConfirmationModalVisible] = useState(false)
    const [isAnySegmentConfirmed, setIsAnySegmentConfirmed] = useState(false)
    const [showZeroSegmentAlertModal, setShowZeroSegmentAlertModal] = useState(false)
    const [isHelpVisible, setIsHelpVisible] = useState(false)
    const [showDownloadingModal, setShowDownloadingModal] = useState(false)
    const [downloadTrigger, setDownloadTrigger] = useState(false)
    const [myNewsProjectsSelected, setMyNewsProjectsSelected] = useState(false);

    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null)

    const [celeryId, setCeleryId] = useState(null)

    const [isFileUnderProcess, setIsFileUnderProcess] = useState(false)
    const [isAudioConverting, setIsAudioConverting] = useState(false)
    const [animateDownloding, setAnimateDownloding] = useState(null)

    const socket = useRef(null);
    const chatNotificationsCountRef = useRef(null);
    const isNewNotification = useRef(true);
    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)
    const downloadAnchorRef = useRef(null);
    const userEmailRef = useRef(null);
    const userFullnameRef = useRef(null);

    const [downloadpending, setDownloadpending] = useState(false)

    const { pathname } = useLocation()
    const [navigationModalVisible, setNavigationModalVisible] = useState(false)
    const [lastLocation, setLastLocation] = useState(null)
    const [confirmedNavigation, setConfirmedNavigation] = useState(false)



    const availCreditOutside = useRef();
    const chatOutside = useRef();
    const AppDropOutside = useRef();
    const HelpOutside = useRef();
    const logoutDropOutside = useRef();
    const [creditsAvailable, setCreditsAvailable] = useState(null);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [isCurrentPlanTrial, setIsCurrentPlanTrial] = useState(null)
    const [availCredits, setAvailCredits] = useState(false);
    const [subscriptionCredit, setSubscriptionCredit] = useState(0);
    const [addonCredit, setAddonCredit] = useState(0);

    const [showdocCreditCheckAlert, setShowDocCreditCheckAlert] = useState(false)

    const mtRawDownloadRetryLimit = useRef(2)
    const mtRawDownloadRetryCounter = useRef(0)
    const newProjectBoxRef = useRef()

    const [isEmailTextHovered, setIsEmailTextHovered] = useState(false);
    const [isFullnameTextHovered, setIsFullnameTextHovered] = useState(false);

    const spellCheckData = useSelector((state) => state.spellCheckData.value)

    const handleEmailTextMouseEnter = () => {
        setIsEmailTextHovered(true);
    };

    const handleEmailTextMouseLeave = () => {
        setIsEmailTextHovered(false);
    };

    const handleFullnameTextMouseEnter = () => {
        setIsFullnameTextHovered(true);
    };

    const handleFullnameTextMouseLeave = () => {
        setIsFullnameTextHovered(false);
    };

    const openAddOn = () => {
        window.open(Config.USER_PORTAL_HOST + "/add-ons")
        handleAppsDrpVisibility(false)
    }

    const openSubcription = () => {
        window.open(Config.USER_PORTAL_HOST + "/subscription-plans")
        setAvailCredits(false)
    }

    const getCreditStatus = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/dashboard_credit_status`,
            auth: true,
            success: (response) => {
                setCreditsAvailable(response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription);
                setAddonCredit(response?.data?.credits_left?.addon);
                setSubscriptionCredit(response?.data?.credits_left?.subscription);
                // console.log(response?.data?.credits_left?.total_buyed)
                // console.log(progressPercentage)
                if (response?.data?.credits_left?.total_buyed === 0) {
                    setProgressPercentage(0)
                } else {
                    setProgressPercentage(
                        (((response?.data?.credits_left?.addon + response?.data?.credits_left?.subscription) / response?.data?.credits_left?.total_buyed) * 100).toFixed(2)
                    )
                }

            },
        });
    };

    // const hideAvailCredits = () => {
    //     if (AppsDrpVisibility || chatNotification || logoutDrpVisibility) {
    //         handleAppsDrpVisibility(false)
    //         handleChatNotificationVisibility(false)
    //         handleLogoutDrpVisibility(false)
    //     }
    // }

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


    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (HelpOutside.current && !HelpOutside.current.contains(e.target)) {
    //             handleHelpDrpVisibility(false)
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // });


    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (chatOutside.current && !chatOutside.current.contains(e.target)) {
    //             handleChatNotificationVisibility(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // });

    useEffect(() => {
        if (logoutDrpVisibility) {
            getCreditStatus()
        }
    }, [logoutDrpVisibility])

    useEffect(() => {
        getCreditStatus()
    }, [])

    const getcreditstoggle = () => {
        setAvailCredits(!availCredits)
    }

    useEffect(() => {
        if( window.location.pathname.includes("file-upload") ||
            window.location.pathname.includes("documents-list") || 
            window.location.pathname.includes("translations") ||
            window.location.pathname.includes("designs") ||
            window.location.pathname.includes("transcriptions") ||
            window.location.pathname.includes("ai-voices") ||
            (window.location.pathname.includes("assets") && !window.location.pathname.includes('all-templates/assets')) ||
            (window.location.pathname.includes("toolkit") && !window.location.pathname.includes('all-templates/toolkit'))
        ) {
                setMyProjectsSelected(true)
        }
        else if(window.location.pathname.includes("all-stories") ||
        window.location.pathname.includes("my-stories") ||
        window.location.pathname.includes("add-stories") ){
            setMyNewsProjectsSelected(true)
        } else{
            setMyProjectsSelected(false)
            setMyNewsProjectsSelected(false)
        }
    }, [window.location.pathname])
    
    // console.log(myProjectsSelected)
    // const OpeningProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#FFFFFF",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "0px",
    //         "&:hover": {
    //             backgroundColor: "#FFFFFF",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    // const OpenProjectButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         padding: "7px 26.625px",
    //         "&:hover": {
    //             backgroundColor: "#0078D4",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    // const DrpDownArrowButton = withStyles((theme) => ({
    //     root: {
    //         boxShadow: "none",
    //         textTransform: "none",
    //         padding: 0,
    //         minWidth: 20,
    //         "&:hover": {
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    const handleDrpDownToggle = () => {
        setDownloadOpen((prevOpen) => !prevOpen);
    };


    const handleDrpDownClose = (event) => {
        if (downloadAnchorRef.current && downloadAnchorRef.current.contains(event.target)) {
            return;
        }
        setDownloadOpen(false);
    };

    const handleYes = () => {
        downloadFile(downloadParameters.e, downloadParameters.type)
        setDownloadConfirmationModalVisible(false);
    }

    const handleAudioAlertModalYes = () => {
        // console.log()
        downloadFile(downloadParameters.e, downloadParameters.type)
    }


    useEffect(() => {
        setDidMount(true); //Make component mounted
        getSelectedTab();
        // if ("fromAilaysa" in Config?.userState) {
        //     //Check if came from ailaysa.com
        //     if (Config?.userState.fromAilaysa) setFromAilaysa(Config?.userState.fromAilaysa);
        // }

        getUserPlanDetails();
        /* Enable the websocket connection - start */
        let endpoint = `${Config.CHAT_BASE_URL.replace("http", "ws")}/marketplace/messages/?${Config.userState.id}`;
        socket.current = new WebSocket(endpoint);
        return () => {
            socket.current.close();
            socket.current = null;
        };
        /* Enable the websocket connection - end */
        // document.title = '';
        // setTimeout(() => {
        //     document.title = 'Ailaysa | Projects';
        // }, 10);
    }, []);

    /* When props changes, set the values */
    useEffect(() => {
        setSourceLanguage(props?.sourceLanguage);
        setTargetLanguage(props?.targetLanguage);
        setTargetLanguageScript(props?.targetLanguageScript);
        setProjectName(props?.projectName);
        setFileName(props?.fileName);
    }, [props]);

    useEffect(() => {
        //   console.log()
        if (window.location.href?.includes('file-upload') || window.location.href?.includes('/workspace/')) {
            setIsHelpVisible(true)
        }
        else {
            if (window.location.href?.includes('documents-list')) {
                setIsHelpVisible(false)
            }
        }
    })

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // Navigate to the previous blocked location with your navigate function
            history(lastLocation.pathname + lastLocation?.search)
        }
    }, [confirmedNavigation, history, lastLocation])

    // open the chat notification box if the user signed-in from proz and have chat notifications
    useEffect(() => {
        // console.log("first-chat-box-open: " +Cookies.get("first-chat-box-open"))
        if (Cookies.get("first-chat-box-open") === undefined || Cookies.get("editor-settings-alert-modal-shown") === null) {
            if(chatNotifications?.length !== 0 && userDetails?.signup_method === 2 && userDetails?.first_login){
                Cookies.set("first-chat-box-open", "true", { domain: Config.COOKIE_DOMAIN })
                setChatNotification(true)
            }
        }
    }, [chatNotifications])
    

    /* Whenever the socket value changes */
    useEffect(() => {
        if (didMount) {
            socket.current.onopen = function (e) {
                //Websocket connection start
                let data = {
                    command: "get_unread_chat_notifications", //To get all the unread chat notifications
                };
                data = JSON.stringify(data);
                socket.current.send(data);
                getChatNotifications();
            };

            socket.current.onmessage = function (e) {
                //When new message arrives
                getChatNotifications();
                /* console.log(e)
                let response = JSON.parse(e.data)
                console.log(response)
                if (response?.notifications) {
                    setChatNotificationsCount(response?.notifications[0]?.total_count)
                    setChatNotifications(response?.notification_details)
                } */
            };

            socket.current.onerror = function (e) {
                //When error occurs
                Config.log("On Error");
                Config.log(e);
            };

            socket.current.onclose = function (e) {
                //When closing the websocket connection
                Config.log("On Close");
                Config.log(e);
            };
        }
    }, [socket.current]);

    /* Whenever updateNotification prop changes */
    useEffect(() => {
        if (didMount) getChatNotifications();
    }, [props.updateNotification]);

    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            let isRodalMask = e.target.closest('.rodal-mask')
            let isEditorSettingsModal =  e.target.closest('.update-settings-modal-wrapper')
            if (outsideClick.current && !outsideClick.current.contains(e.target)) {
                if(!isRodalMask && !isEditorSettingsModal){
                    setChatNotification(false);
                }
                setLogoutDrpVisibility(false);
                setAppsDrpVisibility(false);
                setHelpDrpVisibility(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    /* Check for clicing outside of the Logout Dropdown */
    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (logoutDropOutside.current && !logoutDropOutside.current.contains(e.target)) {
    //             handleLogoutDrpVisibility(false)
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // });


    // const Tooltip = withStyles({
    //     tooltip: {
    //         color: "#ffffff !important",
    //         backgroundColor: "#2A2A2A !important",
    //         padding: "7px 12px !important",
    //         fontFamily: "Roboto !important",
    //         fontSize: "12px !important",
    //         lineHeight: 1.4,
    //         fontWeight: "400 !important",
    //         width: "auto !important",
    //         maxWidth: "100%",
    //     },
    //     arrow: {
    //         color: "#2A2A2A",
    //     },
    // })(Tooltip);

    // const AilaysaDownloadTooltip = withStyles({
    //     tooltip: {
    //         color: "#ffffff !important",
    //         backgroundColor: "#2A2A2A !important",
    //         padding: "7px 12px !important",
    //         fontFamily: "Roboto !important",
    //         fontSize: "12px !important",
    //         lineHeight: 1.4,
    //         fontWeight: "400 !important",
    //         width: "350px !important",
    //         textAlign: "center",
    //         maxWidth: "100%",
    //     },
    //     arrow: {
    //         color: "#2A2A2A",
    //     },
    // })(Tooltip);

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
                setIsPlanCancelled(response.data?.sub_status === 'canceled' ? true : false)
                setCurrentPlan(response.data?.subscription_name?.toUpperCase());
                setPlanExpireDays(Math.ceil(dateDifference));
                setPlanExpireHours(Math.floor(hoursDifference));
                setSubcription_status(response.data.sub_status);
                setIsTrial(response.data.trial);
            },
        });
    };

    /* Show/Hide chat notifications */
    const handleChatNotificationVisibility = (show = true) => {
        setChatNotification(show);
    };

    /* Show/Hide chat logout dropdown */
    const handleLogoutDrpVisibility = (show = true) => {
        setLogoutDrpVisibility(show);
    };

    /* Show/Hide chat help dropdown */
    const handleHelpDrpVisibility = (show = true) => {
        setHelpDrpVisibility(show);
    };

    /* Show/Hide chat logout dropdown */
    const handleAppsDrpVisibility = (show = true) => {
        setAppsDrpVisibility(show);
    };

    /* Logout the user */
    const logout = () => {
        Config.logout();
    };

    // MT-Raw file download celery status check function
    const mtRawCeleryCheck = async (celeryId) => {
        setAnimateDownloding('MTRAW')
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        try {
            const response = await axios.get(
                `${Config.BASE_URL}/workspace_okapi/download_mt_file/?celery_id=${celeryId}&document_id=${props.documentId}`,
                {
                    responseType: "blob",
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        "Authorization": `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
            if (response !== undefined) {
                if (response.status === 200) {
                    setAnimateDownloding(null)
                    setDownloadpending(false)
                } else {
                    setDownloadpending(false)
                }
                // console.log('false')
                Config.downloadFileInBrowser(response)
                props.listSegments('mt-raw-download')
            }
        } catch (err) {
            // console.log(JSON.parse(await err.response.data.text()))
            let responseObj = JSON.parse(await err.response.data.text())
            if (err.response.status === 400) {
                if (responseObj?.msg?.includes('Pending')) {
                    setTimeout(() => {
                        mtRawCeleryCheck(celeryId)
                    }, 5000);
                } else {
                    setTimeout(() => {
                        mtRawDownloadRetryCounter.current++
                        if (mtRawDownloadRetryCounter.current < mtRawDownloadRetryLimit.current) {
                            downloadFile(null, 'MTRAW')
                        } else {
                            setAnimateDownloding(null)
                            setDownloadpending(false)
                        }
                    }, 5000);
                }
            }
        }
    }


    /* Download different type of output files */
    const downloadDifferentFile = async (url, type) => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";

        try {
            return await axios.get(
                url,
                {
                    responseType: "blob",
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        "Authorization": `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
        } catch (err) {
            // console.log(JSON.parse(await err.response.data.text()))
            let responseObj = JSON.parse(await err.response.data.text())
            console.log(responseObj?.msg)
            if (err.response.status === 401) {
                if (responseObj?.msg?.includes('Conversion is going')) {
                    setCeleryId(responseObj?.celery_id);
                    Cookies.set(
                        "audio_celery_data",
                        JSON.stringify({
                            celery_id: responseObj?.celery_id,
                            document_id: props.documentId
                        }),
                        { domain: Config.COOKIE_DOMAIN }
                    );
                    // Config.toast('Conversion under process, please wait.', 'warning');
                    // setIsAudioConverting(true)
                    // setShowZeroSegmentAlertModal(true)
                    setIsFileUnderProcess(false)
                } else {
                    setIsFileUnderProcess(true)
                    setShowZeroSegmentAlertModal(true)
                    setIsAudioConverting(false)
                    // Config.toast('File under process, please wait.', 'warning');
                }
            } else if (err.response.status === 400) {
                console.log(responseObj?.msg)
                // celery for mt-raw file
                if (responseObj?.celery_id) {
                    mtRawCeleryCheck(responseObj?.celery_id)
                } else {
                    if (responseObj?.msg?.includes('under process')) {
                        Config.toast('File is under process, please try again after sometime', 'warning')
                    } else {
                        Config.toast('Download failed', 'error')
                    }
                    setIsFileUnderProcess(false)
                    setAnimateDownloding(null)
                    setDownloadpending(false)
                }
            } else if (err.response.status === 409) {
                setIsFileUnderProcess(false)
                setAnimateDownloding(null)
                setDownloadpending(false)
                Config.toast('Something went wrong with file processing', 'warning')
            }
            setShowDownloadingModal(false);
            // setAnimateDownloding(null)
        }
    };

    const downloadFile = async (e, type) => {
        console.log(type)
        setDownloadpending(true)
        let url = ""
        if(isFederalWorkspace){
            url = Config.BASE_URL + "/workspace_okapi/download_federal_file/" + `?task_id=${documentTaskIdRef.current}`;
            url = url + "&output_type=" + type;
            if (type == "AUDIO") url += `&locale=${props?.audioLocale?.label}&voice_gender=${props?.audioGender?.label?.toUpperCase()}&voice_name=${props.voiceType}`
        }else{
            url = Config.BASE_URL + "/workspace_okapi/document/to/file/" + props.documentId;
            url = url + "?output_type=" + type;
            if (type == "AUDIO") url += `&locale=${props?.audioLocale?.label}&voice_gender=${props?.audioGender?.label?.toUpperCase()}&voice_name=${props.voiceType}`
        }

        setAnimateDownloding(type)
        // console.log(type);
        const response = await downloadDifferentFile(url, type);
        // console.log(response);
        if (response !== undefined) {
            if (response.status === 200) {
                // setShowDownloadingModal(false)
                setAnimateDownloding(null)
                setDownloadpending(false)
            } else {
                setDownloadpending(false)
            }
            // console.log('false')
            Config.downloadFileInBrowser(response)
            if (type == 'MTRAW') props.listSegments('mt-raw-download')
        }
    };

    /* Getting and setting the document status data */
    const getDocumentProgress = (e, type) => {
        // setIsDownloadCondition(false)
        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/progress/" + props.documentId,
            auth: true,
            success: (response) => {
                // console.log(response.data)

                if (response.data.segments_confirmed_count === response.data.total_segment_count) {
                    setIsDownloadCondition(true)
                    downloadFile(e, type)
                    props.setShowAudioOptionsModal(false)
                    // setDownloadTrigger(!downloadTrigger)
                } else {
                    if (response.data.segments_confirmed_count === 0 && type === 'AUDIO') {
                        setIsAnySegmentConfirmed(false)
                    } else {
                        setIsAnySegmentConfirmed(true)
                    }
                    setIsDownloadCondition(false)
                    setDownloadTrigger(!downloadTrigger)
                }
            },
        });
    };

    const downloadAudioFileWithCeleryId = async (celery_id) => {
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        try {
            return await axios.get(
                `${Config.BASE_URL}/workspace_okapi/download_audio_file/?celery_id=${celery_id}&document_id=${props.documentId}`,
                {
                    responseType: "blob",
                    /*
                    */
                    headers: {
                        "Access-Control-Expose-Headers": "Content-Disposition",
                        "Authorization": `Bearer ${token}`, // add authentication information as required by the backend APIs.
                    },
                }
            );
        } catch (err) {
            // console.log(JSON.parse(await err.response.data.text()))
            let responseObj = JSON.parse(await err.response.data.text())
            if (err.response.status === 400) {
                // console.log(responseObj);
                if (responseObj?.msg === 'Failure') {
                    Cookies.remove("audio_celery_data", { domain: Config.COOKIE_DOMAIN })
                    setAnimateDownloding(null)
                    Config.toast('Download failed, please try again', 'error')
                } else if (responseObj?.msg === 'Pending') {
                    setAnimateDownloding('AUDIO')
                    setIsFileUnderProcess(false)
                    setTimeout(async () => {
                        const response = await downloadAudioFileWithCeleryId(celeryId)
                        if (response !== undefined) {
                            if (response.status === 200) {
                                setShowDownloadingModal(false)
                                setTimeout(() => {
                                    props.getDocumentDetailsById(props.documentId)
                                }, 300);
                                Cookies.remove("audio_celery_data", { domain: Config.COOKIE_DOMAIN })
                                setCeleryId(null)
                                setAnimateDownloding(null)
                            }
                            // console.log(response);
                            Config.downloadFileInBrowser(response)
                        }
                    }, 8000);
                }
            }
            setShowDownloadingModal(false);
        }
    }

    useEffect(() => {
        if (celeryId !== null) {
            downloadAudioFileWithCeleryId(celeryId);
        }
    }, [celeryId])


    const handleDownloadCheck = async (e, type = "ORIGINAL") => {
        setDownloadOpen(false)
        if (type === "SOURCE" || type === "MTRAW") {
            downloadFile(e, type)
        } else {
            props.setShowAudioOptionsModal(false)
            if (Cookies.get('audio_celery_data') != undefined && Cookies.get('audio_celery_data') != null && type === 'AUDIO' && (JSON.parse(Cookies.get('audio_celery_data'))?.document_id == props.documentId)) {
                const response = await downloadAudioFileWithCeleryId(JSON.parse(Cookies.get('audio_celery_data')));
                if (response !== undefined) {
                    if (response.status === 200) {
                        setShowDownloadingModal(false)
                        // console.log(props.documentId);
                        props.getDocumentDetailsById(props.documentId)
                        Cookies.remove("audio_celery_data", { domain: Config.COOKIE_DOMAIN })
                    }
                    // console.log(response);
                    Config.downloadFileInBrowser(response)
                }
            } else {
                downloadFile(e, type)
                // getDocumentProgress(e, type);
            }
        }
        setDownloadParameters({ e, type })
    }

    useEffect(() => {
        if (Object.keys(downloadParameters).length !== 0) {
            if (isDownloadCondition) {
                // console.log('modal not show')
            }
            else {
                if (isAnySegmentConfirmed) {
                    setTranslatedAudioAlertModal(true)
                    setDownloadConfirmationModalVisible(true)
                    props.setShowAudioOptionsModal(false)
                } else {
                    props.setShowAudioOptionsModal(false)
                    setShowZeroSegmentAlertModal(true)
                }
            }
        }
    }, [isDownloadCondition, downloadTrigger])



    /* Get and set the chat notifications */
    const getChatNotifications = () => {
        Config.axios({
            url: `${Config.BASE_URL}/marketplace/chat/unread/notifications/`,
            auth: true,
            success: (response) => {
                if (chatNotificationsCountRef.current != null && response.data?.notification_details?.length > chatNotificationsCountRef.current)
                    isNewNotification.current = true;
                else isNewNotification.current = false;
                setChatNotificationsCount(response.data?.notification_details?.length);
                chatNotificationsCountRef.current = response.data?.notification_details?.length;
                setChatNotifications(response.data?.notification_details);
            },
        });
    };

    /* Play sound when new notification arrives */
    useEffect(() => {
        if (didMount)
            if (chatNotificationsCount > 0 && isNewNotification.current) {
                playNotificationSound();
            }
    }, [chatNotificationsCount]);

    /* Show browser notification whenver new notification arrives*/
    useEffect(() => {
        if (didMount) {
            try {
                if(Notification){
                    if (Notification.permission === "denied")
                        // User denied to show
                        return;
                    if (isNewNotification.current && chatNotifications[chatNotifications.length - 1]) {
                        let notification = chatNotifications[chatNotifications.length - 1];
                        if (Notification.permission === "default") {
                            Notification.requestPermission(); //Ask permission if already not given
                        }
                        let options = {
                            body: notification?.message,
                            icon: Config.BASE_URL + notification?.avatar,
                            dir: "ltr",
                        };
                        new Notification(`Message from ${notification?.sender}`, options); // Show notifications
                    }
                }
            }catch (err) {
                console.log(err)
            }
        }
    }, [chatNotifications]);

    const getSelectedTab = () => {
        let pathname = window.location.pathname;
        setSelectedTab(pathname.includes("file-upload") ? 1 : pathname?.includes("create") ? 2 : pathname?.includes("collaborate") ? 3 : pathname?.includes("assets") ? 4 : null);
    };

    useEffect(() => {
        let pathname = window.location.pathname;
        setAssetsBtnHide(pathname?.includes("assets") ? true : false)
        if (pathname?.includes("file-upload")) {
            setHideburgaricon(true)
        }
        else if (pathname?.includes("documents-list")) {
            setHideburgaricon(true)
        }
        else if (pathname?.includes("collaborate")) {
            setHideburgaricon(true)
        }
        else if (pathname?.includes("workspace")) {
            setHideburgaricon(true)
        }
        else {
            setHideburgaricon(false)
        }
    }, [window.location.pathname])

    const handlePreviousAudioDownload = async (type) => {
        let url = `${Config.BASE_URL}/workspace_okapi/download_converted_audio_file/?document_id=${props.documentId}`;
        const response = await downloadDifferentFile(url);
        // console.log(response);
        if (response !== undefined) {
            if (response.status === 200) {
                setShowDownloadingModal(false)
            }
            Config.downloadFileInBrowser(response)
        }
    }

    // let navbarOptionSelectionEffect = "nav-assign-manage-link " + selectedTab ? selected : "";
    // console.log(Config.userState)



    const handleBlockedNavigation = nextLocation => {
        if (!confirmedNavigation && pathname) {
            setLastLocation(nextLocation)
            setNavigationModalVisible(true)
            return false
        }
        return true
    }



    const handleConfirmNavigationClick = () => {
        setNavigationModalVisible(false)
        setConfirmedNavigation(true)
    }

    const convertNewlinesToBr = (text) => {
        const htmlText = text?.split('\n')?.map(line => `<p>${line.trim()}</p>`)?.join('');
        return htmlText;
      }


    const handleSpellCheckWordDownload = () => {
        let formData = new FormData();
        console.log(spellCheckData)
        formData.append("html", convertNewlinesToBr(spellCheckData))
        formData.append("name", "name")
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";

        axios({
            method: "POST",
            url: "https://apinodestaging.ailaysa.com/docx-generator",
            data: formData,
            responseType: "blob",
            headers: { Authorization: `Bearer ${token}` },
            // headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            downloadHtmlToDocx(response.data)

        })
        .catch(function (response) {
            //handle error
            Config.toast("Failed to download file", 'error')
      
        });
    }

    const downloadHtmlToDocx = async (data) => {
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = URL.createObjectURL(data);
        fileDownload.download = Config.unescape(`${data?.innerText?.split('.')[0] ? data?.innerText?.split('.')[0] : 'Untitled'}.docx`);
        fileDownload?.click();
        document.body.removeChild(fileDownload);
        // update the list once download completed
    }

    return (
        <React.Fragment>
            <div className={(userDetails?.is_campaign && showCampaignCouponStrip) ? "navbar-stripe-wrapper stick-top" : "navbar-stripe-wrapper"}>
                {/* {(userDetails?.is_campaign && showCampaignCouponStrip) && (
                    <StartUpTNCampaignOffer />
                )} */}

                <nav
                    id="navbar"
                    className={
                        (props.isWhite
                            ? "navbar navbar-expand-lg navbar-light ail-work-nav ail-workspace-white-nav "
                            : "navbar navbar-expand-lg navbar-light ail-work-nav ail-workspace-blue-nav ") + (!(userDetails?.is_campaign && showCampaignCouponStrip) ? "fixed-top" : "") 
                    }
                    style={{ zIndex: props.isWhite ? 100 : 1030 }}
                >
                    <a href={hiddenLinkUrl} download={downloadedFileName.current} style={{ display: 'none' }} className="hidden" ref={downloadref} />

                    {/* burger icon in nav bar*/}
                    {/* { !hideburgaricon && 
                    <button id="hamburger" className="hamburger" onClick={(e)=>{setsidebartoggle(current=>!current)}}>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </button>} */}
                    <div className="logo-wrap">
                        {
                            ((mobileVersion < 991) && (aiChatMobileTab === 2)) &&
                            <div className="previou-page" onClick={() => handlePreviousPage()}>
                                <img src={ChevronLeftBlack} />
                            </div>
                        }
                        <Link className="navbar-display-logo" to={"/file-upload?page=1&order_by=-id"}>
                            <img
                                src={
                                    props.isWhite ? 
                                        WorkspaceLogo
                                    : isAiChatBook ?
                                        ChatBookLogo
                                    :
                                        ProjectsLogo
                                }
                                alt="logo"
                            />
                        </Link>
                        <div
                            onClick={() => props.prevPathRef.current ? history(props.prevPathRef.current) : history('/file-upload?page=1')}
                            className={props.isWhite ? "navbar-display-show" : "navbar-display-hide"}
                        >
                            <div className="nav-projects-link ">
                                <img src={ChevronLeftBlack} /> <span>{!props.isGlossary ? t("my_projects") : "My glossaries"}</span>
                            </div>
                        </div>
                    </div>


                    {/* !props.isGlossary ? history.goBack() */}
                    <div className={"common-navbar-wrap " + (isAiChatBook ? "justify-content-end" : "")}>
                        {(!props.isWhite && !props.isGlossary && !isAiChatBook) &&
                            <div ref={newProjectBoxRef} className="nav-transeditor-wrapper federal-news-navbar">
                                {isEnterprise ? (
                                    <>
                                        <NavLink 
                                            to={is_internal_meber_editor ? "/my-stories?page=1" : "/all-stories?page=1"} 
                                            // activeClassName="selected" 
                                            className={`${!props.isWhite ? "navbar-display-show" : "navbar-display-hide"} ${myNewsProjectsSelected ? "selected" : ""}`}
                                        >
                                            <div className="nav-assign-manage-link">
                                                <span>{t("news_projects")}</span>
                                            </div>
                                        </NavLink>
                                        

                                        {/* {!is_internal_meber_editor && (
                                        )} */}
                                        <NavLink 
                                            to="/file-upload?page=1&order_by=-id" 
                                            // activeClassName="selected" 
                                            className={`${!props.isWhite ? "navbar-display-show" : "navbar-display-hide"} ${myProjectsSelected ? "selected" : ""}`}
                                        >
                                            <div className="nav-assign-manage-link">
                                                <span>{t("standard_project")}</span>
                                            </div>
                                        </NavLink>

                                        {isDinamalar && (
                                            <ButtonBase       
                                                className={props.isWhite ? "d-none" : "ml-3"}
                                                onClick={() => history('/report')}
                                            >
                                                <div className="btn-text">
                                                    <InsertChartOutlinedIcon
                                                        style={{
                                                            width: 20,
                                                            color: "#3C4043",
                                                        }}
                                                    />
                                                    <span style={{height: '20px'}}>{t("report")}</span>
                                                </div>
                                            </ButtonBase>
                                        )}
                                    </>
                                ) : (   // for global users
                                    <NavLink 
                                        to="/file-upload?page=1&order_by=-id" 
                                        // activeClassName="selected" 
                                        className={`${!props.isWhite ? "navbar-display-show" : "navbar-display-hide"} ${myProjectsSelected ? "selected" : ""}`}
                                    >
                                        <div className="nav-assign-manage-link">
                                            <span>{t("my_projects")}</span>
                                        </div>
                                    </NavLink>
                                )}

                                {(Config.userState?.internal_member_team_detail?.role !== 'Editor' && !myNewsProjectsSelected) ? (
                                    <ButtonBase       
                                        component={Link}
                                        to="/create/all-templates/" 
                                        className={props.isWhite ? "d-none" : "ml-4"}
                                    >
                                        <div className="btn-text">
                                            <AddIcon
                                                style={{
                                                    width: 20,
                                                    color: "#3C4043"
                                                }}
                                            />
                                            <span>{t("new_project")}</span>
                                        </div>
                                    </ButtonBase>
                                ) : null}
                            </div>
                        }
                        <div className="right-align-links">
                            <ul className="nav-project-txt-align">
                                <li className="nav-item active project-doc-name">
                                    {(props.glossaryProjectName !== "" && props.termdownload) &&
                                        <div className="project-name">
                                            <span className="project-name-ellipse">
                                                <Tooltip title={props.glossaryProjectName} placement="top-start">
                                                    <span>{props.glossaryProjectName}</span>
                                                </Tooltip>
                                            </span>
                                        </div>
                                    }
                                    {(props.writerProjectName !== "" && props.writerProjectName !== undefined) &&
                                        <div className="project-name d-flex align-items-center gap-5">
                                            <span className="project-name-ellipse">
                                                <Tooltip title={props.writerProjectName} placement="top-start">
                                                    <span>{props.writerProjectName}</span>
                                                </Tooltip>
                                            </span>
                                            {
                                                props.isSaved ? (
                                                    <Tooltip title={t("save")} placement="top">
                                                        <CloudDoneOutlinedIcon style={{ color: '#5f6368', cursor: 'pointer' }} onClick={props.saveWriterData} />
                                                    </Tooltip>
                                                ) : (
                                                    <>
                                                        <CachedOutlinedIcon className="rotate" style={{ color: '#5f6368' }} />
                                                        <small>{t("saving")}</small>
                                                    </>
                                                )
                                            }
                                        </div>
                                    }
                                    {fileName != null && (
                                        <>
                                            <div className="project-name justify-content-end">
                                                <span className="project-name-ellipse">
                                                    <Tooltip title={fileName} placement="top-start">
                                                        <span>{fileName.split(".").slice(0, -1).join(".")}</span>
                                                    </Tooltip>
                                                </span>
                                                <Tooltip title={fileName} placement="top-end">
                                                    <span style={{ cursor: "context-menu" }}>
                                                        <span>{"." + fileName.split(".").pop()}</span>
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </>
                                    )}
                                    {props.languagePairObject?.source_language != null && props.languagePairObject?.target_language != null && props.languagePairObject?.project_name != null && (
                                        <>
                                            <div className="project-name glossary-proj-name">
                                                <span className="project-name-ellipse">
                                                    <Tooltip title={props.languagePairObject?.project_name} placement="top-start">
                                                        <span>{props.languagePairObject?.project_name}</span>
                                                    </Tooltip>
                                                </span>
                                            </div>
                                            <div className="glossary-nav-lang-pair">
                                                <span>{props.languagePairObject?.source_language}</span>
                                                <img src={ArrowRightAltColor} />
                                                <span>{props.languagePairObject?.target_language}</span>
                                            </div>
                                        </>
                                    )}
                                    {sourceLanguage != null && targetLanguage != null && (
                                        <span className="translation-results">
                                            <span>{sourceLanguage}</span>
                                            <img src={ArrowRightAltColor} />
                                            <span>{targetLanguageScript}</span>
                                        </span>
                                    )}
                                    {(props.isWhite && showViewOnlyTag && !isWorkspaceEditable) && (
                                        <span className="view-only-tag">
                                            <RemoveRedEyeOutlinedIcon className="eye-icon" />
                                            {t("view_only")}
                                        </span>
                                    )}
                                </li>
                            </ul>
                            <ul className="navbar-nav-right-links" ref={outsideClick}>
                                
                                {showTaskAssignActionBtn && (
                                    <TaskAssignActionButtons 
                                        setShowTaskAssignActionBtn={props.setShowTaskAssignActionBtn}
                                        clientResponseDataRef={props.clientResponseDataRef}
                                        prevPathRef={props.prevPathRef}
                                    />
                                )}

                                {/* {showDocumentSubmitButton && (
                                    <Tooltip title={t("submit_tooltip_note")} arrow placement="bottom">
                                        <button 
                                            className="workspace-files-nav-OpenProjectButton" 
                                            style={{ marginRight: !showReturnRequestBtn ? '18px' : '8px' }} 
                                            onClick={() => handleDocumentSubmitBtn(3)}
                                        >
                                            <span className="fileopen-new-btn">{t("submit")}</span>
                                        </button>
                                    </Tooltip>
                                )} */}
                                {(showDocumentSubmitButton) && (
                                    <Tooltip title={t("submit_tooltip_note")} arrow placement="bottom">
                                        <button 
                                            className="workspace-files-nav-OpenProjectButton" 
                                            style={{ 
                                                marginRight: !showReturnRequestBtn ? '18px' : '8px',
                                                opacity: enableDocumentSubmitBtn ? 1 : 0.6,
                                                pointerEvents: enableDocumentSubmitBtn ? 'all' : "none"
                                             }} 
                                            onClick={() => handleDocumentSubmitBtn(3)}
                                        >
                                            <span className="fileopen-new-btn">{t("submit")}</span>
                                        </button>
                                    </Tooltip>
                                )}

                                {window.location.pathname.includes('spell-check') && (
                                    <Tooltip  arrow placement="bottom">
                                        <button className="workspace-files-nav-OpenProjectButton" style={{ marginRight: !showReturnRequestBtn ? '18px' : '8px' }} onClick={() => handleSpellCheckWordDownload()}>
                                            <span className="fileopen-new-btn">{t("download")}</span>
                                        </button>
                                    </Tooltip>
                                )}
                                {showReturnRequestBtn && (
                                    <Tooltip title={t("decline_tooltip_note")} arrow placement="bottom">
                                        <button className={props.isWhite ? "workspace-files-nav-OpenProjectButton nav-item nav-drp-down active" : "navbar-display-hide"} style={{ backgroundColor: '#E4E9EF', marginRight: '18px' }} onClick={() => handleDocumentSubmitBtn(4)}>
                                            <span className="fileopen-new-btn" style={{ color: "#001D35" }}>{t("decline")}</span>
                                        </button>
                                    </Tooltip>
                                )}


                                {/* default glossary download icon for dinamalar */}
                                {(props?.defaultGlossDownload && !is_internal_meber_editor) && (
                                    <Tooltip title={t('download')} arrow placement="bottom">
                                        <li className={props.isWhite ? "nav-item nav-drp-down active" : "navbar-display-hide"} onClick={props?.handleDefaultGlossDownload}>
                                            <span className={props.isWhite ? "nav-link" : ""} >
                                                <img src={FileDownload} alt="file-download" />
                                            </span>
                                        </li>
                                    </Tooltip>
                                )}

                                <Tooltip title={props.isTbxDownloading ? t('downloading') : t('download')} arrow placement="bottom">
                                    <li className={props.isWhite ? "nav-item nav-drp-down active" : "navbar-display-hide"} onClick={() => !props.isTbxDownloading && props.handleDownloadFile()}>
                                        {
                                            props?.termdownload &&
                                            <span className={props.isWhite ? "nav-link" : ""} >
                                                <img src={FileDownload} alt="file-download" />
                                            </span>
                                        }
                                    </li>
                                </Tooltip>
                                <li className={props.isWhite ? "nav-item nav-drp-down active" : "navbar-display-hide"}>
                                    {
                                        props?.writerFileDwnload &&
                                        <span className={props.isWhite ? "nav-link" : ""}>
                                            <img src={FileDownload} alt="file-download" />
                                        </span>
                                    }

                                </li>

                                {animateDownloding !== null &&
                                    <li className="mr-2 d-flex align-items-center">
                                        <DownloadAnimation />
                                        <small className="ml-1">{t("downloading")}...</small>
                                    </li>
                                }
                                
                                <li id="download-dropdown-wrapper" className={props.isWhite ? "nav-item nav-drp-down active mr-3" : "navbar-display-hide mr-3"}>
                                    {(props.updatedFileDownload && !isEnterprise && !is_internal_meber_editor) && (
                                        <GlossaryMenuDrpDown />
                                    )}
                                </li>

                                <li id="download-dropdown-wrapper" className={props.isWhite ? "nav-item nav-drp-down active" : "navbar-display-hide"}>
                                    {props.updatedFileDownload && (
                                        <>
                                            <div className="download-grp-wrapper" ref={downloadAnchorRef} >
                                                <Tooltip title={t("workspace_dwnload_note")} arrow placement="bottom">
                                                    <ButtonBase className="download-main" onClick={(e) => {
                                                        handleDownloadCheck(e);
                                                        handleLogoutDrpVisibility(false);
                                                        handleAppsDrpVisibility(false);
                                                        handleChatNotificationVisibility(false);
                                                        handleHelpDrpVisibility(false);
                                                    }}>
                                                        <FileDownloadOutlinedIcon className="workspace-dwnload" />
                                                    </ButtonBase>
                                                </Tooltip>
                                                <span className="border-line"></span>

                                                <button className="navbar-DrpDownArrowButton"
                                                    size="small"
                                                    aria-controls={downloadOpen ? 'download-dropdown' : undefined}
                                                    aria-expanded={downloadOpen ? 'true' : undefined}
                                                    aria-haspopup="menu"
                                                    ref={props.downloadTrigger}
                                                    onClick={(e) => {
                                                        handleDrpDownToggle(e);
                                                        handleLogoutDrpVisibility(false);
                                                        handleAppsDrpVisibility(false);
                                                        handleChatNotificationVisibility(false);
                                                        handleHelpDrpVisibility(false);
                                                    }
                                                    }
                                                >   <span className="arrow-wrap">
                                                        <KeyboardArrowDownOutlinedIcon className="workspace-arrow-dwnload" />
                                                    </span>
                                                </button>
                                            </div>
                                            <Popper id="download-dropdown" placement="bottom" open={downloadOpen} anchorEl={downloadAnchorRef.current} role={undefined} transition disablePortal className={(props.isTranslatedAudioFileAvailable !== null && props.audioFileAlreadyExist) ? "drop-down-width" : "drop-down-width-small"}>
                                                {({ TransitionProps, placement }) => (
                                                    <Grow
                                                        {...TransitionProps}
                                                        style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom', }}
                                                    >
                                                        <Paper>
                                                            <ClickAwayListener onClickAway={handleDrpDownClose}>
                                                                <MenuList
                                                                    className="menu-list-wrapper"
                                                                >
                                                                    {
                                                                        props.isTranslatedAudioFileAvailable !== null &&
                                                                        <MenuItem className={"menu-list-item " + (animateDownloding === 'AUDIO' ? "download-option-disable" : "")} onClick={(e) => { Cookies.get('audio_celery_data') != undefined ? handleDownloadCheck(e, "AUDIO") : props.setShowAudioOptionsModal(true) }}>
                                                                            {props.audioFileAlreadyExist ? t("create_audio_file") : t("translated_audio_file")}
                                                                            {animateDownloding === 'AUDIO' && <DownloadAnimation />}
                                                                        </MenuItem>
                                                                    }
                                                                    {
                                                                        props.audioFileAlreadyExist &&
                                                                        <MenuItem className="menu-list-item" onClick={(e) => { handlePreviousAudioDownload('AUDIO') }}>
                                                                            {t("prev_translated_aud_file")}
                                                                        </MenuItem>
                                                                    }
                                                                    <MenuItem className={"menu-list-item " + (animateDownloding === 'ORIGINAL' ? "download-option-disable" : "")} onClick={(e) => handleDownloadCheck(e)}>
                                                                        {t("translated_and_edited")}
                                                                        {animateDownloding === 'ORIGINAL' && <DownloadAnimation />}
                                                                    </MenuItem>
                                                                    <MenuItem className={"menu-list-item " + (animateDownloding === 'BILINGUAL' ? "download-option-disable" : "")} onClick={(e) => handleDownloadCheck(e, "BILINGUAL")}>
                                                                        {t("bilingual_excel")}
                                                                        {animateDownloding === 'BILINGUAL' && <DownloadAnimation />}
                                                                    </MenuItem>
                                                                    {
                                                                        props.mtEnable && (
                                                                            <MenuItem className={"menu-list-item " + (animateDownloding === 'MTRAW' ? "download-option-disable" : "")} onClick={(e) => props.docCreditCheckAlertRef.current ? setShowDocCreditCheckAlert(true) : handleDownloadCheck(e, "MTRAW")}>
                                                                                {t("mt_only")}
                                                                                {animateDownloding === 'MTRAW' && <DownloadAnimation />}
                                                                            </MenuItem>
                                                                        )
                                                                    }
                                                                    {!props?.prevPathRef?.current?.includes('my-stories') && (
                                                                        <>
                                                                            <MenuItem className={"menu-list-item " + (animateDownloding === 'SOURCE' ? "download-option-disable" : "")} onClick={(e) => handleDownloadCheck(e, "SOURCE")}>
                                                                                {t("source_file")}
                                                                                {animateDownloding === 'SOURCE' && <DownloadAnimation />}
                                                                            </MenuItem>
                                                                            <MenuItem className={"menu-list-item " + (animateDownloding === 'TMX' ? "download-option-disable" : "")} onClick={(e) => handleDownloadCheck(e, "TMX")}>
                                                                                TMX
                                                                                {animateDownloding === 'TMX' && <DownloadAnimation />}
                                                                            </MenuItem>
                                                                            <MenuItem className={"menu-list-item " + (animateDownloding === 'XLIFF' ? "download-option-disable" : "")} onClick={(e) => handleDownloadCheck(e, "XLIFF")}>
                                                                                XLIFF
                                                                                {animateDownloding === 'XLIFF' && <DownloadAnimation />}
                                                                            </MenuItem>
                                                                        </>
                                                                    )}
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </>
                                    )}
                                </li>
                                {(isHelpVisible && props.isWhite) &&
                                    <li className="nav-item nav-drp-down-new active">
                                        <Tooltip title="Help" arrow placement="bottom">
                                            <Badge 
                                                sx={{
                                                    "& .MuiBadge-badge": {
                                                        backgroundColor: "#E74C3C",
                                                        right: "16px",
                                                        top: "10px",
                                                        padding: '4.5px',
                                                        borderRadius: "50%"
                                                    }
                                                  }}
                                                variant="dot"
                                                invisible={isEnterprise ? true : false}
                                            >
                                                <div
                                                    className="nav-icon-bg"
                                                    // onMouseEnter={() => hideAvailCredits()}
                                                    onClick={() => {
                                                        handleLogoutDrpVisibility(false);
                                                        handleAppsDrpVisibility(false);
                                                        handleChatNotificationVisibility(false);
                                                        handleHelpDrpVisibility(!helpDrpVisibility);
                                                    }}>
                                                    <img
                                                        src={
                                                            props.isWhite
                                                                ? HelpOutlineGrey
                                                                : HelpOutline
                                                        }
                                                        alt="help"
                                                    />
                                                </div>
                                            </Badge>
                                        </Tooltip>
                                        {props.isWhite ? (
                                            <ul ref={HelpOutside} className={`submenu submenu-animated submenu_fadeIn ${helpDrpVisibility ? "show" : ""}`}>
                                                <li style={{display: isEnterprise ? "none" : ""}}>
                                                    <a onClick={() => {dispatch(setShowAdaptiveMTIntroModal(true)); setHelpDrpVisibility(false)}}>{t("adaptive_trans_help_text")}</a>
                                                </li>
                                                <li>
                                                    <a onClick={() => {props.showHowToTour(); setHelpDrpVisibility(false)}}>{t("how_to_edit_&_download")}</a>
                                                </li>
                                                <li>
                                                    <a onClick={props.showTagsTour}>{t("how_to_apply_formatting_using_tags")}</a>
                                                </li>
                                            </ul>
                                        ) : (
                                            props.showTourOption && (
                                                <ul className="submenu submenu-animated submenu_fadeIn">
                                                    {props.showTourOption && (
                                                        <li>
                                                            <a onClick={props.showHowToTour}>{t("how_to_open_a_file")}</a>
                                                        </li>
                                                    )}
                                                </ul>
                                            )
                                        )}
                                    </li>
                                }
                                <li className="nav-item active">
                                    <Tooltip title={t("chat")} arrow placement="bottom">
                                        <div
                                            onClick={() => {
                                                handleLogoutDrpVisibility(false);
                                                handleAppsDrpVisibility(false);
                                                handleHelpDrpVisibility(false);
                                                handleChatNotificationVisibility(!chatNotification);
                                            }}
                                            className="nav-icon-bg"
                                        >
                                            <span>
                                                <ChatBubbleOutlineIcon className={props.isWhite ? "black" : "white"} />
                                                {chatNotificationsCount > 0 && <span className="badge">{chatNotificationsCount}</span>}
                                            </span>
                                        </div>
                                    </Tooltip>

                                    <div
                                        className={
                                            chatNotification
                                                ? "chat-notification-box chat-notification-box-show chat-notification-box-animated chat-notification-box-fade-in"
                                                : "chat-notification-box chat-notification-box-animated chat-notification-box-fade-in"
                                        }
                                        ref={chatOutside}
                                    >
                                        <div className="chat-notification-header">
                                            <p>{t("chat")}</p>
                                        </div>
                                        <div className="chat-members-list">
                                            {chatNotificationsCount > 0 ? (
                                                <ul className="chat-members-list-inner">
                                                    {chatNotifications.map((notification) => (
                                                        <Link
                                                            key={notification?.thread_id}
                                                            onClick={() => handleChatNotificationVisibility(false)}
                                                            target="_blank"
                                                            to={{ pathname: "/chat", state: { id: notification?.thread_id, receiverId: notification?.sender_id } }}
                                                        >
                                                            <li key={notification?.thread_id}>
                                                                <div className="chat-memb-profile-name-cont">
                                                                    {notification?.avatar ? (
                                                                        <img src={Config.BASE_URL + notification.avatar} alt="chat-profile" />
                                                                    ) : (
                                                                        <span className="no-profile-notification-pic">
                                                                            {notification?.sender
                                                                                ?.match(/\b(\w)/g)
                                                                                ?.join("")
                                                                                ?.toUpperCase()}
                                                                        </span>
                                                                    )}
                                                                    <div className="chat-memb-name-msg">
                                                                        <span className="name">{notification?.sender}</span>
                                                                        <span className="recent-msg">{notification?.message}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="chat-time-msg-count">
                                                                    <span className="time">{Config.convertUTCToLocal(notification?.timestamp, "time")}</span>
                                                                    <span className="badge">{notification?.count}</span>
                                                                </div>
                                                            </li>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="text-center">
                                                    <span className="no-recent-msg-text">{t("no_recent_messages")}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="chat-globe-link">
                                            <Link to="/chat" target="_blank">{t("see_all_in_chat")}</Link>
                                        </div>
                                    </div>
                                </li>
                                {!is_internal_meber_editor && (
                                    <li className="nav-item active">
                                        {!isDinamalar && (
                                            <Tooltip title={t("apps")} arrow placement="bottom">
                                                <div
                                                    onClick={() => {
                                                        handleLogoutDrpVisibility(false);
                                                        handleChatNotificationVisibility(false);
                                                        handleAppsDrpVisibility(!AppsDrpVisibility);
                                                        handleHelpDrpVisibility(false);
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
                                                {Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                                                    <li>
                                                        <a className="nav-link" target="_blank" href={'/word-processor'} onClick={() => handleAppsDrpVisibility(false)}>
                                                            <img src={WriterIcon} alt="writer" />
                                                            <span>{t("writer")}</span>
                                                        </a>
                                                    </li>}
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
                                                {Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                                                    <li>
                                                        <a className="nav-link" target="_blank" href={Config.MARKETPLACE_HOST} onClick={() => handleAppsDrpVisibility(false)}>
                                                            <img src={MarketplaceIcon} alt="markteplace" />
                                                            <span>{t("martketplace")}</span>
                                                        </a>
                                                    </li>}
                                            </ul>

                                        </div>
                                    </li>
                                )}
                                <li className="nav-item active">
                                    <div
                                        onClick={(e) => {
                                            handleChatNotificationVisibility(false);
                                            handleAppsDrpVisibility(false);
                                            handleLogoutDrpVisibility(!logoutDrpVisibility);
                                            handleHelpDrpVisibility(false);
                                        }}
                                        className="nav-icon-bg"
                                    >
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
                                    </div>
                                    <ul
                                        className={
                                            logoutDrpVisibility ? "submenu-1 submenu-1-active submenu-animated submenu_fadeIn" : "submenu-1 submenu-animated submenu_fadeIn"
                                        }
                                        ref={logoutDropOutside}
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
                                                <Tooltip open={isFullnameTextHovered && userFullnameRef?.current?.clientWidth >= 285} title={Config.userState?.name} arrow placement="top">
                                                    <p
                                                        ref={userFullnameRef}
                                                        onMouseEnter={handleFullnameTextMouseEnter}
                                                        onMouseLeave={handleFullnameTextMouseLeave}
                                                        className="name"
                                                    >
                                                        {Config.userState?.name}
                                                    </p>
                                                </Tooltip>
                                                <Tooltip open={isEmailTextHovered && userEmailRef?.current?.clientWidth >= 285} title={Config.userState?.email} arrow placement="top">
                                                    <p
                                                        ref={userEmailRef}
                                                        onMouseEnter={handleEmailTextMouseEnter}
                                                        onMouseLeave={handleEmailTextMouseLeave}
                                                        className="email"
                                                    >
                                                        {Config.userState?.email}
                                                    </p>
                                                </Tooltip>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="nav-link" target="_blank" href={Config.USER_PORTAL_HOST}>
                                                {t("my_account")}
                                            </a>
                                        </li>
                                        {/* {Config.userState?.internal_member_team_detail?.role !== 'Editor' && <li>
                                        <a className="nav-link" target="_blank" href={Config.MARKETPLACE_HOST}> 
                                            Marketplace
                                        </a>
                                    </li>}
                                {Config.userState?.internal_member_team_detail?.role !== 'Editor' && <li>
                                        <a className="nav-link" target="_blank" href={'/word-processor'}>
                                            Writer
                                        </a>
                                    </li>} */}
                                        {
                                            (Config.userState?.user_status == false) ? (
                                                <li>
                                                    <div className="info plan-info">
                                                        <div className="submenu-plan-details">
                                                            <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/dashboard"}>
                                                                <p className="plan-details deactive-acc">
                                                                    {currentPlan}
                                                                    <span>{t("account_deactivated")}</span>
                                                                </p>
                                                            </a>
                                                        </div>
                                                    </div>
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
                                                // ) : 
                                                ((subcription_status == "active" && planExpireDays <= 3)) ? (
                                                    <li>
                                                        <div className="info plan-info">
                                                            <div className="submenu-plan-details">
                                                                <p className="plan-details">
                                                                    {currentPlan}
                                                                    <span>
                                                                        {t("plan_renews_in")}
                                                                        {planExpireDays >= 1
                                                                            ? " " + (planExpireDays + (planExpireDays > 1 ? (" " + t("days")) : (" " + t("day"))))
                                                                            : " " + (planExpireHours + (planExpireHours > 1 ? (" " + t("hours")) : (" " + t("hour"))))}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : (subcription_status == "past_due") ? (
                                                    isTrial ? (
                                                        <li>
                                                            <div className="info plan-info">
                                                                <div className="submenu-plan-details">
                                                                    <p className="plan-details past-due">
                                                                        {currentPlan}
                                                                        <span>{t("plan_is_overdue")}</span>
                                                                    </p>
                                                                    <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/subscription-plans"}>
                                                                        <p className="new-head">{t("subscribe")}</p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ) : (
                                                        <li>
                                                            <div className="info plan-info">
                                                                <div className="submenu-plan-details">
                                                                    <p className="plan-details past-due">
                                                                        {currentPlan}
                                                                        <span>{t("plan_is_overdue")}</span>
                                                                    </p>
                                                                    <a className="text-decoration-none" target="_blank" href={Config.USER_PORTAL_HOST + "/dashboard"}>
                                                                        <p className="new-head">{t("renew")}</p>
                                                                    </a>
                                                                </div>
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
                                                                        <p className={"credits " + (progressPercentage === 90 ? "danger-credit" : '')}>{creditsAvailable?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
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
            <SimpleRodals
                downloadConfirmationModalVisible={downloadConfirmationModalVisible}
                setDownloadConfirmationModalVisible={setDownloadConfirmationModalVisible}
                translatedAudioAlertModal={translatedAudioAlertModal}
                handleYes={handleYes}
                showAudioOptionsModal={props.showAudioOptionsModal}
                setShowAudioOptionsModal={props.setShowAudioOptionsModal}
                localeOptions={props.localeOptions}
                genderOptions={props.genderOptions}
                handleLocaleChange={props.handleLocaleChange}
                handleGenderChange={props.handleGenderChange}
                audioLocale={props.audioLocale}
                audioGender={props.audioGender}
                handleAudioAlertModalYes={handleAudioAlertModalYes}
                handleDownloadCheck={handleDownloadCheck}
                showZeroSegmentAlertModal={showZeroSegmentAlertModal}
                setShowZeroSegmentAlertModal={setShowZeroSegmentAlertModal}
                showDownloadingModal={showDownloadingModal}
                setShowDownloadingModal={setShowDownloadingModal}
                isAudioConverting={isAudioConverting}
                setIsAudioConverting={setIsAudioConverting}
                isFileUnderProcess={isFileUnderProcess}
                setIsFileUnderProcess={setIsFileUnderProcess}
            />
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
           
            {showdocCreditCheckAlert && (<Rodal
                visible={showdocCreditCheckAlert}
                showCloseButton={false}
                onClose={() => { console.log() }}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper">
                    <div className="confirm-top">
                        <div><span onClick={() => { setShowDocCreditCheckAlert(false) }}><CloseIcon /></span></div>
                        <div>{t("low_credit")}!</div>
                        <div>{t("insufficient_credit_note")}?</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() => { setShowDocCreditCheckAlert(false) }}>{t("no")}</Button>
                            <Button onClick={(e) => { setShowDocCreditCheckAlert(false); handleDownloadCheck(e, "MTRAW") }} variant="contained">{t("yes")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}
        </React.Fragment>
    );
}

export default Navbar;
