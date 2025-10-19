"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

const AddWhatsappinkInputBox: React.FC = () => {
  const dispatch = useDispatch();
  const whatsapp_link = useAppSelector(
    (state) => state.AddPost.whatsapp_link
  );

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ whatsapp_link: e.target.value }));
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          id="whatsapp_link"
          name="whatsapp_link"
          className="w-full rounded-xl   placeholder:font-normal    border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Add Whats app link"
          value={whatsapp_link || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
        />
      </div>
    </div>
  );
};

export default AddWhatsappinkInputBox;
