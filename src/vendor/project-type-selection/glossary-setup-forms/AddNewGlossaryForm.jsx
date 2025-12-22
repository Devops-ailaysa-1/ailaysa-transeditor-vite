import React, { useState, useEffect, useRef, useContext } from "react";
import {  useLocation } from "react-router-dom";
import Config from "../../Config";
// import Radio from '@mui/material/Radio';
import Select, { components } from "react-select";
// import Checkbox from '@mui/material/Checkbox';
import TargetLanguage from "../../lang-modal/Targetlanguage";
import DatePicker from "../../date-time-picker/DatePicker";
// import MomentTimePicker from "../../date-time-picker/MomentTimePicker";
import Skeleton from '@mui/material/Skeleton';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import SourceLanguage from "../../lang-modal/Sourcelanguage";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useTranslation } from "react-i18next";
import { glossaryContext } from './../../context-api/Context';
import Tooltip from '@mui/material/Tooltip';
import { CustomTimePicker } from "../../custom-component/CustomTimePicker";
import ArrowRightGrey from "../../../assets/images/new-create-hub/arrow_right_grey_color.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import { useSelector } from "react-redux";
// const GlossaryCellRadiobtn = withStyles({
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
// })(Radio);

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

const AddNewGlossaryForm = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    const {
        isLoading,
        sourceLanguage,
        targetLanguage,
        mtpeEngineOptions,
        sourceLanguageOptions,
        setSourceLanguageOptions,
        targetLanguageOptions,
        setTargetLanguageOptions,
        usagePermissionOptions,
        handleMTEngineChange,
        handleMinistryDepartmentChange,
        handleUsagePermissionChange,
        handleSourceLangClick,
        handleTargetLangClick,
        showSrcLangModal,
        showTarLangModal,
        setshowSrcLangModal,
        setshowTarLangModal,
        modaloption,
        deadline,
        setDeadline,
        sourceLabel,
        sourceLanguageDisable,
        sourceLanguageError,
        primaryGlossarySourceName,
        setPrimaryGlossarySourceName,
        glossaryCopyrightOwner,
        setGlossaryCopyrightOwner,
        detailsOfPrimaryGlossarySourceName,
        setDetailsOfPrimaryGlossarySourceName,
        glossaryGeneralNotes,
        setglossaryGeneralNotes,
        glossaryLicense,
        setGlossaryLicense,
        selectedUsagePermission,
        requirementSatisfied,
        isEditable,
        filteredResults,
        setFilteredResults,
        searchInput,
        setSearchInput,
        onFocusWrap,
        setOnFocusWrap,
        searchAreaRef,
        alreadySelecetedTarLangID,
        alreadySelectedTarLang,
        revisionStepEdit,
        selectedMTEngine,
        selectedMinistryDepartment,
        selectedSteps,
        stepOptions,
        handleSelectedSteps,
        setSourceLabel,
        setSourceLanguage,
        setTargetLanguage,
        targetLanguageOptionsRef,
        ministryDepartmentList,
        setMinistryDepartmentList
    } = useContext(glossaryContext);

    const customMtSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: !state.isDisabled ? "#3C4043" : "#b7b8ba",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            width: "100%",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected ? "#F4F5F7" : "#ffffff",
            padding: "5px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                // borderLeft: "2px solid #0074D3",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "0px solid #CED4DA" : "0px solid #CED4DA",
            borderRadius: 4,
            transtion: 0.3,
            background: "transparent",
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            marginTop: '8px',
            width: "100%",
            boxShadow: 0,
            height: 39,
            "&:hover": {
                background: "#EBEBEB"
            },
        }),
    };

    const [deadLineSelected, setDeadLineSelected] = useState([]);
    const [usagePermissionSelected, setUsagePermissionSelected] = useState([]);
    const [publicLicenseSelected, setPublicLicenseSelected] = useState([]);
    const [selectedValue, setSelectedValue] = useState("apply-machine-translate");
    const [recentlyUsedLangs, setRecentlyUsedLangs] = useState([])
    const [targetLanguageListTooltip, setTargetLanguageListTooltip] = useState("")
    const [glossClass, setGlossClass] = useState(true)
    const isPIBNews = useSelector((state) => state.isPIBNews.value);
    // const [ministryDepartmentList, setMinistryDepartmentList] = useState([]);

    const sourceLangRef = useRef(null)

    useEffect(()=>{
        if(targetLanguageOptionsRef.current.length !== 0){
            if(location.search === ""){
                recentlyUsedLanguage()
            }
        }
    },[targetLanguageOptionsRef.current, location.search])

    useEffect(() => {
		if(targetLanguage){
		let list = ""
		targetLanguage?.map((each, index) => {
			list += `${each?.language}${
			index !== targetLanguage?.length - 1 ? ", " : ""
			}`;
		});
		setTargetLanguageListTooltip(list)
		}
	}, [targetLanguage, targetLanguageOptionsRef.current])
	



    const customStepSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#7E7E7E",
            fontFamily: "Roboto",
            fontSize: "15px",
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
            fontSize: "14px",
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
            border: state.isFocused ? "1px solid #DBDBDB" : "1px solid #DBDBDB",
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px 11px 0px 13px",
            height: 46,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props} className="step-options-list">
                    <input className="step-options-list-checkbox" type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
                    <label className="step-options-list-label">{props.label}</label>
                </components.Option>
            </div>
        );
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down-new"></span>
            </components.DropdownIndicator>
        );
    };

    const handleDeadLineSelected = (selected) => {
        setDeadline(selected);
    };

    const handleUsagePermissionsSelected = (selected) => {
        setUsagePermissionSelected(selected);
    };

    const handlePublicLicenseSelected = (selected) => {
        setPublicLicenseSelected(selected);
    };

    // useEffect(()=>{
    //     if(targetLanguage != ''){
    //         props.setrequired(false)
    //     }
    //     else{
    //         props.setrequired(true)
    //     }
    // },[targetLanguage])
    // const getSourceLanguages = () => {
    //     let params = {
    //       url: Config.BASE_URL + "/app/language/",
    //       auth: true,
    //       success: (response) => {
    //         targetLanguageOptionsRef.current = response.data;
    //         setSourceLanguageOptions(response.data);
    //         setTargetLanguageOptions(response.data);
    //       },
    //     };
    //     Config.axios(params);
    //   };

    const formatOptionLabel = ({ value, label, customAbbreviation }) => (
        <div style={{ display: "flex" }}>
          <div className="pairlang__src">{label}
            <img className="pairlang__arrow" src={ArrowRightGrey} alt="" />
          </div>
          <div className="pairlang__tar">
            {customAbbreviation}
          </div>
        </div>
    );
    
   
    const recentlyUsedLanguage = () => {
        var list;

        Config.axios({
          url: Config.BASE_URL + "/workspace/default_detail/",
          auth: true,
          success: (response) => {
              let options = []
              response.data?.recent_pairs?.map(each => {
                  list = (<span>{targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.src)?.language}</span> + <span>{each.tar?.length > 1 ? each.tar.map(eachTar => targetLanguageOptionsRef.current.find(eachlang => eachlang.id === eachTar)?.language).join(', ') : targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.tar[0])?.language}</span>)
                  options.push({
                        value: `${each.src}->${each.tar.join(',')}`,
                        label: `${targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.src)?.language}`,
                        customAbbreviation: `${
                          each.tar?.length > 1 ? each.tar.map(eachTar => targetLanguageOptionsRef.current.find(eachlang => eachlang.id === eachTar)?.language).join(', ') : targetLanguageOptionsRef.current.find(eachlang => eachlang.id === each.tar[0])?.language
                        }`
                  })
              })
              setRecentlyUsedLangs(options)
          },
      });
    }
      
    const handleRecentLangClick = (clickedLang) => {
        let src = clickedLang.value.split('->')[0]
        let tar = clickedLang.value.split('->')[1]?.split(',')
        setSourceLabel(targetLanguageOptionsRef.current?.find((element) => element.id == src).language)
        setSourceLanguage(src)
        let selectedTar = []
        tar?.map(eachTar => {
          selectedTar.push(targetLanguageOptionsRef.current?.find((element) => element.id == eachTar))
        })
        setTargetLanguage([...new Set(selectedTar)]);
    }

    const focusSourceLangDiv = () => {
        if(sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #E74C3C;'
        setTimeout(() => {
            if(sourceLangRef.current !== null) sourceLangRef.current.style = 'border: 1px solid #ced4da;'
        }, 1000);
    } 
    
    useEffect(() => {
        if(sourceLanguage !== "" && sourceLanguage !== null){
            setTargetLanguageOptions(targetLanguageOptionsRef.current?.filter(each => each.id !== sourceLanguage))
        }
    }, [sourceLanguage])

    useEffect(() => {
        if (props?.selectedtab?.id === 2 && !(ministryDepartmentList && ministryDepartmentList.length > 0)) {
            if (ministryDepartmentList && ministryDepartmentList.length > 0)
                updateSelectedMinistoryDept(ministryDepartmentList);
            else
                getMinistryDepartmentList();
        } else {
            handleMinistryDepartmentChange(null);
            handleMTEngineChange({});
        }
    }, [props?.selectedtab]);

    const updateSelectedMinistoryDept = (list) => {
        if (selectedMinistryDepartment && selectedMinistryDepartment.value && !selectedMinistryDepartment.name) {
            const filtered = list?.find((each) => each.uid === selectedMinistryDepartment.value);
            handleMinistryDepartmentChange(filtered);
        }
    }

    useEffect(() => {
        updateSelectedMinistoryDept(ministryDepartmentList);
    }, [ministryDepartmentList, selectedMinistryDepartment]);

    const getMinistryDepartmentList = () => {
        let params = {
            url: Config.BASE_URL + "/workspace/ministry_names",                     
            auth: true,
            success: (response) => {
                const {data} = response;
                const formattedlist = data.map(dept => ({
                        ...dept,
                        value: dept.uid,
                        label: dept.name
                    }));
                setMinistryDepartmentList(formattedlist);
                updateSelectedMinistoryDept(formattedlist);
            },
            error: (error) => {
                if(error.response.status === 500){
                    Config.showToast('Something went wrong. Please try again later.', 'error');
                }
            }
        };
        Config.axios(params);
    }

    return (
        <React.Fragment>
            {
                isLoading ?
                <div className="new-glossary-setup-wrapper">
                    <div className="gloss-glob-wrapper">
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">        
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="form-group">
                                <label>
                                    <Skeleton animation="wave" width={130} height={24} />
                                </label>
                                <Skeleton animation="wave" height={46} />
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>
                                            <Skeleton animation="wave" width={130} height={24} />
                                        </label>
                                        <Skeleton animation="wave" height={46} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className="new-glossary-setup-wrapper">
                    <div className="gloss-glob-wrapper">
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>{t("source_language")}<span className="asterik-symbol">*</span></label>
                                        <div
                                            ref={sourceLangRef}
                                            className={sourceLanguageDisable ? "ai-lang-select disabled" : "ai-lang-select"}
                                            onClick={sourceLanguageDisable ? () => setshowSrcLangModal(false) : () => setshowSrcLangModal(true)}
                                        >
                                            {(sourceLabel == t("select_source_language")) ? 
                                                <span className={sourceLabel == "Select source language" ? "placeholder" : ""}> {sourceLabel != t("select_source_language") ? sourceLabel : t('select_source_language') }</span> 
                                                : 
                                                <span>{sourceLabel}</span>}
                                            <i style={{ color: "#000000" }} className="fas fa-caret-down" />
                                        </div>
                                        {(location.search === "" && recentlyUsedLangs?.length !== 0) &&
                                            <Select
                                                // menuIsOpen={true}
                                                className='recently-used-pair'
                                                options={recentlyUsedLangs}
                                                isSearchable={false}
                                                classNamePrefix="mt-select"
                                                value={null}
                                                formatOptionLabel={formatOptionLabel}
                                                styles={customMtSelectStyles}
                                                onChange={handleRecentLangClick}
                                                placeholder={t("recently_used_pairs")}
                                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                            />
                                        }
                                        {sourceLanguageError != "" && <span className="text-danger position-absolute">{sourceLanguageError}</span>}
                                        {!requirementSatisfied && sourceLanguage.length <= 0 && props.required &&<span className="text-danger position-absolute">{t("required")}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">{t("target_language")}<span className="asterik-symbol">*</span></label>
                                        <Tooltip 
                                            arrow
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
                                            title={`${targetLanguageListTooltip}`} placement="top"
                                        >
                                            <div 
                                                className="ai-lang-select"
                                                style={{opacity:(sourceLanguage === '' ? 0.5 : 1)}}
                                                onClick={(e) => {sourceLanguage !== '' ? setshowTarLangModal(true) : focusSourceLangDiv()}}
                                            >
                                                {targetLanguage == "" ? (
                                                    <span className="placeholder">
                                                        {t("select_target_language-2")}
                                                    </span>
                                                ) : (
                                                    <span>
                                                    {targetLanguage.length +
                                                        " " +
                                                        (targetLanguage.length > 1 ? t("languages") : t("language")) +
                                                        ` ${t("selected")}`}
                                                    </span>
                                                )}
                                                <i style={{ color: "#000000" }} className="fas fa-caret-down" />
                                            </div>
                                        </Tooltip>

                                            {/* <p>Recently used: &nbsp;
                                                {
                                                    recentlyUsedLangs?.map((eachLang, index) => {
                                                        if (index < 5) {
                                                            return (
                                                                <span className="recent-target-lang" onClick={() => handleRecentLangClick(eachLang)}>{`${eachLang?.language}${index !== 4 ? ", " : ""}`}</span>
                                                            )
                                                        }
                                                    })
                                                }
                                            </p> */}
                                        {!requirementSatisfied && targetLanguage.length <= 0 && props.required && <span className="text-danger position-absolute">{t("required")}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(isPIBNews && props.selectedtab?.id === 2) ? <>
                            <div className="glossary-setup-form">
                                <div className="glossary-form-col">
                                    <div className="glossary-input-form-field">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlFile1">{'Ministry/Department'}<span className="asterik-symbol">*</span></label>
                                            <Select
                                                options={ministryDepartmentList}
                                                value={selectedMinistryDepartment}
                                                onChange={handleMinistryDepartmentChange}
                                                placeholder="Select Ministry / Department"
                                                menuPlacement="auto"
                                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                                styles={customStepSelectStyles}
                                                isClearable={false}
                                                isSearchable={false}
                                                hideSelectedOptions={false}
                                            />
                                            {!requirementSatisfied && (selectedMinistryDepartment == null || selectedMinistryDepartment.value == undefined) && props.required && <span className="text-danger position-absolute">{t("required")}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="glossary-form-col"></div>
                            </div>
                        </> : <>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">{t("machine_translation_engine")}<span className="asterik-symbol">*</span></label>
                                        {/* <input className="input-select-width" id="project-name" name="projectName" placeholder="Enter project name..." /> */}
                                        <Select
                                            options={mtpeEngineOptions}
                                            value={selectedMTEngine}
                                            onChange={handleMTEngineChange}
                                            styles={customStepSelectStyles}
                                            classNamePrefix="steps-select"
                                            hideSelectedOptions={false}
                                            placeholder={t("select_mt")}
                                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                            isDisabled={
                                                mtpeEngineOptions.length === 0 ? true : false
                                            }
                                            isClearable={false}
                                            isSearchable={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">        
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>{t("steps")}</label>
                                        <Select
                                            isClearable={false}
                                            isSearchable={false}
                                            options={stepOptions}
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
                                            isDisabled={isEditable && !revisionStepEdit}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">  
                                <div className="glossary-input-form-field">
                                    <div className="form-group date-time-wrapper">
                                        {/* <div className="form-group"> */}
                                        <label>{t("project_deadline")}</label>
                                        <div className="date-time-pickers">
                                            <div className="dt-col">
                                                <DatePicker value={deadline} onChange={(e)=>{handleDeadLineSelected(e)}} source="glossary_project_type_selection" />
                                            </div>
                                            <div className="dt-col">
                                                {/* <TimesPicker value={deadline} onChange={(e)=>{handleDeadLineSelected(e)}} /> */}
                                                <CustomTimePicker value={Config.convertUTCToLocal(deadline)} setValue={setDeadline} assigntimepicker="default-time-picker"/>
                                                {/* <MomentTimePicker glossClass={glossClass}/> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">{t("prim_glossary_src")}</label>
                                        <input
                                            className="input-select-width"
                                            id="project-name"
                                            name="projectName"
                                            value={primaryGlossarySourceName}
                                            maxLength={20}
                                            onChange={(e) => setPrimaryGlossarySourceName(e.target.value)}
                                        />
                                        <small style={{ opacity: 0.7, float: 'right' }}>{primaryGlossarySourceName?.trim()?.length}/20</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">{t("gloss_copy_owner")}</label>
                                        <input
                                            className="input-select-width"
                                            id="project-name"
                                            name="projectName"
                                            value={glossaryCopyrightOwner}
                                            maxLength={50}
                                            onChange={(e) => setGlossaryCopyrightOwner(e.target.value)}
                                        />
                                        <small style={{ opacity: 0.7, float: 'right' }}>{glossaryCopyrightOwner?.trim()?.length}/50</small>
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">{t("details_of_prim_gloss_owner")}</label>
                                        <input
                                            className="input-select-width"
                                            id="project-name"
                                            name="projectName"
                                            maxLength={300}
                                            value={detailsOfPrimaryGlossarySourceName}
                                            onChange={(e) => setDetailsOfPrimaryGlossarySourceName(e.target.value)}
                                        />
                                        <small style={{ opacity: 0.7, float: 'right' }}>{detailsOfPrimaryGlossarySourceName?.trim()?.length}/300</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">{t("general_notes")}</label>
                                        <input
                                            className="input-select-width"
                                            id="project-name"
                                            name="projectName"
                                            maxLength={300}
                                            value={glossaryGeneralNotes}
                                            onChange={(e) => setglossaryGeneralNotes(e.target.value)}
                                        />
                                        <small style={{ opacity: 0.7, float: 'right' }}>{glossaryGeneralNotes?.trim()?.length}/300</small>
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>{t("usage_permission")}</label>
                                        <Select
                                            options={usagePermissionOptions}
                                            defaultValue={{ value: 1, label: t("private") }}
                                            value={selectedUsagePermission}
                                            onChange={handleUsagePermissionChange}
                                            styles={customStepSelectStyles}
                                            classNamePrefix="steps-select"
                                            hideSelectedOptions={false}
                                            placeholder={`${"click_to_select"}...`}
                                            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                            isSearchable={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glossary-setup-form">
                            <div className="glossary-form-col">
                                <div className="glossary-input-form-field">
                                    <div className="form-group">
                                        <label>{t("license")}</label>
                                        <input
                                            className="input-select-width"
                                            id="license"
                                            name="license"
                                            placeholder=""
                                            value={glossaryLicense}
                                            maxLength={30}
                                            onChange={(e) => setGlossaryLicense(e.target.value)}
                                        />
                                        <small style={{ opacity: 0.7, float: 'right' }}>{glossaryLicense?.trim()?.length}/30</small>
                                    </div>
                                </div>
                            </div>
                            <div className="glossary-form-col"></div>
                        </div>
                        </>}
                    </div>
                </div>
            }
            {showSrcLangModal &&
            (<Rodal visible={showSrcLangModal} {...modaloption} showCloseButton={false} className="ai-lang-select-modal">
                <div className="lang-modal-wrapper">
                    {/* <h1>Select Source Language</h1> */}
                    <span className="modal-close-btn lang-close" onClick={() => {setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false)}}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <SourceLanguage
                        sourceLanguage={sourceLanguage}
                        setshowSrcLangModal={setshowSrcLangModal}
                        showSrcLangModal={showSrcLangModal}
                        sourceLanguageOptions={sourceLanguageOptions}
                        handleSourceLangClick={handleSourceLangClick}
                        filteredResults={filteredResults} 
                        setFilteredResults={setFilteredResults}
                        searchInput={searchInput} 
                        setSearchInput={setSearchInput}
                        onFocusWrap={onFocusWrap} 
                        setOnFocusWrap={setOnFocusWrap}
                        searchAreaRef={searchAreaRef}
                    />
                </div>
            </Rodal>)}
            {showTarLangModal &&
            (<Rodal visible={showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal">
                <div className="lang-modal-wrapper">
                    {/* <h1>Select Target Language(s)</h1> */}
                    <span className="modal-close-btn lang-close" onClick={(e) => {setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false)}}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <TargetLanguage
                        targetLanguage={targetLanguage}
                        targetLanguageOptions={targetLanguageOptionsRef.current?.filter(e=>{ if(e.id != sourceLanguage) return e })}
                        handleTargetLangClick={handleTargetLangClick}
                        setshowTarLangModal={setshowTarLangModal}
                        modaloption={modaloption}
                        showTarLangModal={showTarLangModal}
                        filteredResults={filteredResults} 
                        setFilteredResults={setFilteredResults}
                        searchInput={searchInput} 
                        setSearchInput={setSearchInput}
                        onFocusWrap={onFocusWrap} 
                        setOnFocusWrap={setOnFocusWrap}
                        searchAreaRef={searchAreaRef}
                        alreadySelecetedTarLangID={alreadySelecetedTarLangID}
                        alreadySelectedTarLang={alreadySelectedTarLang}
                    />
                </div>
            </Rodal>)}
        </React.Fragment>
    );
};

export default AddNewGlossaryForm;
