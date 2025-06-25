import React from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import CheckCircleSuccess from "../assets/images/new-ui-icons/check_circle_success.svg"
import ErrorBlackWarn from "../assets/images/new-ui-icons/error_black_warn.svg"
import RemoveCircleRed from "../assets/images/new-ui-icons/remove_circle_red.svg"

/* userState cookie for authentication */
export let userState = JSON.parse(
    typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
);

// const ConfirmCloseButton = withStyles((theme) => ({
//     root: {
//         backgroundColor: "#EBEBEB",
//         borderRadius: "3px",
//         boxShadow: "none",
//         textTransform: "none",
//         padding: "8px 10px",
//         "&:hover": {
//             backgroundColor: "#EBEBEB",
//             boxShadow: "none",
//         },
//     },
// }))(Button);

// const ConfirmDeleteButton = withStyles((theme) => ({
//     root: {
//         backgroundColor: "#0078D4",
//         borderRadius: "3px",
//         boxShadow: "none",
//         textTransform: "none",
//         padding: "8px 10px",
//         "&:hover": {
//             backgroundColor: "#0078D4",
//             boxShadow: "none",
//         },
//     },
// }))(Button);

let debounceCallTimer = null;


const Config = {
    DEBUG: import.meta.env.VITE_APP_DEBUG, //Check for DEBUG enable or not
    log: (param, extraArgs = []) => {
        // Customized console.log()
        if (Config.DEBUG) {
            let printTime = extraArgs.indexOf("time") != -1 ? true : false;
            if (printTime) {
                var currentTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds();
            }
            if (typeof param === "object") {
                if (printTime) console.log(currentTime);
            } else {
                if (printTime) console.log("%c " + param + " (" + currentTime + ")", "color: #FF0000; font-weight: 600");
                else console.log("%c " + param, "color: #FF0000; font-weight: 600");
            }
            if (extraArgs.indexOf("break") != -1) Config.log("-----------------------------");
        }
    },
    userState: userState,
    planState: import.meta.env.VITE_APP_PLAN_COOKIE_KEY_NAME,
    HOST_URL: "/",
    BASE_URL: import.meta.env.VITE_APP_BASE_URL, //Main API BASE_URL
    LAB_URL: import.meta.env.VITE_APP_LABS_API, //Main API BASE_URL
    PDF_URL: import.meta.env.VITE_APP_PDF_URL,
    DEFAULT_ERROR_MESSAGE: "Something went wrong", //This will show when not handling error in axios
    COOKIE_DOMAIN: import.meta.env.VITE_APP_COOKIE_DOMAIN, //cookie based on this environment
    USER_PORTAL_HOST: import.meta.env.VITE_APP_USER_PORTAL_HOST, //Userportal URL
    MARKETPLACE_HOST: import.meta.env.VITE_APP_MARKETPLACE_HOST, //marketplace URL
    TRANSEDITOR_HOST: import.meta.env.VITE_APP_TRANSEDITOR_PORT, //transeditor URL
    DESIGNER_HOST: import.meta.env.VITE_APP_DESIGNER_HOST, //Designer URL
    CHAT_BASE_URL: import.meta.env.VITE_APP_CHAT_BASE_URL, //Chat API BASE_URL
    STRAPI_BASE_URL: import.meta.env.VITE_APP_STRAPI_BASE_URL, //Card Content API BASE_URL
    IS_MAINTANCE: import.meta.env.VITE_APP_MAINTANCE,
    AI_GEN_URL: import.meta.env.VITE_APP_AI_GEN_URL,
    STATIC_URL:import.meta.env.VITE_APP_STATIC_URL,
    redirectIfNotLoggedIn: function (props) {
        //Redirect to specified page if not logged in
        if (Config.userState === null) {
            window.location.href = import.meta.env.VITE_APP_LOGIN_URL;
        }
    },
    toast: function (alertText = "", type = "success", dismiss=false,alertheadtext="",alertsubheadtext="",onClick = null) {
        //Toast alert
        // toast.configure();
        toast.clearWaitingQueue();
        // dismiss/remove all toast
        if(dismiss){
            toast.dismiss();
            return;
        } 
        let AlertContent = () => (
            <div className="toast-align">
                <span className="toast-img">
                    <img src={CheckCircleSuccess} />
                </span>
                <div className="classWithFontStyleOrWhatever">{alertText}</div>
            </div>
        );
        switch (type) {
            case "warning": {
                // To show warnings
                AlertContent = () => (
                    <div className="toast-align">
                        <span className="toast-img">
                            <img src={ErrorBlackWarn} />
                        </span>
                        <div className="classWithFontStyleOrWhatever">{alertText}</div>
                    </div>
                );
                return toast.warn(<AlertContent />, {
                    transition: Slide,
                    position: "top-center",
                     autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            case "info": {
                //To show information
                AlertContent = () => (
                    <div className="toast-align">
                        <span className="toast-img">
                            <img src={ErrorBlackWarn} />
                        </span>
                        <div className="classWithFontStyleOrWhatever">{alertText}</div>
                    </div>
                );
                return toast.info(<AlertContent />, {
                    transition: Slide,
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            case "error": {
                //To show error messages
                AlertContent = () => (
                    <div className="toast-align">
                        <span className="toast-img">
                            <img src={RemoveCircleRed} />
                        </span>
                        <div className="classWithFontStyleOrWhatever">{alertText}</div>
                    </div>
                );
                return toast.error(<AlertContent />, {
                    transition: Slide,
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    limit: 1,
                });
            }
            case "support":{
                // To show warnings
                AlertContent = () => (
                    <div className="toast-align">
                        
                        <span className="toast-img">
                            <img src={ErrorBlackWarn} />
                        </span>
                        <div>
                        <div className="head_classWithFontStyleOrWhatever">{alertheadtext}</div>
                        <div className="desc_classWithFontStyleOrWhatever">{alertsubheadtext}</div>
                        <div className="subhead_classWithFontStyleOrWhatever" onClick={onClick}>{alertText}</div>
                        </div>
                    </div>
                );
                return toast.warn(<AlertContent />, {
                    transition: Slide,
                    position: "top-center",
                     autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            default: {
                // To show success alert
                return toast.success(<AlertContent />, {
                    transition: Slide,
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    },
    axios: (params) => {
        //Common axios handling
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        // refresh the page if the access token does not match
        if (userState?.token !== userCacheData?.token) {
            window.location.reload()
        }
        let token = userCacheData != null ? userCacheData?.token : "";
        let headers = {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
        };
        if (params.headers != null) headers = params.headers; //Setting headers
        if (params.auth != null) {
            //If auth needs
            if (params.auth === true) headers["Authorization"] = `Bearer ${token}`;
        }

        let axiosObj = {
            method: params.method,
            url: params.url,
            headers: headers,
            ...(params.signal !== undefined && {signal: params.signal})
        };
        if (params.method == null)
            //Define method
            params["method"] = "GET";
        if (params?.data != null || params?.formData != null)
            //If data, set the data
            axiosObj["data"] = params?.data != null ? params.data : params?.formData != null && params.formData;
        if (params?.timeout != null)
            // If timeout need
            params["timeout"] = params?.timeout;
        axios(axiosObj)
            .then((response) => {
                if (params?.success != null) params.success(response); //Callback to the param's success function
            })
            .catch((error) => {
                /*Create Refresh Token if access_token expires - start*/
                if (error.response?.data?.messages !== undefined && error.response?.data?.messages.length !== 0 && error.response?.data?.messages[0]?.token_class === "AccessToken") {
                    let refreshToken = userState != null ? userState.refresh_token : "";
                    let formData = new FormData();
                    formData.append("refresh", refreshToken);
                    Config.axios({
                        url: Config.BASE_URL + "/auth/dj-rest-auth/token/refresh/",
                        method: "POST",
                        data: formData,
                        auth: true,
                        success: (response) => {
                            let userData = Config.userState;
                            userData.token = response.data.access;
                            Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, { domain: Config.COOKIE_DOMAIN });
                            Cookies.set(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, JSON.stringify(userData), { domain: Config.COOKIE_DOMAIN });
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 500);
                            Config.axios(params);
                        },
                        error: (error) => {
                            console.error(error.response.status);
                            if (Config.userState !== null) Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, { domain: Config.COOKIE_DOMAIN });
                            window.location.href = import.meta.env.VITE_APP_LOGIN_REDIRECT_URL;
                        },
                    });
                } else if (error.response?.data?.msg === "Unauthorised" || error.response?.data?.code === "bad_authorization_header") {
                    //Logout if unauthorized response came
                    Config.logout();
                } else if (params.error != null) params.error(error);
                else {
                    Config.log(params.url);
                    Config.log(error);
                    toast.clearWaitingQueue();
                    // don't show the "Something went wrong toast" when axios request is canceled (canceled manually)
                    if(!axios.isCancel(error)){
                        Config.toast(Config.DEFAULT_ERROR_MESSAGE, "error");
                    }
                }
            })
            .finally(() => {
                if (params.finally != null) params.finally();
            });
    },
    logout: function (props) {
        //Logout the user
        if (Config.userState !== null) Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, { domain: Config.COOKIE_DOMAIN });
        if (Config.planState !== null) Cookies.remove(import.meta.env.VITE_APP_PLAN_COOKIE_KEY_NAME, { domain: Config.COOKIE_DOMAIN });
        Cookies.remove("editor-settings-alert-modal-shown", { domain: Config.COOKIE_DOMAIN })
        Cookies.remove("first-chat-box-open", { domain: Config.COOKIE_DOMAIN })
        Cookies.remove("hideCampaignStrip", { domain: Config.COOKIE_DOMAIN })
        if (typeof Cookies.get("redirection_domain") != "undefined") Cookies.remove("redirection_domain", { domain: Config.COOKIE_DOMAIN });
        setTimeout(() => {
            window.location.href = import.meta.env.VITE_APP_LOGIN_URL;
        }, 200);
    },
    removeItemFromArray: (arr, item) => {
        //To remove an item the :arr by value
        return arr.filter((f) => f !== item);
    },
    confirm: (callback, args = [], alertText = "Are you sure?", buttonText = ["Yes", "No"]) => {
        //Ask confirmation to the user. Common function
        // toast.configure();
        let AlertContent = ({ closeToast }) => (
            <div className="confirm-container">
                <div className="toast-align-confirm">
                    <div className="confirm-toast-title">{alertText}</div>
                </div>
                <div className="toast-align-confirm mt-3">
                    <button className="mr-3 config-ConfirmCloseButton" onClick={closeToast}>
                        <span className="confirm-close-button">{buttonText[1]}</span>
                    </button>
                    <button className="config-ConfirmDeleteButton" onClick={() => callback(...args)}>
                        <span className="confirm-delete-button">{buttonText[0]}</span>
                    </button>
                </div>
            </div>
        );
        return toast(<AlertContent />, {
            position: "top-center",
            autoClose: 5000,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            limit: 1,
        });
    },
    convertUTCToLocal: (timestamp, response = "datetime") => {
        //Convert the given :timestamp to local time from UTC
        if (!timestamp) return null;
        let convertedDateTime = new Date(new Date(timestamp).toLocaleDateString("en-US") + " " + new Date(timestamp).toLocaleTimeString("en-US"));
        switch (response) {
            case "date":
                // return convertedDateTime.toLocaleDateString('en-US')
                return convertedDateTime.getFullYear() + "-" + (convertedDateTime.getMonth() + 1) + "-" + convertedDateTime.getDate();
            case "time":
                return convertedDateTime.toLocaleTimeString("en-US", { timeStyle: "short" });
            default:
                return convertedDateTime;
        }
    },
    convertLocalToUTC: (timestamp, response = "datetime") => {
        //Convert the given :timestamp to UTC
        if (!timestamp) return null;
        let convertedDateTime = timestamp.toISOString().slice(0, 19).replace("T", " ");
        switch (response) {
            case "date":
                // return convertedDateTime.toLocaleDateString('en-US')
                return convertedDateTime.getFullYear() + "-" + (convertedDateTime.getMonth() + 1) + "-" + convertedDateTime.getDate();
            case "time":
                return convertedDateTime.toLocaleTimeString("en-US", { timeStyle: "short" });
            default:
                return convertedDateTime;
        }
    },
    getDateObject: (givenDate, format = "yyyy/mm/dd") => {
        let dateObject = {};
        if (!givenDate) return null;
        return (dateObject = { year: givenDate.getFullYear(), month: givenDate.getMonth(), date: givenDate.getDate() });
    },
    getDateInUniversalFormat: (givenDate) => {
        if (givenDate) {
            let formatted_date = "";
            let date_str = givenDate,
                options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    // second: "2-digit",
                },
                formatted = new Date(date_str).toLocaleDateString("en", options),
                date_parts = formatted.substring(0, formatted.indexOf(",")).split(" ").reverse().join(" ");

            formatted_date = date_parts + formatted.substr(formatted.indexOf(",") + 1);

            return formatted_date;
        } else return null;
    },
    getProjectCreatedDate: (project_date) => {
        if (project_date !== null) {
            let todayDate = new Date();
            let projectDate = new Date(project_date);
            // if created today: display time only
            if (todayDate.toDateString() == projectDate.toDateString()) {
                return projectDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            }
            // if created yesterday: display month day & time only
            else if (projectDate < todayDate && todayDate.getFullYear() == projectDate.getFullYear()) {
                return projectDate.toDateString().slice(4, 10) + ", " + projectDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            }
            // if created previous year: display month day year & time
            else {
                return projectDate.toDateString().slice(4) + ", " + projectDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            }
        }
    },
    // this method will remove all the html notation characters from the string
    unescape: (s) => {
        var re = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp);/g;
        var unescaped = {
            '&amp;': '&',
            '&#38;': '&',
            '&lt;': '<',
            '&#60;': '<',
            '&gt;': '>',
            '&#62;': '>',
            '&apos;': "'",
            '&#39;': "'",
            '&quot;': '"',
            '&#34;': '"',
            '&nbsp;': ' '
        };
        return s?.replace(re, function (m) {
            return unescaped[m];
        });
    },

    // downloads file from api in the browser
    downloadFileInBrowser: (response) => {
        const filename = response?.headers['content-disposition']?.split('filename*=')[1] ? response?.headers['content-disposition']?.split('filename*=')[1] : response?.headers['content-disposition']?.split('filename=')[1];
        let decodedFileName = decodeURIComponent(filename.replace(`UTF-8''`, ''))
        const blob_url = URL.createObjectURL(new Blob([response?.data]));
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = blob_url;
        a.download = decodedFileName;
        a?.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(blob_url);
            document.body.removeChild(a);
        }, 10)
    },

    downloadFileFromApi: (url) => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        // console.log(a);
        let token = userCacheData != null ? userCacheData?.token : "";
        return axios.get(
            url,
            {
                responseType: "blob",
                /* 
                */
                headers: {
                    "Access-Control-Expose-Headers": "Content-Disposition",
                    Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                },
            }
        );
    },

    // helper method which calculate the time left in precentage 
    // task start-date, end-date and the date when user checks based on this input it return the time left for reaching the end-date in percentage
    calculateTimeLeftPercentage: (startDate, endDate) => {
        let currentTime = Date.parse(new Date());
        let endTime = Date.parse(endDate);
        if (currentTime > endTime) {
            return 0;
        }

        var timeDiff = Math.abs(endTime - currentTime); // Difference in milliseconds
        var totalMillisecs = Math.abs(endTime - Date.parse(startDate)); // Total milliseconds between start date and end date

        var percentage = (timeDiff / totalMillisecs) * 100;
        return percentage.toFixed(2); // Return the percentage rounded to 2 decimal places
    },

    // debounce/delays the api callsthat is 
    debounceApiCalls : (callback) => {
        if (debounceCallTimer) {
            clearTimeout(debounceCallTimer);
        }
            debounceCallTimer = setTimeout(() => {
            callback();
            debounceCallTimer = null;
        }, 500); // Adjust the debounce delay as needed
    },

    // extract filename and extension from filename
    getNameAndExtension: (filename) => {
        const lastDotIndex = filename.lastIndexOf(".");
        const name = filename.substring(0, lastDotIndex);
        const extension = filename.substring(lastDotIndex);
        return {name, extension}
    },

    changeToSimpleDateFormat: (date) => {
        // Assuming you have a Date object
        if(date === null || date === undefined) return ''
        const yourDate = date;

        // Get the individual components of the date
        const year = yourDate.getFullYear();
        const month = String(yourDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(yourDate.getDate()).padStart(2, '0');
        // Create the formatted date string
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    },

    // input - key
    // output - sorted object based on the provided key
    sortObjectByPropery: (key) => {
        return function(a, b) {
            if (a[key]?.toLowerCase() < b[key]?.toLowerCase()) {
              return -1;
            }
            if (a[key]?.toLowerCase() > b[key]?.toLowerCase()) {
              return 1;
            }
            return 0;
        };
    },
    
    openLinksInWindow: (link) => {
        const specs = 'width=800,height=600'
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;
        var windowWidth = parseInt(specs.split(",")[0].split("=")[1]);
        var windowHeight = parseInt(specs.split(",")[1].split("=")[1]);
        var left = (screenWidth - windowWidth) / 2;
        var top = (screenHeight - windowHeight) / 2;
        var newSpecs = specs + ',top=' + top + ',left=' + left;
        window.open(link, '_blank', newSpecs);
        return false;
    },

    updateSpecificKeyInList: (list, id, key, value) => {
        let newArr = list?.map(obj => {
            if(obj?.id === id){
                return {
                    ...obj,
                    [key]: value
                }
            }else{
                return obj;   
            }
        })
        return newArr;
    }
};
export default Config;
