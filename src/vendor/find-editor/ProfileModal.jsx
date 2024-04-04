import React, { useState, useEffect, createRef, useRef } from 'react'
import Config from '../Config'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
// import currency_unicode from '../currency-unicode/currency_unicode.json'
import EditorLocation from "../../assets/images/chat/editor-location.svg"
import EditorLanguage from "../../assets/images/chat/editor-language.svg"
import EditorSuitcase from "../../assets/images/chat/editor-suitcase.svg"
import EditorOrganization from "../../assets/images/chat/editor-organization.svg"
import ArrowRightColor from "../../assets/images/assign-page/arrow_right_alt.svg"
import CheckCircleBlue from "../../assets/images/chat/check_circle_blue.svg"
import PendingBlack from "../../assets/images/chat/pending_black.svg"
import MessageIcon from "../../assets/images/assign-page/messg-icon.svg"

function ProfileModal(props) {


    const [hireBtn, setHireBtn] = useState(false)
    const [activeEditorProfileTab, setActiveEditorProfileTab] = useState(1)

    const activeEditorProfileToggle = tab => {
        if (activeEditorProfileTab != tab)
        setActiveEditorProfileTab(tab)
    }

    // const HireButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#0078D4",
    //         boxShadow: "none",
    //         borderRadius: "2px",
    //         textTransform: "none",
    //         padding: "8.5px 32px",
    //         color: "#ffffff",
    //         "&:hover": {
    //             backgroundColor: "#0265b1",
    //             boxShadow: "none",
    //         },
    //     },
    // }))(Button)

    let avatar = props.editor?.professional_identity
    if (avatar === null) {
        const initials = props.editor?.fullname?.match(/\b(\w)/g)
        avatar = initials?.join('')?.toUpperCase()
    } else
        avatar = Config.BASE_URL + avatar

    let currency = /* currency_unicode[ */props.editor?.currency/* ] */
    return (
        <React.Fragment>
            <section className="profile-details-popup">
                <div className="profile-popup-header">
                    <div className="details-row">
                        <div className="profile-avatar">
                            {
                                props.editor?.professional_identity ? 
                                    <img src={avatar} alt="prof-avatar" />
                                :
                                    <span className="no-profile-pic">{avatar}</span>
                            }
                        </div>
                        <div className="profile-content">
                            <span className="name">{props.editor?.fullname && props.editor.fullname}</span>
                            <div className="profile-access-container">
                                {/* <Link to={{ pathname: '/chat', state: { id: props.editor?.thread_id}}}> */}
                                <span className="chat" onClick={e => props.editorChat(props.editor?.uid, props.editor?.id)}>
                                    <img src={MessageIcon} alt="chat" />
                                </span>
                                {/* </Link> */}
                                <div className="hire-btn">
                                    { props.editor?.status === 'Invite Sent' ?
                                    
                                        
                                        <div>
                                            <span className="img">
                                                <img src={PendingBlack} alt="pending"/>
                                            </span>
                                            <span className="txt">Invite sent</span>
                                        </div>
                                    :
                                        props.editor?.status === 'Invite Accepted'
                                        ?
                                            <div className="editor-hired">
                                                <span className="img">
                                                    <img src={CheckCircleBlue} alt="check_circle"/>
                                                </span>
                                                <span className="txt">Hired</span>
                                            </div>
                                        :
                                            <button className="profile-modal-HireButton" onClick={e => props.hireEditor(props.editor?.uid)}>
                                                <span className="hire-btn-txt">Hire</span>
                                            </button>
                                    
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editor-profile-details-tab-container">
                    <Nav tabs className="editor-details-switch-tab">
                        <NavItem className={"editor-details-button-global " + classnames({ active: activeEditorProfileTab == 1 })} onClick={() => { activeEditorProfileToggle(1) }}>
                            <NavLink className="editor-details-switch-btn">
                                Service & Rate
                            </NavLink>
                        </NavItem>
                        <NavItem className={"editor-details-button-global " + classnames({ active: activeEditorProfileTab == 2 })} onClick={() => { activeEditorProfileToggle(2) }}>
                            <NavLink className="editor-details-switch-btn">
                                Info
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div className="tab-content-container">
                    <TabContent activeTab={activeEditorProfileTab}>
                        <TabPane tabId={1}>
                            <div className="services-rates-tab-container">
                                <div className="rates-col">
                                    <h2 className="tab-service-rates-title">Rates</h2>
                                    <ul className="service-tab-list rates-border-remove">
                                        <li className="service-list-inner-row">
                                            <div className="service-list-icon-label">
                                                <span>Currency</span>
                                            </div>
                                            <div className="rates-list-details">
                                                <span>{props.editor?.currency}</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <p className="service-list-label">Language Pair</p>
                                    <div className="service-details-language-pair">
                                        <div className="service-details-lang-tar">
                                            <span>{props?.sourceLanguageName && props?.sourceLanguageName}</span>
                                            <img src={ArrowRightColor} alt="arrow_right_alt" />
                                            <span>{props?.targetLanguageName && props?.targetLanguageName}</span>
                                        </div>
                                        <div className="service-list-language-table">
                                            <ul className="service-list-table-header-cont">
                                                <li className="service-list-table-header">Services</li>
                                                <li className="service-list-table-header">Unit Type</li>
                                                <li className="service-list-table-header">Unit Rate</li>
                                                <li className="service-list-table-header">Hourly Rate</li>
                                            </ul>
                                            <div className="service-list-contents">
                                                <ul className="service-list-details-row">
                                                    <li className="service-list-details-col">MTPE</li>
                                                    <li className="service-list-details-col">{props.unitTypeOptions?.find(element => element.value === props.editor?.vendor_lang_pair[0]?.service[0]?.mtpe_count_unit)?.label}</li>
                                                    <li className="service-list-details-col">{props.editor?.vendor_lang_pair[0]?.service[0]?.mtpe_rate && currency + ' ' + props.editor?.vendor_lang_pair[0]?.service[0]?.mtpe_rate}</li>
                                                    <li className="service-list-details-col">{props.editor?.vendor_lang_pair[0]?.service[0]?.mtpe_hourly_rate && currency + ' ' + props.editor?.vendor_lang_pair[0]?.service[0]?.mtpe_hourly_rate}</li>
                                                </ul>
                                                <ul className="service-list-details-row">
                                                    <li className="service-list-details-col">Human Translation</li>
                                                    <li className="service-list-details-col">{props.unitTypeOptions?.find(element => element.value === props.editor?.vendor_lang_pair[0]?.servicetype[0]?.unit_type)?.label}</li>
                                                    <li className="service-list-details-col">{props.editor?.vendor_lang_pair[0]?.servicetype[0]?.unit_rate && currency + ' ' + props.editor?.vendor_lang_pair[0]?.servicetype[0]?.unit_rate}</li>
                                                    <li className="service-list-details-col">{props.editor?.vendor_lang_pair[0]?.servicetype[0]?.hourly_rate && currency + ' ' + props.editor?.vendor_lang_pair[0]?.servicetype[0]?.hourly_rate}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="tab-service-rates-title new-space-add">Services</h2>
                                <ul className="service-tab-list">
                                    <li className="service-list-inner-row">
                                        <div className="service-list-icon-label">
                                            <span>Content Type</span>
                                        </div>
                                        <div className="service-list-details">
                                            {
                                                props.editor?.vendor_contentype?.length > 0 &&
                                                props.editor?.vendor_contentype.map(contentType => (
                                                    <span>{contentType.contenttype_name}</span>
                                                ))
                                            }
                                        </div>
                                    </li>
                                    <li className="service-list-inner-row">
                                        <div className="service-list-icon-label">
                                            <span>Subject matter</span>
                                        </div>
                                        <div className="service-list-details">
                                            {
                                                props.editor?.vendor_subject?.length > 0 &&
                                                props.editor?.vendor_subject.map(subject => (
                                                    <span>{subject.subject_name}</span>
                                                ))
                                            }
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane tabId={2}>
                            <div className="info-tab-container">
                                <h2 className="tab-info-title">Contact Information</h2>
                                <ul className="info-tab-list">
                                    <li className="info-list-inner-row">
                                        <div className="info-list-icon-label">
                                            <img src={EditorOrganization} alt="editor-organization"/>
                                            <span>Organization</span>
                                        </div>
                                        <div className="info-list-details">
                                            <span>{props.editor?.organisation_name && props.editor?.organisation_name}</span>
                                        </div>
                                    </li>
                                    <li className="info-list-inner-row">
                                        <div className="info-list-icon-label">
                                            <img src={EditorSuitcase} alt="editor-suitcase"/>
                                            <span>Years of experience</span>
                                        </div>
                                        <div className="info-list-details">
                                            <span>{props.editor?.year_of_experience && props.editor?.year_of_experience + ' years'}</span>
                                        </div>
                                    </li>
                                    <li className="info-list-inner-row">
                                        <div className="info-list-icon-label">
                                            <img src={EditorLanguage} alt="editor-language"/>
                                            <span>Native language</span>
                                        </div>
                                        <div className="info-list-details">
                                            <span>{props.editor?.native_lang && props.editor?.native_lang}</span>
                                        </div>
                                    </li>
                                    <li className="info-list-inner-row">
                                        <div className="info-list-icon-label">
                                            <img src={EditorLocation} alt="editor-location"/>
                                            <span>Location</span>
                                        </div>
                                        <div className="info-list-details">
                                            <span>{props.editor?.location + ', ' + props.editor?.country}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </section>
        </React.Fragment>
    );
}

export default ProfileModal