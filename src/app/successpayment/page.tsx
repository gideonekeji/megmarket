"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../storeApp/Slice/modalSlice";
import Cookies from "js-cookie";

function Successpayment() {
  const dispatch = useDispatch();

  useEffect(() => {
    const vendor_id = Cookies.get("user_id");
    const planName = sessionStorage.getItem("planName");
    const planPrice = sessionStorage.getItem("planPrice");
    const price_id = sessionStorage.getItem("price_id");
    const paymentMethodId = localStorage.getItem("paymentMethodId");

    const price = planPrice ? planPrice.replace(/[^\d.-]/g, "") : "";

    const subscription_id = sessionStorage.getItem("PlaneID")

    const paymentData = {
      user_id: vendor_id,
      price: price,
      payment_mode: "stripe",
      plan_name: planName,
      plan_price: planPrice,
      subscription_id: subscription_id,
    };

    // const subscriptionData = {
    //   user_id: vendor_id,
    //   price: price_id,
    //   payment_method: paymentMethodId,
    // };

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

    const token = Cookies.get("nlyticalwebtoken"); // Or whatever your cookie name is

    const postPaymentSuccess = async () => {
      try {
        const response = await fetch(
          `${baseURL}/payment-success`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add Bearer token
            },
            body: JSON.stringify(paymentData),
          }
        );

        const result = await response.json();
        if (response.ok) {
          dispatch(showModal("Paymentsuccessful"));
        } else {
          console.error("Payment Success API Error:", result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };



    // const postStripeSubscription = async () => {
    //   try {
    //     const response = await fetch(
    //       `${baseURL}/stripe-subscription`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`, // Add Bearer token
    //         },
    //         body: JSON.stringify(subscriptionData),
    //       }
    //     );

    //     const result = await response.json();
    //     if (!response.ok) {
    //       console.error("Stripe Subscription API Error:", result);
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };

    postPaymentSuccess();
    // postStripeSubscription();
  }, [dispatch]);

  return <div></div>;
}

export default Successpayment;
