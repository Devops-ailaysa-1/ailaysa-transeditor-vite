import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import AllTemplate from "../allTemplate-component/AllTemplates";

const AllTemplateModule = () => {
    const params = useParams();

    if (!params?.category || !params?.menu) {
        <Navigate to="all-templates"/>;
    }
    
    if (params?.category === "all-templates") {
            switch (params?.menu) {
                case "translate":
                    return <AllTemplate/>;
                case "write":
                    return <AllTemplate/>;
                case "transcribe":
                    return <AllTemplate/>;
                case "ai-voice":
                    return <AllTemplate/>;
                case "assets":
                    return <AllTemplate/>;
                case "toolkit":
                    return <AllTemplate/>;
                case "design":
                    return <AllTemplate/>;
            }
        return <AllTemplate/>;
    }
};

export default AllTemplateModule;
