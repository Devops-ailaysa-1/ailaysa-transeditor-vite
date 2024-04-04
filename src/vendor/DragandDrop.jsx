import React, { useState, useRef, useEffect } from "react";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useTranslation } from "react-i18next";


const DragAndDrop = (props) => {
    const [drag, setDrag] = useState(false);
    const { t } = useTranslation();
    const dragCounter = useRef(0);
    const dropRef = useRef(null);
  
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDragIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDrag(true);
      }
    };
  
    const handleDragOut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setDrag(false);
      }
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDrag(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        props.handleDrop(e.dataTransfer.files);
        e.dataTransfer.clearData();
        dragCounter.current = 0;
      }
    };
  
    useEffect(() => {
      const div = dropRef.current;
      div.addEventListener("dragenter", handleDragIn);
      div.addEventListener("dragleave", handleDragOut);
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop);
  
      return () => {
        div.removeEventListener("dragenter", handleDragIn);
        div.removeEventListener("dragleave", handleDragOut);
        div.removeEventListener("dragover", handleDrag);
        div.removeEventListener("drop", handleDrop);
      };
    }, [handleDrop]);
  
    return (
      <div className={props.isChatBook ? "chat-book-drag-nd-drop-wrapper" : ""} style={{ display: "inline-block", width: "100%", position: 'relative' }} ref={dropRef}>
        {drag && (
          <div className={"dragging-main-wrapper " + (props.showSettings && "settings-drag-n-drop-file-upload")}>
            <div className="dragging-inner-wrapper">
              <FileUploadOutlinedIcon className="file-upload"/>
              <h3>{t("drop_here")}!</h3>
            </div>
          </div>
        )}
        {props.children}
      </div>
    );
  };
  
  export default DragAndDrop;
  