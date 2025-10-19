import { StaticImageData } from "next/image";

//  Card types

export interface HomeSectionCardRes {
  image: string;
  title: string;
}

//  HomeSectionmainCardRes

export interface HomeSectionMainCardRes {
  mainimage: StaticImageData;
  category: string;
  avatar: string;
  name: string;
  businessName: string;
  reviews: string;
  yearsInBusiness: string;
  location: string;
  priceRange: string;
  featured: string;
}

// HomeSection8CardRes

export interface HomeSection8CardRes {
  avatar: StaticImageData;
  title: string;
  name: string;
  position: string;
}

// heading types

export interface HeadingcontentProps {
  title: string;
  highlightedTitle: string;
}

// SubCategoryCardRes

export interface SubCategoryCardRes {
  image: StaticImageData;
  categoryName: string;
  listingCount: string;
  onClick: () => void;
}

//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ API RESPONCE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//  CategoriesResponse

export interface GetAllCategoryRes {
  status: boolean;
  message: string;
  data: Categorydata[];
}

export interface Categorydata {
  id: number;
  category_name: string;
  category_image: string;
  subcategories_count: number;
  onClick?: () => void;
}

// SubCategoryResponse

export interface GetAllSubCategoryRes {
  status: boolean;
  message: string;
  totalSubCategoryCount: number;
  subCategoryData: SubCategoryData[];
}

export interface SubCategoryData {
  id: number;
  category_id: number;
  subcategory_image: string;
  subcategory_name: string;
  services_count: number;
  onClick?: () => void;
}

// add-customersupport

export interface AddCustomerSupportRes {
  name: string;
  email: string;
  phone: string;
  message: string;
}

//  User Registration

export interface AddUserRegistrationRes {
  first_name: string;
  email: string;
  password: string;
  last_name: string;
  new_mobile: string;
  username: string;
  country_code: string;
  role: string;
  mobile: string;
}

// Resend Otp
export interface ResendotpandForgetpwdRes {
  email: string;
}

// RegisterWithmobailnumber

export interface RegisterWithMobailnumberRes {
  mobile: string;
  country_code: string;
  role: string;
}

// login user

export interface LoginUserRes {
  email: boolean;
  password: string;
}

// Reset password

export interface ResetPasswordRes {
  email: string;
  password: string;
  confirm_password: string;
}

// user Profile

export interface GetAlluserprofileRes {
  status: boolean;
  message: string;
  guest_user: number;
  UserDetails: UserDetails;
  subscribed_user: number;
  subscriptionDetails: SubscriptionDetails;
}

export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  country_code: string;
  image: string;
}

export interface SubscriptionDetails {
  user_id: number;
  plan_name: string;
  price: string;
  expire_date: Date;
  plan_image: string;
}

//  Profile Update

export interface ProfileUpdate {
  status: boolean;
  message: string;
  userdetails: Userdetails;
  subscriptionDetails: SubscriptionDetails;
}

export interface SubscriptionDetails {
  user_id: number;
  plan_name: string;
  price: string;
  expire_date: Date;
  plan_image: string;
}

export interface Userdetails {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  password: string;
  username: string;
  country_code: string;
  role: string;
  image: string;
  subscribed_user: number;
}

//  my review List

export interface MyReviewList {
  status: boolean;
  message: string;
  reviewlist: Reviewlist[];
}

export interface Reviewlist {
  id: number;
  user_id: number;
  service_id: number;
  review_star: string;
  review_message: string;
  created_at: Date;
  service_name: string;
  category_name: string;
  service_images: string[];
}

// term conditions

export interface TermconditionRes {
  status: boolean;
  message: string;
  data: Text[];
}

export interface Text {
  id: number;
  text: string;
}

//  privacy and policy settings

export interface PrivacypolicyRes {
  status: boolean;
  message: string;
  data: text[];
}

export interface text {
  id: number;
  text: string;
}

//   All servires liked

export interface GetlikedservicesRes {
  status: boolean;
  message: string;
  ServiceLikedList: ServiceLikedList[];
}

