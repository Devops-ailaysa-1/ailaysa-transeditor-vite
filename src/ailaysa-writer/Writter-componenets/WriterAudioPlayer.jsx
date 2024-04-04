import React, { useEffect, useRef, useState } from 'react'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import { useTranslation } from 'react-i18next';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


const AudioSlider = styled(Slider)({
    color: '#0078D44D',
    height: 4,
    verticalAlign: 'middle',
    '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#0078D4',
    },
    '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        backgroundColor: '#0078D4',
        border: '0px solid currentColor',
        boxShadow: "0px 1px 2px #00000070",
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:after': {
            width: 14,
            height: 14
        },
        '&:before': {
            display: 'none',
        },
    },
});


const VolumeSlider = styled(Slider)({
    color: '#0078D44D',
    height: "100%",
    padding: 0,
    verticalAlign: 'middle',
    '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#0078D4',
    },
    '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        backgroundColor: '#0078D4',
        border: '0px solid currentColor',
        boxShadow: "0px 1px 2px #00000070",
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:after': {
            width: 14,
            height: 14
        },
        '&:before': {
            display: 'none',
        },
    },
});



const WriterAudioPlayer = (props) => {

    let {
        isAudioOrPdf,
        referenceFileUrl,
        referenceFileExt,
    } = props

    const { t } = useTranslation();

    const [volumeOpen, setVolumeOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const [volume, setVolume] = useState(1);

    const audioRef = useRef(null);
    const volumeOutsideClick = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (volumeOutsideClick.current && !volumeOutsideClick.current.contains(e.target)) {
                setVolumeOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAudioLoad = () => {
        setProgress(0);
        setIsPlaying(false);
        setCurrentTime('00:00');
    };

    const handleAudioEnded = () => {
        setProgress(0);
        setIsPlaying(false);
        setCurrentTime('00:00');
    };

    const handleVolumeChange = (event, newValue) => {
        const volumeValue = newValue / 100;
        setVolume(volumeValue);
        audioRef.current.volume = volumeValue;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = (event, newValue) => {
        setProgress(newValue);
        if (audioRef.current.duration) {
            audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
        }
    };

    const handleAudioTimeUpdate = () => {
        setProgress(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
        // Format current time and duration
        const currentTime = formatTime(audioRef.current.currentTime);
        const duration = formatTime(audioRef.current.duration);
        setCurrentTime(currentTime);
        setDuration(duration);
    };

    const formatTime = (time) => {
        if (!isFinite(time) || isNaN(time)) {
            return '00:00';  // Or any placeholder string
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // get the audio duration once file is loaded
    const handleLoadedMetadataChange = (e) => {
        const duration = formatTime(audioRef.current.duration);
        setDuration(duration);
    } 

    return (
        <>
            {isAudioOrPdf === 'audio' &&
                <div className="source-audio-player-writter-wrapper">
                    <span className="text">{t("source_audio")}</span>
                    <div className="audio-wrap">
                        <div className="play-pause">
                            {isPlaying ? (
                                <PauseRoundedIcon onClick={handlePlayPause} />
                            ) : (
                                <PlayArrowRoundedIcon onClick={handlePlayPause} />
                            )}
                        </div>
                        <div className="audio-time-wrap">
                            {currentTime} / {duration}
                        </div>
                        <div className="audio-slider-wrapper">
                            <AudioSlider
                                valueLabelDisplay="off"
                                aria-label="time-indicator"
                                value={progress}
                                onChange={handleSliderChange}
                                aria-labelledby="continuous-slider"
                            />
                        </div>
                        <audio
                            ref={audioRef}
                            src={referenceFileUrl}
                            type={`audio/${referenceFileExt}`}
                            onTimeUpdate={handleAudioTimeUpdate}
                            onLoadStart={handleAudioLoad}
                            onLoadedMetadata={handleLoadedMetadataChange}
                            onEnded={handleAudioEnded}
                        />
                        <div className="play-pause volume" onClick={() => setVolumeOpen(!volumeOpen)}>
                            {
                                volume === 0 ?
                                    <VolumeOffIcon className="volume-icon" />
                                    :
                                    <VolumeUpIcon className="volume-icon" />
                            }
                        </div>
                    </div>
                    {
                        volumeOpen &&
                        <div className="volume-wrapper" ref={volumeOutsideClick}>
                            <VolumeSlider
                                aria-label="time-indicator"
                                orientation="vertical"
                                valueLabelDisplay="off"
                                value={volume * 100}
                                onChange={handleVolumeChange}
                                aria-labelledby="continuous-slider"
                            />
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default WriterAudioPlayer