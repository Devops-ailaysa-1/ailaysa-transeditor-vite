import React, { useEffect, useRef, useState } from 'react'
import { AITab } from '../../../../components/AITabs/AITab'
import { useTranslation } from 'react-i18next'
import ArrowRightGrey from "../../../../assets/images/arrow_right_grey.svg"
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Checkbox } from '@mui/material';
import { BulkFileUploadModal } from '../../../project-type-selection/wordchoice-workspace/BulkFileUploadModal';
import Config from '../../../Config';
import { ButtonLoader } from '../../../../loader/CommonBtnLoader';
import ProgressAnimateButton from '../../../button-loader/ProgressAnimateButton';

export const ImportTerms = (props) => {

    let {
        glossaryList,
        selectedGlossaryList,
        projectFilesListRef,
        projectId,
        taskId,
        getSelectedGlossaries,
        setActiveScreen,
        isSrcEnglish,
        defaultGlossDetailsRef
    } = props

    const {t} = useTranslation()

    const [activeImportTab, setActiveImportTab] = useState(1)
    const [isGlossaryListLoading, setIsGlossaryListLoading] = useState(false)
    const [checkedGlossary, setCheckedGlossary] = useState([])
    const [isGlossaryChanged, setIsGlossaryChanged] = useState(false)
    const [projectFilesList, setProjectFilesList] = useState([])
    const [openBulkUploadModal, setOpenBulkUploadModal] = useState(true);
    const [filesList, setFilesList] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    
    const [selectedFileIds, setSelectedFileIds] = useState([])

    const glossaryToRemove = useRef([])
    const fileExtractionTimeOutRef = useRef(null)

    const importTermsTabList = [
        {
            value: 1,
            label: t("glossary_list")
        },
        {
            value: 2,
            label: t("extract_term")
        },
        {
            value: 3,
            label: t("bulk_upload")
        },
    ]
    
    useEffect(() => {
        console.log(projectFilesListRef.current)
        setProjectFilesList(projectFilesListRef.current)
    }, [projectFilesListRef.current])
     
    // check the already added glossaries
    useEffect(() => {
        // console.log("checked list changed")
        if (glossaryList?.length !== 0 && selectedGlossaryList?.length !== 0) {
            let a = glossaryList.filter(item => selectedGlossaryList.some(each => item.glossary_id == each.glossary))
            let list = []
            a?.map(each => {
                list.push(each.glossary_id)
            })
            // console.log(list)
            setCheckedGlossary(list)
        }
    }, [selectedGlossaryList, glossaryList])

    // store the glossary which are removed
    useEffect(() => {
        let list = selectedGlossaryList?.filter(o1 => !checkedGlossary.some(o2 => o1.glossary == o2))
        // console.log(list)
        glossaryToRemove.current = list
        if (glossaryToRemove.current?.length !== 0 || checkedGlossary?.filter(item => !selectedGlossaryList?.some(each => each.glossary == item))?.length !== 0) {
            setIsGlossaryChanged(true)
        } else {
            setIsGlossaryChanged(false)
        }
    }, [checkedGlossary]);

    useEffect(() => {
        if(activeImportTab === 2){
            checkExtractionFileStatus()
        }
        return () => {
            clearTimeout(fileExtractionTimeOutRef.current)
        }
    }, [activeImportTab])
    


    const handleOnTabChange = (selOpt) => {
        setActiveImportTab(selOpt.value)
        if(selOpt.value === 3) setOpenBulkUploadModal(true)
    } 

    // handle glossary checkbox change
    const handleGlossaryCheckbox = (e, glossItem) => {
        if(!checkedGlossary.includes(glossItem.glossary_id))
            setCheckedGlossary([...checkedGlossary, glossItem.glossary_id])
        else 
            setCheckedGlossary(checkedGlossary.filter(item => item != glossItem.glossary_id))
    }

    // add glossary
    const addGlossaryToProject = () => {
        let formData = new FormData();
        formData.append("project", projectId);
        if (selectedGlossaryList?.length == 0) {
            checkedGlossary?.map(each => {
                formData.append("glossary", each);
            })
        } else {
            let listToUpdate = checkedGlossary?.filter(item => !selectedGlossaryList?.some(each => each.glossary == item))
            // console.log(listToUpdate);
            listToUpdate?.map(each => {
                formData.append("glossary", each);
            })
        }
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/`,
            auth: true,
            method: "POST",
            data: formData,
            success: (response) => {
                if(response?.status === 201) {
                    setIsGlossaryChanged(false)
                    getSelectedGlossaries()
                }
                Config.toast(t("added_success"))
            },
            error: (err) => {
            }
        });
    };

    // remove glossary
    const removeGlossaryFromProject = () => {
        let list = "";
        glossaryToRemove.current?.map((each, index) => {
            list += `${each.id}${index !== glossaryToRemove.current?.length - 1 ? "," : ""}`;
        });
        console.log(list);
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?to_remove_ids=${list}`,
            auth: true,
            method: "DELETE",
            success: (response) => {
                Config.toast(t("removed_success"))
                setIsGlossaryChanged(false)
                getSelectedGlossaries()
            },
            error: (err) => {
            }
        });
    };

    // upload excel upload (bulk upload)
    const handleBulkUploadTerms = (e) => {

        if(filesList?.length === 0) {
            Config.toast("No files uploaded", 'warning')
            return 
        }

        let formData = new FormData();
        for (let x = 0; x < filesList.length; x++) {
            if (typeof filesList[x] != "undefined") formData.append("glossary_file", filesList[x]);
        }
       
        formData.append("task_id", taskId);
        setIsUploading(true)

        Config.axios({
            url: Config.BASE_URL + "/glex/glossary_file_upload/",
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                Config.toast(t("added_success"))
                setActiveScreen(1)
                setIsUploading(false)
            },
            error: (err) => {
                if (err?.response?.status == 400) {
                    Config.toast(t("gloss_file_not_support"), 'warning')
                } else if (err?.response?.status == 500) {
                    Config.toast(t("gloss_file_not_support"), 'warning')
                }
                setIsUploading(false)
            }
        });
    }

    // handle extract term file checkbox change
    const handleFileCheckBoxChange = (e, fileId) => {
        if(!selectedFileIds.includes(fileId))
            setSelectedFileIds([...selectedFileIds, fileId])
        else 
            setSelectedFileIds(selectedFileIds.filter(item => item != fileId))
    } 

    
    // extract terms from project file
    const extractTermsFromFile = () => {
        let formData = new FormData();
        selectedFileIds.forEach(each => {
            formData.append("file_id", each);
        })
        formData.append("gloss_task_id", defaultGlossDetailsRef.current?.gloss_task_id);
        
        Config.axios({
            url: Config.BASE_URL + "/glex/extract_text",
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                try{
                    let newArr = projectFilesList.map(obj => {
                        if(selectedFileIds.includes(obj.id)){
                            return {
                                ...obj,
                                status: response.data.find(each => each.term_model_file == obj.id).status?.toLowerCase()
                            }
                        }
                        return obj 
                    })
                    setProjectFilesList(newArr)
    
                    setTimeout(() => {
                        checkExtractionFileStatus()
                    }, 1500);
                }catch(e) {
                    console.log(e)
                }
            },
            error: (err) => {
                if (err?.response?.status == 400) {
                    // Config.toast(t("gloss_file_not_support"), 'warning')
                } else if (err?.response?.status == 500) {
                    // Config.toast(t("gloss_file_not_support"), 'warning')
                }
            }
        });
    }

    const checkExtractionFileStatus = () => {
        Config.axios({
            url: Config.BASE_URL + `/glex/get_extract_text_status?project_id=${projectId}`,
            auth: true,
            success: (response) => {
                console.log(response.data)
                let newArr = projectFilesList.map(obj => {
                    if(response.data?.find(each => each.term_model_file === obj.id)){
                        return {
                            ...obj,
                            status: response.data.find(each => each.term_model_file == obj.id).status?.toLowerCase()
                        }
                    }
                    return obj
                })
                setProjectFilesList(newArr)

                if(response.data?.find(file => file.status === "PENDING")){
                    fileExtractionTimeOutRef.current = setTimeout(() => {
                        checkExtractionFileStatus()
                    }, 5000);
                }
            },
            error: (err) => {
                
            }
        });
    } 

    const handleActionBtn = (e) => {
        if(activeImportTab === 1) {
            if(!isGlossaryChanged) return
            if (glossaryToRemove.current?.length !== 0) {
                removeGlossaryFromProject()
            }
            if (checkedGlossary?.filter(item => !selectedGlossaryList?.some(each => each.glossary == item))?.length !== 0) {
                addGlossaryToProject()
            }
        }else if(activeImportTab === 2) {
            extractTermsFromFile()
        }else if(activeImportTab === 3){
            handleBulkUploadTerms()
        }
    } 
    
    return (
        <>
            <AITab
                onChange={handleOnTabChange} 
                activeTab={activeImportTab}
                dataList={importTermsTabList?.filter(item => isSrcEnglish ? true : item.value !== 2)}
                customClass="mb-4 w-2/5"
            />
            <div className="asset-glossary-list-wrapper">
                {activeImportTab === 1 ? (
                    <ul className="asset-glossary-projects-wrap-list">
                        {(isGlossaryListLoading && glossaryList?.length === 0) ? (
                            Array(8).fill(null).map((index) => {
                                return(
                                    <>
                                        <li key={index} style={(!isGlossaryListLoading && glossaryList?.length !== 0) ? {display: 'none'} : {}}>
                                            <Skeleton animation="wave" variant="rectangular" height={15} width={15} />
                                            <div className="asset-project-info-wrap">
                                                <Skeleton animation="wave" variant="rectangular" width={26} height={26} />
                                                <div className="asset-project-info">
                                                    <span className="title"><Skeleton animation="wave" variant="text" width={150} /></span>
                                                    <div className="lang-pair">
                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                        <img src={ArrowRightGrey} />
                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </>
                                )
                            })
                        ) : (
                            glossaryList?.length !== 0 ?
                                glossaryList?.map((value) => {
                                    return (
                                        <li key={value?.glossary_id}>
                                            <div className="asset-project-select-checkbox">
                                                <Checkbox
                                                    checked={checkedGlossary?.find(each => each == value?.glossary_id) ? true : false}
                                                    onChange={(e) => handleGlossaryCheckbox(e, value)}
                                                    size="small"
                                                />
                                            </div>
                                            <div className="asset-project-info-wrap">
                                                <span className="assets-icon">
                                                    <DescriptionOutlinedIcon className="gloss-types" />
                                                </span>
                                                <div className="asset-project-info">
                                                    <span className="title">{value.glossary_name}</span>
                                                    <div className="lang-pair">
                                                        <span>{value?.source_lang}</span>
                                                        <img src={ArrowRightGrey} />
                                                        <span>{value?.target_lang?.join(', ')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            :
                                <span>{t("no_glossaries_to_ass")}</span>
                        )}
                    </ul>
                ) : activeImportTab === 2 ? (
                    <ul className="asset-glossary-projects-wrap-list">
                        {(isGlossaryListLoading && projectFilesList?.length === 0) ? (
                            Array(8).fill(null).map((index) => {
                                return(
                                    <>
                                        <li key={index} style={(!isGlossaryListLoading && projectFilesList?.length !== 0) ? {display: 'none'} : {}}>
                                            <Skeleton animation="wave" variant="rectangular" height={15} width={15} />
                                            <div className="asset-project-info-wrap">
                                                <Skeleton animation="wave" variant="rectangular" width={26} height={26} />
                                                <div className="asset-project-info">
                                                    <span className="title"><Skeleton animation="wave" variant="text" width={150} /></span>
                                                    <div className="lang-pair">
                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                        <img src={ArrowRightGrey} />
                                                        <Skeleton animation="wave" variant="text" width={50} />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </>
                                )
                            })
                        ) : (
                            projectFilesList?.length !== 0 ?
                            projectFilesList?.map((file) => {
                                    return (
                                        <li key={file?.id} className={file?.done_extraction ? "disable" : ""}>
                                            <div className="asset-project-select-checkbox">
                                                <Checkbox
                                                    checked={selectedFileIds?.find(each => each == file?.id) ? true : false}
                                                    onChange={(e) => handleFileCheckBoxChange(e, file.id)}
                                                    size="small"
                                                />
                                            </div>
                                            <div className="asset-project-info-wrap">
                                                <span>
                                                {
                                                    <img
                                                        src={
                                                            `${Config.BASE_URL}/app/extension-image/` +
                                                            file?.filename?.split(".")?.pop()
                                                        }
                                                        alt="document"
                                                    />
                                                }
                                                </span>
                                                <div className="asset-project-info">
                                                    <span className="title">{file?.filename}</span>
                                                </div>
                                                {(file?.done_extraction || file?.status === "finished") && (
                                                    <span className='file-status-tag success ml-auto'>Extracted</span>
                                                )}
                                                {file?.status === "error" && (
                                                    <span className='file-status-tag error ml-auto'>Failed</span>
                                                )}
                                                {file?.status === "pending" && (
                                                    <ProgressAnimateButton name="Extracting" customclass="ml-auto" />
                                                )}
                                            </div>
                                        </li>
                                    )
                                })
                            :
                                <span>{t("pdf_not_found_note")}</span>
                        )}
                    </ul>
                ) : activeImportTab === 3 && (
                    <BulkFileUploadModal 
                        openModal={openBulkUploadModal}
                        setOpenModal={setOpenBulkUploadModal}
                        handleUploadBtn={handleBulkUploadTerms}
                        isUploading={isUploading}
                        filesList={filesList}
                        setFilesList={setFilesList}
                        nonModal={true}
                    />
                )}
            </div>
                <button 
                    className="convert-pdf-list-UploadProjectButton block mt-3 ml-auto" 
                    onClick={handleActionBtn}
                >
                    <span className="fileupload-new-btn bulk-upload-span">
                        {
                            isUploading && (
                                <ButtonLoader />
                            )
                        }
                        
                        {
                            activeImportTab === 1 ? t("save") : 
                            activeImportTab === 2 ? t("extract_term") : 
                            activeImportTab === 3 && (isUploading ? t("uploading") : t("upload")) 
                        }
                        
                    </span>
                </button>
        </>
    )
}
