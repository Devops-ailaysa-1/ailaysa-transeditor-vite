import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Config from "../../Config";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import ButtonBase from '@mui/material/ButtonBase';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Skeleton from '@mui/material/Skeleton';




const Writing = (props) => {
    Config.redirectIfNotLoggedIn(props); //Redirect if not logged in.
    
    const history = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [dataItem, setDataItem] = useState(null);
    const [cardLoaders, setCardLoaders] = useState(false);



    const getCardContent = async() => {
        setCardLoaders(true)
        let newItem = []
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

            newItem = AppsCardsInfo.flat(1)?.filter((newVal) => {
                return newVal.attributes?.category === "Write with AI";
            });
            console.log(newItem)
            setDataItem(newItem);
            setCardLoaders(false)
        }
    } 

    useEffect(() => {
        getCardContent();
    }, [])
    


    return (
        <React.Fragment>
            <section className="all-template-glb-wrapper">
                <div className="all-templates-container">
                    <div className="all-template-header mb-0">
                        <h1>{t("write_with_ai")}</h1>
                    </div>
                    <div className="all-templates-tab-wrapper">
                        <div className="templates-box-list-wrapper">
                            <div className="templates-box-row">
                                {
                                    !cardLoaders ?
                                    (dataItem?.map((item, index) => {
                                        return(
                                            <div key={index} className="template-box-item-wrapper" onClick={() => history(item.attributes?.url, {state: {aiWritingCateg: item.attributes?.backend_id}})}>
                                                <div className="templates-box-item">
                                                    <div className="content-area">
                                                        <img src={Config.STRAPI_BASE_URL + item.attributes.icon.data.attributes.url} />
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
                                                        <ButtonBase className="getstated-btn" component={Link} to={item.attributes?.url}>
                                                            {t("go")}
                                                            <KeyboardArrowRightOutlinedIcon className="icon" />
                                                        </ButtonBase>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }))
                                    :
                                    (
                                        Array(10).fill(null).map((value, key) => {
                                            return(
                                                <div key={key} className="template-box-item-wrapper loader">
                                                <div className="templates-box-item">
                                                    <div className="content-area">
                                                        <Skeleton
                                                            animation="wave"
                                                            variant="circle"
                                                            width={40}
                                                            height={40}
                                                            className="mb-3"
                                                        />
                                                        <h3><Skeleton animation="wave" variant="text" width={"80%"} /></h3>
                                                        <p><Skeleton animation="wave" variant="text" width={"100%"} /></p>
                                                        <p><Skeleton animation="wave" variant="text" width={"100%"} /></p>
                                                        <p><Skeleton animation="wave" variant="text" width={110} /></p>
                                                    </div>
                                                    <div className="bottom-area">
                                                        <div className="methods-wrap d-flex">
                                                            <span className="mr-2"><Skeleton animation="wave" variant="text" width={65} /></span>
                                                            <span><Skeleton animation="wave" variant="text" width={65} /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default Writing;