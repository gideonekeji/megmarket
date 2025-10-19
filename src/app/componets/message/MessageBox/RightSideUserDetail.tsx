"use client";

import React from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { useInnerChatList } from "@/app/storeApp/api/message/useInnerChatList";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
function RightSideUserDetail() {
    const dispatch = useAppDispatch();

    // Get user info from Redux
    const { selectedUser } = useAppSelector((state) => state.userSlice);

    // Get detail ID from cookies
    const detailId = Cookies.get("detail_id");
    const userId = Cookies.get("user_id");

    // Fetch service detail only if detailId exists
    const { data: detailData } = detailId
        ? useServiceDetailApi(detailId)
        : { data: null };

    // Determine chat participants
    const toUser =
        selectedUser?.second_id || detailData?.vendorDetails?.id || null;

    const { data: chatData } = useInnerChatList(userId, toUser);

    // Determine profile picture & name
    const profilePic =
        selectedUser?.profilePic || detailData?.vendorDetails?.image || "";

    const firstName =
        selectedUser?.firstName || detailData?.vendorDetails?.first_name || "";
    const lastName =
        selectedUser?.lastName || detailData?.vendorDetails?.last_name || "";

    // Handle view profile click
    const handleViewProfile = () => {
        if (chatData?.to_user_details?.id) {
            dispatch(showModal("VendorInfoModal"));
            sessionStorage.setItem("selecteduserid", chatData.to_user_details.id);
        }
    };


 console.log("RightSideUserDetail Rendered", chatData?.to_user_details?.role)

    return (
        <div className="w-full flex items-center justify-between bg-[#226FE4] py-4 px-6 rounded-tr-xl rounded-br-xl">
            {/* Left: Profile info */}
            <div className="flex items-center">
                <div
                    className="rounded-full   h-11  w-14 xl:w-[60px] xl:h-[60px] object-cover"
                    style={{
                        backgroundImage: `url(${profilePic})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="ml-4">
                    <h2 className="text-white font-medium  text-sm xl:text-lg font-poppins cursor-pointer">
                        {firstName} <span>{lastName}</span>
                    </h2>
                </div>
            </div>

            {/* Right: View profile button */}
            {chatData?.to_user_details?.role === "vendor" && (
                <button
                    className="text-[#226FE4] bg-white  px-1 md:px-4 py-1 md:py-2 rounded-lg font-poppins"
                    onClick={handleViewProfile}
                >
                    View profile
                </button>
            )}
        </div>
    );
}

export default RightSideUserDetail;
