import React, { useEffect, useRef, useState } from 'react';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useTranslation } from 'react-i18next';
import Config from '../../vendor/Config';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import FilterNoneRoundedIcon from '@mui/icons-material/FilterNoneRounded';
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg";
import WiktionaryIcon from "../../assets/images/new-ui-icons/Wiktionary-logo.svg";
import WikipediaIcon from "../../assets/images/new-ui-icons/Wikipedia-logo.svg";
import NoImgPlaceholder from "../../assets/images/no-img-found.png";

const ReferenceModal = (props) => {
    let {
        openContentReferenceModal,
        setOpenContentReferenceModal,
        contentReferenceResult
    } = props;
    const { t } = useTranslation();
    const [isModalMinimized, setIsModalMinimized] = useState(false);
    const minimizedModalRef = useRef(null);
        const isDragging = useRef(false);
    const offset = useRef(0);

    useEffect(() => {
        if(contentReferenceResult !== null){
            setIsModalMinimized(false);
        }
    }, [contentReferenceResult]);
    
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);

    const handleMouseUp = (e) => {
        isDragging.current = false;
    } 

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            e.stopPropagation();
            let newX = e.clientX - offset.current;
            if (newX < 0) {
                newX = 0;
            } else if (newX + minimizedModalRef.current.offsetWidth > window.innerWidth) {
                newX =  window.innerWidth - minimizedModalRef.current.offsetWidth;
            }
            minimizedModalRef.current.style.left = newX + 'px';
        }
    }

    const handleMouseDown = (e) => {
        isDragging.current = true;
        offset.current = e.clientX - minimizedModalRef.current.offsetLeft;
    }

    return (
        isModalMinimized ? (
            <div ref={minimizedModalRef} onMouseDown={handleMouseDown} className="file-downloading-modal-wrapper reference-minimized-window" >
                <div>
                    <p className='m-0'>
                        {
                            contentReferenceResult?.customize === 25 ? (
                                <>
                                    <img className='reference-icon' src={WikipediaIcon} alt="Wikipedia" />
                                    {t("wikipedia")}
                                </>
                            ) :
                            contentReferenceResult?.customize === 26 ? (
                                <>
                                    <img className='reference-icon' src={WiktionaryIcon} alt="wiktionary" />
                                    {t("wiktionary")}
                                </>
                            ) :
                            contentReferenceResult?.customize === 27 ? (
                                <>
                                    <LanguageRoundedIcon style={{ color: '#212529', fontSize: '30px', marginRight: '8px' }} />
                                    {t("web_search")}
                                </>
                            ) : 
                            contentReferenceResult?.customize === 28 && (
                                <>
                                    <NewspaperRoundedIcon style={{ color: '#212529', fontSize: '30px', marginRight: '8px' }} />
                                    {t("news_search")}
                                </>
                            ) 
                        }
                    </p>
                    <div className="lang-close d-flex">
                        <span className="modal-close-btn" onClick={(e) => { setIsModalMinimized(false) }}>
                            <FilterNoneRoundedIcon style={{ fontSize: '16px', color: '#595a5c', transform: 'rotate(180deg)' }} />
                        </span>
                        <span className="modal-close-btn" onClick={(e) => { e.stopPropagation(); setOpenContentReferenceModal(false) }}>
                            <img src={CloseBlack} alt="close_black" />
                        </span>
                    </div>
                </div>
            </div>
        ) : (
            <Rodal
                visible={openContentReferenceModal}
                showCloseButton={false}
                className="ai-open-doc-modal"
                onClose={() => console.log()}
            >
                
                <div className="lang-close d-flex">
                    <span className="modal-close-btn" onClick={(e) => { setIsModalMinimized(true) }}>
                        <RemoveRoundedIcon style={{ fontSize: '20px', color: '#595a5c'  }} />
                    </span>
                    <span className="modal-close-btn" onClick={(e) => { setOpenContentReferenceModal(false) }}>
                        <img src={CloseBlack} alt="close_black" />
                    </span>
                </div>
                <div className="modal-wrapper-file-manager">
                    <div className="doc-file-open-header">
                        <div className="open-doc-title-container">
                            <div className="open-doc-title">
                                <span className='d-flex'>
                                    {
                                        contentReferenceResult?.customize === 25 ? (
                                            <>
                                                <img className='reference-icon' src={WikipediaIcon} alt="Wikipedia" />
                                                {t("wikipedia")}
                                            </>
                                        ) :
                                        contentReferenceResult?.customize === 26 ? (
                                            <>
                                                <img className='reference-icon' src={WiktionaryIcon} alt="wiktionary" />
                                                {t("wiktionary")}
                                            </>
                                        ) :
                                        contentReferenceResult?.customize === 27 ? (
                                            <>
                                                <LanguageRoundedIcon style={{ color: '#212529', fontSize: '35px', marginRight: '8px' }} />
                                                {t("web_search")}
                                            </>
                                        ) : 
                                        contentReferenceResult?.customize === 28 && (
                                            <>
                                                <NewspaperRoundedIcon style={{ color: '#212529', fontSize: '35px', marginRight: '8px' }} />
                                                {t("news_search")}
                                            </>
                                        ) 
                                    }
                                </span>
                            </div>
                        </div>

                    </div>
                    <h5>{contentReferenceResult?.data?.Title}</h5>
                    <span className='generate-title-link' onClick={() => Config.openLinksInWindow(contentReferenceResult?.data?.URL)}>
                        {contentReferenceResult?.data?.URL}
                    </span>
                    <div className="doc-file-table-wrapper writer-reference-wrapper">
                        {contentReferenceResult?.customize === 25 ? (   // Wikipedia
                            <div className="wikipedia-result-content" dangerouslySetInnerHTML={{__html: contentReferenceResult?.data?.Content}}></div>
                        ) : contentReferenceResult?.customize === 26 ? (    // Wiktionary
                            <div className="wikitionary-search-word-cont mt-2">
                                {contentReferenceResult?.data?.res?.map((value, key) => (
                                    <React.Fragment key={value + "" + key}>
                                        <p>{value.pos}</p>
                                        <ul>
                                            {value?.definitions?.map((definition, childKey) => (
                                                <li key={key + "" + childKey}>{definition}</li>
                                            ))}
                                        </ul>
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : contentReferenceResult?.customize === 27 ? (   // Web search
                            <div className="web-search-box">
                                {/* <div className='google-search-box mr-1'>
                                    <h4><img className='icon' src={Config.HOST_URL + "assets/images/new-ui-icons/google-color-icon.svg"} alt="Google" /> Google search</h4>
                                    {
                                        contentReferenceResult?.data?.google?.map(each => {
                                            return (
                                                <div className='inner-wrapper'>
                                                    <h6>{each?.title}</h6>
                                                    <span className='generate-title-link' onClick={() => Config.openLinksInWindow(each.link)}>
                                                        {each.link}
                                                    </span>
                                                    <p className='bing-description' dangerouslySetInnerHTML={{__html: each.description}}></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div> */}
                                <div className='bing-search-box ml-2'>
                                    {/* <h4><img className='icon' src={Config.HOST_URL + "assets/images/new-ui-icons/bing-color-icon.svg"} alt="Bing" /> Bing search</h4> */}
                                    {
                                        contentReferenceResult?.data?.bing?.map(each => {
                                            return (
                                                <div className='inner-wrapper '>
                                                    <h6>{each?.title}</h6>
                                                    <span className='generate-title-link' onClick={() => Config.openLinksInWindow(each.link)}>
                                                        {each.link}
                                                    </span>
                                                    <p className='bing-description' dangerouslySetInnerHTML={{__html: each.description}}></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : contentReferenceResult?.customize === 28 && (
                            <div className="news-search-box">
                                {
                                    contentReferenceResult?.data?.map((each, index) => {
                                        return (
                                            <div className={"news-wraper " + (contentReferenceResult?.data?.length - 1 != index ? "bottom-border" : "")}>
                                                <div className="news-icon-wrapper mr-2">
                                                    <img 
                                                        src={
                                                            each?.thumbnail_url ? 
                                                            each?.thumbnail_url : 
                                                            NoImgPlaceholder
                                                        } 
                                                        alt={each?.title} 
                                                        onError={({ currentTarget }) => { 
                                                            currentTarget.onerror = null; // prevents looping
                                                            currentTarget.src = NoImgPlaceholder
                                                        }}
                                                    />
                                                    
                                                </div>
                                                <div className="content-wrapper">
                                                    <h5 className="mb-1">{each?.title}</h5>
                                                    <span className='generate-title-link' onClick={() => Config.openLinksInWindow(each?.link)}>
                                                        {each?.link}
                                                    </span>
                                                    <p className="news-description">{each?.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )}
                    </div>
                    {(contentReferenceResult?.customize === 27 || contentReferenceResult?.customize === 28) && (
                        <small className="powered-by-foot-note">Powered by Bing.com</small>
                    )}
                </div>
            </Rodal>

        )
    )
}

export default ReferenceModal;