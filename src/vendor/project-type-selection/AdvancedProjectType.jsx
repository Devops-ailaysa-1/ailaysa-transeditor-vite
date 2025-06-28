    import React, { useState, useEffect, useRef } from "react";
import Config from "../Config";
// import ProjectSetupDatePicker from "../date-time-picker/ProjectSetupDatePicker";
// import ProjectSetupTimePicker from "../date-time-picker/ProjectSetupTimePicker";
import Checkbox from '@mui/material/Checkbox';
import { Collapse } from "reactstrap";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Select, { components } from "react-select";

import SubjectFieldModal from "../lang-modal/sub-modals/SubjectFieldModal";
import ContentTypeModal from "../lang-modal/sub-modals/ContentTypeModal";
import DatePicker from "../date-time-picker/DatePicker";
// import MomentTimePicker from "../date-time-picker/MomentTimePicker";
import { CustomTimePicker } from "../custom-component/CustomTimePicker";
import { t } from "i18next";
import { Radio } from "@mui/material";
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import { useSelector } from "react-redux";
// const CustomCellCheckbox = withStyles({
//     root: {
//         color: "#5F6368",
//         "&:hover": {
//             backgroundColor: "#EBEBEB",
//             color: "#5F6368",
//         },
//         "&$checked": {
//             color: "#0078D4",
//             "&:hover": {
//                 backgroundColor: "#E5F1FB",
//             },
//         },
//     },
//     checked: {},
// })(Checkbox);

