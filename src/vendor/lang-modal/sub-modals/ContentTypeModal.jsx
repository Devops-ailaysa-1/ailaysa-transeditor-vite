import React, { useEffect, useState, useRef } from "react";
import Config from "../../Config";
import { useTranslation } from "react-i18next";
import CheckBlue from "../../../assets/images/new-ui-icons/check_blue.svg"

function ContentTypeModal(props) {
    let selectedContentTypes = useRef([]);
    const { t } = useTranslation();
    // const AiNavButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "2px",
    //         textTransform: "none",
    //         padding: 0,
    //         "&:hover": {
    //             backgroundColor: "#0265b1",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button);

    useEffect(() => {
        if (props.contentType) {
            props.contentType?.map((content) => {
                selectedContentTypes.current?.push(content?.id);
            });
        }
    }, [props.contentType]);

    return (
        <React.Fragment>
            {/* <div className="ai-source-language-cont"> */}
                <div className="ai-src-language-part">
                    <ul className="ai-source-langs-list">
                        {props.contentTypeOptions != null &&
                            props.contentTypeOptions.map((value) => (
                                <li
                                    key={value.id}
                                    onClick={(e) => props.handleContentTypeClick(value, e)}
                                    className={selectedContentTypes.current.indexOf(value.id) != -1 ? "list selected" : "list"}
                                >
                                    <img className="checked-icon" src={CheckBlue} alt="check_blue" />{" "}
                                    {value.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="text-end">
                    <button className="modalselect-AiNavButton" onClick={() => props.handleModalClose("content-type")}>
                        <span className="login-btn">{t("add_or_update")}</span>
                    </button>
                </div>
            {/* </div> */}
        </React.Fragment>
    );
}

export default ContentTypeModal;
