import React, { useState, useEffect, useRef, forwardRef} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import { useClearableField } from "@mui/x-date-pickers/hooks";
import { unstable_useDateField as useDateField } from "@mui/x-date-pickers/DateField";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box } from "@mui/material";

function DatePickers(props) {
    
    let {
      disablebidingRangeDates, 
      className, 
      assignManage, 
      onChange,
      taskDeadLine,
      projectDeadline,
      value
    } = props; 
    const [open, setIsOpen] = useState(false);

    const BrowserField = forwardRef((props, ref) => {
        const {
          disabled,
          id,
          label,
          inputRef,
          InputProps: { ref: containerRef, startAdornment, endAdornment } = {},
          // extracting `error`, 'focused', and `ownerState` as `input` does not support those props
          error,
          focused,
          ownerState,
          sx,
          ...other
        } = props;
      
        const handleRef = useForkRef(containerRef, ref);
      
        return (
          <Box
            // sx={{ ...(sx || {}), display: "flex", alignItems: "center", flexGrow: 1 }}
            id={id}
            ref={handleRef}
            className={assignManage ? className : "datetimepicker-box"} 
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {startAdornment}
            <input disabled={disabled} ref={inputRef} {...other} />
            {endAdornment}
          </Box>
        );
    });

    const BrowserDateField = forwardRef((props, ref) => {
        const {
          inputRef: externalInputRef,
          slots,
          slotProps,
          ...textFieldProps
        } = props;
      
        const { onClear, clearable, ref: inputRef, ...fieldProps } = useDateField({
          props: textFieldProps,
          inputRef: externalInputRef
        });
      
        /* If you don't need a clear button, you can skip the use of this hook */
        const {
          InputProps: ProcessedInputProps,
          fieldProps: processedFieldProps
        } = useClearableField({
          onClear,
          clearable,
          fieldProps,
          InputProps: fieldProps.InputProps,
          slots,
          slotProps
        });
        return (
          <BrowserField
            ref={ref}
            inputRef={inputRef}
            {...processedFieldProps}
            InputProps={ProcessedInputProps}
          />
        );
    });
      
    const BrowserDatePicker = forwardRef((props, ref) => {
        return (
            <DatePicker
                shouldDisableDate={disablebidingRangeDates}
                minDate={new Date()}
                maxDate={taskDeadLine ? new Date(taskDeadLine) : projectDeadline ? new Date(projectDeadline) : undefined}
                open={open}
                onClose={() => setIsOpen(false)}
                ref={ref}
                {...props}
                slots={{openPickerIcon: CalendarMonthOutlinedIcon,field: BrowserDateField, ...props.slots }}
                format="yyyy/MM/dd"
                value={value}
                onChange={(newValue) => onChange(newValue)}
            />
        );
    });

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <BrowserDatePicker />
                {/* <DesktopDatePicker
                    shouldDisableDate={disablebidingRangeDates}
                    minDate={new Date()}
                    maxDate={props?.taskDeadLine ? new Date(props?.taskDeadLine) : props?.projectDeadline ? new Date(props?.projectDeadline) : undefined}
                    open={open}
                    onClose={() => setIsOpen(false)}
                    inputFormat={"yyyy/MM/dd"}
                    value={props.value}
                    inputProps={{
                        placeholder: "YYYY/MM/DD"
                    }}
                    onChange={(newValue) => props.onChange(newValue)}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                        <div className={assignManage ? className : "datetimepicker-box"} onClick={() => setIsOpen((isOpen) => !isOpen)}>
                            <input ref={inputRef} {...inputProps}/>
                            {InputProps?.endAdornment}
                        </div>
                    )}
                /> */}
            </LocalizationProvider>
        </React.Fragment>
    );
}

export default DatePickers;
