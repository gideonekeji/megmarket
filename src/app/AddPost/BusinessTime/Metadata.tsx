import React from "react";
import MetadescriptionInputBox from "./metadescriptionInputBox";
import MetadataInputBox from "./MetadataInputBox";

function Metadata() {
  return (
    <div className=" w-full  border border-[#F0F0F0] dark:border-[#424242]   shadow-md rounded-lg  flex-col gap-6  p-6 flex justify-between items-center ">
      <MetadataInputBox />
      <MetadescriptionInputBox />
    </div>
  );
}

export default Metadata;
