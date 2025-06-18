import React from 'react';
import DraftEditor from '../speech-dictation/DraftEditor';

export const SpeechDictation = (props) => {
    let {speechSourceLanguageOption, setDictationInput, dictationInput, dictationDataRef} = props;
    
  return (
    <div>
        <React.Fragment>
        {/* <DraftEditor 
            speechSourceLanguageOption={speechSourceLanguageOption} 
            setDictationInput={setDictationInput}
            isListening={props.isListening}
            setIsListening={props.setIsListening} 
            dictatedData={props.dictatedData}
            setDictatedData={props.setDictatedData} 
            dictationInput={dictationInput}
            dictationDataRef={dictationDataRef}
            // editorState={props.editorState}
            // setEditorState={props.setEditorState}
            // setSpeechTargetLanguageOption={setSpeechTargetLanguageOption} setTranslated={setTranslated} setAudioBlob={setAudioBlob} setAudioUrl={setAudioUrl} setTranslateContent={setTranslateContent}
        /> */}
        </React.Fragment>
    </div>
  )
}
