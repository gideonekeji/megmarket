// storeApp/Slice/AddpostSelectedIDandvalues/monthYearSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MonthYearState {
  monthValue: string | null;
  yearValue: string | null;
}

const initialState: MonthYearState = {
  monthValue: null, // No default, starts empty
  yearValue: null,  // No default, starts empty
};

const monthYearSlice = createSlice({
  name: "monthYear",
  initialState,
  reducers: {
    setMonthValue: (state, action: PayloadAction<string | null>) => {
      state.monthValue = action.payload;
    },
    setYearValue: (state, action: PayloadAction<string | null>) => {
      state.yearValue = action.payload;
    },
  },
});

export const { setMonthValue, setYearValue } = monthYearSlice.actions;
export default monthYearSlice.reducer;
