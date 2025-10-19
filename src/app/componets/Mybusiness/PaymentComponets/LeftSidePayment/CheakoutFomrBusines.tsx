import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const CheakoutFomrBusines = () => {
  const stripe = useStripe();
  const elements = useElements();
  const planPrice = sessionStorage.getItem("planPrice");
  const [isLoading, setIsLoading] = useState(false); // Set isLoading state

  const handleSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    // Set loading state to true when payment process starts
    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://web.nlytical.online/Successpaymentbusiness",
      },
    });

    // Set loading state to false after payment process finishes
    setIsLoading(false);

    if (result.error) {
      // Handle error (e.g., show message)
      console.log(result.error.message);
    } else {
      // Handle successful payment (e.g., show confirmation)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className=" w-full flex mt-12 justify-center items-center">
        <button
          className=" w-[12rem] py-2     text-xl text-white bg-[#226FE4]  font-poppins rounded-xl"
          disabled={!stripe || isLoading} // Disable if Stripe is not ready or it's loading
          id="submit"
        >
          <span id="button-text ">
            {isLoading ? (
              <ClipLoader color="white" size={35} />
            ) : (
              `Pay now ${planPrice}`
            )}
          </span>
        </button>
      </div>
    </form>
  );
};

export default CheakoutFomrBusines;
