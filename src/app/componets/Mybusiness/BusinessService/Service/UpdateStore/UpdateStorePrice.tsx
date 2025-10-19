import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";
import { updateStorePrice } from "@/app/storeApp/Slice/UpdateStoreSlice";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

interface BusinessNameProps {
  required?: boolean;
}

const UpdateStorePrice: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useAppDispatch();


  const { getTranslation } = useTranslation();

  const UpdatestorPrice = useAppSelector(
    (state) => state.UpdateStore.store?.price
  );
  const handleStorPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const UpdatestorPrice = event.target.value;

    // Check if the input value is a valid number
    if (UpdatestorPrice !== "" && isNaN(Number(UpdatestorPrice))) {
      // If it's not a valid number, show an alert
      toast.error("Please enter a only number.");
    } else {
      // If it's a valid number, dispatch the action
      dispatch(updateStorePrice(UpdatestorPrice)); // Dispatch action to update store name in redux
    }
  };



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
            onChange={handleStorPriceChange}
            value={UpdatestorPrice}
            className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
            placeholder="Enter Service  price"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateStorePrice;
