import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams, NavLink} from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
import ButtonBase from '@mui/material/ButtonBase';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import BooksHub from "../../../assets/images/new-create-hub/books.svg";
import ExpansMoreIcon from "../../../assets/images/new-ui-icons/expand_more.svg";

const Glossaries = () => {
    const { t } = useTranslation();
    const history = useNavigate();
    const [filesCollapse, setFilesCollapse] = useState(true);

    useEffect(() => {
        let pathname = window.location.pathname;
        if(pathname === "/create/all-templates/assets" || pathname === "/create/assets/glossaries/my-glossaries" || pathname === "/create/assets/glossaries/create" || pathname === "/create/assets/glossaries/search-terms"){
            setFilesCollapse(true);
        }else{
            setFilesCollapse(false);
        }
    }, [window.location.pathname])

    const handleFilesCollapser = () => {
        setFilesCollapse(!filesCollapse);
    };

    return (
        <React.Fragment>
            <div className="ai-subtask-collapse-wrap glossaries">
                <div className={"header " + ((window.location.pathname === "/create/all-templates/assets") ? "active" : "")} onClick={() => {handleFilesCollapser(); history("/create/all-templates/assets")}}>
                <div className="icon-wrap">
                        <span className="icon"><img src={BooksHub} /></span>
                        <span className="title">Assets</span>
                    </div>
                    <span className={filesCollapse ? "img" : "img-rotate"}>
                        <img  src={ExpansMoreIcon} alt="expand-more"/>
                    </span>
                </div>
                <Collapse className="glossaries-collapse" isOpen={filesCollapse}>
                    <ul className="ai-subtask-link-list glossaries">
                        <li>
                            <NavLink className="glossary-font-change" activeClassName="active" to="/create/assets/glossaries/my-glossaries?page=1">
                                My glossaries
                            </NavLink>
                        </li>
                        <li>
                            {/* <ButtonBase className="subtask-btn" component={Link} to="/create/assets/glossaries/create">
                                <AddIcon className="plus"/> Create a Glossary 
                            </ButtonBase> */}
                            <NavLink activeClassName="active" className="glossary-font-inner" to="/create/assets/glossaries/create">
                                {t("create_a")} <span>glossary</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/create/assets/glossaries/search-terms">
                                {t("search_a_term")}
                            </NavLink>
                        </li>
                    </ul>
                </Collapse>
            </div>
        
        </React.Fragment>
    );
};

export default Glossaries;