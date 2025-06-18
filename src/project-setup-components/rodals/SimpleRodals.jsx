import React, {useState} from 'react';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Config from "../../vendor/Config";
import SourceLanguage from "../../vendor/lang-modal/Sourcelanguage";
import TargetLanguage from "../../vendor/lang-modal/Targetlanguage";
import WarningIcon from '@mui/icons-material/Warning';
import Select, { components } from "react-select";
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Button from '@mui/material/Button';
import { ButtonBase } from '@mui/material';
import { ButtonLoader } from '../../loader/CommonBtnLoader';
import { useTranslation } from "react-i18next";
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg";
import TempLoader from "../../assets/images/temp-download-loader.svg";

const SimpleRodals = (props) => {
    const { t } = useTranslation();
    const {
        // filteredResults,
        // setFilteredResults,
        // searchInput,
        // setSearchInput,
        // onFocusWrap,
        // setOnFocusWrap,
        searchAreaRef,
        setShowUnhireModel,
        unHireEditor,
        particularEditorId,
        poPDFUrl,
        taskAssignUpdate,
        handleAudioAlertModalYes,
        translatedAudioAlertModal,
        setTranslatedAudioAlertModal,
        showUnassignModal,
        setShowUnassignModal,
        unassignEditor,
        unassignParameters,
        showSubmitDocumentAlertModal,
        setShowSubmitDocumentAlertModal,
        handleDocuemtSubmitConfirmation,
        localeOptions,
        genderOptions,
        handleLocaleChange,
        handleGenderChange,
        audioLocale,
        audioGender,
        showZeroSegmentAlertModal,
        setShowZeroSegmentAlertModal,
        showDownloadingModal,
        setShowDownloadingModal,
        isAudioConverting,
        setIsAudioConverting,
        isFileUnderProcess,
        setIsFileUnderProcess,
        showLongFileAlertModal,
        setShowLongFileAlertModal,
        editor,
        summerNoteEditorRef,
        showVendorComplaintReasonModal,
        setShowVendorComplaintReasonModal,
        handleDocumentSubmitBtn,
        vendorReturnRequestReasonText,
        setVendorReturnRequestReasonText,
        showDontHaveEditingAccessAlertModal,
        setShowDontHaveEditingAccessAlertModal,
        showSubmitConfirmModal,
        setShowSubmitConfirmModal,
        documentRestrictionReasonRef,
        isDocumentSubmitting
    } = props;

    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const modaloption = {
        closeMaskOnClick: false,
        // closeOnEsc: true,
        height: 'auto',
        width: showSubmitDocumentAlertModal ? 560 : props.showInsufficientConfirmAllModal ? 450 : (!props?.showUnHireModel && !showUnassignModal && !showZeroSegmentAlertModal && !props.showMtDisabledModal) ? 784 : 350,
        onClose: props.hideSettingsModal,
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };

    const customStepSelectStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#7E7E7E",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px 0px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: "0px solid #CED4DA",
            borderLeft: "2px solid transparent",
            color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
            background: state.isSelected || state.isDisabled ? "#ededed" : "#ffffff",
            opacity: state.isDisabled ? 0.5 : 1,
            cursor: state.isDisabled ? "context-menu" : "pointer",
            display: "flex",
            marginBottom: "0.5rem",
            padding: "5px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: "#F4F5F7",
                borderLeft: "2px solid #0074D3",
                cursor: state.isDisabled ? "context-menu" : "pointer",
            },
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "1px solid #DBDBDB" : "1px solid #DBDBDB",
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#3C4043" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "24px",
            boxShadow: 0,
            padding: "0px 11px 0px 13px",
            height: 46,
            "&:hover": {
                cursor: "pointer",
            },
        }),
    };

    return (
        <React.Fragment>
            {props.showSrcLangModal ? (
                <Rodal visible={props?.showSrcLangModal} {...modaloption} showCloseButton={false} className="ai-lang-select-modal">
                    <div className="lang-modal-wrapper">
                        {/* <h1>Select a source language</h1> */}
                        <span className="modal-close-btn lang-close" onClick={() => {
                            if (summerNoteEditorRef?.current) {
                                summerNoteEditorRef?.current?.summernote('restoreRange')
                                // props.sidebarTabControlVisible()
                            }
                            props?.setshowSrcLangModal(false); setSearchInput(''); setOnFocusWrap(false)
                        }}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                        <SourceLanguage
                            sourceLanguage={props?.sourceLanguage}
                            showSrcLangModal={props?.showSrcLangModal}
                            setshowSrcLangModal={props?.setshowSrcLangModal}
                            sourceLanguageOptions={props?.sourceLanguageOptions}
                            handleSourceLangClick={props?.handleSourceLangClick}
                            filteredResults={filteredResults}
                            setFilteredResults={setFilteredResults}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            onFocusWrap={onFocusWrap}
                            setOnFocusWrap={setOnFocusWrap}
                            searchAreaRef={searchAreaRef}
                        />
                    </div>
                </Rodal>
            ) : props.showTarLangModal ? (
                <Rodal visible={props?.showTarLangModal} {...modaloption} showCloseButton={false} className="ai-tar-lang-select-modal">
                    <div className="lang-modal-wrapper">
                        {/* <h1>Select one or more target language(s)</h1> */}
                        <span className="modal-close-btn lang-close" onClick={(e) => {
                            if (summerNoteEditorRef?.current) {
                                summerNoteEditorRef?.current?.summernote('restoreRange')
                                // props.sidebarTabControlVisible()
                            }
                            props?.setshowTarLangModal(false); setSearchInput(''); setOnFocusWrap(false)
                        }
                        }>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                        <TargetLanguage
                            quickProjectSetup={props.quickProjectSetup}
                            targetLanguage={props?.targetLanguage}
                            targetLanguageOptions={props?.targetLanguageOptions}
                            handleTargetLangClick={props?.handleTargetLangClick}
                            showTarLangModal={props?.showTarLangModal}
                            setshowTarLangModal={props?.setshowTarLangModal}
                            filteredResults={filteredResults}
                            setFilteredResults={setFilteredResults}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            onFocusWrap={onFocusWrap}
                            setOnFocusWrap={setOnFocusWrap}
                            searchAreaRef={searchAreaRef}
                        />
                    </div>
                </Rodal>
            ) : props.downloadConfirmationModalVisible ? (
                <Rodal visible={props?.downloadConfirmationModalVisible} {...modaloption} showCloseButton={false}>
                    <div className="confirmation-wrapper-mod">
                        <WarningIcon className="warning-icon" />
                        {!translatedAudioAlertModal ? (
                            <h2>
                                {t("translate_download_content_alert_note_1")}<br />
                                {t("translate_download_content_alert_note_2")}
                            </h2>
                        ) : (
                            <h2>
                                {t("translate_download_content_alert_note_3")} <br />
                                {t("translate_download_content_alert_note_4")}<br />
                                {t("translate_download_content_alert_note_2")}
                            </h2>
                        )}

                        <div className="button-row d-flex justify-content-between">
                            <button className="confirmation-modal-AiMarkCancel" onClick={(e) => { props?.setDownloadConfirmationModalVisible(false); }}><span className="cancel-txt">{t("no")}</span></button>
                            <button className="confirmation-modal-AiMarkSubmit" onClick={(e) => { props?.handleYes(); }}><span className="submit-txt">{t("yes")}</span></button>
                        </div>
                    </div>
                </Rodal>
            ) : props.showUnHireModel ? (
                <Rodal
                    visible={props.showUnHireModel}
                    {...modaloption}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper doc-writter-delete-icon-list">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowUnhireModel(false) }}><CloseIcon /></span></div>
                            <div>{t("are_you_sure")}</div>
                            <div>{`${t("unhire_alert_note")} ${particularEditorId.name.charAt(0).toUpperCase() + particularEditorId.name.slice(1).split(' ')[0]}?`} {` ${t("any_task_assigned_to")} ${particularEditorId.name.charAt(0).toUpperCase() + particularEditorId.name.slice(1).split(' ')[0]} ${t("automatically_unassigned_note")}`}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <Button onClick={() => { setShowUnhireModel(false) }}>{t("no")}</Button>
                                <Button onClick={() => unHireEditor(particularEditorId.obj_id)} variant="contained">{t("yes")}</Button>
                            </div>
                        </div>
                    </div>
                </Rodal>
                // <Rodal visible={props.showUnHireModel} {...modaloption} showCloseButton={false}>
                //     <div className="confirmation-wrapper">
                //     <h2>{`Do you want to un-hire ${particularEditorId.name.charAt(0).toUpperCase() + particularEditorId.name.slice(1).split(' ')[0]}?`}</h2>
                //         <div className="button-row">
                //             <button className="confirmation-modal-AiMarkCancel" onClick={() => setShowUnhireModel(false)}>
                //                 <span className="cancel-txt">No</span>
                //             </button>
                //             <button className="confirmation-modal-AiMarkSubmit" onClick={(e) => unHireEditor(particularEditorId.obj_id)}>
                //                 <span className="submit-txt">Yes</span>
                //             </button>
                //         </div> 
                //     </div>
                // </Rodal>
            ) : props.showPoModal && poPDFUrl ? (
                <Rodal visible={props.showPoModal} {...modaloption} showCloseButton={false} className="po-modal-section">
                    <span className="modal-close-btn lang-close" onClick={(e) => { props?.setShowPoModal(false); }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="po-modal-wrapper">
                        <h2>{t("purchase_order_information")}</h2>
                        <embed src={`${poPDFUrl}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" height="100%" width="100%" />
                        <div className="button-row">
                            <button className="confirmation-modal-AiMarkCancel" onClick={() => taskAssignUpdate('change_request')}>
                                <span className="cancel-txt">{t("request_to_change")}</span>
                            </button>
                            <button className="confirmation-modal-AiMarkSubmit" onClick={() => taskAssignUpdate('task_accepted')}>
                                <span className="submit-txt">{t("accept")}</span>
                            </button>
                        </div>
                    </div>
                </Rodal>
            ) : showUnassignModal ? (
                <Rodal
                    visible={showUnassignModal}
                    {...modaloption}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper doc-writter-delete-icon-list">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowUnassignModal(false) }}><CloseIcon /></span></div>
                            <div>{t("are_you_sure")}</div>
                            <div>
                                {`${t("unassign_alert_note")} ${unassignParameters?.assignedToUser} ${t("from_this_task")}`}
                            </div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <Button onClick={() => { setShowUnassignModal(false) }}>{t("no")}</Button>
                                <Button onClick={() => unassignEditor(unassignParameters?.id, unassignParameters?.assignTabActive)} variant="contained">{t("yes")}</Button>
                            </div>
                        </div>
                    </div>
                </Rodal>
            ) : showSubmitDocumentAlertModal ? (
                <Rodal visible={showSubmitDocumentAlertModal} {...modaloption} showCloseButton={false}>
                    <div className="confirmation-wrapper-mod">
                        <WarningIcon className="warning-icon" />
                        <h2>
                            {t("translate_submit_doc_content_alert_note")} <br />
                            {t("submit_alert_note")}
                        </h2>
                        <div className="button-row d-flex justify-content-between">
                            <button className="confirmation-modal-AiMarkCancel" onClick={(e) => { setShowSubmitDocumentAlertModal(false); }}><span className="cancel-txt">{t("no")}</span></button>
                            <button className="confirmation-modal-AiMarkSubmit" onClick={(e) => { handleDocuemtSubmitConfirmation(); }}><span className="submit-txt">{t("yes")}</span></button>
                        </div>
                    </div>
                </Rodal>
            ) : props.showAudioOptionsModal ? (
                <Rodal visible={props.showAudioOptionsModal} {...modaloption} showCloseButton={false} className="add-edit-new-term-modal-wrapper glossary-list-modal">
                    <div className="header-area-wrapper">
                        <div className="header-area">
                            <h1>{t("audio_options")}</h1>
                            <span onClick={(e) => props.setShowAudioOptionsModal(false)}><CloseIcon className="close-icon" /></span>
                        </div>
                    </div>
                    <div className="term-edit-form">
                        <div className="term-edit-form-control">
                            <label>{t("language_local")}</label>
                            <Select
                                options={localeOptions}
                                // defaultValue={{ value: 1, label: "Private" }}
                                value={audioLocale}
                                onChange={handleLocaleChange}
                                styles={customStepSelectStyles}
                                classNamePrefix="steps-select"
                                hideSelectedOptions={false}
                                placeholder={`${t("click_to_select")}...`}
                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                isSearchable={false}
                            />
                        </div>
                        <div className="term-edit-form-control">
                            <label>{t("gender")}</label>
                            <Select
                                options={genderOptions}
                                // defaultValue={{ value: 1, label: "Private" }}
                                value={audioGender}
                                onChange={handleGenderChange}
                                styles={customStepSelectStyles}
                                classNamePrefix="steps-select"
                                hideSelectedOptions={false}
                                placeholder={`${t("click_to_select")}...`}
                                components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div className="footer-area-wrapper justify-content-end">
                        <div className="term-edit-btn-row">
                            <button className="simple-rodal-ClearAllButton" onClick={() => props.setShowAudioOptionsModal(false)}>
                                <span className="gl-workspace-btn-txt-1">{t("cancel")}</span>
                            </button>
                            <button className="globalform-StepProcessButton" onClick={(e) => props.handleDownloadCheck(e, "AUDIO")}>
                                <span className="gl-workspace-btn-txt-2">
                                    <FileDownloadOutlinedIcon style={{ fontSize: '20px', color: '#fff', marginLeft: '-5px', marginRight: '2px' }} /> {t("download")}
                                </span>
                            </button>
                        </div>
                    </div>
                </Rodal>
            ) : showZeroSegmentAlertModal ? (
                <Rodal visible={showZeroSegmentAlertModal} {...modaloption} showCloseButton={false}>
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowZeroSegmentAlertModal(false); setIsAudioConverting(false); setIsFileUnderProcess(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="confirmation-wrapper-mod">
                        <WarningIcon className="warning-icon" />
                        {
                            isFileUnderProcess ?
                                <h2>{t("file_under_process")} <br />{t("please_wait_few_minutes_para")}</h2>
                                : isAudioConverting ?
                                    <h2>{t("processing_text_1")} <br />{t("please_wait_few_minutes_para")}</h2>
                                    : <h2>{t("no_segments_are_confirmed")}</h2>

                        }

                    </div>
                </Rodal>
            ) : showLongFileAlertModal ? (
                <Rodal visible={showLongFileAlertModal} {...modaloption} showCloseButton={false}>
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowLongFileAlertModal(false); }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="confirmation-wrapper-mod">
                        <WarningIcon className="warning-icon" />
                        <h2>{t("processing_text_1")} <br />{t("please_wait_few_minutes_para")}</h2>
                    </div>
                </Rodal>
            ) : showDownloadingModal ? (
                <Rodal visible={showDownloadingModal} {...modaloption} showCloseButton={false}>
                    <div className="confirmation-wrapper-mod">
                        {/* <WarningIcon className="warning-icon" /> */}
                        <h2>
                            {t("download_progress")}...
                            <img src={TempLoader} alt="download-loader" />
                        </h2>
                        {/* <div className="button-row d-flex justify-content-between">
                            <AiMarkCancel onClick={(e) => {props?.setDownloadConfirmationModalVisible(false);}}><span className="cancel-txt">No</span></AiMarkCancel>
                            <AiMarkSubmit onClick={(e) => {props?.handleYes();}}><span className="submit-txt">Yes</span></AiMarkSubmit>
                        </div>  */}
                    </div>
                </Rodal>
            ) : props.showMtDisabledModal ? (
                <Rodal visible={props.showMtDisabledModal} {...modaloption} showCloseButton={false}>
                    <span className="modal-close-btn lang-close" onClick={(e) => { props.setShowMtDisabledModal(false); }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="confirmation-wrapper-mod">
                        <WarningIcon className="warning-icon" />
                        <h2>{t("machine_translation_disabled")}</h2>
                    </div>
                </Rodal>
            ) : props.showInsufficientConfirmAllModal ? (
                <Rodal visible={props.showInsufficientConfirmAllModal} {...modaloption} showCloseButton={false}>
                    <span className="modal-close-btn lang-close" onClick={(e) => { props.setShowInsufficientConfirmAllModal(false); }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="confirmation-wrapper-mod">
                        <WarningIcon className="warning-icon" />
                        <h2>{t("confirm_segment_insufficient_credits")}</h2>
                    </div>
                </Rodal>
            ) : showVendorComplaintReasonModal ? (
                <Rodal
                    visible={showVendorComplaintReasonModal}
                    showCloseButton={false}
                    onClose={() => setShowVendorComplaintReasonModal(false)}
                    className="reason-modal-wrapper"
                >
                    <div className="reason-modal-inner-wrapper">
                        <span className="modal-close-btn lang-close" onClick={() => { setShowVendorComplaintReasonModal(false) }}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                        <div className="reason-modal-body-wrapper">
                            <div className="title">{t("reason_for_return")}</div>
                            <textarea
                                row="50"
                                placeholder={t('enter_a_reason_for_ur_return_req')}
                                value={vendorReturnRequestReasonText}
                                maxLength={200}
                                className="reason-modal-textarea"
                                onChange={(e) => setVendorReturnRequestReasonText(e.target.value)}
                            ></textarea>
                            <small className="note">{vendorReturnRequestReasonText?.trim()?.length}/200</small>
                        </div>
                        <div className="reason-modal-button-wrap">
                            <ButtonBase className="cancel-grey-btn" onClick={() => { setShowVendorComplaintReasonModal(false) }}>{t("discard")}</ButtonBase>
                            <ButtonBase
                                className="success-blue-btn"
                                onClick={() => handleDocumentSubmitBtn(4)}
                                // variant="contained"
                                style={vendorReturnRequestReasonText?.trim() === '' ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                            >
                                {t("send")}
                            </ButtonBase>
                        </div>
                    </div>
                </Rodal>
            ) : showDontHaveEditingAccessAlertModal ? (
                <Rodal visible={showDontHaveEditingAccessAlertModal} height={350} onClose={() => console.log()} showCloseButton={false}>
                    <span className="modal-close-btn lang-close" onClick={(e) => { setShowDontHaveEditingAccessAlertModal(false); }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                    <div className="confirmation-wrapper-mod">
                        <WarningIcon className="warning-icon" />
                        {/* <h2>Editor is working now !!!</h2> */}
                        <h2>{t("access_restricted")} !!!</h2>
                        {
                            documentRestrictionReasonRef.current === 'completed' ?
                                <p className="create-tbx-btn text-center">{t("access_restrict_note_1")}</p>
                                : documentRestrictionReasonRef.current === 'returned' ?
                                    <p className="create-tbx-btn text-center">{t("access_restrict_note_2")}</p>
                                    :
                                    <p className="create-tbx-btn text-center">{t("access_restrict_note_3")}</p>

                        }
                    </div>
                </Rodal>
            ) : showSubmitConfirmModal ? (
                <Rodal
                    visible={showSubmitConfirmModal}
                    width={520}
                    height={230}
                    onClose={() => console.log()}
                    showCloseButton={false}
                    className="ai-mark-confirm-box"
                >
                    <div className="confirmation-warning-wrapper">
                        <div className="confirm-top">
                            <div><span onClick={() => { setShowSubmitConfirmModal(false) }}><CloseIcon /></span></div>
                            <div>{t("are_you_sure")}</div>
                            <div>{t("submit_document_note")}</div>
                        </div>
                        <div className="confirm-bottom">
                            <div>
                                <Button onClick={() => { setShowSubmitConfirmModal(false) }}>{t("no")}</Button>
                                <Button onClick={() => !isDocumentSubmitting && handleDocumentSubmitBtn(3)} variant="contained">
                                    {/* {!isDocumentSubmitting ? "Yes" : "Submitting"} */}
                                    {isDocumentSubmitting ?
                                        <ButtonLoader />
                                        :
                                        ""
                                    }
                                    {t("yes")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Rodal>
            ) : null}
        </React.Fragment>
    );
};

export default SimpleRodals;