function AdvancedProjectType(props) {
    const { isLoading, 
        subjectField, 
        contentType, 
        subjectFieldOptions, 
        contentTypeOptions, 
        revisionStepEdit, 
        steps,
        selectedSteps,
        setSelectedSteps,
        stepOptions,
        handleSelectedSteps,
        setPreTranslate,
        preTranslate,
        projectType,
        isTranslationTaskAvailable,
        tempWriterFile,
        selectedMTEngine,
        mtpeEngineOptions,
        handleMTEngineChange,
        translationByPage,
        setTranslationByPage,
        projectDataFromApi,
        adaptiveTransEnable,
        setAdaptiveTransEnable,
        flowSwitch
    } = props;

    const userDetails = useSelector((state) => state.userDetails.value)
    let isEnterprise = userDetails?.is_enterprise 
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const [isOpen, setIsOpen] = useState(false);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [glossClass, setGlossClass] = useState(true)
    // const [subjectField, setSubjectField] = useState(props.subjectField);
    // const [contentType, setContentType] = useState(props.contentType);
    const [showSubFieldModal, setshowSubFieldModal] = useState(false);
    const [showConTypeModal, setshowConTypeModal] = useState(false);
    const [showSettings, setshowSettings] = useState(false);
    const [projectDeadline, setProjectDeadline] = useState("");
    const [disablePreTranslate, setDisablePreTranslate] = useState(false)

    const deletedSubjectIds = useRef([]);


    const collapseToggle = () => setIsOpen(!isOpen);
    const hideSettingsModal = () => setshowSettings(false);
    

    const customStepSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#7E7E7E",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px 0px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected || state.isDisabled ? "#ededed" : "#ffffff",
            opacity: state.isDisabled ? 0.5 : 1,
            cursor: state.isDisabled ? "context-menu" : "pointer",
            display: "flex",
            marginBottom: "0.5rem",
            padding: "5px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: state.isDisabled ? "context-menu" : "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "1px solid #0074D3" : "1px solid #DBDBDB",
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#0074D3" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            height: 46,
            padding: "0px 11px 0px 13px",
            "&:hover": {
                cursor: "pointer",
                fontWeight: "400",
                border: "1px solid #BEBEBE",
            },
        }),
    };

    useEffect(() => {
        if (props?.mtEnable === false) {
            setPreTranslate(false)
            setAdaptiveTransEnable(false)
        }
    }, [props?.mtEnable])

    // useEffect(() => {
    //     if(adaptiveTransEnable) {
    //         setTranslationByPage(false)
    //     }
    // }, [adaptiveTransEnable])
    

    const handlePageWiseTransOption = () => {
        if(projectDataFromApi.current?.glossary_selected){
            Config.toast(t("glossary_selected_warning_text"), 'warning')
        }else {
            setTranslationByPage(true)
            setAdaptiveTransEnable(false)
        }
    } 
    useEffect(()=>{
        setTranslationByPage(false)
    },[adaptiveTransEnable])

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props} className="step-options-list">
                    <input className="step-options-list-checkbox" type="checkbox" checked={props.isSelected} onChange={() => null} />
                    <label className="step-options-list-label">{props.label}</label>
                </components.Option>
            </div>
        );
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };
    
    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideSettingsModal,
    };

    useEffect(() => {
      if(URL_SEARCH_PARAMS.get("get-project-info")){
        if(preTranslate){
            checkPreTranslateIsGoing()
        }
      }
    }, [preTranslate])
    


    const handleDateChange = (newValue) => {
        props.setDeadline(newValue);
    };

    const handleTimeChange = (newValue) => {
        props.setDeadline(newValue.value);
    };

    const handleModalClose = (modal) => {
        if (modal === "subject-modal") {
            setshowSubFieldModal(false);
        } else if (modal === "content-type") {
            setshowConTypeModal(false);
        }
    };

    const disablebidingRangeDates=(date)=> {
        const today = new Date()
        return  date <= today
    }   

    const checkPreTranslateIsGoing = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/task_status/?project=${URL_SEARCH_PARAMS.get("get-project-info")}`,
            auth: true,
            success: (response) => {
                let canOpenFiles = response.data.res?.filter(each => each.open == 'True');
                if(response.data.res?.length !== canOpenFiles?.length){
                    setDisablePreTranslate(true);
                }
            },
            error: (err) => {
               console.error(err);
            }
        });
    }

    return (
        <React.Fragment>
            <div className="project-setup-advanced-wrapper">
                <div className="project-setup-advanced-col">
                    <div className="advanced-option-check-wrap">
                        {/* <Checkbox
                            id="advance-setting"
                            checked={isOpen}
                            onChange={collapseToggle}
                            size="small"
                        /> */}
                        <label onClick={collapseToggle} htmlFor="advance-setting">
                            {projectType === 4 ? t("more_options") : t("advanced_settings")}
                        </label>
                    </div>
                    {/* <Collapse className={"collapsed-body " + (isOpen ? "collapsed-body-open" : "")} isOpen={isOpen}> */}
                        
                    {/* </Collapse> */}
                </div>
                {/* <div className="project-setup-advanced-col"></div> */}
            </div>
            
            {isOpen &&
                (<Rodal visible={isOpen} {...modaloption} className="advanced-settins-wrapper" showCloseButton={false}>
                    <div className="subject-modal-wrapper">
                        <div className="lang-modal-header">
                            <h1>{t("advanced_settings")}</h1>
                            <span className="modal-close-btn" onClick={(e) => setIsOpen(false)}>
                                <img src={CloseBlack} alt="close_black" />
                            </span>
                        </div>
                        <div className="collapse-proj-setup">
                            {/* <div className="collapse-proj-setup-header">
                                <div className="collapse-header"> */}
                                    {/* <img src={Config.HOST_URL + "assets/images/new-ui-icons/settings-new.svg"} alt="settings-new" /> */}
                                    {/* <h3>Advanced Settings</h3> */}
                                {/* </div> */}
                                {/* <img className={isOpen ? "upward" : ""} src={Config.HOST_URL + "assets/images/new-ui-icons/expand_more.svg"} alt="expand_more" /> */}
                            {/* </div> */}
                            {/* <Collapse className={"collapsed-body " + (isOpen ? "collapsed-body-open" : "")} isOpen={isOpen}> */}
                                <div className={"form-wrapper " + (projectType === 4 && "single-advance-project")}>
                                    <div className={projectType !== 4 && "d-flex gap-3 files-space-align"}>

{/* {!adaptiveTransEnable && */}
<>
                                        {projectType !== 4 && 
                                        <div className="form-group mr-3">
                                            <label htmlFor="exampleFormControlFile1" className="adv-form-label">
                                                {t("machine_translation_engine")}
                                            </label>
                                            <Select
                                                className="select-width"
                                                isSearchable={false}
                                                name="machine-translation-software"
                                                id="machine-translation-software"
                                                value={selectedMTEngine}
                                                options={mtpeEngineOptions}
                                                // isOptionDisabled={(option) => option.disabled}
                                                isDisabled={
                                                    mtpeEngineOptions.length === 0 ? true : false
                                                }
                                                onChange={handleMTEngineChange}
                                                styles={customStepSelectStyles}
                                                placeholder={
                                                    <div className="select-placeholder-text">
                                                        {t("select_mt")}
                                                    </div>
                                                }
                                                components={{
                                                    DropdownIndicator,
                                                    IndicatorSeparator: () => null,
                                                }}
                                            />
                                        </div>
                                        }

</>
{/* } */}

                                        <div className="form-group">
                                            <label className="adv-form-label">{t("set_deadline")}</label>
                                            <div className="date-time-pickers">
                                                <div className="dt-col">
                                                    <DatePicker 
                                                        value={props.deadline} 
                                                        onChange={handleDateChange} 
                                                        disablePast 
                                                        source="advanced_project_type_selection" 
                                                    />
                                                </div>
                                                <div className="dt-col">
                                                    {/* <TimesPicker value={props.deadline} disablePast onChange={handleDateChange} /> */}
                                                    {/* <MomentTimePicker glossClass={glossClass}/> */}
                                                    <CustomTimePicker value={Config.convertUTCToLocal(props.deadline)} setValue={props.setDeadline} assigntimepicker="default-time-picker"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {projectType !== 4 && 
                                    <div className="d-flex gap-3 files-space-align">
                                        <div className="form-group mr-3">
                                            <label className="adv-form-label">{t('subject_field')}</label>
                                            <div className="ai-lang-select lang-select-text-box" onClick={() => setshowSubFieldModal(true)}>
                                                <div className="expertise-capsule-container">
                                                    <div className="selected-color-wrapper">
                                                        {subjectField?.length > 0 ? (
                                                            subjectField?.map((ind) => {
                                                                return (
                                                                    <span key={ind?.id} className="selected-color expertise-info-capsule">
                                                                        {ind?.name}
                                                                    </span>
                                                                );
                                                            })
                                                        ) : (
                                                            <>
                                                                <span>{t("click_to_select")}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <i style={{ color: "#8c8c8c" }} className="fas fa-caret-down" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="adv-form-label">{t("content_type")}</label>
                                            <div className="ai-lang-select lang-select-text-box" onClick={() => setshowConTypeModal(true)}>
                                                <div className="expertise-capsule-container">
                                                    <div className="selected-color-wrapper">
                                                        {contentType?.length > 0 ? (
                                                            contentType?.map((ind) => {
                                                                return (
                                                                    <span key={ind?.id} className="selected-color expertise-info-capsule">
                                                                        {ind?.name}
                                                                    </span>
                                                                );
                                                            })
                                                        ) : (
                                                            <>
                                                                <span>{t("click_to_select")}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <i style={{ color: "#8c8c8c" }} className="fas fa-caret-down" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                    <div className={projectType !== 4 && "d-flex gap-3 files-space-align"}>
                                        <div className={"form-group " + (projectType !== 4 && "mr-3")}>
                                            <label className="adv-form-label">{t("select_steps")}</label>
                                            <Select
                                                isClearable={false}
                                                options={stepOptions}
                                                // defaultValue={stepOptions[0]}
                                                isMulti
                                                styles={customStepSelectStyles}
                                                classNamePrefix="steps-select"
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                placeholder={`${t("click_to_select")}...`}
                                                components={{ Option, DropdownIndicator, IndicatorSeparator: () => null }}
                                                onChange={handleSelectedSteps}
                                                allowSelectAll={true}
                                                value={selectedSteps}
                                                isOptionDisabled={(option) => option.disabled}
                                                maximumSelectionLength={2}
                                                isDisabled={props.isEditable && !revisionStepEdit}
                                            />
                                        </div>
                                        {projectType !== 4 && <div className="form-group"></div>}
                                    </div>
                                </div>
                                <div className={"form-wrapper pt-0 "}>
                                    {(isTranslationTaskAvailable || (tempWriterFile !== null && tempWriterFile !== undefined) || flowSwitch == 2) &&

                                    
                                        <>
                                        {/* {!adaptiveTransEnable && */}
                                            <div className="flex items-center" style={!props.mtEnable ? {opacity: 0.5} : {}}>
                                                <Checkbox
                                                    id="pre-translate"
                                                    // className="ml-3"
                                                    checked={preTranslate}
                                                    disabled={!props.mtEnable || disablePreTranslate}
                                                    onChange={(e) => setPreTranslate(e.target.checked)}
                                                    size="small"
                                                />
                                                <label htmlFor="pre-translate" className={preTranslate ? "add-active mb-0" : "mb-0"}>
                                                    {t("pre_translate_files")}
                                                </label>{disablePreTranslate && <small style={{marginLeft: '5px'}}>({t("pre_translation_on_going")})</small>}
                                            
                                            </div>
{/* } */}
                                            <div 
                                                className={[
                                                    "d-flex gap-3 files-space-align",
                                                    preTranslate ? "disable opacity-60" : ""
                                                ].join(' ')}
                                            >
                                                {/* {!adaptiveTransEnable && */}
                                                <div 
                                                className="d-flex align-items-center mt-apply-checkbox form-group mb-0 mr-3 mt-2"
                                                style={!props.mtEnable ? {pointerEvents: 'none', opacity: '0.5', paddingLeft: '10px'} : {paddingLeft: '10px'}} >
                                                    <>
                                                        <label>{t("get_translation_by")}</label> &nbsp;
                                                        <Radio
                                                            checked={translationByPage}
                                                            id="translate-by-page"
                                                            className="radio-btn"
                                                            size="small"
                                                            onChange={handlePageWiseTransOption}
                                                        /> <label htmlFor="translate-by-page" className="assign-manage-radio">{t("sentence_page_wise")}</label>
                                                        &nbsp;&nbsp;
                                                        <Radio
                                                            checked={!translationByPage}
                                                            id="translate-by-segment"
                                                            onChange={() => setTranslationByPage(false)}
                                                            size="small"
                                                            className="radio-btn"
                                                        /> <label htmlFor="translate-by-segment" className="assign-manage-radio">{t("sentence_one_by_one")}</label>

                                                    </>
                                                </div>
                                                {/* } */}
                                            </div>
                                        </>
                                    }
                                </div>
                        </div>
                    </div>
                </Rodal>)
            }
            {showSubFieldModal &&
            (<Rodal visible={showSubFieldModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal subject-model">
                <div className="subject-modal-wrapper">
                    <div className="lang-modal-header">
                        <h1>{t("select_subject_matter")}</h1>
                        <span className="modal-close-btn" onClick={(e) => setshowSubFieldModal(false)}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                    </div>
                    <SubjectFieldModal
                        subjectField={subjectField}
                        subjectFieldOptions={subjectFieldOptions}
                        handleSubjectFieldClick={props.handleSubjectFieldClick}
                        // setshowSubFieldModal={setshowSubFieldModal}
                        handleModalClose={handleModalClose}
                    />
                </div>
            </Rodal>)}
            {showConTypeModal &&
            (<Rodal visible={showConTypeModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal subject-model content-model">
                <div className="subject-modal-wrapper">
                    <div className="lang-modal-header">
                        <h1>{t("select_content_type")}</h1>
                        <span className="modal-close-btn" onClick={(e) => setshowConTypeModal(false)}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                    </div>
                    <ContentTypeModal
                        contentType={contentType}
                        contentTypeOptions={contentTypeOptions}
                        handleContentTypeClick={props.handleContentTypeClick}
                        // setshowConTypeModal={setshowConTypeModal}
                        handleModalClose={handleModalClose}
                    />
                </div>
            </Rodal>)}
        </React.Fragment>
    );
}

export default AdvancedProjectType;
