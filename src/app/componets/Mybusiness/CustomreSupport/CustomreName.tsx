import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addCustomerSupportMessage } from "@/app/storeApp/Slice/CustomreSupportSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const CustomerName: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // State to store the input value

  // Function to handle input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // If the name is not empty, dispatch the add action
    if (name) {
      dispatch(
        addCustomerSupportMessage({
          name: name,
          email: "", // Add other fields as needed
          price: "",
          phone: "",
          message: "",
        })
      );
    }
  };

  // Log the current value of name
  console.log("Latest customer name:", name);

  const name1 = useAppSelector((state) => state.customerSupportSlice);

  console.log(" name:!!!!!!!!!!!!", name1);

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-[#000000]" htmlFor="name">
        Name
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="name"
          name="name"
          placeholder="Name"
          className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
          fullWidth
          value={name} 
        />
      </div>
    </div>
  );
};

export default CustomerName;
