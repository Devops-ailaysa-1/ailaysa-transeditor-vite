import React from "react";
import { useTranslation } from "react-i18next";

const EditorRolesList = (props) => {
    let { workReport, activeTab } = props;
    const { t } = useTranslation();

    return (
        <section className="editor-roles-wrapper">
            {activeTab === 1 ? (    // for general 
                <div className="editor-roles-table-wrap">
                    <div className="editor-roles-header-wrap">
                        <div className="editor-title">Editor name</div>
                        <div className="editor-title completed">Assigned</div>
                        <div className="editor-title pending">Yet to start</div>
                        <div className="editor-title inprogress">In-progress</div>
                        <div className="editor-title assigned">Completed</div>
                        <div className="editor-title">No. of words submitted</div>
                    </div>
                    <div className="editor-roles-value-wrap">
                        {workReport?.userData?.length !== 0 ? (
                            workReport?.userData?.map(each => {
                                return (
                                    <div className="editor-list-item" style={{opacity: each.state === 'deleted' ? 0.7 : 1}}>
                                        <div className="editor-list-value">
                                            <div className="editors-name-wrapper">
                                                <div className="no-avatar">{each?.user?.charAt(0)?.toUpperCase()}</div>
                                                <div className="editor-name-inner-wrap">
                                                    <p className="name">{each?.user}</p>
                                                    {each.state === 'deleted' && (
                                                        <span className="deleted-capsule">{t("deleted")}</span>
                                                    )}
                                                    {/* <p className="email">ailaysag1+kumaresh@gmail.com</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="editor-list-value">{each?.TotalAssigned ? each?.TotalAssigned : 0}</div>
                                        <div className="editor-list-value">{each?.YetToStart ? each?.YetToStart : 0}</div>
                                        <div className="editor-list-value">{each?.Inprogress ? each?.Inprogress : 0}</div>
                                        <div className="editor-list-value">{each?.Completed ? each?.Completed : 0}</div>
                                        <div className="editor-list-value word-count">
                                            <span>{each?.total_completed_words ? each?.total_completed_words : 0}w</span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>No internal members</p>
                        )}
                    </div>
                </div>
            ) : (activeTab === 2 || activeTab === 3) && (    // for billing and glossary
                <div className="editor-roles-table-wrap">
                    <div className="editor-roles-header-wrap">
                        <div className="editor-title">Editor name</div>
                        <div className="editor-title bill">{activeTab === 2 ? t("words_approved_txt") : t("no_of_terms")}</div>
                    </div>
                    <div className="editor-roles-value-wrap bill">
                        {workReport?.userData?.length !== 0 ? (
                            workReport?.userData?.map(each => {
                                return (
                                    <div className="editor-list-item" style={{opacity: each.state === 'deleted' ? 0.7 : 1}}>
                                        <div className="editor-list-value">
                                            <div className="editors-name-wrapper">
                                                <div className="no-avatar">{each?.user?.charAt(0)?.toUpperCase()}</div>
                                                <div className="editor-name-inner-wrap">
                                                    <p className="name">{each?.user}</p>
                                                    {each.state === 'deleted' && (
                                                        <span className="deleted-capsule">{t("deleted")}</span>
                                                    )}
                                                    {/* <p className="email">ailaysag1+kumaresh@gmail.com</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="editor-list-value word-count">
                                            {activeTab === 2 ? (
                                                <span>{each?.total_approved_words ? each?.total_approved_words : 0}w</span>
                                            ) : (
                                                <span>{each?.total_terms_added ? each?.total_terms_added : 0}w</span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>No internal members</p>
                        )}
                    </div>
                </div>
            )}            
        </section> 
    )
}

export default EditorRolesList;