// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";

// All Sliced Files
import counterReducer from "./Slice/counterSlice";
import customerSupportReducer from "./Slice/AddCustomerSupportSlice";
import modalReducer from "./Slice/modalSlice";
import loginReducer from "./Slice/LoginSlice";
import RegistrationReducer from "./Slice/RegistrationSlice";
import ForgotpwdReducer from "./Slice/ForgotpwdSlice";
import ResetPasswordReducer from "./Slice/ResetPasswordSlice";
import CategorySelectedIDandValuesReducer from "./Slice/AddpostSelectedIDandvalues/CategorySelectedIDandValues";
import SubCategorySelectedIdandValuesReducer from "./Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";
import monthYearReducer from "./Slice/AddpostSelectedIDandvalues/monthYearSlice";
import FirstStepFormValuesReducer from "./Slice/AddpostSelectedIDandvalues/FirstStepFormValues";
import FirstStepReducer from "./Slice/AddpostSelectedIDandvalues/FirstStep";
import AddPostSlice from "./Slice/AddPostSlice";
import businessReducer from "./Slice/AddpostSelectedIDandvalues/businessSlice";
import locationReducer from "./Slice/locationSlice";
import addressReducer from "./Slice/AddressSlice";
import CurrentLocationReducer from "./Slice/AddpostSelectedIDandvalues/CurrentLocation";
import categoryReducer from "./Slice/category/categorySlice";
import SubCategoryReducer from "./Slice/category/subcategorySlice";
import filterSliceReducer from "./Slice/category/filterSlice";
import ratingReducer from "./Slice/category/ratingSlice";
import priceReducer from "./Slice/category/priceSlice";
import SerachLocationReducer from "./Slice/category/SerachLocationSlice";
import likeStatusReduce from "./Slice/category/likeStatusSlice";
import categoryListingReducer from "./Slice/Listing/CategoryLIstingSlice";
import SubCategoryListingReducer from "./Slice/Listing/SubCategoryListing";
import PriceSliceListingReducer from "./Slice/Listing/PriceSliceListing";
import FilterListingSliceReducer from "./Slice/Listing/FilterListingSlice";
import RatingSliceListingReducer from "./Slice/Listing/RatingSliceListing";
import searchReducer from "./Slice/Listing/searchSlice";
import searchInputBoxReducer from "./Slice/category/SearchInputBoxSice";
import serviceDetailReducer from "./Slice/ServiceDetail/ServiceDetailScreenSlice";
import serviceDetailScreenInputReducer from "./Slice/ServiceDetail/serviceDetailScreenInputSlice";
import UpdateprofileSliceReucer from "./Slice/UpdateprofileSlice";
import serviceReducer from "./Slice/serviceSlice";
import AddStoreReducer from "./Slice/AddStore";
import UpdateStoreReducer from "./Slice/UpdateStoreSlice";
import customerSupportSliceReducer from "./Slice/CustomreSupportSlice";
import activeComponentReducer from "./Slice/activeComponentSlice";
import darkModeReducer from "./Slice/darkModeSlice";
import subscriptionSliceReducer from "./Slice/subscriptionSlice";
import userSliceReducer from "./Slice/userSlice";
import distanceReducer from "./Slice/distanceSlice";
import sponsorLocationReducer from "./Slice/sponsorLocation";
import MessageSliceFileAndDocReducer from "./Slice/MessageSliceFileAndDoc";
import dailyBudgetReducer from "./Slice/dailyBudgetSlice";
import startDateSponsorReducer from "./Slice/startdatesponcerslice";
import EnddateSponcerSliceReducer from "./Slice/EnddateSponcerSlice";
import campaignSliceReducer from "./Slice/campaignSlice";
import campaignGoalSliceReducer from "./Slice/campaignGoalSlice";
import priceReducersponcer from "./Slice/priceSlice";
import cardsReducer from "./Slice/cardsSlice";
import userReducer from "./Slice/userSlicegoogle ";
import UpdateStoreSubCategoriySliceReducer from "./Slice/UpdateStoreSubCategoriySlice";
import locationSearchHomeReducer from "./Slice/locationSearchHomeSlice";
import languageReducer from "./Slice/languageSlice";
import authReducer from "./Slice/authSlice"
import toggleSliceReducer from "./Slice/toggleSlice"


