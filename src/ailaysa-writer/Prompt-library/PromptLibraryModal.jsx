import React, { useEffect, useRef, useState } from 'react'
import './prompty_library_modal.css'
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import generateKey from '../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

export const PromptLibraryModal = () => {

    const [showPromptLibrary, setShowPromptLibrary] = useState(false)
    const [activePromptTab, setActivePromptTab] = useState(1)
    const [selectedDomain, setSelectedDomain] = useState(1)
    const [selectedCategory, setselectedCategory] = useState(1)
    const [selectedSubCategory, setselectedSubCategory] = useState(1)
    const [isNewOrEditMode, setIsNewOrEditMode] = useState(false)

    const promptCardDeleteIdRef = useRef(null)

    let categoryListInit = [
        {
            id: 1,
            label: "Fiction Writing"
        },
        {
            id: 2,
            label: "Non-Fiction"
        },
        {
            id: 3,
            label: "Poetry"
        },
        {
            id: 4,
            label: "Screen"
        },
        {
            id: 5,
            label: "Fiction Writing"
        },
        {
            id: 6,
            label: "Fiction Writing"
        },
        {
            id: 7,
            label: "Poetry"
        },
    ]

    let subCategoryListInit = [
        {
            id: 1,
            label: "Character Development"
        },
        {
            id: 2,
            label: "Plot Structure"
        },
        {
            id: 3,
            label: "Dialogue Techniques"
        },
    ]
    
    let promptCardsListInit = [
        {
            id: 1,
            label: `Create a detailed profile for your character. Include details such as [Name], [Age], [Occupation], [Personality Traits], [Background], and [Goals].`
        },
        {
            id: 2,
            label: `Create a detailed profile for your character. Include details such as [Name], [Age], [Occupation], [Personality Traits], [Background], and [Goals].`
        },
        {
            id: 3,
            label: `Create a detailed profile for your character. Include details such as [Name], [Age], [Occupation], [Personality Traits], [Background], and [Goals].`
        },
    ]

    const [categoryList, setCategoryList] = useState(categoryListInit)
    const [subCategoryList, setSubCategoryList] = useState(subCategoryListInit)
    const [promptCardsList, setPromptCardsList] = useState(promptCardsListInit)
    const [promptCardsListCopy, setPromptCardsListCopy] = useState(promptCardsListInit)
    
    // check whether any prompt card is in "edit" or new "state"
    useEffect(() => {
        if(promptCardsList?.length !== 0){
            if(promptCardsList.find(each => (each.isNew || each.isEdit))){
                setIsNewOrEditMode(true)
            }else{
                setIsNewOrEditMode(false)
            }
        }
    }, [promptCardsList])
    

    // JSX component for custom button
    const PromptButton = (props) => {
        let {children, classname} = props
        return (
            <button
                className={[
                    "prompt-btn",
                    classname
                ].join(' ')}
                {...props}
            >
                {children}
            </button>
        )
    } 

    // JSX component for prompt tabs
    const PromptTabs = (props) => {
        return (
            <div className="tab-list d-flex">
                <div 
                    className={"tab-item " + (activePromptTab === 1 ? 'active' : '')} 
                    onClick={() => setActivePromptTab(1)}
                >
                    Open prompts
                </div>
                <div 
                    className={"tab-item " + (activePromptTab === 2 ? 'active' : '')} 
                    onClick={() => setActivePromptTab(2)}
                >
                    My prompts
                </div>
            </div>
        )
    } 

    // JSX component for list of domain capsules
    const DomainCapsuleList = (props) => {
        return (
            <div className="domain-capsule-container custom-scroll-bar d-flex">
                <Swiper
                    slidesPerView="auto"
                    navigation={true}
                    grabCursor={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {Array(2).fill(null).map((each, ind) => {
                        return(
                            <>
                                <SwiperSlide key={ind}><div className={"domain-capsule " + (selectedDomain === 1 ? 'active' : "")} onClick={() => setSelectedDomain(1)}>Writers</div></SwiperSlide>
                                <SwiperSlide key={ind}><div className={"domain-capsule " + (selectedDomain === 2 ? 'active' : "")} onClick={() => setSelectedDomain(2)}>Journalist</div></SwiperSlide>
                                <SwiperSlide key={ind}><div className={"domain-capsule " + (selectedDomain === 3 ? 'active' : "")} onClick={() => setSelectedDomain(3)}>Sales</div></SwiperSlide>
                                <SwiperSlide key={ind}><div className={"domain-capsule " + (selectedDomain === 4 ? 'active' : "")} onClick={() => setSelectedDomain(4)}>Books</div></SwiperSlide>
                            </>
                        )
                    })}
                </Swiper>
            </div>
        )
    } 

    // JSX component for prompt cards
    const PromptCard = (props) => {
        let {id, prompt, isNew} = props
        return (
            <div key={id} className="prompt-card">
                {isNew ? (
                    <textarea 
                        name="new-prompt" 
                        placeholder='Enter your own prompt,  utilizing [square brackets] for placeholders.'                     
                        autoFocus={true}
                        onChange={(e) => handlePromptChange(e, id)}
                        value={prompt}
                    ></textarea>
                ) : (
                    <p className="prompt-text">
                        {prompt}
                        {/* Create a detailed profile for your character. Include details such as [Name]</span>, <span className="prompt-placeholder">[Age]</span>, <span className="prompt-placeholder">[Occupation]</span>, <span className="prompt-placeholder">[Personality Traits]</span>, <span className="prompt-placeholder">[Background]</span>, and <span className="prompt-placeholder">[Goals]</span>. */}
                    </p>
                )}
                <div className="action-btn-wrapper items-center">
                    {isNew ? (
                        <>
                            <PromptButton classname="simple-btn">
                                Cancel
                            </PromptButton>
                            <PromptButton classname="prompt-primary-btn">
                                Add prompt
                            </PromptButton>
                        </>
                    ) : (
                        <>
                            <Tooltip title="Delete prompt" placement="top" arrow>
                                <div className="action-icon delete-bin-icon">
                                    <DeleteIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title="Edit prompt" placement="top" arrow>
                                <div className="action-icon edit-icon">
                                    <EditIcon />
                                </div>
                            </Tooltip>
                            <PromptButton classname="prompt-primary-btn">
                                Use prompt
                            </PromptButton>
                        </>
                    )}
                    {/* <PromptButton classname="prompt-primary-btn">
                        Save prompt
                    </PromptButton>
                    <PromptButton classname="danger-btn">
                        Delete prompt
                    </PromptButton> */}
                </div>
            </div>
        )
    }

    // update the isEdit/isDelete (any specific) key in the list for operation
    const updateSpecificKeyInList = (list, id, key, value) => {
        let newArr = list?.map(obj => {
            if(obj?.id === id){
                return {
                    ...obj,
                    [key]: value
                }
            }else{
                return obj   
            }
        })
        return newArr
    } 


    const addNewListItemInList = (e, list, setList) => {
        let newItem = {
            id: generateKey(),
            label: '',
            isNew: true
        }
        let newArr = [newItem, ...list]
        setList(newArr)
    } 

    const handleInputKeyDown = (e, itemId, list, setList) => {
        if(e.target.value?.trim() === '') return 
        if(e.which === 13){
            handleInputBlur(e, itemId, list, setList)
        }
    }
    
    const handleInputBlur = (e, itemId, list, setList) => {
        if(e.target.value?.trim() === ''){
            setList(list.filter(each => each.id !== itemId))
        }else{
            setList(updateSpecificKeyInList(list, itemId, 'isNew', false))
        }
    } 

    const handleInputChange = (e, itemId, list, setList) => {
        setList(updateSpecificKeyInList(list, itemId, 'label', e.target.value))
    } 

    const handlePromptChange = (e, itemId) => {
        let newArr = promptCardsList?.map(obj => {
            if(obj.id === itemId){
                return {
                    ...obj,
                    label: e.target.value
                }
            }
            return obj
        })
        setPromptCardsListCopy(newArr)
        // setPromptCardsList(newArr)
    } 

    const handlePromptCancelBtn = (e, itemId) => {
        if(itemId) setPromptCardsList(promptCardsList?.filter(each => each.id !== itemId))
        else setPromptCardsList(promptCardsList?.filter(each => !each.isNew))
    }
    
    const handleAddPromptBtn = (e, itemId) => {
        if(promptCardsListCopy?.find(each => each.id === itemId)?.label?.trim() === "") return
        let value = promptCardsListCopy?.find(each => each.id === itemId)?.label?.trim()
        let updatedPromptArr = updateSpecificKeyInList(promptCardsList, itemId, 'label', value)
        let closeNewPrompt = updateSpecificKeyInList(updatedPromptArr, itemId, 'isNew', false)

        setPromptCardsList(closeNewPrompt)
    }

    const handleToggleEditPromptCard = (e, itemId, isEdit) => {
        let newArr = updateSpecificKeyInList(promptCardsList, itemId, 'isEdit', isEdit)
        setPromptCardsList(newArr)
        setPromptCardsListCopy(newArr)
    }

    const handleToggleDeletePromptCard = (e, itemId, isDelete) => {
        let newArr = updateSpecificKeyInList(promptCardsList, itemId, 'isDelete', isDelete)
        setPromptCardsList(newArr)
        setPromptCardsListCopy(newArr)
    }

    const handleDeletePromptCard = (e, itemId) => {
        setPromptCardsList(promptCardsList?.filter(each => each.id !== itemId))
    }

    const handleSavePromptCard = (e, itemId) => {
        let value = promptCardsListCopy.find(each => each.id === itemId)?.label
        let updatedPromptArr = updateSpecificKeyInList(promptCardsList, itemId, 'label', value)
        let closePromptEdit = updateSpecificKeyInList(updatedPromptArr, itemId, 'isEdit', false)
        setPromptCardsList(closePromptEdit)
    }

    const styleTextWithinBrackets = (text) => {
        // Regular expression to match text within square brackets, including the brackets
        const regex = /(\[[^\]]+\])/g;
        // Replace text within brackets with styled span elements
        const styledText = text.replace(regex, '<span class="highlight-prompt-placeholder">$1</span>');
        return styledText;
    };


    return (
        <>
            <button 
                className="prompt-library-btn d-flex items-center"
                onClick={() => setShowPromptLibrary(!showPromptLibrary)}
            >
                <LibraryBooksOutlinedIcon style={{color: "#5F6368", fontSize: "22px"}} />
                Prompt library
            </button>
            {showPromptLibrary && (
                <Rodal 
                    className="prompt-library-modal" 
                    visible={showPromptLibrary} 
                    onClose={() => setShowPromptLibrary(false)}
                    showCloseButton={false}
                >
                    <div className="prompt-library-wrapper">
                        <div className="file-list-assign-manage-header d-flex justify-between items-center">
                            <h3 className="title">Prompt library</h3>
                            <span className="close-btn" onClick={() => setShowPromptLibrary(false)}>
                                <CloseIcon className="header-close"  />
                            </span>
                        </div>
                        <div className="prompt-lib-modal-body">
                            <PromptTabs />
                            <div className="prompt-container d-flex">
                                <div className="left-box">
                                    <div className="search-box d-flex items-center">
                                        <SearchOutlinedIcon style={{ color: '#5F6368' }} />
                                        <input 
                                            type="text" 
                                            className="search-input" 
                                            placeholder='Search...'
                                        />
                                    </div>
                                    {activePromptTab === 1 && (
                                        <DomainCapsuleList />
                                    )}

                                    <div className="d-flex category-list-container">
                                        <ul className="category-list custom-scroll-bar">
                                            {categoryList?.map(each => {
                                                if(each.isNew) {
                                                    return (
                                                        <li 
                                                            className={"list-item-input" + (selectedCategory === each.id ? "active" : "")}
                                                        >
                                                            <input 
                                                                type="text" 
                                                                placeholder='Category name'
                                                                autoFocus={true}
                                                                value={each.label}
                                                                onChange={(e) => handleInputChange(e, each.id, categoryList, setCategoryList)}
                                                                onKeyDown={(e) => handleInputKeyDown(e, each.id, categoryList, setCategoryList)}
                                                                onBlur={(e) => handleInputBlur(e, each.id, categoryList, setCategoryList)}
                                                            />
                                                        </li>
                                                    )
                                                }else{
                                                    return (
                                                        <li 
                                                            className={"list-item " + (selectedCategory === each.id ? "active" : "")}
                                                            onClick={() => setselectedCategory(each.id)}
                                                        >
                                                            {each.label}
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                        <ul className="sub-category-list category-list custom-scroll-bar">
                                            {subCategoryList?.map(each => {
                                                if(each.isNew){
                                                    return (
                                                        <li 
                                                            className={"list-item-input" + (selectedCategory === each.id ? "active" : "")}
                                                        >
                                                            <input 
                                                                type="text" 
                                                                placeholder='Category name'
                                                                autoFocus={true} 
                                                                value={each.label}
                                                                onChange={(e) => handleInputChange(e, each.id, subCategoryList, setSubCategoryList)}
                                                                onKeyDown={(e) => handleInputKeyDown(e, each.id, subCategoryList, setSubCategoryList)}
                                                                onBlur={(e) => handleInputBlur(e, each.id, subCategoryList, setSubCategoryList)}
                                                            />
                                                        </li>
                                                    )
                                                }
                                                return (
                                                    <li 
                                                        className={"list-item " + (selectedSubCategory == each.id ? "active" : "")}
                                                        onClick={() => setselectedSubCategory(each.id)}
                                                    >
                                                        {each.label}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    {activePromptTab === 2 && (
                                        <div className="d-flex">
                                            <button
                                                className="add-prompt-category-btn category-btn"
                                                onClick={(e) => addNewListItemInList(e, categoryList, setCategoryList)}
                                            >
                                                <AddOutlinedIcon style={{ color: '#0073DF' }} />
                                                Add category
                                            </button>
                                            <button
                                                className="add-prompt-category-btn sub-category-list"
                                                onClick={(e) => addNewListItemInList(e, subCategoryList, setSubCategoryList)}
                                            >
                                                <AddOutlinedIcon style={{ color: '#0073DF' }} />
                                                Add sub-category
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="right-box">
                                    <div className={"prompt-cards-list custom-scroll-bar " + (activePromptTab === 1 ? "prompt-cards-list-without-btn" : "prompt-cards-list-with-btn")}>
                                        {promptCardsList.map((each, ind) => {
                                            let prompt = promptCardsListCopy.find(obj => obj.id === each.id)?.label
                                            return(
                                                // <PromptCard 
                                                //     key={each.id} 
                                                //     id={each.id}
                                                //     prompt={each.label} 
                                                //     isNew={each.isNew}
                                                // />
                                                <div 
                                                    key={each.id}
                                                    className={[
                                                        "prompt-card",
                                                        (each?.isNew || each?.isEdit) && "active",
                                                        (isNewOrEditMode && !each?.isNew && !each?.isEdit) && "disable"
                                                        
                                                    ].join(' ')}
                                                >
                                                    {(each?.isNew || each?.isEdit) ? (
                                                        <textarea 
                                                            name="new-prompt"
                                                            className="prompt-textarea"
                                                            placeholder='Enter your own prompt,  utilizing [square brackets] for placeholders.'                     
                                                            rows={4}
                                                            autoFocus={true}
                                                            onChange={(e) => handlePromptChange(e, each.id)}
                                                            value={prompt}
                                                        ></textarea>
                                                    ) : (
                                                        <p className="prompt-text" dangerouslySetInnerHTML={{__html: styleTextWithinBrackets(each.label)}}>
                                                            {/* {each.label} */}
                                                            {/* Create a detailed profile for your character. Include details such as <span className="prompt-placeholder">[Name]</span>, <span className="prompt-placeholder">[Age]</span>, <span className="prompt-placeholder">[Occupation]</span>, <span className="prompt-placeholder">[Personality Traits]</span>, <span className="prompt-placeholder">[Background]</span>, and <span className="prompt-placeholder">[Goals]</span>. */}
                                                        </p>
                                                    )}
                                                    <div className="action-btn-wrapper items-center">
                                                        {each?.isNew && (
                                                            <>
                                                                <PromptButton 
                                                                    classname="simple-btn"
                                                                    onClick={(e) => handlePromptCancelBtn(e, each.id)}
                                                                >
                                                                    Cancel
                                                                </PromptButton>
                                                                <PromptButton 
                                                                    classname="prompt-primary-btn"
                                                                    onClick={(e) => handleAddPromptBtn(e, each.id)}
                                                                >
                                                                    Add prompt
                                                                </PromptButton>
                                                            </>
                                                        )}  
                                                        {each?.isEdit ? (
                                                            <>
                                                                <PromptButton 
                                                                    classname="simple-btn"
                                                                    onClick={(e) => handleToggleEditPromptCard(e, each.id, false)}
                                                                >
                                                                    Cancel
                                                                </PromptButton>
                                                                <PromptButton
                                                                    classname="prompt-primary-btn"
                                                                    onClick={(e) => handleSavePromptCard(e, each.id)}
                                                                >
                                                                    Save prompt
                                                                </PromptButton>
                                                            </>
                                                        ) : (!each?.isNew && !each?.isDelete) && (
                                                            <>
                                                                {activePromptTab === 2 && (
                                                                    <>
                                                                        <Tooltip title="Delete prompt" placement="top" arrow>
                                                                            <div 
                                                                                className="action-icon delete-bin-icon"
                                                                                onClick={(e) => handleToggleDeletePromptCard(e, each.id, true)}
                                                                            >
                                                                                <DeleteIcon />
                                                                            </div>
                                                                        </Tooltip>
                                                                        <Tooltip title="Edit prompt" placement="top" arrow>
                                                                            <div
                                                                                className="action-icon edit-icon"
                                                                                onClick={(e) => handleToggleEditPromptCard(e, each.id, true)}
                                                                            >
                                                                                <EditIcon />
                                                                            </div>
                                                                        </Tooltip>
                                                                    </>
                                                                )}
                                                                <PromptButton classname="prompt-primary-btn">
                                                                    Use prompt
                                                                </PromptButton>
                                                            </>
                                                        )}
                                                        {each.isDelete && (
                                                            <>
                                                                <PromptButton 
                                                                    classname="simple-btn"
                                                                    onClick={(e) => handleToggleDeletePromptCard(e, each.id, false)}
                                                                >
                                                                    Cancel
                                                                </PromptButton>
                                                                <PromptButton 
                                                                    classname="danger-btn"
                                                                    onClick={(e) => handleDeletePromptCard(e, each.id)}
                                                                >
                                                                    Delete prompt
                                                                </PromptButton>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {activePromptTab === 2 && (
                                        <button
                                            className="add-prompt-category-btn add-prompt-btn"
                                            onClick={(e) => addNewListItemInList(e, promptCardsList, setPromptCardsList)}
                                            style={promptCardsList?.find(each => (each?.isNew || each?.isEdit)) ? {pointerEvents: 'none', opacity: 0.5} : {}}
                                        >
                                            <AddOutlinedIcon style={{ color: '#0073DF' }} />
                                            Add prompt
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </Rodal>
            )}
        </>
    )
}
