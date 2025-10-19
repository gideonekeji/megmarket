import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campaignName: "",
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setCampaignName: (state, action) => {
      state.campaignName = action.payload;
    },
  },
});

export const { setCampaignName } = campaignSlice.actions;
export default campaignSlice.reducer;
