import React, { useState } from "react";
import { ButtonBase } from '@mui/material'
import { ButtonLoader } from "../../loader/CommonBtnLoader";


const ProgressAnimateButton = (props) => {

  let {name, customclass} = props
  
  return (
    <ButtonBase disableRipple className={["progress-animate-button progressing", customclass].join(' ')}>
        <div className="button-loader-progress-row">
            <ButtonLoader />
            <span>{name ? name : "Processing"}</span>
        </div>
    </ButtonBase>
  )
}

export default ProgressAnimateButton