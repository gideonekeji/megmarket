"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function CampaignModal() {
  const modalOpen = useAppSelector((state) => state.modals.CampaignModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  // Form state for business address
  const [address, setAddress] = useState("");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
          if (response?.status) {
            setAddress(response?.service?.address || "");
          }
        } catch (err) {
          console.error("API Error:", err);
        }
      };

      fetchData();
    }
  }, [vendor_id, service_id, updateService]);

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("CampaignModal"));
  const image = data?.service_images?.[0]?.service_images || "";

  console.log("   my service image    from  ", image);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const addgoaldata = useAppSelector((state) => state.campaignGoal);

  console.log("my goal data from 1212121212@@@@@@@@@@@@@@", addgoaldata.startDate);

  const router = useRouter();

  const handalnaivgate = () => {
    router.push("/bussines/Payment");
    dispatch(hideModal("CampaignModal"));
  };

 

 

  // Convert both start and end date to Date objects
  const start = new Date(addgoaldata.startDate);
  let end = new Date(addgoaldata.endDate);

  // Check if end date is invalid or not selected
  if (isNaN(end.getTime())) {
    // Default end date to current date if not selected
    end = new Date();
  }

  // Calculate the difference in time (in milliseconds)
  const timeDifference = end - start;

  // Convert time difference from milliseconds to days
  const totalDays = Math.max(timeDifference / (1000 * 3600 * 24), 1); // Ensure minimum is 1 day

  console.log("My total days:@@@@@@@@@@@@@@@@@@", totalDays);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${
              isDarkMode ? " bg-[#2F2F2F] text-white" : "bg-white  text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${
                isDarkMode ? " bg-[#2F2F2F]" : " modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg  dark:text-dark-darkcolor font-medium  text-center w-full">
                Campaign
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className=" mx-auto   w-[90%]  rounded-xl flex  flex-col gap-6  pt-6">
              {/*   store image  */}
              <div className=" w-full flex   flex-col gap-6 justify-center  items-center ">
                <h4 className=" font-poppins  text-lg font-medium  ">
                  {data?.service.service_name}
                </h4>
                {/*  add image bg  */}
                <div
                  className=" bg-cover bg-center  bg-no-repeat"
                  style={{
                    backgroundImage: `url(${image})`,
                    borderRadius: "20px",
                    width: "80%",
                    height: "220px",
                  }}
                ></div>
              </div>

              {/*  Campaign Name */}

              <h4 className=" w-full flex justify-center items-center  font-poppins  text-sm  font-medium">
                {addgoaldata.campaign_name}
              </h4>

              {/*  detail */}
              <div className=" w-full flex flex-col gap-4 h-auto   rounded-xl  p-6  bg-[#226FE40F] ">
                <div className=" w-full flex gap-4  justify-between items-center ">
                  <h4 className="   text-black dark:text-[#B4B4B4] font-poppins  text-sm  font-normal  ">
                    Locations
                  </h4>
                  <h4 className=" font-poppins text-light-button-base line-clamp-1 text-sm  font-normal  ">
                    {addgoaldata.address}
                  </h4>
                </div>
                <div className=" w-full flex  justify-between items-center ">
                  <h4 className="   text-black font-poppins  dark:text-[#B4B4B4] text-sm  font-normal  ">
                    Area
                  </h4>
                  <h4 className=" font-poppins text-[#8E8E8E] dark:text-[#B4B4B4]  text-sm  font-normal  ">
                    {addgoaldata.area_distance} kms
                  </h4>
                </div>
                <div className=" w-full flex  justify-between items-center ">
                  <h4 className="   text-black font-poppins  dark:text-[#B4B4B4] text-sm  font-normal  ">
                    Total Days
                  </h4>
                  <h4 className=" font-poppins text-[#8E8E8E]  dark:text-[#B4B4B4] text-sm  font-normal  ">
                    {totalDays} days
                  </h4>
                </div>

                <div className=" w-full flex  justify-between items-center ">
                  <h4 className="   text-black font-poppins dark:text-[#B4B4B4]  text-sm  font-normal  ">
                    Start Date / End Date
                  </h4>
                  <h4 className=" font-poppins text-[#8E8E8E]  text-sm  font-normal  ">
                    {addgoaldata.startDate} to {addgoaldata.endDate}
                  </h4>
                </div>
              </div>
              <div
                className={`mx-auto w-full rounded-lg  flex flex-col   ${
                  isDarkMode ? "bg-[#2F2F2F] text-[#ffffff]" : " bg-white "
                } `}
              >
                <div className=" w-full bordercolordailybudget dark:border-none rounded-xl p-4">
                  <div className=" w-full flex   justify-start items-center">
                    <h3 className=" text-lg font-medium font-poppins ">
                      Price Details
                    </h3>
                  </div>

                  <div className=" w-full flex gap-4 pt-4 flex-col">
                    <div className=" w-full flex justify-between items-center ">
                      <div className=" text-black    dark:text-[#B4B4B4] font-poppins text-sm">
                        Selected Ad Days
                      </div>
                      <div className=" text-black  dark:text-[#B4B4B4]  font-poppins text-sm">
                      {totalDays} days
                      </div>
                    </div>
                    <div className=" w-full flex justify-between items-center ">
                      <div className=" text-black   dark:text-[#B4B4B4] font-poppins text-sm">
                        Price
                      </div>
                      <div className=" text-black   dark:text-[#B4B4B4] font-poppins text-sm">
                        {addgoaldata.price}
                      </div>
                    </div>
                    <div className=" w-full flex justify-between items-center ">
                      <div className=" text-black   dark:text-[#B4B4B4] font-poppins text-sm">
                        Tax/GST
                      </div>
                      <div className=" text-black   dark:text-[#B4B4B4] font-poppins text-sm">
                        $20
                      </div>
                    </div>

                    <div className=" w-full flex justify-between items-center ">
                      <div className=" text-black   dark:text-[#B4B4B4] font-poppins text-sm">
                        Platform Charges
                      </div>
                      <div className=" text-black  dark:text-[#B4B4B4]  font-poppins text-sm">
                        $2
                      </div>
                    </div>
                    <hr className=" text-[#424242]" />
                    <div className=" w-full flex justify-between items-center ">
                      <div className=" text-black  dark:text-[#B4B4B4]  font-poppins text-[16px]  font-medium">
                        Total Amount
                      </div>
                      <div className=" text-black  dark:text-dark-darkcolor  font-poppins text-lg font-medium">
                        {addgoaldata.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="w-full justify-center flex items-center"
                onClick={handalnaivgate}
              >
                <button className="w-fit px-14 rounded-lg py-2 text-white  bg-light-button-base font-poppins">
                  Make Payment
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default CampaignModal;
