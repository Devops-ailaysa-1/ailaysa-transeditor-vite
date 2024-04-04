import React, { useState, useEffect, createRef, useRef } from "react";
import useRecordingsList from "./RecordingsListHook";
import Slider from "../Slider";
import ButtonBase from '@mui/material/ButtonBase';
import Config from "../../../../Config";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import getBlobDuration from 'get-blob-duration'
import { useTranslation } from "react-i18next";
import PauseIcon from "../../../../assets/images/project-setup/voice/pause-icon.svg"
import CloseBlackIcon from "../../../../assets/images/new-ui-icons/close_black.svg"

export default function RecordingsList({ audio, audioFile, setAudioData, audioData, niceBytes, tempBlob}) {
  const { t } = useTranslation();
  const { deleteAudio } = useRecordingsList({audio, audioFile, tempBlob, setAudioData, audioData });
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderPercentage,setSliderPercentage] = useState(0);

  const audioPlayer = useRef(null); //Ref for HTML Audio tag
  const displayTime = useRef(null); //Stores dom ref for div to be used to display time

  const [sliderPosition, setSlidePosition] = useState(0)
  const [thumbMarginLeft, setThumbMarginLeft] = useState(0)
  const [sliderProgressWidth, setSliderProgressWidth] = useState(0)

  const [currentSlider, setCurrentSlider] = useState(null)
  const [currentThumb, setCurrentThumb] = useState(null)
  const [bar, setBar] = useState(null)
  const [isPlaying, setIsPlaying] = useState(null)

  const [totDuration, setTotDuration] = useState(0)
  const [inputRangeValue, setInputRangeValue] = useState(null)
  const [audioTagId, setAudioTagId] = useState(null)
  const [currentTimeText, setCurrentTimeText] = useState(null)
  const [currentAudioTime, setCurrentAudioTime] = useState(null)

  const sliderRangeRef = useRef()
  const sliderThumbRef = useRef()

  

  useEffect(() => {
    // console.log(sliderPercentage)
        const slider = document.getElementById(currentSlider);
        const temp = document.getElementById(currentSlider);
        if(slider !== undefined){
            try{
                slider.value = sliderPercentage
            }catch(e){
                // console.log(e)
            }
        }
        let thumb = document.getElementById(currentThumb);
        const sliderRangeWidth = slider?.getBoundingClientRect()?.width
        const thumbWidth = thumb?.getBoundingClientRect()?.width
        const centerThumb = (thumbWidth / 100) * sliderPercentage * -1
        const centerProgressBar = thumbWidth + sliderRangeWidth/100 * sliderPercentage - (thumbWidth/100 * sliderPercentage)
        try{
            thumb.style.left = `${sliderPercentage}%`
            thumb.style.marginLeft = `${centerThumb}px`
        }catch(e){
            // console.log(e)
        }

        let progressBar = document.getElementById(bar)
        try{
            progressBar.style.width =  `${centerProgressBar}px`
        }catch(e){
            // console.log(e)
        }
  }, [sliderPercentage])
  

    const playPause = (e, id, sliderId, thumbId, barID, playPauseId, audPlayer) => {
        setCurrentSlider(sliderId)
        setCurrentThumb(thumbId)
        setBar(barID)
        setIsPlaying(playPauseId)
        setTotDuration(null)
        let player = document.getElementById(id);
        
        player.addEventListener('play', function(e) {
            var audios = document.getElementsByTagName('audio');
        
            for (var i = 0, len = audios.length; i < len; i++) {
                if (audios[i] != e.target) {
                    audios[i].pause();
                    // setPlay(false)
                }
            }
        }, true);
        if (player.duration > 0 && !player.paused) {
            setPlay(false)
            player.pause();
        } 
        else {
            setPlay(true)
            player.play();
        }
    };

     
    const getDurationTime = (e, id, blob, currentDurationId) => {
        let audio = document.getElementById(id)
        getBlobDuration(blob).then(function(duration) {
            document.getElementById(currentDurationId).innerHTML = secondsToHms(duration)
            audio = Math.floor(duration);
        });
    }

    useEffect(() => {
      if(totDuration !== null && totDuration !== Infinity && currentTimeText !== null && currentAudioTime !== null){
        // console.log(totDuration)
        const sliderPercent = ((currentAudioTime / totDuration) * 100).toFixed(2)
        const audioTime = currentAudioTime
        // console.log(currentAudioTime)
        // console.log(sliderPercent)

        setSliderPercentage(+sliderPercent)
        document.getElementById(currentTimeText).innerHTML = secondsToHms(audioTime?.toFixed(2))
      }
    }, [currentAudioTime, totDuration])
    
    
    const getCurrentDuration = (e, id, blob, currentTimeId) => {
        let player = document.getElementById(id);
        getBlobDuration(blob).then(function(duration) {
            setTotDuration(duration)
        });
        setCurrentTimeText(currentTimeId)
        setCurrentAudioTime(player.currentTime)
        // console.log(totDuration)
        // const sliderPercent = ((player.currentTime / totDuration) * 100).toFixed(2)
        // const audioTime = player.currentTime
        // console.log(sliderPercent)

        // setSliderPercentage(+sliderPercent)
        // document.getElementById(currentTimeId).innerHTML = secondsToHms(audioTime?.toFixed(2))
    }

    const handleSlider = (blob, id, e, sliderId, thumbId, barID, playPauseId) => {
        setCurrentSlider(sliderId)
        setCurrentThumb(thumbId)
        setBar(barID)
        setIsPlaying(playPauseId)
        setAudioTagId(id)
        const audio = document.getElementById(id);
        setInputRangeValue(e.target.value)
        audio.currentTime = (totDuration / 100) * e.target.value
        
        setSliderPercentage(e.target.value)
    }


    // useEffect(() => {
    //   if(totDuration !== null && inputRangeValue !== null && audioTagId !== null){
    //     // console.log(totDuration)
    //     // console.log(inputRangeValue)
    //     const audio = document.getElementById(audioTagId);
    //     // console.log((totDuration / 100) * inputRangeValue)
    //     audio.currentTime = (totDuration / 100) * inputRangeValue
    //   }
    // }, [totDuration, inputRangeValue, audioTagId])
    
    

    function secondsToHms(seconds) {
        if (!seconds) return '00:00'
    
        let duration = seconds
        let hours = duration / 3600
        duration = duration % 3600
    
        let min = parseInt(duration / 60)
        duration = duration % 60
    
        let sec = parseInt(duration)
    
        if (sec < 10) {
          sec = `0${sec}`
        }
        if (min < 10) {
          min = `0${min}`
        }
    
        if (parseInt(hours, 10) > 0) {
          return `${parseInt(hours, 10)}:${min}:${sec}`
        } else if (min == 0) {
          return `00:${sec}`
        } else {
          return `${min}:${sec}`
        }
    }
    // console.log(audioData);

    const setAudioDataDelete=(deleteRecording) =>{
        // console.log(deleteRecording);
        deleteAudio(deleteRecording)
        // Config.removeItemFromArray(recordings,deleteRecording )

        
    }

    
