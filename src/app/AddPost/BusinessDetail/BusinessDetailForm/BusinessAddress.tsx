import { useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import useTranslation from "@/app/hooks/useTranslation";
import FormGlobalInputAnalytical from "@/app/componets/ReuseCompnets/InputBox";

interface BusinessAddressProps {
  required?: boolean;
}

const BusinessAddress: React.FC<BusinessAddressProps> = ({ required }) => {
  const dispatch = useDispatch();
  const address = useAppSelector((state) => state.AddPost.address);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  // Handle address update
  const handleAddressClick = () => {
    dispatch(showModal("CompleteAddressModal"));
  };

  return (
    <div>
      <div className="relative">
        <FormGlobalInputAnalytical
          label={getTranslation("Business Address", "Business Address")}
          required={required}
          placeholder="Enter Business Address"
          value={address || ""}
          name="address"
          onChange={() => {}} // Read-only, value set via modal
        />

        {/* Edit Icon Button */}
        <button
          type="button"
          onClick={handleAddressClick}
          className="absolute right-3 top-[32px] flex items-center justify-center rounded-full p-2"
          style={{
            backgroundColor: isDarkMode ? "#444444" : "#B4B4B414",
          }}
        >
          <CiEdit
            className={isDarkMode ? "text-white" : "text-[#b4b4b4]"}
            size={18}
          />
        </button>

        {/* Transparent overlay to make whole input clickable */}
        <div
          onClick={handleAddressClick}
          className="absolute left-0 top-[26px] h-[48px] w-full cursor-pointer rounded-xl"
        ></div>
      </div>
    </div>
  );
};

export default BusinessAddress;
