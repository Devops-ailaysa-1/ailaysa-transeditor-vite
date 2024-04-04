import React from 'react'
import Config from '../Config'
import GitLab from "../../assets/images/github-integration/git-lab-logo.svg"
import GitHub from "../../assets/images/github-integration/git-hub-logo.svg"


function GithubBox(props) {

    const selectedImage = (e, platform) => {
        let image = e.target.getAttribute("data-id")
        props.onClick(image, platform)
    }

    return (
        <React.Fragment>
            <div className="button-wrap">
                <div className="fileupload-tab-link-align">
                    <span onClick={e => selectedImage(e, 'github')}  className="fileupload-version-contrl-icon">
                        <img data-id="0" src={GitHub} alt="git-hub-logo" />
                    </span>
                    <span onClick={e => selectedImage(e, 'gitlab')}  className="fileupload-version-contrl-icon">
                        <img data-id="1"  src={GitLab} alt="git-lab-logo" />
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default GithubBox