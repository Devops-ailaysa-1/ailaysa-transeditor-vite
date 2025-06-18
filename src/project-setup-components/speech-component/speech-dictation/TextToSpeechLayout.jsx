// import React, { useEffect, useState, useRef } from "react";
// import DraftEditor from "./DraftEditor";
// // import FileSaver from "file-saver";
// import { ButtonBase } from "@mui/material";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
// // import Config from "../../../Config";
// import {languageses, Targetlanguageses } from "./languages"
// import { AnimatePresence,motion } from "framer-motion";
// import Select,{ components} from 'react-select';

// const TextToSpeechLayout = () => {
//     const LABS_API = Config.LABS_API;
//     const [translated, setTranslated] = useState('');
//     const [speechSourceLanguageOption, setSpeechSourceLanguageOption] = useState('en'); // int
//     const [speechTargetLanguageOption, setSpeechTargetLanguageOption] = useState(0); // int
//     const [translateContent, setTranslateContent] = useState("");
//     const [audioUrl, setAudioUrl] = useState(null);
//     const [audioBlob, setAudioBlob] = useState(null); 

//     // const handleAuthTrue = (authentication) => {
//     //     let token = Config.userState != null ? Config.userState.token : "";
//     //     authentication.append("Authorization", `Bearer ${token}`)
//     //     return authentication;
//     // }

//     // const handleSave = () => {
//     //     const down = translated;
//     //     var blob = new Blob([down], {
//     //       type: "text/plain;charset=utf-8"
//     //     });
//     //     FileSaver.saveAs(blob, "YourTranslation.txt");
//     //   };

//     const handleChange = (e) => {
//         setTranslated(e.target.value);
//     }

//     const [clickedTranslated, setClickedTranslated] = useState(false);

//     // const googleTranslate = async () => {
//     //     setClickedTranslated(true);
//     //     var formdata = new FormData();
//     //     formdata.append("Input", translateContent);
//     //     formdata.append("target_language", speechTargetLanguageOption.language);
//     //     var requestOptions = {
//     //         method: 'POST',
//     //         headers: handleAuthTrue(new Headers()),
//     //         body: formdata,
//     //         redirect: 'follow'
//     //     };
//     //     let data = await fetch(LABS_API + "/voice/translate/", requestOptions);

//     //     if (data.status === 200) {
//     //         let response = await data.json();
//     //         setTranslated(response.text);
//     //     }
//     //     else {
//     //         console.log('error');
//     //     }
//     // }

//     // const googleVoice = async () => {
//     //     var formdata = new FormData();
//     //     formdata.append("translated_text", translated);
//     //     formdata.append("language", speechTargetLanguageOption.language);
//     //     var requestOptions = {
//     //         method: 'POST',
//     //         headers: handleAuthTrue(new Headers()),
//     //         body: formdata,
//     //         redirect: 'follow'
//     //     };
//     //     let data = await fetch(LABS_API + "/voice/text_to_speech/", requestOptions);
//     //     if (data.status === 200) {
//     //         let response = await data.blob();
//     //         // FileSaver.saveAs(response, "audio");
//     //         // setAudioBlob(response)
//     //         setAudioUrl(URL.createObjectURL(response));
//     //         setAudioBlob(response);
//     //         document.getElementById('player').play();
//     //     }
//     //     else {
//     //         console.log('error');
//     //     }
//     // }

//     const handleDown = () => {
//         // FileSaver.saveAs(audioBlob, "audio");
//         setTranslateContent("");
//         setTranslated("");
//         setAudioUrl("");
//         setAudioBlob("");
//         setSpeechTargetLanguageOption([]);
//     }

//     const customAssignStyles = {
//         placeholder: (provided, state) => ({
//             ...provided,
//             color: "#3C4043",
//             fontFamily: "Roboto",
//             fontSize: "15px",
//             fontWeight: "500",
//             lineHeight: "24px",
//         }),
//         menu: (provided, state) => ({
//             ...provided,
//             padding: "6px 0px",
//             boxShadow: "0px 3px 6px #00000029",
//             border: "1px solid #DADADA",
//             borderRadius: "4px",
//         }),
//         option: (provided, state) => ({
//             ...provided,
//             borderBottom: "0px solid #CED4DA",
//             borderLeft: "2px solid transparent",
//             color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
//             background: state.isSelected ? "#F4F5F7" : "#ffffff",
//             padding: "2px 8px",
//             color: "#3C4043",
//             fontSize: "15px",
//             fontWeight: "400",
//             lineHeight: "24px",
//             "&:hover": {
//                 background: "#F4F5F7",
//                 borderLeft: "2px solid #0074D3",
//                 cursor: "pointer",
//             },
//         }),
//         control: (base, state) => ({
//             ...base,
//             border: 0,
//             borderRadius: 4,
//             transtion: 0.3,
//             color: state.isFocused ? "#0074D3" : "#3C4043",
//             fontFamily: "Roboto",
//             fontSize: "15px",
//             fontWeight: "500",
//             lineHeight: "24px",
//             minWidth: "200px",
//             minHeight: 44,
//             padding: 0,
//             height: state.isFocused ? 44 : 44,
//             boxShadow: 0,
//             "&:hover": {
//                 cursor: "pointer",
//                 backgroundColor: "#EBEBEB",
//                 height: 44,
//             },
//         }),
//     };

