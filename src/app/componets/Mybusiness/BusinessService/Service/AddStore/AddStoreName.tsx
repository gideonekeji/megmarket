import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { setStoreName } from "@/app/storeApp/Slice/AddStore";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

interface BusinessNameProps {
  required?: boolean;
}

const AddStoreName: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useDispatch();

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setStoreName(event.target.value)); // Dispatch action to set store name
  };

  const storename = useAppSelector((state) => state.AddStore);

  console.log(" my reponcefjfkhnsdkfhsdkfl;hsdf0", storename.currentStoreName);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const { getTranslation } = useTranslation();

  return (
    <div className="w-full">

      <div className="mb-4 w-full">
        <label
          className="text-sm font-medium "
          htmlFor="service_name"
        >
          {getTranslation("Service  Name", "Service Name")}
          <span className="text-[#F21818] pl-[1px]">*</span>
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={handleStoreNameChange} // Handle the input change

            className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
            placeholder="Enter Service  Name"
          />
        </div>
      </div>
    </div>
  );
};

export default AddStoreName;
