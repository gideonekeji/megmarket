// Redux slice (filterSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterStateType {
  category_id: string;
  review_star: string;
  price: string;
  type: string;
  state: string;
  subcategory_id: string;
  service_name: string;
}

const initialState: FilterStateType = {
  category_id: "",
  review_star: "",
  price: "",
  type: "",
  state: "",
  subcategory_id: "",
  service_name: "",
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    updateFilterData(state, action: PayloadAction<Partial<FilterStateType>>) {
      return { ...state, ...action.payload };
    },
    clearfilterSlice() {
      return initialState;
    },
  },
});

export default filterSlice.reducer;
export const { updateFilterData, clearfilterSlice } = filterSlice.actions;
