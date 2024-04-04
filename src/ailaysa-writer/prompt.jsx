import React, { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next";


export const Prompt = () => {
    const { t } = useTranslation();

    const [step,setStep] = useState(1)

    const [processStep,setProcessstep] = useState(1)



    const prevstep =()=>{
        if(step > 1 )setStep(current=>current-1) 
    }
    const nextstep =()=>{ 
        if(step < processStep ) setStep(current=>current+1) 
    }
   


  
  return <>
        <div className="blog_generator">
            <div className="blog_form">
               <div className="blog_stage">
               { step == 1 && <div className="input_form">
                    {t("topic")}
                    <input type="text" />
                    <span>{t("submit")}</span>
                </div>}
                {step != 1 && <div className="input_form">
                    <p className="labels">{t("topic")}</p>
                    <p className="labels">{t("keywords")}</p>
                    <p className="labels">{t("idea")}</p>
                    <p className="labels">{t("headlines")}</p>
                </div>}                
               </div>
               {processStep == 4 &&  step != 1 && <p><span>{t("generate")}</span></p>}
            </div>
            <div className="blog_generator_box">
            {step == 1 && <div className="blog_stage stage_one">
                {t("keywords_list")}  
            </div>}
            {step == 2 && <div className="blog_stage  stage_two">
                {t("idea_list")}    
            </div>}
            {step == 3 && <div className="blog_stage  stage_three">
                {t("headlines_list")} 
            </div>}
            {step == 4 && <div className="blog_stage  stage_four">
                {t("blog")}
                <span onClick={()=>{setProcessstep(4)}}>{t("click")}</span>
            </div>}
            
            <p className="stage_change_step_btn_parent">
                <span className="stage_change_step_btn" style={{opacity:step == 1 ? 0.5 : 1 }} onClick={prevstep}>{t("prev")}</span>
                <span className="stage_change_step_btn" onClick={nextstep} style={{opacity:step == 4 ? 0.5 : 1 }}>{t("next")}</span>
            </p>
            </div>
        </div>
  </>
}

// export  Prompt;