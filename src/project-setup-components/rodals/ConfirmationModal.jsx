import React, { useEffect, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';

function ConfirmationModal(props) {

    const { 
          setShow 
        } = props

    // const AiMarkSubmit = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         height: "33px",
    //         padding: 0,
    //         "&:hover": {
    //             backgroundColor: "#0069B9",
    //             boxShadow: "none",
    //         },
    //         "&:disabled": {
    //             opacity: "0.6"
    //         }
    //     },
    // }))(Button);

    // const AiMarkCancel = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#ffffff",
    //         boxShadow: "none",
    //         borderRadius: "4px",
    //         border: "1px solid #DADCE0",
    //         textTransform: "none",
    //         height: "33px",
    //         padding: 0,
    //         "&:hover": {
    //             boxShadow: "none",
    //             height: "33px",
    //         },
    //         "&:focus":{
    //             border: "1px solid #0078D4",
    //             height: "33px",
    //         }
    //     },
    // }))(Button);

    const handleClose = () => {
        setShow(false);

    }
    
    // const handleYes = () => {
    //     console.log("yes");
    // }
    return(
        <React.Fragment>
            <div className="confirmation-wrapper-mod">
                <WarningIcon className="warning-icon" />
                <h2>
                    There are some segments which unconfirmed/unopened.
                    Still want to Download?
                </h2>

                <div className="button-row d-flex justify-content-between">
                    <button className="confirmation-modal-AiMarkCancel" onClick={handleClose}><span className="cancel-txt">No</span></button>
                    <button className="confirmation-modal-AiMarkSubmit"><span className="submit-txt">Yes</span></button>
                </div> 
            </div>
        </React.Fragment>
    )

}


export default ConfirmationModal;