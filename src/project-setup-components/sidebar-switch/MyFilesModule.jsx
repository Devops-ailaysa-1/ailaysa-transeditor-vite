import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import MyFiles from "../myfiles-component/MyFiles";
import ConvertedPdfList from "../toolkit-component/ConvertedPdfList";

const MyFilesModule = () => {
    const params = useParams();

    if (!params?.category) {
        <Navigate to="my-files"/>;
    }
    
    if (params?.category === "my-files") {
        return <MyFiles />;
    }
};

export default MyFilesModule;
