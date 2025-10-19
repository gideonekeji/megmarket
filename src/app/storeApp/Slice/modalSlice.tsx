import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  loginModal: boolean;
  AddPostModal: boolean;
  RegisterModal: boolean;
  RegisterModalVerifyOtpModal: boolean;
  RegisterWithMobilenumber: boolean;
  RegisterWithMobilenumberVerifyOtpModal: boolean;
  ForgotPasswordModal: boolean;
  ForgotPasswordOtpVerfiyModal: boolean;
  ResetPasswordModal: boolean;
  DeleteAccount: boolean;
  AppFeedback: boolean;
  AppLanguage: boolean;
  ShareAppModal: boolean;
  LogoutModal: boolean;
  CompleteAddressModal: boolean;
  ServiceDetailPhotoSectionModal: boolean;
  ServiceDetailScreenModalImage: boolean;
  ServiceDetailScreenFiltterModal: boolean;
  ServiceDetailScreenRatingModal: boolean;
  ServiceDetailScreenImageSubModal: boolean;
  BusinessNameModal: boolean;
  ContactDetailsModal: boolean;
  BusinessAddressToolsModal: boolean;
  BusinessTimingsModal: boolean;
  YearEstablishmentModal: boolean;
  BusinesscategoriesModal: boolean;
  NumberofEmployeesModal: boolean;
  BusinessImagesModal: boolean;
  BusinessWebsiteModal: boolean;
  FollowSocialMediaModal: boolean;
  BusinessVideoModal: boolean;
  AddStoreModal: boolean;
  UpdateAddStoreModal: boolean;
  DeleteStoreModal: boolean;
  VisitedModal: boolean;
  SelectLocationVisite: boolean;
  RegisterWithMobailNumberOtpVerify: boolean;
  BusinessPorfileUpdateModal: boolean;
  BusinessRebiewListModal: boolean;
  CompleteBusinessModal: boolean;
  MessageSendModal: boolean;
  VendorInfoModal: boolean;
  CampaignModal: boolean;
  Paymentsuccessful: boolean;
  StoresDetailModal: boolean;
  ServiceDetailScreenFiltterModalDetail: boolean;
  DeleteReviewModal: boolean;
  EditReviewModal: boolean;
  SponcerModalAfterAdd: boolean;
  VisitedModalfistime: boolean;
  ImageModalMessage: boolean;
  ImageModalRightSide: boolean;
  CheackStoreAdd: boolean;
  CheackStoreandPlaneModal: boolean;
  ViewAllRatingModal: boolean;
  CheackUserNameSocailLOgin:boolean;
  PlaceExpireModal:boolean;

}

const initialState: ModalState = {
  loginModal: false,
  AddPostModal: false,
  RegisterModal: false,
  RegisterModalVerifyOtpModal: false,
  RegisterWithMobilenumber: false,
  RegisterWithMobilenumberVerifyOtpModal: false,
  ForgotPasswordModal: false,
  ForgotPasswordOtpVerfiyModal: false,
  ResetPasswordModal: false,
  DeleteAccount: false,
  AppFeedback: false,
  AppLanguage: false,
  ShareAppModal: false,
  LogoutModal: false,
  CompleteAddressModal: false,
  ServiceDetailPhotoSectionModal: false,
  ServiceDetailScreenModalImage: false,
  ServiceDetailScreenFiltterModal: false,
  ServiceDetailScreenRatingModal: false,
  ServiceDetailScreenImageSubModal: false,
  BusinessNameModal: false,
  ContactDetailsModal: false,
  BusinessAddressToolsModal: false,
  BusinessTimingsModal: false,
  YearEstablishmentModal: false,
  BusinesscategoriesModal: false,
  NumberofEmployeesModal: false,
  BusinessImagesModal: false,
  BusinessWebsiteModal: false,
  FollowSocialMediaModal: false,
  AddStoreModal: false,
  UpdateAddStoreModal: false,
  DeleteStoreModal: false,
  VisitedModal: false,
  SelectLocationVisite: false,
  RegisterWithMobailNumberOtpVerify: false,
  BusinessVideoModal: false,
  BusinessPorfileUpdateModal: false,
  BusinessRebiewListModal: false,
  CompleteBusinessModal: false,
  MessageSendModal: false,
  VendorInfoModal: false,
  CampaignModal: false,
  Paymentsuccessful: false,
  StoresDetailModal: false,
  ServiceDetailScreenFiltterModalDetail: false,
  DeleteReviewModal: false,
  EditReviewModal: false,
  SponcerModalAfterAdd: false,
  VisitedModalfistime: false,
  ImageModalMessage: false,
  ImageModalRightSide: false,
  CheackStoreAdd: false,
  CheackStoreandPlaneModal: false,
  ViewAllRatingModal: false,
  CheackUserNameSocailLOgin:false,
  PlaceExpireModal:false
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<keyof ModalState>) => {
      state[action.payload] = true;
    },
    hideModal: (state, action: PayloadAction<keyof ModalState>) => {
      state[action.payload] = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

// cheack any modal opne and close

export const selectAnyModalOpen = (state: { modals: ModalState }) => {
  return Object.values(state.modals).includes(true);
};
export default modalSlice.reducer;
