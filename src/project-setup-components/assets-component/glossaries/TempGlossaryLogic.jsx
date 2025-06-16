import React from 'react';
import { useState } from 'react';
import Config from '../../../vendor/Config';
import { useEffect } from 'react';

export const TempGlossaryLogic = () => {  
    const [glossaryProjectList, setGlossaryProjectList] = useState([]);
    
    useEffect(() => {
        listGlossaryProjects();
    }, []);
    
    useEffect(() => {
    }, [glossaryProjectList]);
    

    const listGlossaryProjects = () => {
        Config.axios({
            url: `${Config.BASE_URL}/workspace/project/quick/setup/?filter=glossary`, 
            auth: true,
            success: (response) => {
               setGlossaryProjectList(response?.data?.results);
            },
        });
    } 

    return (
        <div>

        </div>
    )
}
