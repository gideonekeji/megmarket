"use client";

import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useEffect } from "react";
import Cookies from "js-cookie";
import image from "../../../../public/assets/Image/Homesection8card.png";
import Link from "next/link";
import useTranslation from "@/app/hooks/useTranslation";

function HomeHeroSection() {
  const { data } = useHomeScreenApi();
  const currentSlide = data?.slides?.[0];
  const user_id = Cookies.get("user_id");

  const [triggerUpdateProfile] = useUpdateProfileMutation();
  const { getTranslation } = useTranslation();

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id }).then((response) => {
        if (response?.data) {
          const res = response.data;
          Cookies.set("is_store", res?.is_store);
          Cookies.set("store_approval", res?.store_approval);
          Cookies.set("service_id", res?.service_id);
          Cookies.set("subscriber_user", res?.subscriber_user);
          Cookies.set("sponcer_id", res?.campaign);
          Cookies.set("email", res?.userdetails?.email);
          Cookies.set("mobile", res?.userdetails?.mobile);
          Cookies.set("ispaymentsuccess", res?.sponser);
          Cookies.set("start_date", res?.start_date);
          Cookies.set("end_date", res?.end_date);
          Cookies.set("expire_status", res?.expire_status);
          Cookies.set(
            "fullname",
            `${res?.userdetails?.first_name} ${res?.userdetails?.last_name}`
          );
          Cookies.set("plane_name", res?.subscriptionDetails?.plan_name);
          Cookies.set("subscription_id", res?.subscriptionDetails?.subscription_id);
        }
      });
    }
  }, [user_id, triggerUpdateProfile]);

  const titleWords = currentSlide?.title?.split(" ") || [];
  const firstWord = titleWords[0] || "";
  const secondWord = titleWords[1] || "";
  const remainingTitle = titleWords.slice(2).join(" ");

  return (
    <div className="w-full overflow-hidden">
      <div
        className="w-full relative   min-h-[510px]   xl:min-h-[600px] 2xl:min-h-[630px]  bg-cover bg-bottom bg-no-repeat "
        style={{
          backgroundImage: `url('${currentSlide?.image || image.src}')`,
        }}
      >
        <div className=" mx-auto  w-[90%]   2xl:w-[68%] ">
          <div className=" w-[90%]   xl:pt-[3.5rem]   2xl:w-[68%] py-8   min-h-full">
            <div className="md:w-[95%] xl:w-[70%] 2xl:w-[65%] flex flex-col gap-6 justify-center h-full w-full">
              {/* Heading */}
              <div className="w-full">
                <h1 className="font-poppins text-[#E3EEFF]   font-medium   text-[26px]  leading-[2rem] xl:text-H3  xl:leading-[3.7rem]">
                  {firstWord}{" "}
                  <span className="font-script text-white  font-poppins  ">{secondWord}</span>{" "}
                  {remainingTitle}
                </h1>
              </div>


              <div className="w-full h-[5rem] xl:h-[130px] border-linecss rounded-l-[1.5rem]   rounded-xl linear-color md:p-4 p-3  2xl:p-5   overflow-hidden">
                <div className="  w-full  flex justify-center h-full  xl:p-4 items-center">
                  <span className="text-[#E7E7E7] font-poppins  text-lg  xl:leading-[2rem] xl:text-T3 line-clamp-2 ">
                    {currentSlide?.body}
                  </span>
                </div>
              </div>

              {/* Button */}
              {currentSlide?.link && (
                <div className="mt-3">
                  <Link href={currentSlide.link} target="_blank">
                    <button
                      type="button"
                      className="px-8 py-[16px] bg-white rounded-lg w-fit font-poppins  text-light-button-base  text-B2 hover:bg-slate-100 transition"
                    >
                      {getTranslation("Explore More", "Explore More")}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default HomeHeroSection;
