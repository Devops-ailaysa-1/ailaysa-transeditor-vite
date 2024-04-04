import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams, useNavigate} from "react-router-dom";
import Config from "../../../vendor/Config";
import { Collapse } from "reactstrap";
import { useTranslation } from "react-i18next";
import ToolkitMenu from "../../../assets/images/new-create-hub/tool-kit-menu.svg"
import ExpandMoreIcon from "../../../assets/images/new-ui-icons/expand_more.svg"

const PdfConvertCollapse = (props) => {
    const { t } = useTranslation();
    const { category, menu, action } = useParams();
    const history = useNavigate();
    const [filesCollapse, setFilesCollapse] = useState(false);

    // useEffect(() => {
    //     if (category === "tool-kit" && menu === "pdf") {
    //         setFilesCollapse(true);
    //     } else {
    //         setFilesCollapse(false);
    //     }
    // }, [props.selectedMenu]);

    useEffect(() => {
        let pathname = window.location.pathname;
        if(pathname === "/create/all-templates/tool-kit" || pathname === "/create/tool-kit/pdf/convert-pdf" || pathname === "/create/tool-kit/pdf/compare-mt"){
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
            <div className="ai-subtask-collapse-wrap">
                <div className={"header " + (((window.location.pathname === "/create/all-templates/tool-kit") || (window.location.pathname === "/create/tool-kit/pdf/pdf-list")) ? "active" : "")} onClick={() => {handleFilesCollapser(); history("/create/all-templates/tool-kit")}}>
                    {/* <NavLink activeClassName="active" className="title" to="/create/convert/pdf-to-docx">
                        Pdf to docx
                    </NavLink> */}
                    <div className="icon-wrap">
                        <span className="icon"><img src={ToolkitMenu} /></span>
                        <span className="title">Toolkit</span>
                    </div>
                    <span className={filesCollapse ? "img" : "img-rotate"}>
                        <img src={ExpandMoreIcon} alt="expand-more" />
                    </span>
                </div>
                <Collapse isOpen={filesCollapse}>
                    <ul className="ai-subtask-link-list">
                        <li>
                            <NavLink activeClassName="active" to="/create/tool-kit/pdf/convert-pdf">
                                Convert PDF to DOCX
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/create/tool-kit/pdf/compare-mt">
                                Compare MT outputs
                            </NavLink>
                        </li>
                    </ul>
                </Collapse>
            </div>
        </React.Fragment>
    );
};

export default PdfConvertCollapse;
