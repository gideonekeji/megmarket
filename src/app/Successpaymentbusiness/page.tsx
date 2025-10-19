"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../storeApp/Slice/modalSlice";
import Cookies from "js-cookie";

function Successpaymentbusiness() {
  const dispatch = useDispatch();

  useEffect(() => {
    const vendor_id = Cookies.get("user_id");
    const planPrice = sessionStorage.getItem("planPrice");
    const goal_id = Cookies.get("sponcer_id");
    const service_id = Cookies.get("service_id");
    const token = Cookies.get("nlyticalwebtoken"); // Adjust cookie name if different

    const price = planPrice ? planPrice.replace(/[^\d.-]/g, "") : "";

    const data = {
      vendor_id: vendor_id,
      price: price,
      payment_mode: "stripe",
      goal_id: goal_id,
      service_id: service_id,
    };

    const baseURL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

    fetch(`${baseURL}/goalpayment-success`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Added Bearer token
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(showModal("Paymentsuccessful"));
        Cookies.set("businesspaymentsuccess", "1");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [dispatch]);

  return <div></div>;
}

export default Successpaymentbusiness;
