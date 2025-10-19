"use client";

import arror from "../../../../public/assets/Image/section4arrorw.png";
import arrowright from "../../../../public/assets/Image/section4arrorw.png";
import Image from "next/image";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";
import { useAppDispatch } from "@/app/hooks/hooks";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import leftsideimage from "../../../../public/assets/Image/HomeScrennVectorleft.png"
import business from "../../../../public/assets/Image/business.png"

function Section4() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const router = useRouter();

  const { data, isLoading, refetch } = useHomeScreenApi();
  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[2].status == 0) {
    return null;
  }

  console.log(" my api responce values ", data?.cards);

  const handleCardClick = () => {
    setLoading(true); // Start loading

    dispatch(
      setSelectedCategoryListing({
        id: data?.cards[0].category_id || "",
        category_name: data?.cards[0].category_name || "",
      })
    );

    sessionStorage.setItem("Category_Name", data?.cards[0].category_name || "");
    sessionStorage.setItem("Category_ID", data?.cards[0].category_id || "");

    router.push(`/store`).finally(() => setLoading(false)); // Stop loading after navigation
  };

  // Handle card click to navigate to the subcategory detail page
  const handleCardClick1 = () => {
    setLoading1(true); // Start loading
    dispatch(
      setSelectedCategoryListing({
        id: data?.cards[1].category_id || "",
        category_name: data?.cards[1].category_name || "",
      })
    );
    // sessionStorage.setItem("cid", subCategoryId);
    sessionStorage.setItem("Category_Name", data?.cards[1].category_name || "");

    sessionStorage.setItem("Category_ID", data?.cards[1].category_id || "");

    router.push(`/store`).finally(() => setLoading1(false)); // Stop loading after navigation
  };

  const handleCardClick2 = () => {
    setLoading2(true); // Start loading
    dispatch(
      setSelectedCategoryListing({
        id: data?.cards[2].category_id || "",
        category_name: data?.cards[2].category_name || "",
      })
    );
    // sessionStorage.setItem("cid", subCategoryId);
    sessionStorage.setItem("Category_Name", data?.cards[2].category_name || "");

    sessionStorage.setItem("Category_ID", data?.cards[2].category_id || "");

    router.push(`/store`).finally(() => setLoading2(false)); // Stop loading after navigation
  };

  const handleCardClick3 = () => {
    setLoading3(true); // Start loading

    dispatch(
      setSelectedCategoryListing({
        id: data?.cards[3].category_id || "",
        category_name: data?.cards[3].category_name || "",
      })
    );
    // sessionStorage.setItem("cid", subCategoryId);
    sessionStorage.setItem("Category_Name", data?.cards[3].category_name || "");

    sessionStorage.setItem("Category_ID", data?.cards[3].category_id || "");

    router.push(`/store`).finally(() => setLoading3(false)); // Stop loading after navigation
  };

  return (
    <div className=" w-full   relative">

      <div className=" absolute left-[-11.45rem] hidden xl:block ">
        <Image src={leftsideimage} alt="leftsideimage" className=" h-[25rem]  object-contain" />
      </div>

      {/* righsdei side add image  */}

      <div className=" absolute   right-[-16rem] hidden xl:block ">
        <Image src={business} alt="leftsideimage" className=" h-[25rem]  object-contain" />
      </div>


      <div className=" w-[90%] mx-auto  2xl:w-[68%] h-auto  ">
        <div className=" w-full mx-auto flex  flex-wrap xl:flex-nowrap justify-between gap-4">
          {/* First Section (Left Box) */}
          <div
            className="w-full md:w-[48%] xl:w-[37%] h-[500px] xl:h-[630px] rounded-[3rem] relative flex flex-col justify-end  items-center cursor-pointer"
            style={{
              backgroundImage: `url(${data?.cards[0].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={handleCardClick}
          >
            {/* Loading Spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50  rounded-[3rem] z-50">
                <TailSpin color="#ffffff" height={50} width={50} />
              </div>
            )}

            {/* Top Right Arrow Button */}
            <div className="absolute top-[-1rem] right-[-0.5rem] w-[100px] h-[100px] rounded-full shadow-lg bg-white p-2 cursor-pointer">
              <div className="w-full h-full rounded-full  bg-light-button-base flex justify-center items-center">
                <Image
                  className="w-[2rem] h-[2rem] rotate-[-45deg]"
                  src={arrowright}
                  alt="arrow"
                />
              </div>
            </div>

            {/* Bottom Gradient with Centered Text */}
            <div className="w-full h-[60%] bg-blue-gradient-180  rounded-[2rem] flex  relative">
              <div className="flex flex-col gap-2 absolute px-4  bottom-10">
                <h4 className="  text-H4 text-white font-poppins leading-snug line-clamp-2">
                  {data?.cards[0].title}
                </h4>
                <p className="text-T6 text-white font-poppins line-clamp-1 2xl:line-clamp-2">
                  {data?.cards[0].category_name}
                </p>
              </div>
            </div>

          </div>


          {/* Middle Section (2 right boxes) */}
          <div className="w-full md:w-[48%] xl:w-[26%] md:hidden xl:block h-[600px] xl:h-[630px]  xl:flex xl:flex-col justify-between gap-6 cursor-pointer">
            {/* First Box */}
            <div
              className="h-[50%] rounded-[3rem] relative bg-black mt-4 md:mt-0 mb-6 md:mb-0 "
              style={{
                backgroundImage: `url(${data?.cards[1].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={handleCardClick1}
            >
              <div className="absolute inset-0   rounded-[3rem] " id="ColorBG" />

              {/* Loading Spinner */}
              {loading1 && (
                <div className="absolute inset-0 flex items-center justify-center  rounded-[3rem] bg-opacity-50">
                  <TailSpin color="#ffffff" height={50} width={50} />
                </div>
              )}


              <div className="w-full h-full rounded-[3rem] relative flex items-center justify-center">

                {/* Centered Content */}
                <div className="flex flex-col gap-2 items-center mt-[-4rem] text-center w-[60%] px-2">


                  <h4 className="text-H4 line-clamp-2 leading-[2.5rem] text-white font-poppins">
                    {data?.cards[1].title}
                  </h4>
                  <p className="font-poppins text-white line-clamp-1 text-T6 2xl:line-clamp-2">
                    {data?.cards[1].category_name}
                  </p>
                </div>

                {/* Bottom Circle */}
                <div className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white p-2 cursor-pointer">
                  <div className="w-full h-full rounded-full bg-light-button-base flex justify-center items-center">
                    <Image
                      className="w-[2rem] h-[2rem]"
                      src={arrowright}
                      alt="arrow"
                    />
                  </div>
                </div>

              </div>

            </div>




            {/* Second Box */}

            <div
              className="h-[50%] rounded-[3rem] relative bg-black mt-4 md:mt-0 mb-6 md:mb-0 "
              style={{
                backgroundImage: `url(${data?.cards[2].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={handleCardClick2}
            >
              <div className="absolute inset-0   rounded-[3rem] " id="ColorBG" />

              {/* Loading Spinner */}
              {loading2 && (
                <div className="absolute inset-0 flex items-center justify-center  rounded-[3rem] bg-opacity-50">
                  <TailSpin color="#ffffff" height={50} width={50} />
                </div>
              )}


              <div className="w-full h-full rounded-[3rem] relative flex items-center justify-center">

                {/* Centered Content */}
                <div className="flex flex-col gap-2 items-center mt-[-4rem] text-center w-[60%] px-2">
                  <h4 className="text-H4 line-clamp-2 leading-[2.5rem] text-white font-poppins">
                    {data?.cards[2].title}
                  </h4>
                  <p className="font-poppins text-white line-clamp-1 text-T6 2xl:line-clamp-2">
                    {data?.cards[2].category_name}
                  </p>
                </div>

                {/* Bottom Circle */}
                <div className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white p-2 cursor-pointer">
                  <div className="w-full h-full rounded-full  bg-light-button-base flex justify-center items-center">
                    <Image
                      className="w-[2rem] h-[2rem]"
                      src={arrowright}
                      alt="arrow"
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Third Section (Right Box) */}


          <div
            className="w-full md:w-[48%] xl:w-[37%] mt-[3rem] md:mt-0 h-[500px] xl:h-[630px]  rounded-[3rem] relative flex flex-col justify-end  items-center cursor-pointer"
            style={{
              backgroundImage: `url(${data?.cards[3].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={handleCardClick3}
          >
            {/* Loading Spinner */}
            {loading3 && (
              <div className="absolute inset-0 rounded-[3rem] flex items-center justify-center bg-black bg-opacity-50 z-50">
                <TailSpin color="#ffffff" height={50} width={50} />
              </div>
            )}

            {/* Top Right Arrow Button */}
            <div className="absolute  top-[40%] right-[-1rem] w-[100px] h-[100px] rounded-full shadow-lg bg-white p-2 cursor-pointer">
              <div className="w-full h-full rounded-full  bg-light-button-base flex justify-center items-center">
                <Image
                  className="w-[2rem] h-[2rem] "
                  src={arrowright}
                  alt="arrow"
                />
              </div>
            </div>

            {/* Bottom Gradient with Centered Text */}
            <div className="w-full h-[50%] bg-blue-gradient-180  rounded-[2rem] flex  relative">
              <div className="flex flex-col gap-2 absolute px-4  bottom-10">
                <h4 className="text-H4  text-white font-poppins leading-snug line-clamp-2">
                  {data?.cards[3].title}
                </h4>
                <p className="text-T6 text-white font-poppins line-clamp-1 2xl:line-clamp-2">
                  {data?.cards[3].category_name}
                </p>
              </div>
            </div>

          </div>


          <div className="w-full   h-[600px] xl:h-[630px]  hidden md:block xl:hidden  md:flex  justify-between gap-6 cursor-pointer">
            {/* First Box */}
            <div
              className="h-[50%] rounded-[3rem] w-full relative  mt-4 md:mt-0 mb-6 md:mb-0 "
              style={{
                backgroundImage: `url(${data?.cards[1].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={handleCardClick1}
            >
              <div className="absolute inset-0   rounded-[3rem] " id="ColorBG" />

              {/* Loading Spinner */}
              {loading1 && (
                <div className="absolute inset-0 flex items-center justify-center  rounded-[3rem] bg-opacity-50">
                  <TailSpin color="#ffffff" height={50} width={50} />
                </div>
              )}


              <div className="w-full h-full rounded-[3rem] relative flex items-center justify-center">

                {/* Centered Content */}
                <div className="flex flex-col gap-2 items-center mt-[-4rem] text-center w-[60%] px-2">


                  <h4 className="text-H4 line-clamp-2 leading-[2.5rem] text-white font-poppins">
                    {data?.cards[1].title}
                  </h4>
                  <p className="font-poppins text-white line-clamp-1 text-T6 2xl:line-clamp-2">
                    {data?.cards[1].category_name}
                  </p>
                </div>

                {/* Bottom Circle */}
                <div className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white p-2 cursor-pointer">
                  <div className="w-full h-full rounded-full bg-light-button-base flex justify-center items-center">
                    <Image
                      className="w-[2rem] h-[2rem]"
                      src={arrowright}
                      alt="arrow"
                    />
                  </div>
                </div>

              </div>

            </div>




            {/* Second Box */}

            <div
              className="h-[50%] rounded-[3rem] w-full relative bg-black mt-4 md:mt-0 mb-6 md:mb-0 "
              style={{
                backgroundImage: `url(${data?.cards[2].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={handleCardClick2}
            >
              <div className="absolute inset-0   rounded-[3rem] " id="ColorBG" />

              {/* Loading Spinner */}
              {loading2 && (
                <div className="absolute inset-0 flex items-center justify-center  rounded-[3rem] bg-opacity-50">
                  <TailSpin color="#ffffff" height={50} width={50} />
                </div>
              )}


              <div className="w-full h-full rounded-[3rem] relative flex items-center justify-center">

                {/* Centered Content */}
                <div className="flex flex-col gap-2 items-center mt-[-4rem] text-center w-[60%] px-2">
                  <h4 className="text-H4 line-clamp-2 leading-[2.5rem] text-white font-poppins">
                    {data?.cards[2].title}
                  </h4>
                  <p className="font-poppins text-white line-clamp-1 text-T6 2xl:line-clamp-2">
                    {data?.cards[2].category_name}
                  </p>
                </div>

                {/* Bottom Circle */}
                <div className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white p-2 cursor-pointer">
                  <div className="w-full h-full rounded-full  bg-light-button-base flex justify-center items-center">
                    <Image
                      className="w-[2rem] h-[2rem]"
                      src={arrowright}
                      alt="arrow"
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Section4;
