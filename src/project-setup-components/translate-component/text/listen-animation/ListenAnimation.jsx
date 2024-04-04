import React from 'react';
import listen from './animation-file/listen.json'
// import Lottie from 'react-lottie'
import Lottie from 'lottie-react';


const ListenAnimation = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: listen,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    }

    return ( 
        <div className='listen-loader ai-fadeIn'> 
            <Lottie options={defaultOptions} isClickToPauseDisabled={true}/>
        </div>
    )
}

export default ListenAnimation