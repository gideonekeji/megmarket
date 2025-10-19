import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import { useDispatch } from "react-redux";
import useTranslation from "@/app/hooks/useTranslation";
import FormGlobalInputAnalytical from "@/app/componets/ReuseCompnets/InputBox";

interface BusinessNameProps {
  required?: boolean;
}

const BusinessName: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useDispatch();
  const serviceName = useAppSelector((state) => state.AddPost.service_name);

  const { getTranslation } = useTranslation();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ service_name: e.target.value }));
  };

  return (
    <div>
      <FormGlobalInputAnalytical
        label={getTranslation("Business Name", "Business Name")}
        required={required}
        placeholder="Business Name"
        value={serviceName || ""}
        name="service_name"
        onChange={handleChange}
      />
    </div>
  );
};

export default BusinessName;
