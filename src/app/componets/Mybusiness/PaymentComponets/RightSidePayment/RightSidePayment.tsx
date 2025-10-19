import React from "react";
import PaymentWithStripe from "../LeftSidePayment/PaymwentWithStrip";
import PaymentWithPaypal from "../LeftSidePayment/PaymentWithPaypal";
import FluterWave from "../LeftSidePayment/FluterWave";

function RightSidePayment({ selectedPayment }) {
  let paymentMethod = "";

  switch (selectedPayment) {
    case 1:
      paymentMethod = <PaymentWithStripe />;
      break;
    case 2:
      paymentMethod = <PaymentWithPaypal />;
      break;
    case 3:
      paymentMethod = <FluterWave />;
      break; // ✅ Added break
    default:
      paymentMethod = "No payment method selected";
  }

  console.log("selectedPaymentselectedPayment", selectedPayment);

  return (
    <div className="w-full p-4 border-2 border-gray-200 dark:bg-[#2F2F2F]  dark:border-none rounded-lg h-full shadow-lg">
      {paymentMethod}
    </div>
  );
}

export default RightSidePayment;
