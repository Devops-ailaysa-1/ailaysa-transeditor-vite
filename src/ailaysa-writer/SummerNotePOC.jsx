// import React, { useEffect } from 'react'
// import {useHistory} from "react-router-dom";
// import Config from '../vendor/Config';
// import { useState } from 'react';
// import $ from 'jquery';
// import 'popper.js';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Cookies from "js-cookie";
// import axios from "axios";

// import CodeMirror from 'codemirror/lib/codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/theme/monokai.css'

// import 'summernote/dist/summernote-bs4';
// import 'summernote/dist/summernote-bs4.css';

// // import HTMLtoDOCX from 'html-to-docx'
// import HTMLtoDOCX from "html-to-docx/dist/html-to-docx.umd"


// // import asBlob  from '@types/html-docx-js';
// import { asBlob } from 'html-docx-js-typescript'

// import htmlDocx from 'html-docx-js/dist/html-docx'
// import { useRef } from 'react';

// export const SummernoteEditor = () => {

//     const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
//     const history = useHistory();
//     const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null);
//     const [projectId, setProjectId] = useState(null)
//     const downloadref = useRef(null)
//     const downloadedFileName = useRef(null)

//     const FontFamilyList = [
//         "Archivo Black" ,
//         "Abhaya Libre" ,
//         "Aboreto" ,
//         "Alumni Sans Collegiate One" ,
//         "Alumni Sans Pinstripe" ,
//         "Anek Bangla" ,
//         "Anek Odia" ,
//         "Cairo" ,
//         "Catamaran" ,
//         "Caveat" ,
//         "Chilanka" ,
//         "Clicker Script" ,
//         "Dancing Script" ,
//         "DynaPuff" ,
//         "Gayathri" ,
//         "Hanuman" ,
//         "Hind Madurai" ,
//         "Hind Siliguri" ,
//         "Hind Vadodara" ,
//         "Indie Flower" ,
//         "Jomolhari" ,
//         "Kanit" ,
//         "Katibeh" ,
//         "M PLUS Rounded 1c" ,
//         "Mandali" ,
//         "Manjari" ,
//         "Monofett" ,
//         "Montserrat" ,
//         "Montserrat Alternates" ,
//         "Montserrat Subrayada" ,
//         "Mukta" ,
//         "Mukta Mahee" ,
//         "Mukta Malar" ,
//         "Nanum Gothic" ,
//         "Nanum Gothic Coding" ,
//         "Nokora" ,
//         "Noto Kufi Arabic" ,
//         "Noto Naskh Arabic" ,
//         "Noto Sans" ,
//         "Noto Sans Arabic" ,
//         "Noto Sans Bengali" ,
//         "Noto Sans Devanagari" ,
//         "Noto Sans Gujarati" ,
//         "Noto Sans Gurmukhi" ,
//         "Noto Sans Hebrew" ,
//         "Noto Sans JP" ,
//         "Noto Sans Kannada" ,
//         "Noto Sans Khmer" ,
//         "Noto Sans KR" ,
//         "Noto Sans Malayalam" ,
//         "Noto Sans Myanmar" ,
//         "Noto Sans SC" ,
//         "Noto Sans Sinhala" ,
//         "Noto Sans Tamil" ,
//         "Noto Sans Tamil Supplement" ,
//         "Noto Sans TC" ,
//         "Noto Sans Telugu" ,
//         "Noto Sans Thai" ,
//         "Noto Sans Thai Looped" ,
//         "Noto Serif Bengali" ,
//         "Noto Serif Devanagari" ,
//         "Noto Serif Gujarati" ,
//         "Noto Serif Gurmukhi" ,
//         "Noto Serif Hebrew" ,
//         "Noto Serif JP" ,
//         "Noto Serif Kannada" ,
//         "Noto Serif Khmer" ,
//         "Noto Serif KR" ,
//         "Noto Serif Malayalam" ,
//         "Noto Serif Sinhala" ,
//         "Noto Serif Tamil" ,
//         "Noto Serif TC" ,
//         "Noto Serif Thai" ,
//         "Noto Serif Tibetan" ,
//         "Open Sans" ,
//         "Oswald" ,
//         "Pacifico" ,
//         "Padauk" ,
//         "Permanent Marker" ,
//         "Peralta" ,
//         "Poppins" ,
//         "Prompt" ,
//         "Raleway" ,
//         "Raleway Dots" ,
//         "Roboto" ,
//         "Rubik" ,
//         "Rubik Beastly" ,
//         "Rubik Bubbles" ,
//         "Rubik Burned" ,
//         "Rubik Dirt" ,
//         "Rubik Distressed" ,
//         "Rubik Glitch" ,
//         "Rubik Iso" ,
//         "Rubik Marker Hatch" ,
//         "Rubik Maze" ,
//         "Rubik Microbe" ,
//         "Rubik Mono One" ,
//         "Rubik Moonrocks" ,
//         "Rubik Puddles" ,
//         "Rubik Wet Paint" ,
//         "Satisfy" ,
//         "Sawarabi Gothic" ,
//         "Silkscreen" ,
//         "Space Mono" ,
//         "Teko" ,
//         "Uchen" ,
        
