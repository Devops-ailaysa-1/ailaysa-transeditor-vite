import React from 'react'
import ErrorIcon from "@mui/icons-material/Error";
import Config from '../Config';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { setShowCampaignStrip } from '../../features/CampaignCouponStripSlice';
import PopperIcon from "../../assets/images/poper.svg"

const StartUpTNCampaignOffer = () => {
    
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const handleStipClose = () => {
        dispatch(setShowCampaignStrip(false))
        // import.meta.env.VITE_APP_COOKIE_DOMAIN 
        Cookies.set("hideCampaignStrip", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN });
    } 

    return (
        <React.Fragment>
            <div className="campaign-strip">
                <div className="d-flex align-items-center justify-content-center glb-alert-gap">
                    <img src={PopperIcon} alt="poper" />
                    <span className='content-text'>Tamil Nadu Startup Thiruvizha Offer : Join today & avail 30% discount using the coupon code: <b>STARTUPTN</b></span>
                    <a href={Config.USER_PORTAL_HOST + "/subscription-plans"} rel="noreferrer" target="_blank" className='campaign-avail-btn'>Avail now</a>
                    <div className="close-wrapper">
                        <span className="close" onClick={handleStipClose}>
                            <CloseIcon className="bar-char-close" />
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StartUpTNCampaignOffer