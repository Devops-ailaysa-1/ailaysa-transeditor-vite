import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Config from '../../Config';
import { useDispatch } from 'react-redux';
import { setShowCustomSettingsModal } from '../../features/ShowCustomSettingsModalSlice';

export const MyStyleBox = (props) => {
    const { myStyleData, getMyStyle } = props;
    let data = myStyleData[0];
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [myStylePrompt, setMyStylePrompt] = useState(myStyleData?.length ? data?.brand_voice_result_prompt : "");
    const [isSaving, setIsSaving] = useState(false);

    const createUpdatePrompt = () => {
        let formdata = new FormData();
        if(myStylePrompt?.trim()?.length === 0) {
            Config.toast(t("empty_my_style_text"), "warning");
            return;
        }
        formdata.append('brand_voice_result_prompt', myStylePrompt);
        setIsSaving(true);

        Config.axios({
            url: `${Config.BASE_URL}/writer/my-style/${myStyleData?.length ? `${data?.id}/` : ''}`,
            method: myStyleData?.length ? "PUT" : "POST",
            data: formdata,
            auth: true,
            success: (response) => {
               setIsSaving(false);
               dispatch(setShowCustomSettingsModal(false));
               getMyStyle();
            },
            error: (err) => {
                console.error(err);
                setIsSaving(false);
            }
        });
    } 

    return (
        <div className="my-style-wrapper px-4 mt-8 ">
            <label htmlFor="prompt-box"  className="block font-medium text-base">
                {t("prompt")}
            </label>
            <span className='block text-right text-[#B2B2B2] text-sm'>
                {myStylePrompt?.length}/500
            </span>
            <textarea name="prompt-box" id="prompt-box" cols="30" rows="10" className="block" value={myStylePrompt} 
               onChange={(e) => setMyStylePrompt(e.target.value)} maxLength={500} ></textarea>
            <div className="footer-area-wrapper justify-content-end mt-8" style={{ padding: '0px 0px 15px 30px' }}>
                <div className="term-edit-btn-row">
                    <button className="uploadProjectButton-writter" onClick={createUpdatePrompt} >
                        <span className="fileupload-new-btn">
                            {isSaving ? `${t("saving")}...` : `${t("save_style")}`}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
