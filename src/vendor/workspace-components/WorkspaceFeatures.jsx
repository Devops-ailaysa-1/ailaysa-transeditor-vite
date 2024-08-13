import React, { useEffect, useState } from 'react'
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Config from "../Config";
import { TextareaAutosize } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "../../vendor/styles-svg/DeleteIcon";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { t } from "i18next";
import Tooltip from '@mui/material/Tooltip';
import { MessageTypingAnimation } from "../../loader/MessageTypingAnimation";
import sanitizeHtml from 'sanitize-html-react';
import ContentCopyIcon from "../styles-svg/Content-copy-icon";
import Skeleton from '@mui/material/Skeleton';
import parse from "html-react-parser";
import CopyIcon from "../../vendor/styles-svg/CopyIcon";

const WorkspaceFeatures = (props) => {
    let {
        workspaceFeaturRef,
        advancedOptionVisibility,
        scrl,
        scrollLeft,
        scrollRight,
        segmentDiffButton,
        handleToggleVisibility,
        getSegmentDiff,
        commentsTabButton,
        tmTabButton,
        segOptionsBtnRef,
        dictionaryTabButton,
        qaTabButton,
        concordanceTabButton,
        paginationContent,
        confirmedSegmentsCount,
        totalSegmentsCount,
        segmentStatusPercentage,
        handlePushPinActive,
        pushPinActive,
        PushPin,
        showTmSection,
        translationMatches,
        tbxData,
        glossaryData,
        ArrowRightAltColor,
        NorCopyContent,
        sourceLanguage,
        copyText,
        setIsCopied,
        isCopied,
        concordanceData,
        commentScrollingDivRef,
        commentsData,
        commentsDataCopy,
        handleCommentChange,
        commentEdit,
        closeCommentsEdit,
        deleteComment,
        openCommentsEdit,
        handleCommentEnter,
        commentTextArea,
        commentSubmit,
        SendIcon,
        qaContent,
        WikipediaIcon,
        WikitionaryIcon,
        wikipediaData,
        wiktionaryData,
        OpenInNew,
        posData,
        segmentDifference,
        paraphraseTrigger,
        selectedParaphrase,
        paraPhraseResList,
        replaceWithNewPara,
        rightAlignLangs,
        targetLanguage,
        commentsLoader,
        segmentHistoryLoader,
        showSegmentComments,
        segmentOptionsList,
        getTranslationMatch
    } = props

    return (
        <>
            <section ref={workspaceFeaturRef} className={advancedOptionVisibility ? "workspace-features wokspace-features-collapse" : "workspace-features"}>
                <div className="workspace-tools-bar">
                    <div className="workspace-tool-bar-wrap">
                        <div className="workspace-tool-bar-scroll-check">
                            <div className="left-arrow" onClick={() => scrollLeft()}>
                                <NavigateBeforeSharpIcon className="navigate-icon" />
                            </div>
                            <div ref={scrl} className="workspace-tool-bar-links-wrap">
                                <ul
                                    className="nav nav-pills"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <a
                                            ref={segOptionsBtnRef}
                                            onClick={(e) => e.isTrusted && handleToggleVisibility(true)}
                                            className="nav-link"
                                            id="pills-seg-options-tab"
                                            data-toggle="pill"
                                            href="#pills-seg-options"
                                            role="tab"
                                            aria-controls="pills-seg-options"
                                            aria-selected="true"
                                        >
                                            {t("options_and_gloss")}
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            ref={tmTabButton}
                                            onClick={(e) => e.isTrusted && handleToggleVisibility(true)}
                                            className="nav-link"
                                            id="pills-tm-tb-tab"
                                            data-toggle="pill"
                                            href="#pills-tm-tb"
                                            role="tab"
                                            aria-controls="pills-tm-tb"
                                            aria-selected="true"
                                        >
                                            {t("translation_memories")}
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            ref={segmentDiffButton}
                                            onClick={(e) => {
                                                e.isTrusted && handleToggleVisibility(true)
                                                getSegmentDiff()
                                            }}
                                            className="nav-link"
                                            id="pills-segmentDiff-tab"
                                            data-toggle="pill"
                                            href="#pills-segmentDiff"
                                            role="tab"
                                            aria-controls="pills-segmentDiff"
                                            aria-selected="false"
                                        >
                                            {t("history")}
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            ref={commentsTabButton}
                                            onClick={(e) => {
                                                e.isTrusted && handleToggleVisibility(true)
                                                showSegmentComments(null, true)
                                            }}
                                            className="nav-link"
                                            id="pills-comments-tab"
                                            data-toggle="pill"
                                            href="#pills-comments"
                                            role="tab"
                                            aria-controls="pills-comments"
                                            aria-selected="false"
                                        >
                                            {t("comments")}
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            ref={dictionaryTabButton}
                                            onClick={(e) => e.isTrusted && handleToggleVisibility(true)}
                                            className="nav-link"
                                            id="pills-dictionary-tab"
                                            data-toggle="pill"
                                            href="#pills-dictionary"
                                            role="tab"
                                            aria-controls="pills-dictionary"
                                            aria-selected="false"
                                        >
                                            {t("dictionary")}
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            ref={qaTabButton}
                                            onClick={(e) => e.isTrusted && handleToggleVisibility(true)}
                                            className="nav-link"
                                            id="pills-qa-tab"
                                            data-toggle="pill"
                                            href="#pills-qa"
                                            role="tab"
                                            aria-controls="pills-qa"
                                            aria-selected="false"
                                        >
                                            QA
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            ref={concordanceTabButton}
                                            onClick={(e) => e.isTrusted && handleToggleVisibility(true)}
                                            className="nav-link"
                                            id="pills-concordance-tab"
                                            data-toggle="pill"
                                            href="#pills-concordance"
                                            role="tab"
                                            aria-controls="pills-concordance"
                                            aria-selected="false"
                                        >
                                            {t("concordance_search")}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="right-arrow" onClick={() => scrollRight()}>
                                <NavigateNextSharpIcon className="navigate-icon" />
                            </div>
                        </div>
                        <div className="workspace-tools-bar-right-sec">
                            <div className="pagination-align">
                                <div className="pagination-txt">{paginationContent}</div>
                            </div>
                            <div className="workspace-progress-bar-part border-right-add">
                                <div className="progress-txt">
                                    <span>{confirmedSegmentsCount}</span>/<span>{totalSegmentsCount}</span> {t("segments")}
                                </div>
                                <div className="progress-bar-file-completion">
                                    <div className="progress-file-completion">
                                        <div className="bar-file-completion" style={{ width: segmentStatusPercentage + "%" }}></div>
                                    </div>
                                </div>
                                <div className="progress-txt">
                                    (<span>{segmentStatusPercentage}</span>%)
                                </div>
                            </div>
                            {/* <div className="workspace-page-per-num">
                                    <span className="page-per-num border-right-add-new">{"Page " + currentPage + "/" + Math.ceil(totalPages)}</span>
                                </div> */}
                            {
                                advancedOptionVisibility &&
                                <div className="workspace-page-pinned">
                                    <span onClick={() => handlePushPinActive(!pushPinActive)} className={"workspace-pin " + (pushPinActive ? "active" : "")}>
                                        <img src={PushPin} alt="push_pin" />
                                    </span>
                                </div>
                            }
                            <div className="workspace-page-minimize">
                                <span className="tool-tm-section-minimize" onClick={(e) => handleToggleVisibility(pushPinActive ? advancedOptionVisibility : !advancedOptionVisibility)}>
                                    {advancedOptionVisibility ? (
                                        <ExpandMoreIcon />
                                    ) : (
                                        <ExpandLessIcon />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={advancedOptionVisibility ? "workspace-working-area tab-content" : "workspace-working-area tab-content d-none"} id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-tm-tb" role="tabpanel" aria-labelledby="pills-tm-tb-tab">
                        {showTmSection && (
                            <section className="top-section-show">
                                <div className="modal-top-body">
                                    <div className="tm-tb-main-row">
                                        <div className={translationMatches?.length === 0 ? "tm-container-no-found tm-side-border w-full" : (tbxData?.length === 0 && glossaryData?.length === 0) ? "tm-container-expand tm-container tm-side-border" : "tm-container tm-side-border w-full"}>
                                            {
                                                translationMatches?.length === 0 ?
                                                    <div className="tm-container-no-matches-found">
                                                        <small>{t("no_matches_found")}</small>
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="top-section-title-align">
                                                            <div className="top-body-title-1">
                                                                <p>
                                                                    <span>{t("tmx_src")}</span>
                                                                </p>
                                                            </div>
                                                            <p className="top-body-title-2">
                                                                <span>{t("tmx_tar")}</span>
                                                            </p>
                                                            <div className="top-body-title-3"></div>
                                                        </div>
                                                        <div className="translation_memories-2">
                                                            <div className="translation_memories-1">
                                                                <ul>
                                                                    {translationMatches.map((value, key) => {
                                                                        return (
                                                                            <li key={value.source}>
                                                                                <div className="tm-tb-sub-cont">
                                                                                    <div className="translation-list-value-src">
                                                                                        <div className="text-left d-flex align-items-start justify-content-between">
                                                                                            <p className="tb-file-src-txt">{value.source}</p>
                                                                                            <img className="tmx-arrow-icon" src={ArrowRightAltColor} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="translation-list-value-tar">
                                                                                        <div className="target-lang-align">
                                                                                            <div className="text-left">
                                                                                                <p className="tb-file-tar-txt">{unescape(value.target)}</p>
                                                                                            </div>
                                                                                            <div className="tmx-links-algin">
                                                                                                <div className="translation-mem-percent-box">
                                                                                                    <span>{value.percentage}</span>
                                                                                                    <span>% {t('match')}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="translation-list-value-copy-btn">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="workspace-feature-btn-new"
                                                                                            data-key={key}
                                                                                            data-match-percentage={value.percentage}
                                                                                            onClick={(e) => getTranslationMatch(e)}
                                                                                            data-toggle="tooltip"
                                                                                            title="Use"
                                                                                        >
                                                                                            <img
                                                                                                data-key={key}
                                                                                                src={NorCopyContent}
                                                                                                className="content-copy"
                                                                                                alt="copy text"
                                                                                            />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                        {/* <div className={(tbxData?.length === 0 && glossaryData?.length === 0) ? "tb-container-no-found" : translationMatches?.length === 0 ? "tm-container-expand tb-container tm-side-border" : "tb-container"}>
                                            {
                                                (tbxData?.length === 0 && glossaryData?.length === 0) ?
                                                    <div className="tm-container-no-matches-found">
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="glossary-tbx-data-header">
                                                            <div className="glossary-tbx-header-row">
                                                                <div className="glossary-tbx-header-col">
                                                                    <div className="glossary-tbx-name-source-1">
                                                                        {t("glossary_name")}
                                                                    </div>
                                                                    <div className="glossary-tbx-name-source-2">
                                                                        {t("src_lang_terms")}
                                                                    </div>
                                                                </div>
                                                                <div className="glossary-tbx-header-col">
                                                                    <div className="glossary-tbx-target">
                                                                        {t("tar_lang_terms")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="translation_memories-1">
                                                            {glossaryData.map((each, key) => {
                                                                return (
                                                                    <ul key={key}>
                                                                        {
                                                                            each.data.map((value, ind) => {
                                                                                return (
                                                                                    <>
                                                                                        <li key={ind}>
                                                                                            <div className="glossary-data-wrapper">
                                                                                                <div className="glossary-data-src-wrapper">
                                                                                                    <p className="top-body-title pl-0">{each?.glossary}</p>
                                                                                                    <div className="tm-tb-sub-cont-2">
                                                                                                        <div className="translation-list-src-part">
                                                                                                            <p className="settings-file-names-new">{value.source}</p>
                                                                                                        </div>
                                                                                                        <div className="translation-list-src-part">
                                                                                                            <img src={ArrowRightAltColor} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="translation-list-tar-part">
                                                                                                    <div className="target-lang-align-1">
                                                                                                        <p className="settings-file-names-new target-tb-lang-part">{value.target}</p>
                                                                                                    </div>
                                                                                                    <div className="translation-list-value-copy-btn">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="workspace-feature-btn-new"
                                                                                                            onClick={(e) => copyText(value.target)}
                                                                                                        >
                                                                                                            <img
                                                                                                                src={NorCopyContent}
                                                                                                                className="content-copy"
                                                                                                                alt="copy text"
                                                                                                            />
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                )
                                                            })}
                                                            <ul>
                                                                {tbxData.map((value, key) => (
                                                                    <li key={key}>
                                                                        <div className="glossary-data-wrapper">
                                                                            <div className="glossary-data-src-wrapper">
                                                                                <p className="top-body-title pl-0">{t("from")} TBX</p>
                                                                                <div className="tm-tb-sub-cont-2">
                                                                                    <div className="translation-list-src-part">
                                                                                        <p className="settings-file-names-new">{value.source}</p>
                                                                                    </div>
                                                                                    <div className="translation-list-src-part">
                                                                                        <img src={ArrowRightAltColor} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="translation-list-tar-part">
                                                                                <div className="target-lang-align-1">
                                                                                    <p className="settings-file-names-new target-tb-lang-part">{value.target}</p>
                                                                                </div>
                                                                                <div className="translation-list-value-copy-btn">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="workspace-feature-btn-new"
                                                                                        onClick={(e) => copyText(value.target)}
                                                                                    >
                                                                                        <img
                                                                                            src={NorCopyContent}
                                                                                            className="content-copy"
                                                                                            alt="copy text"
                                                                                        />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </>
                                            }
                                        </div> */}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="tab-pane fade seg-options-tab" id="pills-seg-options" role="tabpanel" aria-labelledby="pills-seg-options-tab">
                        <section className="quest-section">
                            <div className="quest-section flex">
                                <div className="quest-section-align w-1/2">
                                    <ul className="qa-list">
                                        {segmentOptionsList?.length === 0 ? 
                                            segmentOptionsList?.map(item => {
                                                return (
                                                    <li key={item.id} className='flex justify-between'>
                                                        <span className="qa-text">
                                                            {item.option}
                                                        </span>
                                                        <Tooltip title={isCopied ? t("txt_copied") : t("copy")} placement="top" arrow>
                                                            <div className="tools-box" onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 300)} onClick={() => copyText(item.option)}>
                                                                <CopyIcon style="copy-icon" />
                                                            </div>
                                                        </Tooltip>
                                                    </li>
                                                )
                                            })
                                        : <span><small>{t("no_option")}</small></span>
                                        }
                                    </ul>
                                </div>
                                <div className={(tbxData?.length === 0 && glossaryData?.length === 0) ? "tb-container-no-found w-1/2" : translationMatches?.length === 0 ? "tm-container-expand tb-container tm-side-border w-1/2" : "tb-container w-1/2"}>
                                    {
                                        (tbxData?.length === 0 && glossaryData?.length === 0) ?
                                            <div className="tm-container-no-matches-found">
                                            </div>
                                            :
                                            <>
                                                <div className="glossary-tbx-data-header">
                                                    <div className="glossary-tbx-header-row">
                                                        <div className="glossary-tbx-header-col">
                                                            <div className="glossary-tbx-name-source-1">
                                                                {t("glossary_name")}
                                                            </div>
                                                            <div className="glossary-tbx-name-source-2">
                                                                {t("src_lang_terms")}
                                                            </div>
                                                        </div>
                                                        <div className="glossary-tbx-header-col">
                                                            <div className="glossary-tbx-target">
                                                                {t("tar_lang_terms")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="translation_memories-1">
                                                    {glossaryData.map((each, key) => {
                                                        return (
                                                            <ul key={key}>
                                                                {
                                                                    each.data.map((value, ind) => {
                                                                        return (
                                                                            <>
                                                                                <li key={ind}>
                                                                                    <div className="glossary-data-wrapper">
                                                                                        <div className="glossary-data-src-wrapper">
                                                                                            <p className="top-body-title pl-0">{each?.glossary}</p>
                                                                                            <div className="tm-tb-sub-cont-2">
                                                                                                <div className="translation-list-src-part">
                                                                                                    <p className="settings-file-names-new">{value.source}</p>
                                                                                                </div>
                                                                                                <div className="translation-list-src-part">
                                                                                                    <img src={ArrowRightAltColor} />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="translation-list-tar-part">
                                                                                            <div className="target-lang-align-1">
                                                                                                <p className="settings-file-names-new target-tb-lang-part">{value.target}</p>
                                                                                            </div>
                                                                                            <div className="translation-list-value-copy-btn">
                                                                                                <Tooltip title={isCopied ? t("txt_copied") : t("copy")} placement="top" arrow>
                                                                                                    <div className="tools-box" onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 300)} onClick={() => copyText(value.target)}>
                                                                                                        <CopyIcon style="copy-icon" />
                                                                                                    </div>
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        )
                                                    })}
                                                    <ul>
                                                        {tbxData.map((value, key) => (
                                                            <li key={key}>
                                                                <div className="glossary-data-wrapper">
                                                                    <div className="glossary-data-src-wrapper">
                                                                        <p className="top-body-title pl-0">{t("from")} TBX</p>
                                                                        <div className="tm-tb-sub-cont-2">
                                                                            <div className="translation-list-src-part">
                                                                                <p className="settings-file-names-new">{value.source}</p>
                                                                            </div>
                                                                            <div className="translation-list-src-part">
                                                                                <img src={ArrowRightAltColor} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="translation-list-tar-part">
                                                                        <div className="target-lang-align-1">
                                                                            <p className="settings-file-names-new target-tb-lang-part">{value.target}</p>
                                                                        </div>
                                                                        <div className="translation-list-value-copy-btn">
                                                                            <button
                                                                                type="button"
                                                                                className="workspace-feature-btn-new"
                                                                                onClick={(e) => copyText(value.target)}
                                                                            >
                                                                                <img
                                                                                    src={NorCopyContent}
                                                                                    className="content-copy"
                                                                                    alt="copy text"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="tab-pane fade" id="pills-concordance" role="tabpanel" aria-labelledby="pills-concordance-tab">
                        {
                            <section className="top-section-show">
                                <div className="modal-top-body">
                                    <div className="tm-tb-main-row">
                                        <div className="tm-container tm-side-border">
                                            <div className="top-section-title-align" style={{display: 'block'}}>
                                                <div className="top-body-title-1">
                                                    <p>
                                                        <span>{t("source_language")}:</span> {sourceLanguage}
                                                    </p>
                                                </div>
                                                <div className="translation_memories-1" style={{marginTop: '8px'}}>
                                                    <ul>
                                                        {concordanceData.map((value, key) => {
                                                            return (
                                                                <li key={key}>
                                                                    <div className="tm-tb-sub-cont">
                                                                        <div className="translation-list-value-src">
                                                                            <div className="text-left">
                                                                                <p className="tb-file-src-txt">{parse(value.source)}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="translation-list-value-tar">
                                                                            <div className="target-lang-align">
                                                                                <div className="text-left">
                                                                                    <p className="tb-file-tar-txt">{parse(value.target)}</p>
                                                                                </div>
                                                                                <div className="tmx-links-algin">
                                                                                    <div className="translation-mem-percent-box">
                                                                                        <span>{value.percentage}</span>
                                                                                        <span>% {t("match")}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="translation-list-value-copy-btn">
                                                                            <Tooltip title={isCopied ? t("txt_copied") : t("copy")} placement="top">
                                                                                <button
                                                                                    type="button"
                                                                                    className="workspace-feature-btn-new"
                                                                                    onClick={(e) => copyText(value.target)}
                                                                                    onMouseLeave={() => setTimeout(() => { setIsCopied(false) }, 500)}
                                                                                >
                                                                                    <img
                                                                                        src={NorCopyContent}
                                                                                        className="content-copy" alt="copy text"
                                                                                    />
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                    </div>
                    <div className="tab-pane fade" id="pills-comments" role="tabpanel" aria-labelledby="pills-comments-tab">
                        {
                            <section className="comments-part">
                                <div className="comments-container">
                                    <div className="add-comments-section">
                                        <div className="text-comments-area" ref={commentScrollingDivRef}>
                                            <ul>
                                            {(commentsLoader && commentsData?.length === 0) ? (
                                                    Array(2).fill(null).map((value, key) => (
                                                        <>
                                                            <li key={key}>
                                                                <div className="comment-area-box">
                                                                    <div className="profile-row">
                                                                        <Skeleton animation="wave" variant="circular" width={30} height={30} />
                                                                        <span className="text">
                                                                            <Skeleton animation="wave" variant="text" width={100} />
                                                                        </span>
                                                                    </div>
                                                                    <p className="comment-text"><Skeleton animation="wave" variant="text" width={200} /></p>
                                                                </div>
                                                                <span className="time">
                                                                    <Skeleton animation="wave" variant="text" width={50} />
                                                                </span>
                                                                <div className="action-wrapper">
                                                                    <span className="comment-close-btn">
                                                                        <Skeleton animation="wave" variant="circular" width={20} height={20} />
                                                                    </span>
                                                                    <span className="comment-edit-btn">
                                                                        <Skeleton animation="wave" variant="circular" width={20} height={20} />
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </>
                                                    ))
                                                ) : commentsData?.length !== 0 ? (
                                                    commentsData?.map((value) => {
                                                        return (
                                                            <li key={value.id}>
                                                                <div className="comment-area-box">
                                                                    <div className="profile-row">
                                                                        <span className="no-avatar-icon">{value?.commented_by_user?.charAt(0).toUpperCase()}</span>
                                                                        <span className="text">{value?.commented_by_user}</span>
                                                                    </div>
                                                                    {value.isEdit ? (
                                                                        <TextareaAutosize
                                                                            className="comment-text-area"
                                                                            value={commentsDataCopy?.find(each => each.id === value.id)?.comment}
                                                                            onChange={(e) => handleCommentChange(e, value.id)}
                                                                        />
                                                                    ) : (
                                                                        <p className="comment-text">{value.comment}</p>
                                                                    )}
                                                                </div>
                                                                <span className="time">{Config.getProjectCreatedDate(value.created_at)}</span>
                                                                {value.isEdit ? (
                                                                    <div className="action-wrapper">
                                                                        <span
                                                                            className="comment-close-btn"
                                                                            data-comment-id={value.id}
                                                                            onClick={() => commentEdit(value.id)}
                                                                        >
                                                                            <CheckOutlinedIcon className="edit-icon" />
                                                                        </span>
                                                                        <span
                                                                            className="comment-edit-btn"
                                                                            data-comment-id={value.id}
                                                                            onClick={() => closeCommentsEdit(value.id)}
                                                                        >
                                                                            <CloseIcon className="edit-icon" />
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="action-wrapper">
                                                                        <span className="comment-close-btn" data-comment-id={value.id} onClick={(e) => deleteComment(e)}>
                                                                            <DeleteIcon />
                                                                        </span>
                                                                        <span className="comment-edit-btn" data-comment-id={value.id} onClick={() => openCommentsEdit(value.id)}>
                                                                            <EditOutlinedIcon className="edit-icon" />
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    })
                                                ) : (
                                                    <small className="disable ml-4">{t("no_comments_yet")}</small>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="comments-input-part">
                                            <div className="comments-input-section">
                                                <div className="comments-textarea-wrap">
                                                    <TextareaAutosize ref={commentTextArea} name="comments" id="comments" placeholder={`${t("add_comment")}....`} onKeyDown={(e) => handleCommentEnter(e)} />
                                                </div>
                                                <button type="submit" onClick={(e) => commentSubmit(e)}>
                                                    <img src={SendIcon} />
                                                </button>
                                            </div>
                                        </div>
                                        <span className="multiline-chat-help-text">
                                            <b>Shift + Enter</b>&nbsp;{t("multiline_text_box_help_text")}
                                        </span>
                                    </div>
                                    {/* <div className="gap-section"></div> */}
                                </div>
                            </section>
                        }
                    </div>
                    <div className="tab-pane fade" id="pills-qa" role="tabpanel" aria-labelledby="pills-qa-tab">
                        {
                            <section className="quest-section">
                                <div className="quest-section">
                                    <div className="quest-section-align">
                                        <ul className="qa-list">{qaContent}</ul>
                                    </div>
                                </div>
                            </section>
                        }
                    </div>
                    <div className="tab-pane fade" id="pills-dictionary" role="tabpanel" aria-labelledby="pills-dictionary-tab">
                        {
                            <section className="dictionary-section">
                                <div className="dictionary-wikipedia dictionary-border-right">
                                    <p className="dictionary-wikipedia-title">
                                        <span>
                                            <img src={WikipediaIcon} />
                                        </span>
                                        {t("from_wikipedia")}
                                    </p>
                                    <div className="dictionary-search-word-cont">
                                        {wikipediaData?.source == "" ? (
                                            <p>{t("no_results_found")}</p>
                                        ) : (
                                            <ul>
                                                <li>
                                                    {wikipediaData.source != "" && (
                                                        <a href={wikipediaData.sourceUrl} target="_blank">
                                                            {wikipediaData.source}
                                                            <span>
                                                                <img src={OpenInNew} />
                                                            </span>
                                                        </a>
                                                    )}
                                                </li>
                                                {
                                                    (wikipediaData.source != "" && wikipediaData.target != "") &&
                                                    <li><img src={ArrowRightAltColor} /></li>
                                                }
                                                <li>
                                                    {wikipediaData.target != "" && (
                                                        <a href={wikipediaData.targetUrl} target="_blank">
                                                            {wikipediaData.target}
                                                            <span>
                                                                <img src={OpenInNew} />
                                                            </span>
                                                        </a>
                                                    )}
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="dictionary-wikitionary">
                                    <p className="dictionary-wikitionary-title">
                                        <span>
                                            <img src={WikitionaryIcon} />
                                        </span>
                                        {t("from_wiktionary")}
                                    </p>
                                    <div className="dictionary-search-word-cont">
                                        {wiktionaryData.source == "" ? (
                                            <p>{t("no_results_found")}</p>
                                        ) : (
                                            <ul>
                                                <li>
                                                    {wiktionaryData.source != "" ? (
                                                        <a href={wiktionaryData.sourceUrl} target="_blank">
                                                            {wiktionaryData.source}
                                                            <span>
                                                                <img src={OpenInNew} />
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        ""
                                                    )}
                                                </li>
                                                {
                                                    (wiktionaryData.source != "" && wiktionaryData.targets.length !== 0) &&
                                                    <li><img src={ArrowRightAltColor} /></li>
                                                }
                                                {wiktionaryData.targets.map((value, key) => (
                                                    <React.Fragment key={value}>
                                                        <li key={key}>
                                                            <a href={wiktionaryData.targetUrls[key]} target="_blank">
                                                                {value}
                                                                <span>
                                                                    <img src={OpenInNew} />
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </React.Fragment>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="wikitionary-search-word-cont">
                                        {posData.map((value, key) => (
                                            <React.Fragment key={value + "" + key}>
                                                <p>{value.pos}</p>
                                                <ul>
                                                    {value.definitions.map((definition, childKey) => (
                                                        <li key={key + "" + childKey}>{definition}</li>
                                                    ))}
                                                </ul>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        }
                    </div>
                    <div className="tab-pane fade" id="pills-segmentDiff" role="tabpanel" aria-labelledby="pills-segmentDiff-tab">
                        {
                            <section className="segment-section">
                                <table className="table table-bordered" aria-label="TABLE">
                                    <thead>
                                        <tr>
                                            <th role="columnheader" scope="col" tabIndex="0">{t("seg_history")}</th>
                                            <th role="columnheader" scope="col" tabIndex="0">{t("user")}</th>
                                            <th role="columnheader" scope="col" tabIndex="0">{t("action")}</th>
                                            <th role="columnheader" scope="col" tabIndex="0">{t("type")}</th>
                                            <th role="columnheader" scope="col" tabIndex="0">{t("status")}</th>
                                            <th style={{ whiteSpace: 'nowrap' }} role="columnheader" scope="col" tabIndex="0">{t("date_and_time")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(segmentHistoryLoader && segmentDifference?.length === 0) ? (
                                            Array(2).fill(null).map((value, key) => (
                                                <>
                                                    <tr key={key}>
                                                        <td>
                                                            <div className="segment-list">
                                                                <Skeleton animation="wave" variant="text" width="100%" />
                                                                <Skeleton animation="wave" variant="text" width="85%" />
                                                            </div>
                                                        </td>
                                                        <td><div className="segment-avatar-lists d-flex"><Skeleton animation="wave" variant="circular" width={28} height={28} /><p className="name ml-2"><Skeleton animation="wave" variant="text" width={80} /></p></div></td>
                                                        <td><div className="segment-text"><Skeleton animation="wave" variant="text" width={55} /></div></td>
                                                        <td><div className="segment-text"><Skeleton animation="wave" variant="text" width={55} /></div></td>
                                                        <td><div className="segment-text"><Skeleton animation="wave" variant="text" width={55} /></div></td>
                                                        <td><div className="segment-text"><Skeleton animation="wave" variant="text" width={55} /></div></td>
                                                    </tr>
                                                </>
                                            ))
                                        ) : segmentDifference?.length !== 0 ? (
                                            segmentDifference?.map((list, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td><div className="segment-list" dangerouslySetInnerHTML={{ __html: list?.segment_difference[0]?.sentense_diff_result }}></div></td>
                                                        <td><div className="segment-avatar-list"><span dangerouslySetInnerHTML={{ __html: list?.user_name?.slice(0, 1)?.toUpperCase() }}></span><p className="name" dangerouslySetInnerHTML={{ __html: list?.user_name }}></p></div></td>
                                                        <td><div className="segment-text" dangerouslySetInnerHTML={{ __html: list?.segment_difference[0]?.save_type }}></div></td>
                                                        <td><div className="segment-text" dangerouslySetInnerHTML={{ __html: list?.step_name }}></div></td>
                                                        <td><div className="segment-text" dangerouslySetInnerHTML={{ __html: list?.status_id == 104 ? t('machine_translation') : list?.status_id == 103 ? t('machine_translation') : list?.status_id == 105 ? t("manual") : list?.status_id == 106 ? t("manual") : list?.status_id == 101 ? t("translation_mem") : t("translation_mem") }}></div></td>
                                                        <td><div className="segment-text" dangerouslySetInnerHTML={{ __html: Config.getProjectCreatedDate(list?.created_at) }}></div></td>
                                                    </tr>
                                                )
    
                                            })
                                        ) : (
                                            <tr style={{display: 'block'}}>
                                                <td colspan="6"><div className="segment-list">{t("no_records_yet")}</div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </section>
                        }
                    </div>
                    <div className="tab-pane fade" id="pills-paraphrase" role="tabpanel" aria-labelledby="pills-paraphrase-tab">
                        <section className="paraphrase-section">
                            {paraphraseTrigger ? (paraPhraseResList?.length !== 0 ?
                                (
                                    <>
                                        <div className="paraphrase-header-wrap">
                                            <p></p>
                                            {/* <TrendingFlatIcon className="arrow-icon" /> */}
                                            <p>{selectedParaphrase}</p>
                                        </div>
                                        <div className="paraphrase-div">
                                            <div className="paraphrase-source-div">
                                                {/* {paraphraseText} */}
                                            </div>
                                            <div className="paraphrase-result-div">
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <div className="capsule-wrapper" onClick={(e) => replaceWithNewPara(e, paraPhraseResList)}>
                                                            <div className={"capsule " + (rightAlignLangs.current.indexOf(targetLanguage) != -1 ? 'align-right' : '')}>
                                                                {paraPhraseResList}
                                                            </div>
                                                            <Tooltip title={t("copy_to_segment")} placement="top" arrow>
                                                                <div className="content-copy" onClick={(e) => replaceWithNewPara(e, paraPhraseResList)}>
                                                                    <ContentCopyIcon />
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                    </li>
                                                    {/* {
                                                    paraPhraseResList?.map(each => {
                                                        return (
                                                        )
                                                    })
                                                }     */}
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="paraphrase-loader">
                                        <MessageTypingAnimation />
                                    </div>
                                )) : null}
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WorkspaceFeatures