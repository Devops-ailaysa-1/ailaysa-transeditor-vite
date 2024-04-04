import React, { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import ModifiedStoriesFilter from "./ModifiedStoriesFilter";
import { useSelector } from "react-redux";
import { ButtonBase } from '@mui/material'

const DashboardOverview = (props) => {
    
    let { 
        isDataFetching,
        showEditorReportModal,
        workReport,
        userReportFilterSelectedValue,
        setUserReportFilterSelectedValue,
        toDate,
        setToDate,
        fromDate,
        setFromDate,
        activeTab
     } = props

    const { t } = useTranslation();
    const userDetails = useSelector((state) => state.userDetails.value)
    let is_internal_member_editor = userDetails?.internal_member_team_detail?.role === 'Editor'    

    return (
        <section className="dashboard-wrapper">
           
            {!is_internal_member_editor && activeTab === 1 ? (  // general
                <div className="dashboard-overview-list">
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{t("tot_no_stories")}</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginTop: "8px"}} />    
                        ): (
                            <p className="value">{workReport?.over_all?.Total ? workReport?.over_all?.Total : 0}</p>
                        )}
                    </div>
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{t("assigned_txt")}</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginTop: "8px" }} />    
                        ): (
                            <p className="value">{workReport?.over_all?.TotalAssigned ? workReport?.over_all?.TotalAssigned : 0}</p>
                        )}
                    </div>
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{t("yet_to_start_txt")}</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginTop: "8px" }} />    
                        ): (
                            <p className="value">{workReport?.over_all?.YetToStart ? workReport?.over_all?.YetToStart : 0}</p>
                        )}
                    </div>
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{t("inprogress_txt")}</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginTop: "8px" }} />    
                        ): (
                            <p className="value">{workReport?.over_all?.Inprogress ? workReport?.over_all?.Inprogress : 0}</p>
                        )}
                    </div>
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{t("completed_txt")}</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginTop: "8px" }} />    
                        ): (
                            <p className="value">{workReport?.over_all?.Completed ? workReport?.over_all?.Completed : 0}</p>
                        )}
                    </div>
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{t("tot_word_completed")}</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginTop: "8px" }} />    
                        ): (
                            <p className="value">{workReport?.over_all?.TotalCompletedWords ? workReport?.over_all?.TotalCompletedWords : 0}w</p>
                        )}
                    </div>
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{t("words_approved_txt")}</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginTop: "8px" }} />    
                        ): (
                            <p className="value">{workReport?.over_all?.TotalApprovedWords ? workReport?.over_all?.TotalApprovedWords : 0}w</p>
                        )}
                    </div>
                </div>
            ) : (!is_internal_member_editor && (activeTab === 2 || activeTab === 3)) ? (   // for billing and glossary
                <div className="dashboard-overview-list bill">
                    <div className="dashboard-overview-list-item">
                        <p className="sub-title">{activeTab === 2  ? t("tot_words_approved") : t("tot_no_of_terms")}:</p>
                        {isDataFetching ? (
                            <CircularProgress size={32} sx={{ color: 'black', marginLeft: "28px"}} />    
                        ): (
                            activeTab === 2 ? (
                                <p className="value">{workReport?.over_all?.TotalApprovedWords ? workReport?.over_all?.TotalApprovedWords : 0}w</p>
                            ): (
                                <p className="value">{workReport?.over_all?.Totalterms ? workReport?.over_all?.Totalterms : 0}w</p>
                            )
                        )}
                    </div>
                </div>
            ) : (   // for internal member - editor
                <div className={"dashboard-inner-wrap " + (showEditorReportModal ? "editor-report" : "")}>
                    {/* <div className='dashboard-boxes word-count'>
                        <p>{t("tot_no_stories")}</p>
                        {isDataFetching ? (
                            <h1><CircularProgress sx={{ color: 'black' }} /></h1>    
                        ): (
                            <h1>{workReport?.over_all?.Total ? workReport?.over_all?.Total : 0}</h1>
                        )}
                    </div> */}
                    <div className='dashboard-boxes completed'>
                        <p>{t("assigned_txt")}</p>
                        {isDataFetching ? (
                            <h1><CircularProgress sx={{ color: 'black' }} /></h1>    
                        ): (
                            <h1>{workReport?.over_all?.TotalAssigned ? workReport?.over_all?.TotalAssigned : 0}</h1>
                        )}
                    </div>
                    <div className='dashboard-boxes pending'>
                        <p>{t("yet_to_start_txt")}</p>
                        {isDataFetching ? (
                            <h1><CircularProgress sx={{ color: 'black' }} /></h1>
                        ) : (
                            <h1>{workReport?.over_all?.YetToStart ? workReport?.over_all?.YetToStart : 0}</h1>
                        )}
                    </div>
                    <div className='dashboard-boxes inprogress'>
                        <p>{t("inprogress_txt")}</p>
                        {isDataFetching ? (
                            <h1><CircularProgress sx={{ color: 'black' }} /></h1>
                        ) : (
                            <h1>{workReport?.over_all?.Inprogress ? workReport?.over_all?.Inprogress : 0}</h1>
                        )}
                    </div>
                    <div className='dashboard-boxes assigned'>
                        <p>{t("completed_txt")}</p>
                        {isDataFetching ? (
                            <h1><CircularProgress sx={{ color: 'black' }} /></h1>
                        )  : (
                            <h1>{workReport?.over_all?.Completed ? workReport?.over_all?.Completed : 0}</h1>
                        )}
                    </div>
                    <div className='dashboard-boxes word-count'>
                        <p>{is_internal_member_editor ? t("words_submitted_for_approval") : t("tot_word_completed")}</p>
                        {isDataFetching ? (
                            <h1><CircularProgress sx={{color: 'black'}} /></h1>
                        ) : (
                            <h1>{workReport?.over_all?.TotalCompletedWords ? workReport?.over_all?.TotalCompletedWords : 0}w</h1>
                        )}
                    </div>
                        <div className='dashboard-boxes word-count'>
                            <p>{t("words_approved_txt")}</p>
                            {isDataFetching ? (
                                <h1><CircularProgress sx={{color: 'black'}} /></h1>
                            ) : (
                                <h1>{workReport?.over_all?.TotalApprovedWords ? workReport?.over_all?.TotalApprovedWords : 0}w</h1>
                            )}
                        </div>
                </div>
            )}
        </section> 
    )
}

export default DashboardOverview