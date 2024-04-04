import React from "react"
import Config from '../Config'
import Rodal from 'rodal'
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import CheckBlue from "../../assets/images/new-ui-icons/check_blue.svg"

function ModelSelect(props) {

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
    // }))(Button)

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: props.hideFunction,
    }

    let value = props.value
    if (!props.isMulti)
        value = [props.value]
    let valueKey = 'id'
    if (props.valueKey)
        valueKey = props.valueKey
    let nameKey = 'name'
    if (props.nameKey)
        nameKey = props.nameKey
    return (
        <React.Fragment>
            {props.show &&
            (<Rodal
                visible={props.show}
                {...modaloption}
                showCloseButton={false}
                className="ai-tar-lang-select-modal"
            >
                <div className="lang-modal-header">
                    <h1>{props.title}</h1>
                    <span className="modal-close-btn" onClick={e => props.hideFunction(false)}>
                        <img
                            src={CloseBlack}
                            alt="close_black"
                        />
                    </span>
                </div>
                <div className="ai-source-language-cont">
                    <div className="ai-src-language-part">
                        <ul className="ai-source-langs-list">
                            {props.options != null &&
                                props.options.map((option) => (
                                    <li
                                        key={option[valueKey]}
                                        onClick={(e) => props.handleSelect(option[valueKey], option[nameKey], e)}
                                        className={value && value?.indexOf(option[valueKey]) !== -1  ? 'list selected' : 'list'}
                                    >
                                        <img
                                            className="checked-icon"
                                            src={CheckBlue}
                                            alt="check_blue"
                                        />{" "}
                                        {option[nameKey]}
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="text-end">
                            <button className="modalselect-AiNavButton" onClick={() => props.hideFunction(false)}>
                                <span className="login-btn">Add / Update</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Rodal>)}
        </React.Fragment>
    );
}

export default ModelSelect