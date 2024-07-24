import React, { useState } from 'react'
import { AITab } from '../../../../components/AITabs/AITab'
import { useTranslation } from 'react-i18next'
import ArrowRightGrey from "../../../../assets/images/arrow_right_grey.svg"
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Checkbox } from '@mui/material';
import { BulkFileUploadModal } from '../../../project-type-selection/wordchoice-workspace/BulkFileUploadModal';

export const ImportTerms = () => {

    const {t} = useTranslation()

    const [activeImportTab, setActiveImportTab] = useState(1)
    const [isGlossaryListLoading, setIsGlossaryListLoading] = useState(false)
    const [glossaryList, setGlossaryList] = useState([])
    const [openBulkUploadModal, setOpenBulkUploadModal] = useState(true);


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
        console.log(selOpt)
        setActiveImportTab(selOpt.value)
        if(selOpt.value === 3) setOpenBulkUploadModal(true)
    } 
    
    return (
        <>
            <AITab
                onChange={handleOnTabChange} 
                activeTab={activeImportTab}
                dataList={importTermsTabList}
                customClass="mb-4 w-2/5"
            />

            {activeImportTab === 1 ? (
                <div className="asset-glossary-list-wrapper">
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
                                                    // checked={checkedGlossary?.find(each => each == value?.glossary_id) ? true : false}
                                                    // onChange={(e) => handleGlossaryCheckbox(e, value.glossary_id)}
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
                </div>
            ) : activeImportTab === 2 ? (
                <div className="asset-glossary-list-wrapper">
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
                                                    // checked={checkedGlossary?.find(each => each == value?.glossary_id) ? true : false}
                                                    // onChange={(e) => handleGlossaryCheckbox(e, value.glossary_id)}
                                                    size="small"
                                                />
                                            </div>
                                            <div className="asset-project-info-wrap">
                                                <span className="assets-icon">
                                                    <DescriptionOutlinedIcon className="gloss-types" />
                                                </span>
                                                <div className="asset-project-info">
                                                    <span className="title">{value.glossary_name}</span>
                                                    {/* <div className="lang-pair">
                                                        <span>{value?.source_lang}</span>
                                                        <img src={ArrowRightGrey} />
                                                        <span>{value?.target_lang?.join(', ')}</span>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            :
                                <span>{t("pdf_not_found_note")}</span>
                        )}
                    </ul>
                </div>
            ) : activeImportTab === 3 && (
                <BulkFileUploadModal 
                    openModal={openBulkUploadModal}
                    setOpenModal={setOpenBulkUploadModal}
                />
            )}
        </>
    )
}