//     const DropdownIndicator = (props) => {
//         return (
//             <components.DropdownIndicator {...props}>
//                 <ArrowDropDownIcon className="icon" />
//             </components.DropdownIndicator>
//         );
//     };   

//     return (
//         <React.Fragment>
//             <div className="tts-section-wrap">
//                 <div className="ai-translation-textarea-wrapper1">
//                     <DraftEditor speechSourceLanguageOption={speechSourceLanguageOption} setSpeechTargetLanguageOption={setSpeechTargetLanguageOption} setTranslated={setTranslated} setAudioBlob={setAudioBlob} setAudioUrl={setAudioUrl} setTranslateContent={setTranslateContent}/>
//                     <div className="d-flex justify-content-between">
//                         <div className="lang-select-wrap">
//                             {/* <ButtonBase>
//                                 <select
//                                     className="language-button"
//                                     name="language"
//                                     id="language"
//                                     value={speechSourceLanguageOption}
//                                     onChange={(e) => {
//                                         setSpeechSourceLanguageOption(e.target.value)
//                                     }}
//                                 >
//                                     <option className="d-flex gap-2 txt">
//                                         Source Language
//                                     </option>
//                                     {languageses.map((lang) => (
//                                         <option value={lang.code} key={lang.code}>
//                                             {lang.language}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </ButtonBase> */}
//                             {/* <ButtonBase className="language-button">
//                                 <div className="d-flex gap-2">
//                                     <span className="txt">Target Language</span>
//                                     <ArrowDropDownIcon className="icon" />
//                                 </div>
//                             </ButtonBase> */}
//                             {/* <ButtonBase disabled={translateContent? false : true}>
//                                 <select
//                                     className="language-button"
//                                     name="language"
//                                     id="language"
//                                     // disabled={translateContent ? false : true}
//                                     value={speechTargetLanguageOption}
//                                     onChange={(e) => {
//                                         setSpeechTargetLanguageOption(e.target.value)
//                                     }}
//                                 >
//                                     <option>Target Language</option>
//                                     {Targetlanguageses.map((lang) => (
//                                         <option value={lang.language} key={lang.code}>
//                                             {lang.language}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </ButtonBase> */}
//                             <Select
//                                 classNamePrefix="language-button"
//                                 styles={customAssignStyles}
//                                 isSearchable={false}
//                                 options={languageses}
//                                 getOptionLabel={(option) => option.language}
//                                 getOptionValue={(option) => option.code}
//                                 hideSelectedOptions={false}
//                                 value={speechSourceLanguageOption}
//                                 onChange={setSpeechSourceLanguageOption}
//                                 placeholder="English"
//                                 components={{ DropdownIndicator, IndicatorSeparator: () => null }}

//                             />
//                             <Select
//                                 classNamePrefix="language-button"
//                                 styles={customAssignStyles}
//                                 isSearchable={false}
//                                 options={Targetlanguageses}
//                                 getOptionLabel={(option) => option.language}
//                                 getOptionValue={(option) => option.code}
//                                 hideSelectedOptions={false}
//                                 value={speechTargetLanguageOption}
//                                 onChange={setSpeechTargetLanguageOption}
//                                 placeholder="Target Language"
//                                 components={{ DropdownIndicator, IndicatorSeparator: () => null }}

//                             />
//                         </div>
//                         {/* <ButtonBase className="translate-button" onClick={googleTranslate} disabled={translateContent && speechTargetLanguageOption ? false : true}>
//                             <span className="txt">Translate</span>
//                         </ButtonBase> */}
//                     </div>

//                 </div>
//             <AnimatePresence>
//                 {
//                     translated &&
//                     <motion.div
//                         animate={{ opacity: 1, y: 0 }}
//                         initial={{ opacity: 0, y: -20 }}
//                         exit={{ opacity: 0, y: 20 }}
//                         transition={{ duration: 0.4 }}
//                         className="ai-txt-area"
//                     >
//                         <div className="ai-translatiion-main-wrap">
//                             <h3>Translated Text</h3>

//                             <div className="ai-translation-textarea-wrapper2">
//                                 <textarea className="ai-translation-textarea" value={translated} onChange={handleChange} placeholder="Type your text here...">
//                                 </textarea>
//                                 <div className="speech-down-wrap">
//                                     {/* <ButtonBase className="speech-button" onClick={googleVoice} disabled={translated ? false : true}>
//                                         <div className="d-flex gap-2 align-items-center">
//                                             <VolumeUpRoundedIcon className="icon" />
//                                             <span className="txt">Read Text</span>
//                                         </div>
//                                     </ButtonBase> */}
//                                     <ButtonBase className="download-button" onClick={handleDown} type="button" disabled={audioBlob ? false : true}>
//                                         <div className="d-flex gap-2 align-items-center">
//                                             <FileDownloadOutlinedIcon className="icon" />
//                                             <span className="txt">Download .mp3</span>
//                                         </div>
//                                     </ButtonBase>
//                                 </div>
//                                 <div className="display">
//                                     <audio id="player" src={audioUrl} autoPlay />
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 }
//             </AnimatePresence>
//             </div>

//         </React.Fragment >

//     )

// }

// export default TextToSpeechLayout;