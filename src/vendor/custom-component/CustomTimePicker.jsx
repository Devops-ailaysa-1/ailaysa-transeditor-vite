import React, { useState, useEffect, useRef } from 'react'

export const CustomTimePicker = (props) => {
    
    const { assigntimepicker } = props
    const [timeIntervalOptions, setTimeIntervalOptions] = useState([])
    const [time, setTime] = useState('')
    const [previousTime, setPreviousTime] = useState('12:00 AM');
    const [showTimeDropDown, setShowTimeDropDown] = useState(false)
    const customTimePickerRef = useRef(null)
    
    const mystyle = {
        position: 'absolute',
        overflow: 'auto',
        height: '200px',
        zIndex: 100,
        listStyleType: "none",
        background: '#fff',
        padding: '5px'
    }

    useEffect(() => {
        getDropdownTimeOptions()
    }, [])

    useEffect(() => {
        if(props.value !== null){
            let timeString = getTimeStringFromDate(props.value)
            setTime(timeString)
        }else{
            setTime('')
        }
    }, [props.value])
    

    const validateTime = (timeString) => {
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
        return timeRegex.test(timeString);
    };

    const getDropdownTimeOptions = () =>  {
        const options = [];
        const interval = 30; // 30 minutes interval
      
        for (let hour = 1; hour <= 12; hour++) {
          for (let minute = 0; minute < 60; minute += interval) {
            const meridian = hour < 12 ? 'AM' : 'PM';
            const hour12 = hour === 12 ? 12 : hour % 12;
            const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${meridian}`;
            options.push(timeString);
          }
        }
        for (let hour = 1; hour <= 12; hour++) {
          for (let minute = 0; minute < 60; minute += interval) {
            const meridian = hour < 12 ? 'PM' : 'AM';
            const hour12 = hour === 12 ? 12 : hour % 12;
            const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${meridian}`;
            options.push(timeString);
          }
        }
        setTimeIntervalOptions(options)
    }

    const convertTimeStringToTimeObject = (selectedTime) => {
        const [timeString, meridian] = selectedTime.split(' ');
        const [hours, minutes] = timeString.split(':');
        let time = props.value ? props.value : new Date();
        time.setHours(hours % 12 + (meridian === 'PM' ? 12 : 0));
        time.setMinutes(minutes);
        time.setSeconds('00');
        return time;
    }

    const getTimeStringFromDate = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const meridian = hours < 12 ? 'AM' : 'PM';
        const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${meridian}`;
    }

    const handleTimeSelect = (event) => {
        event.stopPropagation()
        let selectedTime = event.target.textContent;
        if (validateTime(selectedTime)) {
            let timeObj = convertTimeStringToTimeObject(selectedTime)
            props.setValue(timeObj)
            setTime(selectedTime)
            setShowTimeDropDown(false)
        } else {
          setTime(previousTime);
        }
    };

    const handleTimeInputChange = (event) => {
        const enteredTime = event.target.value;
        setTime(enteredTime)
    };

    const validateOnBlur = (e) => {
        const enteredTime = e.target.value;
        if (validateTime(enteredTime)) {
            let timeObj = convertTimeStringToTimeObject(enteredTime)
            props.setValue(timeObj)
            setTime(enteredTime)
            setPreviousTime(enteredTime);
        } else if(enteredTime?.trim() === ''){
            return;
        } else {
            setTime(previousTime);
        }
    }

    /* Check for clicing outside of the dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (customTimePickerRef.current && !customTimePickerRef.current.contains(e.target)) {
                setShowTimeDropDown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });


    return (
        <div className={"custom-time-picker " + assigntimepicker}>
            <input type="text" value={time} onChange={handleTimeInputChange} onFocus={()=> setShowTimeDropDown(true)} onBlur={validateOnBlur} placeholder="HH:MM" />
            {showTimeDropDown && 
                <ul className="time-list-options" ref={customTimePickerRef}>
                    {
                        timeIntervalOptions.map((each, index) => {
                            return (
                                <li 
                                    key={index}
                                    onClick={handleTimeSelect}
                                >
                                    {each}
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}
