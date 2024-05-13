import React, { useState } from 'react'
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
export const PromptLibraryModal = () => {

    const [showPromptLibrary, setShowPromptLibrary] = useState(true)
    const [activePromptTab, setActivePromptTab] = useState(1)
    const [selectedDomain, setSelectedDomain] = useState(1)
    const [selectedCategory, setselectedCategory] = useState(1)
    const [selectedSubCategory, setselectedSubCategory] = useState(1)

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
        let {key} = props
        return (
            <div key={key} className="prompt-card">
                <p className="prompt-text">
                    Create a detailed profile for your character. Include details such as <span className="prompt-placeholder">[Name]</span>, <span className="prompt-placeholder">[Age]</span>, <span className="prompt-placeholder">[Occupation]</span>, <span className="prompt-placeholder">[Personality Traits]</span>, <span className="prompt-placeholder">[Background]</span>, and <span className="prompt-placeholder">[Goals]</span>.
                </p>
                <div className="action-btn-wrapper items-center">
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
                    <PromptButton classname="simple-btn">
                        Add prompt
                    </PromptButton>
                    <PromptButton classname="simple-btn">
                        Cancel
                    </PromptButton>
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


    const handleAddCategoryBtn = (e) => {
        
    } 
    
    const handleAddSubCategoryBtn = (e) => {

    } 

    return (
        <>
            <Rodal 
                className="prompt-library-modal" 
                visible={showPromptLibrary} 
                onClose={() => setShowPromptLibrary(false)}
                showCloseButton={false}
            >
                <div className="prompt-library-wrapper">
                    <div className="file-list-assign-manage-header d-flex justify-between items-center">
                        <h3 className="title">Prompt library</h3>
                        <span className="close-btn" onClick={() => setShowIndividualAssignManage(false)}>
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
                                        {Array(10).fill(null).map((each, ind) => {
                                            return (
                                                <>
                                                    <li className="list-item active">Fiction Writing</li>
                                                    <li className="list-item">Non-Fiction</li>
                                                    <li className="list-item">Poetry</li>
                                                    <li className="list-item">Screen</li>
                                                    <li className="list-item">Fiction Writing</li>
                                                    <li className="list-item">Non-Fiction</li>
                                                    <li className="list-item">Fiction Writing</li>
                                                    <li className="list-item">Non-Fiction</li>
                                                </>
                                            )
                                        })}
                                    </ul>
                                    <ul className="sub-category-list category-list custom-scroll-bar">
                                        <li className="list-item">Character Development</li>
                                        <li className="list-item">Plot Structure</li>
                                        <li className="list-item">Dialogue Techniques</li>
                                    </ul>
                                </div>
                                {activePromptTab === 2 && (
                                    <div className="d-flex">
                                        <button
                                            className="add-prompt-category-btn category-btn"
                                            onClick={handleAddCategoryBtn}
                                        >
                                            <AddOutlinedIcon style={{ color: '#0073DF' }} />
                                            Add category
                                        </button>
                                        <button
                                            className="add-prompt-category-btn sub-category-list"
                                            onClick={handleAddSubCategoryBtn}
                                        >
                                            <AddOutlinedIcon style={{ color: '#0073DF' }} />
                                            Add sub-category
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="right-box">
                                <div className={"prompt-cards-list custom-scroll-bar " + (activePromptTab === 1 ? "prompt-cards-list-without-btn" : "prompt-cards-list-with-btn")}>
                                    {Array(10).fill(null).map((each, ind) => {
                                        return(
                                            <PromptCard key={ind} />
                                        )
                                    })}
                                </div>
                                {activePromptTab === 2 && (
                                    <button
                                        className="add-prompt-category-btn add-prompt-btn"
                                        onClick={handleAddCategoryBtn}
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
        </>
    )
}
