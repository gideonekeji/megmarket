"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect, useState } from "react";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice"; // Import the action
import addbtn from "../../../../../../public/assets/Image/add.png";
import useTranslation from "@/app/hooks/useTranslation";
import { toast, ToastContainer } from "react-toastify";

function FollowSocialMediaModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.FollowSocialMediaModal
  );
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const facebook_link = useAppSelector(
    (state) => state.service.service.facebook_link
  );
  const instagram_link = useAppSelector(
    (state) => state.service.service.instagram_link
  );
  const twitter_link = useAppSelector(
    (state) => state.service.service.twitter_link
  );
  const whatsapp_link = useAppSelector(
    (state) => state.service.service.whatsapp_link
  );

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("FollowSocialMediaModal"));
  const handalfacebook_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ facebook_link: e.target.value }));
  };
  const handalinstagram_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ instagram_link: e.target.value }));
  };
  const handaltwitter_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ twitter_link: e.target.value }));
  };
  const handlewhatshop_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ whatsapp_link: e.target.value }));
  };


  const Demo = Cookies.get("demoUser") === "true";


  const handleSave = async () => {

    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    try {
      // Call the update API with updated
      const updateData = {
        vendor_id,
        service_id,
        facebook_link,
        instagram_link,
        twitter_link,
        whatsapp_link,
      };
      await updateService(updateData).unwrap();

      // Optionally dispatch additional actions to update state (if needed)
      dispatch(updateServiceField({ facebook_link }));

      // Close modal after successful update
      close();
    } catch (error) {
      console.error("Error updating service website:", error);
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const { getTranslation } = useTranslation();

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
              }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-lg  ${isDarkMode ? "  bg-dark-Modalbgcolortop" : " modalbordercolor"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                {getTranslation("Follow on Social Media", "Follow on Social Media")}
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8   ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="h-auto   flex justify-center gap-1 items-center mx-auto py-6 w-[75%]">
              <div className="flex items-center relative   -top-[0.7rem] justify-center">
                <Image
                  src={infocircle}
                  className="h-4 w-6"
                  alt="Information icon"
                />
              </div>

              <p
                className={`text-[15px]   2xl:text-T8 font-normal text-center font-poppins   text-light-button-base`}
              >
                {getTranslation("Please provide the URL of your business website so customers can reach you.", "Please provide the URL of your business website so customers can reach you.")}
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto  flex-col   gap-6">
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${isDarkMode ? " text-white" : "text-[#000000]"
                    }`}
                  htmlFor="facebook_link"
                >
                  {getTranslation("Add Facebook profile link", "Add Facebook profile link")}
                </label>
                <div className="relative mt-1 flex items-center">
                  <input
                    type="text"
                    id="facebook_link"
                    name="facebook_link"
                    className="input-primary"
                    placeholder="Add Facebook profile link"
                    value={facebook_link}
                    onChange={handalfacebook_link}
                  />
                </div>
              </div>
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${isDarkMode ? " text-white" : "text-[#000000]"
                    }`}
                  htmlFor="instagram_link"
                >
                  {getTranslation("Add Instagram profile link", "Add Instagram profile link")}
                </label>
                <div className="relative mt-1 flex items-center">
                  <input
                    type="text"
                    id="instagram_link"
                    name="instagram_link"
                    className="input-primary"

                    placeholder="Add Instagram profile link"
                    value={instagram_link}
                    onChange={handalinstagram_link}
                  />
                </div>
              </div>
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${isDarkMode ? " text-white" : "text-[#000000]"
                    }`}
                  htmlFor="whatsapp_link"
                >
                  {getTranslation("Add What’s app link", "Add What’s app link")}
                </label>
                <div className="relative mt-1 flex items-center">
                  <input
                    type="text"
                    id="whatsapp_link"
                    name="whatsapp_link"
                    className="input-primary"

                    placeholder="Add What’s app link"
                    value={whatsapp_link}
                    onChange={handlewhatshop_link}
                  />
                </div>
              </div>
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${isDarkMode ? " text-white" : "text-[#000000]"
                    }`}
                  htmlFor="twitter_link"
                >
                  {getTranslation("Add Twitter link", "Add Twitter link")}
                </label>
                <div className="relative mt-2 flex items-center">
                  <input
                    type="text"
                    id="twitter_link"
                    name="twitter_link"
                    className="input-primary"
                    placeholder="Add Twitter link"
                    value={twitter_link}
                    onChange={handaltwitter_link}
                  />
                </div>
              </div>

              <div
                className="flex w-full justify-center items-center mt-6"
              >


                <button
                  type="submit"
                  onClick={handleSave}

                  disabled={isLoading}
                  className={`w-fit px-[5rem] py-3 rounded-lg font-poppins text-white 
      ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      {getTranslation("Loading...", "Loading...")}
                    </span>
                  ) : (
                    getTranslation("Save", "Save")
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
        <ToastContainer />
      </div>
    </Dialog>
  );
}

export default FollowSocialMediaModal;
