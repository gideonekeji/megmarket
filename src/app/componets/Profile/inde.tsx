import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./style.css";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import Cookies from "js-cookie";
import { useProfileMutation } from "@/app/storeApp/api/auth/getuserprofile";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import Image from "next/image";

const ProfileForm: React.FC = () => {
  const user_id = Cookies.get("user_id");
  // console.log("user_id", user_id);

  const [triggerUpdateProfile, { data: userUpdatePrfileData }] =
    useUpdateProfileMutation();

  const [triggerProfile, { data: userPrfileData }] = useProfileMutation();

  useEffect(() => {
    if (user_id) {
      triggerProfile({ user_id });
    }
  }, [user_id, triggerProfile]);

  const [image, setImage] = useState<File | null>(null);
  const [PhonenumberInputBox, setPhonenumberInputBox] = useState({
    phone_number: userPrfileData?.UserDetails.mobile,
    country_code: userPrfileData?.UserDetails.country_code,
    country: "",
  });

  // Handle the image change event when the file is selected
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file); // Store the selected image file
      // console.log("Selected Image:", file);
    }
  };

  // Function to trigger the profile update when the form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("user_id", user_id || "");
    formData.append("mobile", PhonenumberInputBox.phone_number || "");
    formData.append("country_code", PhonenumberInputBox.country_code || "");
    formData.append("country", PhonenumberInputBox.country || "");

    try {
      const response = await triggerUpdateProfile(formData).unwrap();

      // console.log("Profile updated successfully:", response);
      // Update profile image after successful update
      setImage(URL.createObjectURL(image));
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      "profile_image"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="monu flex h-auto w-full flex-col gap-6">
      <div className="flex w-full items-center justify-center">
        <h3 className="AmericanSign text-3xl font-normal text-[#226FE4]">
          Profile 12121212
        </h3>
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center justify-center"
        >
          <div className="relative" onClick={triggerFileInput}>
            <div className="profileimageborderocolor h-[8rem] w-[8rem] rounded-full">
              <Image
                src={
                  image
                    ? URL.createObjectURL(image)
                    : userPrfileData?.UserDetails?.image || ""
                }
                alt={userPrfileData?.UserDetails.first_name || "Profile Image"}
                className="profileimageborderocolor h-full w-full rounded-full object-cover"
                width={128}
                height={128}
              />
            </div>

            <div className="absolute right-0 top-[5rem] h-10 w-10 rounded-full bg-white p-[3px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#226FE4]">
                <FiPlus className="font-poppins text-xl text-white" />
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="profile_image"
                className="font-poppins text-lg font-medium text-black"
              >
                Change Profile 12
              </label>
            </div>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="font-poppins mt-3 flex w-full items-center justify-center rounded-lg bg-[#226FE417] py-2 text-sm font-medium text-[#226FE4]">
              Silver Plan
            </div>
          </div>

          <div className="mx-auto flex h-auto w-[80%] flex-col gap-6">
            {/* first name */}
            <div className="w-full">
              <label
                className="text-sm font-medium text-[#000000]"
                htmlFor="username"
              >
                First Name
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  type="text"
                  id=" FirstName"
                  name="first_name"
                  className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
                  placeholder="Enter  First Name"
                  value={userPrfileData?.UserDetails.first_name}
                />
              </div>
            </div>

            <div className="">
              <label
                className="font-poppins text-sm font-medium text-[#000000]"
                htmlFor="mobile"
              >
                Mobile Number
              </label>
              <div className="relative mt-2 w-full">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={userPrfileData?.UserDetails.mobile}
                  onChange={(value, data) => {
                    setPhonenumberInputBox({
                      ...PhonenumberInputBox,
                      country_code: `+${data.dialCode}`,
                      phone_number: value,
                      country: data.countryCode,
                    });
                  }}
                  country="us"
                  enableSearch
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex h-auto w-full items-center justify-center">
            <button
              type="submit"
              className="font-poppins w-fit rounded-md border-solid border-light-button-base bg-[#226FE4] px-[3.5rem] py-2 text-lg font-medium text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
