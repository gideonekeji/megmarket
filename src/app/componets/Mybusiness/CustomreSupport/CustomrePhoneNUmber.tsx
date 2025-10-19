import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";

function CustomrePhoneNUmber() {
  return (
    <div className="">
      <label
        className="font-poppins text-sm font-medium text-[#000000]"
        htmlFor="mobile"
      >
        Mobile Number
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2 w-full">
        <PhoneInput placeholder="Enter phone number" enableSearch />
      </div>
    </div>
  );
}

export default CustomrePhoneNUmber;