// All API File
import { GetAllCategory } from "./api/useGetCategory";
import { GetAllSubCategory } from "./api/useGetAllSubCategory";
import { AddCustomerSupport } from "./api/add-customersupport";
import { LoginUser } from "./api/auth/user-login";
import { NewUserRegisterAccount } from "./api/auth/newuser-registeraccount";
import { ResendotpandForgetpwd } from "./api/auth/ResendotpandForgetpwd";
import { ForgotPasswordVerifyOtp } from "./api/auth/Forgetpasswordotp-verify";
import { Resetpassword } from "./api/auth/Resetpassword";
import { getuserprofile } from "./api/auth/getuserprofile";
import { updateuserprofile } from "./api/auth/ProfileUpdate";
import { userReviewlist } from "./api/reviewApi/userreviewlist";
import { termAndcondition } from "./api/termAndcondition";
import { PrivacypolicyRes } from "./api/PrivacypolicyRes";
import { deleteuseraccount } from "./api/auth/deleteuseraccount";
import { ServiceLikedList } from "./api/ServiceLikedList";
import { appfeedback } from "./api/appfeedback";
import { AddService } from "./api/AddService";
import { filter } from "./api/filter";
import { servicelike } from "./api/servicelike";
import { updateService } from "./api/updateServiceApi";
import { UpdateStoreApi } from "./api/UpdateStoreApi";
import { Addcampaign } from "./api/Addcampaign";
import { AddCompaingGoal } from "./api/AddCompaingGoal";
import { Payment } from "./api/Payment";
import { AddSociallogin } from "./api/AddSociallogin";

