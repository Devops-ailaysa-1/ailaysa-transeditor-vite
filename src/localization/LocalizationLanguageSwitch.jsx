import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import { languages } from "./languagesOptions";
import Select, { components } from "react-select";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

function LocalizationLanguageSwitch() {
    // Localizaton constraints
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    
    const [language, setLanguage] = useState(currentLanguageCode);
    const [languageList, setLanguageList] = useState([]);
    const [SelectedLanguageList, setSelectedLanguageList] = useState({});

    const customStyles = {
        // valueContainer: (base) => ({
        //     ...base,
        //     padding: "0 0 0 25px",
        // }),
        menu: (provided, state) => ({
            ...provided,
            padding: "8px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            // width: "90px",
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
            borderRadius: state.isSelected ? 0 : 0,
            transtion: "0.3s all ease",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 1.5,
            color: "#ffffff",
            width: "120px",
            minHeight: 30,
            background: "transparent",
            boxShadow: state.isFocused ? 0 : 0,
            border: state.isFocused ? "0px solid #0078D4" : "0px solid #CED4DA",
            // borderBottom: state.isFocused ? "2px solid #0078D4" : "1px solid #CED4DA",
            height: state.isFocused ? 32 : 32,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    useEffect(() => {
        let language_list = [];
        languages.map((lang) => language_list.push({ value: lang.code, label: lang.name }));
        setLanguageList(language_list);
    }, [languages]);

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <i style={{ color: "#ffffff", paddingLeft: "0.5rem" }} className="fas fa-caret-down" />
            </components.DropdownIndicator>
        );
    };

    const ValueContainer = ({ children, ...props }) => {
        return (
            components.ValueContainer && (
                <components.ValueContainer {...props}>
                    {!!children && (
                        <span className="country-placeholder-icon-box">
                            <LanguageOutlinedIcon />
                        </span>
                    )}
                    {children}
                </components.ValueContainer>
            )
        );
    };

    useEffect(() => {
        document.body.dir = currentLanguage.dir || "ltr";
        document.body.classList = currentLanguage.class_name || "__eng__";
        setSelectedLanguageList({ value: currentLanguage.code, label: currentLanguage.name });
    }, [currentLanguage, t]);
    
    // App languages switch
    const handleLanguageChange = (selectedOption) => {
        setLanguage(selectedOption.value);
        setSelectedLanguageList(selectedOption);
    };

    // Change application page directions based on selected RTL languages
    useEffect(() => {
        i18next.changeLanguage(language);
    }, [language]);

    // Load Transeditor Localization application
    return (
        <React.Fragment>
            <Select
                classNamePrefix="lang-drpdown"
                isSearchable={false}
                styles={customStyles}
                value={SelectedLanguageList}
                options={languageList}
                components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                    ValueContainer,
                }}
                onChange={handleLanguageChange}
            />
        </React.Fragment>
    );
}

export default LocalizationLanguageSwitch;
