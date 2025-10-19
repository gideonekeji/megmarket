import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Cookies from "js-cookie";
import Head from "next/head";
import { usePaymenyIntenPaypal } from "@/app/storeApp/api/usePaymenyIntenPaypal";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
import AvatarWithSpinner from "../../Loading/AvatarWithSpinner";

function PaymentPayPal() {
  const paypalClientId =
    "AVzMVWctLyouPgmfv9Nh6E5KakydG4JHiFGm-fgg6HRqFYUW-gHVKS1ebRfPgDOr2uYABGGcnU_3RaSL"; // Replace with your actual PayPal client ID

  // Fetch payment intent from API
  const { data } = usePaymenyIntenPaypal();
  console.log("PayPal intent:", data?.order_id);

  const vendor_id = Cookies.get("user_id");
  const planName = sessionStorage.getItem("planName") || "Basic Plan";
  const planPrice = sessionStorage.getItem("planPrice") || "0";

  const dispatch = useAppDispatch();

  // Ensure numeric price extraction
  const price = parseFloat(planPrice.replace(/[^\d.-]/g, "")) || 0;

  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [loading, setLoading] = useState(true);

  // Fetch exchange rate dynamically
  const fetchExchangeRate = async (currency) => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/USD`
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

const token = Cookies.get("nlyticalwebtoken"); // Or whatever your cookie name is


  const planPriceInUSD = price / exchangeRate;
  console.log("Converted Price in USD:", planPriceInUSD);

  const subscription_id = sessionStorage.getItem("PlaneID")
  // Handle successful payment
  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const response = await fetch(
        `${baseURL}/payment-success`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
          body: JSON.stringify({
            user_id: vendor_id,
            price: price,
            payment_mode: "paypal",
            plan_name: planName,
            payment_details: paymentDetails,
            subscription_id: subscription_id,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        dispatch(showModal("Paymentsuccessful"));
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Error processing payment.");
    }
  };


  console.log("PayPal Client ID:", planPriceInUSD.toFixed(2));

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
                  purchase_units: [
                    { amount: { value: price } },
                  ],
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
