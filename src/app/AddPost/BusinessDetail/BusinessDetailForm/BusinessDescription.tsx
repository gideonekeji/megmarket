import React, { useRef } from "react";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import useTranslation from "@/app/hooks/useTranslation";
import JoditEditor from "jodit-react";

interface BusinessDescriptionProps {
  required?: boolean;
}

const BusinessDescription: React.FC<BusinessDescriptionProps> = ({ required }) => {
  const dispatch = useDispatch();
  const editor = useRef(null);

  const serviceDescription = useAppSelector(
    (state) => state.AddPost.service_description
  );
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  const handleChange = (newContent: string) => {
    dispatch(updateAddPostData({ service_description: newContent }));
  };

  return (
    <div className="h-fit">
      <label
        className={`text-sm font-medium ${
          isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
        }`}
        htmlFor="service_description"
      >
        {getTranslation("Business Description", "Business Description")}
        {required && <span className="text-[#F21818] pl-[1px]">*</span>}
      </label>

      <div className="mt-2">
        <JoditEditor
          ref={editor}
          value={serviceDescription || ""}
          onChange={handleChange}
          config={{
            readonly: false,
            theme: isDarkMode ? "dark" : "default",
            placeholder: "Enter Business Description",
            height: 300,
          }}
        />
      </div>
    </div>
  );
};

export default BusinessDescription;
