"use client";

import MybusinessBreadComegraph from "@/app/componets/AllBreadCome/MybusinessBreadComegraph";
import { useAppSelector } from "@/app/hooks/hooks";
import React, { useState, useEffect } from "react";
import "../graphStyle.css";
import Grapphchat from "@/app/componets/Mybusiness/Dashboard/Grapphchat";
import Cookies from "js-cookie";
import { useGetServiceinsights } from "@/app/storeApp/api/useGetServiceinsights";

function ViewInsights() {

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = months[new Date().getMonth()];
  const [selectedMonth, setSelectedMonth] = useState<string>(
    Cookies.get("selectedmonthvalues") || currentMonth
  );

  useEffect(() => {
    const storedMonth = Cookies.get("selectedmonthvalues");
    if (storedMonth && months.includes(storedMonth)) {
      setSelectedMonth(storedMonth);
    } else {
      Cookies.set("selectedmonthvalues", currentMonth, { expires: 7 });
    }
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    Cookies.set("selectedmonthvalues", newMonth, { expires: 7 });
  };

  const service_id = Cookies.get("service_id");

  const { data } = useGetServiceinsights(service_id, selectedMonth);

  const storeVisits = data?.CountRetrieved.storevisits;
  const storeLikes = data?.CountRetrieved.storelikes;
  const leads = data?.CountRetrieved.leads;

  return (
    <div
      className={`w-full h-auto flex flex-col gap-6 bg-light-background text-light-darkcolor dark:bg-dark-background dark:text-dark-darkcolor`}
    >
      {/* BreadCrumb */}
      <div className="w-full h-auto">
        <MybusinessBreadComegraph />
      </div>

      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[95%] mt-4 md:mt-12 flex flex-col gap-6 justify-between items-center">
        {/* Overview header */}
        <div className="w-full flex justify-between items-center">
          <h4 className="font-poppins text-lg font-normal">Overview</h4>
          <div className="flex gap-4 items-center">
            <h4 className="font-poppins font-normal text-lg">Monthly</h4>
            <select
              className="px-3 py-1 border border-light-border dark:border-dark-border font-poppins font-normal bg-light-box dark:bg-[#2F2F2F] rounded-md text-sm focus:outline-none transition-all"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {months.map((month) => (
                <option key={month} value={month} className="font-poppins">
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Box */}
        <div className="w-full border border-light-border dark:border-dark-border py-5 rounded-xl bg-light-box  dark:bg-[#2F2F2F] shadow-sm">
          {[
            { label: "Store Visits", value: storeVisits },
            { label: "Number of Favorites", value: storeLikes },
            { label: "Leads Received", value: leads },
          ].map((item, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between px-6 items-center py-2">
                <h4 className="font-poppins text-lg font-normal">
                  {item.label}
                </h4>
                <h4 className="font-poppins text-lg font-normal">
                  {item.value}
                </h4>
              </div>
              {index !== 2 && <hr className="border-light-border dark:border-dark-border" />}
            </div>
          ))}
        </div>

        {/* Graph Box */}
        <div className="w-full px-6 border border-light-border dark:border-dark-border py-5 rounded-xl bg-light-box  dark:bg-[#2F2F2F] shadow-sm">
          <div className="w-full flex justify-start items-center">
            <h4 className="font-poppins font-normal text-lg">
              Number of Users Visits Daily
            </h4>
          </div>
          <Grapphchat />
        </div>
      </div>
    </div>
  );
}

export default ViewInsights;
