"use client";

import { FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateProfileMutation } from "../storeApp/api/auth/ProfileUpdate";
import { ProfileUpdate } from "../types/Restypes";
import { toast } from "react-hot-toast";
import { showModal } from "../storeApp/Slice/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import avatar from "../../../public/assets/Image/defaultimage.png";

const RightSideAfterLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const token = Cookies.get("nlyticalwebtoken");
  const demo = Cookies.get("demo");

  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userProfileData, setUserProfileData] = useState<ProfileUpdate | null>(null);

  const [triggerUpdateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await triggerUpdateProfile().unwrap();

        setUserProfileData(response);

        const {
          userdetails,
          is_store,
          store_approval,
          service_id,
          subscriber_user,
          campaign,
          expire_status,
          subscriptionDetails,
        } = response;

        Cookies.set("is_store", is_store);
        Cookies.set("store_approval", store_approval);
        Cookies.set("service_id", service_id);
        Cookies.set("subscriber_user", subscriber_user);
        Cookies.set("sponcer_id", campaign);
        Cookies.set("email", userdetails.email);
        Cookies.set("mobile", userdetails.mobile);
        Cookies.set("expire_status", expire_status);
        Cookies.set(
          "fullname",
          `${userdetails.first_name} ${userdetails.last_name}`
        );
        Cookies.set(
          "plane_name",
          subscriptionDetails?.plan_name?.split(" ")[0] || ""
        );
        Cookies.set("subscription_id", subscriptionDetails?.subscription_id || "");
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast.error("Unable to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, triggerUpdateProfile]);

  const navigateWithLoading = (path: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push(path);
      setIsNavigating(false);
    }, 300); // optional small delay for UX, remove if instant navigation is preferred
  };

  const handleProfileClick = () => navigateWithLoading("/Profile");
  const handleMyBusinessClick = () => navigateWithLoading("/bussines");
  const handleLogoutClick = () => dispatch(showModal("LogoutModal"));

  const usernameInitial =
    userProfileData?.userdetails?.username?.[0]?.toUpperCase() || "";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
    );
  }

  return (
    <div className="flex items-center gap-4 justify-between text-white">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 text-sm/6 focus:outline-none">
          <div className="flex items-center gap-2">
            {/* Profile Picture */}
            <div className="h-12 w-12 overflow-hidden rounded-full bg-[#226FE475] flex items-center justify-center dark:text-dark-darkcolor text-black font-semibold text-lg relative">
              {isNavigating && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                  <div className="loader-border w-6 h-6 border-4 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              {userProfileData?.userdetails?.image ? (
                <Image
                  src={userProfileData.userdetails.image}
                  alt="Profile Pic"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              ) : (
                usernameInitial || (
                  <Image
                    src={avatar}
                    alt="Default Avatar"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                )
              )}
            </div>

            {/* Dropdown Icon */}
            <div className="hidden items-center gap-2 text-lg text-black lg:flex">
              <FiChevronDown
                className={isDarkMode ? "text-white" : "text-black"}
              />
            </div>
          </div>
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className={`z-50 w-40 origin-top-right rounded-xl border border-white  dark:border-none p-1 text-sm/6 shadow-2xl transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 ${
            isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
          }`}
        >
          <MenuItem>
            <button
              onClick={handleProfileClick}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
            >
              <CgProfile className="text-xl" />
              <span>My Account</span>
            </button>
          </MenuItem>

          {demo && (
            <MenuItem>
              <button
                onClick={handleMyBusinessClick}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
              >
                <CgProfile className="text-xl" />
                <span>My Business</span>
              </button>
            </MenuItem>
          )}

          <MenuItem>
            <button
              onClick={handleLogoutClick}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 text-red-500 data-[focus]:bg-dropdownOptionHover"
            >
              <HiOutlineLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default RightSideAfterLogin;
