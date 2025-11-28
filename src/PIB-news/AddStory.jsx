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

const AddStory = (props) => {
    const {languageOptions, ministryDepartmentOptions} = props;
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

    const [formData, setFormData] = React.useState({
        source_language: "",
        target_language: "",               
        ministry_department: "",
        dateline: "",
        headline: "",
        body: ""
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
        const { name, value } = e.target;
        updateError(name);
        setFormData({
            ...formData,
            [name]: value
        });
    }

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
        setFormData({
            source_language: "",
            target_language: "",               
            ministry_department: "",
            dateline: "",
            headline: "",
            body: ""
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
        if (!formData.headline) newErrors.headline = "Headline is required";
        if (!formData.body) newErrors.body = "Story body is required";
        if (!formData.source_language) newErrors.source = "Source language is required";
        if (!formData.target_language) newErrors.target = "Target language is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

        payload.append("headline", formData.headline);
        payload.append("body", formData.body);
        payload.append("source_language", formData.source_language);
        payload.append("target_languages", formData.target_language); // if multiple, append each
        payload.append("dateline", formData.dateline);
        payload.append("ministry_department", formData.ministry_department);

        console.log("Submitting FormData →", Object.fromEntries(payload));

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
    const handleDepartmentChange = (selected) => {
        setFormData(prev => ({
            ...prev,
            ministry_department: selected?.value || ""
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

    return (
         <React.Fragment>
            <div className="p-10 bg-white max-w-5xl mx-auto mt-6 shadow-md rounded-md">
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
                                <div
                                    style={{ opacity: (sourceLanguage === '' ? 0.5 : 1) }}
                                    className="ai-lang-select"
                                    onClick={() => { sourceLanguage !== '' ? setshowTarLangModal(true) : focusSourceLangDiv() }}
                                >
                                    {targetLanguage == "" ? (
                                        <span className="placeholder">
                                            {t("select_target_language-1")}
                                        </span>
                                    ) : (
                                        <span>
                                            {targetLanguage[0].language}
                                        </span>
                                    )}
                                    <i
                                        style={{ color: "#8c8c8c" }}
                                        className="fas fa-caret-down"
                                    />
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
                        <input type="text" name="dateline"
                            placeholder="Enter dateline"
                            className="w-full border rounded-md px-4 py-2"
                            value={formData.dateline}
                            onChange={handleChange}/>
                    </div>
                </div>
                <div className="mt-6">
                    <label className="block mb-1 text-gray-700 font-medium">Headline
                        <span className="asterik-symbol">*</span>
                    </label>
                    <input type="text" name='headline'
                        className="w-full border rounded-md px-4 py-2"
                        placeholder="Enter headline"
                        value={formData.headline}
                        onChange={handleChange} />
                    {errors.headline && <small className="text-danger">{errors.headline}</small>}
                </div>
                <div className="mt-6">
                    <label className="block mb-1 text-gray-700 font-medium">Body
                        <span className="asterik-symbol">*</span>
                    </label>
                    <textarea name='body'
                        className="w-full border rounded-md px-4 py-2 h-44"
                        placeholder="Write your story here..."
                        value={formData.body}
                        onChange={handleChange}>
                    </textarea>
                    {errors.body && <small className="text-danger">{errors.body}</small>}
                </div>
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
