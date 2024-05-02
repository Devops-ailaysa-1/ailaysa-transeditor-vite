import React, { useEffect, useState, useRef } from "react";
import Config from "../../Config";
import { useTranslation } from "react-i18next";
import CheckBlue from "../../../assets/images/new-ui-icons/check_blue.svg"

function ContentTypeModal(props) {
    const { t } = useTranslation();

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
                                    className={props.contentType?.find(each => each.id === value.id) ? "list selected" : "list"}
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
