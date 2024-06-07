import React, { useEffect, useState } from 'react'
import { PromptLibraryModal } from '../Prompt-library/PromptLibraryModal'
import { LangSelectorDropDown } from '../lang-select-drop-down/LangSelectorDropDown'
import { useSelector } from 'react-redux'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useRef } from 'react';
import './prompt_writing_box.css'

export const PromptWritingBox = () => {
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)
    const [toggler, setToggler] = useState(false)

    const contenteditableRef = useRef(null)
    const promptBoxRef = useRef(null)

    const initialText = `
    Using the 'Attention-Interest-Desire-Action' framework, write an email marketing
    campaign that highlights the <span class="placeholder" >[features]</span>
    of our <span class="placeholder" >[product/service]</span> and explains how these
    <span class="placeholder" >[advantages]</span> can be helpful to
    <span class="placeholder" >[ideal customer persona]</span>.
    Elaborate on the <span class="placeholder" >[benefits]</span> of our product and how it can positively impact the reader.
    `;

    useEffect(() => {
        // Add click event listener to placeholders
        const placeholders = document.querySelectorAll('.placeholder');
        placeholders.forEach((placeholder) => {
          placeholder.addEventListener('click', handlePlaceholderClick);
        });
    
        // Cleanup event listeners on component unmount
        return () => {
          placeholders.forEach((placeholder) => {
            placeholder.removeEventListener('click', handlePlaceholderClick);
          });
        };
    }, [toggler]);

    const toggleState = () => {
        setToggler(!toggler)
    }

    const handleInput = (evt) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        if (range.startContainer.parentNode.className === 'placeholder') {
          const placeholder = range.startContainer.parentNode;
          console.log(evt.nativeEvent.data)
          const newText = document.createTextNode(evt.nativeEvent.data);
          range.deleteContents();
          placeholder.replaceWith(newText);
          range.setStartAfter(newText);
          selection.removeAllRanges();
          selection.addRange(range);
        }
    };

    const handleContenteditableFocus = (e) => {
        promptBoxRef.current.classList.add('active')
    } 

    const handleContenteditableBlur = (e) => {
        promptBoxRef.current.classList.remove('active')
    } 

    const handlePlaceholderClick = (evt) => {
        const range = document.createRange();
        console.log(evt.target)
        range.selectNodeContents(evt.target);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };

    return (
        <div className="prompt-writing-container">
            <div className="prompt-writing-box d-flex" ref={promptBoxRef}>
                <LangSelectorDropDown langList={languageOptionsList} />
                <div 
                    ref={contenteditableRef}
                    className="prompt-writing-contenteditable" 
                    contentEditable={true}
                    data-placeholder="Ask anything"
                    onInput={handleInput}
                    onFocus={handleContenteditableFocus}
                    onBlur={handleContenteditableBlur}
                    dangerouslySetInnerHTML={{__html: initialText}}
                ></div>
                <button className="send-btn">
                    <SendOutlinedIcon style={{color: toggler ? "#C6C6C6" : "#5F6368"}} />
                </button>
            </div>
            <PromptLibraryModal contenteditableRef={contenteditableRef} toggleState={toggleState} />
        </div>
    )
}
