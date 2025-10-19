import React, { useState } from "react";
import RightSidePayment from "./RightSidePayment/RightSidePayment";
import LeftSidePayment from "./LeftSidePayment/LeftSidepayment";

function CombinePaymentLeftSideAndRightSide() {
  const [selectedPayment, setSelectedPayment] = useState(1); // Default selected

  return (
    <div className=" w-full   h-full flex  md:flex-row  flex-col    gap-6">
      <LeftSidePayment
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
      <RightSidePayment selectedPayment={selectedPayment} />
    </div>
  );
}

export default CombinePaymentLeftSideAndRightSide;