//   useEffect(() => {

//     if(recordings.length !== 0 || (recordings.length === 0 && audioData.length !== 0)){
//         console.log(recordings);
//         setAudioData(recordings)
//     }

//   }, [recordings])

  return (
      <>
        {
            audioData.length > 0 && 
            (
                <div className="recordings-container">
                    <div className="rec-audio-file-list-wrapper">
                        {audioData.map((record, index) => {
                            // console.log(record)
                            return(
                                <div className="rec-audio-list-item" key={record.key}>
                                    <div className="audio-file-info">
                                        <div className="file-info-wrapper">
                                            <img src={`${Config.BASE_URL}/app/extension-image/audio`} alt="document"/>
                                            <div className="file-name-wrap">
                                                <span className="title">{record.audioFile.name}</span>
                                                <small>{niceBytes(record.audioFile.size)}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="audio-play-pause">
                                        <ButtonBase id={`audio-play-pause-${index}`} className="play-pause-wrap" onClick={(e) => playPause(e, record.key, `audio-slider-${index}`, `audio-thumb-${index}`, `bar-${index}`, `audio-play-pause-${index}`, `player-${index}`)}>
                                            {(play && isPlaying == `audio-play-pause-${index}`) ? 
                                                <img src={PauseIcon} alt="pause-icon"/>
                                                : 
                                                <PlayArrowRoundedIcon className="icon"/>
                                            }
                                        </ButtonBase>
                                    </div>
                                    <div className="audio-player">
                                        <p className="audio-file-timings" id={`audio-currentTime-${index}`}>00:00</p>
                                            <div className="audio-slider-container">
                                                <div className="audio-progress-bar-cover" id={`bar-${index}`}></div>
                                                <div className="audio-thumb" id={`audio-thumb-${index}`} ref={sliderThumbRef}></div>
                                                <input type="range" 
                                                    id={`audio-slider-${index}`} 
                                                    // value={sliderPercentage} 
                                                    ref={sliderRangeRef} 
                                                    step="0.01" 
                                                    onChange={(e) => handleSlider(record.audio, record.key, e, `audio-slider-${index}`, `audio-thumb-${index}`, `bar-${index}`, `audio-play-pause-${index}`)} 
                                                    className="slider-range"
                                                />
                                            </div>
                                        <p className="audio-file-timings" id={`audio-duration-Time-${index}`}></p>
                                    </div>
                                    {/* <a href={record.audio}>Download</a> */}
                                    <audio
                                        ref={audioPlayer}
                                        id={record.key}
                                        preload="auto"
                                        className={`player-${index}`}
                                        onLoadedData={(e) => getDurationTime(e,record.key, record.audio, `audio-duration-Time-${index}`)}
                                        onTimeUpdate={(e) => getCurrentDuration(e, record.key, record.audio, `audio-currentTime-${index}`)}
                                        onEnded={(e) => {setPlay(false);}}
                                        onPlay={(e) => {sliderPercentage == 100 && setSliderPercentage(0)}}
                                    >
                                        <source src={record.audio} type="audio/mp3"/>
                                    </audio>
                                    <div className="audio-file-remove">
                                        <span className="audio-file-delete" onClick={() => {
                                        setAudioDataDelete(record.key);
                                         } }>
                                            <img src={CloseBlackIcon} alt="delete"/>
                                        </span>
                                    </div>
                                    {/* <button onClick={(e) => getDurationTime(e, record.key)}>check</button> */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
      </>
  );
}