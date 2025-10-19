import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function FeaturedService() {
  const dispatch = useDispatch();
  const isFeatured = useSelector((state: any) => state.AddPost.is_featured); // Adjust based on your actual state structure

  const handleCheckboxChange = () => {
    // Toggle between "0" and "1"
    const newIsFeatured = isFeatured === "0" ? "1" : "0";
    dispatch(updateAddPostData({ is_featured: newIsFeatured }));
  };

  return (
    <div className=" w-full flex flex-col gap-2   relative  ">
      <div className="font-poppins !border-[#6565657a] relative flex w-full items-center justify-around rounded-md border bg-white px-4 py-5 text-[#000000] placeholder-gray-500 ">
        <div className="w-full">
          <h2 className="font-poppins text-[16px] md:text-sm xl:text-[16px] font-normal text-[#000000]">
            Featured Service
          </h2>
        </div>
        <div className="bg flex h-auto w-full items-center justify-end">
          <label className="relative inline-flex cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured === "1"} // Ensure the checkbox reflects the state value
              onChange={handleCheckboxChange}
              value=""
              className="peer sr-only"
            />
            <div className="peer h-5 w-9 rounded-full bg-gray-200   transition-all duration-500 ease-in-out after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] hover:bg-gray-300 peer-checked:bg-[#226FE4] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-0 peer-focus:ring-transparent"></div>
          </label>
        </div>
      </div>
      {/* Add your content here */}
      <Box sx={{ mt: 2, color: "gray" }}>
        To make the featured store toggle to on
      </Box>
    </div>
  );
}

export default FeaturedService;
