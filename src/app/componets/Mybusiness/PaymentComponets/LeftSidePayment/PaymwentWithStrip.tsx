import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import { usePaymentIntent } from "@/app/storeApp/api/usePaymentIntent";
import CheakoutFomrBusines from "./CheakoutFomrBusines";

// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51OP303SJayPbST1licbf3gkBs6pS2Bg886xDS0hhh7Y9NydxCm0ezpqTCNpPGPiBmmX4mly6uXtAXMzxO1KwjRso00YmA0KNUB"
);

export default function PaymentWithStripe() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch the payment intent data from your API (assuming this works)
  const { data } = usePaymentIntent();

  // Effect to set clientSecret after fetching data
  useEffect(() => {
    if (data?.data.clientSecret) {
      setClientSecret(data.data.clientSecret);
    }
  }, [data]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="relative mx-auto my-10 grid h-fit w-full grid-cols-1 place-content-center">
        <div className="space-y-5 w-full">
          <div className="h-full w-full">
            {/* Render the Elements provider when clientSecret is available */}
            {clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <CheakoutFomrBusines />
              </Elements>
            ) : (
              // Show loading spinner while waiting for clientSecret
              <div className="mx-auto w-fit">
                {isLoading ? (
                  <ClipLoader color="black" size={20} className="mt-20" />
                ) : (
                  <ClipLoader color="black" size={20} className="mt-20" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
