import {useState} from 'react'
import FormOne from './FormOne'
import FormTwo from './FormTwo'
import FormThree from './FormThree'
import Config from '../../Config'
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"
import GitIntegrationEdit from "../../../assets/images/new-ui-icons/git-integ-edit.svg"
import GitIntegrationLogo1 from "../../../assets/images/github-integration/git-hub-logo.svg"
import GitIntegrationLogo2 from "../../../assets/images/github-integration/git-lab-logo.svg"

function GlobalForm(props) {

    const [fileList, setFileList] = useState([])
    const [branchId, setBranchId] = useState(null)
    const [branchOptions, setBranchOptions] = useState([])

    // const versionControlIcon = [
    //     "git-hub-logo.svg",
    //     "git-lab-logo.svg"
    // ]

    const showFormsInputs = () => {
        if (props.page === 0)
            return <FormOne setToken={props.setToken}/>
        else if (props.page === 1)
            return  <FormTwo 
                        repositoryOptions={props.repositoryOptions} 
                        branchOptions={branchOptions}
                        setBranchOptions={setBranchOptions} 
                        branchChange={branchChange} 
                        getBrancheOptions={getBrancheOptions}
                        getFileList={getFileList} 
                        integrationPlatform={props.integrationPlatform} 
                    />
        else
            return  <FormThree 
                        fileList={fileList} 
                        selectFile={props.selectFile} 
                        integrationFiles={props.integrationFiles} 
                        branchId={branchId} 
                    />
    }

    const handlePreviousButton = () => {
        props.setPage(currPage => currPage - 1)
    }

    const handleNextButton = () => {
        if (props.page !== 2)
            props.setPage(currPage => currPage + 1)
    }

    const getFileList = (branchId) => {
        Config.axios({
            url: `${Config.BASE_URL}/integerations/${props.integrationPlatform}/repository/branch/contentfile/${branchId}`,
            auth: true,
            success: (response) => {
                if (response?.data?.results)
                    setFileList(response?.data?.results)
            }
        })
    }

    const pullFiles = () => {
        props.fileUploadTabToggle(1)
        props.setToken(null)
        props.setRepositoryOptions([])
        setBranchOptions([])
        setFileList([])
        setBranchId(null)
        props.setPage(0)
        props.close()
    }

    const branchChange = (selectedOption) => {
        setBranchId(selectedOption.value)
        getFileList(selectedOption.value)
    }

    const resetFields = () => {
        props.setToken(null)
        props.setRepositoryOptions([])
        setBranchOptions([])
        setFileList([])
        setBranchId(null)
        props.setIntegrationFiles([])
        props.setPage(0)
        props.close()
    }

    const getBrancheOptions = (repositoryId) => {
        Config.axios({
            url: `${Config.BASE_URL}/integerations/${props.integrationPlatform}/repository/branch/${repositoryId}`,
            auth: true,
            success: (response) => {
                let optionsTemp = []
                response?.data?.results.map(branch => {
                    optionsTemp.push({ value: branch.id, label: branch.branch_name })
                })
                setBranchOptions(optionsTemp)
            }
        })
    }

    // const StepProcessButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: '#0078D4',
    //         boxShadow: 'none',
    //         borderRadius: '3px',
    //         textTransform: 'none',
    //         padding: 0,
    //         "&:disabled": {
    //             backgroundColor: '#99c9ee'
    //         },
    //         '&:hover': {
    //             backgroundColor: '#0265b1',
    //             boxShadow: 'none',
    //         },
    //     },
    // }))(Button)

    // const StepCancelButton = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: '#ECECEC',
    //         boxShadow: 'none',
    //         borderRadius: '3px',
    //         textTransform: 'none',
    //         padding: 0,
    //         '&:hover': {
    //             backgroundColor: '#d3d1d1',
    //             boxShadow: 'none',
    //         },
    //     },
    // }))(Button)

    return (
        <div className="version-control-step-process-wrapper">
            <div className="version-control-icon">
                {
                    props.logo == 0 
                    ?
                    <img src={GitIntegrationLogo1} />
                    :
                    <img src={GitIntegrationLogo2} />
                }
            </div>
            <div className="version-control-form-section">
                {showFormsInputs()}
            </div>
            <div className="version-control-btn-wrapper">
                <button className='globalform-StepCancelButton' onClick={resetFields}>
                    <span className="version-ctrl-btn-txt">Cancel</span>
                </button>
                <button className={props.page == 0 ? "d-none " : "globalform-StepCancelButton"} onClick={handlePreviousButton}>
                    <span className="version-ctrl-btn-txt">Previous</span>
                </button>
                {
                    props.page === 0 ?
                        <button className='globalform-StepProcessButton' onClick={props.submitToken}>
                            <span className="version-ctrl-btn-txt-1">
                                Submit
                            </span>
                        </button>
                    :
                        props.page === 2 ?
                            <button className='globalform-StepProcessButton'  onClick={pullFiles}>
                                <span className="version-ctrl-btn-txt-1">
                                    Pull files
                                </span>
                            </button>
                        :
                            <button className='globalform-StepProcessButton'  onClick={handleNextButton}>
                                <span className="version-ctrl-btn-txt-1">
                                    Next
                                </span>
                            </button>
                }
            </div>
            {
                props.page === 0 &&
                <div className="version-ctrl-token-list-wrapper">
                    <ul className="version-ctrl-token-list">
                    {
                        Array(10).fill(null).map((value, key) => (
                            <li key={key}>
                                <span className="text">User name 1</span>
                                <div className="action-wrapper">
                                    <span className="list-close-btn"><img src={GitIntegrationEdit} alt="git-integ-edit" /></span>
                                    <span className="list-close-btn"><img src={CloseBlack} alt="close_black" /></span>
                                </div>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            }
        </div>
    )
}

export default GlobalForm