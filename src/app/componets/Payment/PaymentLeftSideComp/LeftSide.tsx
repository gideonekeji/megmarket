import React from "react";
import debitcardicon from "../../../../../public/assets/Image/debitcard.png";
import Image from "next/image";
import { MdChevronRight } from "react-icons/md";
import paypal from "../../../../../public/assets/Image/paypal.png";
import flutterwave from "../../../../../public/assets/Image/flutterwave.png";

function LeftSide({ selectedPayment, setSelectedPayment }) {
  const handlePaymentSelection = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className={`w-full flex justify-between cursor-pointer items-center shadow-lg rounded-lg p-4 ${
          selectedPayment === 1 ? "bg-[#226FE417]" : ""
        }`}
        onClick={() => handlePaymentSelection(1)}
      >
        <div className="flex items-center justify-center gap-2">
          <Image
            src={debitcardicon}
            alt="Debit and Credit Card"
            className="w-8 h-8"
          />
          <p className="text-lg font-normal dark:text-white font-poppins">
            Debit & Credit Card
          </p>
        </div>
        <div>
          <MdChevronRight size={24} className=" dark:text-white" />
        </div>
      </div>

      <div
        className={`w-full flex justify-between cursor-pointer items-center shadow-lg rounded-lg p-4 ${
          selectedPayment === 2 ? "bg-[#226FE417]" : ""
        }`}
        onClick={() => handlePaymentSelection(2)}
      >
        <div className="flex items-center justify-center gap-2">
          <Image src={paypal} alt="PayPal" className="w-8 h-8" />
           <p className="text-lg font-normal dark:text-white font-poppins">PayPal</p>
        </div>
        <div>
          <MdChevronRight size={24} className=" dark:text-white" />
        </div>
      </div>
      
      <div
        className={`w-full flex justify-between cursor-pointer items-center shadow-lg rounded-lg p-4 ${
          selectedPayment === 3 ? "bg-[#226FE417]" : ""
        }`}
        onClick={() => handlePaymentSelection(3)}
      >
        <div className="flex items-center justify-center gap-2">
          <Image src={flutterwave} alt="Flutterwave" className="w-8 h-8" />
          <p className="text-lg font-normal dark:text-white font-poppins">Flutterwave</p>
        </div>
        <div>
          <MdChevronRight size={24}  className=" dark:text-white"/>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
