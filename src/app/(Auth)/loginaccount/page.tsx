"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import emailicon from "../../../../public/assets/Image/loginemailicon.png";
import pwdicon from "../../../../public/assets/Image/lockicon.png";
import eyeOpenIcon from "../../../../public/assets/Image/unlock.png";
import "./style.css";
import call from "../../../../public/assets/Image/calliconlogin.png";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import crossicon from "../../../../public/assets/Image/crossicon.png";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../storeApp/Slice/LoginSlice";
import { useLoginUserMutation } from "@/app/storeApp/api/auth/user-login";
import { useEffect, useState } from "react";
import AddSocilLoginGoogle from "@/app/componets/AddSocilLoginGoogle";
import useTranslation from "@/app/hooks/useTranslation";
import { usePathname } from "next/navigation";

export default function LoginModal() {
  const modalData = useAppSelector((state) => state.modals.loginModal);
  const dispatch = useAppDispatch();

  const { getTranslation } = useTranslation();

  const [loginuser, { isLoading }] = useLoginUserMutation();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 
  };


  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };





  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation (make sure fields are not empty)
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    dispatch(loginStart());

    try {
      const userData = await loginuser(formData).unwrap();


      dispatch(loginSuccess(userData));

      if (!userData?.user_block) {
        toast.error("You are blocked by the admin so you can't login to your account")
        return;
      }





      Cookies.set("nlyticalwebtoken", userData?.token)

      Cookies.set("user_id", userData?.user_id);

      Cookies.set("login_type", userData?.login_type);
      Cookies.set("is_store", userData?.is_store);
      Cookies.set("service_id", userData?.service_id);
      Cookies.set("loginuser", "user_login");
      toast.success("Login successful!");
      // Optionally, hide the modal after successful login
      dispatch(hideModal("loginModal"));
      window.location.href = "/"
    } catch (error) {
      dispatch(loginFailure(error));
      toast.error("Login failed. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior
      handleSubmit(e); // Call form submission function
    }
  };

  // modal close


  const location = usePathname()
  const vendor_id = Cookies.get("user_id");

  const handleModalClose = () => {
    // Prevent closing the modal on '/bussines' route if user_id does not exist
    if (location === "/bussines" && !vendor_id) {
      toast.warn("You must log in to proceed.");
      return; // Prevent modal from closing
    }
    dispatch(hideModal("loginModal"));
  };


  const isDarkMode = useAppSelector((state) => state.darkMode);

  useEffect(() => {
    const inputs = document.querySelectorAll("input");

    // Set readonly attribute initially
    inputs.forEach((input) => {
      input.setAttribute("readonly", true);
    });

    // Remove readonly attribute on click
    const handleClick = (event) => {
      event.target.removeAttribute("readonly");
    };

    inputs.forEach((input) => {
      input.addEventListener("click", handleClick);
    });

    // Cleanup event listeners when component unmounts
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[490px] rounded-xl bg-white    px-[20px]   xl:px-[50px]   dark:bg-dark-secondarybg  shadow-[rgba(17,_17,_26,_0.3)_0px_0px_16px] backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div
              className="  w-full   relative    flex   items-center  justify-end    cursor-pointer"
              onClick={handleModalClose}
            >
              <div className=" w-8 h-8   absolute  right-[-1rem] xl:right-[-3rem]  top-[0.2rem] rounded-full  bg-light-button-base flex justify-center items-center">
                <Image
                  src={crossicon}
                  className={` w-full h-full  ${isDarkMode ? " invert" : ""}`}
                  alt="crossicon"
                />
              </div>
            </div>
            <div className="mb-6 flex w-full flex-col items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                className="h-24 w-[11rem] object-contain"
              />
              <p className="font-poppins mx-auto mt-1 text-T5 px-4 text-center       dark:text-[#B4B4B4] text-[#717171] sm:px-6">
                {getTranslation(
                  "Discover more about our app by registering or logging in.",
                  "Discover more about our app by registering or logging in."
                )}
              </p>
            </div>

            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
                className=""
              >
                {/* Email Input */}
                <div className="mb-5">
                  <label
                    className=" text-B4 dark:text-dark-darkcolor text-[#000000]"
                    htmlFor="email"
                  >
                    {getTranslation("Email Address", "Email Address")}
                    <span className="text-[#FF0000]"> *</span>
                  </label>
                  <div className="relative mt-[6px] flex items-center">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
                      placeholder="Enter your email"
                      onChange={handleInputChange}
                      value={formData.email || ""}
                      autoComplete="off"
                    />
                    <span className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#B4B4B414]">
                      <Image
                        src={emailicon}
                        alt="Email Icon"
                        className="  h-[46%]  w-[46%] object-cover"
                      />
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-5">
                  <label
                    className=" text-B4 dark:text-dark-darkcolor text-[#000000]"

                    htmlFor="password"
                  >
                    {getTranslation("Password", "Password")}
                    <span className="text-[#FF0000]"> *</span>
                  </label>
                  <div className="relative mt-2 flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
                      placeholder="Enter your password"
                      onChange={handleInputChange}
                      value={formData.password || ""}
                      autoComplete="off"
                    />
                    <span
                      className="absolute right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#B4B4B414]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Image
                        src={showPassword ? eyeOpenIcon : pwdicon}
                        alt="Toggle Password Visibility"
                        className="  h-[46%]  w-[46%] object-cover"
                      />
                    </span>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="mb-4 mt-4 flex cursor-pointer items-center justify-between">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="cheackboxborder cursor-pointer h-4 w-4 text-black"
                    />
                    <span className="font-poppins text-sm font-medium text-[#717171]">
                      {getTranslation("Remember me", "Remember me")}
                    </span>
                  </div>

                  <button
                    className="font-poppins text-sm font-medium   text-light-button-base"
                    onClick={() => {
                      dispatch(showModal("ForgotPasswordModal"));
                      handleModalClose();
                    }}
                  >
                    {getTranslation("Forgot Password?", "Forgot Password?")}
                  </button>
                </div>

                {/* Sign In Button */}
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="signinbox font-poppins w-fit rounded-xl px-[5.5rem] py-3 text-white transition duration-200 hover:bg-light-button-base focus:outline-none"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </div>



                {/* Demo Detail */}
                <div className="w-full rounded-lg  gap-[2px]   flex-col  flex  mt-6">
                  {/* Label: Free Demo */}
                  <div className=" w-full  rounded-t-lg p-4 bg-[#226FE438]" >
                    <h5 className="text-[15px] font-semibold  text-black dark:text-dark-darkcolor font-poppins">For Demo</h5>
                  </div>
                  <div className="flex justify-between p-4 rounded-b-lg bg-[#226FE438] items-start gap-4">
                    {/* Email & Password */}
                    <div className="flex flex-col gap-2 w-full font-poppins text-sm text-black  dark:text-dark-darkcolor">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Email ID:</span> john@demo.com
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Password:</span> 123456
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className="text-[#000]   dark:text-dark-darkcolor cursor-pointer mt-1"

                      onClick={() => {
                        setFormData({
                          email: demoCredentials.email,
                          password: demoCredentials.password,
                        });

                        const demoText = `Email: ${demoCredentials.email}\nPassword: ${demoCredentials.password}`;
                        navigator.clipboard.writeText(demoText);
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-xl"
                        height="1.2em"
                        width="1.2em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path>
                        <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path>
                      </svg>
                    </div>


                  </div>
                </div>

                {/* Divider */}
                <div className="mt-4 flex w-full items-center justify-center gap-2">
                  <div className="my-2 flex h-[2px] w-full rounded-md bg-[#D0D0D0]" />
                  <p className="font-poppins text-[22px] dark:text-dark-darkcolor text-[#3A3333]">or</p>
                  <div className="my-2 flex h-[2px] w-full rounded-md bg-[#D0D0D0]" />
                </div>

                {/* login with google and phone number */}
                <div className="mx-auto mt-4 flex w-full md:w-[80%] flex-col items-center justify-center gap-6">
                  <AddSocilLoginGoogle />
                  <div
                    className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-lg border border-light-button-base py-3"
                    onClick={() => {
                      dispatch(showModal("RegisterWithMobilenumber"));
                      handleModalClose();
                    }}
                  >
                    <div className="h-6 w-6">
                      <Image
                        src={call}
                        alt="Phone Logo"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="font-poppins text-sm font-medium   dark:text-dark-darkcolor text-[#3A3333]">
                      {getTranslation(
                        "Continue with Number",
                        "Continue with Number"
                      )}
                    </p>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="  py-6 flex items-center justify-center">
                  <p className="text-sm  dark:text-[#B4B4B4] text-[#717171]">
                    {" "}
                    {getTranslation(
                      "Don’t have an account?",
                      "Don’t have an account?"
                    )}
                    <button
                      className="cursor-pointer pl-1 font-medium  text-light-button-base"
                      onClick={() => {
                        dispatch(showModal("RegisterModal"));
                        handleModalClose();
                      }}
                    >
                      {getTranslation("Sign Up", "Sign Up")}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
