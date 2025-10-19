import React from "react";
import CarusaSection10 from "./CarusaSection10";
import Heading from "../../Heading/Heading";

function Section10() {
  return (
    <div className="w-full h-auto mt-[6rem] overflow-hidden ">
      <div className="w-[93%] sm:w-[85%] md:w-[93%] 2xl:w-[69%] mx-auto flex flex-col justify-between gap-4 items-center">
        <div className=" w-full mt-4">
          <Heading title=" Read Our" highlightedTitle="   Latest blogs " />
        </div>

        <div className="w-full flex justify-center items-center mt-10    ">
          <div className="w-full max-w-[86rem]   ">
            <CarusaSection10 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section10;
