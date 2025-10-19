import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

function MetadataInputBox() {
  const dispatch = useDispatch();
  const meta_title = useAppSelector((state) => state.AddPost.meta_title);

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateAddPostData({ meta_title: e.target.value }));
  };

  return (
    <div className="w-full">
      <label
        className="text-sm  2xl:text-B4  dark:text-dark-darkcolor  font-medium text-[#000000]"
        htmlFor="service_website"
      >
        Meta Title
      </label>
      <div className="relative mt-1 flex items-center">
        <textarea
          rows={2}
          value={meta_title || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
          className="w-full rounded-xl    placeholder:font-normal    border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Enter your meta title"
        />
      </div>
    </div>
  );
}

export default MetadataInputBox;
