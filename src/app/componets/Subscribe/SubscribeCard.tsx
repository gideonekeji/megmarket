
"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import bgvectoreimage from "../../../../public/assets/Image/bg-s.png";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import toast from "react-hot-toast";
function SubscribeCard({ plan }) {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Get the Next.js router to navigate
  const router = useRouter();

  const dispatch = useAppDispatch();

  console.log(" my price values ", plan.price);

  // Function to handle click and navigate
  // Function to handle click and navigate
  const user_id = Cookies.get("user_id");
  const subscriber_user = Cookies.get("subscriber_user");

  // Function to handle click and navigate
  const handleClick = () => {
    // Check if the user is a subscriber
    if (subscriber_user === "1") {
      toast.error("You have already purchased a plan");
      return; // Do not proceed with navigation
    }

    // Extract the numeric value from the plan price by removing the ¥ symbol
    const numericPrice = plan.price;

    // Store the plan data in session storage
    sessionStorage.setItem("planName", plan.plan_name);
    sessionStorage.setItem("planPrice", numericPrice);

    // Navigate to the payment page
    if (user_id) {
      router.push("/Payment");
    } else {
      dispatch(showModal("loginModal"));
    }
  };

  return (
    <div className="relative h-fit w-full cursor-pointer" onClick={handleClick}>
      {/* Content (with white background color) */}
      <div
        className={`h-full w-full rounded-xl   ${
          isDarkMode
            ? "bg-[#2F2F2F] border-2 border-[#FFFFFF66]"
            : "shadow bg-white"
        }`}
        style={{
          backgroundImage: `url(${bgvectoreimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex w-full flex-col items-start justify-start gap-4 p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-poppins text-2xl font-medium text-[#226FE4] line-clamp-1">
              {plan.plan_name}
            </h2>
            <p
              className={`font-poppins text-lg line-clamp-2 ${
                isDarkMode ? "text-white" : "text-[#000000]"
              }`}
            >
              {plan.description}
            </p>
          </div>

          {/* Price detail */}
          <div className="flex">
            <div>
              <h2 className="font-poppins text-xl font-medium text-[#000000]">
                <span
                  className={`font-poppins relative bottom-[1px] text-3xl font-semibold ${
                    isDarkMode ? "text-white" : "text-[#000000]"
                  }`}
                >
                  {plan.price}
                </span>
                <span className="font-poppins text-[16px] font-semibold text-[#226FE4]">
                  {" "}
                  / PER MONTH
                </span>
              </h2>
            </div>
          </div>

          {/* Listing */}
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-4">
              {plan.plan_services.map((service, index) => (
                <li className="flex items-center gap-2" key={index}>
                  <div className="h-5 w-5">
                    {service.status === 1 ? (
                      <FaCheckCircle className="h-full w-full text-[#226FE4]" />
                    ) : (
                      <FaRegCircleCheck className="h-full w-full" />
                    )}
                  </div>
                  <p
                    className={`font-poppins text-[16px] text-[#000000]  ${
                      isDarkMode ? "text-white" : "text-[#000000] "
                    }`}
                  >
                    {service.plan_services}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="w-full p-4">
          <button className="font-poppins w-full rounded-lg py-3 text-center text-lg font-semibold text-white bg-[#226FE4] transition duration-300 focus:outline-none">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeCard;
