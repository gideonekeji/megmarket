"use client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

const AddTwitterlink: React.FC = () => {
  const dispatch = useDispatch();
  const twitter_link = useAppSelector((state) => state.AddPost.twitter_link);

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ twitter_link: e.target.value }));
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          id="twitter_link"
          name="twitter_link"
          className="w-full rounded-xl   placeholder:font-normal    border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Add Twitter link"
          value={twitter_link || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
        />
      </div>
    </div>
  );
};

export default AddTwitterlink;
