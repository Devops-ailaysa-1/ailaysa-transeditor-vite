import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Config from "../../Config";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
// import Data from "./allTemplateData";
// import { data } from "jquery";
import { ButtonBase } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Skeleton from '@mui/material/Skeleton';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { ButtonLoader } from "../../loader/CommonBtnLoader";
import SourceLanguage from "../../vendor/lang-modal/Sourcelanguage";
import { useSelector, useDispatch } from "react-redux";
import { setShowGlobalTransition } from "../../features/GlobalTransitionSlice";
import { motion, AnimatePresence } from "framer-motion";
import NoEditorsFoundTwo from "../../assets/images/no-editors-found-2.svg"
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"

const AllTemplate = (props) => {
    const { category, categoryTab } = props
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    const history = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { t } = useTranslation();
    const languageOptionsList = useSelector((state) => state.languageOptionsList.value)
    const allTemplateList = useSelector((state) => state.allTemplateList.value)
    const individualTemplateList = useSelector((state) => state.individualTemplateList.value)


    const [fileListSearchEnlarge, setFileListSearchEnlarge] = useState(false);
    const [isSearchTermDelete, setIsSearchTermDelete] = useState(false);
    const [dataItem, setDataItem] = useState(null);
    const [dataFilterItem, setDataFilterItem] = useState(null);
    const [cardLoaders, setCardLoaders] = useState(false);
    const [hideSelectedCategory, setHideSelectedCategory] = useState(false);
    const [menuItems, setMenuItem] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const [categoryListItem, setCategoryListItem] = useState(null);
    const [projectSearchTerm, setProjectSearchTerm] = useState("");
    const [choiceListProjectName, setChoiceListProjectName] = useState("");
    const [choiceListLanguage, setChoiceListLanguage] = useState(null);
    const [showChoiceListCreateModal, setShowChoiceListCreateModal] = useState(false);
    const [showSrcLangModal, setshowSrcLangModal] = useState(false);
    const [isChoiceListModalEdit, setIsChoiceListModalEdit] = useState(false)
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [onFocusWrap, setOnFocusWrap] = useState(false)
    const dispatch = useDispatch()
    const showGlobalTransition = useSelector((state) => state.globalTransition.value)
    
    const searchTermRef = useRef(null)
    const searchTermCloseOutside = useRef();
    const DataItem = useRef(null)
    const DataFilterItem = useRef(null)
    const dontDisplayId = useRef([22, 23, 28])
    const searchAreaRef = useRef(null);

    useEffect(() =>{
        if(projectSearchTerm == "" && searchTermRef.current !== null && isSearchTermDelete){
            setIsSearchTermDelete(false)
        }
    }, [projectSearchTerm, isSearchTermDelete])

    const handleCloseSearchBox = () => {
        setProjectSearchTerm("");
        // let orderParam = URL_SEARCH_PARAMS.get("order_by");
        // let filterParam = URL_SEARCH_PARAMS.get("filter");
        // let url = `/file-upload?page=1&order_by=${orderParam}`;
        // if (filterParam != null) url += `&filter=${filterParam}`;
        // props.history(url);
        setDataItem(DataItem.current)
        setFileListSearchEnlarge(false);
        setIsSearchTermDelete(true)
    }


    const SearchTermFilterEnter = (e) => {
        if(e.which === 13 && projectSearchTerm == ""){
            setFileListSearchEnlarge(false)
            e.target.blur()
        }else if(e.which === 13){
            setFileListSearchEnlarge(false)
            handleSearchDropDownClick()
            searchTermRef.current = projectSearchTerm
            e.target.blur()
        }
    }

    const handleSearchDropDownClick = (e) => {
        setDataItem(DataFilterItem.current?.filter(e=> {return e.attributes?.Title.toLowerCase().includes(projectSearchTerm.toLowerCase()) &&  e  }));
        setFileListSearchEnlarge(false)
    } 

    useEffect(() => {
        if(location?.state && DataFilterItem.current){
            filterItem(location?.state?.aiCateg)
            // console.log(location?.state?.aiCateg, location?.state?.aiactivetabval)
        }
    }, [location?.state, DataFilterItem.current])

    // reset the choicelist states when choicelist modal is closed
    useEffect(() => {
        if(!showChoiceListCreateModal){
            resetChoicelistCreationModal()
        }
    }, [showChoiceListCreateModal])
    
    // useEffect(() => {
    //   if(allTemplateList?.res !== undefined && individualTemplateList?.res !== undefined){
    //     // console.log(allTemplateList)
    //     // console.log(individualTemplateList)
    //     setDataItem(allTemplateList.res)
    //     DataItem.current = allTemplateList.res
    //     setDataFilterItem(individualTemplateList.res)
    //     DataFilterItem.current = individualTemplateList.res
    //   }
    // }, [allTemplateList, individualTemplateList])
    

    const getCardContent = async() => {
        setCardLoaders(true)
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let data = await fetch(`${Config.STRAPI_BASE_URL}/api/all-template-app?populate=deep`, requestOptions)
        if (data.status === 200) {
            let response = await data.json()
            let {
                apps_template_cards 
            } = response?.data?.attributes

            let AppsCardsInfo = []
            apps_template_cards.data?.map((each) => {
                AppsCardsInfo.push(each)
            })
            setDataItem(AppsCardsInfo?.flat(1));
            DataItem.current = AppsCardsInfo?.flat(1)
            setCardLoaders(false)
        }
    } 

    const getFilterCardContent = async() => {
        setCardLoaders(true)
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let data = await fetch(`${Config.STRAPI_BASE_URL}/api/app-template?populate=deep`, requestOptions)
        if (data.status === 200) {
            let response = await data.json()
            let {
                Apps_Templates
            } = response?.data?.attributes

            let AppsCardsInfo = []
            Apps_Templates?.map((each) => {
                AppsCardsInfo.push(each.apps_template_cards.data.flat(1))
            })
            setDataFilterItem(AppsCardsInfo?.flat(1));
            DataFilterItem.current = AppsCardsInfo?.flat(1)
            setCardLoaders(false)
        }
    }

    useEffect(() => {
        getCardContent();
        getFilterCardContent();
    }, [])
 
    useEffect(() => {
        if(dataFilterItem?.length !== 0){
            let categoryArray = [...new Set(dataFilterItem?.map((item) => item.attributes?.category))]
            // const reorderCategoryArray = categoryArray[0];
            // categoryArray[0] = categoryArray[1];
            // categoryArray[1] = reorderCategoryArray;
            // console.log(categoryArray)
            setMenuItem(categoryArray)
            setCategoryListItem(categoryArray)
        }
    }, [dataFilterItem])

    useEffect(() => {
        if(params?.menu === "translate"){
            filterItem("Translate");
        }else if(params?.menu === "design"){
            filterItem("Design");
        } else if (params?.menu === "write"){
            filterItem("Write");
        } else if (params?.menu === "transcribe"){
            filterItem("Transcribe");
        } else if (params?.menu === "voice"){
            filterItem("Voice");
        } else if (params?.menu === "chatbooks"){
            filterItem("Chatbooks");
        } else if (params?.menu === "assets"){
            filterItem("Assets");
        } else if (params?.menu === "toolkit"){
            filterItem("Toolkit");
        }
    }, [params?.menu, DataFilterItem.current])

    /* Handling source language selection */
    const handleSourceLangClick = (value, name, e) => {
        setChoiceListLanguage({ name, value })
        setshowSrcLangModal(false);
    };

    const filterItem = (curcat) => {
        setFileListSearchEnlarge(false)
        setProjectSearchTerm('')
        const newItem = DataFilterItem.current?.filter((newVal) => {
            return newVal.attributes?.category === curcat;
        });
        let categoryArray = [...new Set(newItem?.map((item) => item.attributes?.category))]
        // const reorderCategoryArray = categoryArray[0];
        // categoryArray[0] = categoryArray[1];
        // categoryArray[1] = reorderCategoryArray;
        setCategoryListItem(categoryArray);
        setDataItem(newItem);
        setActiveTab(curcat);
        setHideSelectedCategory(true)
        history(`/create/all-templates/${curcat?.toLowerCase() === "voice" ? "voice" : curcat?.toLowerCase()}`)
        // console.log('done')
    };

    const handleCardClick = (item) => {
        if(item.attributes?.url !== 'open-choicelist-modal'){
            dispatch(setShowGlobalTransition(false))
            setTimeout(() => {
                if(item.attributes?.url.includes("https")){
                    window.open(item.attributes?.url, "_blank")
                }else{
                    history(item.attributes?.url, {state: {aiWritingCateg: item.attributes?.backend_id, prevPath: location.pathname}})
                }
            }, 250);
        }else{
            setShowChoiceListCreateModal(true)
        }
    }

    const createChoiceList = () => {

        if (choiceListProjectName?.trim() === '' || choiceListLanguage?.value === undefined) {
            Config.toast(t("please_complete_form"), 'warning')
            return;
        }

        let formData = new FormData();
        formData.append('name', choiceListProjectName?.trim());
        formData.append('language', choiceListLanguage?.value);
        setIsCreating(true)
        Config.axios({
            url: `${Config.BASE_URL}/workspace_okapi/choicelist/`,
            method: "POST",
            data: formData,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                setShowChoiceListCreateModal(false)
                setIsCreating(false)
                setIsCreating(false)
                history(`/choicelist-workspace/${response.data.id}`)
                // resetChoicelistCreationModal()
                // getChoiceLists()
            },
            error: (err) => {
                setIsCreating(false)
            }
        });
    }

    const resetChoicelistCreationModal = () => {
        setChoiceListLanguage(null)
        setChoiceListProjectName("")
    }

    // useEffect(() => {
    //     console.log(activeTab)
    // }, [])
    

    return (
        <React.Fragment>
            <section className="all-template-glb-wrapper">
                <div className="all-template-header">
                    <div className="all-templates-container">
                        <h1>{t("workflows_and_templates")}</h1>
                    {/* <div 
                        className="position-relative" 
                        style={{marginBottom: "30px"}}
                        // style={{visibility:activeTab == null ? 'visible' : 'hidden'}}
                        >
                            <div className={"project-list-search-box " + (fileListSearchEnlarge ? "active" : "")}>
                                <div className="img-box">
                                    <img src={Config.HOST_URL + "assets/images/chat/chat-search.svg"} alt="search-icon" />
                                </div>
                                <input 
                                    onClick={() => setFileListSearchEnlarge(true)}
                                    value={projectSearchTerm}
                                    // autoFocus={projectSearchTerm ? true : false}
                                    onChange={(e) => setProjectSearchTerm(e.target.value)}
                                    type="search"
                                    placeholder={t("search_all_templates")}
                                    onKeyUp={(e) => SearchTermFilterEnter(e)}
                                    onFocus={() => setFileListSearchEnlarge(true)}
                                    onBlur={(e) => {
                                        setFileListSearchEnlarge(false);
                                    }}
                                />
                                <span className={"close " + ((fileListSearchEnlarge || projectSearchTerm !== "") ? "show " : " ")}
                                    onClick={() => handleCloseSearchBox()}
                                >
                                    <img src={Config.HOST_URL + "assets/images/assign-page/search-bar-close.svg"} alt="search-bar-close" />
                                </span>
                            </div>
                            {/* <div ref={searchTermCloseOutside} className={"search-results-bar project-list-search-bar " + (fileListSearchEnlarge ? "show" : "hide")}>
                                <div name="search-dropdown" onMouseDown={(e)=>(projectSearchTerm !== "" ? handleSearchDropDownClick(e) : "")} className={"search-results-item " + (projectSearchTerm !== "" ? " " : "cursor-change")}>
                                    <SearchIcon className="search-icon" name="search-dropdown" />
                                    <div className="searched-results-info" name="search-dropdown">
                                        <p className="searched-term" name="search-dropdown">{projectSearchTerm}</p>
                                        {
                                            projectSearchTerm !== "" ? 
                                                <p className="results-link" name="search-dropdown">{t("search_results_1")} <span>{t("search_results_2")}</span></p>
                                            :
                                                <p className="results-link">{t("search_results_proj_list_1")} <span>{t("search_results_proj_list_2")}</span></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <ul className="templates-tab-list">
                            <li className={activeTab === null ? "active" : ""} onClick={() => {
                                setDataItem(DataItem.current);
                                setHideSelectedCategory(false);
                                setActiveTab(null); 
                                let categoryArray = [...new Set(dataFilterItem?.map((item) => item.attributes?.category))]
                                // const reorderCategoryArray = categoryArray[0];
                                // categoryArray[0] = categoryArray[1];
                                // categoryArray[1] = reorderCategoryArray;
                                setCategoryListItem(categoryArray);
                                history(`/create/all-templates`)
                                }}>{t("all")}</li>
                            {
                                menuItems?.filter((curtCategory) => curtCategory !== "Popular tasks")?.map((item, index) => {
                                    return(
                                        <li 
                                            key={index} 
                                            className={item === activeTab ? "active" : ""}
                                            onClick={() => filterItem(item)}
                                        >
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="all-templates-container">
                    <div className="all-templates-tab-wrapper">
                        <div className="templates-box-list-wrapper">
                            <AnimatePresence mode="wait" initial={false}>
                                {
                                    !cardLoaders ? 
                                    (   
                                        (dataItem?.length > 0) ? 
                                            (categoryListItem?.map((item, index) => {
                                                // console.log(item)
                                                return(
                                                    <motion.div 
                                                        key={activeTab ? activeTab : "All"} 
                                                        animate={{ opacity: 1, x: 0 }}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="tempalte-boxes-container-wrapper"
                                                    >
                                                        {/* { !hideSelectedCategory &&
                                                            <h2 className="category-title">{item}</h2>
                                                        } */}
                                                        <div className="templates-box-row">
                                                            { 
                                                                dataItem.filter((curtCategory) => curtCategory.attributes?.category === item)?.map((item, index) => {
                                                                    return(
                                                                        <>
                                                                            <div key={index} className="template-box-item-wrapper" onClick={() => handleCardClick(item)}>
                                                                                <div className={"templates-box-item " + ((item.attributes?.category === "Popular tasks") ? 
                                                                                    "write-bg-color": "")}>
                                                                                    {
                                                                                        item.attributes.newly_added &&
                                                                                        <div className="newly-added-tag">
                                                                                            {t("new")}
                                                                                        </div>
                                                                                    }
                                                                                    <div className="content-area">
                                                                                        <img src={Config.STRAPI_BASE_URL + item?.attributes?.icon?.data?.attributes?.url} />
                                                                                        {/* {
                                                                                            item.attributes?.category === "Text and Documents" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/textandpost.svg"} />
                                                                                            : item.attributes?.category === "Files" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/serv-icon-documents.svg"} />
                                                                                            : item.attributes?.category === "Images" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/videos.svg"} />
                                                                                            : item.attributes?.category === "Apps and websites" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/localization.svg"} />
                                                                                            : item.attributes?.category === "Transcription" || item.attributes?.category === "Speech" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/serv-icon-speech.svg"} />
                                                                                            : item.attributes?.category === "Videos" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/videos.svg"} />
                                                                                            : item.attributes?.category === "AI Writing" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/ai-writing.svg"} />
                                                                                            : item.attributes?.category === "Tool Kit" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/tool-kit.svg"} />
                                                                                            : item.attributes?.category === "Assets" ?
                                                                                                <img src={Config.HOST_URL + "assets/images/new-create-hub/books.svg"} />
                                                                                            : null
                                                                                        } */}
                                                                                        <h3>{item.attributes?.Title}</h3>
                                                                                        <p>{item.attributes?.Description}</p>
                                                                                    </div>
                                                                                    <div className="bottom-area">
                                                                                        <div className="methods-wrap">
                                                                                            {
                                                                                                item.attributes?.tags_lists?.data?.map((val, index) => {
                                                                                                    return(
                                                                                                        <span className="methods" key={index}>{val.attributes?.Tags}</span>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </div>
                                                                                        <ButtonBase className="getstated-btn" onClick={() => handleCardClick(item)}>
                                                                                            {t("get_started")}
                                                                                            <KeyboardArrowRightOutlinedIcon className="icon" />
                                                                                        </ButtonBase>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={"template-box-item-overlay " 
                                                                                // + ((item.attributes?.category === "Popular tasks") ? 
                                                                                //     (
                                                                                //         ((item.attributes?.backend_id === "writing")) ? 
                                                                                //             "write-bg-color" 
                                                                                //         : (item.attributes?.Title === "Translate") ? 
                                                                                //             "translate-bg-color" 
                                                                                //         : (item.attributes?.Title === "Design") ? 
                                                                                //             "design-bg-color" 
                                                                                //         : (item.attributes?.Title === "Transcribe") ? 
                                                                                //             "transcribe-bg-color" 
                                                                                //         : (item.attributes?.Title === "Voice") ? 
                                                                                //             "voice-bg-color"
                                                                                //         : "" 
                                                                                //     ) : "")
                                                                                + ((item.attributes?.category === "Popular tasks") ? 
                                                                                    "write-bg-color": "")
                                                                                    }>
                                                                                    <div className="template-box-overlay-inner-wrapper">
                                                                                        {
                                                                                            item.attributes.newly_added &&
                                                                                            <div className="newly-added-tag">
                                                                                                {t("new")}
                                                                                            </div>
                                                                                        }
                                                                                        <img src={Config.STRAPI_BASE_URL + item?.attributes?.icon?.data?.attributes?.url} />
                                                                                        <h3>{item.attributes?.Title}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </motion.div>
                                                )
                                            })) 
                                            : 
                                            <div className="tempalte-boxes-container-wrapper">
                                                <div className="templates-box-row">
                                                    <div className="no-template-found">
                                                        <img src={NoEditorsFoundTwo} alt="no-results"/>
                                                        <h1>{t("no_results")}</h1>
                                                    </div> 
                                                </div>
                                            </div>
                                    )
                                    :
                                    (
                                        Array(2).fill(null).map((value, key) => {
                                            return(
                                                <div key={key} className="tempalte-boxes-container-wrapper">
                                                    {/* <Skeleton animation="wave" variant="text" width={"10%"} /> */}
                                                    <div className="templates-box-row">
                                                        {
                                                            Array(4).fill(null).map((value, key) => {
                                                                return(
                                                                    <div key={key} className="template-box-item-wrapper loader">
                                                                        <div className="templates-box-item">
                                                                            <div className="content-area">
                                                                                <Skeleton
                                                                                    animation="wave"
                                                                                    variant="circular"
                                                                                    width={40}
                                                                                    height={40}
                                                                                    className="mb-3 ml-auto mr-auto"
                                                                                />
                                                                                <h3><Skeleton animation="wave" variant="text" width={"80%"} className="ml-auto mr-auto"/></h3>
                                                                                <p><Skeleton animation="wave" variant="text" width={"100%"} className="ml-auto mr-auto"/></p>
                                                                                <p><Skeleton animation="wave" variant="text" width={"100%"} className="ml-auto mr-auto"/></p>
                                                                                <p><Skeleton animation="wave" variant="text" width={110} className="ml-auto mr-auto" /></p>
                                                                            </div>
                                                                            <div className="bottom-area">
                                                                                <div className="methods-wrap d-flex">
                                                                                    {/* <span className="mr-2"><Skeleton animation="wave" variant="text" width={65} /></span> */}
                                                                                    <span><Skeleton animation="wave" variant="text" width={65} height={38} className="ml-auto mr-auto"/></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
            {/* New choicelist creation modal */}
            {
                showChoiceListCreateModal && (
                    <Rodal
                        visible={showChoiceListCreateModal}
                        showCloseButton={false}
                        onClose={() => {console.log()}}
                        className={"edit-instant-project-box " + ((showSrcLangModal) ? "z-index-reduce" : "z-index-increase")}
                    >
                        <div className="header-wrapper">
                            <div className="header-text">
                                {!isChoiceListModalEdit ? (
                                    <h1>{t("create_choicelist")}</h1>
                                ) : (
                                    <h1>{t("edit_choicelist")}</h1>
                                )}
                            </div>
                            <span className="modal-close-btn" onClick={() => { setShowChoiceListCreateModal(false); setIsChoiceListModalEdit(false) }}>
                                <img src={CloseBlack} alt="close_black" />
                            </span>
                        </div>
                        <div className="body-wrapper">
                            <div className="language-details mb-3">
                                <h2>{t("choicelist_name")}</h2>
                                <input
                                    type='text'
                                    value={choiceListProjectName}
                                    placeholder={t("choicelist_name")}
                                    className="ai-sl-tl-btn input"
                                    onChange={(e) => setChoiceListProjectName(e.target.value)}
                                />
                            </div>
                            <div className="language-details mb-3">
                                <h2>{t("select_language")}</h2>
                                <ButtonBase
                                    style={isChoiceListModalEdit ? { pointerEvents: 'none', opacity: 0.7 } : {}}
                                    onClick={() => setshowSrcLangModal(true)}
                                >
                                    <div className="ai-sl-tl-btn">
                                        <span className="text" style={choiceListLanguage?.value !== undefined ? {color: '#343a40'} : { color: '#ababab' }}>
                                            {choiceListLanguage?.value !== undefined ? `${choiceListLanguage?.name}` : t("select_language")}
                                        </span>
                                    </div>
                                </ButtonBase>
                            </div>
                            <div className="edit-proj-button-row">
                                <ButtonBase className="instant-edit-delete-btn" onClick={() => { setShowChoiceListCreateModal(false); setIsChoiceListModalEdit(false) }}>
                                    {t("discard")}
                                </ButtonBase>
                                {!isChoiceListModalEdit ? (
                                    <ButtonBase className="instant-edit-update-btn" onClick={() => { !isCreating && createChoiceList() }}>
                                        {isCreating && <ButtonLoader />}
                                        {isCreating ? t("creating") : t("create")}
                                    </ButtonBase>
                                ) : (
                                    <ButtonBase className="instant-edit-update-btn" onClick={() => { !isUpdating && console.log() }}>
                                        {isUpdating && <ButtonLoader />}
                                        {isUpdating ? t("updating") : t("update")}
                                    </ButtonBase>
                                )}
                            </div>
                        </div>
                    </Rodal>
                )
            }
            {
                showSrcLangModal && (
                    <Rodal
                        className="ai-tar-lang-select-modal"
                        visible={showSrcLangModal}
                        width={784}
                        height='auto'
                        onClose={() => {console.log()}}
                        showCloseButton={false}
                    >
                        <div className="lang-modal-wrapper">
                            {/* <h1>{t("select_target_language-2")}</h1> */}
                            <span className="modal-close-btn lang-close" onClick={(e) => setshowSrcLangModal(false)}>
                                <img src={CloseBlack} alt="close_black" />
                            </span>
                            <SourceLanguage
                                sourceLanguage={choiceListLanguage?.value}
                                showSrcLangModal={showSrcLangModal}
                                setshowSrcLangModal={setshowSrcLangModal}
                                sourceLanguageOptions={languageOptionsList}
                                handleSourceLangClick={handleSourceLangClick}
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
                )
            }
        </React.Fragment>
    )
};

export default AllTemplate;