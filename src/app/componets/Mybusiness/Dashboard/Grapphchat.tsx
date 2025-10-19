"use client";
import { useGetServiceinsights } from "@/app/storeApp/api/useGetServiceinsights";
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Cookies from "js-cookie";
import AvatarWithSpinner from "../../Loading/AvatarWithSpinner";
import { useAppSelector } from "@/app/hooks/hooks";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-transparent text-[#344BFD]  font-medium px-3 py-1 ">
        {payload[0].value}
      </div>
    );
  }
  return null;
};

const UsersVisitsChart = () => {
  const service_id = Cookies.get("service_id");
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode)
  const monthname = Cookies.get("selectedmonthvalues");

  console.log();

  const { data, isLoading, isError } = useGetServiceinsights(
    service_id,
    monthname
  ); // Static service_id and month

  useEffect(() => {
    Cookies.set("leads", data?.CountRetrieved.leads?.toString() || "");
    Cookies.set(
      "storelikes",
      data?.CountRetrieved.storelikes?.toString() || ""
    );
    Cookies.set(
      "storevisits",
      data?.CountRetrieved.storevisits?.toString() || ""
    );
  }, [data]);

  if (isLoading)
    return (
      <div className=" w-full flex justify-center  items-center">
        <AvatarWithSpinner />
      </div>
    );
  if (isError) return <p>Error fetching data</p>;

  // Transform API data to match Recharts format
  const chartData =
    data?.graphdata.map((entry) => ({
      date: entry.date.split(" ")[0], // Extract only the day
      visits: entry.user_visits,
    })) || [];



  return (
    <div className="w-full rounded-lg  dark:bg-[#2F2F2F] bg-white">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke={isDarkMode ? "#ffffff" : "#000000"} // Change line color
            tick={{ fill: isDarkMode ? "#ffffff" : "#000000", fontFamily: "Poppins" }}
          />
          <YAxis hide />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="visits"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
            activeDot={{
              r: 8,
              fill: "#3B82F6",
              stroke: "#fff",
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersVisitsChart;
