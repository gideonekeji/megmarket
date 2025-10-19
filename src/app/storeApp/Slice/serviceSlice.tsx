import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Service and State Types
interface Service {
  id: number | null;
  vendor_id: number | null;
  category_id: number | null;
  subcategory_id: string;
  service_name: string;
  service_description: string;
  service_website: string;
  service_phone: string;
  service_email: string;
  service_price: string;
  address: string;
  lat: string;
  lon: string;
  area: string;
  city: string;
  state: string;
  country: string;
  status: number;
  open_days: string;
  closed_days: string;
  open_time: string;
  close_time: string;
  is_featured: number;
  instagram_link: string;
  facebook_link: string;
  whatsapp_link: string;
  twitter_link: string;
  video_thumbnail: string;
  video: string;
  cover_image: string;
  aspect_ratio: string;
  employee_strength: string;
  published_month: string;
  published_year: string;
  request_approval: number;
  meta_title: string;
  meta_description: string;
  notify_count: number;
  created_at: string;
  updated_at: string;
  service_country_code: string;
}

interface ServiceState {
  status: boolean;
  message: string;
  service_images: File[];
  service: Service; // Add this line to define the service property
}
const initialState: ServiceState = {
  status: true,
  message: "Service updated successfully!",
  service: {
    id: null,
    vendor_id: null,
    category_id: null,
    subcategory_id: "",
    service_name: "",
    service_description: "",
    service_website: "",
    service_phone: "",
    service_email: "",
    service_price: "",
    address: "",
    lat: "",
    lon: "",
    area: "",
    city: "",
    state: "",
    country: "",
    status: 0,
    open_days: "",
    closed_days: "",
    open_time: "",
    close_time: "",
    is_featured: 0,
    instagram_link: "",
    facebook_link: "",
    whatsapp_link: "",
    twitter_link: "",
    video_thumbnail: "",
    video: "",
    cover_image: "",
    aspect_ratio: "",
    employee_strength: "",
    published_month: "",
    published_year: "",
    request_approval: 0,
    meta_title: "",
    meta_description: "",
    notify_count: 0,
    created_at: "",
    updated_at: "",
    service_country_code: "",
  },
  service_images: [], // Empty initial image state
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    // Update partial fields of the service object
    updateServiceField(state, action: PayloadAction<Partial<Service>>) {
      state.service = { ...state.service, ...action.payload };
    },

    // Add a new image to the service images array
    addServiceImage(state, action: PayloadAction<File[]>) {
      state.service_images = [...state.service_images, ...action.payload];
    },

    // Remove an image by ID from the service images array
    removeServiceImage(state, action: PayloadAction<number>) {
      state.service_images = state.service_images.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { updateServiceField, addServiceImage, removeServiceImage } =
  serviceSlice.actions;

export default serviceSlice.reducer;
