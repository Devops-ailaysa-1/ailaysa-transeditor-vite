import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../Navbar'
import AilaysaNewGlossEditingArea from './AilaysaNewGlossEditingArea'
import { useDispatch } from 'react-redux'
import { addDownloadingFiles, deleteDownloadingFile, updateDownloadingFile } from '../../../features/FileDownloadingListSlice'
import Config from '../../Config'
import { useLocation } from 'react-router-dom'

const WordchoiceWorkspace = (props) => {
    
    const dispatch = useDispatch()
    const location = useLocation()
    
    const [languagePairObject, setLanguagePairObject] = useState(null)
    
    const newGlossEditingImperativeRef = useRef(null)
    const prevPathRef = useRef(null)

    useEffect(() => {
        if (location.state?.prevPath) {
            prevPathRef.current = location.state.prevPath
        }
    }, [location.state])

    const handleTermsDownload = async() => {
        try{
            let taskItem = newGlossEditingImperativeRef.current.getSelectedTaskItem()
            console.log(taskItem)
            // add in download list
            dispatch(addDownloadingFiles({ id: taskItem?.value, file_name: languagePairObject?.project_name, ext: '.xlxs', status: 1 }))

            let url = `${Config.BASE_URL}/glex/terms_simple_download/?task=${taskItem?.value}`
            const response = await Config.downloadFileFromApi(url);
            
            // update the list once download completed
            dispatch(updateDownloadingFile({ id: taskItem?.value, status: 2 }))

            Config.downloadFileInBrowser(response)

            setTimeout(() => {
                // remove the downloaded file from list
                dispatch(deleteDownloadingFile({ id: taskItem?.value }))
            }, 8000);
            
        }catch(e) {
            console.log(e)
        }
    } 

    return (
        <React.Fragment>
            <Navbar
                isWhite={true}
                prevPathRef={prevPathRef}
                languagePairObject={languagePairObject}
                termdownload={true}
                handleDownloadFile={handleTermsDownload}
            />
            <section className="padding-correction wordchoice-workspace-container">
                <AilaysaNewGlossEditingArea 
                    setLanguagePairObject={setLanguagePairObject}
                    newGlossEditingImperativeRef={newGlossEditingImperativeRef}
                />
            </section>
           
        </React.Fragment>
    )
}

export default WordchoiceWorkspace