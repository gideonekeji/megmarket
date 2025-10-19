"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import "./style.css";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

const ModalLable = dynamic(() => import("./ModalLable"));
const BusinessDetail = dynamic(() => import("./BusinessDetail/BusinessDetail"));
const ContactDetails = dynamic(() => import("./ContactDetails/ContactDetails"));
const BusinessTime = dynamic(() => import("./BusinessTime/BusinessTime"));
const AddStepCurrent = dynamic(() => import("./AddStepCurrent"));

export default function AddPostModal() {
  const user_id = Cookies.get("user_id");
  const modalData = useAppSelector((state) => state.modals.AddPostModal);
  const dispatch = useAppDispatch();

  const AddPostData = useAppSelector((state) => state.AddPost);


  function close() {
    dispatch(hideModal("AddPostModal"));
  }

  const AllAddpostData = useAppSelector((state) => state.AddPost);

  // address data
  const address = useAppSelector((state) => state.address);
  const location = useAppSelector((state) => state.location);

  const joinAddress =
    `${address.house} ${address.area} ${address.landmark}`.trim();

  // category values  id

  const category_id = useAppSelector(
    (state) => state.categorySelected.selectedCategory.id
  );

  // subcategory values id
  const subcategory_id = useAppSelector(
    (state) => state.subCategorySelected.selectedSubCategory.id
  );

  // year  and month
  const getvalues = useAppSelector((state) => state.monthYear);

  const published_month = getvalues.monthValue
    ? dayjs(getvalues.monthValue).format("MMMM")
    : null;

  const published_year = getvalues.yearValue
    ? dayjs(getvalues.yearValue).format("YYYY")
    : null;

  // selected date

  const selectedDate = useAppSelector((state) => state.businessHours);

  // all values

  const postData = {
    address: joinAddress,
    category_id: category_id,
    subcategory_id: subcategory_id,
    published_month: published_month,
    published_year: published_year,
    service_description: AddPostData.service_description,
    service_email: AddPostData.service_email,
    service_image: AddPostData.service_image,
    service_name: AddPostData.service_name,
    service_phone: AddPostData.service_phone,
    service_website: AddPostData.service_website,
    facebook_link: AddPostData.facebook_link,
    instagram_link: AddPostData.instagram_link,
    twitter_link: AddPostData.twitter_link,
    whatsapp_link: AddPostData.whatsapp_link,
    vendor_id: user_id,
    is_featured: AddPostData.is_featured,
    lat: location.lat,
    lon: location.lng,
    open_days: selectedDate.selectedDays.join(","),
    open_time: selectedDate.startTime,
    close_time: selectedDate.endTime,
    closed_days: selectedDate.unselectedDays.join(","),
    employee_strength: AddPostData.employee_strength,
    video: "",
    video_thumbnail: "",
  };


  // Logging all the values

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);


  return (
    <>
      <Dialog
        open={modalData}
        onClose={close}
        as="div"
        className="overflow-y-auto"
      >
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center overflow-y-auto">
            <DialogPanel
              transition
              className={`mx-auto h-auto w-[90%] overflow-y-auto rounded-2xl backdrop-blur-2xl duration-300 ease-out xl:w-[88%] 2xl:w-[58%] ${
                isDarkMode ? "text-white  bg-[#2F2F2F]" : " bg-white "
              }`}
            >
              {/* heading */}
              <div
                className={` relative flex h-[5rem] w-full items-center justify-center rounded-t-2xl  ${
                  isDarkMode
                    ? "  bg-[#FFFFFF0A] text-white"
                    : "text-black step-container"
                }`}
              >
                <ModalLable />
              </div>

              {/*  step  */}
              <div className="flex h-[8rem] w-full flex-col items-center justify-center gap-6    bg-light-button-base bg-opacity-[4%]">
                <AddStepCurrent />
              </div>
              {/* step form */}
              <div className="mx-auto mt-[3rem] w-[90%] xl:w-[80%] overflow-y-auto">
                {AddPostData.add_new_post_steps === 1 && <BusinessDetail />}
                {AddPostData.add_new_post_steps === 2 && <ContactDetails />}
                {AddPostData.add_new_post_steps === 3 && <BusinessTime />}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
