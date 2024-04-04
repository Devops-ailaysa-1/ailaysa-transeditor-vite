import React, { useState, useEffect } from "react";
import { ButtonBase } from "@mui/material";
import Radio from '@mui/material/Radio';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Config from "../Config";
import { useTranslation } from "react-i18next";
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"

export const POFilesModal = (props) => {

    let {
        showPOFilesModal,
        setShowPOFilesModal,
        POFilesDetails
    } = props

    const [assignStep, setAssignStep] = useState(1)
    const [tabValue, setTabValue] = useState(1)
    const [payableData, setPayableData] = useState(null)
    const [receivableData, setReceivableData] = useState(null)
    const [payablePdf, setPayablePdf] = useState(null)
    const [receivablePdf, setReceivablePdf] = useState(null)
    
    const { t } = useTranslation();


    const StepButtons = (props) => {
        let {payable, receivable} = props

        return (
            <div className="job-assign-member-select-wrap">
                {(payable ? payableData : receivableData)?.find(each => each?.assignment?.step === 1) && (
                    <ButtonBase className={"assign-manage-radio-btn " + (assignStep === 1 ? "selected" : "")} onClick={() => setAssignStep(1)}>
                        <Radio
                            checked={assignStep === 1}
                            size="small"
                            value={assignStep}
                            onChange={() => setAssignStep(1)}
                        />
                        <p className="label">{t("editor")}</p>
                    </ButtonBase>
                )}
                {(payable ? payableData : receivableData)?.find(each => each?.assignment?.step === 2) && (
                    <ButtonBase
                        className={"assign-manage-radio-btn " + (assignStep === 2 ? "selected" : "")}
                        onClick={() => setAssignStep(2)}
                    >
                        <Radio
                            checked={assignStep === 2}
                            size="small"
                            value={assignStep}
                            onChange={() => setAssignStep(2)}
                        />
                        <p className="label">{t("reviewer")}</p>
                    </ButtonBase>
                )}
            </div>
        )
    } 

    const modaloption = {
        closeMaskOnClick: false,
        height:'auto',
        width: 784,
    };

    useEffect(() => {
        if(POFilesDetails !== null) {
            if(POFilesDetails?.payable?.length === 0){
                setTabValue(2)
            }else if(POFilesDetails?.receivable?.length === 0){
                setTabValue(1)
            }
            setPayableData(POFilesDetails?.payable)
            setReceivableData(POFilesDetails?.receivable)
            if(POFilesDetails?.payable?.length === 1){
                if(POFilesDetails?.payable?.find(each => each.assignment.step === 2)) setAssignStep(2)
            }
            if(POFilesDetails?.receivable?.length === 1){
                if(POFilesDetails?.receivable?.find(each => each.assignment.step === 2)) setAssignStep(2)
            }
        }
    }, [POFilesDetails, tabValue])

    useEffect(() => {
      if(payableData){
        if(payableData?.find(each => each.assignment.step === assignStep)?.po_file){
            getPayablePdf()
        }
      }
    }, [payableData, assignStep])
    
    useEffect(() => {
        if(receivableData){
          if(receivableData?.find(each => each.assignment.step === assignStep)?.po_file){
            getReceivablePdf()
          }
        }
      }, [receivableData, assignStep])

    useEffect(() => {
      console.log(payablePdf)
    }, [payablePdf, assignStep])
    

    const getPayablePdf = async(value) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        try{
            let url = `${Config.BASE_URL}${payableData?.find(each => each.assignment.step === assignStep)?.po_file}`
            
            let data = await fetch(url, requestOptions)
            if (data.status === 200) {
                console.log(data)
                let response = await data.blob()
                console.log(response)
                const blob = new Blob([response], {type: "application/pdf"});
                const file = new File([blob], 'example.pdf', { type: 'application/pdf' });

                // Creating a URL from the File object
                const fileURL = URL.createObjectURL(file);
                setPayablePdf(fileURL)
 
            }else {
                console.error('Failed to download file');
                return null;
            }
        }catch(e) {
            console.log(e)
        }
    } 

    const getReceivablePdf = async(value) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        try{ 
            let url = `${Config.BASE_URL}${receivableData?.find(each => each.assignment.step === assignStep)?.po_file}`
            console.log(url)
            let data = await fetch(url, requestOptions)
            if (data.status === 200) {
                console.log(data)
                let response = await data.blob()
                console.log(response)
                const blob = new Blob([response], {type: "application/pdf"});
                const file = new File([blob], 'example.pdf', { type: 'application/pdf' });

                // Creating a URL from the File object
                const fileURL = URL.createObjectURL(file);
                console.log(fileURL)
                setReceivablePdf(fileURL)
            }else {
                console.error('Failed to download file');
                return null;
            }
        }catch(e) {
            console.log(e)
        }
    } 



    

    return (
        <>
            { showPOFilesModal &&
            (<Rodal visible={showPOFilesModal} {...modaloption} onClose={() => console.log()} showCloseButton={false} className="po-modal-section">
                <span className="modal-close-btn lang-close" onClick={(e) => {setShowPOFilesModal(false);}}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                <div className="po-modal-wrapper sticky__history__tab">
                    <h2>
                        Purchase order information
                        {
                            (POFilesDetails?.payable?.length !== 0 && POFilesDetails?.receivable?.length === 0) ? ` - ${t("payable")}` :
                            (POFilesDetails?.payable?.length === 0 && POFilesDetails?.receivable?.length !== 0) ? ` - ${t("receivable")}` : ""
                        }
                    </h2>
                    {(POFilesDetails?.payable?.length !== 0 && POFilesDetails?.receivable?.length !== 0) && (
                        <div className="bloc-tabs tab-heading" style={{padding: 0}}>
                            {POFilesDetails?.payable?.length !== 0 && (
                                <div className={tabValue === 1 ? "tabs active-tabs" : "tabs"} onClick={() => setTabValue(1)}>
                                    {t("payable")}
                                </div>
                            )}
                            {POFilesDetails?.receivable?.length !== 0 && (
                                <div className={tabValue === 2 ? "tabs active-tabs" : "tabs"} onClick={() => setTabValue(2)}>
                                    {t("receivable")}
                                </div>
                            )}
                        </div>
                    )}
                    {(payableData?.length !== 0 || receivableData?.length !== 0) ? (
                        tabValue === 1 ? (
                            <>
                                <StepButtons payable={true} />
                                {/* <object 
                                    data={payablePdf} 
                                    type="application/pdf"
                                    // width="800"
                                    // height="500"
                                > 
                                    <p>The PDF cannot be displayed - link <a href={`${Config.BASE_URL}${payableData?.find(each => each.assignment.step === assignStep)?.po_file}`} target="_blank">to the PDF!</a></p> 
                                </object>  */}
                                
                                <embed src={`${payablePdf}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" height="100%" width="100%" />
                            </>
                        ) : tabValue === 2 && (
                            <>
                                <StepButtons receivable={true} />
                                {/* <object 
                                    data={receivablePdf} 
                                    type="application/pdf"
                                    width="800"
                                    height="500"
                                > 
                                    <p>The PDF cannot be displayed - link <a href={`${Config.BASE_URL}${receivableData?.find(each => each.assignment.step === assignStep)?.po_file}`} target="_blank">to the PDF!</a></p>
                                </object>  */}
                                <embed src={`${receivablePdf}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" height="100%" width="100%" />
                            </>
                        )
                    ) : (
                        <p>No purchase order found</p>
                    )}
                </div>
            </Rodal>)}
        </>
    )
}
