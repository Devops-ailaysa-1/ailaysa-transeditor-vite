import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';
import Steps from './Steps';
import Config from '../../../vendor/Config';
import { useDispatch } from 'react-redux';
import { setBlogCreationResponse } from '../../../features/BlogCreationSlice';
import { useTranslation } from "react-i18next";
import BlogWizard from "../../../assets/images/blog-wizard.svg"

const BlogHeader = (props) => {
  const { setStepWizard, stepWizard, setStepWizardComplete, stepWizardComplete } = props
  const { t } = useTranslation();
  
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const closeBlogWizardButton = () => {
	dispatch(setBlogCreationResponse(null))
	history(location.state?.prevPath !== undefined ? location.state?.prevPath : '/documents-list?page=1')
  } 

  return (
    <section className="blog-header-wrapper">
        <div className="blog-inner-wrapper">
            <Link to="/documents-list?page=1" onClick={() => dispatch(setBlogCreationResponse(null))} className="blog-logo">
                <img src={BlogWizard} alt="blog wizard logo"/>
                <span>{t("blog_wizard")}</span>
            </Link>
            <div className="blog-step-wrapper">
              <Steps setStepWizard={setStepWizard} stepWizard={stepWizard} setStepWizardComplete={setStepWizardComplete} stepWizardComplete={stepWizardComplete}/>
            </div>
            <div className="blog-close" onClick={closeBlogWizardButton}>
                <ClearIcon className="clr-icon" />
            </div>
        </div>
    </section>  
  )
}

export default BlogHeader