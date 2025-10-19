"use client"; // This is important for Next.js to handle client-side rendering
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import ServiceDetailScreenInputBox from "./ServiceDetailScreenInputBox";
import arrowright from "../../../../../../public/assets/Image/arrow-right.png";
import video from "../../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { setCards } from "@/app/storeApp/Slice/cardsSlice";
import { IoClose } from "react-icons/io5";
import { decodeString } from "@/app/utils/enocodeAndDecode";

function ServiceDetailScreenFiltterModal() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const lastSegment = decodeString(lastSegment1);
  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);

  const storedata = data?.stores;
  const modalData = useAppSelector(
    (state) => state.modals.ServiceDetailScreenFiltterModal
  );

  const searchQuery = useAppSelector(
    (state) => state.serviceDetailScreenInput.searchQuery
  );

  // Function to close the modal
  const close = () => {
    dispatch(hideModal("ServiceDetailScreenFiltterModal"));
  };

  // Filter stores based on search query
  const filteredStores = storedata?.filter((store) =>
    store.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  console.log("filteredStoresfilteredStores", filteredStores)

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const handalstoredetailsub = (store) => {
    // Dispatching the clicked store's data to the Redux store
    dispatch(setCards([store])); // Only store the clicked card's data
    dispatch(showModal("ServiceDetailScreenFiltterModalDetail"));
  };

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl shadow-lg backdrop-blur-2xl my-4 duration-300 ease-out  max-w-[770px]  ${isDarkMode ? " bg-[#181818] text-white" : "bg-white text-black"
              }`}
          >
            {/* Modal Header */}
            <div
              className={`flex h-auto w-full items-center justify-center rounded-xl p-4  ${isDarkMode
                ? " border-[#212121] bg-[#FFFFFF0A]"
                : "border-white borderxcolorwithshado"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium ">
                {data?.serviceDetail.service_name}
              </h3>

              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4]"
                onClick={close}
                aria-label="Close"
              >
                <IoClose />
              </button>
            </div>

            {/* Search input box */}
            <div className="w-full flex flex-col">
              <div className="flex h-auto w-[70%] mx-auto items-center justify-between    pt-8 pb-3">
                <ServiceDetailScreenInputBox />
              </div>

              {/* Cards */}
              <div className="w-[90%] mx-auto">
                {filteredStores?.length > 0 ? (
                  filteredStores.map((store, index) => (
                    <div
                      key={index}
                      className="w-full h-32 rounded-xl cursor-pointer  dark:bg-[#FFFFFF0A] p-2 flex my-4 dark:border-none bordercolorcard"
                      onClick={() => handalstoredetailsub(store)}
                    >
                      {/* Left side image */}
                      <div
                        className="w-[25%]  h-full flex items-center justify-center  rounded-lg"
                        style={{
                          backgroundImage: `url(${store.store_images[0]})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>

                      {/* Right side */}
                      <div
                        className={`w-full flex flex-col items-center  gap-4 px-3  rounded-lg   `}
                      >
                        {/* Top heading */}
                        <div className="w-full flex justify-between items-center">
                          <div
                            className={`text-sm font-poppins font-medium   xl:text-T5   text-light-button-base
                              }`}
                          >
                            {store.store_name}
                          </div>
                          {/* Right arrow */}
                          <Image
                            src={arrowright}
                            alt="right-arrow"
                            className="w-4 h-4 object-center"
                          />
                        </div>

                        {/* Bottom paragraph */}
                        <div className="w-full flex justify-start items-start">
                          <p
                            className={`font-poppins line-clamp-3 text-sm 
                  [&_ul]:list-disc [&_ul]:list-inside 
                  [&_ol]:list-decimal [&_li]:ml-4
                  ${isDarkMode ? "text-white" : "text-[#535353]"}
                `}
                            dangerouslySetInnerHTML={{
                              __html: store.store_description,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-auto min-h-[20rem] w-full flex-col items-center justify-center text-center">
                    <div className="flex h-[8rem] w-[8rem] items-center justify-center">
                      <Image
                        src={video}
                        alt="Loading animation"
                        width={100}
                        height={100}
                      />
                    </div>
                    <h2
                      className={`font-poppins font-medium ${isDarkMode ? "text-white" : "text-black"
                        }`}
                    >
                      Not found services
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ServiceDetailScreenFiltterModal;
