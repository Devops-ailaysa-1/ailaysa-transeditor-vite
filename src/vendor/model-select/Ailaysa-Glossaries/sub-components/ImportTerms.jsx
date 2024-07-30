import React, { useEffect, useRef, useState } from 'react'
import { AITab } from '../../../../components/AITabs/AITab'
import { useTranslation } from 'react-i18next'
import ArrowRightGrey from "../../../../assets/images/arrow_right_grey.svg"
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Checkbox } from '@mui/material';
import { BulkFileUploadModal } from '../../../project-type-selection/wordchoice-workspace/BulkFileUploadModal';
import Config from '../../../Config';

export const ImportTerms = (props) => {

    let {
        glossaryListRef,
        selectedGlossaryListRef,
        projectFilesListRef,
        projectId,
        taskId,
        getGlossaryList,
        getSelectedGlossaries,
        setActiveScreen,
        isSrcEnglish
    } = props

    const {t} = useTranslation()

    const [activeImportTab, setActiveImportTab] = useState(1)
    const [isGlossaryListLoading, setIsGlossaryListLoading] = useState(false)
    const [glossaryList, setGlossaryList] = useState([])
    const [selectedGlossaryList, setSelectedGlossaryList] = useState([])
    const [checkedGlossary, setCheckedGlossary] = useState([])
    const [isGlossaryChanged, setIsGlossaryChanged] = useState(false)
    const [projectFilesList, setProjectFilesList] = useState([])
    const [openBulkUploadModal, setOpenBulkUploadModal] = useState(true);
    const [isUploading, setIsUploading] = useState(false)
    const [filesList, setFilesList] = useState([])

    const glossaryToRemove = useRef([])

    useEffect(() => {
        setGlossaryList(glossaryListRef.current)
    }, [glossaryListRef.current])
    
    useEffect(() => {
        setSelectedGlossaryList(selectedGlossaryListRef.current)
    }, [selectedGlossaryListRef.current])
    
    useEffect(() => {
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

    const handleOnTabChange = (selOpt) => {
        setActiveImportTab(selOpt.value)
        if(selOpt.value === 3) setOpenBulkUploadModal(true)
    } 

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
                    // getGlossaryList()
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
        // console.log(list);
        Config.axios({
            url: `${Config.BASE_URL}/glex/glossary_selected/?to_remove_ids=${list}`,
            auth: true,
            method: "DELETE",
            success: (response) => {
                Config.toast(t("removed_success"))
                setIsGlossaryChanged(false)
                // getGlossaryList()
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
            },
            error: (err) => {
                if (err?.response?.status == 400) {
                    Config.toast(t("gloss_file_not_support"), 'warning')
                } else if (err?.response?.status == 500) {
                    Config.toast(t("gloss_file_not_support"), 'warning')
                }
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
                            projectFilesList?.map((value) => {
                                    return (
                                        <li key={value?.glossary_id}>
                                            <div className="asset-project-select-checkbox">
                                                <Checkbox
                                                    // checked={checkedGlossary?.find(each => each == value?.glossary_id) ? true : false}
                                                    // onChange={(e) => handleGlossaryCheckbox(e, value.glossary_id)}
                                                    size="small"
                                                />
                                            </div>
                                            <div className="asset-project-info-wrap">
                                                <span>
                                                {
                                                    <img
                                                        src={
                                                            `${Config.BASE_URL}/app/extension-image/` +
                                                            value?.filename?.split(".")?.pop()
                                                        }
                                                        alt="document"
                                                    />
                                                }
                                                </span>
                                                <div className="asset-project-info">
                                                    <span className="title">{value?.filename}</span>
                                                </div>
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
                            activeImportTab === 1 ? t("save") : 
                            activeImportTab === 2 ? t("extract_term") : 
                            activeImportTab === 3 && t("upload") 
                        }
                    </span>
                </button>
        </>
    )
}
