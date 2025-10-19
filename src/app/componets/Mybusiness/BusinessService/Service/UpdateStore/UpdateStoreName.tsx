import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";
import { updateStoreName } from "@/app/storeApp/Slice/UpdateStoreSlice";
import { TextField } from "@mui/material";

const UpdateStoreName: React.FC = () => {
  const dispatch = useAppDispatch();
  const Updatestorename = useAppSelector(
    (state) => state.UpdateStore.store?.store_name
  );

  const { getTranslation } = useTranslation();

  console.log(" my store_name ", Updatestorename);

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedStoreName = event.target.value;
    dispatch(updateStoreName(updatedStoreName)); // Dispatch action to update store name in redux
  };


  return (
    <div className="w-full" >

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
            id="store_name"
            name="store_name"
            value={Updatestorename || ""}
            onChange={handleStoreNameChange} // Handle the input change

            className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
            placeholder="Enter Service  Name"
          />
        </div>
      </div>
    </div >
  );
};

export default UpdateStoreName;
