import React, { useEffect, useRef, useState } from 'react'
import './on_the_fly_glossary.css'
import { ButtonBase, Popover, Popper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Select, { components } from 'react-select';
import Config from '../../../Config';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setShowGlossTermAddForm } from '../../../../features/ai-glossary/ToggleGlossTermAddFormSlice';
import Draggable from 'react-draggable';

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

const DropdownIndicator = (props) => {
    let name = props.selectProps.name
    return (
        <components.DropdownIndicator {...props}>
            <span id="triangle-down" style={{ borderTopColor: name === "pos" ? "#747474" : "#0074D3" }} ></span>
        </components.DropdownIndicator>
    );
};


export const OnTheFlyGlossary = (props) => {
    let { 
        selectedCoordinates, 
        setSelectedCoordinates,
        sourceSelectionText,
        targetSelectionText,
        defaultGlossDetailsRef,
        taskId
    } = props

    const {t} = useTranslation()
    const dispatch = useDispatch()

    const showGlossTermAddForm = useSelector(state => state.showGlossTermAddForm.value)

    const [isTermAdding, setIsTermAdding] = useState(false)
    const [inputData, setInputData] = useState({
        sl_term: "",
        tl_term: ""
    })
    const [selectedPOS, setSelectedPOS] = useState(null)

    const srcInputRef = useRef(null)
    const tarInputRef = useRef(null)

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
                sl_term: source?.trim(),
                tl_term: target?.trim()
            })
            if(source?.trim() === "" || target?.trim() === ""){
                if(source?.trim() !== "") tarInputRef.current?.focus()
                if(target?.trim() !== "") srcInputRef.current?.focus()
            }
            if(showGlossTermAddForm){
                getTermMT(source, target)
            }
        }
    }, [sourceSelectionText, targetSelectionText, showGlossTermAddForm])

    

    
    const handleClose = () => {
        setSelectedCoordinates(null)
        dispatch(setShowGlossTermAddForm(false))
    } 

    const showFormScreen = () => {
        dispatch(setShowGlossTermAddForm(true))
    } 
    
    const handleInputDataChange = (e) => {
        let {name, value} = e.target
        setInputData({
            ...inputData,
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
        // console.log(documentTaskIdRef.current)

        formData.append("task_id", taskId);
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
                        sl_term: source,
                        tl_term: data?.target_mt
                    })
                }else if(target !== ""){
                    setInputData({
                        sl_term: data?.source,
                        tl_term: target
                    })
                }
            },
            error: (err) => {
                if(err.response.data.res === 'Insufficient credits'){
                    // setShowCreditAlert(true)
                }
            },
        });
    } 

    const addTermToGlossary = () => {
        let formData = new FormData();

        if(inputData.sl_term?.trim() === "" || inputData.tl_term?.trim() === ""){
            if(inputData.sl_term?.trim() === ""){
                srcInputRef.current.classList.add('error-field-style')
            }
            if(inputData.tl_term?.trim() === ""){
                tarInputRef.current.classList.add('error-field-style')
            }
            console.log('inside validation')
            return
        }

        formData.append('sl_term', inputData?.sl_term);
        formData.append('tl_term', inputData?.tl_term);
        if(selectedPOS?.value) formData.append('pos', selectedPOS?.label);
        formData.append("task", taskId);

        let url = `${Config.BASE_URL}/glex/term_upload/`

        setIsTermAdding(true)


        Config.axios({
            url: url,
            method: "POST",
            auth: true,
            data: formData,
            success: (response) => {
                // getWordChoiceListForDocument()
                setIsTermAdding(false)
                Config.toast(t("term_added_success"))
                handleClose()
                // showHideToolbarElement("showGlossaryAddition")
            },
            error: (error) => { 
                console.log(error)
                if(error?.response?.status == 400){
                    Config.toast(t("term_already_exist"),'warning');
                }else{
                    Config.toast("Failed to add term!", "error")

                }
                setIsTermAdding(false)
            },
        });
    } 

    useEffect(() => {
      console.log(inputData)
    }, [inputData])
    

    return (
        <>
            <Draggable onDrag={(e) => e.preventDefault()} positionOffset={{x: selectedCoordinates?.x, y: selectedCoordinates?.bottom }}  enableUserSelectHack={false} cancel={"input, button"}>
                {/* <Popper
                    open={selectedCoordinates !== null}
                    anchorEl={{
                        getBoundingClientRect: () => ({
                        top: selectedCoordinates?.bottom,
                        left: selectedCoordinates?.left,
                        bottom: selectedCoordinates?.bottom,
                        right: selectedCoordinates?.left,
                        width: 0,
                        height: 0,
                        }),
                    }}
                    placement="bottom-start"
                    className="z-[9]"
                > */}
                    <div className="otf-glossary-wrapper">
                        {!showGlossTermAddForm ? (
                            <button className="add-to-glos-btn" onClick={showFormScreen}>
                                Add to glossary
                            </button>
                        ) : (
                            <div className="form-wrapper">
                                <p className="form-heading">
                                    Add to glossary
                                </p>
                                <div className="add-glossary-section">
                                    <div className="add-glossary-row">
                                        <label>{t("source_language_term")}</label>
                                        <input 
                                            className="add-glossary-input form-control"
                                            name='sl_term'
                                            ref={srcInputRef}
                                            value={inputData?.sl_term}
                                            onChange={handleInputDataChange}
                                        />
                                    </div> 
                                    <div className="add-glossary-row">
                                        <label>{t("target_language_term")}</label>
                                        <input 
                                            className="add-glossary-input form-control" 
                                            name='tl_term'
                                            ref={tarInputRef}
                                            value={inputData?.tl_term}
                                            onChange={handleInputDataChange}
                                        />
                                    </div>
                                    <div className="add-glossary-row">
                                        <label>{t("parts_of_speech")}</label>
                                        <div className='pos-wrapper'>
                                            <Select 
                                                name="pos"
                                                options={partOfSpeechOptions}
                                                isSearchable={true}
                                                menuPlacement="auto"
                                                styles={posSelectStyle}
                                                value={selectedPOS}
                                                placeholder={t("select")}
                                                components={{DropdownIndicator, IndicatorSeparator: () => null}}
                                                onChange={(selectOption) => setSelectedPOS(selectOption)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="confirm-bottom mt-3">
                                    <div className='flex space-x-3'>
                                        <button 
                                            className='cancel-btn w-1/2'
                                            onClick={handleClose}
                                        >
                                            {t("cancel")}
                                        </button>
                                        <button 
                                            className='add-btn w-1/2'
                                            onClick={addTermToGlossary}
                                        >
                                            {!isTermAdding ? t("add_term") : t("adding")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    
                


                {/* </Popper> */}
            </Draggable>

        </>
        // <Popover
        //     open={selectedCoordinates !== null}
        //     anchorReference="anchorPosition"
        //     anchorPosition={
        //         selectedCoordinates
        //         ? { left: selectedCoordinates.left - 20, top: selectedCoordinates.bottom }
        //         : undefined
        //     }
        //     onClose={handleClose}
        //     disableEnforceFocus={true}
        //     // disableAutoFocus={true}
        //     // disableRestoreFocus
        //     // BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        // >
        //     <div className="otf-glossary-wrapper">
        //         <button className="add-to-glos-btn">
        //         Add to glossary
        //         </button>
        //     </div>
        // </Popover>
    )
}
