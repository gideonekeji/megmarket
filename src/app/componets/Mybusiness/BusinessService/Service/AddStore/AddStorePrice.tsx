import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { useAppSelector } from "@/app/hooks/hooks";
import { setStorePrice } from "@/app/storeApp/Slice/AddStore";
import toast from "react-hot-toast";
import useTranslation from "@/app/hooks/useTranslation";

interface BusinessNameProps {
  required?: boolean;
}

const AddStorePrice: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useDispatch();

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    // Check if the input value is a valid number
    if (value !== "" && isNaN(value)) {
      // If it's not a valid number, show an alert
      toast.error("Please enter a only number.");
    } else {
      // If it's a valid number, dispatch the action
      dispatch(setStorePrice(value));
    }
  };

  const storename = useAppSelector((state) => state.AddStore);

  console.log("Current store price:", storename.currentStorePrice);

  const { getTranslation } = useTranslation();



  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full">


      <div className=" w-full">
        <label
          className="text-sm font-medium "
          htmlFor="service_name"
        >
          {getTranslation(" Price", " Price")}
          <span className="text-[#F21818] pl-[1px]">*</span>
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={handleStoreNameChange} // Handle the input change
            className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
            placeholder="Enter Price "
          />
        </div>
      </div>
    </div>
  );
};

export default AddStorePrice;
