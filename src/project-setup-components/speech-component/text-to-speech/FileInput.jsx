import React, { useState, useEffect, createRef, useRef } from "react";
import Config from "../../../vendor/Config";
import { useTranslation } from "react-i18next";
import UploadFolder from "../../../assets/images/new-ui-icons/upload-folder.svg";
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg";

const FileInput = (props) => {
    const {DragandDrop, handleDrop, handleChange, files, removeFile, niceBytes, editFiles, deleteEditFile} = props;
    const { t } = useTranslation();

    return(
        <React.Fragment>
           {
                !files.length >= 0 && !editFiles?.length >= 0 &&
                <DragandDrop handleDrop={handleDrop}>
                    <div className={(files.length > 0 || editFiles?.length > 0 ) ?  "upload-audio-work-area h-25 fileloaded " : 'upload-audio-work-area' }>
                        <div className="file-drop-area-wrapper">
                            <img className={(files.length > 0 || editFiles?.length > 0 ) && 'img'} src={UploadFolder} alt="upload-icon"/>
                            <div className="content-wrapper">
                                <div className="content-one-info">
                                    <span className="txt">{t("drop_your_files_here_or")}<span className="asterik-symbol">*</span></span>
                                    <div className="voice-file-manual-upload">
                                        <label htmlFor="text-file">{t("browse")}</label>
                                        <input type="file" name="text-file" id="text-file"  accept=".txt,.docx" onChange={handleChange} multiple hidden/>
                                    </div>
                                </div>
                            </div>
                        </div>         
                    </div>
                </DragandDrop>
            }
            {/* // <DragandDrop handleDrop={handleDrop}> */}
                {(files.length > 0 || editFiles?.length > 0) &&  <div className="audio-file-list-wrapper">
                        {editFiles?.map((editFile) => {
                        return(
                            <>
                                {/* <div className="audio-file-list-item" key={editFile?.id}>
                                    <div className="file-info-wrapper">
                                        <img
                                            src={
                                                `${Config.BASE_URL}/app/extension-image/` +
                                                editFile.filename.split(".").pop()
                                            }
                                            alt="document"
                                        />
                                        <div className="file-name-wrap">
                                            <span className="title">{editFile.filename.split(".").slice(0, -1).join(".")}</span>
                                        </div>
                                    </div>
                                    <span
                                        className="audio-file-delete"
                                        data-file-index={editFile}
                                        onClick={(e) =>
                                            deleteEditFile(
                                                e,
                                                editFile.can_delete,
                                                editFile.id
                                            )
                                        }
                                    >
                                        <img
                                            src={CloseBlack}
                                            alt="delete"
                                        />
                                    </span>
                                </div> */}
                                <div
                                    key={editFile.id}
                                    className="file-name-list"
                                >
                                    <div className="filename">
                                    {
                                        <img
                                        src={
                                            `${Config.BASE_URL}/app/extension-image/` +
                                            editFile.filename.split(".").pop()
                                        }
                                        alt="document"
                                        />
                                    }
                                    <span className="filename-length">
                                        {editFile.filename
                                        .split(".")
                                        .slice(0, -1)
                                        .join(".")}
                                    </span>
                                    <span className="extension">
                                        {"." +
                                        editFile.filename.split(".").pop()}
                                    </span>
                                    </div>
                                    <span
                                    className="upload-file-delete"
                                    onClick={(e) =>
                                        deleteEditFile(
                                        e,
                                        editFile.can_delete,
                                        editFile.id
                                        )
                                    }
                                    >
                                    <img
                                        src={CloseBlack}
                                        alt="delete"
                                    />
                                    </span>
                                </div>
                            </>
                        )
                        })}
                        {
                            Object.keys(files).map((eachKey) => {
                                return (
                                <div className="audio-file-list-item" key={eachKey + files[eachKey].name}  >
                                    <div className="file-info-wrapper" style={{width:'90%'}}>
                                        <img
                                            src={
                                                `${Config.BASE_URL}/app/extension-image/` +
                                                files[eachKey].name.split(".").pop()
                                            }
                                            alt="document"
                                        />
                                        <div className="file-name-wrap" style={{width:'90%',display:'flex'}}>
                                            <span className="title" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{files[eachKey].name}</span>
                                            {/* <small>{niceBytes(files[eachKey].size)}</small> */}
                                        </div>
                                    </div>
                                    <span
                                        className="audio-file-delete"
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
                            )})
                        }
                        {/* <div className="add-more-files-wrap">
                            <label className="form-control-file" htmlFor="text-file">
                                <span>
                                    <img
                                    src={
                                        Config.HOST_URL +
                                        "assets/images/new-ui-icons/link-pin.svg"
                                    }
                                    alt="link-pin"
                                    />
                                </span>
                                Add more
                            </label>
                            <input type="file" name="text-file" id="text-file" accept=".txt,.docx" onChange={(e) => handleChange(e)} multiple hidden/>
                        </div> */}
                    </div>}
                {/* // </DragandDrop> */}
            
        </React.Fragment>
    )
}

export default FileInput;