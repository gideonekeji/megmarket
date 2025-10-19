import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks"; // Use useAppDispatch to dispatch actions
import React from "react";
import Cookies from "js-cookie";
import { useAddcampaignMutation } from "@/app/storeApp/api/Addcampaign";
import { useAddCompaingGoalMutation } from "@/app/storeApp/api/AddCompaingGoal";
import { ToastContainer, toast } from "react-toastify";
import { setCampaignName } from "@/app/storeApp/Slice/campaignSlice";
import { setStartDate } from "@/app/storeApp/Slice/startdatesponcerslice";
import { setEndDate } from "@/app/storeApp/Slice/EnddateSponcerSlice";
import { setGoalData } from "@/app/storeApp/Slice/campaignGoalSlice";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useGetAllCompain } from "@/app/storeApp/api/useGetAllCompain";

function AddConpainAndAddGoal() {
  const startdate = useAppSelector((state) => state.startDateSponsor.startDate);
  const enddate = useAppSelector((state) => state.endDateSponsor.endDate);
  const campaignName = useAppSelector((state) => state.campaign.campaignName);
  const distanceValue = useAppSelector((state) => state.distance.distance);
  const { address, latLng } = useAppSelector((state) => state.sponsorLocation);
  const price = useAppSelector((state) => state.pricesponcer.selectedPrice);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const dispatch = useAppDispatch();
  const { refetch } = useGetAllCompain();

  // Convert both start and end date to Date objects
  const start = new Date(startdate);
  let end = new Date(enddate);

  // Check if end date is invalid or not selected
  if (isNaN(end.getTime())) {
    // Default end date to current date if not selected
    end = new Date();
  }

  // Calculate the difference in time (in milliseconds)
  const timeDifference = end - start;

  // Convert time difference from milliseconds to days
  const totalDays = Math.max(timeDifference / (1000 * 3600 * 24), 1); // Ensure minimum is 1 day

  console.log("My total days:", totalDays);

  const campaign_id = Cookies.get("campaign_id");

  // Initialize mutation hooks
  const [addCampaign, { isLoading, error }] = useAddcampaignMutation();
  const [addCampaignGoal] = useAddCompaingGoalMutation();

  // Handle button click
  const handleButtonClick = () => {
    // Validation checks
    if (!campaignName) {
      toast.error("Campaign name is required.");
      return;
    }
    if (!address) {
      toast.error("Address is required.");
      return;
    }
    if (isNaN(distanceValue)) {
      toast.error("Distance value must be a number.");
      return;
    }
    if (!startdate) {
      toast.error("Start date is required.");
      return;
    }
    if (!enddate) {
      toast.error("End date is required.");
      return;
    }

    // If campaign_id exists in cookies, skip addCampaign and directly call addCampaignGoal
    if (campaign_id) {
      // If campaign_id exists in cookies, we proceed with adding the campaign goal directly
      const goalData = new FormData();

      goalData.append("campaign_id", campaign_id || ""); // Use the campaign_id from cookies
      goalData.append("start_date", startdate || "");
      goalData.append("end_date", enddate || "");
      goalData.append("days", totalDays.toString() || "");
      goalData.append("price", price.toString() || "");

      // Step 3: Call the addCampaignGoal API to create the campaign goal
      addCampaignGoal(goalData)
        .unwrap()
        .then((goalResponse) => {
          console.log(
            "Campaign goal added successfully:",
            goalResponse.campaign_details
          );

          // Dispatch the setGoalData action to store the goal response in Redux
          dispatch(
            setGoalData({
              goalId: goalResponse?.goal?.id,
              campaignId: goalResponse?.goal?.campaign_id,
              startDate: goalResponse?.goal?.start_date,
              endDate: goalResponse?.goal?.end_date,
              totalDays: goalResponse?.goal?.total_days,
              price: goalResponse?.goal?.price,
              campaign_name: goalResponse.campaign_details.campaign_name,
              address: goalResponse.campaign_details.address,
              area_distance: goalResponse.campaign_details.area_distance,
            })
          );
          Cookies.set("sponcer_id", goalResponse?.goal?.id);
          sessionStorage.setItem("planPrice", goalResponse?.goal?.price);
          // Success toast for campaign goal
          toast.success("Campaign goal added successfully! ");
          dispatch(showModal("CampaignModal"));
          dispatch(setCampaignName(""));
          dispatch(setStartDate(null));
          dispatch(setEndDate(null));
        })
        .catch((goalError) => {
          console.error("Error adding campaign goal:", goalError);
          toast.error("Failed to add campaign goal.");
        });
    } else {
      // If campaign_id does not exist in cookies, proceed with creating the campaign first
      const formData = new FormData();
      formData.append("vendor_id", vendor_id || "");
      formData.append("service_id", service_id || "");
      formData.append("campaign_name", campaignName || "");
      formData.append("address", address || "");
      formData.append("lat", latLng.lat || "");
      formData.append("lon", latLng.lng || "");
      formData.append("area_distance", `1,${distanceValue.toString() || ""}`);

      // Step 1: Create the campaign
      addCampaign(formData)
        .unwrap()
        .then((response) => {
          console.log("Campaign added successfully:", response);

          // Step 2: Check if the response contains a valid campaign ID
          const campaignId = response?.campaign?.id || campaign_id; // Use campaign_id from cookies if available

          Cookies.set("campaign_id", campaignId);

          if (campaignId) {
            // Proceed to send campaign goal using campaign ID
            const goalData = new FormData();

            goalData.append("campaign_id", campaignId || ""); // Use the appropriate campaign ID
            goalData.append("start_date", startdate || "");
            goalData.append("end_date", enddate || "");
            goalData.append("days", totalDays.toString() || "");
            goalData.append("price", price.toString() || "");

            // Step 3: Call the second API (addCampaignGoal) to create the campaign goal
            addCampaignGoal(goalData)
              .unwrap()
              .then((goalResponse) => {
                console.log(
                  "Campaign goal added successfully:@@@@@@@@@@@@@@@@@@@@@@@@",
                  goalResponse.campaign_details
                );

                // Dispatch the setGoalData action to store the goal response in Redux
                dispatch(
                  setGoalData({
                    goalId: goalResponse?.goal?.id,
                    campaignId: goalResponse.campaign_details.id,
                    startDate: goalResponse?.goal?.start_date,
                    endDate: goalResponse?.goal?.end_date,
                    totalDays: goalResponse?.goal?.total_days,
                    price: goalResponse?.goal?.price,
                    campaign_name: goalResponse.campaign_details.campaign_name,
                    address: goalResponse.campaign_details.address,
                    area_distance: goalResponse.campaign_details.area_distance,
                  })
                );

                sessionStorage.setItem("goalId", goalResponse?.goal?.id);
                sessionStorage.setItem(
                  "campaignId",
                  goalResponse.campaign_details.id
                );
                sessionStorage.setItem(
                  "startDate",
                  goalResponse?.goal?.start_date
                );
                sessionStorage.setItem("endDate", goalResponse?.goal?.end_date);
                sessionStorage.setItem(
                  "totalDays",
                  goalResponse?.goal?.total_days
                );
                sessionStorage.setItem("price", goalResponse?.goal?.price);
                sessionStorage.setItem(
                  "campaign_name",
                  goalResponse.campaign_details.campaign_name
                );
                sessionStorage.setItem(
                  "address",
                  goalResponse.campaign_details.address
                );
                sessionStorage.setItem(
                  "area_distance",
                  goalResponse.campaign_details.area_distance
                );

                Cookies.set("sponcer_id", goalResponse?.goal?.id);
                sessionStorage.setItem("planPrice", goalResponse?.goal?.price);

                // Success toast for campaign goal
                toast.success("Campaign and goal added successfully!");
              })
              .catch((goalError) => {
                console.error("Error adding campaign goal:", goalError);
                toast.error("Failed to add campaign goal.");
              });
          } else {
            console.error(
              "Failed to get valid campaign ID from response or cookies"
            );
            toast.error("Failed to create campaign.");
          }

          // Clear values in the state
          dispatch(setCampaignName(""));
          dispatch(setStartDate(null));
          dispatch(setEndDate(null));
          refetch();
          dispatch(showModal("CampaignModal"));
        })
        .catch((err) => {
          console.error("Error adding campaign:", err);
          toast.error("Failed to create campaign.");
        });
    }
  };

  return (
    <div className="w-full justify-center flex items-center">
      <button
        className="w-fit px-14 rounded-lg py-2 text-white    bg-light-button-base font-poppins"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Continue   "}
      </button>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default AddConpainAndAddGoal;
