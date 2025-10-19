import React, { useEffect } from "react";
import chaticon from "../../../../public/assets/Image/messageicon.png";
import Image from "next/image";
import { useUserChatList } from "@/app/storeApp/api/message/userChatList";

function Messagebtn() {
  const searchQuery = "";
  const { data: userlist, refetch } = useUserChatList(searchQuery);

  useEffect(() => {
    refetch(); // Fetch new data whenever component mounts or searchQuery changes
  }, [userlist]);

  // Calculate total unread messages
  const totalUnreadMessages = userlist?.chat_list.reduce((acc, chat) => {
    return acc + parseInt(chat.unread_message || 0, 10); // Ensuring it's a number
  }, 0);

  console.log("my data @@@@@@@@@@@@@@", userlist?.chat_list);

  return (
    <div className="h-12 w-12 rounded-full relative      bg-light-button-base  bg-opacity-[9%]   dark:bg-opacity-40  flex justify-center items-center cursor-pointer">
      <Image src={chaticon} alt="Chat icon" className="w-[45%] h-[45%]" />
      {totalUnreadMessages > 0 && (
        <div className="absolute top-2 right-1 h-5 w-5 rounded-full bg-[#FF0004] flex justify-center items-center">
          <p className="text-[12px] font-poppins text-white">
            {totalUnreadMessages}
          </p>
        </div>
      )}
    </div>
  );
}

export default Messagebtn;
