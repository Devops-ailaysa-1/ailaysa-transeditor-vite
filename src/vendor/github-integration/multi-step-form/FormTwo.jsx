import {useState} from 'react'
import Select, { components } from "react-select"
import Config from "../../Config"
import InputRefresh from "../../../assets/images/new-ui-icons/input-refresh.svg"

function FormTwo(props) {

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            color: state.isSelected
                ? "#ffffff"
                : state.isDisabled
                ? "#cccccc"
                : "#7E7E7E",
            // background: state.isSelected ? "#0078D4" : "#ffffff",
            fontFamily: "Roboto",
            padding: 5,
            fontSize: 12,
            "&:hover": {
                background: "#E8F0FE",
                color: "#0078D4",
                cursor: "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            borderRadius: state.isSelected ? 3 : 3,
            transtion: "0.3s all ease",
            fontFamily: "Roboto",
            fontSize: 12,
            lineHeight: 1.4,
            color: "#172B4D",
            minHeight: 36,
            boxShadow: state.isFocused ? 0 : 0,
            border: state.isFocused
                ? "2px solid #0078D4"
                : "1px solid #CED4DA",
            height: state.isFocused ? 36 : 36,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    }

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <i
                    style={{ color: "#000000", paddingRight: "0.4rem" }}
                    className="fas fa-caret-down"
                />
            </components.DropdownIndicator>
        )
    }

    const repositoryChange = (selectedOption) => {
        props.setBranchOptions([])
        props.getBrancheOptions(selectedOption.value)
    }
    
    return (
        <div className="version-form-group-wrapper">
            <div className="version-form-group">
                <label htmlFor="access-token">User token</label>
                <div className="version-ctrl-selected-mem">
                    <span>User name 1</span>
                </div>
            </div>
            <div className="version-form-group">
                <label htmlFor="access-token">Repository</label>
                <div className="version-form-grp-align">
                    <div className="version-form-select-wrapper">
                        <Select
                            styles={customStyles}
                            options={props.repositoryOptions}
                            placeholder={
                            <div className="version-ctrl-select-placeholder-text">
                                Select repository
                            </div>
                            }
                            components={{
                                DropdownIndicator,
                                IndicatorSeparator: () => null,
                            }}
                            onChange={repositoryChange}
                        />
                    </div>
                    <button className="refresh-btn">
                        <img src={InputRefresh} alt="input-refresh"/>
                    </button>
                </div>
            </div>
            <div className="version-form-group">
                <label htmlFor="access-token">Branch</label>
                <div className="version-form-grp-align">
                    <div className="version-form-select-wrapper">
                        <Select
                            styles={customStyles}
                            options={props.branchOptions}
                            onChange={props.branchChange}
                            placeholder={
                            <div className="version-ctrl-select-placeholder-text">
                                Select branch
                            </div>
                            }
                            components={{
                                DropdownIndicator,
                                IndicatorSeparator: () => null,
                            }}                                    
                        />
                    </div>
                    <button className="refresh-btn">
                        <img src={InputRefresh} alt="input-refresh"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormTwo