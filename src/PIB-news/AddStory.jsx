import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Rodal from 'rodal';
import Tooltip from '@mui/material/Tooltip';
import Sourcelanguage from "../vendor/lang-modal/Sourcelanguage";
import Targetlanguage from "../vendor/lang-modal/Targetlanguage";
import { useTranslation } from 'react-i18next';
import CloseBack from "../assets/images/new-ui-icons/close_black.svg";  
import Config from '../vendor/Config';
import Select, { components } from 'react-select';
import { ArrowDropDown } from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonLoader } from '../loader/CommonBtnLoader';
import { useSelector } from 'react-redux';
import DragAndDrop from '../vendor/DragandDrop';
import UploadFolder from "./../assets/images/new-ui-icons/upload-folder.svg";
import CloseBlack from "./../assets/images/new-ui-icons/close_black.svg";

const HEADING_MAX_LENGTH = 500;
const SUBHEADING_MAX_LENGTH = 1000;
const SUMMERY_MAX_LENGTH = 20000;

const AddStory = (props) => {
    const {languageOptions, ministryDepartmentOptions, activeProjTab } = props;
    const { t } = useTranslation();
    const location = useLocation();
    const history = useNavigate();

    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);   
    const [sourceLabel, setSourceLabel] = useState("");    
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState(""); 
    const [sourceTargetValidation, setSourceTargetValidation] = useState({ source: false, target: false,});
    const [filteredResults, setFilteredResults] = useState([]);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(languageOptions);
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("");
    const [editJobs, setEditJobs] = useState([]);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [errors, setErrors] = React.useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [subTitleItem, setSubTitleItem] = useState([0]);
    const [subTitleList, setSubTitleList] = useState(['']);
    const isIncompleteEditorSettings = useSelector((state) => state.editorSettingStatus.value);
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    const inputFileUploadRef = useRef(null);
    const searchAreaRef = useRef(null);
    const sourceLangRef = useRef(null);

    const ministryDepartmentSelectOptions = ministryDepartmentOptions?.map((dept) => ({
        value: dept.uid,
        label: dept.name
    }));

    useEffect(() => {
        const tempDepartment = ministryDepartmentSelectOptions.find(
            opt => opt.value === formData.ministry_department
        );
        setSelectedDepartment(tempDepartment);
    }, []);

    useEffect(() => {
        if (activeProjTab) {
            clearFormData();
        }
    }, [activeProjTab]);

    const [formData, setFormData] = React.useState({
        source_language: "",
        target_language: "",               
        ministry_department: "",
        dateline: "",
        headline: "",
        body: "",
        preTranslate: true
    });
    const hideSettingsModal = () => setshowSettings(false);

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideSettingsModal,
    };

    useEffect(() => {
        removeSelectedSourceFromTarget();
    }, [sourceLanguage]);

    /**
     * This method used to set the soruce language on click of language in modal
     * @param {*} value 
     * @param {*} name 
     * @param {*} e 
     * 
     * @auhtor Padmabharathi Subiramanian
     * @since 26 Nov 2025
     */
    const handleSourceLangClick = (value, name, e) => {
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setSourceTargetValidation({
            ...sourceTargetValidation,
            source: false,
        });
        setSearchInput('');
        setOnFocusWrap(false);
        setFormData({
            ...formData,
            source_language: value,
        });
        updateError('source');
    };

    const removeSelectedSourceFromTarget = () => {
        setTargetLanguageOptions(languageOptions?.filter((element) => element.id != sourceLanguage));
    };
    
    /**
     * This method used to set the target language on click of language in modal
     * @param {*} value 
     * @param {*} e
     * 
     * @author Padmabharathi Subiramanian
     * @since 26 Nov 2025 
     */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected");
            targetLanguageTemp = Config.removeItemFromArray(targetLanguageTemp, value);
            if (editProjectId != null) {
                let thisJob = editJobs.find(element => element.target_language == value?.id);
                if (thisJob?.id != null) deletedJobIds.current.push(thisJob?.id);
            }
        } else {
            e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected");
            targetLanguageTemp = [value];
        }
        setTargetLanguage([...new Set(targetLanguageTemp)]);
        setSourceTargetValidation({
            ...sourceTargetValidation,
            target: false,
        });
        setshowTarLangModal(false);
        setSearchInput('');
        setOnFocusWrap(false);
        setFormData({
            ...formData,
            target_language: value.id,
        });
        updateError('target');
    };
    
    /**
     * This mehtod used to update the error state
     * @param {*} field 
     * 
     * @author Padmabharathi Subiramanian
     * @since 26 Nov 2025
     */
    const updateError = (field) => {
        setErrors(prev => ({
            ...prev,
            [field]: null
        }));
    }

    /**
     * This mehtod used to update the form data state on change of input fields
     * @param {*} e 
     * 
     * @author Padmabharathi Subiramanian
     * @since 26 Nov 2025
     */
    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name == 'body' && value.length > SUMMERY_MAX_LENGTH) value = value.slice(0, SUMMERY_MAX_LENGTH);
        updateError(name);
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubTitleChange = (e, index) => {
        let { value } = e.target;
        if (value.length > SUBHEADING_MAX_LENGTH) value = value.slice(0, SUBHEADING_MAX_LENGTH);
        setSubTitleList(prev =>
            prev.map((item, idx) => (idx === index ? value : item))
        );
    };

    const addSubTitle = () => {
        setSubTitleItem(prev => ([...prev, prev.length]));
        setSubTitleList(prev => ([...prev, '']));
    }

    const removeSubTitle = (removeIndex) => {
        setSubTitleItem(prev => prev.filter((_, idx) => idx !== removeIndex));
        setSubTitleList(prev => prev.filter((_, idx) => idx !== removeIndex));
    };

    /**
     * This method used to clear the form data after successful submission
     * 
     * @author Padmabharathi Subiramanian
     * @since 26 Nov 2025
     */
    const clearFormData = () => {
        setSourceLabel('');
        setSourceLanguage('');
        setTargetLanguage('');
        setSelectedDepartment(null);
        setSubTitleItem([0]);
        setSubTitleList(['']);
        setFiles([]);
        setUploadedFiles([]);
        setFormData({
            source_language: "",
            target_language: "",               
            ministry_department: "",
            dateline: "",
            headline: "",
            body: "",
            preTranslate: false
        });
    }

    /**
     * This mehtod used to validate the form data before submission
     * @returns 
     * 
     * @author Padmabharathi Subiramanian
     * @since 26 Nov 2025 
     */
    const validate = () => {
        let newErrors = {};       
        if (!formData.source_language) newErrors.source = "Source language is required";
        if (!formData.target_language) newErrors.target = "Target language is required";
        
        if (activeProjTab.id === 1) {
            if (!formData.headline) newErrors.headline = "Headline is required";
            if (!formData.body) newErrors.body = "Story body is required";
            // validateSubTitle(newErrors);
        }
        if (activeProjTab.id === 2 && (!files || files.length <= 0)) {
            newErrors.file = "File is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const allFalse = (obj) => Object.values(obj).every(v => v === false);
    const anyTrue = (obj) => Object.values(obj).some(v => v === true);

    const validateSubTitle = (newErrors) => {
        const subTitleErrorList = {}
        subTitleList.forEach((subTitle, index) => {
            if (!subTitle || subTitle.length < 0) subTitleErrorList[index] = true;
            else subTitleErrorList[index] = false;
        });
        if (anyTrue(subTitleErrorList)) {
            newErrors.subTitleList = subTitleErrorList;
        }
    }

    const prepareSubTitleData = () => {
        if (subTitleList && subTitleList.length > 0) {
            const subTitleData = [];
            let index = 0;
            subTitleList.forEach(subTitle => {
                if (subTitle && subTitle.length > 0){
                    const data = {};
                    data[index++] = subTitle;
                    subTitleData.push(data);
                }
            });
            return subTitleData;
        }
        return null;
    }

    /**
     * This method used to submit the story from data.
     * @returns 
     * 
     * @author Padmabharathi Subiramanian
     * @since 25 Nov 2025
     */
    const handleSubmit = () => {
        if (!validate()) return;

        const payload = new FormData();
        payload.append("story_creation_type", activeProjTab.code);
        payload.append("source_language", formData.source_language);
        payload.append("target_languages", formData.target_language);
        payload.append("dateline", formData.dateline);
        payload.append("ministry_department", formData.ministry_department);        

        if (activeProjTab.id === 1) {
            payload.append("headline", formData.headline);
            payload.append("body", formData.body);
            const subTitleData = prepareSubTitleData();
            if (subTitleData) payload.append("sub_headlines", JSON.stringify(subTitleData));
        } else if (activeProjTab.id === 2) {
            payload.append("pre_translate", formData.preTranslate ? formData.preTranslate : false);
            if (files && files.length > 0) payload.append("files", files[0]);
        }
        if (payload) sumbit(payload);
    };

    /**
     * This method used to make api call to submit the story data
     * @param {*} payload 
     * 
     * @author Padmabharathi Subiramanian
     * @since 25 Nov 2025
     */
    const sumbit = (payload) => {
        setIsLoading(true);
        let params = {
            url: Config.BASE_URL + "/workspace/stories_pib/",
            auth: true,
            data: payload,
            method: "POST",
            success: (response) => {
                setIsLoading(false);
                Config.toast("Story added successfully", 'success');
                clearFormData();
                if (props.onStoryAdded) props.onStoryAdded(response.data);
                // handleViewStoryClick(response?.data);
                redirectToMyStory();
            },
            error: (err) => {
                setIsLoading(false);
                console.error(err);
            }
        };
        Config.axios(params);
    };

    /**
     * This method used to customize the dropdown indicator of react select
     * @param {*} props 
     * @returns 
     * 
     * @author Padmabharathi Subiramanian
     * @since 25 Nov 2025
     */
    const DropdownIndicator = props => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <ArrowDropDown className="arrow-icon-color" />
                </components.DropdownIndicator>
            )
        );
    };

    /**
     * This method used to customize the styles of react select for project type selection
     * 
     * @author Padmabharathi Subiramanian
     * @since 25 Nov 2025
     */
    const customProjectTypeSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px 0px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            zIndex: 1080
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            display: "flex",
            marginBottom: "0.2rem",
            padding: "4px 6px",
            color: "#292929",
            fontFamily: "Roboto",
            fontSize: "13px",
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
            border: state.isFocused ? "1px solid #0074D3" : "1px solid #D3D8DC",
            outline: state.isFocused ? "1px solid #0074D3" : "none",
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            transtion: 0.3,
            color: "#222222",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px",
            // width: 150,
            height: state.isFocused ? 42 : 42,
            "&:hover": {
                cursor: "pointer",
            },
        }),
        menuList: (base) => ({
            ...base,
            // height: "100px",
            "::-webkit-scrollbar": {
                width: "8px"
            },
            "::-webkit-scrollbar-track": {
                background: "transparent"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#DADDE0",
                border: "8px solid #DADDE0 !important",
                borderRadius: "50px",
            },
        }),
    };

    /**
     * This mehtod used to handle the department change in select dropdown
     * @param {*} selected 
     * 
     * @author Padmabharathi Subiramanian
     * @since 26 Nov 2025
     */
    const handleDepartmentChange = (selectedDept) => {
        setSelectedDepartment(selectedDept);
        setFormData(prev => ({
            ...prev,
            ministry_department: selectedDept?.value || ""
        }));
    };

    /**
     * This mehtod used to redirect to mystories page once the story was created.
     * 
     * @author Padmabharathi Subiramanian 
     * @since 26 Nov 2025
     */
    const redirectToMyStory = () => {
        setTimeout(() => {
            history(`/my-stories${location.search ? location.search : ''}`);
        }, 500);
    }

    const handleViewStoryClick = (selectedProjectFile, type) => {
        if (!selectedProjectFile) return;
        const open_as = 'editor';
        setTimeout(() => {
            history(`/pibnews-workspace/${selectedProjectFile.id}`, {state: {
                prevPath: location.pathname + location.search,
                open_as
            }});
        });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const name = file.name;
        const lastDot = name.lastIndexOf(".");
        const ext = "." + name.substring(lastDot + 1);

        if(![".txt", ".docx"].includes(ext)) {
            Config.toast(t("file_not_support_message"), 'warning');
            return false;
        }
        if (checkFileSize(file)) {
            setFiles([file]);
            uploadFile(file);
        } else {
            e.target.value = "";
        }
    };

    const handleDrop = (filesTemp, request = null) => {
        const file = filesTemp[0];
        if (checkFileSize(file)) {
            setFiles([file]);
            uploadFile(file);
        } else {
            e.target.value = "";
        }
    };
    
    const uploadFile = async (file) => {
        try {
            setUploadedFiles(prev => [
                ...prev,
                {
                    name: file.name,
                    file: file,
                    file_id: file.id,
                    status: "YET TO START",
                }
            ]);
            setErrors(prev => ({
                ...prev,
                file: null
            }));
        } catch (err) {
            console.error("File upload error:", err);
        }
    };

    const checkFileSize = (file) => {
        if (!file) return;
        const MAX_SIZE = 100 * 1024 * 1024; 
        if (file.size > MAX_SIZE) {
            alert("File size exceeds 500 MB!");
            return false;
        }
        return true;
    };

    const removeFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, idx) => idx !== index));
        setFiles(prev => prev.filter((_, idx) => idx !== index));
    }

    return (
         <React.Fragment>
            <div className="p-10 bg-white shadow-md rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="">
                        <label htmlFor="exampleFormControlFile1" className="block mb-1 text-gray-700 font-medium">
                            {t("source_language")}<span className="asterik-symbol">*</span>
                        </label>
                        <div ref={sourceLangRef} className={ "ai-lang-select"} onClick={() => {setshowSrcLangModal(true) }} >
                            {(sourceLabel === "") ? (
                                <span className="placeholder">{t("select_source_language")}</span>
                            ) : (
                                <span>{sourceLabel}</span>
                            )}
                            <i style={{ color: "#8c8c8c" }} className="fas fa-caret-down" />
                        </div>
                        {errors.source && <small className="text-danger">{t("select_a_source_language")}</small>}
                    </div>
                    <div className="">
                        <label htmlFor="exampleFormControlFile1" className="block mb-1 text-gray-700 font-medium">
                            {t("target_language")}<span className="asterik-symbol">*</span>
                        </label>
                            <Tooltip arrow componentsProps={{
                                    tooltip: {
                                        sx: {
                                            bgcolor: '#2A2A2A',
                                            '& .MuiTooltip-arrow': {
                                                color: '#2A2A2A',
                                            },
                                        },
                                    },
                                }}
                                title={`${targetLanguageListTooltip}`} placement="top"
                            >
                                <div style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }}
                                    className="ai-lang-select" onClick={() => { sourceLanguage !== '' ? setshowTarLangModal(true) : focusSourceLangDiv() }} >
                                    {targetLanguage == "" ? (
                                        <span className="placeholder">
                                            {t("select_target_language-1")}
                                        </span>
                                    ) : (
                                        <span>
                                            {targetLanguage[0].language}
                                        </span>
                                    )}
                                    <i style={{ color: "#8c8c8c" }} className="fas fa-caret-down" />
                                </div>
                            </Tooltip>
                            {errors.target && <small className="text-danger">{t("select_a_target_language")}</small>}
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Ministry/Department</label>
                        <Select
                            placeholder="Select Ministry / Department"
                            menuPlacement="auto"
                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                            styles={customProjectTypeSelectStyles}
                            options={ministryDepartmentSelectOptions}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Dateline</label>
                        <input type="text" name="dateline" placeholder="Enter dateline" className="w-full border rounded-md px-4 py-2"
                            value={formData.dateline} onChange={handleChange}/>
                    </div>
                </div>
                {activeProjTab.id === 1 && <>
                <div className="mt-6">
                    <label className="block mb-1 text-gray-700 font-medium">Headline
                        <span className="asterik-symbol">*</span>
                    </label>
                    <input type="text" name='headline'
                        maxLength={HEADING_MAX_LENGTH}
                        className="w-full border rounded-md px-4 py-2"
                        placeholder="Enter headline"
                        value={formData.headline}
                        onChange={handleChange} />
                    <div className='flex justify-between'>
                        <span>
                            {errors.headline && <small className="text-danger">{errors.headline}</small>}
                        </span>
                        <span className="add-subtitle-text-count">{`${formData.headline.length}/${HEADING_MAX_LENGTH}`}</span>
                    </div>
                </div>                
                    {subTitleItem && subTitleItem.map((item, index) => (
                        <>
                        <div className="mt-6 ">
                            <label className="block mb-1 text-gray-700 font-medium">{`Subtitle ${index + 1}`}</label>
                            <div className="relative">
                                {subTitleItem.length > 1 && (
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 text-[--grey-shade] w-6 h-6 flex items-center justify-center rounded-full text-sm hover:bg-[--maroon-light-one] hover:text-[--maroon]"
                                        onClick={() => removeSubTitle(index)}
                                        title="Remove"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M6.5 17C6.0875 17 5.73437 16.8531 5.44062 16.5594C5.14687 16.2656 5 15.9125 5 15.5V5.5H4.75C4.5375 5.5 4.35938 5.42854 4.21563 5.28563C4.07188 5.14271 4 4.96563 4 4.75438C4 4.54313 4.07188 4.36458 4.21563 4.21875C4.35938 4.07292 4.5375 4 4.75 4H8V3.75C8 3.5375 8.07188 3.35937 8.21563 3.21562C8.35938 3.07187 8.5375 3 8.75 3H11.25C11.4625 3 11.6406 3.07187 11.7844 3.21562C11.9281 3.35937 12 3.5375 12 3.75V4H15.25C15.4625 4 15.6406 4.07146 15.7844 4.21437C15.9281 4.35729 16 4.53437 16 4.74562C16 4.95687 15.9281 5.13542 15.7844 5.28125C15.6406 5.42708 15.4625 5.5 15.25 5.5H15V15.491C15 15.9137 14.8531 16.2708 14.5594 16.5625C14.2656 16.8542 13.9125 17 13.5 17H6.5ZM8.74563 14C8.95688 14 9.13542 13.9281 9.28125 13.7844C9.42708 13.6406 9.5 13.4625 9.5 13.25V7.75C9.5 7.5375 9.42854 7.35937 9.28562 7.21562C9.14271 7.07187 8.96562 7 8.75437 7C8.54313 7 8.36458 7.07187 8.21875 7.21562C8.07292 7.35937 8 7.5375 8 7.75V13.25C8 13.4625 8.07146 13.6406 8.21438 13.7844C8.35729 13.9281 8.53438 14 8.74563 14ZM11.2456 14C11.4569 14 11.6354 13.9281 11.7812 13.7844C11.9271 13.6406 12 13.4625 12 13.25V7.75C12 7.5375 11.9285 7.35937 11.7856 7.21562C11.6427 7.07187 11.4656 7 11.2544 7C11.0431 7 10.8646 7.07187 10.7188 7.21562C10.5729 7.35937 10.5 7.5375 10.5 7.75V13.25C10.5 13.4625 10.5715 13.6406 10.7144 13.7844C10.8573 13.9281 11.0344 14 11.2456 14Z"
                                            fill="currentColor"/>
                                        </svg>
                                    </button>
                                )}
                                <input type="text" name='subTitleList'
                                    className="w-full border rounded-md px-4 py-2"
                                    placeholder="Type or paste a subtitle here"
                                    value={subTitleList[index]}
                                    maxLength={SUBHEADING_MAX_LENGTH}
                                    onChange={(e) => handleSubTitleChange(e, index)} />
                                <div className='flex justify-between'>
                                    <span>
                                        {errors?.subTitleList && errors?.subTitleList[index]
                                            && <small className="text-danger">{`Subtitle ${index + 1} is required`}</small>}
                                    </span>
                                    <span className="add-subtitle-text-count">{`${subTitleList[index].length}/${SUBHEADING_MAX_LENGTH}`}</span>
                                </div>
                            </div>
                        </div>
                        </>
                    ))}
                    <div className="flex justify-between mt-6">
                        <button className="add-subtitle-btn gap-[6px]" onClick={addSubTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15.8333 10.8334H10.8333V15.8334H9.16663V10.8334H4.16663V9.16675H9.16663V4.16675H10.8333V9.16675H15.8333V10.8334Z" fill="#0074D3"/>
                            </svg>
                            <span className="add-subtitle-btn-text">Add another subtitle</span>
                        </button>
                        <div></div>
                    </div>
                    <div className="mt-6">
                        <label className="block mb-1 text-gray-700 font-medium">Body
                            <span className="asterik-symbol">*</span>
                        </label>
                        <textarea name='body'
                            maxLength={SUMMERY_MAX_LENGTH}
                            className="w-full border rounded-md px-4 py-2 h-44"
                            placeholder="Write your story here..."
                            value={formData.body}
                            onChange={handleChange}>
                        </textarea>                        
                        <div className='flex justify-between'>
                            <span>
                                {errors.body && <small className="text-danger">{errors.body}</small>}
                            </span>
                            <span className="add-subtitle-text-count">{`${formData.body.length}/${SUMMERY_MAX_LENGTH}`}</span>
                        </div>
                    </div>
                    </>
                }
                {activeProjTab.id === 2 &&
                <>
                    <div className='mt-6'>
                        <p class="upload-area-title">Upload file(s)<span class="asterik-symbol">*</span></p>
                        <div className="story-file-upload">
                            <div className="story-file-upload-container">
                                <DragAndDrop handleDrop={handleDrop}>
                                    <div className={files.length > 0 ? "button-wrap fileloaded h-25 button-wrap disabled-upload" : "button-wrap sa"} >
                                        <div className="overall-draganddrop">
                                            <div className="draganddrop-align">
                                                <img className={files.length > 0  ? 'img' : ''}
                                                    src={UploadFolder}
                                                    alt="folder"
                                                    height="38px"
                                                    width="46px"
                                                />
                                                {/* {Object.keys(files).map((eachKey) => {
                                                    return (
                                                        <div key={eachKey + files[eachKey].name} className="file-name-list">
                                                            <div className="filename">
                                                                {
                                                                    <img src={import.meta.env.PUBLIC_URL + "/assets/images/document.svg"} alt="document"/>
                                                                }{" "}
                                                                {files[eachKey].name}
                                                            </div>
                                                            <span data-file-index={eachKey} onClick={(e) => removeFile(e, eachKey)}>
                                                                <i className="far fa-trash-alt"></i>
                                                            </span>
                                                        </div>
                                                    );
                                                })} */}
                                                <div className="file-upload-align">
                                                    <p className="upload-text">
                                                        {'Drop your file here or'}{" "}
                                                    </p>
                                                    <div className="upload-link-wrapper">
                                                        <label htmlFor="files">{'browse'}</label>
                                                        <input
                                                            ref={inputFileUploadRef}
                                                            type="file"
                                                            name="files"
                                                            className="form-control-file"
                                                            id="files"
                                                            accept='.docx,.txt'
                                                            onChange={handleFileChange}
                                                            hidden
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="file-upload-instruction" style={{flexDirection:'column'}}>
                                                <div className="supp-file-format">
                                                    <span className="supported-file-tooltip">
                                                        {'Supported file formats'}:
                                                    </span>
                                                    <span className="supported-file-tooltip"> TXT, DOCX</span>
                                                </div>
                                                <div className="file-upload_instruct-row">
                                                    {/* <span className="max-word-note">
                                                        {'Recommended max words per file'}: <span>50,000</span>
                                                    </span> */}
                                                    <span className="max-file-size-note ">
                                                        {'Maximum size of a file'}: <span>100 mb</span> 
                                                    </span>
                                                    <span className="max-file-note">
                                                        {t("limit_for_file_upload")}: <span>1 file upload</span> 
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DragAndDrop>
                                {uploadedFiles && uploadedFiles.length > 0 && 
                                    <div className="file-list-container">
                                        {uploadedFiles.map((item, index) => (
                                            <div key={index} className="file-row">
                                                <div className="file-name">
                                                    <div className="block">
                                                        <span className="doc-icon">
                                                            <img src={`${Config.BASE_URL}/app/extension-image/${item?.name?.split(".")?.pop()}`} alt="doc-icon" />
                                                        </span>
                                                    </div>
                                                    {item.name}</div>
                                                <div className="file-actions">
                                                    <button className="btn-analyze" onClick={() => removeFile(index)}>
                                                        <img src={CloseBlack} alt="delete" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        {errors?.file && <small className="text-danger">{errors?.file}</small>}
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 ${errors?.file ? 'mt-[12px]' : 'mt-[24px]'}`}>
                        {/* <label
                            htmlFor="check-pre-translate"
                            className="flex items-center gap-2 cursor-pointer"
                        > */}
                            <input
                                id="check-pre-translate"
                                type="checkbox"
                                checked={formData.preTranslate}
                                onChange={(e) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        preTranslate: e.target.checked,
                                    }));
                                }}
                                className="w-4 h-4 accent-blue-600 cursor-pointer"
                            />
                            <span className="text-gray-700">Pre-translate file</span>
                        {/* </label> */}
                    </div>
                </>
                }
                <div className="flex justify-end mt-6">
                    <button className="bg-[#0077C8] text-white px-6 py-2 rounded-md font-medium flex items-center gap-[6px]" onClick={handleSubmit}>
                        {isLoading && <ButtonLoader />}
                        Add to my stories
                    </button>
                </div>
            </div>
            {showSrcLangModal &&
                (<Rodal visible={showSrcLangModal} {...modaloption} showCloseButton={false} className="ai-lang-select-modal">
                            <div className="lang-modal-wrapper">
                        <span className="modal-close-btn lang-close" onClick={() => { setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false) }} >
                            <img src={CloseBack} alt="close_black" />
                        </span>
                        {showSrcLangModal &&
                            <Sourcelanguage
                                sourceLanguage={sourceLanguage}
                                showSrcLangModal={showSrcLangModal}
                                setshowSrcLangModal={setshowSrcLangModal}
                                sourceLanguageOptions={languageOptions}
                                handleSourceLangClick={handleSourceLangClick}
                                filteredResults={filteredResults}
                                setFilteredResults={setFilteredResults}
                                searchInput={searchInput}
                                setSearchInput={setSearchInput}
                                onFocusWrap={onFocusWrap}
                                setOnFocusWrap={setOnFocusWrap}
                                searchAreaRef={searchAreaRef}
                            />}
                    </div>
                </Rodal>)
           }
            {showTarLangModal && (
                <Rodal visible={showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal" >
                    <div className="lang-modal-wrapper">
                        <span className="modal-close-btn lang-close" onClick={(e) => { setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false) }} >
                            <img src={CloseBack} alt="close_black" />
                        </span>
                        <Targetlanguage
                            targetLanguage={targetLanguage}
                            targetLanguageOptions={targetLanguageOptions}
                            setTargetLanguageOptions={setTargetLanguageOptions}
                            handleTargetLangClick={handleTargetLangClick}
                            showTarLangModal={showTarLangModal}
                            setshowTarLangModal={setshowTarLangModal}
                            alreadySelectedTarLang={alreadySelectedTarLang}
                            alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                            editFilteredTargetLang={editFilteredTargetLang}
                            isEdit={isEdit}
                            filteredResults={filteredResults}
                            setFilteredResults={setFilteredResults}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            onFocusWrap={onFocusWrap}
                            setOnFocusWrap={setOnFocusWrap}
                            searchAreaRef={searchAreaRef}
                            hideAddOrUpdateBtn={true}
                        />
                    </div>
                </Rodal>
            )}
         </React.Fragment>        
    );
}

export default AddStory;