//     ];

//     useEffect(() => {
//         $('.summernote').summernote(  
//             {
//                 height: 800,
//                 fontNames: FontFamilyList,
//                 fontNamesIgnoreCheck: FontFamilyList,
//                      toolbar:[
//                 ['style',['style', 'undo', 'redo']],
//                 ['font',['bold','italic','underline', 'strikethrough','superscript', 'subscript','clear']],
//                 ['fontname',['fontname', 'fontsize']],
//                 ['color',['color']],
//                 ['para',['ul','ol','paragraph']],
//                 ['height',['height']],
//                 ['table',['table']],
//                 ['insert',['picture','media','link','hr']],
//                 ['view',['fullscreen','codeview']],
//                 ['help',['help']],
//                 ['paperSize',['paperSize']], // The Button
//                 ['pagebreak',['pagebreak']],
//             ],
//         });
    
//         $('.dropdown-toggle').dropdown();
    
//         // $('.summernote').summernote('code', '<p>hello world</p>')
//     }, [])

//     async function exportHTML(){
//         var data = $('.summernote').summernote('code')
//         console.log(data);

//         // var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
//         //      "xmlns:w='urn:schemas-microsoft-com:office:word' "+
//         //      "xmlns='http://www.w3.org/TR/REC-html40'>"+
//         //      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

//         var header = `<html>
//         <head>
//           <meta charset="UTF-8">
//         </head>
//         <body>`;

//         var footer = "</body></html>";
//         var innerhtml = data
//         var sourceHTML = header+innerhtml+footer;
        
//         // const blobObj = await htmlDocx.asBlob(sourceHTML);
//         const blobObj = await HTMLtoDOCX(sourceHTML);
//         // const blobObj = await asBlob(sourceHTML);

//         console.log(blobObj);

//         var source = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8,' + encodeURIComponent(sourceHTML);
//         // const newBlobUrl = URL.createObjectURL(source);

//         const blob = new Blob(['\ufeff', source], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
//         let file = new File([blobObj], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        
//         // console.log(newBlobUrl);
//         var fileDownload = document.createElement("a");
//         document.body.appendChild(fileDownload);
//         fileDownload.href = URL.createObjectURL(blobObj);
//         // fileDownload.href = source;
//         fileDownload.download = 'test.docx';
//         fileDownload.click();
//         document.body.removeChild(fileDownload);
//     }
    

//     useEffect(() => {
//         let taskParam = URL_SEARCH_PARAMS.get("task")
//         if(taskParam){
//             getWriterHtmlData(taskParam, 'task')
//         }
//     }, [URL_SEARCH_PARAMS.get("task")])
    
//     useEffect(() => {
//         let pdfParam = URL_SEARCH_PARAMS.get("pdf-id")
//         if(pdfParam){
//             getWriterHtmlData(pdfParam, 'id')
//         }
//     }, [URL_SEARCH_PARAMS.get("pdf-id")])
    

//     // get and load the html data
//     const getWriterHtmlData = (id, target) => {
//         Config.axios({
//             url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/?${target}=${id}`, 
//             auth: true,
//             success: (response) => {
//                 if(response.data?.html_data !== null){
//                     if(target === 'id'){
//                         $('.summernote').summernote('code', response.data[0]?.html_data)
//                     }else{
//                         $('.summernote').summernote('code', response.data?.html_data)
//                     }
//                 }
//             }
//         });
//     } 
    
//     // update/save the html data with docx file
//     const saveHtmlData = async(target) => {

//         let taskParam = URL_SEARCH_PARAMS.get("task")
//         let pdfParam = URL_SEARCH_PARAMS.get("pdf-id")

//         let formData = new FormData();
        
//         var htmlData = $('.summernote').summernote('code')
        
//         var header = "<!DOCTYPE html xmlns:o='urn:schemas-microsoft-com:office:office' " +
//         "xmlns:w='http://schemas.openxmlformats.org/wordprocessingml/2006/main' " + 
//         "xmlns='https://www.w3.org/TR/html40'><head><meta http-equiv=Content-Type content='text/html; charset=utf-8'><title></title></head><body>";

//         var footer = "</body></html>";
//         var innerhtml = htmlData
//         var sourceHTML = header+innerhtml+footer;
        
//         // const blobObj = await asBlob(sourceHTML);

//         const blobObj = await htmlDocx.asBlob(sourceHTML);

//         let fileObj = new File([blobObj], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })

//         console.log(fileObj);

//         formData.append("html_data", htmlData);
        
//         if(target !== 'translate'){
//             formData.append("docx_file", fileObj);
//         }

