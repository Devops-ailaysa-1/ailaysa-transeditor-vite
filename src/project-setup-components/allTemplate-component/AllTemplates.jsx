import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { setShowTranslateDocumentModal } from "../../features/ShowTranslateDocumentModalSlice";
import { TranslateDocumentModal } from "./TranslateDocumentModal";

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
    const dispatch = useDispatch()

    const [openTranslateDocument, setOpenTranslateDocument] = useState(false);

    const searchTermRef = useRef(null)
    const DataItem = useRef(null)
    const DataFilterItem = useRef(null)

    useEffect(() => {
        if (projectSearchTerm == "" && searchTermRef.current !== null && isSearchTermDelete) {
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
        if (e.which === 13 && projectSearchTerm == "") {
            setFileListSearchEnlarge(false)
            e.target.blur()
        } else if (e.which === 13) {
            setFileListSearchEnlarge(false)
            handleSearchDropDownClick()
            searchTermRef.current = projectSearchTerm
            e.target.blur()
        }
    }

    const handleSearchDropDownClick = (e) => {
        setDataItem(DataFilterItem.current?.filter(e => { return e.attributes?.Title.toLowerCase().includes(projectSearchTerm.toLowerCase()) && e }));
        setFileListSearchEnlarge(false)
    }

    useEffect(() => {
        if (location?.state && DataFilterItem.current) {
            filterItem(location?.state?.aiCateg)
            // console.log(location?.state?.aiCateg, location?.state?.aiactivetabval)
        }
    }, [location?.state, DataFilterItem.current])


    const getCardContent = async () => {
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

    const getFilterCardContent = async () => {
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
        if (dataFilterItem?.length !== 0) {
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
        if (params?.menu === "translate") {
            filterItem("Translate");
        } else if (params?.menu === "design") {
            filterItem("Design");
        } else if (params?.menu === "write") {
            filterItem("Write");
        } else if (params?.menu === "transcribe") {
            filterItem("Transcribe");
        } else if (params?.menu === "voice") {
            filterItem("Voice");
        } else if (params?.menu === "chatbooks") {
            filterItem("Chatbooks");
        } else if (params?.menu === "assets") {
            filterItem("Assets");
        } else if (params?.menu === "toolkit") {
            filterItem("Toolkit");
        }
    }, [params?.menu, DataFilterItem.current])

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
    };

    const handleCardClick = (item) => {
        if (item.id == 2){
            translateDocumentHandler(item);
            return;
        }
        dispatch(setShowGlobalTransition(false))
        setTimeout(() => {
            if (item.attributes?.url.includes("https")) {
                window.open(item.attributes?.url, "_blank")
            } else {
                history(item.attributes?.url, { state: { aiWritingCateg: item.attributes?.backend_id, prevPath: location.pathname } })
            }
        }, 250);
    }

    const translateDocumentHandler = (item) => {
        dispatch(setShowTranslateDocumentModal(true));
        setOpenTranslateDocument(true);
    }

    const handleOpenSpellCheck = (item) => {
        history(`/spell-check`, { state: { aiWritingCateg: null, prevPath: location.pathname } })
    }


    return (
        <React.Fragment>
            {openTranslateDocument && <TranslateDocumentModal />}
            <section className="all-template-glb-wrapper">
                <div className="all-template-header">
                    <div className="all-templates-container">
                        <h1>{t("workflows_and_templates")}</h1>
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
                                    return (
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
                                                    return (
                                                        <motion.div
                                                            key={activeTab ? activeTab : "All"}
                                                            animate={{ display: "block", x: 0 }}
                                                            initial={{ display: "none", x: -20 }}
                                                            exit={{ display: "none", x: 20 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="tempalte-boxes-container-wrapper"
                                                        >
                                                            {/* { !hideSelectedCategory &&
                                                            <h2 className="category-title">{item}</h2>
                                                        } */}
                                                            <div className="templates-box-row">
                                                                {
                                                                    dataItem.filter((curtCategory) => curtCategory.attributes?.category === item)?.map((item, index) => {
                                                                        return (
                                                                            <>
                                                                                <div key={index} className="template-box-item-wrapper" onClick={() => handleCardClick(item)}>
                                                                                    <div className={"templates-box-item " + ((item.attributes?.category === "Popular tasks") ?
                                                                                        "write-bg-color" : "")}>
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
                                                                                                        return (
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
                                                                                            "write-bg-color" : "")
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
                                                                {/* {(item == 'Toolkit' && activeTab == 'Toolkit') &&
                                                                    <div className="template-box-item-wrapper" onClick={() => handleOpenSpellCheck()}>
                                                                        <div class="templates-box-item ">
                                                                            <div class="content-area">
                                                                                <img src="https://contentstaging.ailaysa.com/uploads/tool_kit_0943904c14.svg" />
                                                                                <h3>Spell check</h3>
                                                                            </div>
                                                                            <div class="bottom-area">
                                                                                <div class="methods-wrap">
                                                                                </div>
                                                                                
                                                                                <ButtonBase className="getstated-btn" >
                                                                                                {t("get_started")}
                                                                                                <KeyboardArrowRightOutlinedIcon className="icon" />
                                                                                </ButtonBase>
                                                                            </div>
                                                                        </div>
                                                                        <div className="template-box-item-overlay">
                                                                            <div class="template-box-overlay-inner-wrapper">
                                                                                <img src="https://contentstaging.ailaysa.com/uploads/tool_kit_0943904c14.svg" />
                                                                                <h3>Spell check</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                } */}
                                                            </div>
                                                        </motion.div>
                                                    )
                                                }))
                                                :
                                                <div className="tempalte-boxes-container-wrapper">
                                                    <div className="templates-box-row">
                                                        <div className="no-template-found">
                                                            <img src={NoEditorsFoundTwo} alt="no-results" />
                                                            <h1>{t("no_results")}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                        )
                                        :
                                        (
                                            Array(2).fill(null).map((value, key) => {
                                                return (
                                                    <div key={key} className="tempalte-boxes-container-wrapper">
                                                        {/* <Skeleton animation="wave" variant="text" width={"10%"} /> */}
                                                        <div className="templates-box-row">
                                                            {
                                                                Array(4).fill(null).map((value, key) => {
                                                                    return (
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
                                                                                    <h3><Skeleton animation="wave" variant="text" width={"80%"} className="ml-auto mr-auto" /></h3>
                                                                                    <p><Skeleton animation="wave" variant="text" width={"100%"} className="ml-auto mr-auto" /></p>
                                                                                    <p><Skeleton animation="wave" variant="text" width={"100%"} className="ml-auto mr-auto" /></p>
                                                                                    <p><Skeleton animation="wave" variant="text" width={110} className="ml-auto mr-auto" /></p>
                                                                                </div>
                                                                                <div className="bottom-area">
                                                                                    <div className="methods-wrap d-flex">
                                                                                        {/* <span className="mr-2"><Skeleton animation="wave" variant="text" width={65} /></span> */}
                                                                                        <span><Skeleton animation="wave" variant="text" width={65} height={38} className="ml-auto mr-auto" /></span>
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
        </React.Fragment>
    )
};

export default AllTemplate;