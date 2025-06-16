import {useEffect, useRef, useState} from 'react';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Config from '../vendor/Config';
import ButtonBase from '@mui/material/ButtonBase';
import RichTexteditor from '../vendor/custom-component/RichTexteditor';
import { useTranslation } from 'react-i18next';
import { ButtonLoader } from '../loader/CommonBtnLoader';
import sanitizeHtml from 'sanitize-html-react';
import { useNavigate } from 'react-router-dom';
import AddStoryFile from './AddStoryFile';
import CloseBlack from "../assets/images/new-ui-icons/close_black.svg";


const AddStoryModal = (props) => {
    const { t } = useTranslation();
    let {
        showAddStoryModal,
        setShowAddStoryModal,
        setActiveProjTab
    } = props;

    const history = useNavigate();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
    const [isCreatingStory, setIsCreatingStory] = useState(false);
    const [createModeStory, setCreateModeStory] = useState("text");
    const [files, setFiles] = useState([]);
    const [fileError, setFileError] = useState("");

    const editorRef = useRef(null)

    const cleanEditorData = () => {
        // Take value of summernote editor
        // var editorData = document.querySelector('.note-editable').innerHTML        
        // Take value of textarea
        var editorData = editorRef.current.value;
        let clean = sanitizeHtml(editorData, {
            allowedTags: false,
            allowedAttributes: false,
            allowedClasses: {
                'p': ['right-align-lang-style']
            },
            transformTags: {
                'font': function (tagName, attribs) {
                    // My own custom magic goes here
                    let c = attribs?.color ? attribs?.color : '';
                    let s = attribs?.style ? attribs.style : '';
                    return {
                        tagName: 'span',
                        //   attribs: {
                        //     // backgroundColor: attribs.style.backgroundColor,
                        //     color: attribs.color+";",
                        // }
                        attribs: {
                            style: "color:'" + c + "';" + s,
                        }
                    };
                }
            }
        });
        return clean;
    } 

    const createStory = () => {
        let formData = new FormData();        
        // This is for getting html data from summernote editor
        // let editorData = cleanEditorData()
        // if (editorRef.current.summernote('isEmpty') || document?.querySelector('.note-editable')?.innerText?.trim()?.replace(/\n/g, '')?.length === 0) {
        //     Config.toast(t("empty_story"), 'warning')
        //     return;
        // }
        if(createModeStory === "text") {
            // This is for getting text from textarea
            let editorData = cleanEditorData();
            editorData = editorData?.trim();
            if (editorData?.length === 0 || editorData === "") {
                Config.toast(t("empty_story"), 'warning');
                return;
            }
            formData.append('news_data', editorData);
        }else{
            if(files?.length === 0){
                setFileError(t("upload_files"));
                return;
            }
            for (let x = 0; x < files.length; x++) {
                if (typeof files[x] != "undefined") formData.append("files", files[x]);
            }
        }
        formData.append('source_language', 17);     // for English
        formData.append('target_languages', 77);     // for Tamil
        setIsCreatingStory(true);

        Config.axios({
            url: `${Config.BASE_URL}/workspace/add_stories/`,
            auth: true,
            method: "POST",
            data: formData,
            success: (response) => {
                setIsCreatingStory(false);
                setShowAddStoryModal(false);
                let urlProjId = URL_SEARCH_PARAMS.get('open-project');
                if(urlProjId == response.data?.id){
                    let refreshParam = URL_SEARCH_PARAMS.get('refresh-proj');
                    URL_SEARCH_PARAMS.set('refresh-proj', (refreshParam !== null && refreshParam !== undefined && refreshParam == "true") ? false : true);
                    URL_SEARCH_PARAMS.set('filter', 'inprogress');
                    URL_SEARCH_PARAMS.delete('editor');
                    setActiveProjTab(2);
                    history("/my-stories" + '?' + URL_SEARCH_PARAMS.toString());
                }else{
                    URL_SEARCH_PARAMS.set('open-project', response.data?.id);
                    URL_SEARCH_PARAMS.set('filter', 'inprogress');
                    URL_SEARCH_PARAMS.delete('editor');
                    setActiveProjTab(2);
                    history("/my-stories" + '?' + URL_SEARCH_PARAMS.toString());
                }
            },
            error: (err) => {
                Config.toast(`${t("something_went_wrong")}`, 'error');
                setIsCreatingStory(false);
            }
        });
    }

    return (
        <Rodal className="view-story-modal-wrapper add-story-modal" visible={showAddStoryModal} showCloseButton={false} onClose={() => console.log()}>
            <div className="view-story-modal-inner-wrapper add-story-wrapper">
                <div className='view-story-header'>
                    <h1 className="title mr-1">Add story</h1>
                    <span className="close-btn" onClick={() => { setShowAddStoryModal(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                </div>
                <div className="add-story-header-wrapper">
                    <div className="story-tab-wrapper">
                        <div className={"story-tab-item " + (createModeStory === "text" ? "active" : "")} onClick={() => setCreateModeStory("text")}>{t("text")}</div>
                        <div className={"story-tab-item " + (createModeStory === "file" ? "active" : "")} onClick={() => setCreateModeStory("file")}>{t("file")}</div>
                    </div>
                </div>
                <div className="story-main-wrapper add-story-wrap" >
                    {
                        createModeStory === "text" && (
                            <textarea 
                                ref={editorRef}
                                placeholder={t("add_story_placeholder")}
                            ></textarea>
                        )
                        // {/* <RichTexteditor 
                        //     editorRef={editorRef}
                        //     isWorkspace={false} 
                        // /> */}
                    }
                    {
                        createModeStory === "file" && (
                            <AddStoryFile 
                                files={files}
                                setFiles={setFiles}
                                fileError={fileError}
                                setFileError={setFileError}
                            />
                        )
                    }
                </div>
                <div className='footer-story-wrapper header-align'>
                    <div className='get-stories-btn-wrapper my-stories'>
                        <ButtonBase 
                            className="add-btn-wrapper"
                            onClick={() => !isCreatingStory && createStory()}
                        >
                            {isCreatingStory && (
                                <span style={{marginRight: "8px"}}>
                                    <ButtonLoader />
                                </span>
                            )}
                            {t("create_story")}
                        </ButtonBase>
                    </div>
                </div>
            </div>
        </Rodal>
    )
}

export default AddStoryModal;