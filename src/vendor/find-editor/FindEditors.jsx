import React, { useState, useEffect, createRef, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select, { components } from 'react-select'
import Config from '../Config'
// import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
// import classnames from 'classnames'
// import Radio from '@mui/material/Radio';

import Skeleton from '@mui/material/Skeleton';
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import Sourcelanguage from "../lang-modal/Sourcelanguage"
import Targetlanguage from "../lang-modal/Targetlanguage"
// import ModelSelect from '../model-select/ModelSelect'
import ProfilePopupModal from '../find-editor/ProfileModal'
// import currency_unicode from '../currency-unicode/currency_unicode.json'
import PaginationLeft from "../../assets/images/new-ui-icons/pagination-left.svg"
import PaginationRight from "../../assets/images/new-ui-icons/pagination-right.svg"
import LocationOnColor from "../../assets/images/assign-page/location_on_color.svg"
import MessageIcon from "../../assets/images/assign-page/messg-icon.svg"
import PendingBlack from "../../assets/images/chat/pending_black.svg"
import CheckCircleBlue from "../../assets/images/chat/check_circle_blue.svg"
import ArrowRight from "../../assets/images/assign-page/arrow_right_alt.svg"
import NoEditorFound from "../../assets/images/assign-page/no-editors-found-2.svg"
import NoEditorFoundNew from "../../assets/images/assign-page/no-editors-found-1.png"
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"

function FindEditors(props) {
    Config.redirectIfNotLoggedIn(props)

    let history = useNavigate()

    const [didMount, setDidMount] = useState(false)
    const [countrySelect, setCountrySelect] = useState(null)
    const [unitTypeSelect, setUnitTypeSelect] = useState(null)
    const [showSrcLangModal, setShowSrcLangModal] = useState(false)
    const [showFindEditorModal, setShowFindEditorModal] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [sourceLanguage, setSourceLanguage] = useState('')
    const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null)
    const [sourceLabel, setSourceLabel] = useState('Source language')
    const [targetLanguageOptions, setTargetLanguageOptions] = useState(null)
    const [targetLabel, setTargetLabel] = useState('Target language')
    const [targetLanguage, setTargetLanguage] = useState('')
    const [showTargetLangModal, setShowTargetLangModal] = useState(false)
    const [countryOptions, setCountryOptions] = useState([])
    const [unitTypeOptions, setUnitTypeOptions] = useState([])
    // const [showSubjectMatterModel, setShowSubjectMatterModel] = useState(false)
    const [subjectMatter, setSubjectMatter] = useState(null)
    const [subjectMatterOptions, setSubjectMatterOptions] = useState([])
    // const [subjectMatterLabel, setSubjectMatterLabel] = useState('Click to select')
    const [contentType, setContentType] = useState(null)
    const [contentTypeOptions, setContentTypeOptions] = useState([])
    const [editorListCard, setEditorListCard] = useState([])
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [experienceYear, setExperienceYear] = useState('')
    const [paginationContent, setPaginationContent] = useState('')
    const [totalEditors, setTotalEditors] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [editorDetails, setEditorDetails] = useState(null)
    const [editorName, setEditorName] = useState('')
    const [showEditorsSkeleton, setShowEditorsSkeleton] = useState(false)
    const [editorLegacy, setEditorLegacy] = useState(null)
    const [editorLegacyOptions, setEditorLegacyOptions] = useState([])

    const targetLanguageOptionsRef = useRef([])
    const editorsPerPage = useRef(12)
    const pageTopRef = useRef()
    
    const handleSourceLangClick = (value, name, e) => {
        setSourceLanguage(value)
        setShowSrcLangModal(false)
        setSourceLabel(name)
    }

    const handleTargetLangClick = (value, name, e) => {
        setTargetLanguage([value])
        setShowTargetLangModal(false)
        setTargetLabel(name)
    }

    useEffect(() => {
        setDidMount(true)
        getLanguageOptions()
        getCountryOptions()
        getUnitTypeOptions()
        getSubjectMatterOptions()
        getContentTypeOptions()
        getEditorLegacyOptions()
    }, [])

    const getLanguageOptions = () => {
        Config.axios({
            url: Config.BASE_URL + '/app/language/',
            auth: true,
            success: response => {
                targetLanguageOptionsRef.current = response.data
                setSourceLanguageOptions(response.data)
                setTargetLanguageOptions(response.data)
            }
        })
    }

    useEffect(() => {
        if (didMount)
            removeSelectedSourceFromTarget()
    }, [sourceLanguage])

    const removeSelectedSourceFromTarget = () => {
        setTargetLanguageOptions(targetLanguageOptionsRef.current.filter(element => element.id != sourceLanguage))
    }

    const getCountryOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/countries`,
            auth: true,
            success: (response) => {
                let countryOptionsTemp = []
                response.data.map(value => {
                    countryOptionsTemp.push({ value: value.id, label: value.name })
                })
                setTimeout(() => {
                    setCountryOptions(countryOptionsTemp)
                }, 200)
            }
        })
    }

    const getUnitTypeOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/servicetypeunits/`,
            auth: true,
            success: (response) => {
                let unitTypeOptionsTemp = []
                response.data.map(value => {
                    unitTypeOptionsTemp.push({ value: value.id, label: value.unit })
                })
                setTimeout(() => {
                    setUnitTypeOptions(unitTypeOptionsTemp)
                }, 200)
            }
        })
    }

    const getSubjectMatterOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/subjectfield/`,
            auth: true,
            success: (response) => {
                let subjectMatterOptionsTemp = []
                response.data?.map(value => {
                    subjectMatterOptionsTemp.push({value: value.id, label: value.name})
                })
                setSubjectMatterOptions(subjectMatterOptionsTemp)
            }
        })
    }

    const getContentTypeOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/contenttype/`,
            auth: true,
            success: (response) => {
                let contentTypeOptionsTemp = []
                response.data?.map(value => {
                    contentTypeOptionsTemp.push({ value: value.id, label: value.name })
                })
                setContentTypeOptions(contentTypeOptionsTemp)
            }
        })
    }

    const getEditorLegacyOptions = () => {
        Config.axios({
            url: `${Config.BASE_URL}/vendor/vendor_legal_categories/`,
            auth: true,
            success: (response) => {
                setEditorLegacyOptions(response.data?.out)
            }
        })
    }

    /* const subjectMatterSelect = (value, name, e) => {
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected")
            setSubjectMatter(prevState => prevState.filter(element => element !== value))
        } else {
            e.target.classList.add("selected")
            setSubjectMatter(prevState => [...prevState, value])
        }
    } */

    /* const contentTypeSelect = (value, name, e) => {
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected")
            setContentType(prevState => prevState.filter(element => element !== value))
        } else {
            e.target.classList.add("selected")
            setContentType(prevState => [...prevState, value])
        }
    } */

    /* useEffect(() => {
        if (didMount) {
            if (subjectMatter.length)
                setSubjectMatterLabel(subjectMatter.length + ' Subject matter' + (subjectMatter.length > 1 ? 's are' : ' is') + ' selected')
            else
                setSubjectMatterLabel('Click to select')
        }
    }, [subjectMatter]) */

    useEffect(() => {
        if (sourceLanguage && targetLanguage)
            getEditorsList()
    }, [editorName, currentPage, countrySelect, sourceLanguage, targetLanguage, unitTypeSelect, subjectMatter, contentType, editorLegacy, minPrice, maxPrice, experienceYear])

    const searchEditors = () => {
        if (sourceLanguage && targetLanguage)
            getEditorsList()
        else 
            Config.toast('Select source and target language', 'error')
    }

    const getEditorsList = () => {
        setShowEditorsSkeleton(true)
        setEditorListCard([])
        let queryParams = ['page=' + currentPage]
        if (subjectMatter)
            queryParams.push('subject=' + subjectMatter.map(value => value.value).join(','))
        if (minPrice != null && maxPrice != null && unitTypeSelect?.value != null) {
            queryParams.push('min_price=' + minPrice)
            queryParams.push('max_price=' + maxPrice)
            queryParams.push('count_unit=' + unitTypeSelect.value)
        }
        if (experienceYear)
            queryParams.push('year_of_experience=' + experienceYear)
        if (sourceLanguage)
            queryParams.push('source_lang=' + sourceLanguage)
        if (targetLanguage)
            queryParams.push('target_lang=' + targetLanguage)
        if (contentType)
            queryParams.push('content=' + contentType.map(value => value.value).join(','))
        if (editorLegacy)
            queryParams.push('category=' + editorLegacy.map(value => value.value).join(','))
        if (countrySelect?.value)
            queryParams.push('country=' + countrySelect?.value)
        if (editorName)
            queryParams.push('fullname=' + editorName)
        
        Config.axios({
            url: `${Config.BASE_URL}/marketplace/get_vendor_list/?${queryParams.join('&')}`,
            auth: true,
            success: (response) => {
                setEditorListCard(response.data?.results)
                pageTopRef.current.scrollIntoView({
                    behavior: 'smooth'
                }, 100)
                setTotalEditors(response.data?.count)
                setTotalPages(Math.ceil(response.data?.count / editorsPerPage?.current))
                setShowEditorsSkeleton(false)
            }
        })
    }

    const pageSelect = (page = 1) => {
        setCurrentPage(page)
    }

    const paginationContentFunction = (page = 1) => {
        page = (page == 0) ? 1 : page
        page = parseInt(page)
        let content = []
        if (totalPages > 1) {
            let url = '/fil-upload/' + '?page='
            /*Pagination logic starts*/
            if (page > 1)
                content.push(<li key={'prevButton'} onClick={e => pageSelect(page - 1)}><img src={PaginationLeft} /></li>)
            content.push(<li key={1} className={currentPage == 1 ? 'active-page' : ''} onClick={e => pageSelect(1)}>{1}</li>)
            let isPrevDotsInserted = false
            let isNextDotsInserted = false
            let visibleNextPrevPages = 1
            for (let i = 2; i < totalPages; i++) {
                if (i == currentPage || ((i + visibleNextPrevPages) >= currentPage && (i - visibleNextPrevPages) <= currentPage))
                    content.push(<li key={i} className={currentPage == i ? 'active-page' : ''} onClick={e => pageSelect(i)}>{i}</li>)
                else if ((i - visibleNextPrevPages) <= currentPage) {
                    if (!isPrevDotsInserted)
                        content.push(<li style={{cursor: "context-menu"}} key={i}>...</li>)
                    isPrevDotsInserted = true
                } else if ((i + visibleNextPrevPages) >= currentPage) {
                    if (!isNextDotsInserted)
                        content.push(<li style={{cursor: "context-menu"}} key={i}>...</li>)
                    isNextDotsInserted = true
                }
            }
            content.push(<li key={totalPages} className={currentPage == totalPages ? 'active-page' : ''} onClick={e => pageSelect(totalPages)}>{totalPages}</li>)
            if (page < totalPages)
                content.push(<li key={'nextButton'} onClick={e => pageSelect(page + 1)}><img src={PaginationRight} /></li>)
            /*Pagination logic ends*/
        }
        setTimeout(() => {
            setPaginationContent(content)
        }, 100)
    }

    useEffect(() => {
        if (didMount)
            paginationContentFunction(currentPage)
    }, [totalPages, currentPage])

    const getEditorDetails = (e, uid) => {
        if (sourceLanguage && targetLanguage) {
            let formData = new FormData()
            formData.append('vendor_id', uid)
            Config.axios({
                url: `${Config.BASE_URL}/marketplace/get_vendor_detail/?source_lang=${sourceLanguage}&target_lang=${targetLanguage[0]}`,
                method: 'POST',
                data: formData,
                auth: true,
                success: (response) => {
                    setEditorDetails(response.data)
                    setShowFindEditorModal(true)
                }
            })
        } else
            Config.toast('Select source and target language', 'error')
    }

    const editorChat = (vendorUid, vendorId) => {
        let formData = new FormData()
        formData.append('vendor_id', vendorUid)
        Config.axios({
            url: `${Config.BASE_URL}/marketplace/addingthread/`,
            method: 'POST',
            data: formData,
            auth: true,
            success: (response) => {
                if (response.data?.id)
                    history({pathname: '/chat', state:{ id: response.data?.id, receiverId: vendorId}})
            },
            error: (error) => {
                if (error.response.data?.thread_id) {
                    history({ pathname: '/chat', state: { id: error.response.data?.thread_id, receiverId: vendorId } })
                }
            }
        })
    }

    const hireEditor = (vendorUid) => {
        Config.confirm(() => {
            let formData = new FormData()
            formData.append('vendor_id', vendorUid)
            Config.axios({
                url: `${Config.BASE_URL}/auth/hired-editor/`,
                method: 'POST',
                data: formData,
                auth: true,
                success: (response) => {
                    if (response.data?.msg) {
                        setEditorListCard(prevState =>
                            prevState.map(
                                el => el.uid == vendorUid ? { ...el, status: 'Invite Sent' } : el
                            )
                        )
                        if (editorDetails != null)
                            setEditorDetails(prevState => ({
                                ...prevState,
                                status: 'Invite Sent'
                            }))
                    }
                }
            })
        }, [vendorUid], 'Please confirm to hire', ['Confirm', 'Cancel'])
    }

    const ValueContainer = ({ children, ...props }) => {
        return (
            components.ValueContainer && (
                <components.ValueContainer {...props}>
                    {!!children && (
                        <span style={{ position: "absolute", left: 0 }} className="country-placeholder-icon-box">
                            <img src={LocationOnColor} alt='location' />
                        </span>
                    )}
                    {children}
                </components.ValueContainer>
            )
        );
    }

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down-new"></span>
            </components.DropdownIndicator>
        );
    };

    const customAssignStyles = {
        placeholder: (provided, state) => ({
            ...provided,
            color: "#9B9B9B",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "24px",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "6px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px",
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: '0px solid #CED4DA',
            borderLeft: '2px solid transparent',
            color: state.isSelected ? '#ffffff' : (state.isDisabled ? '#cccccc' : '#7E7E7E'),
            background: state.isSelected ? '#F4F5F7' : '#ffffff',
            padding: "2px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: '#F4F5F7',
                borderLeft: '2px solid #0074D3',
                cursor: 'pointer',
            }
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? "1px solid #0074D3" : "1px solid #DBDBDB",
            borderRadius: 4,
            transtion: 0.3,
            color: state.isFocused ? "#0074D3" : "#3C4043",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "24px",
            width: "100%",
            boxShadow: 0,
            height: "auto",
            "&:hover": {
                cursor: 'pointer',
                fontWeight: "400",
                border: "1px solid #BEBEBE",
            }
        })
    }

    const customTeamSelectStyles = {
        // placeholder: (provided, state) => ({
        //     ...provided,
        //     "&:hover": {
        //         color: "#0078D4"
        //     }
        // }),
        valueContainer: base => ({
            ...base,
            padding: "0 0 0 20px"
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: "8px 0px",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #DADADA",
            borderRadius: "4px"
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: '0px solid #CED4DA',
            borderLeft: '2px solid transparent',
            color: '#7E7E7E',
            background: state.isSelected ? '#F4F5F7' : '#ffffff',
            padding: "8px",
            padding: "5px 8px",
            color: "#3C4043",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "24px",
            "&:hover": {
                background: '#F4F5F7',
                borderLeft: '2px solid #0074D3',
                cursor: 'pointer',
            }
        }),
        control: (base, state) => ({
            ...base,
            border: "0px solid #CED4DA",
            padding: "0 5px 0 22px",
            transtion: 0.3,
            fontSize: 13,
            boxShadow: state.isFocused ? 0 : 0,
            border: state.isFocused ? '0px solid #0078D4' : '0px solid #CED4DA',
            height: state.isFocused ? 36 : 36,
            "&:hover": {
                cursor: 'pointer',
                color: '#0078D4'
            }
        })
    }

    // const SearchButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: '#0078D4',
    //         boxShadow: 'none',
    //         borderRadius: '0 4px 4px 0',
    //         textTransform: 'none',
    //         padding: '20px 20px',
    //         "&:disabled": {
    //             backgroundColor: '#99c9ee'
    //         },
    //         '&:hover': {
    //             backgroundColor: '#0265b1',
    //             boxShadow: 'none',
    //         },
    //     },
    // }))(Button);

    // const HireButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: '#0078D4',
    //         boxShadow: 'none',
    //         borderRadius: '3px',
    //         textTransform: 'none',
    //         padding: '9.5px 32.5px',
    //         "&:disabled": {
    //             backgroundColor: '#99c9ee'
    //         },
    //         '&:hover': {
    //             backgroundColor: '#0265b1',
    //             boxShadow: 'none',
    //         },
    //     },
    // }))(Button)

    const hideSettingsModal = () => setShowSettings(false)

    const hideFindEditorModal = () => setShowFindEditorModal(false)

    const modaloption = {
        closeMaskOnClick: false,
        width: 784,
        onClose: hideSettingsModal,
    }

    const modalFindEditorOption = {
        closeMaskOnClick: false,
        width: 840,
        onClose: hideFindEditorModal,
    }

    const EditorTile = (props) => {
        let avatar = props.editor?.professional_identity
        if (avatar === null) {
            const initials = props.editor?.fullname?.match(/\b(\w)/g)
            avatar = initials?.join('').toUpperCase()
        } else
            avatar = Config.BASE_URL + avatar
        return (
            <div className="find-editors-search-results-cards" key={props.editor.id}>
                <div className="find-editors-details">
                    <div className="profile-pic" onClick={(e) => getEditorDetails(e, props.editor.uid)}>
                        {
                            props.editor.professional_identity == null ?
                                <React.Fragment>
                                    <div className="no-profile">
                                        <span>{avatar}</span>
                                    </div>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <img className="profile" src={avatar} alt="profile-pic" />
                                </React.Fragment>

                        }
                        <span className="flag-icon">
                            {props.editor.country && 
                                <img
                                    src={`https://hatscripts.github.io/circle-flags/flags/${props.editor?.country?.toLowerCase()}.svg`}
                                    width="256"
                                    height="192"
                                    alt={props.editor?.country} 
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null // prevents looping
                                        currentTarget.src = Config.HOST_URL+"assets/images/missed-flags/"+props.editor?.country?.toLowerCase()+".svg"
                                    }}    
                                />
                            }
                        </span>
                    </div>
                    <p className="profile-name">
                        <span>{props.editor.fullname}</span>
                    </p>
                    { props.editor.legal_category && <p className="profile-email">{props.editor.legal_category}</p> }
                    {props.editor.currency && 
                        <div className="profile-price-tag">
                            {/* currency_unicode[props.editor.currency] */props.editor.currency} {props.editor.vendor_lang_pair[0]?.service[0]?.mtpe_rate && <span>{props.editor.vendor_lang_pair[0]?.service[0]?.mtpe_rate + ' / ' + ((props.editor.vendor_lang_pair[0]?.service[0]?.mtpe_count_unit === 1) ? 'word' : 'char')}</span>}
                        </div>
                    }
                </div>
                <div className="find-editor-contact-hire-cont">
                    <div className="contact-details">
                        <div className="message" onClick={(e) => props.editorChat(props.editor?.uid, props.editor?.id)}>
                            <img src={MessageIcon} alt="msg" />
                        </div>
                    </div>
                    { props.editor?.status === 'Invite Sent' ?
                        <div className="invite-sent">
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
                            <button className="find-editor-HireButton" onClick={e => hireEditor(props.editor?.uid)}>
                                <span className="vendor-hire-button">Hire</span>
                            </button>
                    }
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="header-align" ref={pageTopRef}>
                <p className="section-header">Find Editors</p>
            </div>
            <div className="find-editor-container">
                <div className="find-editor-search-bar">
                    <div className="editor-row">
                        <div className="editor-col">
                            <div onClick={() => setShowSrcLangModal(true)} className="editor-src-language">
                                <span>{sourceLabel}</span>
                            </div>
                        </div>
                        <div className="editor-col">
                            <div onClick={() => setShowTargetLangModal(true)} className="editor-src-language">
                                <span>{targetLabel}</span>
                            </div>
                        </div>
                        <div className="editor-col">
                            <div className="editor-box-styles">
                                <div>
                                    <Select
                                        options={countryOptions}
                                        value={countrySelect}
                                        classNamePrefix="country-select"
                                        onChange={(countrySelect) => { setCountrySelect(countrySelect) }}
                                        styles={customTeamSelectStyles}
                                        placeholder="Country"
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, ValueContainer }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <SearchButton className="editor-col" onClick={(e) => searchEditors()}>
                            <span className="vendor-search-button"><img src={Config.HOST_URL + "assets/images/assign-page/vendor-search-icon.svg"} alt="vendor-search" />Search</span>
                        </SearchButton> */}
                    </div>
                </div>
                <div className="find-editor-main-part">
                    <div className="find-editor-filter-bar">
                        {/* <div className="find-editor-price-range">
                            <p className="find-editor-price-range-title">Price Range</p>
                            <div className="find-editor-price-range-inputs">
                                <div className="find-editor-price-range-row">
                                    <div className="find-editor-price-range-col">
                                        <div className="price-range-box">
                                            <label htmlFor="min-price">₹ Min</label>
                                            <input type="number" placeholder="0.00" id="min-price" className="price-range-input" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="find-editor-price-range-col">
                                        <div className="price-range-box">
                                            <label htmlFor="min-price">₹ Max</label>
                                            <input type="number" placeholder="0.00" id="min-price" className="price-range-input" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="unit-type-drp-down">
                                    <Select
                                        options={unitTypeOptions}
                                        value={unitTypeSelect}
                                        classNamePrefix="unit-select"
                                        onChange={(selectedOption) => { setUnitTypeSelect(selectedOption) }}
                                        styles={customAssignStyles}
                                        placeholder="Unit type"
                                        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                    />
                                </div>
                            </div>
                        </div> */}
                        <div className="find-editor-price-range">
                            <p className="find-editor-price-range-title">Subject matter(s)</p>
                            <div className="find-editor-price-range-inputs">
                                {/* <input type='text' className="text-fields" value={subjectMatterLabel} onClick={() => setShowSubjectMatterModel(true)} /> */}
                                <Select
                                    options={subjectMatterOptions}
                                    value={subjectMatter}
                                    classNamePrefix="Subject-matters"
                                    onChange={(selectedOption) => { setSubjectMatter(selectedOption) }}
                                    styles={customAssignStyles}
                                    placeholder="Select Subject matter(s)"
                                    components={{ DropdownIndicator, IndicatorSeparator: () => null}}
                                    isMulti={true}
                                />
                            </div>
                        </div>
                        <div className="find-editor-price-range">
                            <p className="find-editor-price-range-title">Content type(s)</p>
                            <div className="find-editor-price-range-inputs">
                                <Select
                                    options={contentTypeOptions}
                                    value={contentType}
                                    classNamePrefix="Content-type-select"
                                    onChange={(selectedOption) => { setContentType(selectedOption) }}
                                    styles={customAssignStyles}
                                    placeholder="Select Content type(s)"
                                    components={{ DropdownIndicator, IndicatorSeparator: () => null}}
                                    isMulti={true}
                                />
                            </div>
                        </div>
                        <div className="find-editor-price-range">
                            <p className="find-editor-price-range-title">Legal category</p>
                            <div className="find-editor-price-range-inputs">
                                <Select
                                    options={editorLegacyOptions}
                                    value={editorLegacy}
                                    classNamePrefix="Content-type-select"
                                    onChange={(selectedOption) => { setEditorLegacy(selectedOption) }}
                                    styles={customAssignStyles}
                                    placeholder="Select legal category"
                                    components={{ DropdownIndicator, IndicatorSeparator: () => null }}
                                    isMulti={true}
                                />
                            </div>
                        </div>
                        <div className="find-editor-price-range">
                            <p className="find-editor-price-range-title">Years of experience</p>
                            <div className="yr-exp-drp-down">
                                <div className="find-editor-price-range-inputs">
                                    <input type='number' className="text-fields" value={experienceYear} onChange={e => setExperienceYear(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="find-editor-price-range">
                            <p className="find-editor-price-range-title">Editor name</p>
                            <div className="find-editor-price-range-inputs">
                                <input type='text' className="text-fields" name="editor_name" value={editorName} onChange={(e) => setEditorName(e.target.value)}/>
                            </div>
                        </div>
                        {/* <div className="find-editor-price-range">
                            <p className="find-editor-price-range-title">Editor email ID</p>
                            <div className="find-editor-price-range-inputs">
                                <input type='text' className="text-fields" />
                            </div>
                        </div> */}
                    </div>

                    <div className="find-editors-list">
                        {/* When search is made */}
                        {totalEditors != 0 && 
                            <div className="find-editors-search-results-row">
                                <p className="title">Showing {totalEditors} editor</p>
                                <div className="find-editor-pair-lang">
                                    <span>{sourceLabel}</span>
                                    <img src={ArrowRight} alt="arrow_right_alt" />
                                    <span>{targetLabel}</span>
                                </div>
                            </div>
                        }
                        {/* When search is made */}
                        {/* <div className="filter-applied-details">
                            dummy
                            <p className="applied-filter-heading">Applied Filter</p>
                            <ul className="applied-filter-list">
                                <li>Business Documents <span><img src={Config.HOST_URL+"assets/images/chat/close_black.svg"} /></span></li>
                                <li>Technical/ Domain Specific <span><img src={Config.HOST_URL+"assets/images/chat/close_black.svg"} /></span></li>
                                <li>Personal Communication <span><img src={Config.HOST_URL+"assets/images/chat/close_black.svg"} /></span></li>
                            </ul>
                            <span className="clr-all-link">Clear All</span>
                            dummy
                        </div> */}
                        <div className="find-editors-search-results-cards-row">
                            {
                                showEditorsSkeleton 
                                ?
                                    <>
                                        {
                                            Array(editorsPerPage?.current).fill(null).map((value, key) => (
                                                <div className="find-editors-search-results-cards" key={key}>
                                                    <div className="find-editors-details">
                                                        <div className="profile-pic">
                                                            <Skeleton animation="wave" variant="circle" width={80} height={80} />
                                                        </div>
                                                        <Skeleton animation="wave" variant="text" style={{ width: 120, height: 20 }} />
                                                        <Skeleton animation="wave" variant="text" style={{ width: 100, height: 20 }} />
                                                        <Skeleton animation="wave" variant="text" style={{ width: 90, height: 20 }} />
                                                    </div>
                                                    <div className="find-editor-contact-hire-cont">
                                                        <div className="contact-details">
                                                            <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                                        </div>
                                                        <Skeleton animation="wave" variant="text" style={{ width: 100, height: 40 }} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                :
                                    editorListCard?.length 
                                    ?
                                        editorListCard.map(editor => (<EditorTile key={editor.id} editor={editor} editorChat={editorChat}/>))
                                    :
                                        (sourceLanguage && targetLanguage) 
                                        ? 
                                            <div className="main-no-editors-found">
                                                <img src={NoEditorFound} alt="main-no-editors-found"/>
                                                <h2>No Editors Found</h2>
                                                <p className="not-found-txt-2">We can’t find editor matching your search</p>
                                            </div>
                                        :
                                            <div className="main-no-editors-found">
                                                <img className="main-not-found-img" src={NoEditorFoundNew} alt="main-no-editors-found"/>
                                                <p className="not-found-txt">Select source language and target language to search editors</p>
                                            </div>
                            }
                        </div>
                        <div className="project-setup-pagination">
                            <ul>
                                {paginationContent}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {showFindEditorModal && (<Rodal
                visible={showFindEditorModal}
                {...modalFindEditorOption}
                showCloseButton={false}
                className="ai-find-editor-modal"
            >
                <div className="show-fine-editor-modal-header">
                    <span className="modal-close-btn" onClick={() => setShowFindEditorModal(false)}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                </div>
                {editorDetails != null && <ProfilePopupModal editor={editorDetails} unitTypeOptions={unitTypeOptions} editorChat={editorChat} hireEditor={hireEditor} sourceLanguageName={sourceLanguageOptions ? sourceLanguageOptions.find(element => element.id === sourceLanguage)?.language : ''} targetLanguageName={sourceLanguageOptions ? sourceLanguageOptions.find(element => element.id === targetLanguage[0])?.language : ''} /> }
            </Rodal>)}
            {showSrcLangModal && (<Rodal
                visible={showSrcLangModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-lang-select-modal"
            >
                <div className="lang-modal-header">
                    <h1>Select source language</h1>
                    <span className="modal-close-btn" onClick={() => setShowSrcLangModal(false)}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                </div>
                <Sourcelanguage sourceLanguage={sourceLanguage} setshowSrcLangModal={setShowSrcLangModal} sourceLanguageOptions={sourceLanguageOptions} handleSourceLangClick={handleSourceLangClick} />
            </Rodal>)}
            {showTargetLangModal &&
           ( <Rodal
                visible={showTargetLangModal}
                {...modaloption}
                showCloseButton={false}
                className="ai-tar-lang-select-modal"
            >
                <div className="lang-modal-header">
                    <h1>Select Target Language</h1>
                    <span className="modal-close-btn" onClick={e => setShowTargetLangModal(false)}>
                        <img
                            src={CloseBlack}
                            alt="close_black"
                        />
                    </span>
                </div>
                <Targetlanguage targetLanguage={targetLanguage} targetLanguageOptions={targetLanguageOptions} handleTargetLangClick={handleTargetLangClick} setshowTargetLangModal={setShowTargetLangModal} />
            </Rodal>)}
            {/* {showSubjectMatterModel &&
                <ModelSelect
                    handleSelect={subjectMatterSelect}
                    hideFunction={setShowSubjectMatterModel}
                    value={subjectMatter}
                    isMulti={true}
                    // valueKey="id"
                    // nameKey="name"
                    title="Select Subject matter(s)"
                    options={subjectMatterOptions}
                    show={showSubjectMatterModel}
                />
            } */}
        </React.Fragment>
    )
}
export default FindEditors