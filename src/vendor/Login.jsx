import { useEffect, useState } from "react";
import Config from "./Config";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ButtonBase from '@mui/material/ButtonBase';
import { SaveButtonLoader } from "../loader/CommonSaveBtnLoader";
import LoginPageLogo from "../assets/images/login-page-logo.svg"

function Login(props) {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false); // To show email specific errors
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false); // To show password errors
    const [visibility, setVisibility] = useState(false); // For loader
    const [showLoginLoader, setShowLoginLoader] = useState(false);
    const [showAccessDenied, setShowAccessDenied] = useState(false);

    useEffect(() => {
        if (Config.userState != null) {
            // If already logged in
            window.location.href = "/file-upload"; // Redirect to file-upload page
        }
    }, []);

    useEffect(() => {
        /* Change dynamic login page background images - start */
        var loginImages = [
            "login-page-bg.jpg",
            "banner1.jpg",
            "banner2.jpg",
            "banner3.jpg",
            "banner4.jpg",
            "banner5.jpg",
            "banner6.jpg",
            "banner8.jpg",
            "banner9.jpg",
        ]; // Dynamic login images
        if (document.getElementsByClassName("login-bg")[0] != null)
            document.getElementsByClassName("login-bg")[0].style.backgroundImage =
                "url(" + Config.HOST_URL + "assets/images/login/" + loginImages[Math.floor(Math.random() * loginImages.length)] + ")";
        /* Change dynamic login page background images - end */
    }, []);

    const handleChange = (e) => {
        // handling the input values and also do the validations
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                if (e.target.value === "" || e.target.value.length === 0) setEmailErr("Email is required");
                // else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
                //     setEmailErr(false)
                // else
                //        setEmailErr('Please enter a valid email address')
                break;
            case "password":
                setPassword(e.target.value);
                if (e.target.value === "" || e.target.value.length === 0) setPasswordErr("Password is required");
                else if (e.target.value.length < 8) setPasswordErr("Password should be atleast 8 characters");
                else setPasswordErr(false);
                break;
            default:
                return;
        }
    };

    const handleSubmit = (e) => {
        // Actual login submission to the backend
        e.preventDefault();
        if (emailErr || passwordErr) {
            // Empty validation
            Config.toast("Validation Error", "error");
            return;
        }
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        setShowLoginLoader(true);
        setShowAccessDenied(false);
        axios
            .post(Config.BASE_URL + "/auth/dj-rest-auth/login/", formData, { "Access-Control-Allow-Origin": "*" /*, withCredentials: true*/ })
            .then((response) => {
                if (response.data?.user?.is_internal_member && response.data?.user?.internal_member_team_detail?.team_active === "False") {
                    setShowLoginLoader(false);
                    setShowAccessDenied(true);
                    return;
                }
                let userData = {
                    id: response.data?.user?.pk,
                    name: response.data.user.fullname,
                    email: response.data.user.email,
                    token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                    user_status: response.data.deactivate ? false : true,
                    is_internal_member: response.data?.user?.is_internal_member,
                    internal_member_team_detail: response.data?.user?.internal_member_team_detail,
                };
                /* Getting user profile picture */
                axios
                    .get(Config.BASE_URL + "/auth/profile-images", { headers: { "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${userData.token}` } })
                    .then((profileResponse) => {
                        userData.image_url = profileResponse?.data?.avatar;
                        /* Removing the old cookie and set a new one */
                        Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, { domain: Config.COOKIE_DOMAIN });
                        Cookies.set(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, JSON.stringify(userData), { domain: Config.COOKIE_DOMAIN });
                        setTimeout(() => {
                            window.location.href = "/file-upload?page=1&order_by=-id";
                            setShowLoginLoader(false);
                        }, 500);
                    });
            })
            .catch((error) => {
                if (error?.response?.data != null) Config.toast(error?.response?.data?.detail, "error");
            })
            .finally();
    };

    /* Show password */
    const handleVisibilityChange = () => {
        setVisibility(!visibility);
    };

    // const LoginSubmitButton = withStyles((theme) => ({
    //     root: {
    //       backgroundColor: '#0078D4',
    //       borderRadius: '3px',
    //       boxShadow: 'none',
    //       textTransform: 'none',
    //       padding: '11px 30px',
    //       '&:hover':{
    //         backgroundColor: '#0078D4',
    //         boxShadow: 'none',
    //         },
    //     },
    // }))(Button);

    return (
        <section className="login-bg">
            <div className="login-left-side">
                <Link to="/">
                    <img src={LoginPageLogo} alt="login-logo" />
                </Link>
                {/* <div className="login-quotes-txts">
                        <p className="login-txt">A face in the crowd</p>
                        <p className="login-txt-1">Amber Vittoria's visual poem asks how often we notice strangers passing us by</p>
                    </div> */}
            </div>
            {showAccessDenied ? (
                <div className="login-form img-swap-active-anim">
                    <div className="login-heading-part">
                        <img className="icons-img" src={Config.HOST_URL + "assets/images/error-auth.svg"} alt="access-denied" />
                        <h1>Access denied</h1>
                        <p>Your adminstrative privileges have been changed. Contact your administrator if you have any queries.</p>
                    </div>
                </div>
            ) : (
                <div className="login-form img-swap-active-anim">
                    <div className="new-heading">
                        <h3>Login</h3>
                    </div>
                    <div className="login-form-2">
                        <form onSubmit={handleSubmit}>
                            <div className="login-form-part">
                                <div className="login-form-grp">
                                    <label htmlFor="staticEmail">Email ID</label>
                                    <input type="text" name="email" className="new-login-form" id="email" onChange={handleChange} />
                                    {emailErr && <span>{emailErr}</span>}
                                </div>
                                <div className="login-form-grp">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input
                                        type={visibility ? "text" : "password"}
                                        name="password"
                                        className="new-login-form"
                                        id="password"
                                        onChange={handleChange}
                                    />
                                    <span className="visibility-btn" onClick={handleVisibilityChange}>
                                        <img
                                            src={
                                                visibility
                                                    ? Config.HOST_URL + "assets/images/new-ui-icons/pwd_visibility.svg"
                                                    : Config.HOST_URL + "assets/images/new-ui-icons/pwd_visibility_off.svg"
                                            }
                                            alt="visibility"
                                        />
                                    </span>
                                    {passwordErr && <span>{passwordErr}</span>}
                                </div>
                            </div>
                            <div className="text-right">
                                {showLoginLoader ? (
                                    <ButtonBase type="submit">
                                        <div className="login-main-btn">
                                            {/* <span className="new-login-form-submit-btn">Login</span> */}
                                            <span className="new-login-form-submit-btn">
                                                <SaveButtonLoader />
                                                Logging
                                            </span>
                                        </div>
                                    </ButtonBase>
                                ) : (
                                    <ButtonBase type="submit">
                                        <div className="login-main-btn">
                                            <span className="new-login-form-submit-btn" id="login-btn">
                                                Login
                                            </span>
                                        </div>
                                    </ButtonBase>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Login;
