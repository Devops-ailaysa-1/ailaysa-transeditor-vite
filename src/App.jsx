import "./App.css";

import { useState, useEffect, lazy, Suspense, useRef } from "react";
// import { BrowserRouter as Router, Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom";

import Config from "./vendor/Config";
// import Fileupload from "./vendor/Fileupload";
// import Login from "./vendor/Login";
// import Workspace from "./vendor/Workspace";
// import Chat from "./vendor/chat/Chat";
// import GlossaryWorkspace from "./vendor/project-type-selection/glossary-workspace/GlossaryWorkspace";
import Cookies from "js-cookie";
import ButtonBase from '@mui/material/ButtonBase';
// import Invitation from "./vendor/Invitation";
// import AssignManage from "./vendor/assign-tabs/AssignManage";
// import ProjectManagement from "./project-setup-components/ProjectManagement";
// import VoiceWorkspace from "./vendor/voice-workspace/VoiceWorkspace";
import packageJson from '../package.json';
import { CacheBuster } from './CacheBuster';
import { Maintenance } from "./vendor/Maintenance";
import { useSelector, useDispatch } from "react-redux";
import { GlobalDownloadBox } from "./vendor/GlobalDownloadBox";
// import { fetchEventSource } from "@microsoft/fetch-event-source";
import { setUserDetails } from "./features/UserDetailsSlice";
import { setSteps } from "./features/ProjectStepsSlice";
import { setCurrencyOptions } from "./features/CurrencyOptionSlice";
import { setUnitTypeOptions } from "./features/UnitTypeOptionSlice";
import { ToastContainer } from 'react-toastify';
import { setMtEngineOption } from "./features/MtEngineOptionSlice";
import UpdateProfileSettingAlertModal from "./vendor/model-select/UpdateProfileSettingAlertModal";
import { setEditorSettingStatus } from "./features/EditorSettingStatusSlice";
import { setEditorSettingAlertModal } from "./features/EditorSettingsAlertModalSlice";
import { setLanguageOptionsList } from "./features/LanguageOptionSlice";
import { setShowGlobalTransition } from "./features/GlobalTransitionSlice";
import { setIndividualTemplateList } from "./features/IndividualTemplateListSlice";
import { setAllTemplateList } from "./features/AllTempateListSlice";
import AllRoutes from "./router/AllRoutes";
import { setIsDinamalarNews } from "./features/IsDinamalarNewsSlice";
import { setIsFederalNews } from "./features/IsFederalNewsSlice";
import { CookieChecker } from "cookie-validator-check";


