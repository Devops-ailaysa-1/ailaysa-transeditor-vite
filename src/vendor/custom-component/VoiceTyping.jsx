import React, { useEffect } from 'react';
import { webSpeechLang } from './../../project-setup-components/speech-component/text-to-speech/WebSpeechLang';

const SpeechRecognitionToggle = (props) => {
    let {
        recognition,
        setIsListening,
        recognizedText,
        setRecognizedText,
        targetLanguage,
        fromWriter
    } = props

    const handleRecognitionStart = () => {
        setIsListening(true);
    };

    const handleRecognitionEnd = () => {
        setIsListening(false);
    };

    const handleRecognitionResult = (event) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        if (result.isFinal) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            // anywhere can be selected but add the replace and add the content only if the element's parent 
            // contains target-lang-part class (target segment class)
            if (!fromWriter && selection.focusNode.parentNode.closest('.target-lang-part')) {
                // Replace the selected content with the transcript
                range.deleteContents();
                const textNode = document.createTextNode(transcript + ' ');
                range.insertNode(textNode);

                // Move the cursor to the end of the inserted text
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                range.deleteContents();
                const textNode = document.createTextNode(transcript + ' ');
                range.insertNode(textNode);

                // Move the cursor to the end of the inserted text
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);

            }
        }
    };

    const initializeRecognition = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            let a = webSpeechLang?.find(each => each.name?.toLowerCase() === targetLanguage?.toLowerCase())
            recognition.current.lang = fromWriter ? targetLanguage : `${a?.code}`;
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.onstart = handleRecognitionStart;
            recognition.current.onend = handleRecognitionEnd;
            recognition.current.onresult = handleRecognitionResult;
        } else {
            console.error('Speech Recognition is not supported in this browser.');
        }
    };

    // Initialize the recognition instance on component mount
    useEffect(() => {
        if (targetLanguage && webSpeechLang?.length !== 0) {
            initializeRecognition();
        }
    }, [targetLanguage, webSpeechLang]);


    return (
        <div>
            {/* <button onClick={toggleListening}>
				{isListening ? 'Stop Listening' : 'Start Listening'}
			</button>
			<div
				contentEditable="true"
				ref={outputDivRef}
				style={{ border: '1px solid #ccc', minHeight: '100px', padding: '5px' }}
			>
				{recognizedText}
			</div> */}
        </div>
    );
};

export default SpeechRecognitionToggle;
