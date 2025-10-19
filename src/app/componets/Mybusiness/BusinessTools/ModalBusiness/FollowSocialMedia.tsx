"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/computer-1.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import fbicon from "../../../../../../public/assets/Image/facebook.png";
import insta from "../../../../../../public/assets/Image/instafotter.png";
import twitter from "../../../../../../public/assets/Image/twitter.png";
import whatshop from "../../../../../../public/assets/Image/whatshop.png";
import useTranslation from "@/app/hooks/useTranslation";

function FollowSocialMedia() {
  const dispatch = useDispatch();
  const facebook_link = useAppSelector(
    (state) => state.service.service.facebook_link
  );
  const instagram_link = useAppSelector(
    (state) => state.service.service.instagram_link
  );
  const twitter_link = useAppSelector(
    (state) => state.service.service.twitter_link
  );
  const whatshop_link = useAppSelector(
    (state) => state.service.service.whatsapp_link
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { getTranslation } = useTranslation();

  return (
    <div
     className={`w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex cursor-pointer 
        ${isDarkMode
          ? "bg-dark-Modalbgcolortop text-white"
          : "bg-white businesslable text-black"
        }`}
      onClick={() => {
        dispatch(showModal("FollowSocialMediaModal"));
      }}
    >
      <div className="flex gap-3 items-center">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl font-poppins "> {getTranslation("Follow on Social Media", "Follow on Social Media")}</div>
      </div>

      <div className="flex gap-3 items-center">
        {/*  show continaly icon socila media icon */}
        <div className="text-[#B4B4B4] font-normal font-poppins  ">
          <div className="flex gap-3 w-full h-full ">
            {facebook_link && (
              <a href={facebook_link} target="_blank" rel="noopener noreferrer">
                <Image src={fbicon} alt="Facebook" className=" h-8 w-8" />
              </a>
            )}
            {instagram_link && (
              <a
                href={instagram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={insta} alt="Instagram" className=" h-8 w-8" />
              </a>
            )}
            {twitter_link && (
              <a
                href={instagram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={twitter} alt="Instagram" className=" h-8 w-8" />
              </a>
            )}
            {whatshop_link && (
              <a
                href={instagram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={whatshop} alt="Instagram" className=" h-8 w-8" />
              </a>
            )}
          </div>
        </div>

        <div className="h-[2rem] w-[2rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-cover  ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default FollowSocialMedia;
