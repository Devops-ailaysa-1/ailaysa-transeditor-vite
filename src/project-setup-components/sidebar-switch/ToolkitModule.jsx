import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ConvertedPdfList from "../toolkit-component/ConvertedPdfList";
import PdfConvert from "../toolkit-component/PdfConvert";
import StandardTextTranslate from "../translate-component/text/StandardTextTranslate";


const ToolkitModule = (props) => {
    const {
        sidebarActiveTab,
        setSidebarActiveTab,
    }=props
    const params = useParams();

    if (!params?.menu && !params?.action) {
        <Navigate to="tool-kit/pdf/convert-pdf" />;
    }


    if (params?.menu === "pdf") {
        switch (params?.action) {
            case "convert-pdf":
                return <PdfConvert setSidebarActiveTab={setSidebarActiveTab} />;
            case "compare-mt":
                return <StandardTextTranslate />
            case "pdf-list":
                return <ConvertedPdfList />;
        }
    } 
};

export default ToolkitModule;