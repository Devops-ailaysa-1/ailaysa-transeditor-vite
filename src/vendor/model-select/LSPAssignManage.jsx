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
import { ButtonBase, Tooltip, listClasses } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RightArrowIcon from "../styles-svg/RightArrow";
import Radio from '@mui/material/Radio';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion, AnimatePresence } from "framer-motion";
import { Collapse } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { CustomTimePicker } from "../custom-component/CustomTimePicker";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { AssignmentReferenceInfo } from "./AssignmentReferenceInfo";
import ErrorIcon from '@mui/icons-material/Error';
import { TextareaAutosize } from "@mui/material";
import { ButtonLoader } from './../../loader/CommonBtnLoader';
import Skeleton from '@mui/material/Skeleton';
import ErrorBlackWarn from "../../assets/images/new-ui-icons/error_black_warn.svg"
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import CheckCircleSuccess from "../../assets/images/new-ui-icons/check_circle_success.svg"
import NoEditorInfoIcon from "../../assets/images/new-project-setup/no-editor-info-icon.svg"
import HowToRegister from "../../assets/images/new-ui-icons/how_to_register.svg"

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
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    // menuList: base => ({
    // 	...base,
    // 	minHeight: "30px"
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
        border: state.isFocused ? "1px solid #DADCE0" : "1px solid #DADCE0",
        borderRadius: 3,
        transtion: 0.3,
        backgroundColor: state.isFocused ? "#ffffff" : "#F3F3F3",
        color: state.isFocused ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
        boxShadow: 0,
        height: 36,
        minHeight: 36,
        // minWidth: "100%",
        cursor: "auto",
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

const customRatesNewSelectStyles = {
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
    // menuList: base => ({
    // 	...base,
    // 	minHeight: "30px"
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
        border: state.isFocused ? "1px solid #DADCE0" : "1px solid #DADCE0",
        borderRadius: 3,
        transtion: 0.3,
        backgroundColor: state.isFocused ? "#ffffff" : "#FFFFFF",
        color: state.isFocused ? "#222222" : "#222222",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        // lineHeight: "24px",
        boxShadow: 0,
        height: 36,
        minHeight: 36,
        minWidth: "90px",
        cursor: "auto",
        "&:hover": {
            cursor: "pointer",
        },
    }),
};




