import React, { useEffect, useState } from 'react'
import Draggable from "react-draggable";
import { useTranslation } from 'react-i18next';
import ReactSelect, { components } from 'react-select';
import ButtonBase from '@mui/material/ButtonBase';
import Config from '../Config';

const customProjectTypeSelectStyles = {
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
        border: state.isFocused ? "0px solid #0074D3" : "0px solid #DBDBDB",
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
        width: "300px",
        height: 40,
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

const AddGlossaryTermModal = (props) => {
    let {
        addGlossarySectionRef,
        showHideToolbarElement,
        sourceSelectionText,
        targetSelectionText,
        setSelectedGlossaryItem,
        addTermToGlossary,
        srcInputRef,
        tarInputRef,
        isTermAdding,
        documentTaskIdRef
    } = props
    
    const { t } = useTranslation();
    const [inputData, setInputData] = useState({
        source: "",
        target: ""
    })

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
    

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down" style={{ borderTopColor: "#0074D3" }} ></span>
            </components.DropdownIndicator>
        );
    };

    const handleInputDataChange = (e) => {
        let {name, value} = e.target
        setInputData({
            [name]: value
        })
        if(e.target?.value?.trim() !== ""){
            e.target.classList.remove('error-field-style')
        }
    } 

    // get machine translation for the given term
    // input => source and target word
    // output => if source given => target_mt is output
    // output => if target given => source is output
    const getTermMT = (source, target) => {
        let formData = new FormData();
        console.log(documentTaskIdRef.current)

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
                console.log('source: '+source)
                console.log('target: '+target)
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
                // setInputData({
                //     ...(source !== "" ? {source} : {target}),
                //     ...(source !== "" ? {"source": data?.target_mt} : {"target": data?.source})
                // })
                console.log({
                    ...inputData,
                    ...(source !== "" ? {"source": data?.target_mt} : {"target": data?.source})
                })
            },
            error: (err) => {
                if(err.response.data.res === 'Insufficient credits'){
                    setShowCreditAlert(true)
                }
            },
        });
    } 
    

    return (
        <Draggable enableUserSelectHack={false} cancel={"input, button"} positionOffset={{ x: '-50%', y: '-60%' }}>
            <div ref={addGlossarySectionRef} className="toolbar-parts" id="add-glossary-section">
                <div className="close-spl-char">
                    <button type="button" onClick={(e) => !showHideToolbarElement("showGlossaryAddition")} className="close-spl-char-btn">
                        &#x2715;
                    </button>
                </div>
                <div className="toolbar-part-container">
                    <h4 className="symbol-char-title">{t("add_glossary")}</h4>
                    <div className="add-glossary-section">
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
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <ButtonBase onClick={(e) => !showHideToolbarElement("showGlossaryAddition")}>{t("cancel")}</ButtonBase>
                            <ButtonBase onClick={(e) => !isTermAdding && addTermToGlossary()}>
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