"use client";
import { useState } from "react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useAddSocialloginMutation } from "../storeApp/api/AddSociallogin";
import { hideModal, showModal } from "../storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { useServiceDetailApi } from "../storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import useTranslation from "../hooks/useTranslation";
import googlelogo from "../../../public/assets/Image/googlelogo.png";
import { setUserInfo } from "../storeApp/Slice/userSlicegoogle ";
import AvatarWithSpinner from "./Loading/AvatarWithSpinner";
import { decodeString } from "../utils/enocodeAndDecode";
import { usePathname } from "next/navigation";
import { setToken } from "../storeApp/Slice/authSlice";

function AddSocialLoginGoogle() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const lastSegment = decodeString(lastSegment1);

  const { getTranslation } = useTranslation();
  const { refetch } = useServiceDetailApi(lastSegment);
  const [addSociallogin] = useAddSocialloginMutation();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true); // Start loading

      try {
        // Fetch Google user info
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();
        dispatch(setUserInfo(userInfo));
        refetch();

        // Social login API call
        const response = await addSociallogin({
          login_type: "google",
          email: userInfo?.email,
        }).unwrap();

        console.log("response username_exists:", response?.username_exists);


        if (response?.username_exists == 1) {

          // Username exists → store in cookies
          Cookies.set("user_id", response?.user?.id);
          Cookies.set("nlyticalwebtoken", response?.user?.token);
          Cookies.set("loginuser", "user_login");
          dispatch(hideModal("loginModal"));
          refetch();
          window.location.reload()
          return
        } else {
          dispatch(setToken(response?.user?.token));
          dispatch(showModal("CheackUserNameSocailLOgin"));
          dispatch(hideModal("loginModal"));


        }
        refetch();
      } catch (error) {
        console.error("Error during social login:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <div className=" w-full h-auto">
      <div
        className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-lg border border-light-button-base py-3 relative"
        onClick={() => !isLoading && googleLogin()} // Prevent multiple clicks while loading
      >
        <div className="h-6 w-6">
          <Image
            src={googlelogo}
            alt="Google Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <p className="font-poppins text-sm font-medium text-[#3A3333]  dark:text-dark-darkcolor">
          {getTranslation("Continue with Google", "Continue with Google")}
        </p>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="">
              <AvatarWithSpinner />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddSocialLoginGoogle;
