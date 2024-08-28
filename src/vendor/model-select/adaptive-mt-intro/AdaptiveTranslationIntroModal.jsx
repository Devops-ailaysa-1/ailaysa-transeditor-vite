import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import './adaptive_mt_intro.css'
import Thumbnail from '../../../assets/images/adptive-thumbnail.png'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAdaptiveMTIntroModal } from '../../../features/ShowAdaptiveTransIntroModalSlice';
import Cookies from "js-cookie";

export const AdaptiveTranslationIntroModal = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    let showAdaptiveTransIntroModal = useSelector(state => state.showAdaptiveTransIntroModal.value)


    const handleModalClose = () => {
        dispatch(setShowAdaptiveMTIntroModal(false))
        Cookies.set("adaptive-mt-intro", true, { domain: import.meta.env.VITE_APP_COOKIE_DOMAIN, expires: 365 * 5 })
    } 

    return (
        <Rodal
            className="adaptive-mt-intro-modal" 
            visible={showAdaptiveTransIntroModal} 
            onClose={handleModalClose}
            showCloseButton={false}
        >
            <IconButton 
                className='absolute right-1 top-1'
                onClick={handleModalClose}
            >
                <Close className="header-close" /> 
            </IconButton>
            <div className='modal-wrapper w-full h-full flex'>
                <div className="left-container w-[40%] h-full">
                    
                </div>
                <div className="right-container w-[60%] h-full py-4">
                    <div className="new-feature-tag">
                        {t("new_feature")}
                    </div>
                    <h2>{t("adaptive_trans")}</h2>
                    <p>{t("adaptive_trans_desc")}</p>

                    <img 
                        src={Thumbnail} 
                        alt="thumbnail"
                        className="mt-4 mb-3" 
                    />
                    <ul className="p-0 space-y-2">
                        {Array(4).fill().map((each, ind) => (
                            <li className="flex items-center gap-2">
                                <CheckCircleRoundedIcon style={{color: "#0673F7"}} />
                                {t(`adaptive_trans_point_${ind + 1}`)}
                            </li> 
                        ))}
                    </ul>
                </div>
            </div>
        </Rodal>
    )
}
