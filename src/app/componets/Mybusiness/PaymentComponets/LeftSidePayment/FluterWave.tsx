"use client"
import { useAppDispatch } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useFlutterwave } from "flutterwave-react-v3";
import Cookies from "js-cookie";

const FlutterWave = () => {
  const planPrice = sessionStorage.getItem("planPrice");

  const price = planPrice ? planPrice.replace(/[^\d.-]/g, "") : "";

  const dispatch = useAppDispatch();

  const email = Cookies.get("email");

  const mobile = Cookies.get("mobile");

  const fullname = Cookies.get("fullname");



  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-913aba0b972e0e9ae97f83096a7a4b1b-X",
    tx_ref: `txn-${Date.now()}`,
    amount: parseFloat(price), // Set dynamic amount
    currency: "USD",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: email || "",
      phone_number: mobile || "",
      name: fullname || "",
    },
    customizations: {
      title: "Meg Market Africa Payment",
      description: "Payment for services",
      logo: "../../../../../public/assets/Image/logo.png",
    },
  });

  const goal_id = Cookies.get("sponcer_id"); 
  const service_id = Cookies.get("service_id");
  const token = Cookies.get("nlyticalwebtoken"); // Adjust cookie name if different

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";



  const handlePaymentSuccess = async (response) => {
    console.log("Payment Response:", response);
    // closePaymentModal(); // Close modal after response

    if (response.status === "successful") {
      const vendor_id = Cookies.get("user_id");
      const planName = sessionStorage.getItem("planName");



      const paymentData = {
        price: price,
        plan_name: planName,
        plan_price: planPrice,
        vendor_id: vendor_id,
        payment_mode: "flutterwave",
        goal_id: goal_id,
        service_id: service_id,
      };




      try {
        const response = await fetch(
          `${baseURL}/goalpayment-success`,
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
        console.log("API Response:", result.status);

        if (result.status === true) {
          dispatch(showModal("Paymentsuccessful"));
        }
      } catch (error) {
        console.error("Error sending payment data:", error);
      }
    }
  };

  return (
    <div className=" w-full  flex justify-center  items-center h-full">
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: handlePaymentSuccess,
            onClose: () => {
              console.log("Payment closed");
            },
          });
        }}
        className="  bg-light-button-base    font-poppins text-white px-4 py-2  rounded-lg "
      >
        Pay with Flutterwave
      </button>
    </div>
  );
};

export default FlutterWave;
