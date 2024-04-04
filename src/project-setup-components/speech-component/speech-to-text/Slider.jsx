import React, { useState, useEffect, createRef, useRef } from "react";

const Slider = (props) => {
    let {
        setSliderPercentage,
        sliderPercentage,
        handleSlider
    } = props

    const [sliderPosition, setSlidePosition] = useState(0)
    const [thumbMarginLeft, setThumbMarginLeft] = useState(0)
    const [sliderProgressWidth, setSliderProgressWidth] = useState(0)

    const sliderRangeRef = useRef()
    const sliderThumbRef = useRef()
    useEffect(() => {
        const sliderRangeWidth = sliderRangeRef.current.getBoundingClientRect().width
        const thumbWidth = sliderThumbRef.current.getBoundingClientRect().width
        const centerThumb = (thumbWidth / 100) * sliderPercentage * -1
        const centerProgressBar = thumbWidth + sliderRangeWidth/100 * sliderPercentage - (thumbWidth/100 * sliderPercentage)
        setThumbMarginLeft(centerThumb)
        setSlidePosition(sliderPercentage)
        setSliderProgressWidth(centerProgressBar)
    }, [sliderPercentage])
    

    return(
        <React.Fragment>
            <div className="audio-slider-container">
                <div className="audio-progress-bar-cover" style={{
                    width: `${sliderProgressWidth}px`
                }}></div>
                <div className="audio-thumb" ref={sliderThumbRef} style={{
                    left: `${sliderPosition}%`,
                    marginLeft: `${thumbMarginLeft}px`
                }}></div>
                <input type="range" value={sliderPosition} ref={sliderRangeRef} step="0.01" onChange={(e) => handleSlider(e)} className="slider-range"/>
            </div>
        </React.Fragment>
    )
};

export default Slider;