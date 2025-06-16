import React, { useState, useEffect, createRef, useRef } from "react";
import Config from "../vendor/Config";
import { useTranslation } from 'react-i18next';
import DragandDrop from "../vendor/DragandDrop";
import FilesUpload from "../assets/images/new-ui-icons/upload-folder.svg";
import infoIcon from "../assets/images/new-ui-icons/imp-icon-file.svg";
import BlackClose from "../assets/images/new-ui-icons/close_black.svg";

const AddStoryFile = (props) => {
    let {
        files,
        setFiles,
        fileError,
        setFileError
    } = props;

    const { t } = useTranslation();
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [supportFileExtensions, setSupportFileExtensions] = useState([]);

    const allowedSingleFileSize = useRef(100); // in MB
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const inputFileUploadRef = useRef(null);

    useEffect(() => {
        getSupportFileExtensions();
    }, []);
    
    /* Handling all the project creation form */
    const handleChange = (e) => {
        for (let i = 0; i < (e.target.files).length; i++) {
            let name = e.target.files[i].name;
            let lastDot = name.lastIndexOf(".");
            let fileName = name.substring(0, lastDot);
            let ext = "." + name.substring(lastDot + 1);
            
            if (supportFileExtensions?.find(each => each === ext?.toLowerCase()) === undefined) {
                Config.toast(t("file_format_not_support"), 'warning');
                return false;
            }

            if ((e.target.files[i]?.name).length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return;
            }
        }

        switch (e.target.name) {
            case "files": {
                let thisFiles = e.target.files;                
                // let fileList = JSON.parse(JSON.stringify(files));
                let fileList = [...files];
                Object.keys(thisFiles).map((eachKey) => {
                        if (thisFiles[eachKey].size / 1024 / 1024 <= allowedSingleFileSize.current)
                            fileList.unshift(thisFiles[eachKey]);
                        else Config.toast(singleFileSizeError.current, "error");
                    });
                setFiles(fileList);
                setFileError("");
                break;
            }
            default: {
                break;
            }
        }
    };

    /* File upload drag and drop handling */
    const handleDrop = (filesTemp, request = null) => {
        //Also check handleChange
        for (let i = 0; i < (filesTemp).length; i++) {
            let name = filesTemp[i].name;
            let lastDot = name.lastIndexOf(".");
            let fileName = name.substring(0, lastDot);
            let ext = "." + name.substring(lastDot + 1);
            
            if (supportFileExtensions?.find(each => each === ext?.toLowerCase()) === undefined) {
                Config.toast(t("file_format_not_support"), 'warning');
                return false;
            }
            if (filesTemp[i].name.length >= 201) {
                Config.toast(t("filename_should_200_chars"), "warning");
                return
            }
        }
        let fileList = [...files];
        Object.keys(filesTemp).map((eachKey) => {
            if ( filesTemp[eachKey].size / 1024 / 1024 <= allowedSingleFileSize.current)
                fileList.unshift(filesTemp[eachKey]);
            else Config.toast(singleFileSizeError.current, "error");
        });
        setFiles(fileList);
        setShowFileUpload(false);
        setFileError("");
    };

    /* Removed dragged files */
    const removeFile = (e, index) => {
        let filesTemp = files;
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
        setFiles(finalFiles);
        inputFileUploadRef.current.value = '';
    };

    /* Get support file types labels */
    const getSupportFileExtensions = () => {
        Config.axios({
            url: Config.BASE_URL + "/workspace_okapi/file_extensions/",
            auth: true,
            success: (response) => {
                setSupportFileExtensions(response.data?.filter(each => each !== ".pdf"));
            },
        });
    };

    return (
        <>
            <div className="story-file-upload-main-wrap">
                {fileError !== "" && (
                    <span className="text-danger mb-2">{fileError}</span>
                )}
                {
                    <>
                        <div className={(!showFileUpload && files.length > 0) ? "dropfile-area" : "col-xs-12 mt-3"}>
                            <DragandDrop handleDrop={handleDrop}>
                                <div className={files.length > 0 ? "button-wrap fileloaded h-25" : "button-wrap sa"} >
                                    <div className="draganddrop-align">
                                        <img className={(files.length > 0) ? 'img' : ''}
                                            src={FilesUpload}
                                            alt="folder"
                                        />
                                        <div className="file-upload-align">
                                            <p className="upload-text">
                                                {t("drop_your_files_here_or")}
                                            </p>
                                            <div className="upload-link-wrapper">
                                                <label htmlFor="files">{t("browse")}</label>
                                                <input
                                                    ref={inputFileUploadRef}
                                                    type="file"
                                                    name="files"
                                                    className="form-control-file"
                                                    id="files"
                                                    onChange={handleChange}
                                                    multiple
                                                    hidden
                                                    accept={supportFileExtensions.join(",")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="file-upload-instruction">
                                        <div className="supp-file-format">
                                            <div>
                                                <div className="supp-file-format-list">
                                                    <p>{supportFileExtensions.join(" ")}</p>
                                                </div>
                                                <span className="imp-icon-img">
                                                    <img
                                                        src={infoIcon}
                                                        alt="imp-icon-file"
                                                    />
                                                </span>
                                                <span className="supported-file-tooltip">
                                                    {t(("supported_file_formats"))}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="file-upload_instruct-row">
                                            <span className="max-word-note">
                                                {t("file_upload_condition_note_1")}: <span>50,000</span>
                                            </span>
                                            <span className="max-file-note">
                                                {t("file_upload_condition_note_2")}: <span>100 MB</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </DragandDrop>
                        </div>
                        <div className={(!showFileUpload && files.length == 0) ? "d-none" : "col-xs-12"}>
                            <div className="button-wrap-file-list">
                                <div className="file-list-align">
                                    <div className="file-list">
                                        {Object.keys(files).map((eachKey) => {
                                            return (
                                                <div
                                                    key={eachKey + files[eachKey].name}
                                                    className="file-name-list"
                                                >
                                                    <div className="filename" style={{ width: '90%' }}>
                                                        {
                                                            <img
                                                                src={
                                                                    `${Config.BASE_URL}/app/extension-image/` +
                                                                    files[eachKey].name
                                                                        .split(".")
                                                                        .pop()
                                                                }
                                                                alt="document"
                                                            />
                                                        }
                                                        <span className="filename-length">
                                                            {files[eachKey].name
                                                                .split(".")
                                                                .slice(0, -1)
                                                                .join(".")}
                                                        </span>
                                                        <span className="extension">
                                                            {"." +
                                                                files[eachKey].name
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
                                                            src={BlackClose}
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
                    </>
                }
            </div>
        </>
    )
}

export default AddStoryFile;