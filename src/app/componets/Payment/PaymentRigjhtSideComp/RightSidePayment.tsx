"use client";

import React from "react";
import PaymentPayPal from "../PaymentLeftSideComp/PaymentPayPal";
import PaymentStripe from "../PaymentLeftSideComp/PaymentStripe";
import FulterWave from "../PaymentLeftSideComp/FulterWave";

function RightSidePayment({ selectedPayment }) {
  let paymentMethod;

  switch (selectedPayment) {
    case 1:
      paymentMethod = <PaymentStripe />;
      break;
    case 2:
      paymentMethod = <PaymentPayPal />;
      break;
    case 3:
      paymentMethod = <FulterWave />;
      break; // ✅ Added break to prevent fall-through
    default:
      paymentMethod = "No payment method selected";
  }

  return (
    <div className="w-full p-4 border-2 border-gray-200  dark:border-[#181818] rounded-lg h-full shadow-lg">
      <div className="text-lg">{paymentMethod}</div>
    </div>
  );
}

export default RightSidePayment;
