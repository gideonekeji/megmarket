"use client";
import BusinessOpeningHours from "./BusinessOpeningHours";
import DaysofWeek from "./DaysofWeek";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import Cookies from "js-cookie";
import { useAddServiceMutation } from "@/app/storeApp/api/AddService";
import { toast } from "react-toastify";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import Metadata from "./Metadata";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import step2 from "../../../../public/assets/Image/step2.png"
import Image from "next/image";

function BusinessTime() {
  const dispatch = useAppDispatch();
  const addPostData = useAppSelector((state) => state.AddPost);

  console.log("my add store slice values @@##############@@@@@@@@@@@@@@@@@@", addPostData);



  const City_Name_liveLocation = useAppSelector((state) => state.currentLocation.cityImage)

  const locationImage = useAppSelector((state) => state.location.image);


  const finalImage = City_Name_liveLocation
    ? City_Name_liveLocation
    : (() => {
      console.log("Using location image:", locationImage);
      return locationImage;
    })();


  const handlePreviousStep = () => {
    if ((addPostData.add_new_post_steps ?? 0) > 1) {
      dispatch(
        updateAddPostData({
          add_new_post_steps: ((addPostData.add_new_post_steps ?? 0) - 1) as
            | 1
            | 2
            | 3,
        })
      );
    }
  };

  const storesliceImage = useAppSelector(
    (state) => state.AddPost.service_image
  );

  const coverImage = useAppSelector((state) => state.AddPost.cover_image);

  const servicePhone = useSelector((state) => state.AddPost.service_phone);
  const countryCodeFromSice = useSelector(
    (state) => state.AddPost.service_country_code
  );

  const user_id = Cookies.get("user_id");
  const address = useAppSelector((state) => state.address);
  const location = useAppSelector((state) => state.location);
  const current_address = useAppSelector((state) => state.currentLocation);
  const category_id = useAppSelector(
    (state) => state.categorySelected.selectedCategory.id
  );
  const subcategory_id = useAppSelector(
    (state) => state.subCategorySelected.selectedSubCategory
  );

  const selectedDate = useAppSelector((state) => state.businessHours);

  

  const getvalues = useAppSelector((state) => state.monthYear);

  const published_month = getvalues.monthValue

  

  const published_year = getvalues.yearValue
    ? dayjs(getvalues.yearValue).format("YYYY")
    : null;


  

  // Use the mutation hook
  const [addService, { isLoading, isSuccess, isError, error }] =
    useAddServiceMutation();

  // Validation function
  const validateFields = () => {
    if (!addPostData.service_name) {
      toast.error("Service name is required");
      return false;
    }
    if (!addPostData.service_email) {
      toast.error("Service email is required");
      return false;
    }
    if (!servicePhone) {
      toast.error("Service phone is required");
      return false;
    }

    if (!storesliceImage || storesliceImage.length === 0) {
      toast.error("Service image is required");
      return false;
    }
    if (!selectedDate.selectedDays.length) {
      toast.error("Open days are required");
      return false;
    }
    if (!selectedDate.startTime || !selectedDate.endTime) {
      toast.error("Business opening hours are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Validate before submitting
    const isValid = validateFields();
    if (!isValid) return;

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append all the fields to the FormData object
      // formData.append("address", joinAddress);
      if (category_id) {
        formData.append("category_id", category_id);
      }
      formData.append(
        "subcategory_id",
        Array.isArray(subcategory_id)
          ? subcategory_id
            .map((item) => item.id) // Extract the 'id' from each object
            .filter((id) => id !== "") // Filter out any empty strings
            .join(",") // Join the valid IDs into a string
          : ""
      );

      if (published_month) {
        formData.append("published_month", published_month);
      }
      if (addPostData.cover_image && addPostData.cover_image.length > 0) {
        formData.append("cover_image", addPostData.cover_image[0]);
      }
      if (published_year) {
        formData.append("published_year", published_year);
      }

      if (finalImage) {
        formData.append("city_image", finalImage)
      }
      if (addPostData.service_description) {
        formData.append("service_description", addPostData.service_description);
      }
      if (addPostData.service_email) {
        formData.append("service_email", addPostData.service_email);
      }
      if (addPostData.service_name) {
        formData.append("service_name", addPostData.service_name);
      }
      if (servicePhone) {
        formData.append("service_phone", servicePhone);
      }
      if (addPostData.service_website) {
        formData.append("service_website", addPostData.service_website);
      }
      if (addPostData.facebook_link) {
        formData.append("facebook_link", addPostData.facebook_link);
      }
      if (addPostData.instagram_link) {
        formData.append("instagram_link", addPostData.instagram_link);
      }
      if (addPostData.twitter_link) {
        formData.append("twitter_link", addPostData.twitter_link);
      }
      if (addPostData.whatsapp_link) {
        formData.append("whatsapp_link", addPostData.whatsapp_link);
      }
      if (user_id) {
        formData.append("vendor_id", user_id);
      }
      if (addPostData.is_featured !== undefined) {
        formData.append("is_featured", addPostData.is_featured);
      }

      if (addPostData.video_url) {
        formData.append("video_url", addPostData.video_url);
      }

      if (addPostData.address) {
        formData.append("address", addPostData.address);
      }

      if (addPostData.area) {
        formData.append("area", addPostData.area);
      }

      if (addPostData.city) {
        formData.append("city", addPostData.city);
      }

      if (addPostData.state) {
        formData.append("state", addPostData.state);
      }

      // formData.append(
      //   "lat",
      //   String(location.lat || current_address.latitude) || ""
      // );
      // formData.append(
      //   "lon",
      //   String(location.lng || current_address.longitude) || ""
      // );
      formData.append("open_days", selectedDate.selectedDays.join(","));
      formData.append("open_time", selectedDate.startTime || "");
      formData.append("close_time", selectedDate.endTime || "");
      formData.append("closed_days", selectedDate.unselectedDays.join(","));
      formData.append("employee_strength", addPostData.employee_strength || "");
      formData.append("country", addPostData.country || "");
      formData.append("lat", addPostData.lat || "");
      formData.append("lon", addPostData.lon || "");
      formData.append("video", "");
      formData.append("video_thumbnail", "");
      formData.append("meta_title", addPostData.meta_title || "");
      formData.append("meta_description", addPostData.meta_description || "");
      formData.append("service_country_code", countryCodeFromSice);
      formData.append("video_url", addPostData.video_url);

      // Check if there are files to upload
      storesliceImage?.forEach((file) => {
        formData.append("service_images[]", file);
      });


      // Call the API mutation with the FormData
      await addService(formData).unwrap();
      toast.success("Service added successfully");
      dispatch(hideModal("AddPostModal"));
      window.location.href = "/";
      Cookies.set("FormSubmited", "true");
    } catch (err) { }
  };

  const [triggerUpdateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id }).then((response) => {
        if (response?.data) {
          console.log(" my responce api ", response.data.is_store);
          Cookies.set("is_store", response.data?.is_store);
          Cookies.set("store_approval", response.data?.store_approval);
          Cookies.set("service_id", response.data?.service_id);
          Cookies.set("subscriber_user", response.data?.subscriber_user);
          Cookies.set("sponcer_id", response.data.campaign);
          Cookies.set("email", response.data.userdetails.email);
          Cookies.set("mobile", response.data.userdetails.mobile);
          Cookies.set("ispaymentsuccess", response.data.sponser)
          Cookies.set("start_date", response.data.start_date)
          Cookies.set("end_date", response.data.end_date)
          Cookies.set("expire_status", response.data.expire_status)
          Cookies.set("fullname", `${response.data.userdetails.first_name} ${response.data.userdetails.last_name}`);
          console.log(
            " my plane  name ",
            response.data.subscriptionDetails.plan_name
          );
          const name =
            response.data?.subscriptionDetails.plan_name.split(" ")[0];
          Cookies.set(
            "plane_name",
            response.data?.subscriptionDetails.plan_name.split(" ")[0]
          );
          Cookies.set("subscription_id", response.data.subscriptionDetails.subscription_id)
        }
      });
    }
  }, [user_id, triggerUpdateProfile]);

  return (
    <div className="flex w-full flex-col items-center space-y-6 md:items-start">
      <BusinessOpeningHours />
      <DaysofWeek />
      <Metadata />
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-6 pb-10 md:w-full md:flex-row">


        <button
          type="submit"
          className="flex w-fit items-center justify-between gap-2 rounded-lg bg-light-button-base px-12 py-[14px]"
          onClick={handlePreviousStep}
        >
          <Image
            src={step2}
            alt="steponebg"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="font-poppins text-lg font-medium   2xl:text-B3 text-white">
            Previous
          </p>
        </button>
        <div>
          <button
            onClick={handleSubmit}
            className="font-poppins rounded-xl  bg-light-button-base px-[4rem] py-3 font-medium text-white"
            disabled={isLoading} // Disable button if the request is in progress
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessTime;
