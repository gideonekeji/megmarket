" use client";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Cookies from "js-cookie";
import Head from "next/head";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";

function PaymentPayPal() {
  const paypalClientId =
    "AVzMVWctLyouPgmfv9Nh6E5KakydG4JHiFGm-fgg6HRqFYUW-gHVKS1ebRfPgDOr2uYABGGcnU_3RaSL";

  const vendor_id = Cookies.get("user_id");

  const serviceid = Cookies.get("service_id");

  const goal_id = sessionStorage.getItem("goalId");
  const price = sessionStorage.getItem("price");

  // Extract only numeric values (removes $, commas, and other non-numeric characters)
  const numericPrice = price?.replace(/[^\d.]/g, "");

  console.log("My plan price PayPal:", numericPrice);

  const dispatch = useAppDispatch();

  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [loading, setLoading] = useState(true);

  // Fetch exchange rate dynamically
  const fetchExchangeRate = async (currency) => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      setExchangeRate(data.rates[currency] || 1);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setExchangeRate(1);
    }
  };

  // Get user's country and currency
  const getUserCurrency = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setCurrencyCode(data.currency || "USD");
      fetchExchangeRate(data.currency || "USD");
    } catch (error) {
      console.error("Error getting currency:", error);
      setCurrencyCode("USD");
      fetchExchangeRate("USD");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCurrency();
  }, []);


  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  // Handle successful payment

const handlePaymentSuccess = async (paymentDetails) => {
  try {
    const token = Cookies.get("nlyticalwebtoken"); // replace with the correct cookie name

    const response = await fetch(`${baseURL}/goalpayment-success`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        goal_id: goal_id,
        vendor_id: vendor_id,
        price: numericPrice,
        payment_mode: "paypal",
        payment_details: paymentDetails,
        service_id: serviceid,
      }),
    });

    const result = await response.json();
    if (result.success) {
      dispatch(showModal("Paymentsuccessful"));
      Cookies.set("businesspaymentsuccess", "1");
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    alert("Error processing payment.");
  }
};


  return (
    <>
      <Head>
        <script
          src={`https://www.paypal.com/sdk/js?client-id=${paypalClientId}&components=buttons`}
        />
      </Head>
      <div style={{ position: "relative", zIndex: 10 }}>
        <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
          {loading ? (
            <div>
              <AvatarWithSpinner />
            </div>
          ) : (
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal",
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: numericPrice } }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  dispatch(showModal("Paymentsuccessful"));
                  handlePaymentSuccess(details);
                });
              }}
              onError={(err) => {
                console.error("PayPal Error:", err);
                alert("An error occurred. Please try again.");
              }}
            />
          )}
        </PayPalScriptProvider>
      </div>
    </>
  );
}

export default PaymentPayPal;