export interface ServiceLikedList {
  id: number;
  category_id: number;
  service_name: string;
  vendor_id: number;
  address: string;
  lat: string;
  lon: string;
  category_name: string;
  totalReviewCount: number;
  totalAvgReview: string;
  service_images: string;
  isLike: number;
}

// app-feedback

export interface AppFeedbackRes {
  feedback_review: string;
}

// Add services

export interface AddServiceRes {
  vendor_id?: string;
  service_name?: string;
  service_email?: string;
  service_image?: string[];
  is_featured?: string;
  service_description?: string;
  category_id?: string;
  subcategory_idt?: string;
  service_website?: string;
  service_phone?: string;
  address?: string;
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
  add_new_post_steps?: 1 | 2 | 3;
}

//  filter reponse categories and subcategory

export interface FilterRes {
  status: boolean;
  message: string;
  serviceFilter: ServiceFilter[];
  total_page: number;
}

export interface ServiceFilter {
  id: number;
  service_name: string;
  category_name: string;
  address: string;
  lat: string;
  lon: string;
  is_featured: number;
  service_price: string;
  published_year: string;
  service_images: string[];
  isLike: number;
  total_review_count: number;
  average_review_star: string;
  first_name: string;
  last_name: null | string;
  image: string;
}

// like service

export interface FavouritePropertiesRes {
  status: boolean;
  message: string;
  ServiceLikedList: ServiceLikedList[];
}

export interface ServiceLikedList {
  id: number;
  category_id: number;
  service_name: string;
  vendor_id: number;
  address: string;
  lat: string;
  lon: string;
  category_name: string;
  totalReviewCount: number;
  totalAvgReview: string;
  service_images: string;
  first_name: null | string;
  last_name: null | string;
  image: string;
  isLike: number;
}

// ++++++++++++++++++++++++++++++++++++++++++ Detail Screen +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface ServiceDetailScreenRes {
  status: boolean;
  message: string;
  vendor: number;
  vendorDetails: VendorDetails;
  serviceDetail: ServiceDetail;
  stores: Store[];
}

export interface ServiceDetail {
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
}

export interface Review {
  id: number;
  service_id: number;
  user_id: number;
  review_star: string;
  review_message: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  image: string;
}

export interface Store {
  id: number;
  store_name: string;
  store_description: string;
  price: string;
  mobile: string;
  category: string;
  store_images: string[];
  store_attachments: string[];
}

export interface VendorDetails {
  id: number;
  first_name: string;
  last_name: string;
  vendor_email: string;
  image: string;
  last_seen: string;
}

//  Add Review Details screen

export interface AddReviewDetailsRes {
  status: boolean;
  message: string;
}

//  update service

export interface ServiceUpdateRes {
  status: boolean;
  message: string;
  service: Service;
  service_images: string[];
  service_video: string;
}

export interface Service {
  id: number;
  vendor_id: number;
  category_id: number;
  subcategory_id: string;
  service_name: string;
  service_description: string;
  service_website: string;
  service_country_code: string;
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
  created_at: Date;
  updated_at: Date;
}

//  remove service images

export interface RemoveServiceImagesRes {
  vendor_id: string;
  service_id: string;
  service_image_id: string;
}

//  store list

export interface StorelistRes {
  status: boolean;
  message: string;
  StoreList: StoreList[];
}

export interface StoreList {
  id: number;
  store_name: string;
  store_description: string;
  price: string;
  store_images: Store[];
  store_attachments: Store[];
}

export interface Store {
  id: number;
  url: string;
}

// ++++++++++++++++++++++++++++++++++++update store +++++++++++++++++++++++++++++++++++++

export interface StoreUpdateRes {
  status: boolean;
  message: string;
  store: Store;
}

