import React, { useEffect, useRef, useState } from 'react'
import Draggable from "react-draggable";
import { useTranslation } from 'react-i18next';
import Select, { components } from 'react-select';
import ButtonBase from '@mui/material/ButtonBase';
import Config from '../Config';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';

const wordchoicelistSelectStyle = {
    placeholder: (provided, state) => ({
        ...provided,
        color: "#0074D3",
        fontFamily: "Roboto",
        fontSize: "13px",
        fontWeight: "500",
        lineHeight: "24px",
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px 6px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #0000000D",
        borderRadius: "4px",
        zIndex: 5
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
        border: "1px solid #0074D3",
        backgroundColor: "#E8F0FE",
        borderRadius: 4,
        transtion: 0.3,
        color: "#0074D3",
        fontFamily: "Roboto",
        fontSize: "13px",
        fontWeight: "normal",
        lineHeight: "24px",
        boxShadow: 0,
        padding: "0px 10px",
        width: "100%",
        height: 40,
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

const posSelectStyle = {
    placeholder: (provided, state) => ({
        ...provided,
        color: "#1D1F20",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "24px",
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px 6px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #0000000D",
        borderRadius: "4px",
        zIndex: 5
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
        fontSize: "14px",
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
        border: "1px solid #C0C8CE",
        backgroundColor: "",
        borderRadius: 4,
        transtion: 0.3,
        color: "#0074D3",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "normal",
        lineHeight: "24px",
        boxShadow: 0,
        padding: "0px 4px",
        width: "100%",
        height: 40,
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

const AddGlossaryTermModal = (props) => {
    let {
        wordChoicelist,
        addGlossarySectionRef,
        showHideToolbarElement,
        sourceSelectionText,
        targetSelectionText,
        selectedWordChoiceItem,
        setSelectedWordChoiceItem,
        addTermToGlossary,
        srcInputRef,
        tarInputRef,
        isTermAdding,
        documentTaskIdRef,
        setShowCreditAlert,
        selectedWordChoicePOS,
        setSelectedWordChoicePOS,
        documentDetailsRef,
        termAddModalPositionRef,
        setIsTermAdding
    } = props
    
    const { t } = useTranslation();
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value)
    const [inputData, setInputData] = useState({
        source: "",
        target: ""
    })
    const [projectName, setProjectName] = useState("")
    const [isNewWordchoice, setIsNewWordchoice] = useState(false)

    const projectNameRef = useRef(null)

    const partOfSpeechOptions = [
        { value: 1, label: t("partsSpeech_verb") },
        { value: 2, label: t("partsSpeech_noun") },
        { value: 3, label: t("partsSpeech_adjective") },
        { value: 4, label: t("partsSpeech_adverb") },
    ];

    useEffect(() => {
        let source = sourceSelectionText
        let target = targetSelectionText
        if(source?.trim() !== "" || target !== ""){
            setInputData({
                source: source?.trim(),
                target: target?.trim()
            })
            if(source?.trim() === "" || target?.trim() === ""){
                if(source?.trim() !== "") tarInputRef.current.focus()
                if(target?.trim() !== "") srcInputRef.current.focus()
            }
            getTermMT(source, target)
        }
    }, [sourceSelectionText, targetSelectionText])

    useEffect(() => {
        if(isNewWordchoice){
            projectNameRef.current?.focus()
        }
    }, [isNewWordchoice])
    

    const DropdownIndicator = (props) => {
        let name = props.selectProps.name
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down" style={{ borderTopColor: name === "pos" ? "#747474" : "#0074D3" }} ></span>
            </components.DropdownIndicator>
        );
    };

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value)
        if(e.target?.value?.trim() !== ""){
            e.target.classList.remove('error-field-style')
        }
    } 

    const handleInputDataChange = (e) => {
        let {name, value} = e.target
        setInputData({
            [name]: value
        })
        if(e.target?.value?.trim() !== ""){
            e.target.classList.remove('error-field-style')
        }
    } 

    const handleAddTermBtn = (e) => {
        if(isTermAdding) return
        if(isNewWordchoice){
            
            if(projectName?.trim() === "" || projectName?.trim() === undefined) {
                projectNameRef.current.classList.add('error-field-style')
                return
            }
            createWordchoiceProject()
            return
        }
        addTermToGlossary()
    } 

    const createWordchoiceProject = () => {
        let formData = new FormData();

        let {source_language_id, target_language_id} = documentDetailsRef.current

        formData.append("source_language", source_language_id);

        formData.append("target_languages", target_language_id);

        formData.append("project_type", "10")

        if (projectName !== null && projectName?.trim() !== "") {
            formData.append("project_name", projectName);
        }
 
        setIsTermAdding(true)
        
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                // createdProjectIdRef.current = response.data.id
                
                addTermToGlossary(response.data?.glossary_id)

            },
            error: (err) => {
                setIsTermAdding(false)
                Config.toast("Something went wrong", 'warning')
                // setShowCreateLoader(false);
            }
        });
    } 

    // get machine translation for the given term
    // input => source and target word
    // output => if source given => target_mt is output
    // output => if target given => source is output
    const getTermMT = (source, target) => {
        let formData = new FormData();
        // console.log(documentTaskIdRef.current)

        formData.append("task_id", documentTaskIdRef.current);
        if(source !== "") formData.append("source", source);
        else if(target !== "") formData.append("target", target);

        Config.axios({
            url: `${Config.BASE_URL}/glex/term_mt/`,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                let data = response.data
                // console.log('source: '+source)
                // console.log('target: '+target)
                if(source !== ""){
                    setInputData({
                        source: source,
                        target: data?.target_mt
                    })
                }else if(target !== ""){
                    setInputData({
                        source: data?.source,
                        target: target
                    })
                }
            },
            error: (err) => {
                if(err.response.data.res === 'Insufficient credits'){
                    setShowCreditAlert(true)
                }
            },
        });
    } 
    
    return (
        <Draggable onDrag={(e) => e.preventDefault()} positionOffset={termAddModalPositionRef.current} enableUserSelectHack={false} cancel={"input, button"}>
            <div ref={addGlossarySectionRef} className="toolbar-parts" id="add-glossary-section">
                <div className="close-spl-char">
                    <button type="button" onClick={(e) => !showHideToolbarElement("showGlossaryAddition")} className="close-spl-char-btn">
                        &#x2715;
                    </button>
                </div>
                <div className="toolbar-part-container">
                    <h4 className="symbol-char-title mb-4">{isDinamalar ? t("add_glossary") : t("add_wordchoice")}</h4>
                    <div className="add-glossary-section">
                        {!isDinamalar && (
                            <div className="add-glossary-row">
                                <label>{t("wordchoice")}</label>
                                <div style={{flex: 1, marginLeft: '-9px'}}>
                                    <Radio
                                        checked={isNewWordchoice}
                                        className="cell-box-radio"
                                        size="small"
                                        id="new"
                                        onChange={() => setIsNewWordchoice(true)}
                                    />
                                    <label htmlFor="new" className="radio-btn-label mr-3">{t("new")}</label>
                                    <Radio
                                        checked={!isNewWordchoice}
                                        className="cell-box-radio"
                                        size="small"
                                        id="existing"
                                        onChange={() => setIsNewWordchoice(false)}
                                    />
                                    <label htmlFor="existing" className="radio-btn-label">{t("existing")}</label>
                                </div>
                            </div>
                        )}

                        {!isDinamalar && (
                            <div className="add-glossary-row">
                                {isNewWordchoice ? (
                                    <>
                                        <label>{t("new_wordchoices_name")}</label>
                                        <input 
                                            className="add-glossary-input form-control"
                                            ref={projectNameRef}
                                            value={projectName}
                                            onChange={handleProjectNameChange}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <label>{t("select_wordchoice")}</label>
                                        <div style={{flex: 1}}>
                                            <Select 
                                                name="word-choice-list"
                                                options={wordChoicelist}
                                                isSearchable={true}
                                                isDisabled={wordChoicelist?.length !== 0 ? false : true}
                                                styles={wordchoicelistSelectStyle}
                                                value={selectedWordChoiceItem}
                                                placeholder={wordChoicelist?.length !== 0 ? t("select_wordchoice") : t("wordchoice_1")}
                                                components={{ ...(wordChoicelist?.length !== 0 ? {DropdownIndicator} : {DropdownIndicator: () => null}), IndicatorSeparator: () => null }}
                                                onChange={(selectOption) => setSelectedWordChoiceItem(selectOption)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        <div className="add-glossary-row">
                            <label>{t("source_language_term")}</label>
                            <input 
                                className="add-glossary-input form-control"
                                name='source'
                                ref={srcInputRef}
                                value={inputData?.source}
                                onChange={handleInputDataChange}
                            />
                        </div> 
                        <div className="add-glossary-row">
                            <label>{t("target_language_term")}</label>
                            <input 
                                className="add-glossary-input form-control" 
                                name='target'
                                ref={tarInputRef}
                                value={inputData?.target}
                                onChange={handleInputDataChange}
                            />
                        </div>
                        <div className="add-glossary-row">
                            <label>{t("parts_of_speech")}</label>
                            <div style={{flex: 1}}>
                                <Select 
                                    name="pos"
                                    options={partOfSpeechOptions}
                                    isSearchable={true}
                                    menuPlacement="auto"
                                    styles={posSelectStyle}
                                    value={selectedWordChoicePOS}
                                    placeholder={t("select")}
                                    components={{DropdownIndicator, IndicatorSeparator: () => null}}
                                    onChange={(selectOption) => setSelectedWordChoicePOS(selectOption)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <ButtonBase onClick={(e) => !showHideToolbarElement("showGlossaryAddition")}>{t("cancel")}</ButtonBase>
                            <ButtonBase onClick={(e) => handleAddTermBtn(e)}>
                                {!isTermAdding ? t("add_term") : t("adding")}
                            </ButtonBase>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default AddGlossaryTermModal