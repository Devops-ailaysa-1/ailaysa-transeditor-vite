import React from 'react';
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

const templateFormData = {
    // Define your template form data here
    
};

const AddStory = (props) => {
    const {languageOptions, ministryDepartmentOptions} = props;
    
    
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false);   
    const [sourceLabel, setSourceLabel] = useState("");    
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState(""); 
    const [sourceTargetValidation, setSourceTargetValidation] = useState({ source: false, target: false,});
    const [filteredResults, setFilteredResults] = useState([]);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("");
    const [editJobs, setEditJobs] = useState([]);
    const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
    const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
    const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
        
    const searchAreaRef = useRef(null);
    const sourceLangRef = useRef(null);
        
    
    const [formData, setFormData] = React.useState({
        source_language: "",
        target_language: "",               
        ministry_department: "",
        dateline: "",
        headline: "",
        body: ""
    });
    const { t } = useTranslation();
    const [errors, setErrors] = React.useState({});
    const hideSettingsModal = () => setshowSettings(false);

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideSettingsModal,
    };

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
    };
    
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
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const clearFormData = () => {
        setFormData({
            source_language: "",
            target_language: "",               
            ministry_department: "",
            dateline: "",
            headline: "",
            body: ""
        });
    }

    const validate = () => {
        let newErrors = {};
        if (!formData.headline) newErrors.headline = "Headline is required";
        if (!formData.body) newErrors.body = "Story body is required";
        if (!formData.source_language) newErrors.source_language = "Source language is required";
        if (!formData.target_language) newErrors.target_languages = "Target language is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const sumbit = (payload) => {
        let params = {
            url: Config.BASE_URL + "/workspace/stories_pib/",
            auth: true,
            data: payload,
            method: "POST",
            success: (response) => {
                Config.toast(t("story_added_successfully"), 'success');
                clearFormData();
                if (props.onStoryAdded) props.onStoryAdded(response.data);
            },
        };
        Config.axios(params);
    };

    const DropdownIndicator = props => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <ArrowDropDown className="arrow-icon-color" />
                </components.DropdownIndicator>
            )
        );
    };

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

    const ministryDepartmentSelectOptions = ministryDepartmentOptions?.map((dept) => ({
        value: dept.uid,
        label: dept.name
    }));

    const selectedDepartment = ministryDepartmentSelectOptions.find(
        opt => opt.value === formData.ministry_department
    );

    const handleDepartmentChange = (selected) => {
        setFormData(prev => ({
            ...prev,
            ministry_department: selected?.value || ""
        }));
    };

    return (
         <React.Fragment>
            <div className="p-10 bg-white max-w-5xl mx-auto mt-6 shadow-md rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-group">
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
                        {sourceTargetValidation.source && <small className="text-danger">{t("select_a_source_language")}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">
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
                            {sourceTargetValidation.target && <small className="text-danger">{t("select_a_target_language")}</small>}
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
                        {/* <select name='ministry_department' className="w-full border rounded-md px-4 py-2 bg-gray-50"
                            value={formData.ministry_department} onChange={handleChange}>
                            {ministryDepartmentOptions?.map((dept, idx) => (
                                <option key={dept.uid} value={dept.uid}>
                                {dept.name}
                                </option>
                            ))}
                        </select> */}
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">Dateline</label>
                        <input type="text" name="dateline" placeholder="Enter dateline" className="w-full border rounded-md px-4 py-2 bg-gray-50"  value={formData.dateline} onChange={handleChange}/>
                    </div>
                </div>
                <div className="mt-6">
                    <label className="block mb-1 text-gray-700 font-medium">Headline
                        <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name='headline' className="w-full border rounded-md px-4 py-2 bg-gray-50" placeholder="Enter headline"  value={formData.headline} onChange={handleChange} />
                </div>
                <div className="mt-6">
                    <label className="block mb-1 text-gray-700 font-medium">Body
                        <span className="text-red-500">*</span>
                    </label>
                    <textarea name='body'
                        className="w-full border rounded-md px-4 py-2 h-44 bg-gray-50"
                        placeholder="Write your story here..."
                        value={formData.body}
                        onChange={handleChange}>
                    </textarea>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="bg-[#0077C8] text-white px-6 py-2 rounded-md font-medium" onClick={handleSubmit}>
                        Add to my stories & Open
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
                            targetLanguageOptions={languageOptions}
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