export const store = configureStore({
  reducer: {
    // All slices method
    counter: counterReducer,
    auth: authReducer,
    customerSupport: customerSupportReducer,
    modals: modalReducer,
    login: loginReducer,
    registration: RegistrationReducer,
    forgotpwd: ForgotpwdReducer,
    resetPassword: ResetPasswordReducer,
    categorySelected: CategorySelectedIDandValuesReducer,
    subCategorySelected: SubCategorySelectedIdandValuesReducer,
    monthYear: monthYearReducer,
    firstStepFormValues: FirstStepFormValuesReducer,
    firstStep: FirstStepReducer,
    AddPost: AddPostSlice,
    businessHours: businessReducer,
    location: locationReducer,
    address: addressReducer,
    currentLocation: CurrentLocationReducer,
    category: categoryReducer,
    subcategory: SubCategoryReducer,
    filterSlice: filterSliceReducer,
    rating: ratingReducer,
    price: priceReducer,
    toggle: toggleSliceReducer,
    SerachLocationSlice: SerachLocationReducer,
    likeStatus: likeStatusReduce,
    categoryListing: categoryListingReducer,
    SubCategoryListing: SubCategoryListingReducer,
    PriceSliceListing: PriceSliceListingReducer,
    FilterListingSlice: FilterListingSliceReducer,
    RatingSliceListing: RatingSliceListingReducer,
    search: searchReducer,
    searchInputBox: searchInputBoxReducer,
    serviceDetail: serviceDetailReducer,
    serviceDetailScreenInput: serviceDetailScreenInputReducer,
    UpdateprofileSlice: UpdateprofileSliceReucer,
    service: serviceReducer,
    AddStore: AddStoreReducer,
    UpdateStore: UpdateStoreReducer,
    customerSupportSlice: customerSupportSliceReducer,
    activeComponent: activeComponentReducer,
    darkMode: darkModeReducer,
    subscription: subscriptionSliceReducer,
    distance: distanceReducer,
    sponsorLocation: sponsorLocationReducer,
    userSlice: userSliceReducer,
    MessageSliceFileAndDoc: MessageSliceFileAndDocReducer,
    dailyBudget: dailyBudgetReducer,
    startDateSponsor: startDateSponsorReducer,
    endDateSponsor: EnddateSponcerSliceReducer,
    campaign: campaignSliceReducer,
    campaignGoal: campaignGoalSliceReducer,
    pricesponcer: priceReducersponcer,
    cards: cardsReducer,
    user: userReducer,
    UpdateStoreSubCategoriySlice: UpdateStoreSubCategoriySliceReducer,
    locationSearchHome: locationSearchHomeReducer,
    language: languageReducer,

    // All Api Methods
    [GetAllCategory.reducerPath]: GetAllCategory.reducer,
    [GetAllSubCategory.reducerPath]: GetAllSubCategory.reducer,
    [AddCustomerSupport.reducerPath]: AddCustomerSupport.reducer,
    [LoginUser.reducerPath]: LoginUser.reducer,
    [NewUserRegisterAccount.reducerPath]: NewUserRegisterAccount.reducer,
    [ResendotpandForgetpwd.reducerPath]: ResendotpandForgetpwd.reducer,
    [ForgotPasswordVerifyOtp.reducerPath]: ForgotPasswordVerifyOtp.reducer,
    [Resetpassword.reducerPath]: Resetpassword.reducer,
    [getuserprofile.reducerPath]: getuserprofile.reducer,
    [updateuserprofile.reducerPath]: updateuserprofile.reducer,
    [userReviewlist.reducerPath]: userReviewlist.reducer,
    [termAndcondition.reducerPath]: termAndcondition.reducer,
    [PrivacypolicyRes.reducerPath]: PrivacypolicyRes.reducer,
    [deleteuseraccount.reducerPath]: deleteuseraccount.reducer,
    [ServiceLikedList.reducerPath]: ServiceLikedList.reducer,
    [appfeedback.reducerPath]: appfeedback.reducer,
    [AddService.reducerPath]: AddService.reducer,
    [filter.reducerPath]: filter.reducer,
    [servicelike.reducerPath]: servicelike.reducer,
    [updateService.reducerPath]: updateService.reducer,
    [UpdateStoreApi.reducerPath]: UpdateStoreApi.reducer,
    [Addcampaign.reducerPath]: Addcampaign.reducer,
    [AddCompaingGoal.reducerPath]: AddCompaingGoal.reducer,
    [Payment.reducerPath]: Payment.reducer,
    [AddSociallogin.reducerPath]: AddSociallogin.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializable state check
      thunk: true, // Allows dispatching functions as actions
      immutableCheck: false, // Allows dispatching immutable state (like arrays or objects) as actions
    })
      .concat(GetAllCategory.middleware)
      .concat(GetAllSubCategory.middleware)
      .concat(AddCustomerSupport.middleware)
      .concat(LoginUser.middleware)
      .concat(NewUserRegisterAccount.middleware)
      .concat(ResendotpandForgetpwd.middleware)
      .concat(ForgotPasswordVerifyOtp.middleware)
      .concat(Resetpassword.middleware)
      .concat(getuserprofile.middleware)
      .concat(updateuserprofile.middleware)
      .concat(userReviewlist.middleware)
      .concat(termAndcondition.middleware)
      .concat(PrivacypolicyRes.middleware)
      .concat(deleteuseraccount.middleware)
      .concat(ServiceLikedList.middleware)
      .concat(appfeedback.middleware)
      .concat(AddService.middleware)
      .concat(filter.middleware)
      .concat(servicelike.middleware)
      .concat(updateService.middleware)
      .concat(UpdateStoreApi.middleware)
      .concat(Addcampaign.middleware)
      .concat(AddCompaingGoal.middleware)
      .concat(Payment.middleware)
      .concat(AddSociallogin.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
