import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the Store API Response
export interface StoreImage {
  url: string;
}

export interface StoreAttachment {
  url: string;
}

export interface StoreData {
  id: number;
  store_name: string;
  store_description: string;
  price: string; // Price is a string in the API response
  store_images: StoreImage[];
  store_attachments: StoreAttachment[];
}

interface StoreState {
  storeList: StoreData[]; // List of stores
  loading: boolean;
  error: string | null;
  storeImages: StoreImage[];
  currentStoreName: string; // Added store name to state
  currentStoreDescription: string; // Added store description to state
  currentStorePrice: string; // Added store price to state
}

const initialState: StoreState = {
  storeList: [],
  loading: false,
  error: null,
  storeImages: [],
  currentStoreName: "", // Initial value for store name
  currentStoreDescription: "", // Initial value for store description
  currentStorePrice: "", // Initial value for store price
};

const AddStore = createSlice({
  name: "AddStore",
  initialState,
  reducers: {
    setStoreList(state, action: PayloadAction<StoreData[]>) {
      state.storeList = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setStoreImages(state, action: PayloadAction<StoreImage[]>) {
      state.storeImages = action.payload; // Updates only storeImages array
    },
    setStoreName(state, action: PayloadAction<string>) {
      state.currentStoreName = action.payload; // Set the store name
    },
    setStoreDescription(state, action: PayloadAction<string>) {
      state.currentStoreDescription = action.payload; // Set the store description
    },
    setStorePrice(state, action: PayloadAction<string>) {
      state.currentStorePrice = action.payload; // Set the store price
    },
    // Add other reducers as needed for other actions
  },
});

export const {
  setStoreList,
  setLoading,
  setError,
  setStoreImages,
  setStoreName,
  setStoreDescription,
  setStorePrice,
  // Export other actions as needed
} = AddStore.actions;
export default AddStore.reducer;
