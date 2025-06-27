import React, { useState, useEffect, useRef } from "react";
import Config from "../../Config";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { ButtonBase } from '@mui/material'
import MasonryIcon from "../styles-svg/MasonryIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';

const DashboardPopularTasks = () => {
    const history = useNavigate();
    const location = useLocation();
    const [cardLoaders, setCardLoaders] = useState(false);
    const [popularDataItem, setPopularDataItem] = useState(null);
    const { t } = useTranslation();

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
                if(each.attributes.category === "Popular tasks"){
                    return(
                        AppsCardsInfo.push(each)
                    )
                }
            })
            setPopularDataItem(AppsCardsInfo?.flat(1));
            setCardLoaders(false)
        }
    } 

    useEffect(() => {
        getCardContent();
    }, [])

    const handleAllTemplateCardClick = () => {
        history("/create/all-templates/writing", {state: {prevPath: location.pathname}})
    }

    const handleCardClick = (item) => {
        if(item.attributes?.url.includes("http")){
            window.open(item.attributes?.url, "_blank")
        }else{
            history(item.attributes?.url, {state: {aiWritingCateg: item.attributes?.backend_id, prevPath: location.pathname}})
        }
    }
    
    return (
        <React.Fragment>
            <div className="ai-projects-main-wrapper__popular-tasks-wrapper">
                <div className="popular-tasks-wrapper__header">
                    <h1 className="popular-tasks-wrapper__header__title">{t("popular-tasks")}</h1>
                    <p className="popular-tasks-wrapper__header__chip-tag">{t("new")}</p>
                </div>
                <div className="popular-tasks-wrapper__cards">
                    {
                        !cardLoaders ? 
                        <>
                            {
                                popularDataItem?.map((item, index) => {
                                    return(
                                        <div key={index} className="popular-tasks-wrapper__cards__item__wrapper" onClick={() => handleCardClick(item)}>
                                            <div className="popular-tasks-wrapper__cards__item">
                                                <div className="popular-tasks-wrapper__cards__item__body">
                                                    <div className="popular-tasks-wrapper__cards__item__body__icon">
                                                        <img src={Config.STRAPI_BASE_URL + item.attributes.icon.data.attributes.url} alt={item.attributes.icon.data.attributes.name}/>
                                                    </div>
                                                    <h2 className="popular-tasks-wrapper__cards__item__body__title">{item.attributes?.Title}</h2>
                                                    <p className="popular-tasks-wrapper__cards__item__body__description">{item.attributes?.Description}</p>
                                                </div>  
                                                <div className="popular-tasks-wrapper__cards__item__footer">
                                                    <ButtonBase className="popular-tasks-wrapper__cards__item__footer__button" onClick={() => handleCardClick(item)}>
                                                        {t("go")}
                                                        <KeyboardArrowRightOutlinedIcon className="popular-tasks-wrapper__cards__item__footer__button__icon" />
                                                    </ButtonBase>
                                                </div>
                                            </div>
                                            <div className="popular-tasks-box-item-overlay">
                                                <div className="popular-tasks-box-overlay-inner-wrapper">
                                                    <img src={Config.STRAPI_BASE_URL + item.attributes.icon.data.attributes.url} />
                                                    <h3>{item.attributes?.Title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="popular-tasks-wrapper__view-template__item" onClick={() => handleAllTemplateCardClick()}>
                                <div className="popular-tasks-wrapper__view-template__item__body">
                                    <MasonryIcon />
                                    <Link className="popular-tasks-wrapper__view-template__item__body--link" to="/create/all-templates/writing">
                                        {t("view_all_templates")} 
                                        <span><KeyboardArrowRightOutlinedIcon className="popular-tasks-wrapper__view-template__item__body--arrow-icon" /></span>
                                    </Link>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            { 
                                Array(6).fill(null).map((value, key) => {
                                    return(
                                        <div style={{ justifyContent: "center", alignItems: "center"}} className="popular-tasks-wrapper__cards__item">
                                            <Skeleton
                                                animation="wave"
                                                variant="circular"
                                                width={55}
                                                height={55}
                                            />
                                            <Skeleton animation="wave" variant="text" width={170} height={45} className="mt-2 ml-auto mr-auto"/>
                                        </div>
                                    )
                                })
                            }
                            <div className="popular-tasks-wrapper__view-template__item">
                                <div className="popular-tasks-wrapper__view-template__item__body">
                                    <Skeleton
                                        animation="wave"
                                        variant="circular"
                                        width={40}
                                        height={40}
                                    />
                                    <Skeleton animation="wave" variant="text" width={170} className="mt-2 ml-auto mr-auto"/>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashboardPopularTasks