import { createSlice } from "@reduxjs/toolkit";

// Initial state for the dailyBudget slice
const initialState = {
  rangeValue: 1, // Initial value for range
};

const dailyBudgetSlice = createSlice({
  name: "dailyBudget",
  initialState,
  reducers: {
    setRangeValue: (state, action) => {
      state.rangeValue = action.payload;
    },
  },
});

// Export actions to use in the component
export const { setRangeValue } = dailyBudgetSlice.actions;

// Export the reducer
export default dailyBudgetSlice.reducer;
