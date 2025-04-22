import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../vendor/Navbar";
import TranslateModule from "./sidebar-switch/TranslateModule";
import ToolkitModule from "./sidebar-switch/ToolkitModule";
import AssetsModule from "./sidebar-switch/AssetsModule";
import SpeechModule from "./sidebar-switch/SpeechModule";
import AllTemplateModule from "./sidebar-switch/AllTemplateModule";
import MyFilesModule from "./sidebar-switch/MyFilesModule";
import { useDispatch, useSelector } from 'react-redux';
import Config from "../Config";
import { setEditorSettingStatus } from "../features/EditorSettingStatusSlice";

const ProjectSetup = () => {

    let params = useParams();
    const dispatch = useDispatch()
    const isIncompleteEditorSettings = useSelector((state) => state.editorSettingStatus.value)
    const userDetails = useSelector((state) => state.userDetails.value)

    const [sidebarActiveTab, setSidebarActiveTab] = useState(2);
    const [sidebartoggle ,setsidebartoggle] = useState(false)

    useEffect(() => {
        if(userDetails?.is_vendor){
            getEdiorSettingStatus()
        }
    }, [])
    

    const getEdiorSettingStatus = () => {
        Config.axios({
			url: `${Config.BASE_URL}/vendor/editor_settings_status/`,
			auth: true,
			success: (response) => {
                dispatch(setEditorSettingStatus(response.data['incomplete status']))
			},
            error: (err) => {
                if(err.response?.data?.msg === "Unauthorised" || err.response?.data?.code === "bad_authorization_header"){
                    // AppConfigs.logout();
                }
            }
		});
    } 

    return (
        <>
            {params?.category === "all-templates" ? 
                <>
                    <Navbar />
                    <AllTemplateModule />
                </>
                :
                <>
                    <Navbar istranslator={true}/>
                    <div className="ai-new-project-setup-wrapper">
                        <div className="ai-working-col-wrapper">
                            {/* {isIncompleteEditorSettings && (
                                <CVErrorAlert />
                            )} */}
                            {params?.category === "my-files" && <MyFilesModule />}
                            {params?.category === "translate" && 
                                <TranslateModule
                                    setSidebarActiveTab={setSidebarActiveTab} 
                                    sidebarActiveTab={sidebarActiveTab}
                                />
                            }
                            {params?.category === "speech" && 
                                <SpeechModule
                                    setSidebarActiveTab={setSidebarActiveTab}  
                                />
                            }
                            {params?.category === "tool-kit" && 
                                <ToolkitModule 
                                    sidebarActiveTab={sidebarActiveTab}
                                    setSidebarActiveTab={setSidebarActiveTab}
                                />
                            }
                            {params?.category === "assets" && 
                                <AssetsModule 
                                    sidebarActiveTab={sidebarActiveTab}
                                    setSidebarActiveTab={setSidebarActiveTab}
                                />
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default ProjectSetup;
