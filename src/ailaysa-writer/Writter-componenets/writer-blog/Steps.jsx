import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


const Steps = (props) => {
    const { setStepWizard, stepWizard, setStepWizardComplete, stepWizardComplete} = props

    const blogCreationResponse = useSelector((state) => state.blogCreationRes.value)
    const { t } = useTranslation();

    const location = useLocation();
    const history = useNavigate()

    const handleWizardSwitch = (steps) => {
        setStepWizard(steps)
        history(`/writer-blog/${steps}${window.location.search}`)
        
    }

    return (
        <div className="steps-number-wrapper">
            <div className="steps" onClick={() => handleWizardSwitch("create-title")}>
                <div className={"steps-inner " + (stepWizard === "create-title" ? "active " : "") + ((stepWizardComplete === 1 || stepWizardComplete === 2 || stepWizardComplete === 3) ? "complete" : "")}>
                    <div className="number">
                    {
                        (stepWizardComplete === 1 || stepWizardComplete === 2 || stepWizardComplete === 3) ?
                            <DoneIcon className="completed" />
                        :
                            1
                    }    
                    </div>            
                    <span className="title">{t("blog_title")}</span>
                </div>
            </div>
            <div className={"steps " + (blogCreationResponse?.blog_title_create?.find(each => each.selected_field) ? "" : "disable")} onClick={() => handleWizardSwitch("select-outline")}>
                <div className={"steps-inner " + (stepWizard === "select-outline" ? "active " : "") + (stepWizardComplete === 2 || stepWizardComplete === 3 ? "complete" : "")}>
                    <div className="number">
                    {
                        (stepWizardComplete === 2 || stepWizardComplete === 3) ?
                            <DoneIcon className="completed" />
                        :
                            2
                    }
                    </div>            
                    <span className="title">{t("select_outline")}</span>
                </div>
            </div>
            <div className={"steps " + (blogCreationResponse?.blog_title_create?.find(each => each.selected_field)?.blogoutline_title[0].blog_outline_session?.find(each => each.selected_field) ? "" : "disable")} onClick={() => handleWizardSwitch("generate-article")}>
                <div className={"steps-inner " + (stepWizard === "generate-article" ? "active " : "") + (stepWizardComplete === 3 ? "complete" : "")}>
                    <div className="number">
                    {
                        stepWizardComplete === 3 ?
                            <DoneIcon className="completed"/>
                        :
                            3
                    }
                    </div>            
                    <span className="title">{t("generate_blog")}</span>
                </div>
            </div>
        </div>
    )
}

export default Steps