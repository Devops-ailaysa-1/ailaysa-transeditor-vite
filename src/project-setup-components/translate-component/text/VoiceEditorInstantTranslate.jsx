import { EditorState, Modifier,ContentState } from "draft-js";
import React, { useState,useEffect } from "react";
import { ButtonBase } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOff from "@mui/icons-material/MicOff";
// import Config from "../../../vendor/Config";
// import ListenAnimation from "./listen-animation/ListenAnimation";
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import SquareIcon from '@mui/icons-material/Square';
// import GraphemeSplitter from 'grapheme-splitter';

const SpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition
      || window.mozSpeechRecognition
      || window.msSpeechRecognition
      || window.oSpeechRecognition;

var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
  
const recognition = SpeechRecognition ? new SpeechRecognition() : {};
const speechRecognitionList = SpeechGrammarList ? new SpeechGrammarList() : {};
recognition.grammars = speechRecognitionList;
recognition.continuous = true;

export default function VoiceEditorInstantTranslate(props) {
	let{
		selectedDictationLang,
		targetLanguageOptionsRef,
		editor,
		from,
		summerNoteEditorRef,
		voiceDictationLangState
	} = props;

	const [isListening, setIsListening] = useState(false);

	// if(from){
		useEffect(() => {
			if(from?.current === 'writter'){
				recognition.lang = document?.querySelector('.note-dictation')?.firstChild?.ariaValueText;
			}

		},[voiceDictationLangState]);			
	// }
	
	useEffect(() => {
		if(from?.current === 'instant'){
			if(targetLanguageOptionsRef.current !== null && selectedDictationLang !== ''){
				recognition.lang = targetLanguageOptionsRef?.current?.find(eachlang => eachlang.language === selectedDictationLang?.label)?.locale_code;
			}
		}
	}, [targetLanguageOptionsRef?.current,selectedDictationLang]);

	const handleListening = () => {
		if (!isListening) {
		try{
		recognition.start();
		document.querySelector('button[aria-label="Dictation"]')?.classList.add('active');
		setIsListening(true);
		}
		catch{
			recognition.stop();
			document.querySelector('button[aria-label="Dictation"]')?.classList.remove('active');
			setIsListening(false);
		}
		} else {
		recognition.stop();
		document.querySelector('button[aria-label="Dictation"]')?.classList.remove('active');
		setIsListening(false);
		}
	};

	function getCaretCharacterOffsetWithin(element) {
		var caretOffset = 0;
		var doc = element.ownerDocument || element.document;
		var win = doc.defaultView || doc.parentWindow;
		var sel;
		if (typeof win.getSelection != "undefined") {
			sel = win.getSelection();
			if (sel.rangeCount > 0) {
			var range = win.getSelection().getRangeAt(0);
			var preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			caretOffset = preCaretRange.toString().length;
			}
		} else if ((sel = doc.selection) && sel.type != "Control") {
			var textRange = sel.createRange();
			var preCaretTextRange = doc.body.createTextRange();
			preCaretTextRange.moveToElementText(element);
			preCaretTextRange.setEndPoint("EndToEnd", textRange);
			caretOffset = preCaretTextRange.text.length;
		}
		return caretOffset;
	}
   
	recognition.onresult = (e) => {
		const current = e.resultIndex;
		const transcript = e.results[current][0].transcript;
		var caretPosition = getCaretCharacterOffsetWithin(document.querySelector('.note-editable'));
		console.log(caretPosition)
		if(caretPosition !== 0){
			editor?.summernote('pasteHTML', "<span>" + transcript +"<span>");
		}else{
			editor?.summernote('focus');
			editor?.summernote('restoreRange');
			editor?.summernote('pasteHTML', "<span>" + transcript +"<span>");
		}
	};

  return (
    <div className="text-center start-listening-btn" style={{ display: from?.current === 'instant'? 'block' : 'none'}} >
      <ButtonBase className={"listen-button "} onClick={handleListening} id="dictate-btn" type="button">
        <div className="mic-icon">
        <span className={isListening ? "mic-icon" : "mic-icon" }>
          {isListening ? <SquareIcon style={{color: '#E74C3C', padding: '4px'}} /> : <MicOutlinedIcon style={{color: '#666666'}} />}
            {/* {isListening && <ListenAnimation />} */}
        </span>
          {/* {isListening ? <MicOff className="icon"/> : <MicIcon className="icon"/> }
          {isListening ? <span className="txt">Stop Listening</span> : <span className="txt">Start Listening</span>} */}
        </div>
      </ButtonBase>
      {/* <span className="txt">speak to type</span> */}
    </div>
  );
}
