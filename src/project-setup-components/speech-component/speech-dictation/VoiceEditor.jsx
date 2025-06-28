import { EditorState, Modifier,ContentState } from "draft-js";
// import React, { useState,useEffect } from "react";
import { ButtonBase } from "@mui/material";
// import MicIcon from '@mui/icons-material/Mic';
// import MicOff from "@mui/icons-material/MicOff";
// import Config from "../../../vendor/Config";
// import ListenAnimation from "./listen-animation/ListenAnimation";
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import SquareIcon from '@mui/icons-material/Square';
import { useTranslation } from "react-i18next";

const SpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition
      || window.mozSpeechRecognition
      || window.msSpeechRecognition
      || window.oSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : {};
recognition.continuous = true;

export default function VoiceEditor(props) {
  const { t } = useTranslation();
  let{speechSourceLanguageOption,editorState,dictationInput, onEditorStateChange, isListening, setIsListening, dictationDataRef} = props;
  // const [isListening, setIsListening] = useState(false);
  recognition.lang = speechSourceLanguageOption;

  const handleListening = () => {
    if (!isListening) {
      try{
      recognition.start();
      setIsListening(true);
      }
      catch{
        recognition.stop();
        setIsListening(false);
      }
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  recognition.onresult = (e) => {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      transcript,
      editorState.getCurrentInlineStyle()
    );
    onEditorStateChange(EditorState?.push(editorState, contentState, "insert-characters"));
  };


  return (

    <div className="text-center start-listening-btn">
      <ButtonBase className={"listen-button " + (speechSourceLanguageOption !== null ? '' : 'record-action-disable')} onClick={handleListening}>
        <div className="d-flex gap-2 align-items-center">
        <span className={isListening ? "stop-icon" : "mic-icon" }>
          {isListening ? <SquareIcon style={{color: '#E74C3C', padding: '4px'}} /> : <MicOutlinedIcon style={{color: '#666666'}} />}
          <span className="txt">{isListening ? t("stop") : t("start")}</span>
            {/* {isListening && <ListenAnimation />} */}
        </span>
          {/* {isListening ? <MicOff className="icon"/> : <MicIcon className="icon"/> }
          {isListening ? <span className="txt">Stop Listening</span> : <span className="txt">Start Listening</span>} */}
        </div>
      </ButtonBase>
    </div>
  );
}
