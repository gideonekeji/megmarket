import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreUpdateRes {
  status: boolean;
  message: string;
  store: Store;
}

interface Store {
  id: number;
  service_id: string;
  store_name: string;
  store_description: string;
  price: string;
  created_at: Date;
  updated_at: Date;
  storeImages: StoreImage[];
  storeAttachments: StoreAttachment[];
}

interface StoreAttachment {
  id: number;
  store_attachments: string;
}

interface StoreImage {
  id: number;
  store_images: string;
}

interface StoreState {
  store: Store | null;
  loading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  store: null,
  loading: false,
  error: null,
};

const UpdateStoreSlice = createSlice({
  name: "UpdateStore",
  initialState,
  reducers: {
    // Start loading state
    updateStoreStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Update store name
    updateStoreName(state, action: PayloadAction<string>) {
      if (state.store) {
        state.store.store_name = action.payload; // Update store name
      }
    },

    //  update store description
    updateStoreDescription(state, action: PayloadAction<string>) {
      if (state.store) {
        state.store.store_description = action.payload; // Update store description
      }
    },

    //  update store price information
    updateStorePrice(state, action: PayloadAction<string>) {
      if (state.store) {
        state.store.price = action.payload; // Update store price
      }
    },

    // Update store (images, attachments, or main details)
    updateStoreSuccess(state, action: PayloadAction<Partial<StoreUpdateRes>>) {
      if (action.payload.store) {
        state.store = action.payload.store; // Update main store data
      }
      if (action.payload.storeImages) {
        state.store!.storeImages = action.payload.storeImages; // Update images
      }
      if (action.payload.storeAttachments) {
        state.store!.storeAttachments = action.payload.storeAttachments; // Update attachments
      }
      state.loading = false;
    },

    // Handle failure in updating
    updateStoreFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateStoreStart,
  updateStoreSuccess,
  updateStoreFailure,
  updateStoreName,
  updateStoreDescription,
  updateStorePrice,
} = UpdateStoreSlice.actions;

export default UpdateStoreSlice.reducer;
