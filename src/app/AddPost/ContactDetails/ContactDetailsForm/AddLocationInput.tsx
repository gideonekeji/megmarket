import React from "react";

function AddLocationInput() {
  return (
    <div className="">
      <label
        className="text-sm font-medium text-[#000000]"
        htmlFor="AddLocation"
      >
        Add Location 12
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          id="AddLocation"
          name="AddLocation"
          className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
          placeholder="Add Location"
        />
      </div>
    </div>
  );
}

export default AddLocationInput;
