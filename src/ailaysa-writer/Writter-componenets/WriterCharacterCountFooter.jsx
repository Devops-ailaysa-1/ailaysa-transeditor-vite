import React, {useState, useEffect} from 'react'
import Select, { components } from "react-select";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
        width: 150,
        height: 80,
        zIndex: 1080,
        right: "0px",
        bottom: "-8px"
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
        border: state.isFocused ? "0px solid #0074D3" : "0px solid #D3D8DC",
        outline: state.isFocused ? "0px solid #0074D3" : "none",
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
        minWidth: 140,
        width: "100%",
        minHeight: 20,
        height: state.isFocused ? 20 : 20,
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

const customZoomProjectTypeSelectStyles = {
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
        width: "100%",
        height: "auto",
        zIndex: 1080,
        left: "0px",
        bottom: "10px"
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
        border: state.isFocused ? "0px solid #0074D3" : "0px solid #D3D8DC",
        outline: state.isFocused ? "0px solid #0074D3" : "none",
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
        minWidth: 80,
        width: "100%",
        minHeight: 20,
        height: state.isFocused ? 20 : 20,
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

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <span id="triangle-down"></span>
        </components.DropdownIndicator>
    );
};

const WriterCharacterCountFooter = (props) => {
    let {
        currentSummerNoteTextData,
        zoomLevel,
        setZoomLevel
    } = props

    const { t } = useTranslation();
    const writerWordCount = useSelector((state) => state.writerWordCounts.value)
    const writerSelectionWordCount = useSelector((state) => state.writerSelectionCount.value)
	const [selectedZoomLevel, setSelectedZoomLevel] = useState(1);

    const wordOptions = [
        {
            value: "char",
            label: `${writerWordCount.char} character`
        },
        {
            value: "word",
            label: `${writerWordCount.word} words`
        }
    ]

    const [selectedCount, setSelectedCount] = useState(wordOptions[1])

    // it triggers a rerender to get the updated the counts in the select component
    useEffect(() => {
        if(selectedCount?.value === 'char'){
            setSelectedCount(wordOptions[0])
        }else{
            setSelectedCount(wordOptions[1])
        }
    }, [writerWordCount])

    const handleZoomSelect = e => {
		setSelectedZoomLevel(e.value);
		setZoomLevel(e.value)
	};
    
    const zoomScaling = [
		{
			value: 0.5,
			label: "50%"
		},
		{
			value: 0.7,
			label: "75%"
		},
		{
			value: 0.9,
			label: "90%"
		},
		{
			value: 1,
			label: "100%"
		},
		{
			value: 1.2,
			label: "125%"
		},
		{
			value: 1.5,
			label: "150%"
		},
		{
			value: 2,
			label: "200%"
		}
	]


    return (
        <>
            <div className="ailaysa-footer-wraps">
                <div className="ai-writer-inner-row">
                    <div className="book-translation-wrapper">
                        {/* <Select
                            styles={customZoomProjectTypeSelectStyles}
                            options={zoomScaling}
                            value={zoomScaling.find(function(option) {
                                return option.value === selectedZoomLevel;
                            })}
                            // menuIsOpen={true}
                            menuPlacement="top"
                            onChange={handleZoomSelect}
                            classNamePrefix="pdf-scaling-select"
                            hideSelectedOptions={false}
                            placeholder=""
                            components={{DropdownIndicator, IndicatorSeparator: () => null }}
                            isSearchable={false}
                        /> */}
                        {/* <ButtonBase className="writter-sheet-tabs">
                                <div className="btn-text-wrap">
                                    <span>Book translation</span>
                                    <ArrowDropDownIcon />
                                </div>
                            </ButtonBase>
                            <ButtonBase className="writter-sheet-tabs">
                                <div className="btn-text-wrap">
                                    <span>Book translation</span>
                                    <ArrowDropDownIcon />
                                </div>
                            </ButtonBase> */}
                    </div>
                    <div className="word-wrap-wrapper">
                        <span className="word-count-number2 word-count-number hidden">{currentSummerNoteTextData?.current}</span>
                        <span className="word-count-number-str hidden" style={{ marginLeft: '5px' }}>{t("characters")}</span>
                        <div style={{display: 'flex', alignItems: 'baseline'}}>
                            {writerSelectionWordCount.char !== 0 && (
                                <span className='writer-selection-count'>{selectedCount.value === 'char' ? writerSelectionWordCount.char : writerSelectionWordCount.word} of </span>
                            )}
                            <Select
                                styles={customProjectTypeSelectStyles}
                                options={wordOptions}
                                classNamePrefix="word-select"
                                hideSelectedOptions={false}
                                menuPlacement="top"
                                placeholder=""
                                // defaultValue={wordOptions[0]}
                                value={selectedCount}
                                onChange={(selectedOption) => setSelectedCount(selectedOption)}
                                components={{DropdownIndicator, IndicatorSeparator: () => null }}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WriterCharacterCountFooter