function App() {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails.value)
    const showGlobalTransition = useSelector((state) => state.globalTransition.value)


    const [isCookieAccepted, setIsCookieAccepted] = useState(true); // To check the cookies is accepted or not
    const [cookieShowRoute, setCookieShowRoute] = useState(["/"]); // To show the cookie prompt in specific routes
    const downloadingFileList = useSelector((state) => state.fileDownloadingList.value)
    const showCampaignCouponStrip = useSelector((state) => state.campaignCouponStrip.value)
    // useEffect(() => {
    //     const updateViewport = () => {
    //       const viewportMeta = document.getElementById('viewport-meta');
    //       if (viewportMeta && window.innerWidth < 1024) {
    //         viewportMeta.setAttribute('content', 'width=1024');
    //       } else {
    //         viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    //       }
    //     };
    //     updateViewport();
    //     window.addEventListener('resize', updateViewport);
    //     return () => {
    //       window.removeEventListener('resize', updateViewport);
    //     };
    // }, []); 

    // useEffect(() => {
    //     let viewMode = typeof Cookies.get("view-mode");
    //     const viewport = document.getElementById('viewport-meta');
    //     if(viewMode == "desktop"){
    //         viewport.setAttribute('content', 'width=1024');
    //     }else if (viewMode == "mobile"){
    //         viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
    //     }
    // }, [])


    useEffect(() => {
        const errorHandler = (message, source, lineno, colno, error) => {
            // You can log the error or perform any other action here.
            // console.error(error);
            return true; // Return true to prevent the default browser error handling
        };

        window.onerror = errorHandler;

        return () => {
            window.onerror = null; // Clean up the event handler when the component unmounts
        };
    }, []);


    useEffect(() => {
        let details = navigator.userAgent;
        // let regexp = /(?=.*(opera|safari|firefox))(?!.*chrome).*/i;
        let regexp = /android|iPhone|kindle|iPad/i;
        let isMobileDevice = regexp.test(details);
        if (isMobileDevice) {
            // console.log("Mobile site")
            Cookies.set("view-mode", "mobile", { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 });
        } else {
            // console.log("desktop site")
            Cookies.set("view-mode", "desktop", { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 });
        }

        let viewMode = Cookies.get("view-mode");
        let viewport = document.querySelector('meta[name="viewport"]')
        if (viewMode == "desktop") {
            viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
        } else if (viewMode == "mobile") {
            viewport.setAttribute('content', 'width=1024');
        }
    }, [])


    useEffect(() => {
        if (typeof Cookies.get("cookieAccepted") == "undefined")
            // Is already not accepted the cookie
            setIsCookieAccepted(false); // Cookie is not accepted yet
        getUserDetails()
        getSteps()
        getMtEngines()
        getLanguages()
        getCurrencyOptions()
        getUnitTypeOptions()
        // getCardContent()
        // getFilterCardContent()
    }, []);

    const getUserDetails = () => {
        Config.axios({
            url: `${Config.BASE_URL}/auth/dj-rest-auth/user/`,
            auth: true,
            success: (response) => {
                dispatch(setUserDetails(response.data))
                if(response.data?.is_enterprise && response.data?.enterprise_name === "Enterprise - DIN") {
                    dispatch(setIsDinamalarNews(true))
                }else if(response.data?.is_enterprise && response.data?.enterprise_name === "Enterprise - TFN") {
                    dispatch(setIsFederalNews(true))
                }
                if (response.data.is_vendor) {
                    getEdiorSettingStatus()
                }
            },
            error: (err) => {
                console.log(err)
            }
        });
    }

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


    const getSteps = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/steps/`,
            auth: true,
            success: (response) => {
                dispatch(setSteps(response.data))
            },
        });
    }

    const getMtEngines = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/mt_engines/`,
            auth: true,
            success: (response) => {
                dispatch(setMtEngineOption(response.data))
            },
        });
    };

    /* Get and set all the currency options */
    const getCurrencyOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/currencies/`,
            auth: true,
            success: (response) => {
                let currencyOptionsTemp = [];
                response.data?.map((value) => {
                    currencyOptionsTemp.push({ value: value.id, label: `${value.currency_code} - ${value.currency}` });
                });
                setTimeout(() => {
                    dispatch(setCurrencyOptions(currencyOptionsTemp))
                }, 80);
            },
        });
    };

    /* Get and set all the unit type options */
    const getUnitTypeOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/billunits/`,
            auth: true,
            success: (response) => {
                let unitTypeOptionsTemp = [];
                response.data?.map((value) => {
                    unitTypeOptionsTemp.push({ value: value.id, label: value.unit });
                });
                setTimeout(() => {
                    dispatch(setUnitTypeOptions(unitTypeOptionsTemp))
                }, 80);
            },
        });
    };


    /* Get source language options */
    const getLanguages = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                dispatch(setLanguageOptionsList(response.data))
            },
        };
        Config.axios(params);
    };

    const getCardContent = async() => {
        // setCardLoaders(true)
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let data = await fetch(`${Config.STRAPI_BASE_URL}/api/all-template-app?populate=deep`, requestOptions)
        if (data.status === 200) {
            let response = await data.json()
            let {
                apps_template_cards
            } = response?.data?.attributes

            let AppsCardsInfo = []
            apps_template_cards.data?.map((each) => {
                AppsCardsInfo.push(each)
            })

            dispatch(setAllTemplateList({
                res: AppsCardsInfo?.flat(1)
            }))
            // setDataItem(AppsCardsInfo?.flat(1));
            // DataItem.current = AppsCardsInfo?.flat(1)
            // setCardLoaders(false)
        }
    } 

    const getFilterCardContent = async() => {
        // setCardLoaders(true)
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let data = await fetch(`${Config.STRAPI_BASE_URL}/api/app-template?populate=deep`, requestOptions)
        if (data.status === 200) {
            let response = await data.json()
            let {
                Apps_Templates
            } = response?.data?.attributes

            let AppsCardsInfo = []
            Apps_Templates?.map((each) => {
                AppsCardsInfo.push(each.apps_template_cards.data.flat(1))
            })
            dispatch(setIndividualTemplateList({
                res: AppsCardsInfo?.flat(1)
            }))
            // setDataFilterItem(AppsCardsInfo?.flat(1));
            // DataFilterItem.current = AppsCardsInfo?.flat(1)
            // setCardLoaders(false)
        }
    }


    const acceptCookie = () => {
        // To accept the cookies
        Cookies.set("cookieAccepted", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 }); // this willse the cookie under cookieAccepted name for 5 years
        setIsCookieAccepted(true); // Make cookie accepted to true
    };

    if (Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) === undefined) {
        window.location.href = import.meta.env.VITE_APP_LOGIN_URL;
    }

    useEffect(() => {
        if (userDetails !== null) {
            let editorSettingsCookieData = Cookies.get("editor-settings-alert-modal-shown")
            if (userDetails?.is_vendor && userDetails?.first_login) {
                // console.log(editorSettingsCookieData?.id)
                // console.log(userDetails?.pk)
                if (editorSettingsCookieData !== undefined) {
                    let a = JSON.parse(editorSettingsCookieData)
                    if (a?.id != userDetails?.pk && userDetails?.first_login) {
                        // console.log(a)
                        // console.log('inside if')
                        Cookies.remove("editor-settings-alert-modal-shown", { domain: Config.COOKIE_DOMAIN })
                    }
                }

                // console.log("cookie " + Cookies.get("editor-settings-alert-modal-shown"))
                if (Cookies.get("editor-settings-alert-modal-shown") === undefined || Cookies.get("editor-settings-alert-modal-shown") === null) {
                    dispatch(setEditorSettingAlertModal(true))
                    let cookieValue = { id: userDetails?.pk, show: true }
                    Cookies.set("editor-settings-alert-modal-shown", JSON.stringify(cookieValue), { domain: Config.COOKIE_DOMAIN })
                    // setTimeout(() => {
                    //     Cookies.remove("editor-settings-alert-modal-shown", { domain: Config.COOKIE_DOMAIN })
                    // }, 15000);
                }
            }
            if (!userDetails?.first_login) {
                if (Cookies.get("editor-settings-alert-modal-shown") !== undefined) {
                    Cookies.remove("editor-settings-alert-modal-shown", { domain: Config.COOKIE_DOMAIN })
                }
            }
        }
    }, [userDetails])

    return (
        <>
            {
                Config.IS_MAINTANCE === 'true' ? (
                    <Maintenance />
                ) : (
                    <>
                        <CacheBuster
                            currentVersion={packageJson?.version}
                            isEnabled={true}
                        />

                        {/* validates the cookies when the document page get visibility - if validator fails redirect to login page */}
                        <CookieChecker 
                            cookieName={import.meta.env.REACT_APP_USER_COOKIE_KEY_NAME}
                            url={import.meta.env.REACT_APP_LOGIN_URL}
                            jsonKey="token"
                            guardClause={true}
                        />

                        <>
                            <div
                                className={(userDetails?.is_campaign && showCampaignCouponStrip && false) ? "body-responsive strip-banner" : "body-responsive"}
                                id="body-wrap"
                            >
                                <AllRoutes/>
                            </div>
                        </>
                        {
                            downloadingFileList?.length !== 0 && (
                                <GlobalDownloadBox />
                            )
                        }
                        
                        <ToastContainer position="top-left" limit={1} icon={false} />
                        <UpdateProfileSettingAlertModal />

                        {/* {
                            isCookieAccepted === false && cookieShowRoute.indexOf(window?.location?.pathname) !== -1 && (
                                <div className="ai-cookie-policy-section cookie-appearance-anim">
                                    <div className="ai-cookie-policy-cont">
                                        <img src={Config.HOST_URL + "assets/images/new-ui-icons/cookie-icon.svg"} alt="cookie-icon" />
                                        <h1>Cookies And Privacy</h1>
                                        <p>
                                            By clicking “Accept all cookies”, you agree Ailaysa can store cookies on your device and disclose information in accordance with our
                                            Cookie Policy.
                                        </p>
                                        <ButtonBase>
                                            <button className="ai-cookie-button" onClick={() => acceptCookie()}>
                                                Accept all cookies
                                            </button>
                                        </ButtonBase>
                                    </div>
                                </div>
                            )
                        } */}
                       
                        {/* {showGlobalTransition &&
                            <Router>
                                <AllTemplateMain> 
                                    <Switch>
                                        <Route exact path="/create/:category/:menu" element={<ProjectSetup />} />
                                        <Route exact path="/create/:category/:menu/:action" element={<ProjectSetup />} />
                                        {Config.userState?.internal_member_team_detail?.role != 'Editor' && <Route exact path="/create/:category" element={<ProjectSetup />} />}
                                    </Switch>
                                </AllTemplateMain>
                            </Router>
                        } */}
                        {/* <button onClick={() => dispatch(setShowGlobalTransition(true))}>
                            click
                        </button> */}
                    </>
                )
            }
        </>
    );
}
export default App;
