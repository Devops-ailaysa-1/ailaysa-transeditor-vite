import React, { useState, useEffect, useRef } from 'react';
import { ButtonBase } from '@mui/material';
import { useTranslation } from "react-i18next";
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import Config from '../vendor/Config';
import LanguageSelector from './LanguageSelector';
import { AnimatePresence, motion } from 'framer-motion';
const AllStories = () => {
    const { t } = useTranslation();
    const [selectedCard, setSelectedCard] = useState();

    const storiesList = [
        {
            id: 1,
            story_title: "Rajnath on 4-day Italy, France visit from Oct 9; focus on military hardware ties",
            img_link: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            story_title: "Ananda Devi, Mauritian writer of Telugu descent, wins the 2024 Neustadt Prize",
            img_link: "https://images.unsplash.com/photo-1603766806347-54cdf3745953?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            story_title: "MP assembly polls: Nobody talking about our issues, say transgenders",
            img_link: "https://images.unsplash.com/photo-1578183128583-21b03ed2244e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            story_title: "ICC World Cup 2023: Is it time to bowl out ODI cricket?",
            img_link: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const handleSelectedcard = (item) => {
        setSelectedCard(item);
    }

    return (
        <>
            <section className='all-stories-main-wrapper'>
                <div className='all-stories-inner-wrapper'>
                    {
                        storiesList?.map((item, index) => {
                            return(
                                <>
                                    <div key={item.id} className={`all-stories-card ${selectedCard === item.id ? "selected" : ""}`} onClick={() => handleSelectedcard(item.id)}>
                                        <div className='check-box-wrap'>
                                            <Checkbox 
                                                size="small"
                                                checked={selectedCard === item.id ? true : false} 
                                                onClick={() => handleSelectedcard(item.id)}
                                            />
                                        </div>
                                        <div className="card-inner-flex-box">
                                            <div className="story-text-area">
                                                <h1>{item.story_title}</h1>
                                                {selectedCard !== item.id && 
                                                    <AnimatePresence exitBeforeEnter>
                                                        <motion.div 
                                                            className='button-wrapper'
                                                            initial={{ opacity: 0}}
                                                            animate={{ opacity: 1}}
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            <ButtonBase className="view-btn">{t('view')}</ButtonBase>
                                                            <ButtonBase className="my-story-btn">
                                                                <AddIcon className='add-icon' />
                                                                {t('my_stories')}
                                                            </ButtonBase>
                                                        </motion.div> 
                                                    </AnimatePresence>
                                                }
                                            </div>
                                            <div className="img-text-area">
                                                <img src={item.img_link} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </section>
            {
                selectedCard ? 
                <LanguageSelector />
                : ""
            }
        </>
    )
}

export default AllStories;