import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubCategoryId: null,
  selectedSubCategoryName: "",
};

const UpdateStoreSubCategoriySlice = createSlice({
  name: "UpdateStoreSubCategoriySlice",
  initialState,
  reducers: {
    setSelectedSubCategoryupdatestore: (state, action) => {
      state.selectedSubCategoryId = action.payload.id;
      state.selectedSubCategoryName = action.payload.name;
    },
  },
});

export const { setSelectedSubCategoryupdatestore } = UpdateStoreSubCategoriySlice.actions;
export default UpdateStoreSubCategoriySlice.reducer;
