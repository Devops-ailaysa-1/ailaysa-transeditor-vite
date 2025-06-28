import React from 'react';
// import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Config from '../Config';

const CustomBookTooltip = () => {
        
    return (
        <div className='book-tooltip-warpper'>
            <div className="tooltip-arrow"><img src={Config.HOST_URL + "assets/images/tooltip-arrow.svg"} alt="" /></div>
            <div className="inner-wrapper">
                <span className='txt'>Select an option to start</span>
                <div className="close-btn">
                    {/* <HighlightOffRoundedIcon /> */}
                </div>
            </div>
        </div>
    )
}

export default CustomBookTooltip;