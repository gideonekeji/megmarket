import React, { useEffect, useState } from "react";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import useTranslation from "@/app/hooks/useTranslation";

function EmailInput() {
  const dispatch = useDispatch();

  // Retrieve email from cookies initially
  const emailFromCookies = Cookies.get("email");
  const serviceEmail = useAppSelector((state) => state.AddPost.service_email);

  // Set local state based on Redux or cookies
  const [email, setEmail] = useState(serviceEmail || emailFromCookies || "");

  useEffect(() => {
    // If the email is in cookies and not set in Redux state, dispatch to Redux
    if (emailFromCookies && !serviceEmail) {
      dispatch(updateAddPostData({ service_email: emailFromCookies }));
    }
  }, [dispatch, emailFromCookies, serviceEmail]);

  // Handle email input change
  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail); // Update local state

    // Update Redux state
    dispatch(updateAddPostData({ service_email: newEmail }));

    // Save email to cookies
    Cookies.set("email", newEmail);
  };

  const { getTranslation } = useTranslation();


  return (
    <div>
      <label
        className="  text-B4  dark:text-dark-darkcolor text-[#000000]"
        htmlFor="service_email"
      >
        {getTranslation("Email", "Email")}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-1 flex items-center">
        <input
          type="email"
          id="service_email"
          name="service_email"
          className="w-full rounded-xl   placeholder:font-normal    border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Enter your email"
          value={email} // Bind to local email state
          onChange={handleChange} // Handle email change
          required
        />
      </div>
    </div>
  );
}

export default EmailInput;
