import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: null,  // To store the selected start date
};

const startDateSponsorSlice = createSlice({
  name: 'startDateSponsor',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
  },
});

export const { setStartDate } = startDateSponsorSlice.actions;
export default startDateSponsorSlice.reducer;
