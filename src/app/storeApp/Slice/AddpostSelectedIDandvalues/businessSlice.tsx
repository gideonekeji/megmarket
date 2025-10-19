import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusinessState {
  selectedDays: string[];
  unselectedDays: string[];
  startTime: string | null;
  endTime: string | null;
}

const initialState: BusinessState = {
  selectedDays: [],
  unselectedDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Initialize all days as unselected
  startTime: null,
  endTime: null,
};

const businessSliceHours = createSlice({
  name: "businessHours",
  initialState,
  reducers: {
    setSelectedDays(state, action: PayloadAction<string[]>) {
      state.selectedDays = action.payload;
      state.unselectedDays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ].filter((day) => !state.selectedDays.includes(day));
    },
    setStartTime(state, action: PayloadAction<string | null>) {
      state.startTime = action.payload;
    },
    setEndTime(state, action: PayloadAction<string | null>) {
      state.endTime = action.payload;
    },
  },
});

export const { setSelectedDays, setStartTime, setEndTime } = businessSliceHours.actions;
export default businessSliceHours.reducer;
