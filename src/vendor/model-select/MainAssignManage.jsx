import React, { useState, useEffect, useRef } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Event from "../styles-svg/Event";
import Person from "../styles-svg/Person";
import AccountIcon from "../styles-svg/Account";
import NotesIcon from "../styles-svg/Notes";
import Select, { components } from "react-select";
import Config from "../Config";
// import MomentTimePicker from "../date-time-picker/MomentTimePicker";
import DatePicker from "../date-time-picker/DatePicker";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ButtonBase } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CustomTimePicker } from "../custom-component/CustomTimePicker";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector, useDispatch } from 'react-redux';
import { indianLanguages } from './../custom-component/IndianLanguages';
import { AssignmentReferenceInfo } from './AssignmentReferenceInfo';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import generateKey from './../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from "../../features/FileDownloadingListSlice";
import SearchIcon from '@mui/icons-material/Search';
import { TextareaAutosize } from "@mui/material";
import { ButtonLoader } from "../../loader/CommonBtnLoader";
import Skeleton from '@mui/material/Skeleton';
import { t } from "i18next";
import { useLocation } from "react-router";
import FileDownloadBlack from "../../assets/images/file_download_black.svg"
import NoEditorInfo from "../../assets/images/new-project-setup/no-editor-info-icon.svg"
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"

const customRatesSelectStyles = {
    placeholder: (provided, state) => ({
        ...provided,
        color: !state.isDisabled ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
        // paddingLeft: 7,
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #0000000D",
        borderRadius: "4px",
        width: "300px",
    }),
    // menuPortal: base => ({ ...base, zIndex: 9999 }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: "0px solid #CED4DA",
        borderLeft: "2px solid transparent",
        color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
        background: state.isSelected ? "#F4F5F7" : "#ffffff",
        padding: "5px 8px",
        color: "#3C4043",
        fontFamily: "Roboto",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "24px",
        "&:hover": {
            background: "#F4F5F7",
            borderLeft: "2px solid #0074D3",
            cursor: "pointer",
        },
    }),
    control: (base, state) => ({
        ...base,
        borderBottom: state.isFocused ? "0px solid #0074D3" : "0px solid #E4E7E9",
        borderTop: "0px solid #E4E7E9",
        borderRight: "0px solid #E4E7E9",
        borderLeft: "0px solid #E4E7E9",
        borderRadius: 3,
        transtion: 0.3,
        backgroundColor: state.isFocused ? "#F3F3F3" : "#F3F3F3",
        color: state.isFocused ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: 1,
        boxShadow: 0,
        height: 28,
        minHeight: 28,
        width: "120px",
        // minWidth: "100%",
        cursor: "auto",
        "&:hover": {
            borderBottom: "0px solid #E4E7E9",
            cursor: "pointer",
            backgroundColor: "#F3F3F3"
        },
    }),
};

const customUnitTypeSelectStyles = {
    placeholder: (provided, state) => ({
        ...provided,
        color: !state.isDisabled ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
        // paddingLeft: 7,
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #0000000D",
        borderRadius: "4px",
        width: "100%",
    }),
    // menuPortal: base => ({ ...base, zIndex: 9999 }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: "0px solid #CED4DA",
        borderLeft: "2px solid transparent",
        color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
        background: state.isSelected ? "#F4F5F7" : "#ffffff",
        padding: "5px 8px",
        color: "#3C4043",
        fontFamily: "Roboto",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "24px",
        "&:hover": {
            background: "#F4F5F7",
            borderLeft: "2px solid #0074D3",
            cursor: "pointer",
        },
    }),
    control: (base, state) => ({
        ...base,
        borderBottom: state.isFocused ? "0px solid #0074D3" : "0px solid #E4E7E9",
        borderTop: "0px solid #E4E7E9",
        borderRight: "0px solid #E4E7E9",
        borderLeft: "0px solid #E4E7E9",
        borderRadius: 3,
        transtion: 0.3,
        backgroundColor: state.isFocused ? "#F3F3F3" : "#F3F3F3",
        color: state.isFocused ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: 1,
        boxShadow: 0,
        height: 28,
        minHeight: 28,
        width: "120px",
        // minWidth: "100%",
        cursor: "auto",
        "&:hover": {
            borderBottom: "0px solid #E4E7E9",
            cursor: "pointer",
            backgroundColor: "#F3F3F3"
        },
    }),
};

const customRatesWidthSelectStyles = {
    placeholder: (provided, state) => ({
        ...provided,
        color: !state.isDisabled ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
        paddingLeft: 7,
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #0000000D",
        borderRadius: "4px",
        width: "100%",
    }),
    // menuPortal: base => ({ ...base, zIndex: 9999 }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: "0px solid #CED4DA",
        borderLeft: "2px solid transparent",
        color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
        background: state.isSelected ? "#F4F5F7" : "#ffffff",
        padding: "5px 8px",
        color: "#3C4043",
        fontFamily: "Roboto",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "24px",
        "&:hover": {
            background: "#F4F5F7",
            borderLeft: "2px solid #0074D3",
            cursor: "pointer",
        },
    }),
    control: (base, state) => ({
        ...base,
        borderBottom: state.isFocused ? "0px solid #0074D3" : "0px solid #E4E7E9",
        borderTop: "0px solid #E4E7E9",
        borderRight: "0px solid #E4E7E9",
        borderLeft: "0px solid #E4E7E9",
        borderRadius: 3,
        transtion: 0.3,
        backgroundColor: state.isFocused ? "#F3F3F3" : "#F3F3F3",
        color: state.isFocused ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
        boxShadow: 0,
        height: 28,
        minHeight: 28,
        width: "206px",
        // minWidth: "100%",
        cursor: "auto",
        "&:hover": {
            borderBottom: "0px solid #E4E7E9",
            cursor: "pointer",
            backgroundColor: "#F3F3F3"
        },
    }),
};

const customAcceptedSelectStyles = {
    placeholder: (provided, state) => ({
        ...provided,
        color: !state.isDisabled ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
        paddingLeft: 7,
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px",
        margin: "0px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #0000000D",
        borderRadius: "4px",
        width: "100%",
    }),
    // menuPortal: (base, state) => ({ 
    // 	...base, 
    // 	zIndex: 1080, 
    // 	top: "unset",
    // 	left: "unset",
    // 	// overflow: state.isFocused ? "hidden" : "auto"
    // }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: "0px solid #CED4DA",
        borderLeft: "2px solid transparent",
        color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
        background: state.isSelected ? "#F4F5F7" : "#ffffff",
        padding: "5px 8px",
        color: "#3C4043",
        fontFamily: "Roboto",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "24px",
        "&:hover": {
            background: "#F4F5F7",
            borderLeft: "2px solid #0074D3",
            cursor: "pointer",
        },
    }),
    control: (base, state) => ({
        ...base,
        borderBottom: state.isFocused ? "0px solid #0074D3" : "0px solid #E4E7E9",
        borderTop: "0px solid #E4E7E9",
        borderRight: "0px solid #E4E7E9",
        borderLeft: "0px solid #E4E7E9",
        borderRadius: 3,
        transtion: 0.3,
        backgroundColor: state.isFocused ? "#F3F3F3" : "#ffffff",
        color: state.isFocused ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
        boxShadow: 0,
        height: 36,
        minHeight: 36,
        width: "120px",
        // minWidth: "100%",
        cursor: "auto",
        "&:hover": {
            borderBottom: "0px solid #E4E7E9",
            cursor: "pointer",
            backgroundColor: "#F3F3F3"
        },
    }),
};




