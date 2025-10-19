import React from "react";
import PhoneNUmberInput from "./PhoneNUmberInput";
import EmailInput from "./EmailInput";
import WebsiteInput from "./WebsiteInput";
import AddLocationInput from "./AddLocationInput";
import FollowUs from "./FollowUs";

function ContactDetailsForm() {
  return (
    <div className="flex w-full flex-col items-center space-y-6 md:items-start">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <PhoneNUmberInput />
        <EmailInput />
        <WebsiteInput />
        {/* <AddLocationInput /> */}
      </div>
      <div className="h-auto w-full">
        <FollowUs />
      </div>
    </div>
  );
}

export default ContactDetailsForm;
