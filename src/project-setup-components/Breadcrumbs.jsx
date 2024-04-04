import React, { useState, useEffect, createRef, useRef } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TranslateIcon from '@mui/icons-material/Translate';
import { useParams, useNavigate } from "react-router-dom";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import Config from "../vendor/Config";
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
    const { t } = useTranslation();
    const params = useParams();
    const history = useNavigate()


    const getTitleCaseString = (path_names) => {
        if(path_names !== undefined){
            let name = path_names?.split('-')?.join(' ')
            return name?.charAt(0)?.toUpperCase() + name?.slice(1)
                // ?.map((nam) => nam.charAt(0)?.toUpperCase() + nam.slice(1))
                // ?.join(" ");
        }
    };

    // const handleBreadcrumbRedirection = () => {
    //     if(params?.category === "translate" && params?.menu === "text"){
    //         history("/create/all-templates", {aiCateg: "Translate text", aiactivetabval: 0})
    //     } else if (params?.category === "translate" && params?.menu === "files"){
    //         history("/create/all-templates", {aiCateg: "Translate files", aiactivetabval: 1})
    //     } else if (params?.category === "speech"){
    //         history("/create/all-templates/speech")
    //     } else if (params?.category === "tool-kit"){
    //         history("/create/all-templates/tool-kit")
    //     } else if (params?.category === "assets"){
    //         history("/create/all-templates/assets")
    //     }
    // }

    const handleBreadcrumbRedirection = () => {
        if(params?.category === "translate"){
            history("/create/all-templates/translate")
        } else if (params?.category === "write"){
            history("/create/all-templates/write")
        } else if ((params?.category === "speech" && params?.menu === "speech-to-text")){
            history("/create/all-templates/transcribe")
        } else if ((params?.category === "speech" && params?.menu === "text-to-speech")){
            history("/create/all-templates/voice")
        } else if (params?.category === "assets"){
            history("/create/all-templates/assets")
        } else if (params?.category === "tool-kit"){
            history("/create/all-templates/toolkit")
        } 
    }

    return (
        <React.Fragment>
            <div className="breadcrumbs-wrapper">
                {/* {
                    params?.category === "translate" &&
                    <TranslateIcon
                        style={{
                            fontSize: "17px",
                            color: "#636363",
                        }}
                    />
                }
                {
                    ((params?.category === "speech" && params?.menu === "speech-to-text") || (params?.category === "speech" && params?.menu === "text-to-speech")) &&
                    <img src={Config.HOST_URL + "assets/images/new-project-setup/speech-icon-breadcrumb.svg"} alt="sidebar-speech" />
                    // <KeyboardVoiceOutlinedIcon
                    //     style={{
                    //         fontSize: "21px",
                    //         color: "#636363",
                    //     }}
                    // />

                }
                {
                    params?.category === "assets" &&
                    <DescriptionOutlinedIcon
                        style={{
                            fontSize: "20px",
                            color: "#636363",
                        }}
                    />
                }
                {
                    params?.category === "tool-kit" &&
                    <img src={Config.HOST_URL + "assets/images/convert-breadcrumb-icon.svg"} alt="sidebar-speech" />
                } */}

                <span className="category-txt" onClick={() => handleBreadcrumbRedirection()}>{ params?.category === "translate" ? t("proj_list_cate_trans") : (params?.category === "speech" && params?.menu === "speech-to-text") ? t("proj_list_cate_transcription") : (params?.category === "speech" && params?.menu === "text-to-speech") ? t("proj_list_cate_ai_voice") : params?.category === "assets" ? `${t("assets")}` : params?.category === "tool-kit" ? `${t("tool_kit")}` : "" }</span>
                <KeyboardArrowRightIcon
                    style={{
                        fontSize: "20px",
                        color: "#8B8B8B",
                        fontWeight: 700,
                    }}
                />
                <span className={params?.menu === "glossaries" ? "glossary-font-change" : "category-sub-text"}>
                    {   
                        params?.menu === "glossaries" ? t("glossaries") 
                        : 
                        ""
                    }
                </span>
                {
                    (!params?.action === "instant-text" || !params?.category === "transcribe" || !params?.category === "voice" || !params?.menu === "text" || params?.category === "assets") &&
                    <KeyboardArrowRightIcon
                        style={{
                            fontSize: "20px",
                            color: "#8B8B8B",
                            fontWeight: 700,
                        }}
                    />
                }
                <span className="current-page-txt">
                    {   
                        (params?.menu === "pdf" && params?.action === "compare-mt") ? t("standard_text") 
                        : 
                        params?.menu === "speech-to-text" ? `${t("speech_to_text")}` 
                        : 
                        params?.menu === "text-to-speech" ? `${t("text_to_speech")}` 
                        : 
                        params?.action === "instant-text" ? `${t("instant_text")}` 
                        : 
                        params?.action === "standard-text" ? `${t("standard_text")}` 
                        : 
                        params?.action === "translate-files" ? `${t("translate_files")}` 
                        : 
                        params?.action === "create" ? `${t("create")}` 
                        : 
                        params?.action === "convert-pdf" ? `${t("convert_pdf")}` 
                        :
                        params?.action === "my-list" ? `${t("my_list")}` 
                        : 
                        ""
                    }
                </span>
            </div>
        </React.Fragment>
    );
};

export default Breadcrumbs;
