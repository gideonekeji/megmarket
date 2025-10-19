import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    countryCode: "",
    role: "",
    image: "",
    subscribedUser: 0,
  },
  subscriptionDetails: {
    userId: 0,
    planName: "",
    price: "",
    expireDate: "",
    planImage: "",
  },
  isStore: false,
};

const UpdateprofileSlice = createSlice({
  name: "UpdateprofileSlice",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload.user;
      state.subscriptionDetails = action.payload.subscriptionDetails;
      state.isStore = action.payload.isStore;
    },
    updateSubscription: (state, action) => {
      state.subscriptionDetails = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUserProfile, updateSubscription, updateUserInfo } =
  UpdateprofileSlice.actions;

export default UpdateprofileSlice.reducer;
