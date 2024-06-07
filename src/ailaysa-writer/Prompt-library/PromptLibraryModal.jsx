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
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import generateKey from '../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import NoEditorsFoundTwo from "../../assets/images/no-editors-found-2.svg"
import { MoreMenu } from './MoreMenu';
import Config from '../../vendor/Config';

export const PromptLibraryModal = (props) => {
    let {contenteditableRef, toggleState} = props

    const [showPromptLibrary, setShowPromptLibrary] = useState(true)
    const [activePromptTab, setActivePromptTab] = useState(1)
    const [selectedDomain, setSelectedDomain] = useState(1)
    const [selectedCategory, setselectedCategory] = useState(1)
    const [selectedSubCategory, setselectedSubCategory] = useState(1)
    const [isNewOrEditMode, setIsNewOrEditMode] = useState(false)
    const [searchQueryText, setSearchQueryText] = useState("")

    let promptCardsListInit = [
        {
            id: 1,
            prompt_content: `Create a detailed profile for your character. Include details such as [Name], [Age], [Occupation], [Personality Traits], [Background], and [Goals].`
        },
        {
            id: 2,
            prompt_content: `Create a detailed profile for your character. Include details such as [Name], [Age], [Occupation], [Personality Traits], [Background], and [Goals].`
        },
        {
            id: 3,
            prompt_content: `Create a detailed profile for your character. Include details such as [Name], [Age], [Occupation], [Personality Traits], [Background], and [Goals].`
        },
    ]

    const [domainList, setDomainList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [promptCardsList, setPromptCardsList] = useState([])
    const [promptCardsListCopy, setPromptCardsListCopy] = useState([])
    const [promptSearchResList, setPromptSearchResList] = useState(null)
    
    const promptSystemValueRef = useRef([])
    const promptCardsContainerRef = useRef(null)
    const axiosGetPromptCardsAbortControllerRef = useRef(null)


    // get all system values on component load
    useEffect(() => {
        getPromptLibSysValues()
    }, [])

    // based on selected domain set category list and select first category
    useEffect(() => {
        if(selectedDomain && promptSystemValueRef.current?.length !== 0) {
            let domain = promptSystemValueRef.current?.find(each => each.id === selectedDomain)
            let category = domain.domain_category?.map(each => (
                {id: each.id, name: each.category_name}
            ))
            setCategoryList(category)
            try { setselectedCategory(category[0]?.id) }
            catch(err){ console.log(err) }
        }
    }, [selectedDomain, promptSystemValueRef.current])

    // based on selected category set sub-category list and select first sub-category
    useEffect(() => {
        if(selectedCategory && promptSystemValueRef.current?.length !== 0) {
            let domain = promptSystemValueRef.current?.find(each => each.id === selectedDomain)?.domain_category
            let category = domain?.find(each => each.id === selectedCategory)
            let subCategorys = category?.cat_subcategories?.map(each => (
                {id: each.id, name: each.sub_category_name}
            )) 
            setSubCategoryList(subCategorys)
            try { setselectedSubCategory(subCategorys[0]?.id) }
            catch(err) { console.log(err) }
        }
    }, [selectedCategory, promptSystemValueRef.current])

    // based on sub-cateogry call getPromptsForSubcategory() method to get all prompts
    useEffect(() => {
        if(selectedSubCategory && promptSystemValueRef.current?.length !== 0){
            if(searchQueryText.trim() === "") {
                getPromptsForSubcategory(selectedSubCategory)
            }
        }
    }, [selectedSubCategory, promptSystemValueRef.current, searchQueryText])

    useEffect(() => {
        if(activePromptTab === 1) {
            
        }
    }, [activePromptTab])
    
    
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
                    {domainList?.map(domain => {
                        return (
                            <SwiperSlide key={domain?.id}>
                                <div 
                                    className={"domain-capsule " + (selectedDomain === domain?.id ? 'active' : "")} 
                                    onClick={() => setSelectedDomain(domain?.id)}
                                >
                                    {domain?.name}
                                </div>
                            </SwiperSlide>
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
                                    <DeleteOutlinedIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title="Edit prompt" placement="top" arrow>
                                <div className="action-icon edit-icon">
                                    <ModeEditOutlinedIcon />
                                </div>
                            </Tooltip>
                            <PromptButton
                                classname="prompt-primary-btn" 
                                onClick={() => handleUsePromptBtn(each.prompt_content)}
                            >
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

    const getPromptLibSysValues = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/domain-prompt-library`,
            auth: true,
            success: (response) => {
                promptSystemValueRef.current = response.data
                let domains = response.data?.map(each => (
                    {id: each.id, name: each.name}
                ))
                setDomainList(domains)
            },
        });
    }

    const getPromptsForSubcategory = (id) => {
        if(!id) return  // fallback

        // it will abort/cancel the ongoing api request
        if (axiosGetPromptCardsAbortControllerRef.current) {
            axiosGetPromptCardsAbortControllerRef.current.abort()
        }
    
        const controller = new AbortController();
        axiosGetPromptCardsAbortControllerRef.current = controller

        Config.axios({
            url: `${Config.BASE_URL}/app/prompt-library?sub_category_id=${id}`,
            auth: true,
            ...(controller !== undefined && {signal: controller.signal}),
            success: (response) => {
                promptCardsContainerRef.current?.scrollTo({top: 0})
                setPromptCardsList(response.data)
                setPromptCardsListCopy(response.data)
            },
        });
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


    const addNewListItemInList = (e, list, setList, key) => {
        let newItem = {
            id: generateKey(),
            prompt_content: '',
            [key]: true
        }
        console.log(list)
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
        console.log(e.target.value)
        if(e.target.value?.trim() === ''){
            setList(list.filter(each => each.id !== itemId))
        }else{
            setList(updateSpecificKeyInList(list, itemId, 'isEditable', false))
        }
    } 

    const handleInputChange = (e, itemId, list, setList) => {
        setList(updateSpecificKeyInList(list, itemId, 'name', e.target.value))
    } 

    const handlePromptChange = (e, itemId) => {
        let newArr = promptCardsList?.map(obj => {
            if(obj.id === itemId){
                return {
                    ...obj,
                    prompt_content: e.target.value
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
        if(promptCardsListCopy?.find(each => each.id === itemId)?.prompt_content?.trim() === "") return
        let value = promptCardsListCopy?.find(each => each.id === itemId)?.prompt_content?.trim()
        let updatedPromptArr = updateSpecificKeyInList(promptCardsList, itemId, 'prompt_content', value)
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
        let value = promptCardsListCopy.find(each => each.id === itemId)?.prompt_content
        let updatedPromptArr = updateSpecificKeyInList(promptCardsList, itemId, 'prompt_content', value)
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

    const initialText = `
    Using the 'Attention-Interest-Desire-Action' framework, write an email marketing
    campaign that highlights the <span class="placeholder" >[features]</span>
    of our <span class="placeholder" >[product/service]</span> and explains how these
    <span class="placeholder" >[advantages]</span> can be helpful to
    <span class="placeholder" >[ideal customer persona]</span>.
    Elaborate on the <span class="placeholder" >[benefits]</span> of our product and how it can positively impact the reader.
    `;

    useEffect(() => {
        // Add click event listener to placeholders
        const placeholders = document.querySelectorAll('.placeholder');
        placeholders.forEach((placeholder) => {
          placeholder.addEventListener('click', handlePlaceholderClick);
        });
    
        // Cleanup event listeners on component unmount
        return () => {
          placeholders.forEach((placeholder) => {
            placeholder.removeEventListener('click', handlePlaceholderClick);
          });
        };
    }, [initialText]);

    const handlePlaceholderClick = (evt) => {
        const range = document.createRange();
        range.selectNodeContents(evt.target);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const replacePlaceholders = (text) => {
        return text.replace(/\[(.*?)\]/g, '<span class="placeholder">[$1]</span>');
    };

    const handleUsePromptBtn = (prompt_content) => {
        toggleState()
        contenteditableRef.current.innerHTML = replacePlaceholders(prompt_content)
        setShowPromptLibrary(false)
    } 


    const handleSearchPromptChange = (e) => {
        let value = e.target.value
        setSearchQueryText(value)

        if(value?.trim() === '') return
        
        Config.debounceApiCalls(async() => {
            // get prompt search results  
            Config.axios({
                url: `${Config.BASE_URL}/app/prompt-library?search=${value}`,
                auth: true,
                success: (response) => {
                    setPromptCardsList(response.data)
                    setPromptCardsListCopy(response.data)
                },
            });
        })
    } 


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
                            <div className="tab-and-search-wrapper d-flex items-center">
                                <PromptTabs />
                                <div className="search-box d-flex items-center">
                                    <SearchOutlinedIcon style={{ color: '#5F6368' }} />
                                    <input 
                                        type="text" 
                                        className="search-input" 
                                        placeholder='Search...'
                                        value={searchQueryText}
                                        onChange={handleSearchPromptChange}
                                    />
                                    {searchQueryText !== "" && (
                                        <IconButton className="p-1" onClick={(e) => setSearchQueryText("")}>
                                            <CloseIcon style={{fontSize: '20px'}} />
                                        </IconButton>
                                    )}
                                </div>
                            </div>
                            <div className="prompt-container d-flex">
                                <div 
                                    className="left-box"
                                    style={
                                        searchQueryText !== "" ? {display: 'none'} : {}
                                    }
                                >
                                    
                                    {activePromptTab === 1 && (
                                        <DomainCapsuleList />
                                    )}

                                    <div className="d-flex category-list-container">
                                        <ul className="category-list custom-scroll-bar">
                                            {categoryList?.map(category => {
                                                if(category?.isEditable) {
                                                    return (
                                                        <li 
                                                            className={"list-item-input " + (selectedCategory === category.id ? "active" : "")}
                                                        >
                                                            <input 
                                                                type="text" 
                                                                placeholder='Category name'
                                                                autoFocus={true}
                                                                value={category.name}
                                                                onChange={(e) => handleInputChange(e, category.id, categoryList, setCategoryList)}
                                                                onKeyDown={(e) => handleInputKeyDown(e, category.id, categoryList, setCategoryList)}
                                                                onBlur={(e) => handleInputBlur(e, category.id, categoryList, setCategoryList)}
                                                            />
                                                        </li>
                                                    )
                                                }else{
                                                    return (
                                                        <li 
                                                            className={"list-item d-flex items-center justify-between " + (selectedCategory === category.id ? "active" : "")}
                                                            onClick={() => setselectedCategory(category.id)}
                                                        >
                                                            {category.name}
                                                            {activePromptTab === 2 && (
                                                                <MoreMenu 
                                                                    item={category} 
                                                                    updateSpecificKeyInList={updateSpecificKeyInList}
                                                                    list={categoryList}
                                                                    setList={setCategoryList}
                                                                />
                                                            )}
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                        <ul className="sub-category-list category-list custom-scroll-bar">
                                            {subCategoryList?.map(subCategory => {
                                                if(subCategory?.isEditable){
                                                    return (
                                                        <li 
                                                            className={"list-item-input " + (selectedSubCategory === subCategory.id ? "active" : "")}
                                                        >
                                                            <input 
                                                                type="text" 
                                                                placeholder='Category name'
                                                                autoFocus={true} 
                                                                value={subCategory.name}
                                                                onChange={(e) => handleInputChange(e, subCategory.id, subCategoryList, setSubCategoryList)}
                                                                onKeyDown={(e) => handleInputKeyDown(e, subCategory.id, subCategoryList, setSubCategoryList)}
                                                                onBlur={(e) => handleInputBlur(e, subCategory.id, subCategoryList, setSubCategoryList)}
                                                            />
                                                        </li>
                                                    )
                                                }
                                                return (
                                                    <li 
                                                        className={"list-item d-flex items-center justify-between " + (selectedSubCategory == subCategory.id ? "active" : "")}
                                                        onClick={() => setselectedSubCategory(subCategory.id)}
                                                    >
                                                        {subCategory.name}
                                                        {activePromptTab === 2 && (
                                                            <MoreMenu 
                                                                item={subCategory}
                                                                updateSpecificKeyInList={updateSpecificKeyInList}
                                                                list={subCategoryList}
                                                                setList={setSubCategoryList} 
                                                            />
                                                        )}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    {activePromptTab === 2 && (
                                        <div className="d-flex">
                                            <button
                                                className="add-prompt-category-btn category-btn"
                                                onClick={(e) => addNewListItemInList(e, categoryList, setCategoryList, 'isEditable')}
                                            >
                                                <AddOutlinedIcon style={{ color: '#0073DF' }} />
                                                Add category
                                            </button>
                                            <button
                                                className="add-prompt-category-btn sub-category-list"
                                                onClick={(e) => addNewListItemInList(e, subCategoryList, setSubCategoryList, 'isEditable')}
                                            >
                                                <AddOutlinedIcon style={{ color: '#0073DF' }} />
                                                Add sub-category
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div 
                                    className="right-box"
                                    style={
                                        searchQueryText !== "" ? {width: '100%'} : {}
                                    } 
                                >

                                    <div
                                        ref={promptCardsContainerRef} 
                                        className={"prompt-cards-list custom-scroll-bar " + (activePromptTab === 1 ? "prompt-cards-list-without-btn" : "prompt-cards-list-with-btn")}
                                    >
                                        {promptCardsList.map((each, ind) => {
                                            let prompt = promptCardsListCopy.find(obj => obj.id === each.id)?.prompt_content
                                            return(
                                                // <PromptCard 
                                                //     key={each.id} 
                                                //     id={each.id}
                                                //     prompt={each.prompt_content} 
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
                                                        <p className="prompt-text" dangerouslySetInnerHTML={{__html: styleTextWithinBrackets(each.prompt_content)}}>
                                                            {/* {each.prompt_content} */}
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
                                                                                <DeleteOutlinedIcon />
                                                                            </div>
                                                                        </Tooltip>
                                                                        <Tooltip title="Edit prompt" placement="top" arrow>
                                                                            <div
                                                                                className="action-icon edit-icon"
                                                                                onClick={(e) => handleToggleEditPromptCard(e, each.id, true)}
                                                                            >
                                                                                <ModeEditOutlinedIcon />
                                                                            </div>
                                                                        </Tooltip>
                                                                    </>
                                                                )}
                                                                <PromptButton
                                                                    classname="prompt-primary-btn" 
                                                                    onClick={() => handleUsePromptBtn(each.prompt_content)}
                                                                >
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
                                        {(searchQueryText.trim() !== "" && promptCardsList.length === 0) && (
                                            <div className="d-flex items-center justify-center items-center" style={{height: '100%'}}>
                                                <div>
                                                    <img 
                                                        src={NoEditorsFoundTwo} 
                                                        style={{margin: '0px auto', display: 'block'}} 
                                                        className='mb-4'
                                                        alt="no search found" 
                                                        width={86}
                                                    />
                                                    <p style={{textAlign: 'center'}}><b>No prompts found</b></p>
                                                    <p style={{textAlign: 'center'}}>
                                                        We couldn't find any prompts matching your search. <br />Please try using other keywords or phrases.
                                                    </p>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {(activePromptTab === 2 && searchQueryText === "") && (
                                        <button
                                            className="add-prompt-category-btn add-prompt-btn"
                                            onClick={(e) => addNewListItemInList(e, promptCardsList, setPromptCardsList, 'isNew')}
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
