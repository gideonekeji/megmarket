import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goalId: null,
  campaignId: null,
  startDate: null,
  endDate: null,
  totalDays: null,
  price: null,
  campaign_name: null,
  address: null,
  area_distance: null,
  // You can add more fields as per the goal response
};

const campaignGoalSlice = createSlice({
  name: 'campaignGoal',
  initialState,
  reducers: {
    setGoalData: (state, action) => {
      const { goalId, campaignId, startDate, endDate, totalDays, price ,campaign_name , address ,area_distance } = action.payload;
      state.goalId = goalId;
      state.campaignId = campaignId;
      state.startDate = startDate;
      state.endDate = endDate;
      state.totalDays = totalDays;
      state.price = price;
      state.campaign_name = campaign_name;
      state.address = address;
      state.area_distance = area_distance;
    },
  },
});

export const { setGoalData } = campaignGoalSlice.actions;

export default campaignGoalSlice.reducer;
