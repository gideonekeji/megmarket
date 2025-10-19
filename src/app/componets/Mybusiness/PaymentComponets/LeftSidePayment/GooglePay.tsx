import { useEffect, useState } from "react";
import GooglePayButton from "@google-pay/button-react";
import Cookies from "js-cookie";
import axios from "axios"; // Use axios to make the API call
import { useAppSelector } from "@/app/hooks/hooks";

function GoalPayment() {
  const [paymentRequestData, setPaymentRequestData] = useState(null);
  const campaignGoal = useAppSelector((state) => state.campaignGoal);
  const vendor_id = Cookies.get("user_id");


  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  useEffect(() => {
    // Prepare the static data
    const staticData = {
      goal_id: campaignGoal.goalId,
      vendor_id: vendor_id,
      price: campaignGoal.price,
      payment_mode: "paypal", // you may need to change this depending on the payment type
    };

    // Set payment request
    setPaymentRequestData({
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example", // Update this to your actual gateway
              gatewayMerchantId: "exampleGatewayMerchantId", // Your merchant ID
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "12345678901234567890", // Replace with your actual merchant ID
        merchantName: "Demo Merchant",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: campaignGoal.price, // Use dynamic price from campaignGoal
        currencyCode: "USD",
        countryCode: "US",
      },
      shippingAddressRequired: true,
      callbackIntents: ["PAYMENT_AUTHORIZATION"],
    });
  }, [campaignGoal, vendor_id]);


  const handlePaymentAuthorized = async (paymentData) => {
    try {
      console.log("paymentData:", paymentData);

      const token = Cookies.get("nlyticalwebtoken"); // Replace with your cookie name

      const response = await axios.post(
        `${baseURL}/goalpayment-success`,
        {
          goal_id: campaignGoal.goalId,
          vendor_id: vendor_id,
          paymentData: paymentData,
          price: campaignGoal.price,
          payment_mode: "googlepay", // Adjust if necessary
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      // Handle successful API response
      return { transactionState: "SUCCESS" };
    } catch (error) {
      console.error("Error in payment authorization:", error);
      return { transactionState: "FAILED" };
    }
  };


  return (
    <div className="App">
      {paymentRequestData && (
        <GooglePayButton
          environment="TEST"
          paymentRequest={paymentRequestData}
          onLoadPaymentData={(paymentRequest) => {
            console.log("Loaded Payment Data:", paymentRequest);
          }}
          onPaymentAuthorized={handlePaymentAuthorized}
          existingPaymentMethodRequired="false"
          buttonColor="black"
          buttonType="buy"
          apiKey="AVzMVWctLyouPgmfv9Nh6E5KakydG4JHiFGm-fgg6HRqFYUW-gHVKS1ebRfPgDOr2uYABGGcnU_3RaSL" // Add the key here
        />
      )}
    </div>
  );
}

export default GoalPayment;
