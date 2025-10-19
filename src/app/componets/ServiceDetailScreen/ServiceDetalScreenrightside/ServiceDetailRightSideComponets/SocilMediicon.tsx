"use client";

import React from "react";
import fbicon from "../../../../../../public/assets/Image/facebook.png";
import Image from "next/image";
import insta from "../../../../../../public/assets/Image/instafotter.png";
import twitter from "../../../../../../public/assets/Image/twitter.png";
import whatshop from "../../../../../../public/assets/Image/whatshop.png";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function SocilMediicon() {
  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail
  );
  const { getTranslation } = useTranslation();


  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Extract social media links
  const { facebook_link, instagram_link, whatsapp_link, twitter_link } =
    ServiceDetailData || {};

  // Check if at least one link is available
  const hasSocialMedia =
    facebook_link || instagram_link || whatsapp_link || twitter_link;

  // If no links, return null (hide the component)
  if (!hasSocialMedia) return null;

  console.log(" my whatshop", whatsapp_link);


  return (
    <div
      className={`p-4 rounded-lg ${
        isDarkMode
          ? "bg-[#2F2F2F] text-[#ffffff]"
          : "bg-[#ffffff] text-[#3E5155] photoservicedetailborderandshado"
      }`}
    >
      {/* Heading */}
      <div className="text-lg font-medium font-poppins mb-4">    {getTranslation(
            "Follow Us On",
            "Follow Us On"
          )}</div>
      <div className="w-full flex gap-3 flex-wrap">
        {/* Facebook Link */}
        {facebook_link && (
          <a href={facebook_link} target="_blank" rel="noreferrer">
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <Image src={fbicon} alt="Facebook" className="w-6 h-6" />
              <span className="font-medium">Facebook</span>
            </div>
          </a>
        )}

        {/* Instagram Link */}
        {instagram_link && (
          <a href={instagram_link} target="_blank" rel="noreferrer">
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <Image src={insta} alt="Instagram" className="w-6 h-6" />
              <span className="font-medium">Instagram</span>
            </div>
          </a>
        )}

        {/* WhatsApp Link */}
        {whatsapp_link && (
          <a
            href={
              whatsapp_link.startsWith("https://wa.me/") ||
              whatsapp_link.startsWith("https://api.whatsapp.com/")
                ? whatsapp_link
                : `https://wa.me/${whatsapp_link.replace(/\D/g, "")}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <Image src={whatshop} alt="WhatsApp" className="w-6 h-6" />
              <span className="font-medium">WhatsApp</span>
            </div>
          </a>
        )}

        {/* Twitter Link */}
        {twitter_link && (
          <a href={twitter_link} target="_blank" rel="noreferrer">
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <Image src={twitter} alt="Twitter" className="w-6 h-6" />
              <span className="font-medium">Twitter</span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default SocilMediicon;
