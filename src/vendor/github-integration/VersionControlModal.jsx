import React, {useState} from 'react'
import Config from '../Config'
import GlobalForm from './multi-step-form/GlobalForm'


function VersionControlModal(props) {
    const [token, setToken] = useState(null)
    const [repositoryOptions, setRepositoryOptions] = useState([])
    const [page, setPage] = useState(0)

    const submitToken = () => {
        if (token) {
            let formData = new FormData()
            formData.append('oauth_token', token)
            Config.axios({
                url: `${Config.BASE_URL}/integerations/${props.integrationPlatform}/`,
                method: 'POST',
                auth: true,
                data: formData,
                success: (response) => {
                    getRepositories(response?.data?.id)
                },
                error: (error) => {
                    if (error.response.data?.oauth_token)
                        Config.toast(error.response.data?.oauth_token, 'error')
                    else{
                        Config.toast('Something went wrong', 'error')
                        Config.axios({
                            url: `${Config.BASE_URL}/integerations/${props.integrationPlatform}/`,
                            auth: true,
                            success: (response) => {
                                getRepositories(2)
                            }
                        })
                    }
                }
            })
        } else
            Config.toast('Token is required', 'error')
    }

    const getRepositories = (id) => {
        Config.axios({
            url: `${Config.BASE_URL}/integerations/${props.integrationPlatform}/repository/${id}`,
            auth: true,
            success: (response) => {
                if (response.data?.results) {
                    let optionsTemp = []
                    response?.data?.results.map(repository => { 
                        optionsTemp.push({value: repository.id, label: repository.repository_name})
                    })
                    setRepositoryOptions(optionsTemp)
                    setPage(1)
                }
            }
        })
    }

    return (
        <React.Fragment>
            <div className="version-control-modal-wrapper">
                <GlobalForm 
                    close={props.onClick} 
                    logo={props.modalImage} 
                    setToken={setToken} 
                    submitToken={submitToken} 
                    repositoryOptions={repositoryOptions} 
                    setRepositoryOptions={setRepositoryOptions}
                    page={page}
                    setPage={setPage}
                    integrationPlatform={props.integrationPlatform}
                    selectFile={props.selectFile}
                    integrationFiles={props.integrationFiles}
                    setIntegrationFiles={props.setIntegrationFiles}
                    fileUploadTabToggle={props.fileUploadTabToggle}
                />
            </div>
        </React.Fragment>
    )
}

export default VersionControlModal