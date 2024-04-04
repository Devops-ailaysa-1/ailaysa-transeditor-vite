import React, { useEffect, useState, useRef } from 'react'
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import UpdateSettingAlertIcon from '../styles-svg/UpdateSettingAlertIcon';
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setEditorSettingAlertModal } from '../../features/EditorSettingsAlertModalSlice'
import Config from '../Config';
import Cookies from "js-cookie";

const UpdateProfileSettingAlertModal = () => {

    const dispatch = useDispatch()
    const editorSettingsAlertModal = useSelector((state) => state.editorSettingsAlertModal.value)

    const handleUpdateProfile = () => {
        window.open(`${Config.USER_PORTAL_HOST}/settings/editor`)
        dispatch(setEditorSettingAlertModal(false))
    }

    const handleLaterButton = () => {
        dispatch(setEditorSettingAlertModal(false))
    }

    return (
        <Rodal visible={editorSettingsAlertModal} showCloseButton={false} onClose={() => { }} className="main-update-settings-modal">
            <div className="update-settings-modal-wrapper">
                <h1 className="title">You are almost there!</h1>
                <p className='sub-text'>Update your service provider info on your My account page to be a part of Ailaysa Marketplace. Win jobs now!</p>
                <div className='update-settings-alert-icon'>
                    <UpdateSettingAlertIcon />
                </div>
                <div className="update-settings-btn-row">
                    <ButtonBase className="update-btn-link" onClick={handleUpdateProfile}>
                        Update service provider profile
                    </ButtonBase>
                    <ButtonBase className="update-cancel-btn-link" onClick={handleLaterButton}>
                        I'll update later
                    </ButtonBase>
                </div>
            </div>
        </Rodal>
    )
}

export default UpdateProfileSettingAlertModal