const LSPAssignManage = (props) => {
    const {
        setShowLSPAssignManage,
        showLSPAssignManage,
        setAssignValue,
        assignValue,
        selectedFileRow,
        targetLanguageOptionsRef,
        listFiles
    } = props


    const userDetails = useSelector((state) => state.userDetails.value)
    const currencyOption = useSelector((state) => state.currencyOptions.value)
    const unitTypeOption = useSelector((state) => state.unitTypeOptions.value)
    const steps = useSelector((state) => state.projectSteps.value)
    const { t } = useTranslation();

    const assignSettingDivRef = useRef(null)
    // const [currencyOptions, setCurrencyOptions] = useState([]);
    const [currencySelect, setCurrencySelect] = useState(null);
    const [unitTypeSelect, setUnitTypeSelect] = useState(null);
    // const [unitTypeOptions, setUnitTypeOptions] = useState([]);
    const [assignToDrpdown, setAssignToDrpdown] = useState(false);
    const [assignManageSwitch, setAssignManageSwitch] = useState('assign-and-manage');
    const [jobSingleChecked, setJobSingleChecked] = useState([]);
    // const [selectedValue, setSelectedValue] = useState('editor');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('ailaysa-pay');
    const [showConfirmRates, setShowConfirmRates] = useState(false);

    const [editorList, setEditorList] = useState([])
    const [taskList, setTaskList] = useState([])
    const [jobOptions, setJobOptions] = useState([])
    const [selectedEditor, setSelectedEditor] = useState({})
    const [isTaskAssigned, setIsTaskAssigned] = useState(false)
    const [instructionLocalFiles, setInstructionLocalFiles] = useState([]);
    const [instructionApiFiles, setInstructionApiFiles] = useState([])
    const [assignStep, setAssignStep] = useState(1)
    const [deadline, setDeadline] = useState(null)
    const [selectedJob, setSelectedJob] = useState(null)

    const [checkedTaskIds, setcheckedTaskIds] = useState([])
    const [selectedJobIds, setSelectedJobIds] = useState([])
    const [instructionText, setInstructionText] = useState('')
    const [unitRate, setUnitRate] = useState('')
    const [estimatedHours, setEstimatedHours] = useState('')
    const [isReviewerStepAvailable, setIsReviewerStepAvailable] = useState(false)
    const [isTaskListLoading, setIsTaskListLoading] = useState(false)
    const [isEditorListLoading, setIsEditorListLoading] = useState(false)
    const [emptyProjects, setEmptyProjects] = useState(false)
    const [showEditorAlreadyAssignedModal, setShowEditorAlreadyAssignedModal] = useState(false)
    const [assignedEditorAlertString, setAssignedEditorAlertString] = useState(null)

    const [isProjectAssigned, setIsProjectAssigned] = useState(false)
    const [stepSwitchForLSP, setStepSwitchForLSP] = useState({ editor: false, reviewer: false })

    const [showAcceptedRate, setShowAcceptedRate] = useState(false)
    const [showBiddedRate, setShowBiddedRate] = useState(false)
    const [scrollX, setscrollX] = useState(0);
    const [scrolEnd, setscrolEnd] = useState(false);
    const [inputText, setInputText] = useState("");
    const [countType, setCountType] = useState({ value: 'True', label: t('raw_count') });
    const [viewAllEditor, setViewAllEditor] = useState({ external: false, internal: false, agency: false })
    const [selectedJobPairRate, setSelectedJobPairRate] = useState(null)
    const [completedJobRateCount, setCompletedJobRateCount] = useState(0)

    const [editorsAcceptedRates, setEditorsAcceptedRates] = useState(null)
    const [editorsBiddedRate, setEditorsBiddedRate] = useState(null)
    const [editorsGivenRate, setEditorsGivenRate] = useState(null)
    const [showAssignmentInfoModal, setShowAssignmentInfoModal] = useState(false)
    const [redirectionToMarketplace, setRedirectionToMarketplace] = useState(null)

    const [isInternalEditorSelected, setIsInternalEditorSelected] = useState(false)
    const [editorSearchText, setEditorSearchText] = useState('')
    const [taskSearchText, setTaskSearchText] = useState('')

    const [jobSelectHasScrollAtBottom, setJobSelectHasScrollAtBottom] = useState(false);
    const [jobSelectHasScrollbar, setJobSelectHasScrollbar] = useState(false);
    const [editorListHasScrollAtBottom, setEditorListHasScrollAtBottom] = useState(false);
    const [editorListHasScrollbar, setEditorListHasScrollbar] = useState(false);
    const [ratesTableHasScrollbar, setRatesTableHasScrollbar] = useState(false);

    const [isAssigning, setIsAssigning] = useState(false);



    const assignDrpdownOutside = useRef();
    const selectRef = useRef();
    const jobSelectWrapRef = useRef();
    const editorListWrapRef = useRef();
    const ratesTableWrapRef = useRef();
    const fileBrowserInputRef = useRef(null)
    const allTaskListRef = useRef([])
    const isProjectAssignedRef = useRef(false)
    let scrl = useRef(null);
    const typeSearch = useRef()
    const isTaskListLoaded = useRef(false)
    const acceptedRatesRef = useRef(null);
    const biddedRatesRef = useRef(null);
    const projectDataRef = useRef(null)
    const editorListRef = useRef(null)
    const taskListRef = useRef([])
    const taskAssignmentInfo = useRef([])

    const unitTypeOptionRef = useRef([])


    const countTypeOptions = [
        { value: 'True', label: t('raw_count') },
        { value: 'False', label: t('weighted_count') }
    ]

    const cloneDropDownStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "5px 0px",
            marginTop: "0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #0000000D",
            borderRadius: "4px",
            width: "auto",
            // height: isCalculatingWidth ? 0 : "auto", 
            // visibility: isCalculatingWidth ? "hidden" : "visible"
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            backgroundColor: state.isFocused ? "#E8F0FE" : "#ffffff",
            // opacity: state.isDisabled ? 0.5 : 1,
            // cursor: state.isDisabled ? "context-menu" : "pointer",
            display: "flex",
            marginBottom: "8px",
            padding: "5px 12px",
            "&:hover": {
                backgroundColor: "#F4F5F7",
                cursor: state.isDisabled ? "context-menu" : "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "1px solid #E4E7E9" : "1px solid #E4E7E9",
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "normal",
            lineHeight: "24px",
            boxShadow: 0,
            height: 32,
            minHeight: 32,
            width: 'fit-content',
            minWidth: "100px",
            maxWidth: "100%",
            padding: "0px 0px 0px 10px",
            "&:hover": {
                cursor: "pointer",
            },
        }),
        valueContainer: (base, state) => ({
            ...base,
            // ...(menuWidth && { width: menuWidth })
            width: state.isSelected ? "200px" : 'fit-content',
        })
    };

    useEffect(() => {
        const checkJobScrollbar = () => {
            const divElement = jobSelectWrapRef.current;
            if (divElement) {
                const hasScrollbar = divElement.clientHeight < divElement.scrollHeight;
                setJobSelectHasScrollbar(hasScrollbar);
            }
        };

        const divElement = jobSelectWrapRef.current;
        if (divElement) {
            checkJobScrollbar(); // Check scrollbar initially

            // Attach event listener to recheck when the content changes
            const observer = new MutationObserver(checkJobScrollbar);
            observer.observe(divElement, { childList: true, subtree: true });

            return () => {
                observer.disconnect(); // Disconnect the observer when component unmounts
            };
        }
    }, []);

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
        const checkRatesTableScrollbar = () => {
            const divElement = ratesTableWrapRef.current;
            if (divElement) {
                const hasScrollbar = divElement.clientHeight < divElement.scrollHeight;
                setRatesTableHasScrollbar(hasScrollbar);
            }
        };

        const divElement = ratesTableWrapRef.current;
        if (divElement) {
            checkRatesTableScrollbar(); // Check scrollbar initially

            // Attach event listener to recheck when the content changes
            const observer = new MutationObserver(checkRatesTableScrollbar);
            observer.observe(divElement, { childList: true, subtree: true });

            return () => {
                observer.disconnect(); // Disconnect the observer when component unmounts
            };
        }
    }, []);


    // useEffect(() => {
    // 	const handleJobScroll = () => {
    // 	  const element = jobSelectWrapRef.current;
    // 	  if (element) {
    // 		const scrollTop = element.scrollTop;
    // 		if (scrollTop > 0) {
    // 			setJobSelectHasScrollAtBottom(true);
    // 		} else {
    // 			setJobSelectHasScrollAtBottom(false);
    // 		}
    // 	  }
    // 	};

    // 	const element = jobSelectWrapRef.current;
    // 	if (element) {
    // 	  element.addEventListener('scroll', handleJobScroll);
    // 	}

    // 	return () => {
    // 	  if (element) {
    // 		element.removeEventListener('scroll', handleJobScroll);
    // 	  }
    // 	};
    //   }, []);

    //   useEffect(() => {
    // 	const handleEditorScroll = () => {
    // 	  const element = editorListWrapRef.current;
    // 	  if (element) {
    // 		const scrollTop = element.scrollTop;
    // 		if (scrollTop > 0) {
    // 			setEditorListHasScrollAtBottom(true);
    // 		} else {
    // 			setEditorListHasScrollAtBottom(false);
    // 		}
    // 	  }
    // 	};

    // 	const element = editorListWrapRef.current;
    // 	if (element) {
    // 	  element.addEventListener('scroll', handleEditorScroll);
    // 	}

    // 	return () => {
    // 	  if (element) {
    // 		element.removeEventListener('scroll', handleEditorScroll);
    // 	  }
    // 	};
    //   }, []);


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

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props} className="job-options-list">
                    <label className="job-options-list-label">
                        {
                            props.label?.toString() === 'All pairs' ? (
                                <span className={props.isSelected && "bg-capsule"}>{props.label?.toString()}</span>
                            ) : (
                                <>
                                    <span className={props.isSelected && "bg-capsule"}>{props.label?.toString()?.split("->")[0]}</span>
                                    <RightArrowIcon />
                                    <span className={props.isSelected && "bg-capsule"}>{props.label?.toString()?.split("->")[1]}</span>
                                </>
                            )
                        }
                    </label>
                </components.Option>
            </div>
        );
    };

    const ValueContainer = ({ children, ...props }) => {
        let [values, input] = children;

        return (
            <components.ValueContainer {...props}>
                {values}
                {input}
            </components.ValueContainer>
        );
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

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
    });

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
    });

    const modaloption = {
        closeMaskOnClick: false,
        width: `385px !important`,
    };

    const handleChange = (value) => {
        setAssignStep(value)
    };

    const handlePaymentTypeChange = (value) => {
        setSelectedPaymentMethod(value);
    };

    const handlePaymentChange = (value) => {
        setSelectedPayment(value);
    };

    const handleDateChange = (newValue) => {
        setDeadline(newValue);
    };

    const handleEditorDropdown = (e) => {
        setAssignToDrpdown(true)
    }

    const handleOpenAcceptedRateBox = () => {
        setShowAcceptedRate(true)
    }

    const handleOpenBiddedRateBox = () => {
        setShowBiddedRate(true)
    }

    const openParticularJobRateSection = (id) => {
        setSelectedJobPairRate(id)
    }

    //Slide click
    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
        setscrollX(scrollX + shift);

        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };

    const scrollCheck = () => {
        setscrollX(scrl.current.scrollLeft);
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };

    useEffect(() => {
        if (showLSPAssignManage) {
            assignSettingDivRef.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [showLSPAssignManage])

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
    });

    const getLanguageNameFromId = (id) => {
        return targetLanguageOptionsRef.current?.find(each => each.id == id)?.language
    }

    // handler for editor selection
    const handleValueLoad = (editor, editor_type) => {

        if (checkedTaskIds?.length === 0) {
            Config.toast(t("select_a_task"), 'warning')
            return
        }

        let selected_tasks = null
        let selected_editor_assign_to_task = null
        let assigned_editor_step = null


        if (userDetails?.agency && isProjectAssignedRef.current) {
            selected_editor_assign_to_task = taskAssignmentInfo.current?.find(each => each.assign_to_details.id === editor.id)
            // console.log(selected_editor_assign_to_task);
            assigned_editor_step = selected_editor_assign_to_task?.task_assign_detail.step
            // console.log(assigned_editor_step);
        } else {
            selected_tasks = allTaskListRef.current?.filter(task => checkedTaskIds?.some(each => each.task_id === task.id))
            selected_editor_assign_to_task = selected_tasks?.find(task => task.task_assign_info?.find(each => each.task_assign_detail.step !== assignStep)?.assign_to_details?.id === editor.id)
            assigned_editor_step = selected_editor_assign_to_task?.task_assign_info?.find(each => each.task_assign_detail.step !== assignStep)?.task_assign_detail.step
        }



        if (assigned_editor_step === 1) {
            setAssignedEditorAlertString(t('an_editor_sm'))
        } else if (assigned_editor_step === 2) {
            setAssignedEditorAlertString(t("a_reviewer_sm"))
        }

        if (selected_editor_assign_to_task && editor_type !== 'agency') {
            setShowEditorAlreadyAssignedModal(true)
            return;
        }

        resetOutsideRates()

        if (selectedJobIds?.length === 1) {
            let vendor_bid = selectedJobIds[0]?.bid_info ? selectedJobIds[0]?.bid_info[0]?.bid_details?.find(each => each.vendor_id == editor.id && each.bid_step === assignStep) : undefined
            // console.log(vendor_bid);
            if (vendor_bid) {
                let { currency, mtpe_count_unit, mtpe_rate, mtpe_hourly_rate, bid_step } = vendor_bid
                setEditorsBiddedRate({ currency, mtpe_count_unit, mtpe_rate: (mtpe_count_unit !== 3 ? mtpe_rate : mtpe_hourly_rate), step: bid_step })
            }
        }
        fetchAcceptedRates(editor?.id)
        setSelectedEditor(editor)

        if (editor_type === 'internal') setIsInternalEditorSelected(true)
        else setIsInternalEditorSelected(false)

        setAssignToDrpdown(false)
    }

    useEffect(() => {
        if (selectedFileRow.current !== null) {
            setIsReviewerStepAvailable(
                selectedFileRow.current?.steps?.find(each => each.steps === 2) ?
                    true : false
            )
            // if assign_enable is true then its own created project
            // console.log(selectedFileRow.current?.assign_enable);
            // isProjectAssigned is [true] if the project is assigned to me - it will be [false] if it is my project
            isProjectAssignedRef.current = !selectedFileRow.current?.assign_enable
            setIsProjectAssigned(!selectedFileRow.current?.assign_enable)

            projectDataRef.current = selectedFileRow.current.project_data
            let projectType = selectedFileRow.current.project_data?.get_project_type
            if (projectType == 3 || projectType == 4) {
                unitTypeOptionRef.current = unitTypeOption?.filter(each => each.value !== 1 && each.value !== 2)
            } else {
                unitTypeOptionRef.current = unitTypeOption
            }

            getVendorDashboard()
            setTimeout(() => {
                getTaskList()
            }, 100);
        }
    }, [selectedFileRow.current])

    // trigger the editor search functionality when editor search text is typed
    useEffect(() => {
        editorSeachFunctionality()
    }, [editorSearchText])


    // tigger the task search functionlity when task search text is typed 
    useEffect(() => {
        taskSearchFunctionality()
    }, [taskSearchText])


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

    // task search funtionality (filters the task based on the filename and return the filtered output then convert it into ui suitable format)
    const taskSearchFunctionality = () => {
        if (taskListRef.current.current?.length !== 0) {
            let filtered_list = taskListRef.current.filter(task => task?.filename?.toLowerCase()?.includes(taskSearchText?.trim()?.toLowerCase()))
            setTaskList(convertTaskListToJobThenFileStructure(filtered_list))
        }
    }

    // convert the task list containing all tasks into job -> file format suitable for displaying in UI
    const convertTaskListToJobThenFileStructure = (list) => {
        // group values by job
        const groups = list?.reduce((groups, item) => {
            const group = (groups[item.job] || []);
            group.push(item);
            groups[item.job] = group;
            return groups;
        }, {});

        // seperate language pair from group
        let mappingValue = Object.keys(groups)?.map(each => (getLanguageNameFromId(list.find(task => task.job == each)?.source_language) + "->" + getLanguageNameFromId(list.find(task => task.job == each)?.target_language ? list.find(task => task.job == each)?.target_language : list.find(task => task.job == each)?.source_language)))

        // re-arrange then as list of lang-pair and task-list
        // group the list inside each appropriate language pair with respective job_ids
        let modifiedList = []
        mappingValue.map((pair, index) => {
            Object.values(groups)?.find((task, ind) => {
                if (index === ind) modifiedList.push({ job_id: parseInt(Object.keys(groups)?.find((each, i) => i === ind)), pair: pair, list: task })
            })
        })

        return modifiedList
    }

    // delete instruction files in server
    const handleInstructionFilesDelete = (fileId) => {
        let formData = new FormData();
        formData.append("task", selectedFileRow.current?.task);
        formData.append("step", fileId);
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

    const getTaskAssignInfo = (taskId) => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_assign_info/?tasks=${taskId}${(userDetails?.agency && isProjectAssignedRef.current) ? '&reassigned=True' : ''}`,
            auth: true,
            success: (response) => {
                // console.log(response.data);

                let newArr = response.data?.map(obj => {
                    return {
                        ...obj,
                        task_id: taskId
                    };
                })
                // console.log(newArr);
                let a = [...taskAssignmentInfo.current, ...newArr]

                taskAssignmentInfo.current = [...new Map(a.map(item => [item['id'], item])).values()]

                // if(response.data?.length !== 0){
                // 	response?.data?.map((eachRole) => {
                // 		// console.log(eachRole?.task_assign_detail.step == assignStep)
                // 		if(eachRole?.task_assign_detail.step == assignStep){

                // 		}
                // 	})
                // }
            },
            error: (err) => {

            }
        });
    }

    // useEffect(() => {
    //   console.log(taskAssignmentInfo.current);
    // }, [taskAssignmentInfo.current])


    // get editor list based on project, mutiple jobs(lang-pair), and reassignable tasks(applicable only for LSPs)
    const getAllEditorsList = (from) => {
        setIsEditorListLoading(true)
        let url = `${Config.BASE_URL}/workspace/assign_to/?project=${selectedFileRow.current?.project}${(isProjectAssignedRef.current && userDetails?.agency) ? '&reassign=True' : ''}`;

        if (from === 'checked-task') {
            let a = allTaskListRef.current?.filter(task => checkedTaskIds?.some(each => each.task_id === task.id))
            let distinct = [...new Set(a.map(item => item.job))]
            let list = ''
            distinct?.map((each, index) => {
                list += `job=${each}${index !== distinct.length - 1 ? "&" : ""
                    }`;
            });
            url = `${Config.BASE_URL}/workspace/assign_to/?project=${selectedFileRow.current?.project}&${list}${(isProjectAssignedRef.current && userDetails?.agency) ? '&reassign=True' : ''}`
        }

        if (selectedJob?.job_id) url = `${Config.BASE_URL}/workspace/assign_to/?project=${selectedFileRow.current?.project}&job=${selectedJob?.job_id}${(isProjectAssignedRef.current && userDetails?.agency) ? '&reassign=True' : ''}`

        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                if (checkedTaskIds?.length === 1) {
                    let list = response.data
                    let checked_task = allTaskListRef.current?.find(task => checkedTaskIds?.some(each => each.task_id === task.id))
                    // console.log(checked_task)
                    let assign_info = null

                    if (userDetails?.agency && isProjectAssignedRef.current) {
                        assign_info = taskAssignmentInfo.current?.find(each => each.task_assign_detail.step !== assignStep)
                    } else {
                        assign_info = checked_task?.task_assign_info?.find(each => each.task_assign_detail.step !== assignStep)
                    }

                    // console.log(assign_info)
                    // console.log(list)

                    // Loop through each key-value pair
                    for (const key in list) {
                        // console.log(key)
                        if (key !== 'agencies') {
                            if (Object.hasOwnProperty.call(list, key)) {
                                // Use filter to create a new array without the value to remove
                                list[key] = list[key]?.filter(val => (val.id !== assign_info?.assign_to_details?.id && (!val?.agency || val?.agency === undefined)));
                            }
                        }
                    }
                    editorListRef.current = list
                    setEditorList(list)
                    setIsEditorListLoading(false)
                } else {
                    editorListRef.current = response.data
                    setEditorList(response.data)
                    setIsEditorListLoading(false)
                }
            },
            error: (err) => { }
        });
    };

    // This will get all the language pairs of that project and adds [All pairs] option to the language drop-down
    const getVendorDashboard = () => {
        console.log(selectedFileRow.current)
        Config.axios({
            url: `${Config.BASE_URL}/workspace/vendor/dashboard/${selectedFileRow.current?.project}`,
            auth: true,
            success: (response) => {
                let job_list = []
                let pair = []
                let distinct_list = [...new Map(response.data?.map(item => [item['job'], item])).values()]
                distinct_list?.map(item => {
                    if (
                        (selectedFileRow.current?.project_data?.get_project_type === 1 || selectedFileRow.current?.project_data?.get_project_type === 2) ?
                            (item?.target_language !== undefined && item?.target_language !== null) : true
                    ) {
                        job_list.push({
                            job_id: item.job,
                            label: `${getLanguageNameFromId(item.source_language)}->${getLanguageNameFromId(item.target_language) ?
                                getLanguageNameFromId(item.target_language) : getLanguageNameFromId(item.source_language)
                                }`
                        })
                        pair.push({ src: item.source_language, tar: item.target_language ? item.target_language : item.source_language })
                    }
                })
                job_list.unshift({ job_id: 0, label: 'All pairs' })
                setJobOptions(job_list)
                let { src, tar } = pair[0]
                let sourceData = getLanguageNameFromId(src);
                let targetData = getLanguageNameFromId(tar);
                setRedirectionToMarketplace(`${Config.MARKETPLACE_HOST}find-editor?source=${sourceData}&target=${targetData}`);
            },
            error: (err) => { }
        });
    }

    // This is get the list of tasks based on a project or a job
    const getTaskList = (from) => {
        setIsTaskListLoading(true)
        let url = ''
        if (from === 'job' && selectedJob?.job_id !== 0)
            url = `${Config.BASE_URL}/workspace/tasks_list/?job=${selectedJob.job_id}`
        else
            url = `${Config.BASE_URL}/workspace/tasks_list/?project=${selectedFileRow.current?.project}`

        Config.axios({
            url: url,
            auth: true,
            success: (response) => {
                allTaskListRef.current = response.data

                isTaskListLoaded.current = !isTaskListLoaded.current
                setTaskList(convertTaskListToJobThenFileStructure(response.data))
                setIsTaskListLoading(false)
                if (response.data.length == 0) setEmptyProjects(true);
                else setEmptyProjects(false);
                taskListRef.current = response.data
                // console.log(response.data?.find(task => task?.task_assign_info?.find(each => (userDetails.pk === each?.assign_to_details.id && each.task_assign_detail.step === 1))))
                // console.log(response.data?.find(task => task?.task_assign_info?.find(each => (userDetails.pk === each?.assign_to_details.id && each.task_assign_detail.step === 2))))
                if (userDetails?.agency && isProjectAssignedRef.current) {
                    let step_switch = { editor: false, reviewer: false }
                    if (response.data?.find(task => task?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 1 && each?.task_ven_status === 'task_accepted')))) {
                        setStepSwitchForLSP({ ...stepSwitchForLSP, editor: true })
                        step_switch = { ...step_switch, editor: true }
                    }
                    if (response.data?.find(task => task?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === 2 && each?.task_ven_status === 'task_accepted')))) {
                        step_switch = { ...step_switch, reviewer: true }
                    }
                    console.log(step_switch);
                    if (step_switch.editor) setAssignStep(1)
                    else setAssignStep(2)
                    setStepSwitchForLSP(step_switch)
                }
            },
            error: (err) => { }
        });
    }

    // when assign step is changed clear all the selected tasks
    // for LSP users with assigned projects filter the task based on step selected
    // filter the tasks and shows only the task available for that selected step
    useEffect(() => {
        setcheckedTaskIds([])
        if (assignStep && allTaskListRef.current?.length !== 0 && userDetails?.agency && isProjectAssignedRef.current) {
            let filter_res = allTaskListRef.current?.filter(task => task?.task_assign_info?.find(each => ((userDetails.pk === each?.assign_to_details.id || each?.assign_to_details.managers?.find(user => user === userDetails.pk)) && each.task_assign_detail.step === assignStep && each?.task_ven_status === 'task_accepted')))
            setTaskList(convertTaskListToJobThenFileStructure(filter_res))
            taskListRef.current = filter_res
        }
    }, [assignStep, isTaskListLoaded.current])


    // Handler for the task checkboxes  
    const handleTaskCheckbox = (event, task_id, job_id) => {
        if (event.target.checked) {
            getTaskAssignInfo(task_id)
            setcheckedTaskIds([...checkedTaskIds, { task_id, job_id }])
        } else if (event.target.checked === false) {
            taskAssignmentInfo.current = taskAssignmentInfo.current?.filter(item => item.task_id !== task_id)
            setcheckedTaskIds(checkedTaskIds.filter(item => item.task_id !== task_id))
        }
    }

    // Handler for job checkboxes - checking the job will only check the tasks that are not assigned and not reassigned
    const handleJobCheckbox = (event, job_id) => {
        if (event.target.checked) {
            let list = allTaskListRef.current.filter(each => each.job === job_id)
            let selected_task_list = []
            list?.map(task => {

                let assignInfo = task?.task_assign_info?.find(each => each.task_assign_detail.step == assignStep)
                let reassignInfo = typeof task?.task_reassign_info === 'object' ? task?.task_reassign_info?.find(each => each.task_assign_detail.step == assignStep) : null
                // console.log(reassignInfo);

                // filtered task - task that are available for that selected step - it is applied for [LSPs] only
                let taskAvailableToAssign = task?.task_assign_info?.find(each => (each.task_assign_detail.step === assignStep && each?.task_ven_status === 'task_accepted' && each?.task_assign_detail.task_status !== 'Completed' && each?.task_assign_detail.task_status !== 'Return Request'))

                if (
                    (userDetails?.agency && isProjectAssignedRef.current) ? ((reassignInfo === null || reassignInfo === undefined) && taskAvailableToAssign) :
                        (assignInfo === null || assignInfo === undefined)
                    // !userDetails?.agency ? ((assignInfo === null || assignInfo === undefined || userDetails?.agency) && (reassignInfo === null || reassignInfo === undefined)) :
                    // ((assignInfo === null || assignInfo === undefined || (userDetails?.agency)) && (reassignInfo === null || reassignInfo === undefined) && taskAvailableToAssign)
                ) {
                    selected_task_list.push({ task_id: task.id, job_id: task.job })
                }
            })
            setcheckedTaskIds([...checkedTaskIds, ...selected_task_list])
        } else if (event.target.checked === false) {
            setcheckedTaskIds(checkedTaskIds?.filter(each => each.job_id !== job_id))
        }
    }

    // based on the selected tasks create distinct jobs with rates layout containing all the data given to [API]
    useEffect(() => {
        setSelectedEditor({})
        // console.log(checkedTaskIds);
        let a = allTaskListRef.current?.filter(task => checkedTaskIds?.some(each => each.task_id === task.id))
        let distinct = [...new Map(a.map(item => [item['job'], item])).values()]
        let job_list = distinct?.map(item => {
            return {
                job_id: item.job,
                bid_info: item?.bid_job_detail_info,
                lang_pair: `${targetLanguageOptionsRef.current.find(each => each.id == item.source_language)?.language}->${targetLanguageOptionsRef.current.find(each => each.id == item.target_language) ?
                    targetLanguageOptionsRef.current.find(each => each.id == item.target_language)?.language :
                    targetLanguageOptionsRef.current.find(each => each.id == item.source_language)
                    }`,
                rates: {
                    mtpe_rate: '',
                    currency: null,
                    mtpe_count_unit: null,
                    account_raw_count: "True",
                    tasks: checkedTaskIds?.filter(each => each.job_id === item.job).map(item => { return item.task_id }),
                    ...(item?.rates?.mtpe_count_unit === 3 && { estimated_hours: '' })
                }
            }
        })
        // console.log(job_list);
        setSelectedJobPairRate(job_list[0]?.job_id)
        setSelectedJobIds(job_list)

        if (checkedTaskIds?.length !== 0) {
            if ((selectedJob === null || selectedJob?.job_id === 0)) {
                getAllEditorsList('checked-task')
            }
        } else {
            if ((selectedJob === null || selectedJob?.job_id === 0)) {
                getAllEditorsList()
            }
        }
    }, [checkedTaskIds])


    useEffect(() => {
        if (selectedJob !== null) {
            setcheckedTaskIds([])
            if (selectedJob.job_id === 0) {
                getTaskList('job')
                getAllEditorsList()
            } else {
                getTaskList('job')
                getAllEditorsList('job-select')
            }
        }
    }, [selectedJob])

    useEffect(() => {
        if (selectedJobIds?.length > 1) {
            resetOutsideRates()
            setCompletedJobRateCount(document.querySelectorAll('.rate-confirm-tick-img')?.length)
        }
    }, [selectedJobIds])

    const resetOutsideRates = () => {
        setCurrencySelect(null)
        setUnitTypeSelect(null)
        setUnitRate('')
        setEstimatedHours('')
        setEditorsBiddedRate(null)
        // setEditorsAcceptedRates(null)
    }

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

        if (instructionLocalFiles?.length !== 0) {
            instructionLocalFiles?.map(file => {
                formData.append("instruction_file", file);
            })
        }
        let arrDict = []
        if (selectedJobIds?.length > 1) {
            selectedJobIds?.map(each => {
                if (isInternalEditorSelected) {
                    arrDict.push(Object.fromEntries(Object.entries(each.rates).filter(([key]) => key.includes('tasks'))))
                } else {
                    arrDict.push(each.rates)
                }
            })
        } else {
            arrDict.push({
                ...(!isInternalEditorSelected && {
                    mtpe_rate: parseFloat(unitRate),
                    currency: currencySelect?.value,
                    mtpe_count_unit: unitTypeSelect?.value,
                    account_raw_count: countType?.value,
                    ...(unitTypeSelect?.value === 3 && { estimated_hours: estimatedHours })
                }),
                tasks: checkedTaskIds?.map(item => { return item.task_id }),
            })
        }

        // console.log(JSON.stringify(arrDict))

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
                // console.log(response.data)
                Config.toast(t("task_assigned_success"))
                listFiles(selectedFileRow.current?.project)
                setShowLSPAssignManage(false)
                // if (response.data?.msg) {
                // }
                setIsAssigning(false)
            },
            error: (error) => {
                if (error?.response?.status == 400) {
                    Config.toast(error?.response?.data?.mtpe_rate, "warning");
                }
                if (error.response?.data?.message == "integrirty error") Config.toast(t('already_assigned'), "warning");
                setIsAssigning(false)
            },
        });
    }

    const handleRatesChange = (e, jobId, unitTypeValue, countTypeValue) => {
        let { name, value } = e.target
        const newArr = selectedJobIds?.map(obj => {
            if (obj.job_id === jobId) {
                return {
                    ...obj,
                    rates: {
                        ...obj.rates,
                        ...(
                            name === 'mtpe_count_unit' ? { [name]: unitTypeValue?.value }
                                : name === 'account_raw_count' ? { [name]: countTypeValue?.value }
                                    : name === 'estimated_hours' ? { [name]: parseInt(value) }
                                        : name === 'mtpe_rate' ? { [name]: parseFloat(value) } : { [name]: value }
                        ),
                        ...(
                            (name === 'mtpe_count_unit' && (unitTypeValue?.value === 3 || unitTypeValue?.value === 4)) && { account_raw_count: "True" }
                        ),
                    },
                };
            }
            return obj;
        });

        // console.log(newArr)
        setSelectedJobIds(newArr)
    }

    const handleCurrencyChange = (selectedOption) => {
        const newArr = selectedJobIds?.map(obj => {
            return {
                ...obj,
                rates: {
                    ...obj.rates,
                    currency: selectedOption.value
                },
            };

        });
        // console.log(newArr)
        setSelectedJobIds(newArr)
    }

    // reset all rates in the set rates form
    const handleClearAllRates = () => {
        const newArr = selectedJobIds?.map(obj => {
            return {
                ...obj,
                rates: {
                    currency: null,
                    account_raw_count: "True",
                    mtpe_rate: '',
                    mtpe_count_unit: null,
                    tasks: obj.rates.tasks
                },
            };

        });
        // console.log(newArr)
        setSelectedJobIds(newArr)
    }

    // toggles the editor [view all] button 
    const handleViewAllBtn = (type) => {
        setViewAllEditor({
            ...viewAllEditor,
            [type]: !viewAllEditor[type]
        })
    }

    // get previous accepted rates of that editor
    const fetchAcceptedRates = (editorId) => {
        // e.stopPropagation(); 
        var formdata = new FormData();
        formdata.append("vendor_id", editorId);

        selectedJobIds?.forEach(each => {
            formdata.append("job_id", each?.job_id);
        })

        Config.axios({
            url: `${Config.BASE_URL}/marketplace/get_previous_accepted_rate/`,
            auth: true,
            method: "POST",
            data: formdata,
            success: (response) => {
                if (response.status === 200) {
                    if (Object.values(response.data["Previously Agreed Rates"][0])?.length !== 0) {
                        let data = response.data["Previously Agreed Rates"]
                        setEditorsAcceptedRates(data)
                    } else {
                        let data = response.data["Given Rates"]

                        let rates = Object.values(data[0])?.flat(1)
                        setEditorsGivenRate(rates)
                    }
                } else {
                    Config.toast(`${t("prev_accepted_rate")}`, 'error')
                }
            },
        });
    }

    // pre-fill the accepted rates
    useEffect(() => {
        if (editorsAcceptedRates !== null && editorsBiddedRate === null) {
            // destructure the editor rates for easy accessibility
            let rates = {}
            if (selectedJobIds?.length === 1) {
                editorsAcceptedRates?.map(each => {
                    rates = each[selectedJobIds[0]?.job_id]
                })
            }
            // console.log(rates);
            let { currency, mtpe_count_unit, mtpe_rate, step } = rates
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
        if (editorsGivenRate) {
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
        if (editorsGivenRate) {
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

    const handleUseAccepteRate = () => {
        let { currency, mtpe_count_unit, mtpe_rate, step } = editorsAcceptedRates[0]?.[selectedJobIds[0]?.job_id]
        // console.log(currency);
        // console.log(mtpe_count_unit);
        // console.log(step);
        if (assignStep === step) {
            setCurrencySelect(currencyOption?.find(each => each.value === currency))
            setUnitTypeSelect(unitTypeOptionRef.current.find((element) => element.value === mtpe_count_unit))
            setUnitRate(mtpe_rate !== null ? mtpe_rate : '')
        }
        setShowAcceptedRate(false)
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

    const handleUseAcceptInMutipleJobs = (job_id, currency, mtpe_count_unit, mtpe_rate) => {
        const newArr = selectedJobIds?.map(obj => {
            if (obj.job_id === job_id) {
                return {
                    ...obj,
                    rates: {
                        ...obj.rates,
                        mtpe_count_unit: mtpe_count_unit,
                        mtpe_rate: mtpe_rate,
                        currency: currency
                    },
                };
            }
            return obj;
        });

        // console.log(newArr)
        setSelectedJobIds(newArr)
        setShowAcceptedRate(false)
    }

    const handleUseBiddedRateInMutipleJobs = (job_id, currency, mtpe_count_unit, mtpe_rate) => {
        const newArr = selectedJobIds?.map(obj => {
            if (obj.job_id === job_id) {
                return {
                    ...obj,
                    rates: {
                        ...obj.rates,
                        mtpe_count_unit: mtpe_count_unit,
                        mtpe_rate: mtpe_rate,
                        currency: currency
                    },
                };
            }
            return obj;
        });

        // console.log(newArr)
        setSelectedJobIds(newArr)
        setShowBiddedRate(false)
    }



    return (
        <>
            {showLSPAssignManage && (
                <Rodal className={"project-list-assign-modal lsp-assign-wrap " + (assignManageSwitch === "payment-method" ? "payment-method-width" : "")} visible={showLSPAssignManage} showCloseButton={false}>
                    <div className="file-list-assign-main-wrapper lsp-assign-inner-wrap" ref={assignSettingDivRef}>
                        <div className="file-list-assign-manage-header">
                            {
                                assignManageSwitch === "payment-method" ?
                                    <div className="payment-method-header">
                                        <span className="icon-wrap" onClick={() => setAssignManageSwitch("assign-and-manage")}>
                                            <ArrowBackIosNewIcon className="arrow-back" />
                                        </span>
                                        <h1 className="title">
                                            {t("payment_method")}
                                        </h1>
                                    </div>
                                    :
                                    <h1 className="title">{t("assign_and_manage")}</h1>
                            }
                            <span className="close-btn" onClick={() => setShowLSPAssignManage(false)}>
                                <CloseIcon className="header-close" />
                            </span>
                        </div>
                        {/* <AnimatePresence>
						{
							assignManageSwitch === "assign-and-manage" ?
							<motion.div
								key={`${assignManageSwitch}`}
								animate={{ opacity: 1, x: 0 }}
								initial={{ opacity: 0, x: 30 }}
								exit={{ opacity: 0, x: -30 }}
								transition={{ duration: 0.25 }}
							> */}
                        <div className="lsp-assign-manage-row">
                            <div className="lsp-assign-manage-large-area-inner-main-wrap">
                                <div className="job-select-filter-wrapper">
                                    <div className="job-assign-member-select-wrap">
                                        {
                                            !isProjectAssigned ? (
                                                <ButtonBase className={"assign-manage-radio-btn " + (assignStep === 1 ? "selected" : "")} onClick={() => handleChange(1)}>
                                                    <Radio
                                                        checked={assignStep === 1}
                                                        size="small"
                                                        value={assignStep}
                                                        onChange={() => handleChange(1)}
                                                    />
                                                    <p className="label">{t("editor")}</p>
                                                </ButtonBase>
                                            ) : (isProjectAssigned && userDetails?.agency && stepSwitchForLSP.editor) && (
                                                <ButtonBase className={"assign-manage-radio-btn " + (assignStep === 1 ? "selected" : "")} onClick={() => handleChange(1)}>
                                                    <Radio
                                                        checked={assignStep === 1}
                                                        size="small"
                                                        value={assignStep}
                                                        onChange={() => handleChange(1)}
                                                    />
                                                    <p className="label">{t("editor")}</p>
                                                </ButtonBase>
                                            )
                                        }
                                        {
                                            (isReviewerStepAvailable && !isProjectAssigned) ? (
                                                <ButtonBase
                                                    className={"assign-manage-radio-btn " + (assignStep === 2 ? "selected" : "")}
                                                    onClick={() => handleChange(2)}
                                                >
                                                    <Radio
                                                        checked={assignStep === 2}
                                                        size="small"
                                                        value={assignStep}
                                                        onChange={() => handleChange(2)}
                                                    />
                                                    <p className="label">{t("reviewer")}</p>
                                                </ButtonBase>
                                            ) : (isProjectAssigned && userDetails?.agency && stepSwitchForLSP.reviewer) && (
                                                <ButtonBase
                                                    className={"assign-manage-radio-btn " + (assignStep === 2 ? "selected" : "")}
                                                    onClick={() => handleChange(2)}
                                                >
                                                    <Radio
                                                        checked={assignStep === 2}
                                                        size="small"
                                                        value={assignStep}
                                                        onChange={() => handleChange(2)}
                                                    />
                                                    <p className="label">{t("reviewer")}</p>
                                                </ButtonBase>
                                            )
                                        }
                                    </div>
                                    <div className="select-pair">
                                        <Select
                                            ref={selectRef}
                                            isClearable={false}
                                            isSearchable={false}
                                            options={jobOptions}
                                            onChange={(selectedOption) => setSelectedJob(selectedOption)}
                                            styles={cloneDropDownStyles}
                                            menuPlacement="auto"
                                            // menuIsOpen={true}
                                            classNamePrefix="source-term-select"
                                            hideSelectedOptions={false}
                                            placeholder={t("all_pairs")}
                                            components={{
                                                Option,
                                                DropdownIndicator,
                                                ValueContainer,
                                                IndicatorSeparator: () => null
                                            }}
                                        />
                                    </div>
                                    {(userDetails?.agency && isProjectAssigned && allTaskListRef.current?.length !== 0) && (
                                        <ButtonBase className="assign-info-modal-btn" onClick={() => setShowAssignmentInfoModal(true)}>
                                            <ErrorOutlineIcon className="icon" />
                                            {t("assignment_info")}
                                        </ButtonBase>
                                    )}
                                </div>
                                <div className="lsp-assign-manage-large-area-wrap">
                                    <div className={`job-select-wrapper ${!jobSelectHasScrollbar ? 'no-scroll-right-space' : "scroll-right-space scroll-bottom-shadow"}`}>
                                        <div className="job-select-search-area">
                                            <input
                                                className="search-task"
                                                placeholder={t("search_task")}
                                                onChange={(e) => setTaskSearchText(e.target.value)}
                                                maxLength={300}
                                            />
                                            <SearchIcon className="search-icon" />
                                        </div>
                                        <div className="job-header-wrap">
                                            {/* <div className="job-header-item">
															<Checkbox size="small" />
														</div> */}
                                            <div className="job-header-item" style={{ padding: '9px' }}>
                                                <p>{t("jobs")}</p>
                                            </div>
                                            {/* <div className="job-header-item">
															<p>FILE</p>
														</div> */}
                                        </div>
                                        <div ref={jobSelectWrapRef} className="job-select-table-wrapper">
                                            <div className="job-body-inner-wrapper">
                                                {(taskList?.length !== 0 || !isTaskListLoading) ? (
                                                    taskList?.map((item, index) => {
                                                        let { pair, list } = item
                                                        let [sourceLang, targetLang] = pair?.split('->')
                                                        let listLen = list?.filter(task => {
                                                            task?.task_assign_info?.find(each => each.task_assign_detail.step == assignStep) && typeof task?.task_reassign_info === 'object' && task?.task_reassign_info?.find(each => each.task_assign_detail.step == assignStep)
                                                        })?.length

                                                        return (
                                                            <>
                                                                <div key={index} className="job-body-wrap">
                                                                    <label htmlFor={`job-${item?.job_id}`} className="job-body-item lang-pair-wrap-lsp-assaig">
                                                                        <Checkbox
                                                                            size="small"
                                                                            id={`job-${item?.job_id}`}
                                                                            // checked={
                                                                            // 	listLen === checkedTaskIds?.filter(each => each.job_id === item?.job_id)?.length
                                                                            // }
                                                                            onClick={(e) => handleJobCheckbox(e, item.job_id)}
                                                                        />
                                                                        <div className="job-lang-pair">
                                                                            <span>{sourceLang}</span>
                                                                            <RightArrowIcon />
                                                                            <span>{targetLang}</span>
                                                                        </div>
                                                                    </label>
                                                                    {
                                                                        list?.map(task => {
                                                                            let assignInfo = task?.task_assign_info?.find(each => each.task_assign_detail.step == assignStep)
                                                                            let assignToName = assignInfo?.assign_to_details?.name

                                                                            let reassignInfo = typeof task?.task_reassign_info === 'object' ? task?.task_reassign_info?.find(each => each.task_assign_detail.step == assignStep) : null
                                                                            let reassignToName = reassignInfo?.assign_to_details?.name

                                                                            let is_task_reassignable = assignInfo?.task_assign_detail.task_status !== 'Completed' && assignInfo?.task_assign_detail.task_status !== 'Return Request'
                                                                            let task_status = assignInfo?.task_assign_detail.task_status

                                                                            // console.log(assignInfo);

                                                                            return (
                                                                                <Tooltip
                                                                                    key={task.id}
                                                                                    title={userDetails.agency ? (reassignToName ? `${t("assigned_to")}: ${reassignToName}` : !is_task_reassignable ? task_status : '') : (assignToName ? `${t("assigned_to")}: ${assignToName}` : "")}
                                                                                    placement="top"
                                                                                    arrow
                                                                                >
                                                                                    <label
                                                                                        htmlFor={`task-${task?.id}`}
                                                                                        key={task.id}
                                                                                        style={!is_task_reassignable ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                                                                                        className={"job-body-wrap-item " + (checkedTaskIds?.find(each => each.task_id === task?.id) ? "selected-job" : "")}
                                                                                    >
                                                                                        <div className="job-body-item">
                                                                                            {	// If task is not assigned show checkbox 
                                                                                                ((isProjectAssignedRef.current && userDetails?.agency) ? (reassignInfo === null || reassignInfo === undefined) : (assignInfo === null || assignInfo === undefined)) ? (
                                                                                                    <Checkbox
                                                                                                        size="small"
                                                                                                        checked={checkedTaskIds?.find(each => each.task_id === task?.id) ? true : false}
                                                                                                        onClick={(e) => is_task_reassignable && handleTaskCheckbox(e, task.id, task.job)}
                                                                                                        id={`task-${task?.id}`}
                                                                                                    />
                                                                                                ) : (
                                                                                                    <span className="assigned-task-icon">
                                                                                                        <img
                                                                                                            src={HowToRegister}
                                                                                                            alt="project assigned"
                                                                                                            should-open-files="dont-open"
                                                                                                        />
                                                                                                    </span>
                                                                                                )
                                                                                            }
                                                                                        </div>

                                                                                        <div className="job-body-item">
                                                                                            <div className="document-wrap">
                                                                                                <img src={Config.BASE_URL + `/app/extension-image/${task?.filename?.split(".")?.pop()}`} alt="file" />
                                                                                                <div className="proj-name">
                                                                                                    <p>{task.filename?.split(".")?.slice(0, -1)?.join(".") ? task.filename?.split(".")?.slice(0, -1)?.join(".") : selectedFileRow.current.project_data?.get_project_type === 6 ? t("designer_file") : t("glossary_file")}</p>
                                                                                                    <span className="extension">{task.filename?.split(".")?.pop() ? "." + task.filename?.split(".")?.pop() : ''}</span>
                                                                                                </div>
                                                                                                {
                                                                                                    task.task_word_count !== null || task?.progress?.source_words !== undefined && (
                                                                                                        <span className="word-count">
                                                                                                            {task.task_word_count ? task.task_word_count : task?.progress?.source_words} W
                                                                                                        </span>
                                                                                                    )
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </label>
                                                                                </Tooltip>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                ) : !emptyProjects ? (
                                                    <>
                                                        {Array(3)
                                                            .fill(null)
                                                            .map((value, key) => (
                                                                <div key={key} className="job-body-wrap">
                                                                    <label className="job-body-item lang-pair-wrap-lsp-assaig">
                                                                        <Skeleton
                                                                            animation="wave"
                                                                            style={{ marginRight: "0.5rem" }}
                                                                            variant="circular"
                                                                            width={19}
                                                                            height={19}
                                                                        />
                                                                        <div className="d-flex">
                                                                            <Skeleton
                                                                                animation="wave"
                                                                                style={{ marginRight: "5px" }}
                                                                                variant="rounded"
                                                                                width={53}
                                                                                height={19}
                                                                            />
                                                                            <Skeleton
                                                                                animation="wave"
                                                                                variant="rounded"
                                                                                width={19}
                                                                                height={19}
                                                                            />
                                                                            <Skeleton
                                                                                animation="wave"
                                                                                style={{ marginLeft: "5px" }}
                                                                                variant="rounded"
                                                                                width={53}
                                                                                height={19}
                                                                            />
                                                                        </div>
                                                                    </label>
                                                                    <label className="job-body-wrap-item">
                                                                        <div className="job-body-item">
                                                                            <Skeleton
                                                                                animation="wave"
                                                                                style={{ marginRight: "1rem" }}
                                                                                variant="circular"
                                                                                width={19}
                                                                                height={19}
                                                                            />
                                                                        </div>
                                                                        <div className="job-body-item">
                                                                            <div className="document-wrap">
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    style={{ marginRight: "10px" }}
                                                                                    variant="rounded"
                                                                                    width={30}
                                                                                    height={19}
                                                                                />
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    style={{ marginRight: "10px" }}
                                                                                    variant="rounded"
                                                                                    width={120}
                                                                                    height={19}
                                                                                />
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    style={{ marginRight: "10px" }}
                                                                                    variant="rounded"
                                                                                    width={90}
                                                                                    height={19}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <div className="job-body-wrap">
                                                        <small style={{ textAlign: 'center', display: 'block', marginBottom: '10px' }}>{t("no_tasK_found")}</small>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`assign-to-wrap-main-wrap ${!editorListHasScrollbar ? 'no-scroll-right-space' : "scroll-right-space scroll-bottom-shadow"}`}>
                                        {/* <div className="icon-label-wrap">
														<Person style="label-icon"/>
														<span className="title">Assign to*</span>
													</div> */}
                                        <div className="options-selected-area">
                                            <div className="select-assign-editor-reviewer-wrapper">
                                                <div className={"assigning-input-area " + (Object.keys(selectedEditor).length !== 0 && "add-border")}>
                                                    {/* {Object.keys(selectedEditor).length !== 0 ?
																<div className="value-wrap">
																	<div className="value-capsule">
																		{
																			(selectedEditor.avatar === null || selectedEditor.avatar === "") ?
																				<div className="no-avatar">{selectedEditor.name?.charAt(0).toUpperCase()}</div>
																				:
																				<img src={`${Config.BASE_URL}${selectedEditor.avatar}`} alt="profile-pic" />
																		}
																		<span className="input-label">{selectedEditor.name}</span>
																		<span className="remove" onClick={() => setSelectedEditor({})}>
																			<CloseIcon className="remove-member" />
																		</span>
																	</div>
																</div>
																:
																<input placeholder="Search Reviewer" onClick={(e) => handleEditorDropdown(e)} />
															} */}
                                                    <input
                                                        placeholder={assignStep === 1 ? t("search_editor") : t("search_rev")}
                                                        value={editorSearchText}
                                                        onChange={(e) => setEditorSearchText(e.target.value)}
                                                        maxLength={300}
                                                    />
                                                    <SearchIcon className="search-icon" />
                                                </div>
                                                <div ref={editorListWrapRef} className="editor-wrap-list">
                                                    <div className="editor-wrap-inner-list">
                                                        <div className="external-wrapper">
                                                            <div className="header">
                                                                <p>{t("external_editors")}</p>
                                                                {(editorList?.external_editors?.length > 2 && !isEditorListLoading) && (
                                                                    <span className="link" onClick={() => handleViewAllBtn('external')}>
                                                                        {viewAllEditor.external ? t("view_less") : t("view_all")}
                                                                    </span>
                                                                )}
                                                                {/* <a className="link" href="#">Find more editors</a> */}
                                                            </div>
                                                            <div className="list-body">
                                                                {
                                                                    (editorList?.external_editors?.length !== 0) ? (
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
                                                                                                editorList?.external_editors?.slice(0, viewAllEditor.external ? editorList?.external_editors?.length : 2)?.map((editor) => {
                                                                                                    return (
                                                                                                        <div key={editor.id} style={editor.status === "Invite Sent" ? { opacity: 0.5, pointerEvents: 'none' } : {}} className={selectedEditor.id == editor.id ? "suggest-member-item-active" : "suggest-member-item"} onClick={() => handleValueLoad(editor, 'external')}>
                                                                                                            <div className="suggestion-icon-wrap">
                                                                                                                {
                                                                                                                    (editor.avatar === null || editor.avatar === "") ?
                                                                                                                        <div className="no-avatar">{editor.name.charAt(0).toUpperCase()}</div>
                                                                                                                        :
                                                                                                                        <img src={`${Config.BASE_URL}${editor.avatar}`} alt="profile-pic" />
                                                                                                                }
                                                                                                                <div className="name">{editor.name}</div>
                                                                                                                {editor.status === "Invite Sent" && (
                                                                                                                    <span className="creds-sent-ui-chip">
                                                                                                                        {t("invite_sent")}
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
                                                                                            {(viewAllEditor.external || editorList?.external_editors?.length <= 2) && (
                                                                                                <small style={{ textAlign: 'center', display: 'block', marginBottom: '10px' }}><a href={redirectionToMarketplace} target="_blank" rel="noreferrer">{t('find_more_editors')}</a></small>
                                                                                            )}
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </>
                                                                    )
                                                                        :
                                                                        (
                                                                            <small style={{ textAlign: 'center', opacity: 0.6, display: 'block', marginBottom: '10px' }}>No editors to display <a href={redirectionToMarketplace} target="_blank" rel="noreferrer">{t("go_to_marketplace")}</a></small>
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="external-wrapper">
                                                            <div className="header">
                                                                <p>{t("internal_users")}</p>
                                                                {(editorList?.internal_editors?.length > 2 && !isEditorListLoading) && (
                                                                    <span className="link" onClick={() => handleViewAllBtn('internal')}>
                                                                        {viewAllEditor.internal ? t("view_less") : t("view_all")}
                                                                    </span>
                                                                )}
                                                                {/* <a className="link" href="#">Add more users</a> */}
                                                            </div>
                                                            <div className="list-body">
                                                                {
                                                                    editorList?.internal_editors?.length !== 0 ? (
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
                                                                                                editorList?.internal_editors?.slice(0, viewAllEditor.internal ? editorList?.internal_editors?.length : 2)?.map((editor) => {
                                                                                                    return (
                                                                                                        <div
                                                                                                            key={editor.id}
                                                                                                            style={editor.status === "Credentials Sent" ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                                                                                                            className={selectedEditor.id == editor.id ? "suggest-member-item-active" : "suggest-member-item"}
                                                                                                            onClick={() => handleValueLoad(editor, 'internal')}
                                                                                                        >
                                                                                                            <div className="suggestion-icon-wrap">
                                                                                                                {
                                                                                                                    (editor.avatar === null || editor.avatar === "") ?
                                                                                                                        <div className="no-avatar">{editor.name.charAt(0).toUpperCase()}</div>
                                                                                                                        :
                                                                                                                        <img src={`${Config.BASE_URL}${editor.avatar}`} alt="profile-pic" />
                                                                                                                }
                                                                                                                <div className="name">{editor.name}</div>
                                                                                                                {editor.status === "Credentials Sent" && (
                                                                                                                    <span
                                                                                                                        style={{
                                                                                                                            fontSize: '12px',
                                                                                                                            marginLeft: '8px',
                                                                                                                            padding: '2px 5px',
                                                                                                                            background: 'yellow',
                                                                                                                            borderRadius: '5px',
                                                                                                                        }}>
                                                                                                                        {t("creds_sent")}
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
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        {/* condition to prevent the [LSP] to reassign the task to another [LSP] - simpliy don't show the agency editors */}
                                                        {!isProjectAssigned && <div className="internal-users">
                                                            <div className="header">
                                                                <p>{t("agencies")}</p>
                                                                {(editorList?.agencies?.length > 2 && !isEditorListLoading) && (
                                                                    <span className="link" onClick={() => handleViewAllBtn('agencies')}>
                                                                        {viewAllEditor.agencies ? t("view_less") : t("view_all")}
                                                                    </span>
                                                                )}
                                                                {/* <a className="link" href="#">Find more editors</a> */}
                                                            </div>
                                                            <div className="list-body">
                                                                {
                                                                    editorList?.agencies?.length !== 0 ? (
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
                                                                                                editorList?.agencies?.slice(0, viewAllEditor.agencies ? editorList?.agencies?.length : 2)?.map((editor) => {
                                                                                                    return (
                                                                                                        <div key={editor.id} style={editor.status === "Invite Sent" ? { opacity: 0.5, pointerEvents: 'none' } : {}} className={selectedEditor.id == editor.id ? "suggest-member-item-active" : "suggest-member-item"} onClick={() => handleValueLoad(editor, 'agency')}>
                                                                                                            <div className="suggestion-icon-wrap">
                                                                                                                {
                                                                                                                    (editor.avatar === null || editor.avatar === "") ?
                                                                                                                        <div className="no-avatar">{editor.name.charAt(0).toUpperCase()}</div>
                                                                                                                        :
                                                                                                                        <img src={`${Config.BASE_URL}${editor.avatar}`} alt="profile-pic" />
                                                                                                                }
                                                                                                                <div className="name">{editor.name}</div>
                                                                                                                {editor.status === "Invite Sent" && (
                                                                                                                    <span className="creds-sent-ui-chip">
                                                                                                                        {t("invite_sent")}
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
                                                                    )
                                                                }
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {selectedEditor?.id !== undefined ?
                                (
                                    <div className="file-list-assign-manage-body lsp-wrapper">
                                        <div className={"file-list-assign-manage-form-wrapper " + ((showBiddedRate || showAcceptedRate) && "overflow-hide")}>
                                            <div className="assign-to-wrap date-time-wrap">
                                                <div className="icon-label-wrap">
                                                    <Event style="label-icon" />
                                                    <span className="title">{t("due_date")} <span class="asterik-symbol">*</span></span>
                                                </div>
                                                <div className="options-selected-area">
                                                    <DatePicker
                                                        className="assign-datepicker"
                                                        assignManage={true}
                                                        projectDeadline={Config.convertUTCToLocal(projectDataRef.current?.deadline)}
                                                        value={deadline}
                                                        onChange={handleDateChange}
                                                    />
                                                    <CustomTimePicker value={deadline} setValue={setDeadline} assigntimepicker="assign-time-picker" />
                                                </div>
                                            </div>
                                            {!isInternalEditorSelected && <div className="assign-to-wrap accepted-rate">
                                                <div className="icon-label-wrap">
                                                    <AccountIcon style="label-icon" />
                                                    <span className="title">{t("rate")} <span class="asterik-symbol">*</span></span>
                                                    <div className="icon-label-wrap d-flex justify-content-center">
                                                        {(assignStep === (editorsAcceptedRates?.length ? editorsAcceptedRates[0]?.[selectedJobIds[0]?.job_id]?.step : null) && selectedJobIds?.length === 1) && (
                                                            <span className="accepted-rate-box-title" onClick={() => {
                                                                handleOpenAcceptedRateBox();
                                                                setShowBiddedRate(false)
                                                            }}>{t("accepted_rate")}
                                                                <ChevronRightIcon
                                                                    style={{
                                                                        width: '17px'
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
                                                                                        {console.log(unitTypeOptionRef.current)}
                                                                                        <span className="content">{unitTypeOptionRef.current?.find((element) => element.value === editorsAcceptedRates[0]?.[selectedJobIds[0]?.job_id]?.mtpe_count_unit)?.label}</span>

                                                                                    </div>
                                                                                    <div className="accepted-rate-box-rates-units">
                                                                                        <span className="header">{t("unit_rate")}:</span>
                                                                                        <span className="content">
                                                                                            {currencyOption?.find(each => each.value === editorsAcceptedRates[0]?.[selectedJobIds[0]?.job_id]?.currency)?.label} &nbsp;
                                                                                            {editorsAcceptedRates[0]?.[selectedJobIds[0]?.job_id]?.mtpe_rate}
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
                                                        {(assignStep === editorsBiddedRate?.step && selectedJobIds?.length === 1) &&
                                                            <span
                                                                className="bidded-rate-box-title"
                                                                onClick={() => {
                                                                    handleOpenBiddedRateBox();
                                                                    setShowAcceptedRate(false)
                                                                }
                                                                }>{t("bidded_rate")}
                                                                <ChevronRightIcon style={{
                                                                    width: '17px'
                                                                }}
                                                                />
                                                                {showBiddedRate && (
                                                                    <div ref={biddedRatesRef} className="accepted-rate-box">
                                                                        <div className="accepted-rate-box-secondary">
                                                                            <div className="accepted-rate-header-row">
                                                                                <span className="bidded-rate-box-innertitle">{t("bidded_rate")}</span>
                                                                                <span className="close-btn" onClick={(e) => { e.stopPropagation(); setShowBiddedRate(false) }}>
                                                                                    <CloseIcon className="header-close" />
                                                                                </span>
                                                                            </div>
                                                                            <div className="accepted-rate-box-inner-wrap">
                                                                                <div className="accepted-rate-box-rates-units">
                                                                                    <span className="header">{t("unit_type")}:</span>
                                                                                    <span className="content">{unitTypeOptionRef.current?.find((element) => element.value === editorsBiddedRate?.mtpe_count_unit)?.label}</span>

                                                                                </div>
                                                                                <div className="accepted-rate-box-rates-units">
                                                                                    <span className="header">{t("unit_rate")}:</span>
                                                                                    <span className="content">
                                                                                        {currencyOption?.find(each => each.value === editorsBiddedRate?.currency)?.label} &nbsp;
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
                                                        {
                                                            selectedJobIds?.length > 1 ? (
                                                                <div className="selection-row set-rates-wrapper">
                                                                    <p onClick={() => setShowConfirmRates(true)} className="confirm-rates-link">{t("set_rates")}</p>
                                                                    {selectedJobIds?.length - completedJobRateCount >= 1 && (
                                                                        <span className="set-rate-note">
                                                                            <ErrorIcon className="error-icon" />
                                                                            {selectedJobIds?.length - completedJobRateCount} {t("rates_missing")}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="assign-rate-options-wrap">
                                                                        <div className="selection-row">
                                                                            <Select
                                                                                isSearchable={true}
                                                                                maxMenuHeight={200}
                                                                                options={currencyOption}
                                                                                classNamePrefix="instant-currency-select"
                                                                                value={currencySelect}
                                                                                onChange={(selectedOption) => {
                                                                                    setCurrencySelect(selectedOption);
                                                                                }}
                                                                                placeholder={<span className="placeholder">{t("currency")}</span>}
                                                                                styles={customRatesSelectStyles}
                                                                                menuPlacement="auto"
                                                                                components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                            />
                                                                        </div>
                                                                        <div className="selection-row">
                                                                            <Select
                                                                                isSearchable={false}
                                                                                options={unitTypeOptionRef.current}
                                                                                classNamePrefix="instant-unit-select"
                                                                                value={unitTypeSelect}
                                                                                onChange={(selectedOption) => {
                                                                                    setUnitTypeSelect(selectedOption);
                                                                                }}
                                                                                styles={customUnitTypeSelectStyles}
                                                                                placeholder={<span className="placeholder">{t("unit_type")}</span>}
                                                                                menuPlacement="auto"
                                                                                // isDisabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
                                                                                components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {(unitTypeSelect?.value !== undefined && unitTypeSelect?.value !== 3 && unitTypeSelect?.value !== 4) &&
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
                                                                                    components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    <div className="selection-row forms">
                                                                        <div className="ai-text-form-item-wrapper unit-rate rate-wrap">
                                                                            <label htmlFor="rate">{t("rate")}</label>
                                                                            <input
                                                                                type="number"
                                                                                className="text-translate-rate-input"
                                                                                placeholder="0.00"
                                                                                id="rate"
                                                                                min={0}
                                                                                value={unitRate}
                                                                                onChange={(e) => setUnitRate(e.target.value)}
                                                                            // disabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
                                                                            />
                                                                        </div>
                                                                        {unitTypeSelect?.value === 3 &&
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
                                                                                // disabled={isTaskAssigned || isInternalEditor}
                                                                                // it take only integer number (non-decimal hours)
                                                                                />
                                                                                <span>{estimatedHours ? t("hrs") : ''}</span>
                                                                            </div>
                                                                            // </div>
                                                                        }
                                                                    </div>

                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>}
                                            <div className="assign-to-wrap gap-1">
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
                                                    <label htmlFor="assign-attachment" className="add-attachment-btn-collapse">{isTaskAssigned ? t("attachments") : t("add_attachment")} <small>({t("optional_sm")})</small><span>{t("upload_file")}</span></label>
                                                    <input type="file" ref={fileBrowserInputRef} id="assign-attachment" onChange={handleAdditionalFilesChange} multiple hidden />
                                                </div>
                                                <div className="uploaded-file-wrapper">
                                                    {/* {((instructionLocalFiles.length > 2) || (isTaskAssigned && instructionApiFiles?.length > 2)) &&
																<div className={"left-arrow " + (scrollX == 0 && "disabled")} onClick={() => slide(-50)}>
																	<NavigateBeforeSharpIcon className="navigate-icon" />
																</div>
															} */}
                                                    <div
                                                        // ref={scrl} 
                                                        // onScroll={scrollCheck} 
                                                        // className={"file-list-arrow-wrapper " + (((instructionLocalFiles.length > 2) || (isTaskAssigned && instructionApiFiles?.length > 2)) && "add-border")}
                                                        className="file-list-arrow-wrapper"
                                                    >
                                                        {

                                                            Object.keys(instructionLocalFiles)?.map((eachKey) => {
                                                                return (
                                                                    <div className="audio-file-list-item" key={eachKey + instructionLocalFiles[eachKey].name}  >
                                                                        <div className="file-info-wrapper">
                                                                            <img
                                                                                src={
                                                                                    Config.BASE_URL + "/app/extension-image/" +
                                                                                    instructionLocalFiles[eachKey].name.split(".").pop()
                                                                                }
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
                                                                instructionApiFiles?.map((each, index) => {
                                                                    return (
                                                                        <div className="audio-file-list-item" key={index}>
                                                                            <div className="filename" style={{ width: '90%' }}>
                                                                                <img
                                                                                    src={
                                                                                        Config.BASE_URL + "app/extension-image/" +
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
                                                    {/* {((instructionLocalFiles.length > 2) || (isTaskAssigned && instructionApiFiles?.length > 2)) &&
																<div className={"right-arrow " + (scrolEnd && "disabled")} onClick={() => slide(+50)}>
																	<NavigateNextSharpIcon className="navigate-icon" />
																</div>
															} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className="file-list-assign-manage-body lsp-wrapper placeholder">
                                        <img src={NoEditorInfoIcon} alt="no-editor-info-icon" />
                                        <p className="note">{t("select_editor_further_continue")}</p>
                                    </div>
                                )
                            }
                        </div>

                        <div className="file-list-assign-manage-footer">
                            <div className="footer-btn-wrap justify-content-end">
                                {/* <div className="allow-sharing">
											<FormControlLabel control={<Checkbox size="small" />} label="Allow sharing" />
											<ErrorOutlineIcon className="icon" />
										</div> */}
                                <ButtonBase
                                    className="assign-btn"
                                    disabled={
                                        selectedJobIds?.length > 1 ? (
                                            (
                                                isInternalEditorSelected ?
                                                    (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null)
                                                    : (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null || (selectedJobIds?.length - completedJobRateCount) !== 0)
                                            ) ? true : false
                                        ) : (
                                            (
                                                isInternalEditorSelected ?
                                                    (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null)
                                                    : (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null || currencySelect?.value === undefined || unitTypeSelect?.value === undefined || unitRate === '' || parseFloat(unitRate) <= 0 || (unitTypeSelect?.value === 3 && (estimatedHours === '' || estimatedHours <= 0 || isNaN(estimatedHours) || estimatedHours == 0)))
                                            ) ?
                                                true : false
                                        )
                                    }
                                    style={
                                        selectedJobIds?.length > 1 ? (
                                            (
                                                isInternalEditorSelected ?
                                                    (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null)
                                                    : (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null || (selectedJobIds?.length - completedJobRateCount) !== 0)

                                            ) ? { opacity: 0.5 } : {}
                                        ) : (
                                            (
                                                isInternalEditorSelected ?
                                                    (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null)
                                                    : (checkedTaskIds?.length === 0 || selectedEditor?.id === undefined || deadline === null || currencySelect?.value === undefined || unitTypeSelect?.value === undefined || unitRate === '' || parseFloat(unitRate) <= 0 || (unitTypeSelect?.value === 3 && (estimatedHours === '' || estimatedHours <= 0 || isNaN(estimatedHours) || estimatedHours == 0)))
                                            ) ?
                                                { opacity: 0.5 } : {}
                                        )
                                    }
                                    onClick={() => !isAssigning && assignEditor()}
                                >
                                    <span>{isAssigning && <ButtonLoader />} {isAssigning ? t('assigning') : t('assign')}</span>
                                </ButtonBase>
                                {/* <ButtonBase className="assign-btn" onClick={() => setAssignManageSwitch("payment-method")}>
											<span>continue</span>
											<ArrowForwardIosIcon className="arrow" />
										</ButtonBase> */}
                            </div>
                        </div>
                        {/* </motion.div>
							: assignManageSwitch === "payment-method" &&
							<motion.div
								key={`${assignManageSwitch}`}
								animate={{ opacity: 1, x: 0 }}
								initial={{ opacity: 0, x: -30 }}
								exit={{ opacity: 0, x: 30 }}
								transition={{ duration: 0.25 }}
							>
								<div className="payment-method-wrapper">
									<div className="select-payment-method-wrap">
										<h2>Choose a payment method</h2>
										<div className="ailaysa-payment-wrapper">
											<div className="ailaysa-pay">
												<div className="payment-select-wrapper">
													<Radio
														checked={selectedPayment === 'ailaysa-pay'}
														size="small"
														id="ailaysa-pay"
														value={selectedPayment}
														onChange={() => handlePaymentChange("ailaysa-pay")}
													/>
													<label className="label" htmlFor="ailaysa-pay">Using Ailaysa Pay</label>
												</div>
												<Collapse isOpen={selectedPayment === 'ailaysa-pay'}>
													<div className={"payment-metho-wrap " + (selectedPaymentMethod === 1 ? "selected" : "")} onClick={() => handlePaymentTypeChange(1)}>
														<Radio
															checked={selectedPaymentMethod === 1}
															size="small"
															value={selectedPaymentMethod}
															onChange={() => handlePaymentTypeChange(1)}
														/>
														<p className="label">Full payment after project completed</p>
													</div>
													<div className={"payment-metho-wrap " + (selectedPaymentMethod === 2 ? "selected" : "")} onClick={() => handlePaymentTypeChange(2)}>
														<div className="milestone-main-wrapper">
															<div className="milestone-radio-btn">
																<Radio
																	checked={selectedPaymentMethod === 2}
																	size="small"
																	// value={selectedValue}
																	onChange={() => handlePaymentTypeChange(2)}
																/>
															</div>
															<div className="milestone-text-area">
																<p className="label">Milestone</p>
																<div className="milestone-list">
																	<p className="title">Milestone 1</p>
																	<div className="form-wrapper">
																		<label htmlFor="USD">USD</label>
																		<input className="currency-form" id="USD" placeholder="0.00" />
																	</div>
																</div>
																<div className="add-more-milestone">
																	<AddIcon className="icon" />
																	<p>Add Milestone</p>
																</div>
															</div>
														</div>
													</div>
												</Collapse>
											</div>
											<div className="outside-ailaysa-pay">
												<div className="payment-select-wrapper">
													<Radio
														checked={selectedPayment === 'outside-ailaysa'}
														size="small"
														id="outside-ailaysa"
														value={selectedPayment}
														onChange={() => handlePaymentChange("outside-ailaysa")}
													/>
													<label htmlFor="outside-ailaysa" className="label">Pay outside Ailaysa</label>
												</div>
											</div>
										</div>
									</div>
									<div className="paymenting-main-wrapper">
										<div className="paying-box-wrapper">
											<h3 className="title">You need to pay</h3>
											<div className="overall-calculation">
												<p className="total">Total</p>
												<p className="paying-number">USD <span>7000.00</span></p>
											</div>
										</div>
										<div className="footer-btn-wrap payment-method">
											<ButtonBase className="assign-btn">
												<span>Assign</span>
											</ButtonBase>
										</div>
									</div>
								</div>

							</motion.div> */}
                        {/* } */}
                        {/* </AnimatePresence> */}
                    </div>
                    {/* <Rodal className="project-list-confirm-rates" visible={false} showCloseButton={false}>
				<div className="file-list-assign-main-wrapper">
					<div className="file-list-assign-manage-header">
						<h1 className="title">Set rates</h1>
						<span className="close-btn" onClick={() => setShowConfirmRates(false)}>
							<CloseIcon className="header-close" />
						</span>
					</div>
					<div className="file-list-assign-manage-body confirm-rates-wrapper">
						<div className="confirm-rates-inner-wrapper">
							<div className="select-currency-wrap">
								<p className="inner-title">Select Currency</p>
								<Select
									isSearchable={true}
									options={currencyOption}
									classNamePrefix="instant-currency-select"
									value={
										currencyOption.find(each => each.value == selectedJobIds[0]?.rates.currency) ?
											currencyOption.find(each => each.value == selectedJobIds[0]?.rates.currency) : null
									}
									onChange={(selectedOption) => {
										handleCurrencyChange(selectedOption);
									}}
									placeholder=""
									styles={customRatesSelectStyles}


									// isDisabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
									menuPlacement="auto"
									menuPortalTarget={document.body}
									components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
								/>
							</div>
							<div className="rates-table-wrapper">
								{
									selectedJobIds?.map((item, index) => {
										let [srcLang, tarLang] = item.lang_pair?.split('->')
										return (
											<div key={item.job_id} className={"rates-row-wrap-item " + (item.rates.mtpe_count_unit === 3 ? "hours" : "")}>
												<div className="rates-row-item">
													<div className="rates-lang-pair">
														<span>{srcLang}</span>
														<RightArrowIcon />
														<span>{tarLang}</span>
													</div>
												</div>
												<div className="rates-row-item">
													<div className="unit-type-wrap">
														<Select
															isSearchable={false}
															options={unitTypeOption}
															classNamePrefix="instant-unit-select"
															styles={customRatesSelectStyles}
															placeholder={<span className="placeholder">Unit type</span>}
															value={
																unitTypeOption.find(each => each.value === item.rates.mtpe_count_unit) ?
																	unitTypeOption.find(each => each.value === item.rates.mtpe_count_unit) : null
															}
															onChange={(selectedOption) => {
																handleRatesChange({ target: { name: 'mtpe_count_unit' } }, item.job_id, selectedOption);
															}}
															menuPlacement="auto"
															menuPortalTarget={document.body}
															components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
														// isDisabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
														/>
													</div>
												</div>
												<div className="rates-row-item">
													<div className="ai-text-form-item-wrapper unit-rate rate-wrap">
														<label htmlFor="rate">Rate</label>
														<input
															type="number"
															className="text-translate-rate-input"
															placeholder="0.00"
															id="rate"
															min={0}
															name="mtpe_rate"
															value={item.rates.mtpe_rate}
															onChange={(e) => {
																handleRatesChange(e, item.job_id);
															}}
														/>
													</div>
													{item?.rates.mtpe_count_unit === 3 &&
														<div className="ai-text-form-item-wrapper unit-rate hours-wrap">
															<label htmlFor="rate">Estimated hours</label>
															<input
																type="number"
																className="text-translate-rate-input"
																placeholder="hrs"
																id="rate"
																min={0}
																value={item.rates.estimated_hours}
																name="estimated_hours"
																onChange={(e) => {
																	handleRatesChange(e, item.job_id);
																}}
															/>
															{/* <span>{estimatedHours ? 'hrs' : ''}</span>
														</div>
													}
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						<div className="footer-btn-wrap custom-rates">
							<ButtonBase className="assign-clear-btn" onClick={handleClearAllRates}>
								<span>Clear all</span>
							</ButtonBase>
							<ButtonBase className="assign-btn" onClick={() => setShowConfirmRates(false)}>
								<span>Confirm</span>
							</ButtonBase>
						</div>
					</div>
				</div>
			</Rodal> */}

                    {/* New rates modal */}
                    {showConfirmRates && (
                        <Rodal className="project-list-confirm-rates" visible={showConfirmRates} showCloseButton={false}>
                            <div className="file-list-assign-main-wrapper">
                                <div className="file-list-assign-manage-header">
                                    <h1 className="title">{t("confirm_rates")}</h1>
                                    <span className="close-btn" onClick={() => setShowConfirmRates(false)}>
                                        <CloseIcon className="header-close" />
                                    </span>
                                </div>
                                <div className=" confirm-rates-wrapper">
                                    <div className="confirm-rates-inner-wrapper">
                                        <div className="select-currency-wrap">
                                            <p className="inner-title">{t("select_currency")}</p>
                                            <Select
                                                isSearchable={true}
                                                options={currencyOption}
                                                classNamePrefix="instant-currency-select"
                                                value={
                                                    currencyOption.find(each => each.value == selectedJobIds?.find(each => each.rates?.currency !== null)?.rates.currency) ?
                                                        currencyOption.find(each => each.value == selectedJobIds?.find(each => each.rates?.currency !== null)?.rates.currency) : null
                                                }
                                                onChange={(selectedOption) => {
                                                    handleCurrencyChange(selectedOption);
                                                }}
                                                placeholder=""
                                                styles={customRatesNewSelectStyles}


                                                // isDisabled={isTaskAssigned || isInternalEditor || isEditorAilaysa}
                                                menuPlacement="auto"
                                                // menuPortalTarget={document.body}
                                                components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                            />
                                        </div>
                                        <p className="lang-pair-title">{t("lang_pair")}</p>
                                        <div className="rates-main-wrapper">
                                            <div className={`rates-table-wrapper ${!ratesTableHasScrollbar ? 'no-scroll-right-space' : 'scroll-right-space scroll-bottom-shadow'}`}>
                                                <div ref={ratesTableWrapRef} className="rates-table-main-wrapper">
                                                    <div className="rates-table-inner-wrapper">
                                                        {selectedJobIds?.length !== 0 && (
                                                            selectedJobIds?.map((item) => {
                                                                let [srcLang, tarLang] = item.lang_pair?.split('->')
                                                                let { currency, mtpe_rate, mtpe_count_unit, estimated_hours } = item?.rates
                                                                return (
                                                                    <div key={item.job_id} className={"rates-table-lang-item " + (selectedJobPairRate === item?.job_id ? 'active' : "")} onClick={() => openParticularJobRateSection(item?.job_id)}>
                                                                        <div className="lang-inner-wrapper">
                                                                            <div className="lang-pair">
                                                                                <span>{srcLang}</span>
                                                                                <RightArrowIcon />
                                                                                <span>{tarLang}</span>
                                                                            </div>
                                                                            {
                                                                                // ((currency === null || mtpe_rate === '' || mtpe_count_unit === null) || (mtpe_count_unit === 3 && (estimated_hours === undefined || estimated_hours === null || estimated_hours === ''))) ? (
                                                                                ((currency !== null && mtpe_rate !== '' && parseFloat(mtpe_rate) > 0 && mtpe_count_unit !== null) && (mtpe_count_unit !== 3 || (estimated_hours !== undefined && estimated_hours !== null && estimated_hours !== '' && parseInt(estimated_hours) > 0))) && (
                                                                                    <img className="rate-confirm-tick-img" src={CheckCircleSuccess} alt="blue tick" />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rates-panel">
                                                {
                                                    selectedJobIds?.map(item => {
                                                        if (selectedJobPairRate === item?.job_id) {
                                                            let bidInfo = item?.bid_info ? item?.bid_info[0]?.bid_details?.find(each => each.vendor_id === selectedEditor.id && each.bid_step === assignStep) : null
                                                            let acceptedRate = editorsAcceptedRates?.find(each => each[`${item?.job_id}`])[`${item?.job_id}`]
                                                            return (
                                                                <div className="rates-panel-inner-wrap">
                                                                    <div className="accepted-bidded-rate-wrapper">
                                                                        {(assignStep === acceptedRate?.step) && (
                                                                            <div className="accepted-rate-box-title" onClick={() => {
                                                                                handleOpenAcceptedRateBox();
                                                                                setShowBiddedRate(false)
                                                                            }}>
                                                                                {t("accepted_rate")}
                                                                                <ChevronRightIcon
                                                                                    style={{
                                                                                        width: '17px',
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
                                                                                                        <span className="content">{unitTypeOptionRef.current.find((element) => element.value === acceptedRate?.mtpe_count_unit)?.label}</span>

                                                                                                    </div>
                                                                                                    <div className="accepted-rate-box-rates-units">
                                                                                                        <span className="header">{t("unit_rate")}:</span>
                                                                                                        <span className="content">
                                                                                                            {currencyOption?.find(each => each.value === acceptedRate?.currency)?.label} &nbsp;
                                                                                                            {acceptedRate?.mtpe_rate}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accepted-rate-box-use-button-container" >
                                                                                                <button className="accepted-rate-box-use-button" onClick={(e) => {
                                                                                                    e.stopPropagation()
                                                                                                    handleUseAcceptInMutipleJobs(item?.job_id, acceptedRate?.currency, acceptedRate?.mtpe_count_unit, acceptedRate?.mtpe_rate)
                                                                                                }}>{t("use")}</button>

                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            </div>
                                                                        )}
                                                                        {bidInfo &&
                                                                            <div
                                                                                className="bidded-rate-box-title"
                                                                                onClick={() => {
                                                                                    handleOpenBiddedRateBox();
                                                                                    setShowAcceptedRate(false)
                                                                                }
                                                                                }>{t("bidded_rate")}
                                                                                <ChevronRightIcon style={{
                                                                                    width: '17px'
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
                                                                                                    <span className="content">{unitTypeOptionRef.current.find((element) => element.value === bidInfo?.mtpe_count_unit)?.label}</span>

                                                                                                </div>
                                                                                                <div className="accepted-rate-box-rates-units">
                                                                                                    <span className="header">{t("unit_rate")}:</span>
                                                                                                    <span className="content">
                                                                                                        {currencyOption?.find(each => each.value === bidInfo?.currency)?.label} &nbsp;
                                                                                                        {bidInfo?.mtpe_count_unit !== 3 ? bidInfo?.mtpe_rate : bidInfo?.mtpe_hourly_rate}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="accepted-rate-box-use-button-container" >
                                                                                            <button className="accepted-rate-box-use-button" onClick={(e) => {
                                                                                                e.stopPropagation()
                                                                                                handleUseBiddedRateInMutipleJobs(item?.job_id, bidInfo?.currency, bidInfo?.mtpe_count_unit, bidInfo?.mtpe_count_unit !== 3 ? bidInfo?.mtpe_rate : bidInfo?.mtpe_hourly_rate)
                                                                                            }}>{t("use")}</button>

                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    <div className="rates-row-item">
                                                                        <div className="unit-type-wrap">
                                                                            <Select
                                                                                isSearchable={false}
                                                                                options={unitTypeOptionRef.current}
                                                                                classNamePrefix="instant-unit-select"
                                                                                styles={customUnitTypeSelectStyles}
                                                                                placeholder={<span className="placeholder">{t("unit_type")}</span>}
                                                                                value={
                                                                                    unitTypeOptionRef.current.find(each => each.value === item.rates.mtpe_count_unit) ?
                                                                                        unitTypeOptionRef.current.find(each => each.value === item.rates.mtpe_count_unit) : null
                                                                                }
                                                                                onChange={(selectedOption) => {
                                                                                    handleRatesChange({ target: { name: 'mtpe_count_unit' } }, item.job_id, selectedOption);
                                                                                }}
                                                                                menuPlacement="auto"
                                                                                // menuPortalTarget={document.body}
                                                                                components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {(item?.rates.mtpe_count_unit !== null && item?.rates.mtpe_count_unit !== 3 && item?.rates.mtpe_count_unit !== 4) &&
                                                                        <div className="assign-rate-options-wrap">
                                                                            <div className="selection-row">
                                                                                <Select
                                                                                    isSearchable={false}
                                                                                    options={countTypeOptions}
                                                                                    classNamePrefix="instant-unit-select"
                                                                                    value={countTypeOptions?.find(each => each.value === item.rates?.account_raw_count)}
                                                                                    onChange={(selectedOption) => {
                                                                                        handleRatesChange({ target: { name: 'account_raw_count' } }, item.job_id, null, selectedOption);
                                                                                    }}
                                                                                    styles={customRatesWidthSelectStyles}
                                                                                    menuPlacement="auto"
                                                                                    components={{ DropdownIndicator: DropdownIndicatorSelect, IndicatorSeparator: () => null }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    <div className="rates-row-item">
                                                                        <div className="ai-text-form-item-wrapper unit-rate rate-wrap">
                                                                            <label htmlFor="rate">{t("rate")}</label>
                                                                            <input
                                                                                type="number"
                                                                                className="text-translate-rate-input"
                                                                                placeholder="0.00"
                                                                                id="rate"
                                                                                min={0}
                                                                                name="mtpe_rate"
                                                                                value={item.rates.mtpe_rate}
                                                                                onChange={(e) => {
                                                                                    handleRatesChange(e, item.job_id);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        {item?.rates.mtpe_count_unit === 3 &&
                                                                            <div className="ai-text-form-item-wrapper unit-rate hours-wrap">
                                                                                <label htmlFor="rate">{t("estimated_hours")}</label>
                                                                                <input
                                                                                    type="number"
                                                                                    className="text-translate-rate-input"
                                                                                    name="estimated_hours"
                                                                                    placeholder="hrs"
                                                                                    id="rate"
                                                                                    min={0}
                                                                                    value={item.rates.estimated_hours}
                                                                                    onChange={(e) => {
                                                                                        handleRatesChange(e, item.job_id);
                                                                                    }}
                                                                                />
                                                                                <span>{estimatedHours ? t("hrs") : ''}</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-btn-wrap custom-rates">
                                        <div className="job-lang-pair-info">
                                            <img className="completed-icon" src={CheckCircleSuccess} alt="blue tick" />
                                            <span className="job-lang-completed-info">{completedJobRateCount}/{selectedJobIds?.length} {t("rates_entered")}</span>
                                        </div>
                                        <div className="footer-btn-row">
                                            <ButtonBase className="assign-clear-btn" onClick={handleClearAllRates}>
                                                <span>{t('clear_all')}</span>
                                            </ButtonBase>
                                            <ButtonBase className="assign-btn" onClick={() => setShowConfirmRates(false)}>
                                                <span>{t("confirm")}</span>
                                            </ButtonBase>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Rodal>
                    )
                    }

                    {/* Editor assigned to anyone of the selected task modal */}
                    {showEditorAlreadyAssignedModal && (<Rodal
                        className="already-assigned-modal"
                        visible={showEditorAlreadyAssignedModal}
                        {...modaloption}
                        closeOnEsc={true}
                        showCloseButton={false}
                        onClose={() => console.log()}
                    >
                        <span className="prompt-close-btn" onClick={() => setShowEditorAlreadyAssignedModal(false)}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                        <div className="alert-content-wrap">
                            <img src={ErrorBlackWarn} alt="error-icon" />
                            <div>
                                <h5 className="title-txt">
                                    {
                                        assignedEditorAlertString === "an editor" ?
                                            t('editer_assign_note')
                                            : assignedEditorAlertString === "a reviewer" ?
                                                t('reviewer_assign_note')
                                                : null
                                    }

                                </h5>
                            </div>
                        </div>
                    </Rodal>)}
                </Rodal>)}

            {showAssignmentInfoModal && (
                <AssignmentReferenceInfo
                    showAssignmentInfoModal={showAssignmentInfoModal}
                    setShowAssignmentInfoModal={setShowAssignmentInfoModal}
                    allTaskListRef={allTaskListRef}
                    convertTaskListToJobThenFileStructure={convertTaskListToJobThenFileStructure}
                />
            )}

        </>
    )
}

export default LSPAssignManage