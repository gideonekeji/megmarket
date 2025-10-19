"use client";
import React from "react";
import { useDispatch } from "react-redux"; // Import dispatch from Redux
import { useAppSelector } from "@/app/hooks/hooks";
import SubCategoryDropdwon from "./SubCategoryDropdwon";
import MonthYear from "./MonthYear";
import CategoryDropdown from "./CategoryDropdown";
import UploadImageAndVideo from "./UploadImageAndVideo";
import NoofEmployees from "./NoofEmployees";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import BusinessName from "./BusinessName";
import BusinessAddress from "./BusinessAddress";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import UploadCoverImage from "./UploadCoverImage";
import dayjs from "dayjs";
import VideoUrlAddPost from "./VideoUrlAddPost";
import useTranslation from "@/app/hooks/useTranslation";
import BusinessDescriptionNewVersion from "./BusinessDescriptionNewVersion";
import steponebg from "../../../../../public/assets/Image/step1.png"
import Image from "next/image";

function BusinessDetailForm() {
  const addPostData = useAppSelector((state) => state.AddPost);

  const storesliceImage = useAppSelector(
    (state) => state.AddPost.service_image
  );


  const category_id = useAppSelector(
    (state) => state.categorySelected.selectedCategory.id
  );
  const subcategory_id = useAppSelector(
    (state) => state.subCategorySelected.selectedSubCategory
  );

  // Filter out any empty IDs and join them into a comma-separated string
  const ids = Array.isArray(subcategory_id)
    ? subcategory_id
      .map((item) => item.id) // Extract the 'id' from each object
      .filter((id) => id !== "") // Filter out any empty strings
      .join(",") // Join the valid IDs into a string
    : "";

  const selectedDate = useAppSelector((state) => state.businessHours);





  const getvalues = useAppSelector((state) => state.monthYear);

  const published_month = getvalues.monthValue

  const published_year = getvalues.yearValue
    ? dayjs(getvalues.yearValue).format("YYYY")
    : null;

  const address = useAppSelector((state) => state.AddPost.address);


  console.log("published_yearpublished_yearpublished_year", published_month)




  console.log(" my add post data from slice values ", addPostData);

  // Validation function
  const validateFields = () => {
    // Check if required fields are empty and show the appropriate toast messages
    if (!addPostData.service_name) {
      toast.error("Business Name is required");
      return false;
    }

    if (!addPostData.cover_image) {
      toast.error("Cover image is required");
      return false;
    }

    if (!storesliceImage || storesliceImage.length === 0) {
      toast.error("Service image is required");
      return false;
    }


    if (!address) {
      toast.error("Please select a Business Address");
      return false;
    }

    if (!addPostData.service_description) {
      toast.error("Business Address is required");
      return false;
    }


    if (!category_id) {
      toast.error("Please select a category");
      return false;
    }

    // if (!ids) {
    //   toast.error("Please select a sub-category");
    //   return false;
    // }

    if (published_month==null) {
      toast.error("Please select a published_month");
      return false;
    }

    if (published_year == null) {
      toast.error("Please select a published_year");
      return false;
    }

    // if (!addPostData.employee_strength) {
    //   toast.error("Please select employee ");
    //   return false;
    // }
    // if (!addPostData.video_url) {
    //   toast.error("Please select video_url ");
    //   return false;
    // }

    return true;
  };

  const dispatch = useDispatch(); // Initialize dispatch
  const AddPostData = useAppSelector((state) => state.AddPost);

  const handleNextStep = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate before submitting
    const isValid = validateFields();
    if (!isValid) return; // If validation fails, stop form submission

    // Dispatch to update the current step
    dispatch(
      updateAddPostData({
        add_new_post_steps: ((AddPostData.add_new_post_steps || 1) + 1) as
          | 1
          | 2
          | 3,
      })
    );
  };


  const { getTranslation } = useTranslation();


  return (
    <>
      <div className="w-full overflow-y-auto h-auto">
        <form onSubmit={handleNextStep} className="overflow-y-auto h-auto">
          <div className="w-full pb-6 h-auto">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 h-auto">
              {/* left side part */}
              <div className="grid h-fit w-full gap-6">
                <BusinessName />
                {/* <BusinessDescription /> */}
                <BusinessDescriptionNewVersion />
                <BusinessAddress />
                <CategoryDropdown />
                <SubCategoryDropdwon />

              </div>
              {/* right side */}
              <div className="grid h-fit w-full  gap-6">
                <UploadCoverImage />
                <UploadImageAndVideo />
                <div className="flex h-fit flex-col gap-6">
                  {/* <FeaturedService /> */}
                  <VideoUrlAddPost />
                  <NoofEmployees />
                  <MonthYear />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center mt-12">
              <button
                type="submit"
                className="flex w-fit items-center justify-between gap-2 rounded-lg bg-light-button-base px-12 py-[14px]"
              >
                <Image
                  src={steponebg}
                  alt="steponebg"
                  width={20} // adjusted size for better visibility
                  height={20}
                  className="object-contain"
                />
                <p className="font-poppins text-lg font-medium   2xl:text-B3 text-white">
                  {getTranslation("Next Step ", "Next Step")}
                </p>
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
}

export default BusinessDetailForm;
