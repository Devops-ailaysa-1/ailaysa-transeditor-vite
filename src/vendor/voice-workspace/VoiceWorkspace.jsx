// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect, useRef } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import Config from "../Config";
// import Navbar from "../Navbar";
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
// import { useQuill } from "react-quilljs";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import "quill/dist/quill.snow.css";
// import Rodal from "rodal";
// import "rodal/lib/rodal.css";
// import TargetLanguage from "../lang-modal/Targetlanguage";
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
// import { modules, formats } from './../quill-text-editor/quillConfig';


// function VoiceWorkspace(props) {

//     const [translateContent, setTranslateContent] = useState("");
//     const [writerFileDwnload, setWriterFileDwnload] = useState(true)
//     const [documentID, setDocumentID] = useState(null)
//     const [transcribedText, setTranscribedText] = useState(null)
//     const [showSettings, setshowSettings] = useState(false);
//     const [showTarLangModal, setshowTarLangModal] = useState(false);
//     const [searchInput, setSearchInput] = useState('');
//     const [onFocusWrap, setOnFocusWrap] = useState(false)
//     const [targetLanguage, setTargetLanguage] = useState("");
//     const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
//     const [filteredResults, setFilteredResults] = useState([]);
//     const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState([]);
//     const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
//     const [showTargetLangSelectModal, setShowTargetLangSelectModal] = useState(false)
//     const [isTargetLangExists, setIsTargetLangExists] = useState(false)
//     const [editJobs, setEditJobs] = useState([]);
//     const [storedQuillData, setStoredQuillData] = useState(null)
//     const [projectName, setProjectName] = useState(null)
//     const [showPunctuationModal, setShowPunctuationModal] = useState(false)
//     const [punctuationValidation, setPunctuationValidation] = useState(false)
//     const [hasTeam, setHasTeam] = useState(false)
//     const [projectID, setProjectID] = useState(null)
//     const [taskID, setTaskID] = useState(null)
//     const [isSaved, setIsSaved] = useState(true)
//     const [savedWriterFile, setSavedWriterFile] = useState(null)
//     const [isAssignedToMe, setIsAssignedToMe] = useState(false)

//     const deletedJobIds = useRef([]);
//     const searchAreaRef = useRef(null);
//     const translatedTextareaRef = useRef();
//     const typing = useRef(false);
//     const typingTimeout = useRef(0);
//     const prevPageInfo = useRef(null)


//     const { quill, quillRef, Quill } = useQuill({ modules, formats });

//     const history = useHistory()
//     const location = useLocation()

//     const queryParams = new URLSearchParams(window.location.search)


//     const UploadProjectButton = withStyles((theme) => ({
//         root: {
//             backgroundColor: "#0078D4",
//             boxShadow: "none",
//             borderRadius: "3px",
//             textTransform: "none",
//             padding: "12.5px 21px",
//             "&:hover": {
//             backgroundColor: "#0078D4",
//             boxShadow: "none",
//             },
//         },
//     }))(Button);

//     const hideSettingsModal = () => setshowSettings(false);

//     const modaloption = {
//         closeMaskOnClick: false,
//         width: 784,
//         onClose: hideSettingsModal,
//     };

//     useEffect(() => {
//         getLanguages()
//     }, [])

//     /* Handling target language selection */
//     const handleTargetLangClick = (value, e) => {
//         let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
//         if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
//         e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected")
//         targetLanguageTemp = Config.removeItemFromArray(
//             targetLanguageTemp,
//             value
//         );
//         if (isTargetLangExists) {
//             let thisJob = editJobs.find(
//             (element) => element.target_language == value?.id
//             );
//             if (thisJob?.id != null) deletedJobIds.current.push(thisJob?.id);
//         }
//         } else {
//         e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected")
//         targetLanguageTemp.push(value);
//         }
//         setTargetLanguage([...new Set(targetLanguageTemp)]);
//         setSearchInput('')
//         setOnFocusWrap(false)
//     };
    
    

//     /* Get source language options */
//     const getLanguages = () => {
//         let params = {
//             url: Config.BASE_URL + "/app/language/",
//             auth: true,
//             success: (response) => {
//                 setTargetLanguageOptions(response.data);
//             },
//         };
//         Config.axios(params);
//     };

