import { TextField } from "@mui/material";

const CustomreEmail: React.FC = ({}) => {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-[#000000]" htmlFor="email">
        email
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="email"
          name="email"
          placeholder="email"
          type="email"
          className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
          fullWidth
        />
      </div>
    </div>
  );
};

export default CustomreEmail;
