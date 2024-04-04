import React, { useEffect ,useRef} from "react";
import { useParams, Navigate } from "react-router-dom";
import Fileupload from "../../vendor/Fileupload";
import TranslateFiles from "../translate-component/files/TranslateFiles";
import InstantTextTranslate from "../translate-component/text/InstantTextTranslate";
import StandardTextTranslate from "../translate-component/text/StandardTextTranslate";

const TranslateModule = (props) => {
    const {
        sidebarActiveTab,
        setSidebarActiveTab,
    }=props
    const params = useParams();

    if (!params?.menu && !params?.action) {
        <Navigate to="translate/files/translate-files" />;
    }

    if (params?.menu === "text") {
        switch (params?.action) {
            case "instant-text":
                return <InstantTextTranslate 
                setSidebarActiveTab={setSidebarActiveTab} 
                sidebarActiveTab={sidebarActiveTab}
                />;
        }
    } else if (params?.menu === "files") {
        switch (params?.action) {
            case "translate-files":
                return <TranslateFiles 
                setSidebarActiveTab={setSidebarActiveTab} />;
                
        }
    } 
};

export default TranslateModule;