//         Config.axios({
//             url: `${Config.BASE_URL}/exportpdf/convertpdftodocx/${taskParam ? taskParam : pdfParam}/`, 
//             method: 'PUT',
//             data: formData,
//             auth: true,
//             success: (response) => {
//                 if(response.data?.id){
//                     if(target !== 'translate'){
//                         Config.toast('Saved successfully')
//                     }
//                 }
//             }
//         });
//     }


//     const translateWriteData = () => {
//         let taskParam = URL_SEARCH_PARAMS.get("task")
//         let pdfParam = URL_SEARCH_PARAMS.get("pdf-id")

//         Config.axios({
//             url: `${Config.BASE_URL}/workspace/translate_from_pdf/${taskParam ? taskParam : pdfParam}/`, 
//             method: 'PUT',
//             auth: true,
//             success: (response) => {
//                 if(response.data?.id){
//                     saveHtmlData('translate')
//                     history.push(`/file-upload?page=1&order_by=-id`)
//                 }
//             }
//         });
//     } 

//     const downloadFileFromApi = (url) => {
//         // throw new Error("uncomment this line to mock failure of API");
//         let userCacheData = JSON.parse(
//             typeof Cookies.get(process.env.REACT_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(process.env.REACT_APP_USER_COOKIE_KEY_NAME) : null
//         );
//         // console.log(a);
//         let token = userCacheData != null ? userCacheData?.token : "";
//         return axios.get(
//             url,
//           {
//             responseType: "blob",
//             /* 
//             */
//             headers: {
//                 "Access-Control-Expose-Headers": "Content-Disposition",
//                 // Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
//             },
//           }
//         );
//     };

//     const nodeTesting = async() => {

//         let url = `http://localhost:8000/`
//         const response = await downloadFileFromApi(url);
//         console.log(response);
//         // const filename =  response.headers['content-disposition']?.split('filename*=')[1];
//         // downloadedFileName.current = decodeURIComponent(filename?.replace(`UTF-8''`, ''))
//         // console.log(filename);
//         var fileDownload = document.createElement("a");
//         document.body.appendChild(fileDownload);
//         fileDownload.href = URL.createObjectURL(response.data);
//         // fileDownload.href = source;
//         fileDownload.download = 'nodetestdoc.docx';
//         fileDownload.click();
//         document.body.removeChild(fileDownload);
//     } 

//     useEffect(() => {
//         getDocumentList()
//     }, [])
    
    
//     const getDocumentList = () => {

//         Config.axios({
//             url: `${Config.BASE_URL}/workspace/mydocuments/`, 
//             auth: true,
//             success: (response) => {
//                 console.log(response);
//                 if(response.data){
//                     // setDocumentsList(response.data?.results)
//                 }
//             }
//         });
//     } 

//     // const updateSpeechToTextProject = (key) => {
//     //     let formdata = new FormData();

//     //     formdata.append("pdf_task_id", parseInt(taskID));

//     //     Config.axios({
//     //         // headers: {
//     //         //     "Access-Control-Allow-Origin": "*",
//     //         //     Accept: "application/json",
//     //         //     "Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
//     //         // },
//     //         url: `${Config.BASE_URL}/workspace/project/quick/setup/${projectId}/?step_delete_ids=${deleteIdList}&file_delete_ids=${deletedEditFileIds.current.join()}&job_delete_ids=${list}`, 
//     //         method: "PUT",
//     //         data: formdata,
//     //         auth: true,
//     //         success: (response) => {
//     //             setClickedOpenButton(null);
//     //                 // console.log(response.data)
//     //             // if(operationValue === 'translate'){
//     //                 Config.toast("Project updated successfully");
//     //                 // history.push(`/file-upload?page=1&order_by=-id&open-project=${response?.data?.id}`)
                    
//     //                 history.push(`/file-upload?page=${prevPageInfo.current?.pageNo != null ? prevPageInfo.current?.pageNo : 1}&order_by=${prevPageInfo.current?.orderBy != null ? prevPageInfo.current?.orderBy : '-id'}${(prevPageInfo.current?.projectTypeFilter !== 'all' && prevPageInfo.current?.projectTypeFilter != null) ? `&filter=${prevPageInfo.current?.projectTypeFilter}` : ""}${prevPageInfo.current?.search != null ? `&search=${prevPageInfo.current?.search}` : ""}&open-project=${prevPageInfo.current?.projectId != null ? prevPageInfo.current?.projectId : response.data.id}`)
//     //             // } 
//     //             // operationValue === 'download' && downloadSourceAudioFile(response?.data?.id)
//     //         },
//     //     });
//     // } 



//     return (
//         <div>
//             <button onClick={exportHTML}> download</button>
//             <button onClick={() => saveHtmlData('save')}> Save</button>
//             <button onClick={() => translateWriteData()}> Translate</button>
//             {/* <button onClick={nodeTesting}> Translate</button> */}
            
//             <form method="post">
//                 <textarea className="summernote" name="editordata"></textarea>
//             </form>
//             <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />

//         </div>
//     )
// }
