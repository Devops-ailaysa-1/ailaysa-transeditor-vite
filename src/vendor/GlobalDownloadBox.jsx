import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadAnimation from '../animation-styles/downloading-animation/DownloadAnimation';
import { useSelector } from 'react-redux';

export const GlobalDownloadBox = () => {
    
    const downloadingFileList = useSelector((state) => state.fileDownloadingList.value)
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
      if(downloadingFileList.length !== 0){
        setIsOpen(true)
    }else{
        setIsOpen(false)
      }
    }, [downloadingFileList])


    
    return (
        <div className="file-downloading-modal-wrapper">
            <div className="download-list-header">
                <Accordion className="download-accordian" expanded={isOpen} onChange={() => setIsOpen(!isOpen)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span className="download-list-header-title">{downloadingFileList.filter(each => each.status === 1)?.length !== 0 ? "Downloading" : "Downloaded"} &nbsp;</span>
                        {downloadingFileList?.length !== 0 &&<span className='file-downloading-count'>{downloadingFileList?.length}</span>}
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul className='download-status-list-wrapper'>
                            {
                                downloadingFileList?.map(file => {
                                    return (
                                        <li className="download-status-list download-status-icon-pending">
                                            <div className="download-file-name">
                                                <span className="file-name-no-ext">{file.file_name}</span>
                                                <span className="download-file-name-ext">{file.ext}</span>
                                            </div>
                                            <div className="pending-icon">
                                                {
                                                    file.status === 1 ? (
                                                        <span className="__status  downloading_">downloading...<DownloadAnimation className='downloading_icon'/></span>
                                                    ) : file.status === 2 ? (
                                                        <span className="__status  downloaded_"></span>
                                                    ) : (
                                                        <span className="__status pending_">pending...<AutorenewIcon className="pending_icon"/></span>
                                                    )
                                                }
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}
