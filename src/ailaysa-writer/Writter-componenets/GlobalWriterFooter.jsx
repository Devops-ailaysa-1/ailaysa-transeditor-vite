import React, { useState, useEffect, createRef, useRef } from "react";
import TextareaAutosize from "@mui/material";
import Config from "../../Config";
import SplitPane, { Pane } from 'split-pane-react';
import ChatSentIcon from "../../assets/images/chat/chat-sent-icon.svg"

const GlobalWriterFooter = () => {
  const promptInput = useRef(null);

  return (
    <section className="global-footer-main-wrapper">
        <div className="global-footer-options-wrapper">
            <div className="options-wrapper">
                <button className="button-1">Test</button>
                <button className="button-2">Test</button>
            </div>
            <div className="options-wrapper">
                <button className="button-1">Test</button>
                <button className="button-2">Test</button>
            </div>
            <div className="options-wrapper">
                <button className="button-1">Test</button>
                <button className="button-2">Test</button>
            </div>
        </div>
        <div className="gloabl-footer-prompt-typing-wrapper">
            <div className="prompt-typing-area">
                <div className="prompt-typing-inner-area">
                    <div className="prompt-type-area">
                        <TextareaAutosize
                            ref={promptInput} 
                            className="sent-input" 
                            placeholder="Type a new message"
                        />
                    </div>
                    <div className="prompt-send-icon-main">
                        <button className="prompt-send-icon" type="submit">
                            <img src={ChatSentIcon} alt="prompt-sent-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GlobalWriterFooter