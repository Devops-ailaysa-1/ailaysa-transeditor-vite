import React, { useEffect ,useRef} from "react";
import { useParams, Navigate } from "react-router-dom";
import TranslateFiles from "../translate-component/files/TranslateFiles";
import ProjectCreation from "../allTemplate-component/projectCreation";
import InstantTextTranslate from "../translate-component/text/InstantTextTranslate";

const TranslateModule = (props) => {
    const { sidebarActiveTab, setSidebarActiveTab, } = props;
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
    } else if (params?.menu === "translate-files") {
        // switch (params?.action) {
        //     case "translate-files":
                return <ProjectCreation 
                setSidebarActiveTab={setSidebarActiveTab} />;
                
        // }
    }
};

export default TranslateModule;
