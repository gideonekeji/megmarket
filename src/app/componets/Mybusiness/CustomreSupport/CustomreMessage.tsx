import { TextField } from "@mui/material";
import React from "react";

function CustomreMessage() {
  return (
    <div className="h-fit w-full">
      <label
        className="font-poppins text-sm font-medium text-[#000000]"
        htmlFor="Message"
      >
        Message
        <span className=" text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="Message"
          name="Message"
          placeholder="Enter Message"
          className="!border-[#6565657a] border-[1px]    "
          variant="outlined"
          fullWidth
          multiline
          rows={3}
        />
      </div>
    </div>
  );
}

export default CustomreMessage;
