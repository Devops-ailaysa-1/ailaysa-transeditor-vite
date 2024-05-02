import React, { useEffect, useRef, useState } from "react";
import Config from "../../Config";
import { useTranslation } from "react-i18next";
import CheckBlue from "../../../assets/images/new-ui-icons/check_blue.svg"

function SubjectFieldModal(props) {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            {/* <div className="ai-source-language-cont"> */}
                <div className="ai-src-language-part">
                    <ul className="ai-source-langs-list">
                        {props.subjectFieldOptions != null &&
                            props.subjectFieldOptions?.map((value) => (
                                <li
                                    key={value?.id}
                                    onClick={(e) => props.handleSubjectFieldClick(value, e)}
                                    className={props.subjectField?.find(each => each.id === value.id) ? "list selected" : "list"}
                                >
                                    <img className="checked-icon" src={CheckBlue} alt="check_blue" />{" "}
                                    {value.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="text-end">
                    <button className="modalselect-AiNavButton" onClick={() => props.handleModalClose("subject-modal")}>
                        <span className="login-btn">{t("add_or_update")}</span>
                    </button>
                </div>
            {/* </div> */}
        </React.Fragment>
    );
}

export default SubjectFieldModal;
