"use client";
import React, { useEffect, useMemo } from "react";
import { useServicePlane } from "@/app/storeApp/api/useserviceplane";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import bgvectoreimage from "../../../../../public/assets/Image/bg-s.png";
import "./style.css";

function SameTypeCard() {
  const { data, isLoading, refetch } = useServicePlane();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const subscriber_user = Cookies.get("subscriber_user");
  const user_id = Cookies.get("user_id");
  const expire_status = Cookies.get("expire_status");
  const subscription_id = Cookies.get("subscription_id");
  const [isLoadingBtn, setIsLoadingBtn] = React.useState(false);


  const plan = data?.subscriptionDetail?.[0];



  useEffect(() => {
    refetch(); // ensure fresh data on mount
  }, []);

  const isSubscribedToThisPlan = useMemo(() => {
    return subscriber_user === "1" && subscription_id === String(plan?.id);
  }, [subscriber_user, subscription_id, plan?.id]);

  const isExpired = expire_status === "1";

  const buttonConfig = useMemo(() => {
    if (isExpired) {
      return { text: "Expired Plan", bgClass: "bg-black" };
    }
    if (isSubscribedToThisPlan) {
      return { text: "Active Plan", bgClass: "bg-green-600" };
    }
    return {
      text: `Choose Plan ${plan?.price || ""}`,
      bgClass: "bg-[#226FE4]",
    };
  }, [isExpired, isSubscribedToThisPlan, plan?.price]);

  const Demo = Cookies.get("demoUser") === "true";

  const handleClick = () => {


    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    if (subscriber_user === "1") {
      toast.error("You have already purchased this plan");
      return;
    }

    if (isSubscribedToThisPlan && !isExpired) {
      toast.error("You have already purchased this plan");
      return;
    }

    if (plan) {
      setIsLoadingBtn(true); // ✅ Set loading state here
      sessionStorage.setItem("planPrice", plan.price);
      sessionStorage.setItem("PlaneID", plan.id);
      sessionStorage.setItem("planName", plan.plan_name);
      sessionStorage.setItem("currency_name", plan.currency_name);

      if (user_id) {
        router.push("/Payment");
      } else {
        dispatch(showModal("loginModal"));
        setIsLoadingBtn(false); // ✅ Optional: Reset if modal is shown

      }
    }
  };

  return (
    <div className="w-full h-fit relative  bg-light-background  dark:bg-dark-secondarybg    shadow-md rounded-xl cursor-pointer">
      <div
        className={`w-full min-h-full  z-10 shadow rounded-xl bg-light-background  dark:bg-dark-secondarybg `}
        style={{
          backgroundImage: `url(${bgvectoreimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`w-full h-full rounded-lg ${isSubscribedToThisPlan ? "linearcolor" : ""
            }`}
          onClick={handleClick}
        >
          <div className="w-full flex flex-col gap-4 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <h2 className="  text-light-button-base    text-T2 font-poppins ">
                {plan?.plan_name}
              </h2>
              <p
                className={`font-poppins  text-T7 leading-[1.2rem] line-clamp-2 ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                {plan?.subtext}
              </p>
            </div>

            {/* Price */}
            <div className="flex">
              <h2
                className={`text-xl font-medium font-poppins ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                <span className="font-semibold    text-H3 relative bottom-[1px]">
                  {plan?.price}
                </span>
                <span className=" text-light-button-base  font-semibold text-T8 ">
                  / {plan?.duration}
                </span>
              </h2>
            </div>

            <div className="w-full h-[1px] bg-black bg-opacity-15 rounded-xl"></div>

            {/* Features */}
            <ul className="flex flex-col gap-4 bg-transparent">
              {parse(plan?.description || "", {
                replace: (domNode) => {
                  if (
                    domNode.name === "span" &&
                    domNode.attribs &&
                    domNode.attribs.style
                  ) {
                    delete domNode.attribs.style;
                  }

                  if (domNode.type === "tag" && domNode.name === "span") {
                    return (
                      <li
                        className={`flex gap-2 items-center   text-T9 font-poppins ${isDarkMode ? "text-white" : "text-black"
                          }`}
                      >
                        <FaCheckCircle className="  text-light-button-base w-4 h-4" />
                        <span>{domNode.children?.[0]?.data}</span>
                      </li>
                    );
                  }
                },
              })}
            </ul>
          </div>

          {/* Button */}
          <div className="w-full p-4">
            <button
              className={`text-white font-medium font-poppins text-lg text-center py-[12px] rounded-lg w-full ${buttonConfig.bgClass}`}
            >
              {isLoadingBtn ? (
                <div className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Loading...
                </div>
              ) : (
                buttonConfig.text
              )}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SameTypeCard;
