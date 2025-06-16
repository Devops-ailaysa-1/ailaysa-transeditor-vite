import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

console.log("campaign-strip: " + Cookies.get("hideCampaignStrip"));
let campaign_cookie = Cookies.get("hideCampaignStrip");

export const CampaignCouponStripSlice = createSlice({
    name: 'showCampaignStrip',
    initialState: { value: campaign_cookie == undefined ? true : false },
    reducers: {
        setShowCampaignStrip: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setShowCampaignStrip } = CampaignCouponStripSlice.actions;
export default CampaignCouponStripSlice.reducer;