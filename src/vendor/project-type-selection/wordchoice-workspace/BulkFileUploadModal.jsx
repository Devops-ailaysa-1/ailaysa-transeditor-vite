import React, { useRef } from 'react'
import Rodal from "rodal";
import "rodal/lib/rodal.css"    ;
import { ButtonLoader } from '../../../loader/CommonBtnLoader';
import Config from '../../Config';
import { useTranslation } from "react-i18next";
import ButtonBase from '@mui/material/ButtonBase';
import DragandDrop from '../../DragandDrop';
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import FileUploadBlueBtn from "../../../assets/images/new-ui-icons/file_download_blue.svg"
import FilesUpload from "../../../assets/images/new-ui-icons/upload-folder.svg"

export const BulkFileUploadModal = (props) => {

    let {
        openModal,
        setOpenModal,
        isUploading,
        handleUploadBtn,
        filesList,
        setFilesList,
        nonModal,
        fileError
    } = props

    const { t } = useTranslation();
    const inputFileUploadRef = useRef(null);

    const downloadTemplate = async() => {
        try{           
            let url = `${Config.BASE_URL}/glex/word-choice-template/`
            const response = await Config.downloadFileFromApi(url);            
            Config.downloadFileInBrowser(response);
            
        }catch(e) {
            console.error(e);
        }
    } 

    /* Check the file is a supprt file type */
    const isSupportedFile = (file) => {
        let name = file.name;
        let lastDot = name.lastIndexOf(".");
        let fileName = name.substring(0, lastDot);
        let ext = "." + name.substring(lastDot + 1);
        if (ext !== ".xlsx") {
            Config.toast(t("file_format_not_support"), 'warning');
            return false;
        }
        return true;
    };

    /* File upload drag and drop handling */
    const handleDrop = (filesTemp, request = null) => {
        //Also check handleChange
        for (let i = 0; i < (filesTemp).length; i++) {
            if (filesTemp[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return;
            }
        }
        let fileList = [...filesList];
        Object.keys(filesTemp).map((eachKey) => {
            if (isSupportedFile(filesTemp[eachKey])) {
                // if (editFiles.length + fileList.length < allowedFileLength.current)
                if (filesTemp[eachKey].size / 1024 / 1024 <= 100)
                    fileList.push(filesTemp[eachKey]);
                else Config.toast(t('file_size_exceeds'), "warning");
            }
        });
        setFilesList(fileList);
        // setShowFileUpload(false);
    };

    /* Removed dragged files */
    const removeFile = (e, index) => {
        let filesTemp = filesList;
        delete filesTemp[index];
        let isFilesEmpty = true;
        let finalFiles = [];
        Object.keys(filesTemp).map((eachKey) => {
            if (filesTemp[eachKey] != null) {
                isFilesEmpty = false;
                finalFiles.push(filesTemp[eachKey]);
            }
        });
        if (isFilesEmpty) filesTemp = [];
        setFilesList(finalFiles);
        inputFileUploadRef.current.value = '';
    };

    /* Handling all the project creation form */
    const handleChange = (e) => {
        // e.target.files[0].name.length
        for (let i = 0; i < (e.target.files).length; i++) {
            if ((e.target.files[i]?.name).length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        switch (e.target.name) {
            case "files": {
                let thisFiles = e.target.files;
                let fileList = [...filesList];
                Object.keys(thisFiles).map((eachKey) => {
                    if (isSupportedFile(thisFiles[eachKey])) {
                        if (thisFiles[eachKey].size / 1024 / 1024 <= 100)
                            fileList.push(thisFiles[eachKey]);
                        else Config.toast(t('file_size_exceeds'), "warning");
                    }
                });
                setFilesList(fileList);
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        nonModal ? (
            <div className="edit-instant-project-box ">
                <div className="body-wrapper">
                    <div className="language-details">
                        <div className='d-flex justify-between toast-align'>
                            <h2>{t("upload_file")}<span className="asterik-symbol">*</span></h2>
                            <button className="termDataForm-GlossaryDownBtn" onClick={downloadTemplate}>
                                <span className="glossary-btn-txt">
                                    <span>
                                        <img src={FileUploadBlueBtn} alt="glossary-temp" />
                                    </span>{" "}
                                    {t("download_template")}
                                </span>
                            </button>
                        </div>
                        {fileError && <p class="text-danger mb-2">{fileError}</p>}
                        <div className={filesList?.length !== 0 ? "dropfile-area mt-3" : "col-xs-12 mt-3"}>
                            <DragandDrop handleDrop={handleDrop}>
                                <div className={filesList.length > 0 ? "button-wrap fileloaded h-25" : "button-wrap sa"} >
                                    <div className="draganddrop-align">
                                        <img className={(filesList.length > 0) ? 'img' : ''}
                                            src={FilesUpload}
                                            alt="folder"
                                        />
                                        {Object.keys(filesList).map((eachKey) => {
                                            return (
                                                <div
                                                    key={eachKey + filesList[eachKey].name}
                                                    className="file-name-list"
                                                >
                                                    <div className="filename">
                                                        {
                                                            <img
                                                                src={
                                                                    import.meta.env.PUBLIC_URL +
                                                                    "/assets/images/document.svg"
                                                                }
                                                                alt="document"
                                                            />
                                                        }{" "}
                                                        {filesList[eachKey].name}
                                                    </div>
                                                    <span
                                                        data-file-index={eachKey}
                                                        onClick={(e) => removeFile(e, eachKey)}
                                                    >
                                                        <i className="far fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        <div style={{marginBottom: "10px"}}>
                                            <div className="file-upload-align">
                                                <p className="upload-text">
                                                    {t("drop_your_files_here_or")}{" "}
                                                </p>
                                                <div className="upload-link-wrapper">
                                                    <label htmlFor="files">{t("browse")}</label>
                                                    <input
                                                        ref={inputFileUploadRef}
                                                        type="file"
                                                        name="files"
                                                        className="form-control-file"
                                                        id="files"
                                                        accept=".xlsx"
                                                        onChange={handleChange}
                                                        multiple
                                                        hidden
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DragandDrop>
                        </div>

                        <div className={filesList?.length === 0 ? "d-none" : "col-xs-12"}>
                            <div className="button-wrap-file-list">
                                <div className="file-list-align">
                                    <div className="file-list">
                                        {Object.keys(filesList).map((eachKey) => {
                                            return (
                                                <div
                                                    key={eachKey + filesList[eachKey].name}
                                                    className="file-name-list"
                                                >
                                                    <div className="filename" style={{ width: '90%' }}>
                                                        {
                                                            <img
                                                                src={
                                                                    `${Config.BASE_URL}/app/extension-image/` +
                                                                    filesList[eachKey].name
                                                                        .split(".")
                                                                        .pop()
                                                                }
                                                                alt="document"
                                                            />
                                                        }
                                                        <span className="filename-length">
                                                            {filesList[eachKey].name
                                                                .split(".")
                                                                .slice(0, -1)
                                                                .join(".")}
                                                        </span>
                                                        <span className="extension">
                                                            {"." +
                                                                filesList[eachKey].name
                                                                    .split(".")
                                                                    .pop()}
                                                        </span>
                                                    </div>
                                                    <span
                                                        className="upload-file-delete"
                                                        data-file-index={eachKey}
                                                        onClick={(e) =>
                                                            removeFile(e, eachKey)
                                                        }
                                                    >
                                                        <img
                                                            src={CloseBlack}
                                                            alt="delete"
                                                        />
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="upload-text mt-2">
                            {t("note")}: {t("word_choice_bulk_upload_note")}
                        </p>
                    </div>
                    
                    {/* <div className="edit-proj-button-row bulk-term-upload">
                        <ButtonBase className="instant-edit-update-btn" onClick={handleUploadBtn}>
                            {isUploading ? t('uploading') : t('upload')}
                            {isUploading && <ButtonLoader />}
                        </ButtonBase>
                    </div> */}
                </div>
            </div>
        ) : (
            <Rodal
                visible={openModal}
                showCloseButton={false}
                className={"edit-instant-project-box " }
            >
                <div className="header-wrapper">
                    <div className="header-text">
                        <h1>{t("bulk_upload")}</h1>
                    </div>
                    <span className="modal-close-btn" onClick={() => setOpenModal(false)}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                </div>
                <div className="body-wrapper">
                    <div className="language-details">
                        <div className='d-flex justify-between toast-align'>
                            <h2>{t("upload_file")}</h2>
                            <button className="termDataForm-GlossaryDownBtn" onClick={downloadTemplate}>
                                <span className="glossary-btn-txt">
                                    <span>
                                        <img src={FileUploadBlueBtn} alt="glossary-temp" />
                                    </span>{" "}
                                    {t("download_template")}
                                </span>
                            </button>
                        </div>
                        <div className={filesList?.length !== 0 ? "dropfile-area mt-3" : "col-xs-12 mt-3"}>
                            <DragandDrop handleDrop={handleDrop}>
                                <div className={filesList.length > 0 ? "button-wrap fileloaded h-25" : "button-wrap sa"} >
                                    <div className="draganddrop-align">
                                        <img className={(filesList.length > 0) ? 'img' : ''}
                                            src={FilesUpload}
                                            alt="folder"
                                        />
                                        {Object.keys(filesList).map((eachKey) => {
                                            return (
                                                <div
                                                    key={eachKey + filesList[eachKey].name}
                                                    className="file-name-list"
                                                >
                                                    <div className="filename">
                                                        {
                                                            <img
                                                                src={
                                                                    import.meta.env.PUBLIC_URL +
                                                                    "/assets/images/document.svg"
                                                                }
                                                                alt="document"
                                                            />
                                                        }{" "}
                                                        {filesList[eachKey].name}
                                                    </div>
                                                    <span
                                                        data-file-index={eachKey}
                                                        onClick={(e) => removeFile(e, eachKey)}
                                                    >
                                                        <i className="far fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        <div style={{marginBottom: "10px"}}>
                                            <div className="file-upload-align">
                                                <p className="upload-text">
                                                    {t("drop_your_files_here_or")}{" "}
                                                </p>
                                                <div className="upload-link-wrapper">
                                                    <label htmlFor="files">{t("browse")}</label>
                                                    <input
                                                        ref={inputFileUploadRef}
                                                        type="file"
                                                        name="files"
                                                        className="form-control-file"
                                                        id="files"
                                                        accept=".xlsx"
                                                        onChange={handleChange}
                                                        multiple
                                                        hidden
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DragandDrop>
                        </div>

                        <div className={filesList?.length === 0 ? "d-none" : "col-xs-12"}>
                            <div className="button-wrap-file-list">
                                <div className="file-list-align">
                                    <div className="file-list">
                                        {Object.keys(filesList).map((eachKey) => {
                                            return (
                                                <div
                                                    key={eachKey + filesList[eachKey].name}
                                                    className="file-name-list"
                                                >
                                                    <div className="filename" style={{ width: '90%' }}>
                                                        {
                                                            <img
                                                                src={
                                                                    `${Config.BASE_URL}/app/extension-image/` +
                                                                    filesList[eachKey].name
                                                                        .split(".")
                                                                        .pop()
                                                                }
                                                                alt="document"
                                                            />
                                                        }
                                                        <span className="filename-length">
                                                            {filesList[eachKey].name
                                                                .split(".")
                                                                .slice(0, -1)
                                                                .join(".")}
                                                        </span>
                                                        <span className="extension">
                                                            {"." +
                                                                filesList[eachKey].name
                                                                    .split(".")
                                                                    .pop()}
                                                        </span>
                                                    </div>
                                                    <span
                                                        className="upload-file-delete"
                                                        data-file-index={eachKey}
                                                        onClick={(e) =>
                                                            removeFile(e, eachKey)
                                                        }
                                                    >
                                                        <img
                                                            src={CloseBlack}
                                                            alt="delete"
                                                        />
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="upload-text mt-2">
                            {t("note")}: {t("word_choice_bulk_upload_note")}
                        </p>
                    </div>
                
                    <div className="edit-proj-button-row bulk-term-upload">
                        <ButtonBase className="instant-edit-update-btn" onClick={handleUploadBtn}>
                            {isUploading ? t('uploading') : t('upload')}
                            {isUploading && <ButtonLoader />}
                        </ButtonBase>
                    </div>
                </div>
            </Rodal>
        )
    )
}
