import React, { useState, useEffect, createRef, useRef } from "react";
import ProjectSetup from '../project-setup-components/ProjectSetup'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector, useDispatch } from "react-redux";
import { setShowGlobalTransition } from "../features/GlobalTransitionSlice";
import { useNavigate, useLocation, useParams} from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
 

const AllTemplateMain = ({ children }) => {
    const { t } = useTranslation();
    let params = useParams();
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const showGlobalTransition = useSelector((state) => state.globalTransition.value)
    const [backToTemplate, setBackToTemplate] = useState(false)
    const [templateHeaderHide, setTemplateHeaderHide] = useState(false)
    const prevPathRef = useRef(null)


    // useEffect(() => {
    //     setTimeout(() => {
    //         history("/create/all-templates/writing");
    //     }, 250);
    // }, [])

    useEffect(() => {
        if(!window.location.pathname.includes("all-templates")){
            setBackToTemplate(true)
        } else{
            setBackToTemplate(false)
        }
        if (location.state?.prevPath){
            prevPathRef.current = location.state.prevPath
        }
    }, [window.location.pathname, location.state])
    

    const handleCloseAllTemplates = () => {
        dispatch(setShowGlobalTransition(false))
        setTimeout(() => {
            if(prevPathRef.current === "/file-upload"){
                history("/file-upload?page=1&order_by=-id")
            } else{
                history('/')
            }
        }, 250);
    }
    
    // useEffect(() => {
    //     if(window.location.pathname.includes("word-processor")){
    //         setTemplateHeaderHide(true)
    //     } else{
    //         setTemplateHeaderHide(false)
    //     }
    // }, [window.location.pathname])

    // useEffect(() => {
    //   console.log(location.state?.prevPath)
    //   console.log(prevPathRef.current)
    // }, [location.state])
    

  return (
        <>
            {!templateHeaderHide ? <Navbar /> : ""}
            {children}
            {/* <AnimatePresence>
                    <motion.div
                        key="global-project-setup"
                        initial={{ x : "-100%" }}
                        animate={{ x : 0 }}
                        exit={{ x : "100%", transition: { duration: 0.25 }}}
                        transition={{ type: 'linear', duration: 0.25, ease: 'easeInOut' }}
                        className={"global-project-setup-wrapper " + (templateHeaderHide ? "writer-project-setup-wrap" : "")}
                    >
                        <div 
                            className="global-project-setup-wrapper__inner-wrapper"
                        >
                            <div className={"global-project-setup-header " + (templateHeaderHide ? "writer-header-hide" : "")}>
                                <div className={"global-project-setup-header__back-btn " + (backToTemplate ? "global-project-setup-header__back-btn--visible" : "")} onClick={() => { history("/create/all-templates/writing"); }}>
                                    <span className="global-project-setup-header__back-btn__icon">
                                        <KeyboardBackspaceIcon className="global-project-setup-header__back-btn__icon__style"/>
                                    </span>
                                    <p className="global-project-setup-header__back-btn__text">{t("back_to_all_templates")}</p>
                                </div>
                                <div className="global-project-setup-header__close-btn" onClick={() => handleCloseAllTemplates()}>
                                    <CloseIcon className="global-project-setup-header__close-btn__icon"/>
                                </div>
                            </div>
                            {children}
                        </div>
                    </motion.div>
            </AnimatePresence> */}
        </>
  )
}

export default AllTemplateMain