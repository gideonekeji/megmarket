"use client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

const AddInstagramInput: React.FC = () => {
  const dispatch = useDispatch();
  const instagram_link = useAppSelector(
    (state) => state.AddPost.instagram_link
  );

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ instagram_link: e.target.value }));
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          id="AddInstagram "
          name="AddInstagram "
          className="w-full rounded-xl   placeholder:font-normal    border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Add Instagram profile link"
          value={instagram_link || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
        />
      </div>
    </div>
  );
};

export default AddInstagramInput;
