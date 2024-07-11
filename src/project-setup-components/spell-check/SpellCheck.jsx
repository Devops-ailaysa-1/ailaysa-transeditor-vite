import React, { useEffect, useRef, useState } from "react";
import Navbar from '../../vendor/Navbar'
import Config from "../../vendor/Config";
import PDFViewer from "../../vendor/ailaysa-chats/PdfViewr";
import './SplitView.css'
import { useNavigate } from "react-router-dom";
import SpellCheckRichTextNormalEditor from "./SpellCheckRichTextNormalEditor";
import VIewer from "./VIewer";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";

const SpellCheck = (props) => {
    const {

    } = props

    const [isLoading , setIsLoading] = useState(false)
    const [isFileLoading , setIsFileLoading] = useState(false)


    const navigate = useNavigate()
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
  
    const [isSpellCheckEnable, setIsSpellCheckEnable] = useState(true)
    const [pdf, setPdf] = useState(null)
    const [referenceDocument, setReferenceDocument] = useState(null)
    const [project, setProject] = useState(null)

    const supportFileExtensionPdf = useRef([".pdf",".docx",".txt"]);

    const pdfInputRef = useRef()
    const prevPathRef = useRef(null)

    const { t } = useTranslation()

 
    const handleMouseUp = () => {

    }

    const [showDocumentListModal, setShowDocumentListModal] = useState(true)


    const [pageNumber, setPageNumber] = useState(1);


    /* Remove the specified :tags in the :text */



    // Spell check creation for Docx


  


    const handleUploadProofReadingDoc = (pdf) => {
        let formData = new FormData();
        setIsFileLoading(true)
        formData.append("main_document", pdf);

        Config.axios({
            url: `${Config.BASE_URL}/openai/ocr-proof-reading/${URL_SEARCH_PARAMS.get('id')}/`,
            method: "PUT",
            auth: true,
            data: formData,
            success: (response) => {
                setPdf(null)
                setProject(response.data)
                setReferenceDocument(response?.data?.main_document)
                setIsFileLoading(false)
            },
            error: (err) => {
                console.log(err)

            }
        });
    }



 

    /* Check the file is a supprt file type */
    const isSupportedPdfFile = (file) => {
        let name = file.name;
        let lastDot = name.lastIndexOf(".");
        let fileName = name.substring(0, lastDot);
        let ext = "." + name.substring(lastDot + 1);
        if (supportFileExtensionPdf.current.indexOf(ext) == -1) {
            Config.showToast(t("file_format_not_support"), 'warning')
            return false;
        }
        return true;
    };



    const handlePdfUpload = (e) => {
        let thisFiles = e.target.files[0];
        console.log(thisFiles)
        if (isSupportedPdfFile(thisFiles)) {
            setPdf(thisFiles)
            handleUploadProofReadingDoc(thisFiles)
        }else{
            Config.toast(`Supported file formats are ".pdf",".docx".`,'warning')
        }

    }

    const onInputClick = (event) => {
        event.target.value = ''
    }


    const handleInputClick = () => {
        pdfInputRef.current.click()
    }





    // const handleSpellCheckToggle = () => {
    //     setTranslateResultText(translateResultText)
    //     copyTarDivRef.current.innerHTML = translateResultText
    //     setSpellCheckWordsOptions([])
    //     setIsSpellCheckEnable(!isSpellCheckEnable)
    // } 




    
    function getExtension(filename) {

        return filename.split('.').pop()
      
    }




    return (
        <>
            <Navbar
                isWhite={true}
                prevPathRef={prevPathRef}

            />
            <section className="split-view spell-check-view">
                <div className="each-pannel">
                 
                    <div className={`${isFileLoading ? "loading-json-blur" :  ""}`} style={{height:'100%',width:'100%'}}>

                    
                    {((project != null && project?.main_document == null) || referenceDocument == null) ? (<><button className='add-new-file-button upload-pdf-button' onClick={handleInputClick}>
                        Upload Reference PDF
                    </button>
                        <input
                            type="file"
                            ref={pdfInputRef}
                            accept={supportFileExtensionPdf.current.join(",")}
                            onChange={(e) => handlePdfUpload(e)}
                            onClick={onInputClick}
                            hidden
                        />
                    </>) : (
                        <>
                        <div className="close-button" onClick={() => setReferenceDocument(null)}>
                            <CloseIcon />
                        </div>
                        {getExtension(referenceDocument).toLowerCase() === "pdf" ? 
                            (
                                <PDFViewer handleMouseUp={handleMouseUp} page={pageNumber} setPage={setPageNumber} width={'100%'} pdf={Config.BASE_URL+referenceDocument} />

                            ):(
                                <VIewer pdf={Config.BASE_URL+referenceDocument} />

                            ) 
                    
                            }
                        </>
                    )}
                    </div>
                {isFileLoading && <div id="loading-wrapper">
                            <div class="loader">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>}

                </div>
                <div className="each-pannel " style={{borderLeft: '1px solid #E1E5E6'}}>
                   
                   
                    <SpellCheckRichTextNormalEditor
                        isSpellCheckEnable={isSpellCheckEnable}
                        setIsLoading={setIsLoading}
                        setReferenceDocument={setReferenceDocument}
                        setProject={setProject}
                    />


                </div>
                {/* show open document modal */}
                

            </section>
        </>
    )
};

export default SpellCheck;
