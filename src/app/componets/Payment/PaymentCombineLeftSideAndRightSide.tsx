import React, { useState } from "react";
import LeftSide from "./PaymentLeftSideComp/LeftSide";
import RightSidePayment from "./PaymentRigjhtSideComp/RightSidePayment";

function PaymentCombineLeftSideAndRightSide() {
  const [selectedPayment, setSelectedPayment] = useState(1); // Default selected

  return (
    <div className=" w-full   h-full flex  md:flex-row  flex-col    gap-6">
      <LeftSide
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
      <RightSidePayment selectedPayment={selectedPayment} />
    </div>
  );
}

export default PaymentCombineLeftSideAndRightSide;
