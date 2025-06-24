import React, { useState, useEffect, useRef, createFactory } from "react";
import BlogHeader from './Writter-componenets/writer-blog/BlogHeader';
import BlogStepWrapper from './Writter-componenets/writer-blog/BlogStepWrapper';
import Config from "../vendor/Config";
import { useTranslation } from "react-i18next";

const WriterBlog = (props) => {
    const { t } = useTranslation();
    const [sourceLanguage, setSourceLanguage] = useState(17);
    const [targetLanguage, setTargetLanguage] = useState([]);
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
    const [sourceLabel, setSourceLabel] = useState("English");
    const [targetLabel, setTargetLabel] = useState(t("select_output_lang"));
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [showTarLangModal, setshowTarLangModal] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [stepWizard, setStepWizard] = useState("create-title");
    const [stepWizardComplete, setStepWizardComplete] = useState(null);
    const [onFocusWrap, setOnFocusWrap] = useState(false);
    const searchAreaRef = useRef(null);
    const languageOptionsListRef = useRef([]);

    /* Get source language options */
    const getSourceLanguages = () => {
        let params = {
            url: Config.BASE_URL + "/app/language/",
            auth: true,
            success: (response) => {
                languageOptionsListRef.current = response.data;
                setSourceLanguageOptions(response.data);
                setTargetLanguageOptions(response.data);

            },
        };
        Config.axios(params);
    };

    useEffect(() => {
        getSourceLanguages();
    }, []);
    
    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        setSourceLanguage(value);
        setshowSrcLangModal(false);
        setSourceLabel(name);
        setSearchInput('');
        setOnFocusWrap(false);
    };

    /* Handling target language selection */
    const handleTargetLangClick = (value, e) => {
        let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
        if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
            if(targetLanguageTemp?.length === 1){
                Config.toast(t("one_lang_must_select"), 'warning');
                return;
            }
            e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected");
            targetLanguageTemp = Config.removeItemFromArray(
                targetLanguageTemp,
                value
            );
        } else {
            e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected")
            targetLanguageTemp.push(value);
        }       
        setTargetLanguage([...new Set(targetLanguageTemp)]);
        setSearchInput('');
        setOnFocusWrap(false);
    };

  return (
    <>
        <section className="blog-main-wrapper">
            <BlogHeader setStepWizard={setStepWizard} stepWizard={stepWizard} setStepWizardComplete={setStepWizardComplete} stepWizardComplete={stepWizardComplete}/>
            <BlogStepWrapper 
                sourceLanguage={sourceLanguage}
                setSourceLanguage={setSourceLanguage}
                languageOptionsListRef={languageOptionsListRef}
                showSrcLangModal={showSrcLangModal}
                setshowSrcLangModal={setshowSrcLangModal}
                sourceLanguageOptions={sourceLanguageOptions}
                handleSourceLangClick={handleSourceLangClick}
                filteredResults={filteredResults} 
                setFilteredResults={setFilteredResults}
                searchInput={searchInput} 
                setSearchInput={setSearchInput}
                onFocusWrap={onFocusWrap} 
                setOnFocusWrap={setOnFocusWrap}
                searchAreaRef={searchAreaRef}
                sourceLabel={sourceLabel}
                setSourceLabel={setSourceLabel}
                setStepWizard={setStepWizard} 
                stepWizard={stepWizard}
                setStepWizardComplete={setStepWizardComplete} 
                stepWizardComplete={stepWizardComplete}
                targetLanguage={targetLanguage}
                targetLanguageOptions={targetLanguageOptions}
                setTargetLanguageOptions={setTargetLanguageOptions}
                handleTargetLangClick={handleTargetLangClick}
                showTarLangModal={showTarLangModal}
                setshowTarLangModal={setshowTarLangModal}
                targetLabel={targetLabel}
                setTargetLabel={setTargetLabel}/>
        </section>
    </>
  )
}

export default WriterBlog;