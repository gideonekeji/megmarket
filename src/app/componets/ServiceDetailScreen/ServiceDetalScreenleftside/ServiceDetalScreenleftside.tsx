import React from "react";
import FirstSection from "./LeftSideDetailCompomponets/FirstSection";
import ServiceDetailListphoto from "./LeftSideDetailCompomponets/ServiceDetailListphoto";
import ServiceDetailleftSide from "./LeftSideDetailCompomponets/ServiceDetailleftSide";
import ServiceReviewDetailScreen from "./LeftSideDetailCompomponets/ServiceReviewDetailScreen";
import StoreDescription from "../ServiceDetalScreenrightside/ServiceDetailRightSideComponets/StoreDescription";

function ServiceDetalScreenleftside() {
  return (
    <div className=" w-full h-auto flex flex-col gap-8 relative ">
      <FirstSection />
      <StoreDescription />
      <ServiceDetailListphoto />
      <ServiceDetailleftSide />
      <ServiceReviewDetailScreen />
    </div>
  );
}

export default ServiceDetalScreenleftside;
