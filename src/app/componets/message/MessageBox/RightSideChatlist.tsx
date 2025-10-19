"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import "./messageBoxstyle.css";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import pdficon from "../../../../../public/assets/Image/pdf_icons.png";
import { useInnerChatList } from "@/app/storeApp/api/message/useInnerChatList";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import ImageModalMessage from "./ImageModalMessage";
import ImageModalRightSide from "./ImageModalRightSide";
import ScrollToBottom from "react-scroll-to-bottom";

//
// ✅ Utility to format dates like WhatsApp style
//
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        return "Today";
    }

    if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    ) {
        return "Yesterday";
    }

    // 👉 Indian format (19 Aug 2025)
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

//
// ✅ Utility to format time in Indian Standard Time
//
const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata", // 🔑 Force IST timezone
    });
};

function RightSideChatlist() {
    const lastSegment = Cookies.get("detail_id");

    const { data: detaildata } = lastSegment
        ? useServiceDetailApi(lastSegment)
        : { data: null, refetch: () => { } };

    const userselected = useAppSelector((state) => state.userSlice);
    const usedispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [RightSideImage, setRightSideImage] = useState<string | null>(null);

    const to_user =
        userselected.selectedUser?.second_id || detaildata?.vendorDetails.id;

    const from_user = Cookies.get("user_id");

    // ✅ Now include loading state from hook
    const { data, isLoading } = useInnerChatList(from_user, to_user);

    const chatMessages = data?.chatMessages || [];

    // ✅ Flatten and group
    const allMessages =
        chatMessages
            ?.flatMap((chat) => chat.messages)
            .sort(
                (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
            ) || [];

    const groupedMessages: { [key: string]: typeof allMessages } = {};
    allMessages.forEach((msg) => {
        const dateKey = formatDate(msg.created_at);
        if (!groupedMessages[dateKey]) groupedMessages[dateKey] = [];
        groupedMessages[dateKey].push(msg);
    });

    return (
        <ScrollToBottom className="w-full h-[20rem] md:h-[37rem] flex flex-col px-4 py-4 space-y-6 overflow-y-auto">
            {isLoading ? (
                // ✅ Show loading state
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 text-sm font-poppins">
                            Loading chats...
                        </p>
                    </div>
                </div>
            ) : allMessages.length === 0 ? (
                // ✅ Empty chat fallback
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-400 text-sm font-poppins">
                        No messages yet
                    </p>
                </div>
            ) : (
                Object.keys(groupedMessages).map((date, idx) => (
                    <div key={idx} className="space-y-4">
                        {/* ✅ Date Divider */}
                        <div className="flex justify-center">
                            <span className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                {date}
                            </span>
                        </div>

                        {/* ✅ Messages for this date */}
                        {groupedMessages[date].map((message, index) => {
                            const isFromUser = message.from_user === Number(from_user);

                            return (
                                <div
                                    key={index}
                                    className={`flex ${isFromUser
                                        ? "justify-end w-[70%] ml-auto"
                                        : "justify-start w-[70%] mr-auto"
                                        }`}
                                >
                                    {/* LEFT SIDE (received) */}
                                    {!isFromUser && (
                                        <div className="flex flex-col gap-1 mb-8">
                                            <div
                                                className="rightsideboxleftsidechat h-fit p-3 rounded-t-xl rounded-br-xl bg-gray-100 shadow-sm"
                                                onClick={() => {
                                                    if (message.type === "image") {
                                                        usedispatch(
                                                            showModal("ImageModalRightSide")
                                                        );
                                                        setRightSideImage(message.url);
                                                    }
                                                }}
                                            >
                                                {message.type === "image" ? (
                                                    <img
                                                        src={message.url}
                                                        alt="image"
                                                        className="w-40 h-40 object-cover rounded-xl cursor-pointer"
                                                    />
                                                ) : message.type === "doc" ? (
                                                    <a
                                                        href={message.url}
                                                        download={message.url.split("/").pop()}
                                                        className="w-40 h-40 bg-gray-200 flex justify-center items-center rounded-xl"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Image
                                                            src={pdficon}
                                                            className="h-12 w-12"
                                                            alt="pdf"
                                                        />
                                                    </a>
                                                ) : (
                                                    <p className="text-black font-poppins leading-relaxed">
                                                        {message.message}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-xs font-poppins text-[#A4A4A4]">
                                                {formatTime(message.created_at)}
                                            </span>
                                            {RightSideImage && (
                                                <ImageModalRightSide
                                                    RightSideImage={RightSideImage}
                                                />
                                            )}
                                        </div>
                                    )}

                                    {/* RIGHT SIDE (sent) */}
                                    {isFromUser && (
                                        <div className="flex flex-col gap-1 mb-8">
                                            <div
                                                className="leftsideboxrightsidechat h-fit p-3 rounded-t-xl rounded-bl-xl bg-blue-600 text-white shadow-sm"
                                                onClick={() => {
                                                    if (message.type === "image") {
                                                        usedispatch(showModal("ImageModalMessage"));
                                                        setSelectedImage(message.url);
                                                    }
                                                }}
                                            >
                                                {message.type === "image" ? (
                                                    <img
                                                        src={message.url}
                                                        alt="image"
                                                        className="w-40 h-40 object-cover rounded-xl cursor-pointer"
                                                    />
                                                ) : message.type === "doc" ? (
                                                    <a
                                                        href={message.url}
                                                        download={message.url.split("/").pop()}
                                                        className="w-40 h-40 bg-gray-200 flex justify-center items-center rounded-xl"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Image
                                                            src={pdficon}
                                                            className="h-12 w-12"
                                                            alt="pdf"
                                                        />
                                                    </a>
                                                ) : (
                                                    <p className="font-poppins leading-relaxed">
                                                        {message.message}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-xs font-poppins text-[#A4A4A4] self-end">
                                                {formatTime(message.created_at)}
                                            </span>
                                            {selectedImage && (
                                                <ImageModalMessage
                                                    selectedImage={selectedImage}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))
            )}
        </ScrollToBottom>
    );
}

export default RightSideChatlist;
