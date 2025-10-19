"use client";

import Image from "next/image";
import React from "react";
import shopicon from "../../../public/assets/Image/shop.png";
import location from "../../../public/assets/Image/locationstepform.png";
import clock from "../../../public/assets/Image/clock.png"
import { useAppSelector } from "../hooks/hooks";
import "./style.css";

function AddStepCurrent() {
  const AddPostDataStep = useAppSelector(
    (state) => state.AddPost.add_new_post_steps
  );

  // Function to determine the class for each step based on the current and previous steps
  const getStepClass = (step: number) => {
    return (AddPostDataStep ?? 0) >= step
      ? "bg-[#226FE4] opacity-100"
      : "bg-[#226FE4] opacity-[20%]";
  };

  // Function to calculate the progress width (out of 100% for 3 steps)
  const getLineWidth = (step: number) => {
    // The width percentage corresponds to how far along the process is for each step
    if (AddPostDataStep === 1) {
      return "33.33%"; // For Step 1, line width is 33.33%
    } else if (AddPostDataStep === 2) {
      return "66.66%"; // For Step 2, line width is 66.66%
    } else if (AddPostDataStep === 3) {
      return "100%"; // For Step 3, line width is 100%
    }
    return "0%"; // Default if no steps have been completed
  };

  // Function to determine the background color of the line based on the current step
  const getLineClass = (step: number) => {
    return (AddPostDataStep ?? 0) === step ? "linearcolor12" : "bg-[#226FE4]";
  };


  return (
    <>
      <div className="mx-auto flex w-[70%] items-center justify-between md:w-[50%]">
        {/* Step 1 */}
        <div
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full ${getStepClass(
            1
          )}`}
        >
          <Image
            src={shopicon}
            className="h-6 w-6 object-cover"
            alt="step icon"
          />
        </div>

        {/* Step 2 */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${getStepClass(
            2
          )}`}
        >
          <Image src={location} className="h-6 w-6" alt="step icon" />
        </div>

        {/* Step 3 */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${getStepClass(
            3
          )}`}
        >
          <Image
            src={clock}
            className="h-6 w-6 rounded-full"
            alt="step icon"
          />
        </div>
      </div>

      {/* Line */}
      <div className="relative w-full mt-4">
        {/* Line Background */}
        <div className="mx-auto h-2  w-[80%] md:w-[60%] rounded-xl        bg-light-button-base  bg-opacity-[33%]">
          {/* Colored Progress Line */}
          <div
            className={`h-2 rounded-xl ${getLineClass(AddPostDataStep)}`}
            style={{
              width: getLineWidth(AddPostDataStep), // Adjust the width dynamically based on the current step
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default AddStepCurrent;
