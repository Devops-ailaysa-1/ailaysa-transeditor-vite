import React, { useState, useEffect, createRef, useRef } from 'react'
import Config from '../Config'
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Select, { components } from "react-select";
import ButtonBase from '@mui/material/ButtonBase';
import { useTranslation } from "react-i18next";
import { ButtonLoader } from '../../loader/CommonBtnLoader';
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import ArrowRightColor from "../../assets/images/new-ui-icons/arrow_right_alt_color.svg"

function GlossaryClone(props) {
    const { t } = useTranslation();
    const { setShowCloneModal, selectedProjectFiles, showCloneModal, languageOptionsList } = props
    const [sourceTermSelect, setSourceTermSelect] = useState({
        singleToMultiple: true,
        multipleToSingle: false,
    });
    const [singleTermPairSelected, setSingleTermPairSelected] = useState({});
    const [multipleTermPairSelected, setMultipleTermPairSelected] = useState([]);
    const [fromTaskList, setFromTaskList] = useState([])
    const [toTaskList, setToTaskList] = useState(null)
    const [cloneFormValidation, setCloneFormValidation] = useState({
        single: false,
        multiple: false
    })
    const [isTransferring, setIsTransferring] = useState(false)
    
    const fromTaskListRef = useRef(null)
    const toTaskListRef = useRef(null)

    // const CustomCellCheckbox = withStyles({
    //     root: {
    //         color: "#5F6368",
    //         // width: 15,
    //         // height: 15,
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


    // const CustomCellRadiobtn = withStyles({
    //     root: {
    //         color: "#5F6368",
    //         "&$checked": {
    //             color: "#0078D4",
    //             "&:hover": {
    //                 backgroundColor: "#E5F1FB",
    //             },
    //         },
    //     },
    //     checked: {},
    // })(Radio);

    // const CustomCellOptionRadiobtn = withStyles({
    //     root: {
    //         color: "#5F6368",
    //         padding: 0,
    //         "&$checked": {
    //             color: "#0078D4",
    //             "&:hover": {
    //                 backgroundColor: "#E5F1FB",
    //             },
    //         },
    //     },
    //     checked: {},
    // })(Radio);

    const glossaryTermOptions = [
        { value: 1, label: "Tamil->Telugu"},
        { value: 2, label: "Tamil->English"},
    ];

    const handleSingleTermSelected = (selected) => {
        setSingleTermPairSelected(selected);
        if(sourceTermSelect.singleToMultiple){
            setMultipleTermPairSelected([])
        }
        setCloneFormValidation({
            ...cloneFormValidation, single: false
        })
    };

    useEffect(() => {
        if(showCloneModal){
            resetTransferForm()
        }
    }, [showCloneModal])
    

    const handleMultipleTermSelected = (selected) => {
        if(sourceTermSelect.multipleToSingle){
            setSingleTermPairSelected({})
        }
        setMultipleTermPairSelected(selected);
        setCloneFormValidation({
            ...cloneFormValidation, multiple: false
        })
    };

    const cloneDropDownStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#74788D",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "16px 0px",
            boxShadow: "0px 2px 8px #0000002E",
            borderRadius: "4px",
            width: "365px"
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            background: state.isSelected ? "#E8F0FE" : "#ffffff",
            // opacity: state.isDisabled ? 0.5 : 1,
            // cursor: state.isDisabled ? "context-menu" : "pointer",
            display: "flex",
            marginBottom: "0.5rem",
            padding: "5px 8px",
            "&:hover": {
                background: "#F4F5F7",
                cursor: state.isDisabled ? "context-menu" : "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "2px solid #0074D3" : "1px solid #DBDBDB",
            borderRadius: 3,
            transtion: 0.3,
            color: state.isFocused ? "#292929" : "#292929",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "500",
            lineHeight: "24px",
            boxShadow: 0,
            height: 44,
            width: "350px",
            padding: "0px 8px 0px 11px",
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    const SingleOption = (props) => {
        return (
            <div>
                <components.Option {...props} className="src-term-options-list">
                    <Radio
                        className="src-term-options-list-checkbox" 
                        checked={props.isSelected} 
                        onChange={() => null} 
                    />
                    <label className="src-term-options-list-label">
                        <span className={props.isSelected ? "bg-capsule" : ""}>{props.label?.toString()?.replace("->", " ")?.split(" ")[0]}</span>
                        <img src={ArrowRightColor}/>
                        <span className={props.isSelected ? "bg-capsule" : ""}>{props.label?.toString()?.replace("->", " ")?.split(" ")[1]}</span>
                    </label>
                </components.Option>
            </div>
        );
    };

    const MultipleOption = (props) => {
        // let isSelected = multipleTermPairSelected?.find(each => each.label === props.label)
        return (
            <div>
                <components.Option {...props} className="src-term-options-list">
                    <Checkbox 
                        className="src-term-options-list-checkbox" 
                        checked={props.isSelected} 
                        onChange={() => null} 
                    />
                    <label className="src-term-options-list-label">
                        <span className={props.isSelected && "bg-capsule"}>{props.label?.toString()?.replace("->", " ")?.split(" ")[0]}</span>
                        <img src={ArrowRightColor}/>
                        <span className={props.isSelected && "bg-capsule"}>{props.label?.toString()?.replace("->", " ")?.split(" ")[1]}</span>
                    </label>
                </components.Option>
            </div>
        );
    };

    const ValueContainer = ({ children, ...props }) => {
        let [values, input] = children;
      
        if (Array.isArray(values)) {
        //   const plural = values.length === 1 ? "" : "s";
          values = `${values.length} ${values.length === 1 ? t("item_sm") : t("items_sm")} ${t("selected")}`;
        }
      
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
      if(selectedProjectFiles?.length !== 0){
        let fromList = []
        selectedProjectFiles?.map((each) => {
            // Tamil->Telugu
            if(each?.progress?.source_words !== 0){
                fromList.push({
                    value: each.id,
                    label: `${getLanguageNameFromId(each.source_language)}->${getLanguageNameFromId(each.target_language)}`  
                })
            }
        })
        fromTaskListRef.current = fromList
        setSingleTermPairSelected(fromList[0])
        setFromTaskList(fromList)
      }
    }, [selectedProjectFiles])

    useEffect(() => {
      if(selectedProjectFiles?.length !== 0){
        let fromList = []
        selectedProjectFiles?.map((each) => {
            // Tamil->Telugu
            fromList.push({
                value: each.id,
                label: `${getLanguageNameFromId(each.source_language)}->${getLanguageNameFromId(each.target_language)}`  
            })
        })
        toTaskListRef.current = fromList
        setToTaskList(fromList)
      }
    }, [selectedProjectFiles])

    
    useEffect(() => {
        if(singleTermPairSelected?.value !== undefined){
            if(sourceTermSelect.singleToMultiple){
                // let toList = fromTaskList?.filter(each => each.value !== singleTermPairSelected.value)
                // setToTaskList(toList)
                setToTaskList(toTaskListRef.current?.filter(each => each.value !== singleTermPairSelected.value))
            }
        }
    }, [singleTermPairSelected])

    useEffect(() => {
      if(sourceTermSelect.multipleToSingle){
        // let toList = fromTaskList.filter(o1 => !multipleTermPairSelected.some(o2 => o1.value === o2.value))
        let toList = toTaskListRef.current?.filter(o1 => !multipleTermPairSelected.some(o2 => o1.value === o2.value))
        setToTaskList(toList)
      }
    }, [multipleTermPairSelected])
    
    const getLanguageNameFromId = (id) => {
        return languageOptionsList?.find(each => each.id == id)?.language
    } 

    // funtion to remove each job 
    const removeParticularTaskFromList = (taskID) => {
        setMultipleTermPairSelected(multipleTermPairSelected?.filter(each => each.value !== taskID))
    }

    const handleFromSwitch = () => {
        setSourceTermSelect({...sourceTermSelect, singleToMultiple: true, multipleToSingle: false})
        resetTransferForm('from-switch')
    } 
    const handleToSwitch = () => {
        setSourceTermSelect({...sourceTermSelect, singleToMultiple: false, multipleToSingle: true})
        resetTransferForm()
    } 

    const transferSingleToMultiple = () => {
        let toIdsParams = ""
        multipleTermPairSelected?.forEach(each => {
            toIdsParams += `&copy_to_ids=${each.value}`
        })
        setIsTransferring(true)
        let params = {
            url: `${Config.BASE_URL}/glex/clone_source_terms_from_single_to_multiple_task/?copy_from_task_id=${singleTermPairSelected.value}${toIdsParams}`,
            auth: true,
            success: (response) => {
                Config.toast(t("src_terms_cloned"));
                setIsTransferring(false)
                setShowCloneModal(false)
                resetTransferForm()
            },
            error: (err) => {
                Config.toast(t("transfer_failed"));
                setIsTransferring(false)
            }
        };
        Config.axios(params);
    };

    const transferMultipleToSingle = () => {
        let fromIdsParams = ""
        multipleTermPairSelected?.forEach(each => {
            fromIdsParams += `&copy_from_task_id=${each.value}`
        })
        setIsTransferring(true)
        let params = {
            url: `${Config.BASE_URL}/glex/clone_source_terms_from_multiple_to_single_task/?task_id=${singleTermPairSelected.value}${fromIdsParams}`,
            auth: true,
            success: (response) => {
                Config.toast(t("src_terms_cloned_success"));
                setShowCloneModal(false)
                setIsTransferring(false)
                resetTransferForm()
            },
            error: (err) => {
                Config.toast(t("transfer_failed"));
                setIsTransferring(false)
            }
        };
        Config.axios(params);
    };

    const resetTransferForm = (param) => {
        if(param === 'from-switch'){
            setSingleTermPairSelected(fromTaskListRef.current[0])
        }else{
            setSingleTermPairSelected({})
        }
        setMultipleTermPairSelected([])
        setCloneFormValidation({
            single: false,
            multiple: false
        })
    } 

    const isCloneFormValid = () => {
        if(Object.keys(singleTermPairSelected).length === 0 && multipleTermPairSelected?.length === 0){
            setCloneFormValidation({single: true, multiple: true})
            return false
        }
        if(Object.keys(singleTermPairSelected).length === 0){
            setCloneFormValidation({...cloneFormValidation, single: true})
            return false
        }
        if(multipleTermPairSelected?.length === 0){
            setCloneFormValidation({...cloneFormValidation, multiple: true})
            return false
        }
        return true
    } 





    return (
        <React.Fragment>
            <div className="glossary-clone-wrapper" style={isTransferring ? {pointerEvents: 'none'} : {}}>
                <div className="clone-header">
                    <h1 className="title">{t("transfer_src_term_from")}</h1>
                    <div className="radio-btn-row">
                        <div className="btn-form-group">
                            <Radio
                                checked={sourceTermSelect.singleToMultiple}
                                className="cell-box-radio"
                                size="small"
                                id="sourceTermSelectone"
                                onChange={() => handleFromSwitch()}
                            />
                            <label htmlFor="sourceTermSelectone">{t("single_to_multiple_jobs")}</label>
                        </div>
                        <div className="btn-form-group">
                            <Radio
                                checked={sourceTermSelect.multipleToSingle}
                                className="cell-box-radio"
                                size="small"
                                id="sourceTermSelecttwo"
                                onChange={() => handleToSwitch()}
                            />
                            <label htmlFor="sourceTermSelecttwo">{t("multiple_to_single_jobs")}</label>
                        </div>
                    </div>
                </div>
                <div className="clone-body">
                    <div className="clone-col">
                        <div className="select-source-term-form-grp">
                            <label>{t("from")}</label>
                            <Select
                                isClearable={false}
                                isSearchable={false}
                                options={fromTaskList}
                                value={sourceTermSelect.singleToMultiple && singleTermPairSelected || sourceTermSelect.multipleToSingle && multipleTermPairSelected}
                                isMulti={sourceTermSelect.singleToMultiple && false || sourceTermSelect.multipleToSingle && true}
                                styles={cloneDropDownStyles}
                                menuPlacement="auto"
                                classNamePrefix="source-term-select"
                                closeMenuOnSelect={sourceTermSelect.multipleToSingle && false || sourceTermSelect.singleToMultiple && true}
                                hideSelectedOptions={false}
                                placeholder={sourceTermSelect.multipleToSingle && t("select_jobs") || sourceTermSelect.singleToMultiple && t("select_job")}
                                components={{ 
                                    Option: sourceTermSelect.singleToMultiple && SingleOption || sourceTermSelect.multipleToSingle && MultipleOption, 
                                    DropdownIndicator, 
                                    ValueContainer, 
                                    IndicatorSeparator: () => null
                                }}
                                onChange={sourceTermSelect.singleToMultiple && handleSingleTermSelected || sourceTermSelect.multipleToSingle && handleMultipleTermSelected}
                                // allowSelectAll={true}
                            />
                        </div> 
                        {(cloneFormValidation.multiple ||cloneFormValidation.single)  && <small style={{color: 'red'}}>{t('required')}</small>}
                        {
                            sourceTermSelect.singleToMultiple ?
                                (
                                    Object.keys(singleTermPairSelected).length !== 0 ?
                                    <div className="clone-single-file">
                                        <div className="language-pair">
                                            <span>{singleTermPairSelected?.label?.toString()?.replace("->", " ")?.split(" ")[0]}</span>
                                            <img src={ArrowRightColor}/>
                                            <span>{singleTermPairSelected?.label?.toString()?.replace("->", " ")?.split(" ")[1]}</span>
                                        </div>
                                    </div> : null
                                )
                                :
                                (
                                    multipleTermPairSelected?.length !== 0 &&
                                    <div className="clone-multiple-list-wrapper">
                                        {
                                            multipleTermPairSelected?.map((item) => {
                                                return(
                                                    <div key={item.value} className="clone-multiple-file">
                                                        <div className="language-pair">
                                                            <span>{item?.label?.toString()?.replace("->", " ")?.split(" ")[0]}</span>
                                                            <img src={ArrowRightColor}/>
                                                            <span>{item?.label?.toString()?.replace("->", " ")?.split(" ")[1]}</span>
                                                        </div>
                                                        <span className="close" onClick={() => removeParticularTaskFromList(item.value)}>
                                                            <img src={CloseBlack} alt="close_black" />
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) 
                        }             
                    </div>
                    <div className="clone-col">
                        <div className="select-source-term-form-grp">
                            <label>{t("to")}</label>
                            <Select
                                isClearable={false}
                                isSearchable={false}
                                options={toTaskList}
                                isMulti={sourceTermSelect.multipleToSingle && false || sourceTermSelect.singleToMultiple && true}
                                styles={cloneDropDownStyles}
                                menuPlacement="auto"
                                value={sourceTermSelect.singleToMultiple && multipleTermPairSelected || sourceTermSelect.multipleToSingle && singleTermPairSelected}
                                classNamePrefix="source-term-select"
                                closeMenuOnSelect={sourceTermSelect.multipleToSingle && true || sourceTermSelect.singleToMultiple && false}
                                multipleTermPairSelected={multipleTermPairSelected}
                                hideSelectedOptions={false}
                                placeholder={sourceTermSelect.multipleToSingle && t("select_job") || sourceTermSelect.singleToMultiple && t("select_jobs")}
                                components={{ 
                                    Option: sourceTermSelect.multipleToSingle && SingleOption || sourceTermSelect.singleToMultiple && MultipleOption,  
                                    DropdownIndicator, 
                                    ValueContainer, 
                                    IndicatorSeparator: () => null 
                                }}
                                onChange={sourceTermSelect.multipleToSingle && handleSingleTermSelected || sourceTermSelect.singleToMultiple && handleMultipleTermSelected}
                                // allowSelectAll={true}
                            />
                        </div>
                        {(cloneFormValidation.multiple || cloneFormValidation.single) && <small style={{color: 'red'}}>{t('required')}</small>}
                        {
                            sourceTermSelect.multipleToSingle ?
                                (
                                    Object.keys(singleTermPairSelected).length !== 0 ?
                                    <div className="clone-single-file">
                                        <div className="language-pair">
                                            <span>{singleTermPairSelected?.label?.toString()?.replace("->", " ")?.split(" ")[0]}</span>
                                            <img src={ArrowRightColor}/>
                                            <span>{singleTermPairSelected?.label?.toString()?.replace("->", " ")?.split(" ")[1]}</span>
                                        </div>
                                    </div> : null
                                )
                                :
                                (
                                    multipleTermPairSelected?.length !== 0 &&
                                    <div className="clone-multiple-list-wrapper">
                                        {
                                            multipleTermPairSelected?.map((item) => {
                                                return(
                                                    <div key={item.value} className="clone-multiple-file">
                                                        <div className="language-pair">
                                                            <span>{item?.label?.toString()?.replace("->", " ")?.split(" ")[0]}</span>
                                                            <img src={ArrowRightColor}/>
                                                            <span>{item?.label?.toString()?.replace("->", " ")?.split(" ")[1]}</span>
                                                        </div>
                                                        <span className="close" onClick={() => removeParticularTaskFromList(item.value)}>
                                                            <img src={CloseBlack} alt="close_black" />
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                        }  
                    </div>
                </div>
                <div className="clone-footer">
                    <div className="clone-button-row">
                        <ButtonBase onClick={() =>  {setShowCloneModal(false); resetTransferForm();}} className="clone-close-btn">{t("close")}</ButtonBase>
                        <ButtonBase 
                        className="clone-transfer-btn"
                        style={isTransferring ? {display: 'flex', alignItems: 'baseline', gap: '5px'} : {}}
                        onClick={() => {!isTransferring && (
                            ((sourceTermSelect.singleToMultiple && isCloneFormValid ()) && transferSingleToMultiple()) ||
                            ((sourceTermSelect.multipleToSingle  && isCloneFormValid()) && transferMultipleToSingle())
                        ) 
                        }}>
                            {isTransferring ? <><ButtonLoader /> {t("transferring")}</> : t("transfer")}
                        </ButtonBase>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default GlossaryClone