const MainAssignManage = (props) => {
    const {
        setShowIndividualAssignManage,
        showIndividualAssignManage,
        assignStep,
        selectedFileRow,
        targetLanguageOptionsRef,
        listFiles
    } = props

    const dispatch = useDispatch()
    const location = useLocation()
    const userDetails = useSelector((state) => state.userDetails.value)
    const currencyOption = useSelector((state) => state.currencyOptions.value)
    const unitTypeOption = useSelector((state) => state.unitTypeOptions.value)
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value)
    let isEnterprise = userDetails?.is_enterprise 

    // for federal news - it displays only internal editor list for assignment
    const isFederalInternalEditorOnly = location.pathname?.includes('my-stories') ? true : false

    const assignSettingDivRef = useRef(null)
    const [currencySelect, setCurrencySelect] = useState(null);
    const [unitTypeSelect, setUnitTypeSelect] = useState(null);
    const [selectedEditor, setSelectedEditor] = useState({})
    const [assignToDrpdown, setAssignToDrpdown] = useState(false)
    const [editorList, setEditorList] = useState([])
    const [deadline, setDeadline] = useState(null)
    const [UnitRate, setUnitRate] = useState(null)
    const [estimatedHours, setEstimatedHours] = useState(null)
    const [instructionText, setInstructionText] = useState('')
    const [isEditorAilaysa, setIsEditorAilaysa] = useState(false)
    const [isInternalEditor, setIsInternalEditor] = useState(false)
    const [isEditorListLoading, setIsEditorListLoading] = useState(false)
    const [userSubscriptionName, setUserSubscriptionName] = useState(null)
    const [taskVenStatus, setTaskVenStatus] = useState(null)
    const [isTaskAssigned, setIsTaskAssigned] = useState(false)
    const [taskDetailsFromApi, setTaskDetailsFromApi] = useState(null)

    const [instructionLocalFiles, setInstructionLocalFiles] = useState([]);
    const [instructionApiFiles, setInstructionApiFiles] = useState([])
    const [countType, setCountType] = useState({ value: 'True', label: t('raw_count') });

    const [showAcceptedRate, setShowAcceptedRate] = useState(false)
    const [showBiddedRate, setShowBiddedRate] = useState(false)

    const [editorsAcceptedRates, setEditorsAcceptedRates] = useState(null)
    const [editorsBiddedRate, setEditorsBiddedRate] = useState(null)
    const [editorsGivenRate, setEditorsGivenRate] = useState(null)
    const [viewAllEditor, setViewAllEditor] = useState({ external: false, internal: false, agency: false })

    const [redirectionToMarketplace, setRedirectionToMarketplace] = useState(null)

    const [editorSearchText, setEditorSearchText] = useState('')

    const [isInternalEditorSelected, setIsInternalEditorSelected] = useState(false)
    const [editorListHasScrollAtBottom, setEditorListHasScrollAtBottom] = useState(false);
    const [editorListHasScrollbar, setEditorListHasScrollbar] = useState(false);
    const [assignManageHasScrollAtBottom, setAssignManageHasScrollAtBottom] = useState(false);
    const [assignManageHasScrollbar, setAssignManageHasScrollbar] = useState(false);
    const [isAssigning, setIsAssigning] = useState(false);

    const [scrollX, setscrollX] = useState(0);
    const [scrolEnd, setscrolEnd] = useState(false);

    const currencyOptionsRef = useRef(null)
    const editorListWrapRef = useRef();
    const assignManageWrapRef = useRef();
    const unitTypeOptionRef = useRef([])
    const assignDrpdownOutside = useRef();
    const lastFunctionCall = useRef(null)
    const fileBrowserInputRef = useRef(null)
    const acceptedRatesRef = useRef(null);
    const biddedRatesRef = useRef(null);
    let scrl = useRef(null);
    const isProjectAssignedRef = useRef(false)
    const taskAssignmentInfo = useRef([])
    const taskAssignmentDataRef = useRef(null)
    const projectDataRef = useRef(null)
    const editorListRef = useRef(null)

    const countTypeOptions = [
        { value: 'True', label: t('raw_count') },
        { value: 'False', label: t('weighted_count') }
    ]

    const handleOpenAcceptedRateBox = () => {
        setShowAcceptedRate(true)
    }

    const handleOpenBiddedRateBox = () => {
        setShowBiddedRate(true)
    }

    const handleEditorDropdown = (e) => {
        setAssignToDrpdown(true)
    }

    const handleDateChange = (newValue) => {
        setDeadline(newValue);
    };


    useEffect(() => {
        getUserPlanDetails()
    }, [])


    useEffect(() => {
        const checkEditorScrollbar = () => {
            const divElement = editorListWrapRef.current;
            if (divElement) {
                const hasScrollbar = divElement.clientHeight < divElement.scrollHeight;
                setEditorListHasScrollbar(hasScrollbar);
            }
        };

        const divElement = editorListWrapRef.current;
        if (divElement) {
            checkEditorScrollbar(); // Check scrollbar initially

            // Attach event listener to recheck when the content changes
            const observer = new MutationObserver(checkEditorScrollbar);
            observer.observe(divElement, { childList: true, subtree: true });

            return () => {
                observer.disconnect(); // Disconnect the observer when component unmounts
            };
        }
    }, []);


    useEffect(() => {
        const checkAssignManageScrollbar = () => {
            const divElement = assignManageWrapRef.current;
            if (divElement) {
                const hasScrollbar = divElement.clientHeight < divElement.scrollHeight;
                setAssignManageHasScrollbar(hasScrollbar);
            }
        };

        const divElement = assignManageWrapRef.current;
        if (divElement) {
            checkAssignManageScrollbar(); // Check scrollbar initially

            // Attach event listener to recheck when the content changes
            const observer = new MutationObserver(checkAssignManageScrollbar);
            observer.observe(divElement, { childList: true, subtree: true });

            return () => {
                observer.disconnect(); // Disconnect the observer when component unmounts
            };
        }
    }, [selectedEditor?.id !== undefined]);


    useEffect(() => {
        if (selectedFileRow.current !== null) {
            isProjectAssignedRef.current = selectedFileRow.current?.assign_enable !== undefined ? !selectedFileRow.current?.assign_enable : false
            taskAssignmentDataRef.current = selectedFileRow.current.task_data?.task_assign_info?.find(each => each.task_assign_detail.step === assignStep)
            projectDataRef.current = selectedFileRow.current.project_data

            let projectType = selectedFileRow.current.project_data?.get_project_type
            if (projectType == 3 || projectType == 4) {
                unitTypeOptionRef.current = unitTypeOption?.filter(each => each.value !== 1 && each.value !== 2)
            } else {
                unitTypeOptionRef.current = unitTypeOption
            }

            setTimeout(() => {
                getTaskAssignInfo()
                // getAllEditorsList()
            }, 80);
        }
    }, [selectedFileRow.current])


    /* Current user plan details get */
    const getUserPlanDetails = () => {
        Config.axios({
            url: `${Config.BASE_URL}/auth/check-subscription/`,
            auth: true,
            success: (response) => {
                setUserSubscriptionName(response.data.subscription_name)
            },
        });
    };

    useEffect(() => {
        if (showIndividualAssignManage) {
            assignSettingDivRef.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [showIndividualAssignManage])

    /* Check for clicing outside of the Assign dropdown panel */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (assignDrpdownOutside.current && !assignDrpdownOutside.current.contains(e.target)) {
                setAssignToDrpdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (acceptedRatesRef.current && !acceptedRatesRef.current.contains(e.target)) {
                setShowAcceptedRate(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (biddedRatesRef.current && !biddedRatesRef.current.contains(e.target)) {
                setShowBiddedRate(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // by default set the view all editor - internal to true
    useEffect(() => {
        if(isEnterprise) setViewAllEditor({ external: false, internal: true, agency: false })
    }, [isEnterprise])
    

    const DropdownIndicatorSelect = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <i
                    style={{ color: "#747474" }}
                    className="fas fa-caret-down"
                />
            </components.DropdownIndicator>
        );
    };

    // toggles the editor [view all] button 
    const handleViewAllBtn = (type) => {
        setViewAllEditor({
            ...viewAllEditor,
            [type]: !viewAllEditor[type]
        })
    }

    const handleEditorSelect = (editor, is_internal = false) => {
        resetRates()
        setSelectedEditor(editor)
        setIsInternalEditor(is_internal)
        if (is_internal) {
            setCurrencySelect(null)
            setUnitTypeSelect(null)
            setUnitRate("")
            setEstimatedHours("")
            setIsInternalEditorSelected(true)
        } else {
            if (editor?.email == 'ailaysateam@gmail.com') {
                getAilaysaServiceRate()
                setIsEditorAilaysa(true)
            } else {
                let vendor_bid = selectedFileRow.current?.bid_info ? selectedFileRow.current?.bid_info[0]?.bid_details?.find(each => each.vendor_id == editor.id && each.bid_step === assignStep) : undefined
                if (vendor_bid) {
                    let { currency, mtpe_count_unit, mtpe_rate, mtpe_hourly_rate, bid_step } = vendor_bid
                    setEditorsBiddedRate({ currency, mtpe_count_unit, mtpe_rate: (mtpe_count_unit !== 3 ? mtpe_rate : mtpe_hourly_rate), step: bid_step })
                }
                fetchAcceptedRates(editor.id)
                setIsEditorAilaysa(false)
            }
            setIsInternalEditorSelected(false)
        }
    }

    // get previous accepted rates of that editor
    const fetchAcceptedRates = (editorId) => {
        // e.stopPropagation(); 
        var formdata = new FormData();
        formdata.append("vendor_id", editorId);
        formdata.append("job_id", selectedFileRow.current?.job);

        Config.axios({
            url: `${Config.BASE_URL}/marketplace/get_previous_accepted_rate/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (response) => {
                if (response.status === 200) {
                    let data = response.data["Previously Agreed Rates"]
                    let rates = Object.values(data[0])[0]
                    if (Object.keys(rates)?.length !== 0) {
                        setEditorsAcceptedRates(rates)
                    } else {
                        let data = response.data["Given Rates"]
                        let rates = Object.values(data[0])?.flat(1)
                        if (Object.keys(rates)?.length !== 0) {
                            setEditorsGivenRate(rates)
                        }
                    }
                } else {
                    Config.toast(`${t("something_went_wrong")}`, 'error')
                }
            },
        });
    }

    const getAilaysaServiceRate = () => {
        let { src_lang_id, tar_lang_id } = selectedFileRow.current
        if (
            (src_lang_id == 17 && indianLanguages?.find(each => each.id == tar_lang_id)) ||
            (tar_lang_id == 17 && indianLanguages?.find(each => each.id == src_lang_id))
        ) {
            setCurrencySelect(currencyOption?.find(each => each.value === 63))
            setUnitTypeSelect(unitTypeOptionRef.current?.find((element) => element.value === 1))
            setUnitRate(0.99)
        } else {
            setCurrencySelect(currencyOption?.find(each => each.value === 144))
            setUnitTypeSelect(unitTypeOptionRef.current?.find((element) => element.value === 1))
            setUnitRate(0.05)
        }
    }

    // pre-fill the accepted rates
    useEffect(() => {
        if (editorsAcceptedRates !== null && editorsBiddedRate === null) {
            // destructure the editor rates for easy accessibility
            let { currency, mtpe_count_unit, mtpe_rate, step } = editorsAcceptedRates
            if (assignStep === step) {
                setCurrencySelect(currencyOption?.find(each => each.value === currency))
                setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === mtpe_count_unit))
                setUnitRate(mtpe_rate !== null ? mtpe_rate : '')
            }
        }
    }, [editorsAcceptedRates])

    // pre-fill the editors bidded rates
    useEffect(() => {
        if (editorsBiddedRate !== null) {
            // destructure the editor rates for easy accessibility
            let { currency, mtpe_count_unit, mtpe_rate, step } = editorsBiddedRate
            if (assignStep === step) {
                setCurrencySelect(currencyOption?.find(each => each.value === currency))
                setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === mtpe_count_unit))
                setUnitRate(mtpe_rate !== null ? mtpe_rate : '')
            }
        }
    }, [editorsBiddedRate])

    // pre-fill the editor's given rate if there is no bidded and accepted rate (by default it pre-fills the first rate)
    useEffect(() => {
        if (editorsGivenRate && editorsAcceptedRates === null && editorsBiddedRate === null) {
            let { currency, mtpe_count_unit, mtpe_rate, hourly_rate } = editorsGivenRate[0]
            setCurrencySelect(currencyOption?.find(each => each.value === currency))
            setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === mtpe_count_unit))
            setUnitRate(mtpe_count_unit !== 3 ? (mtpe_rate !== null ? mtpe_rate : '') : (hourly_rate !== null ? hourly_rate : ''))
        }
    }, [editorsGivenRate])


    // if editor's given rate is available - change the mtpe_rate and hourly rate based on unit-type
    useEffect(() => {
        if (editorsGivenRate && editorsAcceptedRates === null) {
            let givenRate = editorsGivenRate?.find(each => each.currency === currencySelect?.value)
            if (unitTypeSelect?.value === 3) {
                setUnitRate(givenRate?.hourly_rate !== null ? givenRate?.hourly_rate : '')
            } else {
                setUnitRate(givenRate?.mtpe_rate !== null ? givenRate?.mtpe_rate : '')
            }
        }
    }, [unitTypeSelect])

    // if editor's given rate is available - change the rates based on the selected currency
    useEffect(() => {
        if (editorsGivenRate && editorsAcceptedRates === null) {
            if (editorsGivenRate?.find(each => each.currency === currencySelect?.value)) {
                let { mtpe_count_unit, mtpe_rate, hourly_rate } = editorsGivenRate?.find(each => each.currency === currencySelect?.value)
                setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === mtpe_count_unit))
                setUnitRate(mtpe_count_unit !== 3 ? (mtpe_rate !== null ? mtpe_rate : '') : (hourly_rate !== null ? hourly_rate : ''))
            } else {
                setUnitTypeSelect(null)
                setUnitRate('')
            }
        }
    }, [currencySelect])

    const limitToFourDecimalPlaces = (number) => {
        // Use the toFixed() method to round the number to four decimal places
        const roundedNumber = Number(number).toFixed(4);
    
        // Convert the result back to a number
        return Number(roundedNumber);
    }

    const getAllEditorsList = () => {
        setIsEditorListLoading(true)
        // if (projectSelect?.id != null && jobSelect?.value != null) {
        let url = `${Config.BASE_URL}/workspace/assign_to/?project=${selectedFileRow.current?.project}&job=${selectedFileRow.current?.job}${(isProjectAssignedRef.current && userDetails?.agency) ? '&reassign=True' : ''}`;
        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                let list = response.data
                let assign_info_of_editor = taskAssignmentInfo.current?.find(each => each.task_assign_detail.step !== assignStep)
                for (const key in list) {
                    if (key !== 'agencies') {
                        if (Object.hasOwnProperty.call(list, key)) {
                            // Use filter to create a new array without the value to remove
                            list[key] = list[key]?.filter(val => (val.id !== assign_info_of_editor?.assign_to_details?.id && (!val?.agency || val?.agency === undefined)));
                        }
                    }
                }
                editorListRef.current = list
                setEditorList(list)
                setIsEditorListLoading(false)
            },
        });
        // }
    };

    // POST method to assign new editor
    const assignEditor = () => {
        let formData = new FormData();
        formData.append("instruction", instructionText?.trim());
        if (deadline !== null) {
            let deadlineUTC = Config.convertLocalToUTC(deadline);
            formData.append("deadline", deadlineUTC);
        }
        formData.append("assign_to", selectedEditor?.id);

        formData.append("step", assignStep);

        let arrDict = [{
            ...(!isInternalEditorSelected && {
                mtpe_rate: UnitRate,
                currency: currencySelect?.value,
                mtpe_count_unit: unitTypeSelect?.value,
                account_raw_count: countType?.value,
                ...(unitTypeSelect?.value === 3 && { estimated_hours: estimatedHours })
            }),
            tasks: [selectedFileRow.current.task],
        }]

        if (instructionLocalFiles?.length !== 0) {
            instructionLocalFiles?.map(file => {
                formData.append("instruction_file", file);
            })
        }
        formData.append("task_assign_detail", JSON.stringify(arrDict))
        if (userDetails?.agency && isProjectAssignedRef.current) {
            formData.append("reassigned", true)
        }
        setIsAssigning(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                Config.toast(t("task_assigned_success"))
                setShowIndividualAssignManage(false)
                listFiles(selectedFileRow.current.project)
                // if (response.data?.msg) {
                // 	setShowIndividualAssignManage(false)
                // } 
                setIsAssigning(false)
            },
            error: (error) => {
                if (error?.response?.status == 400) {
                    Config.toast(t("assig_failed"), "warning");
                }
                if (error.response?.data?.message == "integrirty error") Config.toast(t("already_assigned"), "warning");
                setIsAssigning(false)
            },
        });
    }

    const handleDeselectEditor = () => {
        setSelectedEditor({})
        setUnitRate('')
        setCurrencySelect(null)
        setUnitTypeSelect(null)
        setEstimatedHours('')
        setEditorsAcceptedRates(null)
        setEditorsBiddedRate(null)
    }

    const updateAssign = () => {
        let formData = new FormData();

        formData.append("task", selectedFileRow.current?.task);

        let deadlineUTC = Config.convertLocalToUTC(deadline);
        if(deadlineUTC !== null && deadlineUTC !== undefined){
            formData.append("deadline", deadlineUTC);
        }

        if (taskDetailsFromApi?.assignTo?.id !== selectedEditor?.id) {
            formData.append("assign_to", selectedEditor?.id);
        }

        if (!isInternalEditorSelected) {
            if (taskDetailsFromApi?.mtpeRate !== UnitRate?.toString()?.trim()) {
                formData.append("mtpe_rate", UnitRate);
            }
            if (taskDetailsFromApi?.currency !== currencySelect?.value) {
                formData.append("currency", currencySelect?.value);
            }
            if (taskDetailsFromApi?.mtpeCountUnit !== unitTypeSelect?.value) {
                formData.append("mtpe_count_unit", unitTypeSelect?.value);
            }
            if (unitTypeSelect?.value === 3 && taskDetailsFromApi?.estimatedHours !== estimatedHours) {
                formData.append("estimated_hours", estimatedHours);
            }
            if (String(taskDetailsFromApi?.accountRawCount) !== countType?.value?.toLowerCase()) {
                formData.append("account_raw_count", countType?.value);
            }
        }

        if (taskDetailsFromApi?.instruction !== instructionText?.trim()) {
            formData.append("instruction", instructionText);
        }

        formData.append("step", assignStep);

        if (instructionLocalFiles?.length !== 0) {
            instructionLocalFiles?.map(file => {
                formData.append("instruction_file", file);
            })
        }

        if (userDetails?.agency && isProjectAssignedRef.current) {
            formData.append("reassigned", "True")
        }

        setIsAssigning(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_update/`,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {
                Config.toast(t("task_updated_success"))
                setShowIndividualAssignManage(false)
                listFiles(selectedFileRow.current.project)
                // if (response.data?.msg) {
                // } 
                setIsAssigning(false)
            },
            error: (error) => {
                if (error?.response?.status == 400) {
                    Config.toast(error?.response?.data?.mtpe_rate, "warning");
                }
                if (error.response?.data?.message == "integrirty error") Config.toast(t("already_assigned"), "warning");
                setIsAssigning(false)
            },
        });
    }

    const getTaskAssignInfo = (taskId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/?tasks=${selectedFileRow.current.task}${(userDetails?.agency && isProjectAssignedRef.current) ? '&reassigned=True' : ''}`,
            auth: true,
            success: (response) => {
                taskAssignmentInfo.current = response.data
                if (response.data?.length !== 0) {
                    response?.data?.map((eachRole) => {
                        if (eachRole?.task_assign_detail.step == assignStep) {
                            setIsTaskAssigned(true)

                            let taskDetail = response.data;
                            setInstructionText(eachRole?.instruction);
                            setSelectedEditor(eachRole?.assign_to_details);
                            if (!eachRole?.assign_to_details?.external_editor) {
                                setIsInternalEditorSelected(true)
                                setIsInternalEditor(true)
                            }

                            setDeadline(Config.convertUTCToLocal(eachRole?.deadline));
                            setUnitRate(eachRole?.mtpe_rate);
                            setInstructionApiFiles(eachRole?.instruction_files !== null ? eachRole?.instruction_files : [])
                            setTaskVenStatus(eachRole?.task_ven_status)
                            setEstimatedHours(eachRole?.estimated_hours)

                            setCurrencySelect(currencyOption?.find((element) => element.value === eachRole?.currency));

                            setUnitTypeSelect(unitTypeOptionRef.current?.find((element) => element.value === eachRole?.mtpe_count_unit));

                            setCountType(countTypeOptions?.find(each => each.value?.toLowerCase() == String(eachRole?.account_raw_count)))
                            // alreadySelectedEditor.current = eachRole?.assign_to_details?.id
                            // setAssignToDetails(eachRole?.assign_to_details);
                            // setAssignedByDetails(eachRole?.assigned_by_details)
                            // if (eachRole?.instruction_files) setReferenceFile({ name: eachRole?.instruction_files[0]?.filename, id: eachRole?.instruction_files[0]?.id });
                            // setBilableChoice(eachRole?.account_raw_count == true ? "raw" : 'weighted')
                            setTaskDetailsFromApi({
                                assignTo: eachRole?.assign_to_details,
                                instruction: eachRole?.instruction,
                                deadline: eachRole?.deadline,
                                currency: eachRole?.currency,
                                mtpeRate: eachRole?.mtpe_rate,
                                mtpeCountUnit: eachRole?.mtpe_count_unit,
                                estimatedHours: eachRole?.estimated_hours,
                                accountRawCount: eachRole?.account_raw_count
                            });
                        }
                    })
                } else {
                    setIsTaskAssigned(false);
                }
                getAllEditorsList();
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    const resetTaskAssignModal = () => {
        setSelectedEditor({})
        setDeadline(null)
        setUnitRate('')
        setCurrencySelect(null)
        setUnitTypeSelect(null)
        setEstimatedHours('')
        setInstructionText('')
        setIsTaskAssigned(false)
        setTaskDetailsFromApi(null)
        setAssignToDrpdown(false)
        setEditorList([])
        setIsEditorAilaysa(false)
        setIsInternalEditor(false)
        setEditorsAcceptedRates(null)
        setEditorsBiddedRate(null)
        setTaskVenStatus(null)
        setInstructionLocalFiles([])
        setInstructionApiFiles([])
    }

    useEffect(() => {
        if (!showIndividualAssignManage) {
            resetTaskAssignModal()
        }
    }, [showIndividualAssignManage])

    /* Handling all the project creation form */
    const handleAdditionalFilesChange = (e) => {
        for (let i = 0; i < (e.target.files).length; i++) {
            if (e.target.files[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        let thisFiles = e.target.files;
        let name = thisFiles[0]?.name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        if (ext === ".exe" || ext === ".7zip" || ext === ".zip" || ext === ".rar") {
            Config.toast(t("unsupport_file_format"), 'warning')
            return;
        }

        let fileList = [...instructionLocalFiles];
        Object.keys(thisFiles).map((eachKey) => {
            if (
                thisFiles[eachKey].size / 1024 / 1024 <=
                100
            )
                fileList.push(thisFiles[eachKey]);
            else Config.toast(t("file_size_exceeds"), "warning");
        });
        setInstructionLocalFiles(fileList);
    }

    // delete local instruction files
    const removeFile = (e, index) => {
        let filesTemp = instructionLocalFiles;
        fileBrowserInputRef.current.value = null
        delete filesTemp[index];
        let isFilesEmpty = true;
        let finalFiles = [];
        Object.keys(filesTemp).map((eachKey) => {
            if (filesTemp[eachKey] != null) {
                isFilesEmpty = false;
                finalFiles.push(filesTemp[eachKey]);
            }
        });
        if (isFilesEmpty) filesTemp = [];
        setInstructionLocalFiles(finalFiles);
    };

    // delete instruction files in server
    const handleInstructionFilesDelete = (fileId) => {
        let formData = new FormData();
        formData.append("task", selectedFileRow.current?.task);
        formData.append("step", assignStep);
        Config.axios({
            // To delete the reference file
            url: `${Config.BASE_URL}/workspace/task_assign_update/?file_delete_ids=${fileId}`,
            method: "PUT",
            data: formData,
            auth: true,
            success: (response) => {
                setInstructionApiFiles(instructionApiFiles?.filter(file => file.id !== fileId))
            },
            error: (err) => {

            }
        });
    }

    const handleUseBidRate = () => {
        let { currency, mtpe_count_unit, mtpe_rate, step } = editorsBiddedRate
        if (assignStep === step) {
            setCurrencySelect(currencyOption?.find(each => each.value === currency))
            setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === mtpe_count_unit))
            setUnitRate(mtpe_rate !== null ? mtpe_rate : '')
        }
        setShowBiddedRate(false)
    }

    const handleUseAccepteRate = () => {
        let { currency, mtpe_count_unit, mtpe_rate, step } = editorsAcceptedRates
        if (assignStep === step) {
            setCurrencySelect(currencyOption?.find(each => each.value === currency))
            setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === mtpe_count_unit))
            setUnitRate(mtpe_rate !== null ? mtpe_rate : '')
        }
        setShowAcceptedRate(false)
    }

    // editor search functionality (it filters the editor by name and return the filtered output in the same format as the api does)
    const editorSeachFunctionality = () => {
        if (editorListRef.current !== null) {
            let a = {}
            Object.entries(editorListRef.current)?.map(each => {
                a[each[0]] = each[1]?.filter(user => user.name?.toLowerCase()?.includes(editorSearchText?.trim()?.toLowerCase()))
            })
            setEditorList(a)
        }
    }

    // trigger the editor search functionality when search text is typed
    useEffect(() => {
        editorSeachFunctionality()
    }, [editorSearchText])

    const getLanguageNameFromId = (id) => {
        return targetLanguageOptionsRef.current?.find(each => each.id == id)?.language
    }

    const resetRates = () => {
        setCurrencySelect(null)
        setUnitTypeSelect(null)
        setUnitRate('')
        setEstimatedHours('')
        setEditorsAcceptedRates(null)
        setEditorsBiddedRate(null)
        // setEditorsGivenRate(null)
    }

    useEffect(() => {
        if (selectedFileRow.current) {
            let sourceData = getLanguageNameFromId(selectedFileRow.current?.task_data?.source_language);
            let targetData = getLanguageNameFromId(selectedFileRow.current?.task_data?.target_language);
            setRedirectionToMarketplace(`${Config.MARKETPLACE_HOST}find-editor?source=${sourceData}&target=${targetData}`);
        }
    }, [selectedFileRow.current])


    const downloadInstructionFile = async (file_id, file_name, ext) => {
        let url = `${Config.BASE_URL}/workspace/instruction_file_download/${file_id}`
        let uniqueKey = generateKey()

        dispatch(addDownloadingFiles({ id: uniqueKey, file_name: file_name, ext: ext, status: 1 }))

        const response = await Config.downloadFileFromApi(url);
        if (response !== undefined) {
            // update the list once download completed
            dispatch(updateDownloadingFile({ id: uniqueKey, status: 2 }))

            Config.downloadFileInBrowser(response)

            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: uniqueKey }))
            }, 5000);
        }
    }

    return (
        <>
            {showIndividualAssignManage &&
                (<Rodal className="project-list-assign-modal" visible={showIndividualAssignManage} showCloseButton={false}>
                    <div className="file-list-assign-main-wrapper" ref={assignSettingDivRef}>
                        <div className="file-list-assign-manage-header">
                            <h1 className="title">{assignStep === 1 ? t("assign_editor") : t("assign_reviewer")}</h1>
                            <span className="close-btn" onClick={() => setShowIndividualAssignManage(false)}>
                                <CloseIcon className="header-close" />
                            </span>
                        </div>
                        <div className="file-separate-inner-wrapper">
                            <div className={"file-list-assign-manage-body " + (!(userDetails.agency && isProjectAssignedRef.current) && "edit-separate-assign-manage")}>
                                <div className={`assign-to-wrap-main-wrap ${!editorListHasScrollbar ? 'no-scroll-right-space' : "scroll-right-space scroll-bottom-shadow"} ${selectedEditor?.id === undefined && "right-border-remove"}`}>
                                    <div className="options-selected-area">
                                        <div className="select-assign-editor-reviewer-wrapper">
                                            <div className={"assigning-input-area " + (Object.keys(selectedEditor).length !== 0 && "add-border")}>
                                                {/* {Object.keys(selectedEditor).length !== 0 ?
											<div className="value-wrap">
												<div className="value-capsule">
													{
														(selectedEditor.avatar === null || selectedEditor.avatar === "") ?
															<div className="no-avatar">{selectedEditor?.name?.charAt(0).toUpperCase()}</div>
														:
															<img src={`${Config.BASE_URL}${selectedEditor.avatar}`} alt="profile-pic" />
													}
													<span className="input-label">{selectedEditor.name}</span>
													<span className="remove" onClick={handleDeselectEditor}>
														<CloseIcon className="remove-member" />
													</span>
												</div>
											</div>
											:
											<input placeholder={assignStep === 1 ? "Search Editor" : "Search Reviewer"} onClick={(e) => handleEditorDropdown(e)}/>
										} */}
                                                <input
                                                    placeholder={assignStep === 1 ? t("search_editor") : t("search_rev")}
                                                    value={editorSearchText}
                                                    onChange={(e) => setEditorSearchText(e.target.value)}
                                                    maxLength={300}
                                                />
                                                <SearchIcon className="search-icon" />
                                            </div>
                                            <div ref={editorListWrapRef} className="assigning-dropdown-wrapper show">
                                                <div className="assigning-dropdown-inner-wrapper">
                                                    {isTaskAssigned && (
                                                        <div className="external-wrapper taskassigned-wrapper">
                                                            <div className="header" style={{ justifyContent: 'start', width: "100%"}}>
                                                                <p style={{ width: "15%"}}>{t("assigned_to")}: </p>
                                                                <div className="assigning-input-area" style={{ border: 'none',width: "85%", marginRight: 0}}>
                                                                    <div className="value-wrap" style={{ width: "100%" }}>
                                                                        <div className="value-capsule">
                                                                            {
                                                                                (taskDetailsFromApi?.assignTo?.avatar === null || taskDetailsFromApi?.assignTo?.avatar === "") ?
                                                                                    <div className="no-avatar">{taskDetailsFromApi?.assignTo?.name?.charAt(0).toUpperCase()}</div>
                                                                                    :
                                                                                    <img src={`${Config.BASE_URL + taskDetailsFromApi?.assignTo?.avatar}`} alt="profile-pic" />
                                                                            }
                                                                            <span className="input-label">{taskDetailsFromApi?.assignTo?.name}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {!isFederalInternalEditorOnly && (
                                                        <div className="external-wrapper">
                                                            <div className="header">
                                                                <p>{t("external_editors")}</p>
                                                                {(editorList?.external_editors?.length > 2 && !isEditorListLoading) && (
                                                                    <span className="link" onClick={() => handleViewAllBtn('external')}>
                                                                        {viewAllEditor.external ? t("view_less") : t("view_all")}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="list-body">
                                                                {editorList.external_editors?.length !== 0 ? (
                                                                    <>
                                                                        {
                                                                            isEditorListLoading ?
                                                                                (
                                                                                    <>
                                                                                        {Array(2).fill(null).map((value, key) => (
                                                                                            <div key={key} className="suggest-member-item loader">
                                                                                                <div className="suggestion-icon-wrap">
                                                                                                    <Skeleton
                                                                                                        animation="wave"
                                                                                                        style={{ marginRight: "10px" }}
                                                                                                        variant="circular"
                                                                                                        width={32}
                                                                                                        height={32}
                                                                                                    />
                                                                                                    <Skeleton
                                                                                                        animation="wave"
                                                                                                        style={{ marginleft: "10px" }}
                                                                                                        variant="rounded"
                                                                                                        width={120}
                                                                                                        height={24}
                                                                                                    />
                                                                                                </div>
                                                                                                <Skeleton
                                                                                                    animation="wave"
                                                                                                    variant="circular"
                                                                                                    width={19}
                                                                                                    height={19}
                                                                                                />
                                                                                            </div>
                                                                                        ))}
                                                                                    </>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <>
                                                                                        {
                                                                                            editorList.external_editors?.slice(0, viewAllEditor.external ? editorList?.external_editors?.length : 2)?.map((editor) => {
                                                                                                return (
                                                                                                    <div key={editor.id} style={editor.status === "Invite Sent" ? { opacity: 0.5, pointerEvents: 'none' } : {}} className={selectedEditor?.id == editor.id ? "suggest-member-item-active" : "suggest-member-item"} onClick={() => handleEditorSelect(editor, false)}>
                                                                                                        <div className="suggestion-icon-wrap">
                                                                                                            {
                                                                                                                (editor.avatar === null || editor.avatar === "") ?
                                                                                                                    <div className="no-avatar">{editor.name?.charAt(0).toUpperCase()}</div>
                                                                                                                    :
                                                                                                                    <img src={`${Config.BASE_URL + editor.avatar}`} alt="profile-pic" />
                                                                                                            }
                                                                                                            <div className="name">{editor.name}</div>
                                                                                                            {editor.status === "Invite Sent" && (
                                                                                                                <span className="creds-sent-ui-chip">
                                                                                                                    {t("invite_sent")}
                                                                                                                </span>
                                                                                                            )}
                                                                                                        </div>
                                                                                                        {selectedEditor.id == editor.id &&
                                                                                                            <RadioButtonCheckedIcon
                                                                                                                style={{
                                                                                                                    color: '#0078D4',
                                                                                                                    width: '17px'
                                                                                                                }}
                                                                                                            />}
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                        {(viewAllEditor.external || editorList?.external_editors?.length <= 2) && (
                                                                                            <small style={{ textAlign: 'center', display: 'block', marginBottom: '10px' }}><a href={redirectionToMarketplace} target="_blank" rel="noreferrer"> {t("find_more_editors")}</a></small>
                                                                                        )}
                                                                                    </>
                                                                                )
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <small style={{ textAlign: 'center', opacity: 0.6, display: 'block', marginBottom: '10px' }}>{t("no_editor_to_display")} <a href={redirectionToMarketplace} target="_blank" rel="noreferrer">{t("go_to_marketplace")}</a></small>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="internal-users">
                                                        <div className="header">
                                                            <p>{t("internal_users")}</p>
                                                            {(!isEnterprise && editorList?.internal_editors?.length > 2 && !isEditorListLoading) && (
                                                                <span className="link" onClick={() => handleViewAllBtn('internal')}>
                                                                    {viewAllEditor.internal ? t("view_less") : t("view_all")}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="list-body">
                                                            {editorList.internal_editors?.length !== 0 ? (
                                                                <>
                                                                    {
                                                                        isEditorListLoading ?
                                                                            (
                                                                                <>
                                                                                    {Array(2).fill(null).map((value, key) => (
                                                                                        <div key={key} className="suggest-member-item loader">
                                                                                            <div className="suggestion-icon-wrap">
                                                                                                <Skeleton
                                                                                                    animation="wave"
                                                                                                    style={{ marginRight: "10px" }}
                                                                                                    variant="circular"
                                                                                                    width={32}
                                                                                                    height={32}
                                                                                                />
                                                                                                <Skeleton
                                                                                                    animation="wave"
                                                                                                    style={{ marginleft: "10px" }}
                                                                                                    variant="rounded"
                                                                                                    width={120}
                                                                                                    height={24}
                                                                                                />
                                                                                            </div>
                                                                                            <Skeleton
                                                                                                animation="wave"
                                                                                                variant="circular"
                                                                                                width={19}
                                                                                                height={19}
                                                                                            />
                                                                                        </div>
                                                                                    ))}
                                                                                </>
                                                                            )
                                                                            :
                                                                            (
                                                                                <>
                                                                                    {
                                                                                        editorList.internal_editors?.slice(0, viewAllEditor.internal ? editorList?.internal_editors?.length : 2).sort(Config.sortObjectByPropery("name"))?.map((editor) => {
                                                                                            return (
                                                                                                <div key={editor.id} style={editor.status === "Credentials Sent" ? { opacity: 0.5, pointerEvents: 'none' } : {}} className={selectedEditor.id == editor.id ? "suggest-member-item-active" : "suggest-member-item"} onClick={() => handleEditorSelect(editor, true)}>
                                                                                                    <div className="suggestion-icon-wrap">
                                                                                                        {
                                                                                                            (editor.avatar === null || editor.avatar === "") ?
                                                                                                                <div className="no-avatar">{editor.name?.charAt(0).toUpperCase()}</div>
                                                                                                                :
                                                                                                                <img src={`${Config.BASE_URL + editor.avatar}`} alt="profile-pic" />
                                                                                                        }
                                                                                                        <div className="name">{editor.name}</div>
                                                                                                        {editor.status === "Credentials Sent" && (
                                                                                                            <span className="creds-sent-ui-chip">
                                                                                                                Credentials sent
                                                                                                            </span>
                                                                                                        )}
                                                                                                    </div>
                                                                                                    {selectedEditor.id == editor.id ?
                                                                                                        <RadioButtonCheckedIcon
                                                                                                            style={{
                                                                                                                color: '#0078D4',
                                                                                                                width: '17px'
                                                                                                            }}
                                                                                                        />
                                                                                                        :
                                                                                                        <RadioButtonUncheckedIcon
                                                                                                            style={{
                                                                                                                color: '#5F6368',
                                                                                                                width: '17px'
                                                                                                            }}
                                                                                                        />
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                    {(viewAllEditor.internal || editorList?.internal_editors?.length <= 2) && (
                                                                                        <small style={{ textAlign: 'center', display: 'block', marginBottom: '10px' }}><a href={Config.USER_PORTAL_HOST + "/my-team"} target="_blank" rel="noreferrer">{t("add_users")}</a></small>
                                                                                    )}
                                                                                </>
                                                                            )
                                                                    }
                                                                </>
                                                            ) : (
                                                                <small style={{ textAlign: 'center', opacity: 0.6, display: 'block', marginBottom: '10px' }}>{t("no_users_to_display")} <a href={Config.USER_PORTAL_HOST + "/my-team"} target="_blank" rel="noreferrer">{t("add_users")}</a></small>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {(!isFederalInternalEditorOnly && !isProjectAssignedRef.current) && <div className="external-wrapper">
                                                        <div className="header">
                                                            <p>{t("agencies")}</p>
                                                            {(editorList?.agencies?.length > 2 && !isEditorListLoading) && (
                                                                <span className="link" onClick={() => handleViewAllBtn('agencies')}>
                                                                    {viewAllEditor.agencies ? t("view_less") : t("view_all")}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="list-body">
                                                            {editorList.agencies?.length !== 0 ? (
                                                                <>
                                                                    {
                                                                        isEditorListLoading ?
                                                                            (
                                                                                <>
                                                                                    {Array(2).fill(null).map((value, key) => (
                                                                                        <div key={key} className="suggest-member-item loader">
                                                                                            <div className="suggestion-icon-wrap">
                                                                                                <Skeleton
                                                                                                    animation="wave"
                                                                                                    style={{ marginRight: "10px" }}
                                                                                                    variant="circular"
                                                                                                    width={32}
                                                                                                    height={32}
                                                                                                />
                                                                                                <Skeleton
                                                                                                    animation="wave"
                                                                                                    style={{ marginleft: "10px" }}
                                                                                                    variant="rounded"
                                                                                                    width={120}
                                                                                                    height={24}
                                                                                                />
                                                                                            </div>
                                                                                            <Skeleton
                                                                                                animation="wave"
                                                                                                variant="circular"
                                                                                                width={19}
                                                                                                height={19}
                                                                                            />
                                                                                        </div>
                                                                                    ))}
                                                                                </>
                                                                            )
                                                                            :
                                                                            (
                                                                                <>
                                                                                    {
                                                                                        editorList.agencies?.slice(0, viewAllEditor.agencies ? editorList?.agencies?.length : 2)?.map((editor) => {
                                                                                            return (
                                                                                                <div key={editor.id} style={editor.status === "Invite Sent" ? { opacity: 0.5, pointerEvents: 'none' } : {}} className={selectedEditor.id == editor.id ? "suggest-member-item-active" : "suggest-member-item"} onClick={() => handleEditorSelect(editor, false)}>
                                                                                                    <div className="suggestion-icon-wrap">
                                                                                                        {
                                                                                                            (editor.avatar === null || editor.avatar === "") ?
                                                                                                                <div className="no-avatar">{editor.name?.charAt(0).toUpperCase()}</div>
                                                                                                                :
                                                                                                                <img src={`${Config.BASE_URL + editor.avatar}`} alt="profile-pic" />
                                                                                                        }
                                                                                                        <div className="name">{editor.name}</div>
                                                                                                        {editor.status === "Invite Sent" && (
                                                                                                            <span className="creds-sent-ui-chip">
                                                                                                                Invite Sent
                                                                                                            </span>
                                                                                                        )}
                                                                                                    </div>
                                                                                                    {selectedEditor.id == editor.id ?
                                                                                                        <RadioButtonCheckedIcon
                                                                                                            style={{
                                                                                                                color: '#0078D4',
                                                                                                                width: '17px'
                                                                                                            }}
                                                                                                        />
                                                                                                        :
                                                                                                        <RadioButtonUncheckedIcon
                                                                                                            style={{
                                                                                                                color: '#5F6368',
                                                                                                                width: '17px'
                                                                                                            }}
                                                                                                        />
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                    {(viewAllEditor.agencies || editorList?.agencies?.length <= 2) && (
                                                                                        <small style={{ textAlign: 'center', display: 'block', marginBottom: '10px' }}><a href={`${redirectionToMarketplace}&agency=true`} target="_blank" rel="noreferrer">{t("find_more_agencies")}</a></small>
                                                                                    )}
                                                                                </>
                                                                            )
                                                                    }
                                                                </>
                                                            ) : (
                                                                <small style={{ textAlign: 'center', opacity: 0.6, display: 'block', marginBottom: '10px' }}>{t("no_agencies_to_display")} <a href={`${redirectionToMarketplace}&agency=true`} target="_blank" rel="noreferrer">{t("go_to_marketplace")}</a></small>
                                                            )}
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {selectedEditor?.id !== undefined ?
                                    (
                                        <div className={`assign-manage-main-box-wrapper ${!assignManageHasScrollbar ? 'no-scroll-right-space' : "scroll-right-space scroll-bottom-shadow"}`}>
                                            <div ref={assignManageWrapRef} className={`assign-manage-box-wrapper ${(showAcceptedRate || showBiddedRate) && "hide-overflow"}`}>
                                                <div className="file-list-assign-manage-form-wrapper">
                                                    <div className="assign-to-wrap date-time-wrap">
                                                        <div className="icon-label-wrap">
                                                            <Event style="label-icon" />
                                                            <span className="title">{t("due_date")} {!isFederalInternalEditorOnly && <span class="asterik-symbol">*</span>}</span>
                                                        </div>
                                                        <div className="options-selected-area">
                                                            <DatePicker value={deadline} projectDeadline={Config.convertUTCToLocal(projectDataRef.current?.deadline)} taskDeadLine={(userDetails.agency && isProjectAssignedRef.current) ? Config.convertUTCToLocal(taskAssignmentDataRef.current?.deadline) : ''} className="assign-datepicker" assignManage={true} onChange={handleDateChange} />
                                                            <CustomTimePicker value={deadline} setValue={setDeadline} assigntimepicker="assign-time-picker" />
                                                        </div>
                                                    </div>
                                                    {!isInternalEditorSelected && <div className="assign-to-wrap accepted-rate">
                                                        <div className="icon-label-wrap">
                                                            <AccountIcon style="label-icon" />
                                                            <span className="title">{t("rate")} <span class="asterik-symbol">*</span></span>
                                                            <div className="icon-label-wrap d-flex justify-content-center">
                                                                {(assignStep === editorsAcceptedRates?.step) && (
                                                                    <span className="accepted-rate-box-title" onClick={() => {
                                                                        handleOpenAcceptedRateBox();
                                                                        setShowBiddedRate(false)
                                                                    }}>{t("accepted_rate")}
                                                                        <ChevronRightIcon
                                                                            style={{
                                                                                width: '12px',
                                                                            }}
                                                                        />
                                                                        <>
                                                                            {(showAcceptedRate) && (
                                                                                <div ref={acceptedRatesRef} className="accepted-rate-box">
                                                                                    <div className="accepted-rate-box-secondary">
                                                                                        <div className="accepted-rate-header-row">
                                                                                            <span className="accepted-rate-box-innertitle">{t("accepted_rate")}</span>
                                                                                            <span className="close-btn" onClick={(e) => { e.stopPropagation(); setShowAcceptedRate(false) }}>
                                                                                                <CloseIcon className="header-close" />
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="accepted-rate-box-inner-wrap">
                                                                                            <div className="accepted-rate-box-rates-units">
                                                                                                <span className="header">{t("unit_type")}:</span>
                                                                                                <span className="content">{unitTypeOptionRef.current.find((element) => element.value === editorsAcceptedRates?.mtpe_count_unit)?.label}</span>

                                                                                            </div>
                                                                                            <div className="accepted-rate-box-rates-units">
                                                                                                <span className="header">{t("unit_rate")}:</span>
                                                                                                <span className="content">
                                                                                                    {currencyOption?.find(each => each.value === editorsAcceptedRates?.currency)?.label?.replace(/-.*/, "")} &nbsp;
                                                                                                    {editorsAcceptedRates?.mtpe_rate}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="accepted-rate-box-use-button-container" >
                                                                                        <button className="accepted-rate-box-use-button" onClick={(e) => {
                                                                                            e.stopPropagation()
                                                                                            handleUseAccepteRate()
                                                                                        }}>{t("use")}</button>

                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    </span>
                                                                )}
                                                                {assignStep === editorsBiddedRate?.step &&
                                                                    <span
                                                                        className="bidded-rate-box-title"
                                                                        onClick={() => {
                                                                            handleOpenBiddedRateBox();
                                                                            setShowAcceptedRate(false)
                                                                        }
                                                                        }>{t("bidded_rate")}
                                                                        <ChevronRightIcon style={{
                                                                            width: '12px'
                                                                        }}
                                                                        />
                                                                        {showBiddedRate && (
                                                                            <div ref={biddedRatesRef} className="accepted-rate-box">
                                                                                <div className="accepted-rate-box-secondary">
                                                                                    <div className="bidded-rate-header-row">
                                                                                        <span className="bidded-rate-box-innertitle">{t("bidded_rate")}</span>
                                                                                        <span className="close-btn" onClick={(e) => { e.stopPropagation(); setShowBiddedRate(false) }}>
                                                                                            <CloseIcon className="header-close" />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="accepted-rate-box-inner-wrap">
                                                                                        <div className="accepted-rate-box-rates-units">
                                                                                            <span className="header">{t("unit_type")}:</span>
                                                                                            <span className="content">{unitTypeOptionRef.current.find((element) => element.value === editorsBiddedRate?.mtpe_count_unit)?.label}</span>

                                                                                        </div>
                                                                                        <div className="accepted-rate-box-rates-units">
                                                                                            <span className="header">{t("unit_rate")}:</span>
                                                                                            <span className="content">
                                                                                                {currencyOption?.find(each => each.value === editorsBiddedRate?.currency)?.label?.replace(/-.*/, "")} &nbsp;
                                                                                                {editorsBiddedRate?.mtpe_rate}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="accepted-rate-box-use-button-container" >
                                                                                    <button className="accepted-rate-box-use-button" onClick={(e) => {
                                                                                        e.stopPropagation()
                                                                                        handleUseBidRate()
                                                                                    }}>{t("use")}</button>

                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="options-selected-area">
                                                            <div className="option-selected-inner-wrap">
                                                                <div className="assign-rate-options-wrap">
                                                                    <div className="selection-row">
                                                                        <Select
                                                                            isSearchable={true}
                                                                            options={currencyOption}
                                                                            classNamePrefix="instant-currency-select"
                                                                            onChange={(selectedOption) => {
                                                                                setCurrencySelect(selectedOption);
                                                                            }}
                                                                            placeholder={<span className="placeholder">{t("currency")}</span>}
                                                                            styles={customRatesSelectStyles}
                                                                            value={currencySelect}
                                                                            menuPlacement="auto"
                                                                            isDisabled={taskVenStatus === 'task_accepted' && taskDetailsFromApi?.assignTo?.id === selectedEditor?.id}
                                                                            components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                        />
                                                                    </div>
                                                                    <div className="selection-row">
                                                                        <Select
                                                                            isSearchable={false}
                                                                            options={unitTypeOptionRef.current}
                                                                            classNamePrefix="instant-unit-select"
                                                                            onChange={(selectedOption) => {
                                                                                setUnitTypeSelect(selectedOption);
                                                                            }}
                                                                            styles={customUnitTypeSelectStyles}
                                                                            placeholder={<span className="placeholder">{t("unit_type")}</span>}
                                                                            value={unitTypeSelect}
                                                                            menuPlacement="auto"
                                                                            isDisabled={taskVenStatus === 'task_accepted' && taskDetailsFromApi?.assignTo?.id === selectedEditor?.id}
                                                                            components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {(unitTypeSelect?.value !== undefined && unitTypeSelect?.value !== 3 && unitTypeSelect?.value !== 4) && (
                                                                    <div className="assign-rate-options-wrap">
                                                                        <div className="selection-row">
                                                                            <Select
                                                                                isSearchable={false}
                                                                                options={countTypeOptions}
                                                                                classNamePrefix="instant-unit-select"
                                                                                value={countType}
                                                                                onChange={(selectedOption) => {
                                                                                    setCountType(selectedOption);
                                                                                }}
                                                                                styles={customRatesWidthSelectStyles}
                                                                                menuPlacement="auto"
                                                                                isDisabled={taskVenStatus === 'task_accepted' && taskDetailsFromApi?.assignTo?.id === selectedEditor?.id}
                                                                                components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="selection-row forms">
                                                                    <div className="ai-text-form-item-wrapper unit-rate rate-wrap">
                                                                        <label htmlFor="rate">{t("rate")}</label>
                                                                        <input
                                                                            type="number"
                                                                            className="text-translate-rate-input"
                                                                            placeholder="0.00"
                                                                            id="rate"
                                                                            min={0}
                                                                            value={UnitRate}
                                                                            onChange={(e) => setUnitRate(limitToFourDecimalPlaces(e.target.value))}
                                                                            disabled={taskVenStatus === 'task_accepted' && taskDetailsFromApi?.assignTo?.id === selectedEditor?.id}
                                                                        />
                                                                    </div>
                                                                    {unitTypeSelect?.label === 'Hour' && (
                                                                        // <div className="selection-row hour">
                                                                        <div className="ai-text-form-item-wrapper unit-rate hours-wrap">
                                                                            <label htmlFor="rate">{t("estimated_hours")}</label>
                                                                            <input
                                                                                type="number"
                                                                                className="text-translate-rate-input"
                                                                                placeholder="00"
                                                                                id="rate"
                                                                                min={0}
                                                                                value={estimatedHours}
                                                                                onChange={(e) => setEstimatedHours(parseInt(e.target.value))}
                                                                                // it take only integer number (non-decimal hours)
                                                                                disabled={taskVenStatus === 'task_accepted' && taskDetailsFromApi?.assignTo?.id === selectedEditor?.id}
                                                                            />
                                                                            <span>{estimatedHours ? t("hrs") : ''}</span>
                                                                        </div>
                                                                        // </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                                    <div className="assign-to-wrap">
                                                        <div className="icon-label-wrap">
                                                            <NotesIcon style="label-icon" />
                                                            <div className="add-info-wrap">
                                                                <span className="title">{t("add_instruct")}</span>
                                                                <small>({t("optional_sm")})</small>
                                                            </div>
                                                        </div>
                                                        <div className="options-selected-area">
                                                            <TextareaAutosize
                                                                className="assign-manage-textarea"
                                                                value={instructionText}
                                                                maxLength={200}
                                                                onChange={(e) => setInstructionText(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="ai-text-form-item-row">
                                                        <div className="ai-text-form-item-wrapper">
                                                            <AttachFileIcon style={{ color: "#5F6368", fontSize: "22px" }} />
                                                            <label htmlFor="assign-attachment" className="add-attachment-btn-collapse">{t("add_attachment")} <small>({t("optional_sm")})</small><span>{t("upload_file")}</span></label>
                                                            <input type="file" ref={fileBrowserInputRef} id="assign-attachment" onChange={handleAdditionalFilesChange} multiple hidden />
                                                        </div>
                                                        {((instructionLocalFiles.length !== 0) || (isTaskAssigned && instructionApiFiles?.length !== 0)) &&
                                                            <div className="uploaded-file-wrapper">
                                                                {/* {((instructionLocalFiles.length > 2) || (isTaskAssigned && instructionApiFiles?.length > 2)) &&
															<div className={"left-arrow " + (scrollX == 0 && "disabled")} onClick={() => slide(-50)}>
																<NavigateBeforeSharpIcon className="navigate-icon"/>
															</div>
														} */}
                                                                <div
                                                                    // ref={scrl} onScroll={scrollCheck} 
                                                                    className={"file-list-arrow-wrapper "
                                                                        // (((instructionLocalFiles.length > 2) || (isTaskAssigned && instructionApiFiles?.length > 2)) && "add-border")
                                                                    }
                                                                >
                                                                    {
                                                                        Object.keys(instructionLocalFiles)?.map((eachKey) => {
                                                                            return (
                                                                                <div className="audio-file-list-item" key={eachKey + instructionLocalFiles[eachKey].name}  >
                                                                                    <div className="file-info-wrapper">
                                                                                        <img
                                                                                            src={Config.BASE_URL + "/app/extension-image/" + instructionLocalFiles[eachKey].name.split(".").pop()}
                                                                                            alt="document"
                                                                                        />
                                                                                        <div className="file-name-wrap">
                                                                                            <div className="title"><p>{instructionLocalFiles[eachKey].name?.split(".")?.slice(0, -1)?.join(".")}</p><span>{"." + instructionLocalFiles[eachKey].name?.split(".")?.pop()}</span></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span
                                                                                        className="audio-file-delete"
                                                                                        data-file-index={eachKey}
                                                                                        onClick={(e) =>
                                                                                            removeFile(e, eachKey)
                                                                                        }
                                                                                    >
                                                                                        <img
                                                                                            src={CloseBlack}
                                                                                            alt="delete"
                                                                                        />
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    {
                                                                        (isTaskAssigned && instructionApiFiles?.length !== 0) && (
                                                                            instructionApiFiles?.map(each => {
                                                                                return (
                                                                                    <div className="audio-file-list-item">
                                                                                        <div className="file-info-wrapper">
                                                                                            <img
                                                                                                src={
                                                                                                    Config.BASE_URL + "/app/extension-image/" +
                                                                                                    each.filename.split(".").pop()
                                                                                                }
                                                                                                alt="document"
                                                                                            />
                                                                                            <div className="file-name-wrap">
                                                                                                <div className="title">
                                                                                                    <p>{each.filename?.split(".")?.slice(0, -1)?.join(".")}</p><span>{"." + each.filename?.split(".")?.pop()}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <span
                                                                                            className="audio-file-delete"
                                                                                            // data-file-index={eachKey}
                                                                                            onClick={(e) =>
                                                                                                handleInstructionFilesDelete(each.id)
                                                                                            }
                                                                                        >
                                                                                            <img
                                                                                                src={CloseBlack}
                                                                                                alt="delete"
                                                                                            />
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        )
                                                                    }
                                                                </div>
                                                                {/* { ((instructionLocalFiles.length > 2) || (isTaskAssigned && instructionApiFiles?.length > 2)) &&
															<div className={"right-arrow " + (scrolEnd && "disabled")} onClick={() => slide(+50)}>
																<NavigateNextSharpIcon className="navigate-icon"/>
															</div>
														} */}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="assign-manage-main-box-wrapper placeholder">
                                            <img src={NoEditorInfo} alt="no-editor-info-icon" />
                                            <p className="note">{t("select_editor_further_continue")}</p>
                                        </div>
                                    )
                                }
                                {(userDetails.agency && isProjectAssignedRef.current) && (
                                    <div className="assign-manage-info-box">
                                        <div className="assign-manage-info-header">
                                            <h3 className="title">{t("assignment_info")}</h3>
                                            <div className="assign-manage-info-details">
                                                <span className="label">{t("assigned_by")}</span>
                                                <div className="info-value-wrapper">
                                                    <div className="editor-info-wrap">
                                                        {
                                                            (taskAssignmentDataRef.current?.assigned_by_details?.avatar) ?
                                                                <img src={`${Config.BASE_URL + taskAssignmentDataRef.current?.assigned_by_details?.avatar}`} alt="profile-pic" />
                                                                :
                                                                <div className="no-avatar">{taskAssignmentDataRef.current?.assigned_by_details?.name?.charAt(0).toUpperCase()}</div>
                                                        }
                                                        {/* <div className="no-avatar">J</div> */}
                                                        <p className="profile-name">{taskAssignmentDataRef.current?.assigned_by_details?.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="assign-manage-info-body">
                                            <div className="assign-manage-info-details">
                                                <span className="label">{t("due_date")}</span>
                                                <div className="info-value-wrapper">
                                                    <div className="deadline-wrapper">
                                                        <TimerOutlinedIcon
                                                            style={{
                                                                color: '#767676',
                                                                width: '17px'
                                                            }}
                                                        />
                                                        <span className="value">{Config.getProjectCreatedDate(taskAssignmentDataRef.current?.deadline)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="assign-manage-info-details rate">
                                                <span className="label">{t("rates")}</span>
                                                <div className="info-value-wrapper">
                                                    <div className="nor-text-box">
                                                        {`${currencyOption.find(each => each.value === taskAssignmentDataRef.current?.currency)?.label?.replace(/-.*/, "")} 
												${taskAssignmentDataRef.current?.mtpe_rate}${taskAssignmentDataRef.current?.mtpe_count_unit !== 4 ? '/' : ' '}
												${unitTypeOptionRef.current?.find(each => each.value === taskAssignmentDataRef.current?.mtpe_count_unit)?.label}`}
                                                    </div>

                                                    {(taskAssignmentDataRef.current?.mtpe_count_unit === 1 || taskAssignmentDataRef.current?.mtpe_count_unit === 2) && (
                                                        <div className="text-box-wrap width-auto-wrap">
                                                            {taskAssignmentDataRef.current?.account_raw_count ?
                                                                `${t("raw")} ${taskAssignmentDataRef.current?.mtpe_count_unit === 1 ? t('word_sm') : t('char_sm')} ${t("count_sm")}` :
                                                                `${t("weighted")} ${taskAssignmentDataRef.current?.mtpe_count_unit === 1 ? t('word_sm') : t('char_sm')} ${t("count_sm")}`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {taskAssignmentDataRef.current?.mtpe_count_unit === 3 && (
                                                <div className="assign-manage-info-details estimated-hrs">
                                                    <span className="label">{t("estimated_hours")}</span>
                                                    <div className="info-value-wrapper">
                                                        <div className="nor-text-box">{taskAssignmentDataRef.current?.estimated_hours}</div>
                                                    </div>
                                                </div>
                                            )}
                                            {taskAssignmentDataRef.current?.instruction !== '' && (
                                                <div className="assign-manage-info-details instruction">
                                                    <span className="label">{t("instructions")}</span>
                                                    <div className="info-value-wrapper">
                                                        <div className="text-box-wrap">{taskAssignmentDataRef.current?.instruction}</div>
                                                    </div>
                                                </div>
                                            )}
                                            {taskAssignmentDataRef.current?.instruction_files?.length !== 0 && (
                                                <div className="assign-manage-info-details">
                                                    <span className="label">{t("reference_file")}</span>
                                                    <div className="info-value-wrapper">
                                                        {taskAssignmentDataRef.current?.instruction_files?.map(file => {
                                                            return (
                                                                <div className="additional-file-list-wrap">
                                                                    <img src={Config.BASE_URL + `/app/extension-image/${file?.filename?.split(".")?.pop()}`} alt="file" />
                                                                    <p className="proj-name">{file.filename?.split(".")?.slice(0, -1)?.join(".")}</p>
                                                                    <p className="extension">{"." + file?.filename?.split(".")?.pop()}</p>
                                                                    <div className="file-download-wrap">
                                                                        <span className="file-download-img" onClick={e => downloadInstructionFile(file.id, file.filename, file.filename?.split('.').pop())}>
                                                                            <img src={FileDownloadBlack} alt="download" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="file-list-assign-manage-footer">
                            <div className="footer-btn-wrap justify-content-end">
                                <ButtonBase
                                    className="assign-btn"
                                    style={((!isFederalInternalEditorOnly && deadline === null) || (!isInternalEditor && (Object.keys(selectedEditor)?.length === 0 || currencySelect === null || unitTypeSelect === null || unitTypeSelect === undefined || (UnitRate === null || UnitRate === "") || (unitTypeSelect?.value === 3 && (estimatedHours === null || isNaN(estimatedHours) || estimatedHours === '' || estimatedHours == 0))))) ? { opacity: '0.5' } : {}}
                                    disabled={((!isFederalInternalEditorOnly && deadline === null) || (!isInternalEditor && (Object.keys(selectedEditor)?.length === 0 || currencySelect === null || unitTypeSelect === null || unitTypeSelect === undefined || (UnitRate === null || UnitRate === "") || (unitTypeSelect?.value === 3 && (estimatedHours === null || isNaN(estimatedHours) || estimatedHours === '' || estimatedHours == 0)))))}
                                    onClick={() => !isTaskAssigned ? (!isAssigning && assignEditor()) : (!isAssigning && updateAssign())}
                                >
                                    <span>{isAssigning && <ButtonLoader />} {!isTaskAssigned ? (isAssigning ? t('assigning') : t('assign')) : (isAssigning ? t('updating') : t('update'))}</span>
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                </Rodal>)}
        </>
    )
}

export default MainAssignManage