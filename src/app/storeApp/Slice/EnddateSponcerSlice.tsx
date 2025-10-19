// EnddateSponcerSlice.ts (Redux slice for endDate)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EndDateSponsorState {
  endDate: string | null;
}

const initialState: EndDateSponsorState = {
  endDate: null,
};

const EnddateSponcerSlice = createSlice({
  name: "endDateSponsor",
  initialState,
  reducers: {
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setEndDate } = EnddateSponcerSlice.actions;
export default EnddateSponcerSlice.reducer;
