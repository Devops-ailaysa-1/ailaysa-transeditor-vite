import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from 'framer-motion'
import DatePicker from "../vendor/date-time-picker/DatePicker";
import DatePickerNewIcon from "../vendor/styles-svg/DatePickerNewIcon";
import Config from "../vendor/Config";
import {ClickAwayListener} from '@mui/base/ClickAwayListener';

const ModifiedStoriesFilter = (props) => {
    let {
        userReportFilterSelectedValue, 
        setUserReportFilterSelectedValue,
        toDate,
        setToDate,
        fromDate,
        setFromDate
    } = props

    const { t } = useTranslation();
    const [modifiedDateSelectBox, setModifiedDateSelectBox] = useState(false)

    const modifiedDateSelectBoxRef = useRef()

    
    const DataFilterOptions = [
        { value: 'today', label: "Today" },
        { value: '30days', label: "Last month" }
    ]
    
    /* Check for clicing outside of the New project Dropdown */
    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         let isDatePickerBox = e.target.closest('.MuiDateCalendar-root') ? true : false
    //         let filterBtn = document.querySelector('.modified-stories-dropdown-wrapper___button-wrap')

    //         if (modifiedDateSelectBoxRef.current && !modifiedDateSelectBoxRef.current.contains(e.target) && !isDatePickerBox) {
    //             // handleModifiedDatepickerVisibility(false)
    //             // setModifiedDateSelectBox(false)
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);


    useEffect(() => {
        if(fromDate !== null){
            if(fromDate <= toDate) {
                handleModifiedDatepickerVisibility(false)
                return
            }
            setToDate(null)
        }
    }, [fromDate])

    useEffect(() => {
        if(toDate !== null) {
            handleModifiedDatepickerVisibility(false)
        }
    }, [toDate])
    
  
    const handleModifiedDatepickerVisibility = (show = true) => {
        setModifiedDateSelectBox(show);
    };

    const handleFromDateChange = (newValue) => {
        setFromDate(newValue);
    };

    const handleToDateChange = (newValue) => {
        setToDate(newValue);
    };

    const handleMenuItemClick = (item) => {
        setUserReportFilterSelectedValue(item)
        handleModifiedDatepickerVisibility(false)
    } 

    const handleClickAway = () => {
        setModifiedDateSelectBox(false)
    } 

    return (
        <>
            <div className="modified-stories-dropdown-wrapper">
                <div
                    className="modified-stories-dropdown-wrapper___button-wrap"
                    onClick={() => handleModifiedDatepickerVisibility(!modifiedDateSelectBox)}
                >
                    {userReportFilterSelectedValue?.label}
                    <i style={{ color: "#8c8c8c" }} className="fas fa-caret-down"/>
                </div>
                <AnimatePresence initial={false}>
                    {modifiedDateSelectBox && (
                        <ClickAwayListener onClickAway={handleClickAway} >
                            <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0}}
                                animate={{ height: "auto", opacity: 1}}
                                exit={{ height: 0, opacity: 0, transition: { duration: 0.15 }}}
                                transition={{ duration: 0.15 }} 
                                ref={modifiedDateSelectBoxRef}
                                className="ai-projects-main-wrapper__header__dropdown-wrapper__dropdown-box"
                            >
                                <div className="modified-stories-dropdown-wrapper___options-list">
                                    {
                                        DataFilterOptions?.map((item, index) => {
                                            return(
                                                <div 
                                                    key={index} 
                                                    className="item-title"
                                                    style={item?.value === userReportFilterSelectedValue?.value ? {backgroundColor: '#F4F5F7'} : {}}
                                                    onClick={() => handleMenuItemClick(item)}
                                                >
                                                    {item.label}
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="custom-date-range-picker-wrap" style={userReportFilterSelectedValue?.value === "custom" ? {backgroundColor: '#F4F5F7'} : {}}>
                                        <p className="custom-title">Custom <DatePickerNewIcon /></p>
                                        <div className="date-picker-range-wrap">
                                            <DatePicker 
                                                value={fromDate}
                                                onChange={handleFromDateChange} 
                                                placeholder="From"
                                                sourceTxt="modified-stories"
                                                disablePast 
                                                minDate={null}
                                            />
                                            <DatePicker 
                                                value={toDate}
                                                minDate={fromDate}
                                                onChange={handleToDateChange} 
                                                placeholder="To"
                                                sourceTxt="modified-stories"
                                                disablePast 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </ClickAwayListener>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default ModifiedStoriesFilter