import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interfaces as per your structure
export interface PlanService {
  plan_services: string;
  status: number;
}

export interface SubscriptionDetail {
  id: number;
  plan_name: string;
  description: string;
  price: string;
  validity_day: string;
  plan_services: PlanService[];
}

export interface SubscriptionPlan {
  status: boolean;
  message: string;
  subscriptionDetail: SubscriptionDetail[];
}

// Initial state of the slice
const initialState: SubscriptionPlan = {
  status: false,
  message: "",
  subscriptionDetail: [],
};

// Create the slice
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    // Action to set the subscription plan data
    setSubscriptionPlan(state, action: PayloadAction<SubscriptionPlan>) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.subscriptionDetail = action.payload.subscriptionDetail;
    },
    // Action to update a specific plan's services
    updatePlanService(
      state,
      action: PayloadAction<{ planId: number; updatedServices: PlanService[] }>
    ) {
      const { planId, updatedServices } = action.payload;
      const plan = state.subscriptionDetail.find((plan) => plan.id === planId);
      if (plan) {
        plan.plan_services = updatedServices;
      }
    },
    // Action to update the subscription status message
    updateSubscriptionMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
});

// Export the actions
export const {
  setSubscriptionPlan,
  updatePlanService,
  updateSubscriptionMessage,
} = subscriptionSlice.actions;

// Export the reducer
export default subscriptionSlice.reducer;
