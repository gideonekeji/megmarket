// redux/slices/activeComponentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveComponentState {
  activeComponent: string;
}

const initialState: ActiveComponentState = {
  activeComponent: "Profile", // Default component
};

const activeComponentSlice = createSlice({
  name: "activeComponent",
  initialState,
  reducers: {
    setActiveComponent(state, action: PayloadAction<string>) {
      state.activeComponent = action.payload;
    },
  },
});

export const { setActiveComponent } = activeComponentSlice.actions;

export default activeComponentSlice.reducer;
