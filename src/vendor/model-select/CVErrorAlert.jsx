import React from 'react'
import ErrorIcon from "@mui/icons-material/Error";
import Config from '../Config';
import { useTranslation } from "react-i18next";


const CVErrorAlert = () => {
    const { t } = useTranslation();
  return (
    <React.Fragment>
        <div className="glb-alert">
            <ErrorIcon
                style={{
                    width: 24,
                    color: "#E74C3C",
                }}
            />
            <div className="d-flex align-items-center justify-content-between glb-alert-gap">
                <span><a href={`${Config.USER_PORTAL_HOST}/settings/editor`} target="blank">{t("cv_error_link_txt")}</a> {t("cv_error_txt")}</span>
                {/* <a href={`${Config.USER_PORTAL_HOST}/settings/editor`} target="blank">Update settings</a> */}
            </div>
        </div>
    </React.Fragment>
  )
}

export default CVErrorAlert