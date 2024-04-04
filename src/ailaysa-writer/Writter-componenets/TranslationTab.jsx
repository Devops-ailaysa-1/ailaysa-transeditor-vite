import React, { useState, useEffect, createRef, useRef } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AnimatePresence, motion } from 'framer-motion'

const TranslationTab = () => {
    const [translationTabActive, setTranslationTabActive] = useState(1)
    const [translationTabDropDownVisibility, setTanslationTabDropDownVisibility] = useState(false)
    const BookTranslationRef = useRef()

    const tabsData = [
        { id: 1, label: "Book translation 1", dropdownOptions: ["Opt 1A", "Opt 1B"] },
        { id: 2, label: "Book translation 2", dropdownOptions: ["Opt 2A", "Opt 2B"] },
        { id: 3, label: "Book translation 3", dropdownOptions: ["Opt 3A", "Opt 3B"] },
        { id: 4, label: "Book translation 4", dropdownOptions: ["Opt 4A", "Opt 4B"] }
      ];

    const handleBookTranslationDrpVisibility = (show = true) => {
        setTanslationTabDropDownVisibility(show);
    };

    /* Check for clicing outside of the New project Dropdown */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (BookTranslationRef.current && !BookTranslationRef.current.contains(e.target)) {
                handleBookTranslationDrpVisibility(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    return (
        <div className="book-tranlation-wrapper">
            <div className="book-tranlation-wrapper__row">
                {
                    tabsData.map((tab) => {
                        return(
                                <div key={tab.id} className='book-tranlation-wrapper__main-item' onClick={() => setTranslationTabActive(tab.id)}>
                                    <div className={'book-tranlation-wrapper__item ' + ((translationTabActive === tab.id) ? "active" : "disabled")}>
                                        <span>{tab.label}</span>
                                        <div className="arrow-dropdown-click" onClick={() => {handleBookTranslationDrpVisibility(true); setTranslationTabActive(tab.id)}}>
                                            <ArrowDropDownIcon className="arrow-icon" />
                                        </div>
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {(translationTabDropDownVisibility && (translationTabActive === tab.id)) &&
                                            (<motion.div 
                                                key="content"
                                                initial={{ height: 0, opacity: 0}}
                                                animate={{ height: "auto", opacity: 1}}
                                                exit={{ height: 0, opacity: 0, transition: { duration: 0.15 }}}
                                                transition={{ duration: 0.15 }} 
                                                className="book-tranlation-wrapper__item__dropdown-wrapper__dropdown-box"
                                                ref={BookTranslationRef}
                                            >
                                                <ul className="dropdown-box__link__item__wrapper">
                                                {
                                                    tab.dropdownOptions?.map((item, index) => {
                                                        return(
                                                            <motion.li 
                                                                key={index}
                                                                className="dropdown-box__link__item"
                                                                initial={{ opacity: 0}}
                                                                animate={{ opacity: 1}}
                                                                exit={{ opacity: 0 }}
                                                                onClick={() => handleBookTranslationDrpVisibility(false)}
                                                            >
                                                                <p className="dropdown-box__link__item__title">{item}</p>
                                                            </motion.li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                            </motion.div>)
                                        }
                                    </AnimatePresence>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TranslationTab