import { useEffect, useState } from 'react'
import Config from './Config'
import { Link } from 'react-router-dom'
import ButtonBase from '@mui/material/ButtonBase';
import lottie from "lottie-web"
import ThumpsUp from "../vendor/thumb-up.json"
import { useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import AIFooterLogo from "../assets/images/ailaysa-footer-logo.svg"
import LinkIcon from "../assets/images/new-ui-icons/link-icon.svg"

function Invitation(props) {
    const location = useLocation()

    const [alertMessage, setAlertMessage] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        acceptInvitation()
    }, [])

    /* Showing the thumbs up animation */
    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#thumps-up"),
          animationData: ThumpsUp,
          loop: false,
          autoplay: true,
        })
    }, [])

    /* Accept the invitation */
    const acceptInvitation = () => {
        let url = `${Config.BASE_URL}/auth/accept/`
        if (location.pathname.indexOf('confirm') != -1) //If the url contains confirm. Means this is confirmation not accept
            url = `${Config.BASE_URL}/auth/confirm/`
        let formData = new FormData()
        formData.append('uid', props.match.params.uid)
        formData.append('token', props.match.params.token)
        setIsLoading(true)
        Config.axios({
            url: url,
            method: 'POST',
            data: formData,
            success: (response) => {
                if (response.data?.msg) {
                    setAlertMessage(response.data?.msg)
                    setIsLoading(false)
                    if(response.data?.type) setIsError(true)
                }
            },
            error: (err) => {
                setIsLoading(false)
                setIsError(true)
            }
        })
    }

    return (
        <>
            <section className="invitation-page-cont">
                <div className="invitation-box-cont">
                    <div className="invite-content-box">
                        {isLoading ? (
                             <span className="invalid-invitation-link">
                                <CircularProgress sx={{ color: '#0074d3' }} style={{height: '60px', width: '60px'}} />
                             </span>
                        ): (
                            !isError ? (
                                <div className="thumps-up" id="thumps-up"></div>
                            ): (
                                <span className="invalid-invitation-link">
                                    <img src={LinkIcon} alt="close_black" />
                                </span>
                            )
                        )}
                        {alertMessage &&
                            <p className="alert-msg">{alertMessage}</p>
                        }
                        {Config.userState === null
                            ?
                                <>
                                {/* <p className="alert-sub-msg">{location.pathname.indexOf('confirm') != -1 ? 'Login to add your service details and latest rates' : 'Login in to check your assigned task'}</p> */}
                                <ButtonBase><a target="_blank" href={import.meta.env.VITE_APP_LOGIN_URL} className="back-to-trans-btn">Login</a></ButtonBase>
                                </>
                            :
                                <ButtonBase><Link className="back-to-trans-btn" to="/file-upload">View your task(s)</Link></ButtonBase>
                        }
                    </div>
                    <div className="ailaysa-logo">
                        <a target="_blank" href="https://ailaysa.com/"><img src={AIFooterLogo}  alt="ailaysa-footer-logo"/></a>
                    </div>
                </div>
                <p className="transeditor-footer">© Ailaysa Technologies Private Limited {(new Date().getFullYear())}.</p>
            </section>
        </>
    )
}

export default Invitation