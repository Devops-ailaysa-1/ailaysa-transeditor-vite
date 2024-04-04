import React from 'react';
import downloading from './downloading.json'
// import Lottie from 'react-lottie'
import Lottie from 'lottie-react';


const DownloadAnimation = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: downloading,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    }

    return ( 
        <div className='downloading-animation ai-fadeIn'> 
            <Lottie options={defaultOptions} isClickToPauseDisabled={true}/>
        </div>
    )
}

export default DownloadAnimation