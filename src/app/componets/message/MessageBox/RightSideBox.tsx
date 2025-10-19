"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import EmojiPicker from "emoji-picker-react";

import infoCircle from "../../../../../public/assets/Image/info-circle2.png";
import sendicon from "../../../../../public/assets/Image/Send.png";
import crossicon from "../../../../../public/assets/Image/cross.png";
import pdficon from "../../../../../public/assets/Image/pdf_icons.png";
import emojiicon from "../../../../../public/assets/Image/emozi.png";
import chaticon  from  "../../../../../public/assets/Image/chaticon.png"

import { useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import {
  setDocument,
  setImage,
} from "@/app/storeApp/Slice/MessageSliceFileAndDoc";

import { useInnerChatList } from "@/app/storeApp/api/message/useInnerChatList";
import { useAddChatListMutation } from "@/app/storeApp/api/message/AddChatList";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { useUserChatList } from "@/app/storeApp/api/message/userChatList";

import FirstTimeStartChat from "./FirstTimeStartChat";
import RightSideUserDetail from "./RightSideUserDetail";
import RightSideChatlist from "./RightSideChatlist";

import "./messageBoxstyle.css";

function RightSideBox() {
  const dispatch = useDispatch();

  // --- State ---
  const [message, setMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Redux selectors ---
  const userselected = useAppSelector((state) => state.userSlice);
  const doc = useAppSelector((state) => state.MessageSliceFileAndDoc.document);
  const image = useAppSelector((state) => state.MessageSliceFileAndDoc.image);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // --- Cookies & API setup ---
  const lastSegment = Cookies.get("detail_id");
  const from_user = Cookies.get("user_id") || "";
  const token = Cookies.get("nlyticalwebtoken");

  const { data: detaildata } = lastSegment
    ? useServiceDetailApi(lastSegment)
    : { data: null };

  const to_user =
    userselected.selectedUser?.second_id || detaildata?.vendorDetails?.id;

  const { data, refetch } = useInnerChatList(from_user, to_user);
  const { refetch: userlistrefetch } = useUserChatList("");
  const [addChatList] = useAddChatListMutation();

  const chatMessages = data?.chatMessages || [];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // --- Scroll to bottom on new messages ---
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // --- Emoji handler ---
  const handleEmojiClick = (event: any) => {
    setMessage((prev) => prev + event.emoji);
    setEmojiPickerVisible(false);
  };

  // --- Remove File/Image ---
  const handleRemoveDoc = () => dispatch(setDocument(null));
  const handleRemoveImage = () => dispatch(setImage(null));

  // --- Send Message ---
  const handleSendMessage = async () => {
    if (!message.trim() && !doc && !image) return;

    const formData = new FormData();

    if (doc) {
      formData.append("type", "doc");
      formData.append("url", doc);
    }
    if (image) {
      formData.append("type", "image");
      formData.append("url", image);
    }
    if (message.trim()) {
      formData.append("type", "message");
      formData.append("message", message);
    }

    formData.append("from_user", from_user);
    formData.append("to_user", to_user || "");

    setIsLoading(true);

    try {
      const baseURL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

      const response = await fetch(`${baseURL}/add-chat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Error sending message");

      await response.json();

      // Reset state
      setMessage("");
      dispatch(setImage(null));
      dispatch(setDocument(null));

      // Refresh data
      refetch();
      userlistrefetch();
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Enter key ---
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      if (message.trim() || doc || image) {
        handleSendMessage();
      }
    }
  };



 console.log("RightSideBox userselected:", to_user);

  return (
    <div
      className={`w-full   h-[30rem]   md:h-[57.5rem] xl:h-[40rem] 2xl:h-[45rem] relative overflow-hidden ${isDarkMode ? "bg-[#2F2F2F]" : ""
        }`}
    >
      {to_user ? (
        <>
          <RightSideUserDetail />
          <RightSideChatlist />

          {/* Selected Doc Preview */}
          {doc && (
            <div className="absolute bottom-[0.1rem] max-w-80 md:z-30">
              <div className="flex items-center justify-between gap-2 rounded-[7px] p-4 px-6 text-sm bg-[#FAFAFA]">
                <div className="flex items-center gap-2">
                  <Image
                    className="h-10 w-10 object-cover"
                    src={pdficon}
                    alt="PDF Icon"
                  />
                  <span className="truncate max-w-56">{doc.name}</span>
                </div>
                <button
                  className="cursor-pointer w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center"
                  onClick={handleRemoveDoc}
                >
                  <Image src={crossicon} className="h-6 w-6" alt="cross" />
                </button>
              </div>
            </div>
          )}

          {/* Selected Image Preview */}
          {image && (
            <div className="absolute bottom-[2.2rem] w-[18rem] h-[15rem] p-3 md:z-30">
              <button
                className="absolute right-1 top-1 bg-slate-400 rounded-full"
                onClick={handleRemoveImage}
              >
                <Image src={crossicon} className="h-8 w-8" alt="cross" />
              </button>
              <Image
                src={URL.createObjectURL(image)}
                alt="preview"
                width={352}
                height={240}
                className="rounded-md object-cover"
              />
            </div>
          )}

          {/* Message Input */}
          <div className="w-full flex absolute bottom-2 h-[4rem]">
            <div className="flex items-center gap-2 w-full py-4 px-6">
              <div className="flex items-center w-full relative">
                {/* Emoji Button */}
                <button
                  className="absolute left-2"
                  onClick={() => setEmojiPickerVisible((prev) => !prev)}
                >
                  <Image
                    src={emojiicon}
                    className={`h-6 w-6 ${isDarkMode ? "bg-circle-icon" : "text-[#232323]"
                      }`}
                    alt="emoji"
                  />
                </button>

                {emojiPickerVisible && (
                  <div className="absolute bottom-12 left-2">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      theme={isDarkMode ? "dark" : "light"}
                    />
                  </div>
                )}

                {/* Input + Attachment */}
                <div className="relative flex items-center w-full">
                  {/* Emoji Button */}
                  <button
                    className="absolute left-2"
                    onClick={() => setEmojiPickerVisible((prev) => !prev)}
                  >
                    <Image
                      src={emojiicon}
                      className={`h-6 w-6 ${isDarkMode ? "bg-circle-icon" : "text-[#232323]"}`}
                      alt="emoji"
                    />
                  </button>

                  {/* Input Box */}
                  <input
                    type="text"
                    className={`font-poppins w-full rounded-[10px] py-[14px] pl-10 
      placeholder:text-sm placeholder:font-normal 
      dark:text-dark-darkcolor placeholder-[#B4B4B4] 
      dark:bg-dark-bginput focus:border-light-bordercolo-focusbordercolo 
      focus:outline-none focus:ring-[#226FE480] border 
      dark:border-dark-bordercolorinput border-[#B0B0B0]`}
                    placeholder="Type Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />

                  {/* Attachment Icon */}

                  <div
                    className=" absolute  right-3  cursor-pointer flex items-center md:z-50  bg-red-500 justify-center"
                    onClick={() => dispatch(showModal("MessageSendModal"))}
                  >
                   
                    <Image
                      src={chaticon}
                      alt="Attachment Icon"
                      className="h-6 w-6"
                    />

                  </div>
                </div>

              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="w-[60px] flex justify-center items-center h-[51px] rounded-xl bg-[#226FE4] text-white font-medium text-sm"
              >
                {isLoading ? (
                  <div className="w-[30px] h-[30px] border-4 border-[#B8B8B8] rounded-full animate-spin"></div>
                ) : (
                  <Image
                    src={sendicon}
                    alt="Send Icon"
                    className="w-[40%] h-[40%]"
                  />
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <FirstTimeStartChat />
        </div>
      )}
    </div>
  );
}

export default RightSideBox;
