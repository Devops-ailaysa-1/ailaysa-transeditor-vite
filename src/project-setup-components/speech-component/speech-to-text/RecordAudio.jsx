import React, { useState, useEffect, createRef, useRef } from "react";
// import MicIcon from '@mui/icons-material/Mic';
// import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
// import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
// import Config from "../../../vendor/Config";
// import Slider from "./Slider";
import RecorderControls from "./recorder-components/RecorderControls";
import RecordingsList from "./recorder-components/RecordingList";
import useRecorder from "./recorder-components/RecorderHooks";

const RecordAudio = (props) => {

    const { recorderState, ...handlers } = useRecorder();
    const { audio, audioFile, tempBlob} = recorderState;

    let {
        isRecording,
        toggleRecording,
        audioPlayer,
        blobURL,
        setTime,
        play,
        setPlay,
        playPause,
        displayTime,
        timer,
        setSliderPercentage,
        sliderPercentage,
        handleSlider,
        getCurrentDuration,
        setDuration,
        secondsToHms,
        duration,
        currentTime,
        setAudioData,
        audioData,
        niceBytes
    }= props
    
    return (
        <React.Fragment>
            <div className="record-audio-work-area">

                {/* <div className="record-audio-wrapper">
                    <ButtonBase onClick={toggleRecording} className="icon-overview">
                        {
                            !isRecording ?
                            <MicIcon className="mic-icon" />
                            :
                            <span className="recording"></span>
                        }
                    </ButtonBase>
                    {
                        !isRecording ?
                        <p>Record your audio</p>
                        :
                        // Displays time
                        <p ref={displayTime}>{timer.current}</p> 
                    }
                </div> */}
                {/* {
                    blobURL?.length !== 0 && 
                    <>
                        <div className="rec-audio-file-list-wrapper">
                            {
                                blobURL?.map((blob, index) => {
                                    // console.log(blob)
                                    return (
                                        <div className="rec-audio-list-item">
                                            <div className="audio-file-info">
                                                <div className="file-info-wrapper">
                                                    <img src={`${Config.BASE_URL}/app/extension-image/audio`} alt="document"/>
                                                    <div className="file-name-wrap">
                                                        <span className="title">sample.mp3</span>
                                                        <small>0.00 MB</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="audio-play-pause">
                                                <ButtonBase className="play-pause-wrap" onClick={playPause}>
                                                    {play ? 
                                                        <img src={Config.HOST_URL + "assets/images/project-setup/voice/pause-icon.svg"} alt="pause-icon"/> 
                                                        : 
                                                        <PlayArrowRoundedIcon className="icon"/>
                                                    }
                                                </ButtonBase>
                                            </div>
                                            <div className="audio-player">
                                                <p className="audio-file-timings">{secondsToHms(currentTime)}</p>
                                                    <Slider
                                                        setSliderPercentage={setSliderPercentage}
                                                        sliderPercentage={sliderPercentage}
                                                        handleSlider={handleSlider} 
                                                    />
                                                    <audio
                                                        ref={audioPlayer}
                                                        src={blob}
                                                        onLoadedData={(e) => {setDuration(e.currentTarget.duration.toFixed(2))}}
                                                        onTimeUpdate={getCurrentDuration}
                                                        onEnded={() => setPlay(false)} //event handler when audio has stopped playing
                                                    />
                                                    <a href={blob} download="filename.mp3">DownloadButton</a>
                                                <p className="audio-file-timings">{secondsToHms(duration)}</p>
                                            </div>
                                            <div className="audio-file-remove">
                                                <span className="audio-file-delete">
                                                    <img src={Config.HOST_URL + "assets/images/new-ui-icons/close_black.svg"} alt="delete"/>
                                                </span>
                                            </div>
                                        </div>
                                      )
                                })
                            } 

                        </div>
                    </>
                } */}
                <RecorderControls recorderState={recorderState} handlers={handlers} />
            </div>
            <RecordingsList audio={audio} audioFile={audioFile} tempBlob={tempBlob} setAudioData={setAudioData} audioData={audioData} niceBytes={niceBytes}/>
        </React.Fragment>
    )
};

export default RecordAudio;