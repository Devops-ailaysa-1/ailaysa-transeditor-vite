import React, { useState, useEffect, createRef, useRef } from "react";
// import QuillTextEditor from "../../../vendor/quill-text-editor/QuillTextEditor";
import { useTranslation } from "react-i18next";

const TextInput = (props) => {
    const { t } = useTranslation();
    const {textareaRef, translateSrcContent, setTranslateSrcContent} = props;
    return(
        <React.Fragment>
            <textarea
                ref={textareaRef}
                className="ai-text-area"
                rows={5}
                value={translateSrcContent}
                placeholder={t("enter_your_text_here")}
                maxLength="5000"
                onChange={(e) => {
                    setTranslateSrcContent(e.target.value);
                }}
            ></textarea>
            <span style={{float: 'right', fontSize: '14px', opacity: 0.6}}>{translateSrcContent == '' ? 0 : translateSrcContent?.length}/5000</span>
            {/* <QuillTextEditor isTextToSpeech={true}/> */}
        </React.Fragment>
    )
}

export default TextInput;