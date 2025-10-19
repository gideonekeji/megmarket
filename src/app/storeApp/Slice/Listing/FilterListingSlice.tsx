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

const FilterListingSlice = createSlice({
  name: "FilterListingSlice",
  initialState,
  reducers: {
    updateFilterDataListing(
      state,
      action: PayloadAction<Partial<FilterStateType>>
    ) {
      return { ...state, ...action.payload };
    },
    clearfilterSliceListing() {
      return initialState;
    },
  },
});

export default FilterListingSlice.reducer;
export const { updateFilterDataListing, clearfilterSliceListing } =
  FilterListingSlice.actions;
