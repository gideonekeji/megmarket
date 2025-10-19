import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";
import Image from "next/image";
import emailicon from "../../../public/assets/Image/emailfooter.png";
import { toast } from "react-toastify";
import { useAddNewsemail } from "../storeApp/api/useAddNewsemail";

function SubscribeMessageBox() {
  const { getTranslation } = useTranslation();
  const [email, setEmail] = useState("");
  const { mutate, isLoading } = useAddNewsemail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }

    mutate(email, {
      onSuccess: (data) => {
        toast.success(
          data?.message || "Your email has been successfully subscribed!"
        );
        setEmail("");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });
  };

  return (
    <div className="w-full h-[260px]  md:h-[220px] subscribebgimage flex items-center justify-center">
      {/* Content container */}
      <div className="w-[90%] 2xl:w-[68%] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Heading */}
        <h2 className="  text-H6 leading-[2.5rem] text-white font-poppins max-w-[500px]">
          {getTranslation(
            "Stay connected with us for the latest updates and exciting news!",
            "Stay connected with us for the latest updates and exciting news!"
          )}
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center px-3 py-[6px] bg-white rounded-xl w-full md:max-w-[550px] font-poppins text-[#226FE4] "
        >
          <div className="w-6 h-6 flex-shrink-0">
            <Image
              src={emailicon}
              alt="Email Icon"
              className="object-contain w-full h-full"
            />
          </div>
          <input
            type="email"
            placeholder="Your Email Address"
            className="w-full px-3  h-full font-poppins text-black text-T8 rounded-lg placeholder:text-light-textsecondarycolor focus:outline-none font-[400]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-light-button-base text-white px-[30px] py-[12px] rounded-xl font-poppins whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? "Subscribe..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubscribeMessageBox;
