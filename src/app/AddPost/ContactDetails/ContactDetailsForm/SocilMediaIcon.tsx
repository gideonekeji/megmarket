import Image from "next/image";
import React from "react";
import whatshopicon from "../../../../../public/assets/Image/whatshop.png";
import fbicon from "../../../../../public/assets/Image/facebook.png";
import instaicon from "../../../../../public/assets/Image/instastep.png";
import twitter from "../../../../../public/assets/Image/twitter.png";

function SocilMediaIcon() {
  return (
    <div>
      {/* icon socil media */}
      <div className="flex w-full flex-wrap items-center justify-start gap-4 md:gap-6">
        <div className="  border  border-light-button-base flex w-fit  items-center justify-center gap-2 rounded-2xl p-3">
          <Image src={whatshopicon} alt="whatshopicon" className="h-6 w-6" />
          <p className="font-poppins text-sm font-normal">Whats app</p>
        </div>
        <div className=" border  border-light-button-base flex w-fit  items-center justify-center gap-2 rounded-2xl p-3">
          <Image src={fbicon} alt="whatshopicon" className="h-6 w-6" />
          <p className="font-poppins text-sm font-normal">Facebook</p>
        </div>
        <div className=" border  border-light-button-base flex w-fit  items-center justify-center gap-2 rounded-2xl p-3">
          <Image src={instaicon} alt="whatshopicon" className="h-6 w-6" />
          <p className="font-poppins text-sm font-normal">Instagram</p>
        </div>
        <div className=" border  border-light-button-base flex w-fit  items-center justify-center gap-2 rounded-2xl p-3">
          <Image src={twitter} alt="whatshopicon" className="h-6 w-6" />
          <p className="font-poppins text-sm font-normal">Twitter</p>
        </div>
      </div>
    </div>
  );
}

export default SocilMediaIcon;
