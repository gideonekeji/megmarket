import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import useTranslation from "@/app/hooks/useTranslation";

function WebsiteInput() {
  const dispatch = useDispatch();
  const serviceWebsite = useAppSelector(
    (state) => state.AddPost.service_website
  );

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ service_website: e.target.value }));
  };


  const { getTranslation } = useTranslation();


  return (
    <div className="">
      <label
        className="  text-B4 text-[#000000]   dark:text-dark-darkcolor  "
        htmlFor="service_website"
      >
        {getTranslation("Website", "Website")}
      </label>
      <div className="relative mt-1 flex items-center">
        <input
          type="text"
          id="service_website"
          name="service_website"
          value={serviceWebsite || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
          className="w-full rounded-xl   placeholder:font-normal    border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Website"
        />
      </div>
    </div>
  );
}

export default WebsiteInput;
