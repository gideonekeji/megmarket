import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddPostStateType {
  vendor_id?: string;
  service_name?: string;
  service_email?: string;
  service_image?: string[]; // Array of file names
  cover_image?: string;
  is_featured?: string;
  service_description?: string;
  category_id?: string;
  subcategory_idt?: string;
  service_website?: string;
  service_phone?: string;
  address?: string;
  area?: string;
  city?: string;
  state?: string;
  country?: string;
  open_days?: string[];
  lat?: string;
  lon?: string;
  closed_days?: string;
  open_time?: string;
  close_time?: string;
  whatsapp_link?: string;
  instagram_link?: string;
  facebook_link?: string;
  twitter_link?: string;
  video_thumbnail?: string;
  video?: string;
  aspect_ratio?: string;
  employee_strength?: string;
  published_month?: string;
  published_year?: string;
  meta_title?: string;
  meta_description?: string;
  service_country_code: string;
  video_url: string;
  add_new_post_steps?: 1 | 2 | 3;
}

const initialState: AddPostStateType = {
  lon: "",
  vendor_id: "",
  service_email: "",
  is_featured: "0",
  lat: "",
  address: "",
  city: "",
  country: "",
  area: "",
  state: "",
  service_image: [], // Initialize it as an empty array
  cover_image: "",
  open_days: [],
  service_phone: "",
  service_country_code: "",
  service_description: "",
  service_name: "",
  closed_days: "",
  service_website: "",
  category_id: "",
  subcategory_idt: "",
  open_time: "",
  close_time: "",
  whatsapp_link: "",
  instagram_link: "",
  facebook_link: "",
  aspect_ratio: "",
  video: "",
  video_thumbnail: "",
  twitter_link: "",
  employee_strength: "",
  published_month: "",
  published_year: "",
  meta_title: "",
  meta_description: "",
  video_url: "",
  add_new_post_steps: 1,
};

const AddPostSlice = createSlice({
  name: "AddPost",
  initialState,
  reducers: {
    updateAddPostData(state, action: PayloadAction<Partial<AddPostStateType>>) {
      return { ...state, ...action.payload };
    },

    // Action to update service_image with file names
    updateServiceImages(state, action: PayloadAction<string[]>) {
      state.service_image = action.payload;
    },
    // upload cover image
    updateCoverImage(state, action: PayloadAction<string>) {
      state.cover_image = action.payload;
    },

    resetAddPostData() {
      return initialState;
    },
  },
});

export default AddPostSlice.reducer;
export const { updateAddPostData, updateServiceImages,  resetAddPostData, updateCoverImage } =
  AddPostSlice.actions;
