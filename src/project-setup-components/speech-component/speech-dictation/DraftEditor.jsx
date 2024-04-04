import React, { useEffect, useState } from "react";
// import FileSaver from "file-saver";
import { EditorState, Modifier,ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import 'draft-js/dist/Draft.css';



import VoiceEditor from "./VoiceEditor";
import { Toolbar } from "./Toolbar";
// import ClearButton from "./ClearButton";
import { useTranslation } from "react-i18next";



const DraftEditor = (props) => {
  const { t } = useTranslation();


  let{speechSourceLanguageOption, setDictationInput, dictatedData, setDictatedData, dictationInput, dictationDataRef} = props
  const [editorState, setEditorState] = useState(EditorState.createWithContent(
    ContentState.createFromText(dictationInput != null ? dictationInput : ""  )
   ));

   const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  
  

  // useEffect(() => {
  //   if(editorState !== null){
  //     setDictationInput(editorState.getCurrentContent().getPlainText())
  //   }
  // }, [editorState])

    useEffect(() => {
    // if(dictationInput !== null){
      // console.log(dictationInput);
    // }
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      dictationInput,
      editorState.getCurrentInlineStyle()
    );
    EditorState?.push(editorState, contentState, "insert-characters")
    if(dictationInput == null ){
      setEditorState(EditorState.createWithContent(
        ContentState.createFromText("")
       ))
    }
  }, [dictationInput])

 

  return (
    <div className='ts-dictation'>
      {/* <Editor
        editorState={editorState}
        wrapperClassName=""
        editorClassName="ts-draft-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={Toolbar}
        placeholder={`${t("press_strt_to_dictate")}...`}
        toolbarCustomButtons={[]}
      /> */}
       <VoiceEditor className="voice-button" 
              speechSourceLanguageOption={speechSourceLanguageOption} 
              isListening={props.isListening}
              setIsListening={props.setIsListening}
              dictationInput={dictationInput} 
              dictationDataRef={dictationDataRef}
              onEditorStateChange={onEditorStateChange}
              editorState={editorState}
            />
      {/* <VoiceEditor className="voice-button" speechSourceLanguageOption={speechSourceLanguageOption}  editorState={editorState} /> */}
    </div>
  );
};

export default DraftEditor;