export interface Store {
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

export interface StoreAttachment {
  id: number;
  store_attachments: string;
}

export interface StoreImage {
  id: number;
  store_images: string;
}

//  plane

export interface Subscriptionplan {
  status: boolean;
  message: string;
  subscriptionDetail: SubscriptionDetail[];
}

export interface SubscriptionDetail {
  id: number;
  plan_name: string;
  description: string;
  price: string;
  validity_day: string;
  plan_services: PlanService[];
}

export interface PlanService {
  plan_services: string;
  status: number;
}

//  home Screen

export interface HomeScreenRes {
  status: boolean;
  message: string;
  first_name: string;
  last_name: string;
  slides: Slide[];
  categories: Category[];
  cards: Card[];
  sponser_store: SponserStore;
  new_cities: NewCities;
  banners: Banner[];
  perfect_store: PerfectStore;
  testimonials: Slide[];
}

export interface Banner {
  id: number;
  play_store_url: string;
  app_store_url: string;
  image: string;
}

export interface Card {
  id: number;
  subcategory_id: number;
  title: string;
  image: string;
  subcategory_name: string;
}

export interface Category {
  id: number;
  category_id: number;
  category_name: string;
  category_image: string;
  subcategory_count: number;
}

export interface NewCities {
  title: string;
  cities: string[];
}

export interface PerfectStore {
  title: string;
  perfect_store: PerfectStoreElement[];
}

export interface PerfectStoreElement {
  id: number;
  service_name: string;
  address: string;
  lat: string;
  lon: string;
  category_id: number;
  vendor_id: number;
  category_name: string;
  vendor_first_name: string;
  vendor_last_name: string;
  vendor_email: null | string;
  service_images: string[];
  isLike: number;
  totalReviewCount: number;
  totalAvgReview: string;
  vendor_image: string;
  total_years_count: number;
  price_range: string;
  is_featured?: number;
}

export interface Slide {
  id: number;
  title: string;
  body: string;
  image: string;
  link?: string;
  client_reviews?: ClientReview[];
}

export interface ClientReview {
  review_text: string;
  review_star: string;
  full_name: string;
  client_role: string;
  image: string;
}

export interface SponserStore {
  title: string;
  services: PerfectStoreElement[];
}

// homeScreen Settings

export interface HomeScreenSettingRes {
  status: boolean;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  inputs: string;
  status: number;
}

export interface HomeGetCountrieslistRes {
  status: boolean;
  message: string;
  countriesList: string[];
}

export interface HomeGetCountrieslisCategorytRes {
  status: boolean;
  message: string;
  categoriesList: CategoriesList[];
}

export interface CategoriesList {
  id: number;
  category_name: string;
}

// ++++++++================================================== messssage chta ++++++++++++++++++++++++++++++++++++++++++++++

export interface MessageListRes {
  success: boolean;
  message: string;
  chat_list: ChatList[];
}

export interface ChatList {
  id: number;
  my_id: number;
  second_id: number;
  last_message: string;
  url: string;
  type: string;
  user_id: number;
  first_name: string;
  last_name: string;
  is_online: number;
  user_role: string;
  profile_pic: string;
  time: string;
  last_seen: string;
  is_block: number;
  unread_message: string;
}

//  inner chat list

export interface InnerChatListRes {
  success: boolean;
  message: string;
  to_user_details: ToUserDetails;
  chatMessages: ChatMessage[];
}

export interface ChatMessage {
  date: Date;
  messages: Message[];
}

export interface Message {
  id: number;
  from_user: number;
  to_user: number;
  message: string;
  url: string;
  type: string;
  read_message: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  role: string;
  status: number;
  profile_image: string;
  message_seen: number;
  chat_time: string;
}

export interface ToUserDetails {
  id: number;
  first_name: string;
  last_name: string;
  status: number;
  image: string;
  role: string;
  updated_at: Date;
}

//  vendor info

export interface VendorDetailRes {
  status: boolean;
  message: string;
  Vendordetails: Vendordetails;
  serviceDetails: ServiceDetail[];
}

export interface Vendordetails {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  lat: string;
  lon: string;
  mobile: string;
  country_code: string;
  image: string;
  total_reviews: number;
  average_rating: string;
}

export interface ServiceDetail {
  id: number;
  vendor_id: number;
  category_id: number;
  category_name: string;
  subcategory_id: string;
  service_name: string;
  address: string;
  lat: string;
  lon: string;
  is_featured: number;
  published_month: string;
  published_year: string;
  service_images: string[];
  total_reviews: number;
  average_rating: string;
  price_range: string;
  vendor_first_name: string;
  vendor_last_name: string;
  vendor_email: string;
  vendor_image: string;
  isLike: number;
}

// types.ts
export interface User {
  id: number;
  second_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  last_message: string;
  last_seen: string;
  is_online: number; // 1 for online, 0 for offline
  unread_message: number;
  user_role: string;
  time: string; // Last active time
  is_block: number; // 1 for blocked, 0 for not blocked
}

export interface GetbudgetcountRes {
  status: boolean;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  days: string;
  price: number;
}

export interface GegetcampaignAll {
  status: boolean;
  message: string;
  campaignData: CampaignDatum[];
}

export interface CampaignDatum {
  id: number;
  vendor_id: number;
  service_id: number;
  campaign_name: string;
  address: Address;
  lat: string;
  lon: string;
  area_distance: string;
  created_at: Date;
  updated_at: Date;
}

export enum Address {
  NeighborhoodInAhmedabadGujarat = "Neighborhood in Ahmedabad, Gujarat",
}

// types.ts

export interface StoreAttachment {
  url: string;
}

export interface StoreImage {
  url: string;
}

export interface CardData {
  id: number;
  category: string;
  mobile: string;
  price: string;
  store_attachments: StoreAttachment[];
  store_description: string;
  store_images: StoreImage[];
  store_name: string;
}

// Business Reviews

export interface BusinessReviewRes {
  status: boolean;
  message: string;
  service_details: ServiceDetails;
  userReviews: UserReview[];
}

export interface ServiceDetails {
  service_name: string;
  service_description: string;
  service_images: string[];
  totalAvgReview: string;
  totalReviewCount: number;
}

export interface UserReview {
  id: number;
  service_id: number;
  user_id: number;
  review_star: string;
  review_message: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  image: string;
}

//  update review

export interface UpdateReviewList {
  status: boolean;
  message: string;
  reviewdata: Reviewdata;
}

export interface Reviewdata {
  review_id: number;
  user_id: number;
  service_id: number;
  review_star: string;
  review_message: string;
}

//  store sub categories list

export interface StoreSubCategoriyList {
  status: boolean;
  message: string;
  totalSubCategoryCount: number;
  subCategoryData: SubCategoryDatum[];
}

export interface SubCategoryDatum {
  id: number;
  subcategory_name: string;
}











//  language  module +++++++++++++++++++++++++++++++++++++++




export interface ListAllLanguages {
  success:   boolean;
  message:   string;
  languages: Language[];
}

export interface Language {
  language:           string;
  status:             number;
  default_status:     number;
  status_id:          number;
  country:            string;
  language_alignment: string;
}






//   grapph



export interface GrapphData {
  status:         boolean;
  message:        string;
  CountRetrieved: CountRetrieved;
  graphdata:      Graphdatum[];
}

export interface CountRetrieved {
  storevisits: number;
  storelikes:  number;
  leads:       number;
}

export interface Graphdatum {
  date:        string;
  user_visits: number;
}





//  demo client user detail 


export interface UpdateUserDetailForDemoClient {
    status:              boolean;
    message:             string;
    userdetails:         Userdetails;
    subscriptionDetails: SubscriptionDetails;
    is_store:            number;
    service_id:          string;
    store_approval:      number;
    campaign:            number;
    subscriber_user:     number;
    expire_status:       number;
    sponser:             string;
    start_date:          string;
    end_date:            string;
    country_flag:        string;
    verify_otp:          string;
    mobile_verify_otp:   string;
    login_type:          string;
}

export interface SubscriptionDetails {
    user_id:         number;
    plan_name:       string;
    price:           string;
    expire_date:     Date;
    start_date:      Date;
    subscription_id: string;
}

export interface Userdetails {
    id:              number;
    first_name:      string;
    last_name:       string;
    mobile:          string;
    email:           string;
    password:        string;
    username:        string;
    country_code:    string;
    role:            string;
    image:           string;
    subscribed_user: number;
    image_status:    string;
    is_demo:         boolean;
}