//     // load quill and check if the task is mine or assigned to me (don't show if it is assigned to me)
//     useEffect(() => {
//       if(quill && !isAssignedToMe){
//         let toolbar = document.getElementsByClassName('ql-toolbar')[0]
//         let btn = document.createElement('button')
//         btn.innerText = 'Translate'
//         btn.classList.add('translate-btn')
//         btn.addEventListener('click', () => {saveWriterData('translate')})
//         toolbar.appendChild(btn)
//       }
//     }, [quill, isAssignedToMe])

    
//     useEffect(() => {
//         if(location.state?.assignToMe !== null){
//           setIsAssignedToMe(location.state?.assignToMe)
//         }
//         if(location.state?.prevPageInfo){
//             prevPageInfo.current = location.state?.prevPageInfo
//         }
//     }, [location.state])  


//     useEffect(() => {
//         let project_id = queryParams.get("project")
//         let task_id = queryParams.get("document")
//         setTaskID(task_id)
//         setProjectID(project_id)
//         if(project_id !== undefined && project_id !== null && showTargetLangSelectModal){
//             Config.axios({
//                 url: `${Config.BASE_URL}/workspace/files_jobs/${project_id}/`,
//                 method: "GET",
//                 auth: true,
//                 success: (response) => {
//                     deletedJobIds.current = [];
//                     setEditJobs(response.data?.jobs);
//                     let editTargetLanguages = [];
//                     response.data?.jobs?.map((job) => {
//                         if(job?.target_language !== null){
//                             editTargetLanguages.push(
//                               targetLanguageOptions?.find(
//                                 (element) => element.id == job.target_language
//                               )
//                             );
//                         }
//                     });
//                     let tar = [];
//                     let tarID = [];
//                     response.data?.jobs?.map((each) => {
//                         if(each?.target_language !== null){
//                             let a = each?.source_target_pair_names?.split("->");
//                             tar.push({ language: a[1], id: each?.target_language });
//                             tarID.push(each.target_language);
//                         }
//                     });
//                     setAlreadySelectedTarLang(tar);
//                     setAlreadySelecetedTarLangID(tarID);
//                     setIsTargetLangExists(editTargetLanguages?.length === 0 ? false : true)

//                     setHasTeam(response?.data?.team)
//                     setTimeout(() => {
//                         setTargetLanguage(editTargetLanguages);
//                     }, 200);
//                 },
//             });
//         }
//     }, [queryParams.get("project"), queryParams.get("document"), showTargetLangSelectModal])
    

//     useEffect(() => {
//         if(taskID !== undefined && taskID !== null){
//             Config.axios({
//                 url: `${Config.BASE_URL}/workspace/get_transcribe_file/?task=${taskID}`,
//                 auth: true,
//                 success: (response) => {
//                     setProjectName(response.data[0]?.project_name)
//                     if(response.data[0]?.punctuation_support === false){
//                         setShowPunctuationModal(true)
//                     }
//                     if(response.data[0]?.quill_data !== null){
//                         setStoredQuillData(response.data[0]?.quill_data)
//                     }else{
//                         setTranscribedText(response.data[0]?.transcripted_text)
//                     }
//                 },
//             }); 
//         }
//     }, [taskID])
    

//     useEffect(() => {
//       if(quill && (transcribedText || storedQuillData)){
//         if(storedQuillData !== null){
//             quill.setContents(JSON.parse(storedQuillData))
//         }else{
//             quill.setText(transcribedText)
//         }
//       }
//     }, [transcribedText, storedQuillData])

//     const saveWriterData = (target) => {
//         setIsSaved(false)
//         let formdata = new FormData();
//         formdata.append("edited_text", JSON.stringify(quill?.getContents()));
//         formdata.append("task_id", taskID);

