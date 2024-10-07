import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import './adaptive_mt_intro.css'
import Thumbnail from '../../../assets/images/adaptive-translation/adptive-thumbnail.png'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAdaptiveMTIntroModal } from '../../../features/ShowAdaptiveTransIntroModalSlice';
import Cookies from "js-cookie";
import { imageData } from './imageData';

export const AdaptiveTranslationIntroModal = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    let showAdaptiveTransIntroModal = useSelector(state => state.showAdaptiveTransIntroModal.value)

    const [showVideo, setShowVideo] = useState(false)
    const [sideImg, setSideImg] = useState(null)

    const randomIndex = Math.floor(Math.random() * imageData.length);

    const randomImage = imageData[randomIndex];

    useEffect(() => {
        let mask = document.querySelector('.rodal-mask')
        const handleKeyDown = (e) => {
            if(e.which === 27){
                handleModalClose()
            }
        } 
        if(mask) {
            mask.addEventListener('click', handleModalClose)
            document.addEventListener('keydown', handleKeyDown)
            
            return () => {
                mask.removeEventListener('click', handleModalClose)
                document.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [document.querySelector('.rodal-mask')])
    

    useEffect(() => {
        let img = imageData?.find(each => each.id == (Math.floor(Math.random() * 3) + 1))?.img
        setSideImg(img)
    }, [imageData])
    

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
                className={[
                    'absolute',
                    !showVideo ? "top-1 right-1" : "-right-8 -top-6 bg-white hover:bg-gray-200 p-1", 
                ].join(' ')}
                onClick={handleModalClose}
            >
                <Close className={[
                    "header-close text-black",
                    showVideo && "text-[20px]"
                ].join(" ")} /> 
            </IconButton>
            <div className='modal-wrapper w-full h-full flex overflow-hidden rounded-[10px]'>
                {showVideo ? (
                    <iframe 
                        width="560" 
                        height="315" 
                        className='flex-1 w-full h-full'
                        src="https://www.youtube.com/embed/zLOvWmSwhwE?si=fnXE53WItHT0vii0&autoplay=1" 
                        title="YouTube video player" 
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <>
                        <div className="left-container w-[40%] h-full">
                            <img 
                                src={randomImage}
                                onError={(e) => {e.target.src = Image3}}
                                alt="left side image"
                                className='w-full h-full object-cover' 
                            />
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
                                className="mt-4 mb-3 hover:contrast-75 cursor-pointer outline outline-solid outline-[#E5E8EC] rounded-lg" 
                                onClick={() => setShowVideo(true)}
                            />
                            
                            <ul className="p-0 space-y-2">
                                {Array(4).fill().map((each, ind) => (
                                    <li className="flex items-center gap-2">
                                        <CheckCircleRoundedIcon style={{color: "#0673F7", fontSize: '20px'}} />
                                        {t(`adaptive_trans_point_${ind + 1}`)}
                                    </li> 
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </Rodal>
    )
}
