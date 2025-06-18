/* eslint-disable default-case */
// import React, { useState, useEffect, useRef } from "react";
// import Config from "../../Config";
// import { Collapse } from "reactstrap";
import { useParams, Navigate } from "react-router-dom";
// import Fileupload from "../../vendor/Fileupload";
import CreateGlossaries from "../assets-component/glossaries/CreateGlossaries";
import ViewGlossariesList from "../assets-component/glossaries/ViewGlossariesList";
// import Rodal from "rodal";
import "rodal/lib/rodal.css";
// import CloseIcon from '@mui/icons-material/Close';
// import FadeInRight from "../../animation-styles/FadeInRightSuggestion";
// import FadeInLeft from "../../animation-styles/FadeInLeftSuggestion";
// import FadeInRightModal from "../../animation-styles/FadeInRight";
// import FadeInLeftModal from "../../animation-styles/FadeInLeft";
// import { AnimatePresence, motion } from "framer-motion";
// import Select, { components } from "react-select";
// import AddIcon from '@mui/icons-material/Add';
import SearchTerms from "../assets-component/glossaries/SearchTerms";
import CreateWordchoice from "../assets-component/wordchoice/CreateWordchoice";

const AssetsModule = (props) => {
    const {sidebarActiveTab, setSidebarActiveTab} = props;

    const params = useParams();

    if (!params?.menu && !params?.action) {
        <Navigate to="assets/glossaries/create" />;
    }

    if (params?.menu === "glossaries") {
        switch (params?.action) {
            case "create":
                return <CreateGlossaries 
                    sidebarActiveTab={sidebarActiveTab}
                    setSidebarActiveTab={setSidebarActiveTab}
                />;
            case "my-glossaries":
                return <ViewGlossariesList/>;
            case "search-terms":
                return <SearchTerms />;
        }
    } 
    else if (params?.menu === "wordchoice") {
        return <CreateWordchoice />
        // <Navigate to="create/all-templates/" />;
        
    }
};

export default AssetsModule;