//         Config.axios({
//             url: `${Config.BASE_URL}/workspace/writer_save/`,
//             method: "POST",
//             data: formdata,
//             auth: true,
//             success: (response) => {
//                 setTimeout(() => {
//                     setIsSaved(true)
//                 }, 1800);
//                 // Config.toast('Document saved successfully')
//                 if(target === 'translate'){
//                     // setSavedWriterFile()
//                     let quillTxt = quill?.getText()
//                     const regex = new RegExp('[.|?。!]+(\s|\n)?'); // check for punctuation validation
//                     if(!regex.test(quillTxt)){
//                         setShowPunctuationModal(true)
//                         setPunctuationValidation(true)
//                         return;
//                     }
//                     history.push(`/create/speech/speech-to-text?get-project-info=${projectID}&task=${taskID}&type=4`, 
//                     {writerFile: {
//                         id: response.data.id,
//                         filename: `${response.data.writer_filename}.docx`,
//                         can_delete: true
//                     }})
//                 }
//             },
//             error: (err) => {
//                 Config.toast('Improper text formating', 'warning')
//                 setTimeout(() => {
//                     setIsSaved(true)
//                 }, 1800);
//             },
//         }); 
//     } 
    

//     const debounce = (callback) => {
//         if (typingTimeout.current) clearTimeout(typingTimeout.current);
//         typing.current = false;
//         typingTimeout.current = setTimeout(() => {
//             // projectSearchTerm?.length && callback();
//             callback();
//         }, 1500);
//     };

//     if(quill){
//         quill?.on('text-change', function(delta, oldDelta, source) {
//             if (source == 'user') {
//                 debounce(saveWriterData)
//             }
//         });
//     }
    

  
//     return (
//         <React.Fragment>
//             <Navbar isWhite={true} 
//                 writerProjectName={projectName} 
//                 saveWriterData={saveWriterData}
//                 isSaved={isSaved} 
//                 prevPageInfo={prevPageInfo.current}
//             />
//             <section className="padding-correction">
//                 <div className="voice-proj-editor-wrapper">
//                     <div ref={quillRef} />
//                 </div>
               
//             </section>
//             <Rodal visible={showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal">
//                 <div className="lang-modal-wrapper">
//                     {/* <h1>Select Target Language(s)</h1> */}
//                     <span className="modal-close-btn lang-close" onClick={(e) => {setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false)}}>
//                         <img src={Config.HOST_URL + "assets/images/new-ui-icons/close_black.svg"} alt="close_black" />
//                     </span>
//                     <TargetLanguage
//                         targetLanguage={targetLanguage}
//                         targetLanguageOptions={targetLanguageOptions}
//                         handleTargetLangClick={handleTargetLangClick}
//                         setshowTarLangModal={setshowTarLangModal}
//                         modaloption={modaloption}
//                         filteredResults={filteredResults} 
//                         setFilteredResults={setFilteredResults}
//                         searchInput={searchInput} 
//                         setSearchInput={setSearchInput}
//                         onFocusWrap={onFocusWrap} 
//                         setOnFocusWrap={setOnFocusWrap}
//                         searchAreaRef={searchAreaRef}
//                         alreadySelecetedTarLangID={alreadySelecetedTarLangID}
//                         alreadySelectedTarLang={alreadySelectedTarLang}
//                     />
//                 </div>
//             </Rodal>
//             <Rodal
//                 visible={showPunctuationModal}
//                 {...modaloption}
//                 showCloseButton={false}
//                 className="ai-mark-confirm-box"
//             >
//                 <span className="modal-close-btn lang-close" onClick={(e) => {setShowPunctuationModal(false); setPunctuationValidation(false)}}>
//                     <img src={Config.HOST_URL + "assets/images/new-ui-icons/close_black.svg"} alt="close_black" />
//                 </span>
//                 <div className="confirmation-wrapper">
//                     <img
//                         src={
//                         Config.HOST_URL + "assets/images/new-ui-icons/confirm-icon.svg"
//                         }
//                         alt="confirm-icon"
//                     />
//                     {
//                         punctuationValidation ? 
//                             <h6 className="text-center">Please provide punctuation wherever necessary to process the document.</h6>
//                         :   
//                             <h6 className="text-center">This language does not support auto punctuation. Please provide punctuations as required.</h6>

//                     }
//                     {/* <div className="button-row">
//                         <AiMarkCancel onClick={() => setDictationTabSwitchAlert(false)}>
//                             <span className="cancel-txt">Close</span>
//                         </AiMarkCancel>
//                         <AiMarkSubmit onClick={() => handleConfirmSwitch()}>
//                             <span className="submit-txt">Switch</span>
//                         </AiMarkSubmit>
//                     </div> */}
//                 </div>
//             </Rodal>
//         </React.Fragment>
//     );
// }

// export default VoiceWorkspace;
