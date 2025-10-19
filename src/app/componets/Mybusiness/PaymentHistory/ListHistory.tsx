"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetPaymenthistory } from "@/app/storeApp/api/useGetPaymenthistory";
import { useGetPaymenthistrySubription } from "@/app/storeApp/api/useGetPaymenthistrySubription";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";

import sponsorImage from "../../../../../public/assets/Image/sponsor_image.png";
import dropdownIcon from "../../../../../public/assets/Image/arrow-down.png";

import "./paymenthisdtpory.css";

/* ✅ Row Component */
const DetailRow = ({
  label,
  value,
  bold = false,
  highlight = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) => (
  <div className="w-full flex justify-between items-center">
    <p
      className={`font-poppins text-base ${bold ? "font-semibold" : "font-normal"
        } ${highlight ? "dark:text-white text-black" : "dark:text-[#B4B4B4] text-[#444]"}`}
    >
      {label}
    </p>
    <p
      className={`font-poppins text-base ${bold ? "font-medium" : "font-normal"
        } ${highlight ? "dark:text-white text-black" : "dark:text-[#B4B4B4] text-[#444]"}`}
    >
      {value}
    </p>
  </div>
);

/* ✅ Dropdown Component */
const PaymentDetails = ({ days, price }: { days: number; price: number }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-3">
      <DetailRow label="Selected Ad Days" value={`${days} days`} />
      <DetailRow label="Price" value={`$${price}`} />
      <DetailRow label="Tax/GST" value="$20" />
    </div>

    <hr className="border-[#E0E0E0] dark:border-[#444]" />

    <div className="flex flex-col gap-3">
      <DetailRow label="Platform Charges" value="$20" />
      <DetailRow label="Total Amount" value={`$${price + 40}`} bold highlight />
    </div>
  </div>
);

function ListHistory() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { data: sponsorHistory } = useGetPaymenthistory();
  const { data: subscriptionHistory, isLoading } = useGetPaymenthistrySubription();

  const [openIndex, setOpenIndex] = useState<{ type: string; index: number | null }>({
    type: "",
    index: null,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <AvatarWithSpinner />
      </div>
    );
  }

  const sponcerPayments = sponsorHistory?.GoalData || [];
  const subscriptionPayments = subscriptionHistory?.data || [];

  const handleToggle = (type: string, index: number) => {
    setOpenIndex((prev) =>
      prev.type === type && prev.index === index
        ? { type: "", index: null }
        : { type, index }
    );
  };

  const wrapperClasses = `paymenthistory ${isDarkMode ? "dark" : ""}`;

  return (
    <div className="  mx-auto  2xl:w-[68%]  w-[90%]">
      <div className="w-full flex flex-col gap-6    items-center">
        {/* ---------------- Sponsor Payments ---------------- */}
        {sponcerPayments.length > 0 && (
          <div className="w-full flex flex-col gap-4">
            {sponcerPayments.map((payment: any, index: number) => (
              <div key={index} className={wrapperClasses}>
                {/* Header */}
                <div
                  className="paymenthistory-header  "
                  onClick={() => handleToggle("sponsor", index)}
                >
                  {/* Left */}
                  <div className="flex gap-3 items-center">
                    <Image
                      src={sponsorImage}
                      alt="Sponsor Payment"
                      width={50}
                      height={50}
                      className="rounded-full shadow-md"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-poppins font-medium text-lg text-black dark:text-white">
                          Sponsor Payment
                        </h5>
                        <span className="ml-2 px-3 py-1 text-xs font-medium text-black rounded-2xl bg-[#FFC774]">
                          Sponsored
                        </span>
                      </div>
                      <p className="font-poppins text-sm text-[#7B7B7B] dark:text-[#B4B4B4]">
                        {payment.start_date} - {payment.end_date}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-poppins font-medium text-lg text-black dark:text-white">
                      ${payment.price}
                    </p>
                    <Image
                      src={dropdownIcon}
                      alt="Dropdown"
                      width={20}
                      height={20}
                      className={`cursor-pointer transition-transform duration-300 ${isDarkMode ? "invert" : ""
                        } ${openIndex.type === "sponsor" && openIndex.index === index
                          ? "rotate-180"
                          : "rotate-0"
                        }`}
                    />
                  </div>
                </div>

                {/* Dropdown */}
                <div
                  className={`paymenthistorydropdwon ${openIndex.type === "sponsor" && openIndex.index === index
                    ? "open"
                    : "closed"
                    }`}
                >
                  <PaymentDetails days={payment.days} price={payment.price} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------------- Subscription Payments ---------------- */}
        {subscriptionPayments.length > 0 && (
          <div className="w-full flex flex-col gap-4">
            {subscriptionPayments.map((payment: any, index: number) => (
              <div key={index} className={wrapperClasses}>
                {/* Header */}
                <div
                  className="paymenthistory-header"
                  onClick={() => handleToggle("subscription", index)}
                >
                  {/* Left */}
                  <div className="flex gap-3 items-center">
                    <Image
                      src={sponsorImage}
                      alt="Subscription Payment"
                      width={50}
                      height={50}
                      className="rounded-full shadow-md"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-poppins font-medium text-lg text-black dark:text-white">
                          {payment.plan_name}
                        </h5>
                        <span className="ml-2 px-3 py-1 text-xs font-medium text-black rounded-xl bg-[#FFDD55]">
                          Subscription Plan
                        </span>
                      </div>
                      <p className="font-poppins text-sm text-[#7B7B7B] dark:text-[#B4B4B4]">
                        30 days
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-poppins font-medium text-lg text-black dark:text-white">
                      ${payment.price}
                    </p>
                    <Image
                      src={dropdownIcon}
                      alt="Dropdown"
                      width={20}
                      height={20}
                      className={`cursor-pointer transition-transform duration-300 ${isDarkMode ? "invert" : ""
                        } ${openIndex.type === "subscription" &&
                          openIndex.index === index
                          ? "rotate-180"
                          : "rotate-0"
                        }`}
                    />
                  </div>
                </div>

                {/* Dropdown */}
                <div
                  className={`paymenthistorydropdwon ${openIndex.type === "subscription" && openIndex.index === index
                    ? "open"
                    : "closed"
                    }`}
                >
                  <PaymentDetails days={30} price={payment.price} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListHistory;
