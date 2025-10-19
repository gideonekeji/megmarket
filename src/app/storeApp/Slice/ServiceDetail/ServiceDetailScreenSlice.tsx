// src/store/ServiceDetailScreenSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the data structure
interface Review {
  id: number;
  service_id: number;
  user_id: number;
  review_star: string;
  review_message: string;
  created_at: string;
  first_name: string;
  last_name: string;
  image: string;
}

interface Store {
  id: number;
  store_name: string;
  store_description: string;
  price: string;
  mobile: string;
  category: string;
  store_images: string[];
  store_attachments: string[];
}

interface VendorDetails {
  id: number;
  first_name: string;
  last_name: string;
  vendor_email: string;
  image: string;
  last_seen: string;
}

interface ServiceDetail {
  id: number;
  vendor_id: number;
  category_id: number;
  service_name: string;
  service_description: string;
  service_website: string;
  service_phone: string;
  address: string;
  lat: string;
  lon: string;
  open_days: string[];
  closed_days: string[];
  open_time: string;
  close_time: string;
  video_thumbnail: string;
  video: string;
  instagram_link: string;
  facebook_link: string;
  whatsapp_link: string;
  twitter_link: string;
  subcategory_id: string;
  service_email: string;
  cover_image: string;
  published_month: string;
  published_year: string;
  price_range: string;
  total_stores_count: number;
  total_years_count: number;
  distance: string;
  category_name: string;
  subcategory_names: string[];
  vendor_email: string;
  service_images: string[];
  isLike: number;
  totalReviewCount: number;
  totalAvgReview: string;
  reviews: Review[];
  stores: Store[];
}

interface VendorServiceState {
  vendorDetails: VendorDetails;
  serviceDetail: ServiceDetail;
}

const initialState: VendorServiceState = {
  vendorDetails: {
    id: 0,
    first_name: "",
    last_name: "",
    vendor_email: "",
    image: "",
    last_seen: "",
  },
  serviceDetail: {
    id: 0,
    vendor_id: 0,
    category_id: 0,
    service_name: "",
    service_description: "",
    service_website: "",
    service_phone: "",
    address: "",
    lat: "",
    lon: "",
    open_days: [],
    closed_days: [],
    open_time: "",
    close_time: "",
    video_thumbnail: "",
    video: "",
    instagram_link: "",
    facebook_link: "",
    whatsapp_link: "",
    twitter_link: "",
    subcategory_id: "",
    service_email: "",
    cover_image: "",
    published_month: "",
    published_year: "",
    price_range: "",
    total_stores_count: 0,
    total_years_count: 0,
    distance: "",
    category_name: "",
    subcategory_names: [],
    vendor_email: "",
    service_images: [],
    isLike: 0,
    totalReviewCount: 0,
    totalAvgReview: "",
    reviews: [],
    stores: [],
  },
};

const ServiceDetailScreenSlice = createSlice({
  name: "serviceDetail",
  initialState,
  reducers: {
    setVendorServiceDetails: (
      state,
      action: PayloadAction<VendorServiceState>
    ) => {
      state.vendorDetails = action.payload.vendorDetails;
      state.serviceDetail = action.payload.serviceDetail;
      
    },
  },
});

export const { setVendorServiceDetails } = ServiceDetailScreenSlice.actions;

export default ServiceDetailScreenSlice.reducer;
