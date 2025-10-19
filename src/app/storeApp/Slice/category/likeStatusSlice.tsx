import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeStatusState {
  [key: string]: number; 
}

const initialState: LikeStatusState = {};

const likeStatusSlice = createSlice({
  name: "likeStatus",
  initialState,
  reducers: {
    setLikeStatus: (
      state,
      action: PayloadAction<{ service_id: string; likeStatus: number }>
    ) => {
      const { service_id, likeStatus } = action.payload;
      state[service_id] = likeStatus;
    },
  },
});

export const { setLikeStatus } = likeStatusSlice.actions;

export default likeStatusSlice.reducer;
