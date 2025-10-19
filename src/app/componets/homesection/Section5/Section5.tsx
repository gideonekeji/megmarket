" use  client";

import Heading from "../../Heading/Heading";
import CausalSection5 from "./CausalSection5";

function Section5() {
  return (
    <div className="w-full h-auto mt-[6rem] overflow-hidden  ">
      <div className="w-[93%]  md:w-[92%] lg:w-[94%]  xl:w-[90%] 2xl:w-[65%] mx-auto flex flex-col justify-between gap-4 items-center">
        <div className=" w-full  py-5 ">
          <Heading title="Find deals in" highlightedTitle="  Nearby Stores " />
        </div>

        <div className="w-full   flex justify-center items-center mt-6   ">
          <div className="w-full flex   justify-center items-center   ">
            <CausalSection5 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section5;
