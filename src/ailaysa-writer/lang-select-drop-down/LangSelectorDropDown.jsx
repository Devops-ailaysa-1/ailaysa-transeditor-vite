import React, { useEffect, useState } from 'react';
import './lang_selector_drop_down.css';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DoneIcon from '@mui/icons-material/Done';
import { Popover } from '@mui/material';

export const LangSelectorDropDown = (props) => {
    let {langList} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [languagesList, setLanguagesList] = useState(langList);
    const [selectedLangs, setSelectedLangs] = useState([17]);
    const [langSearchValue, setLangSearchValue] = useState("");
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    useEffect(() => {
        if(open){
            setTimeout(() => {
                let activeItem = document.querySelector('.lang-list-item.active');
                activeItem?.scrollIntoView();
            }, 20);
        }
    }, [open]);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        resetLangSearch();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLangItemClick = (item) => {
        if(selectedLangs?.find(each => each === item.id)){
            setSelectedLangs(selectedLangs?.filter(each => each !== item.id));
        }else {
            setSelectedLangs(prevState => {
                return [...prevState, item.id]
            });
        }
        resetLangSearch();
        if(langSearchValue !== ""){
            setTimeout(() => { scrollIntoSelectedItem(item) }, 20);
        }
    }

    const scrollIntoSelectedItem = (item) => {
        let selectedItem = document.querySelector(`#${item.locale_code}-${item.id}`);
        selectedItem?.scrollIntoView();
    } 

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const handleLangSearch = (e) => {
        let searchText = e.target.value;
        setLangSearchValue(searchText);
        let re = new RegExp('^'+escapeRegExp(searchText), 'i');
        let filteredData = langList?.filter((item) => {
            return(
            re?.test(item.language)
            );
        })
        setLanguagesList(filteredData);
    } 

    const resetLangSearch = () => {
        setLangSearchValue("");
        setLanguagesList(langList);
    } 

    // JSX component for rendering the language list items
    const LangListItem = (props) => {
        let {item} = props;
        return (
            <li className={"lang-list-item d-flex items-center " + (selectedLangs?.find(each => each === item.id) ? "active" : "")}
                id={`${item.locale_code}-${item.id}`}
                onClick={() => handleLangItemClick(item)}>
                <DoneIcon className="item-select-icon" style={{marginRight: "8px"}} />
                {item?.language}
            </li>
        );
    }

    return (
        <>
            <button className={"lang-select-drop-down-btn " + (anchorEl ? "active" : "")}
                onClick={handleClick}>
                <LanguageIcon style={{color: "#5F6368", fontSize: "24px"}} />
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <div className="lang-drop-down-container d-flex">
                    <div className="lang-search-box d-flex items-center">
                        <SearchIcon style={{color: "#5F6368"}} />
                        <input type="text" placeholder="Output language" autoFocus={true} className="search-input" value={langSearchValue} onChange={handleLangSearch} />
                    </div>
                    <div className="lang-list-wrapper">
                        <ul className="lang-list">
                            {languagesList?.length !== 0 ? (
                                languagesList?.map(item => {
                                    return (
                                        <LangListItem  item={item} />
                                    )
                                })
                            ) : (
                                <li style={{ textAlign: "center" }}>
                                    <small>Not found</small>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </Popover>
        </>
    );
}
