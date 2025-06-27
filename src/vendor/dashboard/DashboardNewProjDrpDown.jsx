import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
import { ButtonBase } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from "react-redux";
import { setShowGlobalTransition } from "../../features/GlobalTransitionSlice";
import Config from "../Config";
import { useTranslation } from "react-i18next";

const DashboardNewProjDrpDown = () => {
    const { t } = useTranslation();
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const showGlobalTransition = useSelector((state) => state.globalTransition.value)
    const [newProjCreateBox, setNewProjCreateBox] = useState(false)
    const [popularDataItem, setPopularDataItem] = useState(null);
    const newProjectBoxRef = useRef()

    const getCardContent = async() => {
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
                if(each.attributes.category === "Popular tasks"){
                    return(
                        AppsCardsInfo.push(each)
                    )
                }
            })
            setPopularDataItem(AppsCardsInfo?.flat(1));
        }
    } 

    useEffect(() => {
        getCardContent();
    }, []);

    const handleOpenAllTemplates = () => {
        dispatch(setShowGlobalTransition(true))
        history("/create/all-templates/writing", {state: {prevPath: location.pathname}});
    }

    const handleCardClick = (item) => {
        history(item.attributes?.url, {state: {aiWritingCateg: item.attributes?.backend_id, prevPath: location.pathname}})
    }

    const handleNewProjDrpVisibility = (show = true) => {
        setNewProjCreateBox(show);
    };

    /* Check for clicing outside of the New project Dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (newProjectBoxRef.current && !newProjectBoxRef.current.contains(e.target)) {
                handleNewProjDrpVisibility(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    return (
        <>
            <div className="ai-projects-main-wrapper__header__dropdown-wrapper">
                <ButtonBase 
                    className="ai-projects-main-wrapper__header__button" 
                    onClick={() => {
                        // handleNewProjDrpVisibility(!newProjCreateBox);
                        handleOpenAllTemplates();
                    }}
                >
                    <AddIcon className="ai-projects-main-wrapper__header__button__plus-icon"/>
                    {t("new_project")}
                </ButtonBase>
                {/* <AnimatePresence initial={false}>
                    {newProjCreateBox &&
                        (<motion.div 
                            key="content"
                            initial={{ height: 0, opacity: 0}}
                            animate={{ height: "auto", opacity: 1}}
                            exit={{ height: 0, opacity: 0, transition: { duration: 0.15 }}}
                            transition={{ duration: 0.15 }} 
                            className="ai-projects-main-wrapper__header__dropdown-wrapper__dropdown-box"
                            ref={newProjectBoxRef}
                        >
                            <div className="dropdown-box--header">
                                <p className="dropdown-box--header__title">{t("drp_down_title")}</p>
                                <p className="dropdown-box--header__link" onClick={() => handleOpenAllTemplates()}>{t("view_all")}</p>
                            </div>
                            <ul className="dropdown-box__link__item__wrapper">
                            {
                                popularDataItem?.map((item, index) => {
                                    return(
                                        <motion.li 
                                            key={index}
                                            className="dropdown-box__link__item"
                                            initial={{ opacity: 0}}
                                            animate={{ opacity: 1}}
                                            exit={{ opacity: 0 }}
                                            onClick={() => handleCardClick(item)}
                                        >
                                            <span className="dropdown-box__link__item_icon">
                                                <img src={Config.STRAPI_BASE_URL + item.attributes.icon.data.attributes.url} alt={item.attributes.icon.data.attributes.name}/>
                                            </span>
                                            <h2 className="dropdown-box__link__item__title">{item.attributes?.Title}</h2>
                                        </motion.li>
                                    )
                                })
                            }
                            </ul>

                        </motion.div>)
                    }
                </AnimatePresence> */}
            </div>
        </>
    )
}

export default DashboardNewProjDrpDown