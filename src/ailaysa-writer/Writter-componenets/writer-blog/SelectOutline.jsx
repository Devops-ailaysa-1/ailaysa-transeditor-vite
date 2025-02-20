import React, { useState, useEffect, useRef, createFactory } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Config from "../../../vendor/Config";
import { ButtonBase, Tooltip } from '@mui/material';
import { Collapse } from "reactstrap";
import { motion } from "framer-motion";
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from "../../../vendor/styles-svg/EditIcon";
import DeleteIcon from "../../../vendor/styles-svg/DeleteIcon";
import CopyIcon from "../../../vendor/styles-svg/CopyIcon";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextareaAutosize from 'react-textarea-autosize';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import generateKey from './../../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import DoubleArrow from "../../../assets/images/double_arrow.svg"

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 39,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#0078D4' : '#0078D4',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#0078D4',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 20,
      height: 20,
      boxShadow: "0px 2px 3px #00000029",
    },
    '& .MuiSwitch-track': {
      borderRadius: 24 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E6E8EB' : '#E6E8EB',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

const SelectOutline = (props) => {
    const { t } = useTranslation();
    const { 
        setStepWizard,
        stepWizard,
        setStepWizardComplete, 
        stepWizardComplete,
        blogOutlineList,
        setBlogOutlineList,
        blogOutlineGenResponseRef,
        getTotalBlogCreationObject,
        totalBlogResponseObj,
        selectIndividual,
        setSelectIndividual,
        saveBlogWizardLastStep,
        isNavigatedInternally
    } = props

    const location = useLocation();
    const history = useNavigate();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedIndividualTitle, setSelectedIndividualTitle] = useState(null);
    const [isEditItem, setIsEditItem] = useState([]);
    const [isEditIndividualItem, setIsEditIndividualItem] = useState([]);
    const [selectIndividualTitles, setSelectIndividualTitles] = useState([]);
    const [isCopied, setIsCopied] = useState(false)

    // outline step states
    const [isIndividualEditMode, setIsIndividualEditMode] = useState(false)
    const [isGroupEditMode, setIsGroupEditMode] = useState(false)
    const [outlineListCopy, setOutlineListCopy] = useState([])
    const [groupedOutlineListCopy, setGroupedOutlineListCopy] = useState([])
    const [checkedOutlineList, setCheckedOutlineList] = useState([])
    const [groupedOutlineList, setGroupedOutlineList] = useState([])

    const [showDeleteOutlineGrpModal, setShowDeleteOutlineGrpModal] = useState(false)

    const selectedOutlinesRef = useRef([])
    const unSelectedOutlinesRef = useRef([])

    const checkedOutlineListTemp = useRef([])

    const outlineReorderingRef = useRef([])
    const reorderedGroupIdRef = useRef(null)
    const groupIdToDeleteRef = useRef(null)

    const handleGenerateOutlines = () => {
        setStepWizard("generate-article")
        setStepWizardComplete(2)
    }
    
    const handleSelectedGroup = (id) => {
        setSelectedGroupId(id);
    };
    

    const handleIndividualSelectedTitle = (index) => {
        setSelectedIndividualTitle(index);
    };

    const handleTextCopy = (e, text) => {
        e.stopPropagation();
		navigator.clipboard.writeText(text)
        setIsCopied(true)
	}

    useEffect(() => {
        if(stepWizard === "select-outline"){
            setTimeout(() => {
                if(URL_SEARCH_PARAMS.get("blog")){
                    console.log(location.pathname)
                    saveBlogWizardLastStep(URL_SEARCH_PARAMS.get("blog"), window.location.pathname)
                }
            }, 500);
        }
    }, [stepWizard])

    useEffect(() => {
        let blogParam = URL_SEARCH_PARAMS.get("blog")
        if (blogParam && totalBlogResponseObj === null) {
            getTotalBlogCreationObject(blogParam)
        }
    }, [URL_SEARCH_PARAMS.get("blog")])

    
    // this will group the object that belongs to the same group | group name is the key and the value is array of objects -> groupName: [{}, {}..] 
    useEffect(() => {
        if(blogOutlineList?.length !== 0){
            let selected_list = []
            blogOutlineList?.map((each, index) => {
                if(each.selected_field) {
                    selected_list?.push(each.id)
                }
            })
            if(checkedOutlineListTemp.current?.length === 0) setCheckedOutlineList(selected_list)
            else setCheckedOutlineList(checkedOutlineListTemp.current)

            if(blogOutlineList?.find(each => each.selected_field)?.group !== undefined){
                setSelectedGroupId(blogOutlineList?.find(each => each.selected_field)?.group)
            }else{
                setSelectedGroupId(blogOutlineList?.find((each, index) => index === 0)?.group)
            }
            selectedOutlinesRef.current = selected_list
            let groupedList = blogOutlineList?.reduce((acc, d) => {
                if (Object.keys(acc).includes(d.group)) return acc;
                
                acc[d.group] = blogOutlineList?.filter(g => g.group === d.group); 
                return acc;
            }, {})
            const groupedArray = Object.entries(groupedList)?.map(([group, outlines]) => {
                return { id: group, outlines };
            });

            setGroupedOutlineList(groupedArray)
            setGroupedOutlineListCopy(groupedArray)
            // console.log(groupedArray)
        }
    }, [blogOutlineList])
    
    useEffect(() => {
      console.log(blogOutlineGenResponseRef.current);
    }, [blogOutlineGenResponseRef.current])
    
    
    const handleIndividualOutlineChange = (e, itemId) => {
        const newArr = blogOutlineList?.map(obj => {
            if (obj.id === itemId) {
                return {
                    ...obj,
                    blog_outline: e.target.value,
                };
            }
            return obj;
        });
        // console.log(newArr)
        setBlogOutlineList(newArr)
    }

    const updateIndividualOutline = (itemId, blogOutline, callAPI) => {
        let formdata = new FormData();

        if(!callAPI){
            let selected_title_obj =  totalBlogResponseObj?.blog_title_create?.find(each => each.selected_field)
            let outline_list = selected_title_obj?.blogoutline_title[0]?.blog_outline_session
            console.log(outline_list);
            console.log(outline_list?.find(each => each.id === itemId));
            const newArr = blogOutlineList?.map(obj => {
                if (obj.id === itemId) {
                    return {
                        ...obj,
                        isEdit: false,
                        blog_outline: outline_list?.find(each => each.id === itemId)?.blog_outline
                    };
                }
                return obj;
            });
            setIsIndividualEditMode(false)
            setBlogOutlineList(newArr)
            return
        }

        formdata.append("blog_outline", blogOutline);   
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/${itemId}/`, 
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                const newArr = blogOutlineList?.map(obj => {
                    if (obj.id === itemId) {
                        return {
                            ...obj,
                            isEdit: false,
                            blog_outline: blogOutline
                        };
                    }
                    return obj;
                });
                setIsIndividualEditMode(false)
                setBlogOutlineList(newArr)
            },
        });
    } 

    const handleGroupedOutlineChange = (e, groupId, itemId) => {
        const newArr = groupedOutlineList?.map(obj => {
            if (obj.id == groupId) {
                return{
                    id: groupId,
                    outlines: obj.outlines.map(outline => {
                        if(outline.id == itemId){
                            return {
                                ...outline,
                                blog_outline: e.target.value,
                            }
                        }
                        return outline;
                    })
                } 
            }
            return obj;
        });
        // console.log(newArr)
        setGroupedOutlineList(newArr)
    }

    const handleOutlineSelect = (event, outlineId) => {
        if(event.target.checked){
            checkedOutlineListTemp.current = [...checkedOutlineList, outlineId]
            setCheckedOutlineList([...checkedOutlineList, outlineId])        
        }else if(event.target.checked === false){
            let newCheckedTerms = checkedOutlineList.filter(id => id !== outlineId)
            checkedOutlineListTemp.current = newCheckedTerms
            setCheckedOutlineList(newCheckedTerms)
        }
    } 

    useEffect(() => {
        unSelectedOutlinesRef.current = selectedOutlinesRef.current.filter(o1 => !checkedOutlineList.some(o2 => o1 === o2));
    }, [checkedOutlineList])
    

    const updateSelectedOutlinesInBlog = () => {
        let formdata = new FormData();

        if(selectIndividual){   // individual outline selection
            checkedOutlineList?.map((outlineId) => {
                formdata.append("selected", outlineId);
            })
    
            if(unSelectedOutlinesRef.current?.length !== 0){
                unSelectedOutlinesRef.current?.map(outlineId => {
                    formdata.append("unselected", outlineId);
                })
            }
        }else{  // group outline section selection
            formdata.append("selected_group", selectedGroupId);
        }
        
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/${selectIndividual ? checkedOutlineList[0] : blogOutlineList[0]?.id}/`, 
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                isNavigatedInternally.current = true
                getTotalBlogCreationObject(URL_SEARCH_PARAMS.get('blog'))
                handleGenerateOutlines()
                history(`/writer-blog/generate-article${window.location.search}`, {state: {prevPath: location.state?.prevPath}})
            },
        });
    } 

    // create a new outline for a particular group
    const createNewOutline = (blog_outline) => {
        let formdata = new FormData();
        let selected_title_obj =  totalBlogResponseObj?.blog_title_create?.find(each => each.selected_field)
        formdata.append("blog_outline_gen", blogOutlineGenResponseRef.current?.id ? blogOutlineGenResponseRef.current?.id : selected_title_obj?.blogoutline_title[0].id);  
        formdata.append("blog_outline", blog_outline);  
        formdata.append("group", selectedGroupId);  
        formdata.append("blog_title", blogOutlineGenResponseRef.current?.blog_title_gen ? blogOutlineGenResponseRef.current?.blog_title_gen : selected_title_obj?.blogoutline_title[0]?.blog_title_gen);  
        
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/`, 
            method: "POST",
            data: formdata,
            auth: true,
            success: (response) => {
                // console.log(response.data)
                const newArr = [...blogOutlineList, response.data] 
                // console.log(newArr)
                setBlogOutlineList(newArr)
            },
            error: (err) => {
                
            }
        });
    } 

    // locally create a outline box for new blog outline entering the outline
    const addNewOutlineBox = (groupId) => {
        const newArr = groupedOutlineList?.map(obj => {
            if (obj.id == groupId) {
                return{
                    id: groupId,
                    outlines: [...obj.outlines, {
                        id: generateKey(),
                        group: groupId,
                        blog_outline: "",
                        blog_outline_mt: "",
                        localOutline: true
                    }]
                } 
            }
            return obj;
        });
        // console.log(newArr)
        setGroupedOutlineList(newArr)
    } 
    
    // delete the created local outline box
    const deleteLocalOutline = (e, outlineId, groupId) => {
        // console.log(outlineId)
        e.stopPropagation()
        const newArr = groupedOutlineList?.map(obj => {
            if (obj.id == groupId) {
                return{
                    id: groupId,
                    outlines: obj.outlines?.filter(each => each.id !== outlineId)
                } 
            }
            return obj;
        });
        // console.log(newArr)
        setGroupedOutlineList(newArr)
    }

    // delete group
    const deleteOutlineGroup = (groupId) => {
        if(groupedOutlineList?.length === 1){
            Config.toast(t("minimum_outline_grp_note"), 'warning')
            setShowDeleteOutlineGrpModal(false)
            return;
        }
        let selected_title_obj =  totalBlogResponseObj?.blog_title_create?.find(each => each.selected_field)
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/?blog_title=${blogOutlineGenResponseRef.current?.blog_title_gen ? blogOutlineGenResponseRef.current?.blog_title_gen : selected_title_obj?.blogoutline_title[0]?.blog_title_gen}&group=${groupId}`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                setBlogOutlineList(blogOutlineList?.filter(each => each.group != groupId))
                // console.log(response)
                setShowDeleteOutlineGrpModal(false)
            },
            error: () =>{setShowDeleteOutlineGrpModal(false)}
        });
    } 

    // delete individual
    const deleteIndividualOutline = (outlineId, groupId) => {

        if(groupId !== undefined){
            let grp = groupedOutlineList?.find(each => each.id == groupId)?.outlines
            if(grp?.length <= 4){
                Config.toast(t("minimum_outline_note"), 'warning')
                toast.clearWaitingQueue();
                return;
            }
        }else{
            // console.log(blogOutlineList?.length)
            if(blogOutlineList?.length <= 4){
                toast.clearWaitingQueue();
                Config.toast(t("minimum_outline_note"), 'warning')
                return;
            }
        }

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/${outlineId}/`,
            method: "DELETE",
            auth: true,
            success: (response) => {
                setBlogOutlineList(blogOutlineList?.filter(each => each.id != outlineId))
                // console.log(response)
            },
        });
    } 

    function handleOnDragEnd(result, groupId) {
        if (!result.destination) return;
        const items = Array.from(groupedOutlineList?.find(each => each.id == groupId)?.outlines);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const newArr = groupedOutlineList?.map(obj => {
            if (obj.id == groupId) {
                return{
                    id: groupId,
                    outlines: items
                } 
            }
            return obj;
        });
        outlineReorderingRef.current = items
        reorderedGroupIdRef.current = groupId
        setGroupedOutlineList(newArr)
    }

    useEffect(() => {
      if(outlineReorderingRef.current?.length !== 0){
        updateOutlineOrder()
      }
    }, [outlineReorderingRef.current])
    

    const updateOutlineOrder = () => {
        let formdata = new FormData();
        let reorder_list = ''
        // console.log(outlineReorderingRef.current)
        outlineReorderingRef.current?.map((each, index) => {
            reorder_list += `${each.temp_order}${
                index !== outlineReorderingRef.current.length - 1 ? "," : ""
            }`;
        });

        // console.log(reorder_list)
        
        
        formdata.append("order_list", reorder_list);
        formdata.append("group", reorderedGroupIdRef.current);
        
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogoutlinesession/${selectIndividual ? checkedOutlineList[0] : blogOutlineList[0]?.id}/`, 
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                getTotalBlogCreationObject(URL_SEARCH_PARAMS.get('blog'))
            },
        });
    } 


    return (
        <div className="blog-create-box-wrap select-outline">
            <div className="blog-create-header">
                <h1>{t("select_outline")}</h1>
                <div className="outline-select-individuals">
                    <FormGroup>
                        <FormControlLabel
                            checked={selectIndividual}
                            onChange={() => setSelectIndividual(!selectIndividual)}
                            control={<IOSSwitch sx={{ m: 1 }}/>}
                            label={t("select_individual")}
                            className="select-individual"
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="blog-create-body">
                {
                    !selectIndividual ?
                    <div className="title-lists-wrapper">
                        {
                            groupedOutlineList?.map((group) => {
                                // titlesWrapper.current = eachGroup?.titles?.map(title => `${title.title}`).join('\n');
                                return(
                                    <div key={group.id} style={(isGroupEditMode && !group?.isEdit) ? {pointerEvents: 'none'} : {}} onClick={() => handleSelectedGroup(group.id)} className={"title-list-item edit-wrap " + (selectedGroupId === group.id ? "active " : "")}>
                                        <div className="radio-btn-wrap">
                                            <Radio
                                                checked={selectedGroupId == group.id}
                                                onChange={() => handleSelectedGroup(group.id)}
                                                name="title-radio-button"
                                                inputProps={{ 'aria-label': group.id }}
                                                size="small"
                                            />
                                        </div>
                                        <div className="title-info-main-wrap outline-lists">
                                            <div className="title-info-wrap">
                                                <DragDropContext onDragEnd={(e) => handleOnDragEnd(e, group.id)}>
                                                    <Droppable droppableId="characters">
                                                        {(provided) => (
                                                            <ol className="edited-titles-list" {...provided.droppableProps} ref={provided.innerRef}>
                                                                {
                                                                    group?.outlines?.map((outline, index) => {
                                                                        return(
                                                                            <Draggable key={outline.id} draggableId={outline?.id?.toString()} index={index}>
                                                                                {(provided) => (
                                                                                    <li ref={provided.innerRef} {...provided.draggableProps}>
                                                                                        <div className="drag-ui" {...provided.dragHandleProps}>
                                                                                            <DragIndicatorIcon className="drag-icon" />
                                                                                        </div>
                                                                                        <div className="inner-row" draggable>
                                                                                            <TextareaAutosize
                                                                                                value={outline.blog_outline}
                                                                                                onChange={(e) => handleGroupedOutlineChange(e, group?.id, outline?.id)}
                                                                                                maxLength={200}
                                                                                                onBlur={(e) => {
                                                                                                    e.target.value?.trim() !== '' ? (outline?.localOutline ? createNewOutline(e.target.value) : updateIndividualOutline(outline?.id, outline.blog_outline, true))
                                                                                                    : !outline?.localOutline && updateIndividualOutline(outline?.id, outline.blog_outline, false)
                                                                                                }}
                                                                                                // value={outlineListCopy?.find(each => each.id === outline?.id)?.blog_outline}
                                                                                            />
                                                                                            {/* <input 
                                                                                                value={groupedOutlineListCopy?.find(eachGrp => eachGrp.id == group?.id)?.outlines?.find(each => each.id == outline?.id)?.blog_outline} 
                                                                                                onChange={(e) => handleGroupedOutlineChange(e, group?.id, outline?.id)} 
                                                                                            /> */}
                                                                                            <div className="tools-box delet-icon" onClick={(e) => {outline?.localOutline ? deleteLocalOutline(e, outline.id, group?.id) : deleteIndividualOutline(outline?.id, group.id)}}>
                                                                                                <DeleteIcon style="deleteIcon" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                )}
                                                                            </Draggable>
                                                                        )
                                                                    })
                                                                }
                                                                {provided.placeholder}
                                                            </ol>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                                {/* { !group?.isEdit && <span className="capsule-card">{`${group.title?.split(" ").length} words / ${titleItem.title?.length} characters`}</span>} */}
                                            </div>
                                            <div className="title-info-tools">
                                                <div className="outline-tool-box-wrapper">
                                                    <div className="add-outline-box" onClick={() => addNewOutlineBox(group.id)}>
                                                        <span className="add-outline-link">
                                                            <AddCircleOutlineOutlinedIcon className="add-icon" /> 
                                                            {t("add_outline")}
                                                        </span>
                                                    </div>
                                                    <Tooltip title={t("delete")} placement="top" arrow>
                                                        <div className="tools-box" onClick={() => {groupIdToDeleteRef.current = group?.id; setShowDeleteOutlineGrpModal(true);}}>
                                                            <DeleteIcon style="deleteIcon"/>
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className="title-lists-wrapper">
                        {
                            blogOutlineList?.map((outline, index) => {
                                return(
                                    <label key={outline.id} htmlFor={`outline-${outline?.id}`} style={(isIndividualEditMode && !outline?.isEdit) ? {pointerEvents: 'none'} : {}} onClick={() => handleIndividualSelectedTitle(index)} className={"title-list-item " + (checkedOutlineList?.find(each => each === outline?.id) ? "active " : "") + (isEditIndividualItem[index] ? "edit-wrap" : "")}>
                                        <div className="radio-btn-wrap">
                                            <Checkbox 
                                                checked={checkedOutlineList?.find(each => each === outline?.id) ? true : false}
                                                onChange={(e) => handleOutlineSelect(e, outline.id)}
                                                name="title-radio-button"
                                                inputProps={{ 'aria-label': outline.id }}
                                                size="small" 
                                                id={`outline-${outline?.id}`}
                                            />
                                        </div>
                                        <div className="title-info-main-wrap">
                                            <div className="title-info-wrap">
                                                {
                                                    <>
                                                        <TextareaAutosize
                                                            className="editable-title"
                                                            value={outline.blog_outline}
                                                            onChange={(e) => handleIndividualOutlineChange(e, outline.id)}
                                                            maxLength={200}
                                                            onBlur={(e) => updateIndividualOutline(outline?.id, outline.blog_outline)}
                                                            // value={outlineListCopy?.find(each => each.id === outline?.id)?.blog_outline}
                                                        />
                                                        <div className="d-flex justify-content-end">
                                                            {/* <span className="capsule-card">{`${outline.blog_outline?.trim()?.split(" ").length} words / ${outline.blog_outline?.length} characters`}</span> */}
                                                            <div className="text-end">
                                                                <small style={{opacity: 0.7}}>{outline.blog_outline?.length}/200</small>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                            <div className="title-info-tools">
                                                <Tooltip title={isCopied ? t("txt_copied") : t("copy")} placement="top" arrow>
                                                    <div className="tools-box" onMouseLeave={() => setTimeout(() => {setIsCopied(false)}, 300)} onClick={(e) => {e.preventDefault(); handleTextCopy(e, outline.blog_outline);}}>
                                                        <CopyIcon style="copy-icon"/>
                                                    </div>
                                                </Tooltip>
                                                <Tooltip title={t("delete")} placement="top" arrow>
                                                    <div className="tools-box" onClick={() => deleteIndividualOutline(outline?.id)}>
                                                        <DeleteIcon style="deleteIcon"/>
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })
                        }
                    </div>
                }
                <div className="blog-form-button-wrap" style={selectIndividual ? {justifyContent: 'space-between'} : {}}>
                    {
                        selectIndividual && (
                            <span className="note-content">
                                <ErrorOutlineOutlinedIcon className="imp-icon" />
                                Select at least 4 outlines
                            </span>
                        )
                    }
                    {/* Enable the next button only any one of the group is selected or at least 4 outlines are selected */}
                    <ButtonBase
                        className="generate-blog-btn-2"
                        onClick={() =>(!selectIndividual ? selectedGroupId != null : checkedOutlineList?.length >= 4) ? updateSelectedOutlinesInBlog() : Config.toast(t("select_at_least_4_outlines_to_cont"), 'warning')}
                        style={(!selectIndividual ? selectedGroupId == null : checkedOutlineList?.length < 4) ? {opacity: 0.7} : {}}
                    >
                        <span>{t("next")}</span>
                        <span><img src={DoubleArrow} /></span>
                    </ButtonBase>
                </div>
            </div>
            {showDeleteOutlineGrpModal && (<Rodal
                visible={showDeleteOutlineGrpModal}
                width={784}
                onClose={() => console.log()}
                showCloseButton={false}
                className="ai-mark-confirm-box"
            >
                <div className="confirmation-warning-wrapper doc-writter-delete-icon-list">
                    <div className="confirm-top">
                        <div><span onClick={() =>{setShowDeleteOutlineGrpModal(false)}}><CloseIcon/></span></div>
                        <div>{t("are_you_sure")}</div>
                        <div>{t("all_outlines_deleted_permanently")}</div>
                    </div>
                    <div className="confirm-bottom">
                        <div>
                            <Button onClick={() =>{setShowDeleteOutlineGrpModal(false)}}>{t("discard")}</Button>
                            <Button onClick={() => deleteOutlineGroup(groupIdToDeleteRef.current)} variant="contained">{t("delete")}</Button>
                        </div>
                    </div>
                </div>
            </Rodal>)}
        </div>
    )
}

export default SelectOutline