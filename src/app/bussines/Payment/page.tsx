"use client";

import React from "react";
import dynamic from "next/dynamic";
import PaymentBreadCome from "@/app/componets/AllBreadCome/PaymentBreadCome";

// Lazy-load with spinner fallback
const Paymentdesing = dynamic(
  () => import("@/app/componets/Mybusiness/PaymentComponets/Paymentdesing"),
  {
    loading: () => <div className="p-6 text-center">Loading payment...</div>,
  }
);

function Payment() {
  return (
    <div className="w-full h-auto dark:bg-dark-background">
      <PaymentBreadCome />
      <div className="w-full">
        <Paymentdesing />
      </div>
    </div>
  );
}

export default Payment;
