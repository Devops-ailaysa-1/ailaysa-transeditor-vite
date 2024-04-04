import React, { useState, useEffect } from "react";
import Moment from "moment";
// import MomentUtils from "react-moment";
import "moment/locale/en-gb";
import Select, { components } from "react-select";

function MomentTimePicker(props) {
  const {assignManage} = props
  const [selectedTime, setSelectedTime] = useState(Moment());
  const [timeOptions, setTimeOptions] = useState([]);

  // Create a list of time options for the dropdown
  const generateTimeOptions = () => {
    const times = [];
    const startTime = Moment().startOf("day");
    const endTime = Moment().endOf("day");
    let currentTime = Moment(startTime);
    // let currentTime = Moment().startOf("minute").add(30 / 2, "minutes").subtract(startTime.minutes() % 30, "minutes");
    while (currentTime.isBefore(endTime)) {
      times.push({
        value: currentTime.clone(),
        label: currentTime.format("h:mm A")
      });
      currentTime.add(30, "minutes");
    }
    setTimeOptions(times);
  };

  // Call the function to generate the time options on component mount
  useEffect(() => {
    generateTimeOptions();
  }, []);

  const handleTimeChange = (selectedOption) => {
    setSelectedTime(selectedOption.value);
  };

  const customTimePickerSelectStyles = {
    placeholder: (provided, state) => ({
        ...provided,
        color: "#3C4043",
        fontFamily: "Roboto",
        fontSize:props.glossClass ? "15px":"13px",
        fontWeight: "500",
        lineHeight: "24px",
    }),
    menu: (provided, state) => ({
        ...provided,
        padding: "6px 0px 0px 0px",
        boxShadow: "0px 3px 6px #00000029",
        border: "1px solid #DADADA",
        borderRadius: "4px",
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: "0px solid #CED4DA",
        borderLeft: "2px solid transparent",
        color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
        background: state.isSelected ? "#F4F5F7" : "#ffffff",
        display: "flex",
        marginBottom: "0.2rem",
        padding: "4px 6px",
        color: "#292929",
        fontFamily: "Roboto",
        fontSize:props.glossClass ? "14px" : "12px",
        fontWeight: "400",
        lineHeight: "24px",
        "&:hover": {
            background: "#F4F5F7",
            borderLeft: "2px solid #0074D3",
            cursor: "pointer",
        },
    }),
    control: (base, state) => ({
        ...base,
        border: state.isFocused ? "1px solid #0074D3" : "1px solid #ced4da",
        backgroundColor: "#ffffff",
        borderRadius: 3,
        transtion: 0.3,
        color: "#3C4043",
        fontFamily: "Roboto",
        fontSize: props.glossClass ? "15px" : "13px",
        fontWeight: "normal",
        lineHeight: "24px",
        boxShadow: 0,
        padding: "2.5px 10px",
        minHeight: props.glossClass ? "46px" : "35px",
        width: "100%",
        height: "auto",
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

const customAssignManageTimePickerSelectStyles = {
  placeholder: (provided, state) => ({
      ...provided,
      color: "#3C4043",
      fontFamily: "Roboto",
      fontSize:props.glossClass ? "15px":"13px",
      fontWeight: "500",
      lineHeight: "24px",
  }),
  menu: (provided, state) => ({
      ...provided,
      padding: "6px 0px 0px 0px",
      boxShadow: "0px 3px 6px #00000029",
      border: "1px solid #DADADA",
      borderRadius: "4px",
      width: "85px",
      zIndex: "2000"
  }),
  option: (provided, state) => ({
      ...provided,
      borderBottom: "0px solid #CED4DA",
      borderLeft: "2px solid transparent",
      color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
      background: state.isSelected ? "#F4F5F7" : "#ffffff",
      display: "flex",
      marginBottom: "0.2rem",
      padding: "4px 6px",
      color: "#292929",
      fontFamily: "Roboto",
      fontSize:props.glossClass ? "14px" : "12px",
      fontWeight: "400",
      lineHeight: "24px",
      "&:hover": {
          background: "#F4F5F7",
          borderLeft: "2px solid #0074D3",
          cursor: "pointer",
      },
  }),
  control: (base, state) => ({
      ...base,
      borderBottom: state.isFocused ? "1px solid #0074D3" : "1px solid #E4E7E9",
      borderTop:"0px solid #E4E7E9",
      borderRight:"0px solid #E4E7E9",
      borderLeft:"0px solid #E4E7E9",
      backgroundColor:state.isFocused ? "#F3F3F3" : "#ffffff",
      borderRadius: 3,
      transtion: 0.3,
      color: "#3C4043",
      fontFamily: "Roboto",
      fontSize: props.glossClass ? "15px" : "13px",
      fontWeight: "normal",
      lineHeight: "24px",
      boxShadow: 0,
      padding: "2px 8px",
      minHeight: props.glossClass ? "46px" : "35px",
      width: "81px",
      height: "auto",
      "&:hover": {
          cursor: "pointer",
          backgroundColor: "#F3F3F3"
      },
  }),
};

const DropdownIndicator = (props) => {
  return (
      <components.DropdownIndicator {...props}>
          <span id="triangle-down"></span>
      </components.DropdownIndicator>
  );
};
  
  return (
    <Select
      options={timeOptions}
      menuPlacement="auto"
      styles={assignManage ? customAssignManageTimePickerSelectStyles : customTimePickerSelectStyles}
      classNamePrefix={props.glossClass ? "glossary-time-picker" : "moment-time-picker"}
      value={{ value: selectedTime, label: selectedTime.format('h:mm A') }}
      components={{DropdownIndicator  , IndicatorSeparator: () => null }}
      onChange={props.onChange}
      format="h:mm A"
      placeholder={ assignManage ? "HH:MM" : "Select time"}
    />
  );
}

export default MomentTimePicker;