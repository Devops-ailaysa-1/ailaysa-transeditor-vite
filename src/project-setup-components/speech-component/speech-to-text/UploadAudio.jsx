import React, { useState, useEffect, createRef, useRef } from "react";
import Config from "../../../vendor/Config";
import { useTranslation } from "react-i18next";
import VoiceUploadIcon from "../../../assets/images/project-setup/voice/voice-upload-icon.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"


const UploadAudio = (props) => {
    const { t } = useTranslation();
    let { DragandDrop, handleDrop, handleChange, files, removeFile, niceBytes, editFiles, deleteEditFile, removeTempFile} = props
    // console.log(files);
    // console.log(editFiles);
    return (
        <React.Fragment>
            { 
                !files.length >= 0 && !editFiles?.length >= 0  &&
                <DragandDrop handleDrop={handleDrop} className='sample'>
                    <div className={(files.length > 0 || editFiles?.length > 0 ) ?  "upload-audio-work-area h-25 fileloaded " : 'upload-audio-work-area' }>
                        <div className="file-drop-area-wrapper">
                            <img className={(files.length > 0 || editFiles?.length > 0 ) && 'img'} src={VoiceUploadIcon} alt="voice-upload-icon"/>
                            <div className="content-wrapper">
                                <div className="content-one-info">
                                    <span className="txt">{t("drop_your_speech_files_here_or")}</span>
                                    <div className="voice-file-manual-upload">
                                        <label htmlFor="audio-file">{t("browse")}</label><span className="asterik-symbol drag-drop-asterik">*</span>
                                        <input type="file" name="audio-file" id="audio-file"  accept="audio/*" onChange={handleChange} multiple hidden/>
                                    </div>
                                </div>
                            </div>
                        </div>         
                    </div>
                </DragandDrop>
            }
                
                {/* // <DragandDrop handleDrop={handleDrop}> */}
                   { (files.length > 0 || editFiles?.length > 0) && <div className="audio-file-list-wrapper">
                    {editFiles?.map((editFile) => {
                        return(
                            <>
                                <div
                                    key={editFile?.id}
                                    className="file-name-list"
                                >
                                    <div className="filename">
                                    {
                                        <img
                                        src={
                                            `${Config.BASE_URL}/app/extension-image/` +
                                            editFile?.filename.split(".").pop()
                                        }
                                        alt="document"
                                        />
                                    }
                                    <span className="filename-length">
                                        {editFile?.filename
                                        .split(".")
                                        .slice(0, -1)
                                        .join(".")}
                                    </span>
                                    <span className="extension">
                                        {"." +
                                        editFile?.filename.split(".").pop()}
                                        {
                                            !editFile?.file &&
                                            ` (${t("edited_src_file_from_writer")})`
                                        }
                                    </span>
                                    </div>
                                    <span
                                    className="upload-file-delete"
                                    onClick={(e) =>
                                        editFile?.file ? 
                                        deleteEditFile(
                                        e,
                                        editFile?.can_delete,
                                        editFile?.id
                                        ) :
                                        removeTempFile(
                                            editFile?.id
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
                        })
                        }
                        {
                            Object.keys(files).map((eachKey) => {
                                return (
                                <div className="audio-file-list-item" key={eachKey + files[eachKey].name}>
                                    <div className="file-info-wrapper" style={{width:'90%'}}>
                                        <img
                                            src={
                                                `${Config.BASE_URL}/app/extension-image/` +
                                                files[eachKey].name.split(".").pop()
                                            }
                                            alt="document"
                                        />
                                        <div className="file-name-wrap" style={{width:'95%'}}>
                                            <span className="title" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{files[eachKey].name}</span>
                                            <small>{niceBytes(files[eachKey].size)}</small>
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
                            <label className="form-control-file" htmlFor="audio-file">
                                <span>
                                    <img
                                    src={CloseBlack}
                                    alt="link-pin"
                                    />
                                </span>
                                Add more
                            </label>
                            <input type="file" name="audio-file" id="audio-file" accept="audio/*" onChange={(e) => handleChange(e)} multiple hidden/>
                        </div> */}
                    </div>}
                {/* // </DragandDrop> */}
            

        </React.Fragment>
    )
};

export default UploadAudio;