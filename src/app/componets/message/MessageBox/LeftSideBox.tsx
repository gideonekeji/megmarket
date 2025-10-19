"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { useUserChatList } from "@/app/storeApp/api/message/userChatList";
import Cookies from "js-cookie";
import Image from "next/image";
import MessageSerchBox from "./MessageSerchBox";
import { setSelectedUser } from "@/app/storeApp/Slice/userSlice";
import { User } from "@/app/types/Restypes";
import { useAppSelector } from "@/app/hooks/hooks";

function LeftSideBox({ menuOpen, setMenuOpen }) {
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();

  const [triggerUpdateProfile] = useUpdateProfileMutation();

  // Fetch search query from Redux
  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  // Update profile once on mount
  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id });
    }
  }, [user_id, triggerUpdateProfile]);

  // Fetch user chat list
  const { data: userlist, refetch } = useUserChatList(searchQuery);

  // Track selected user
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserClick = (user: User) => {
  setSelectedUserId(user.id);
  dispatch(
    setSelectedUser({
      id: user.id,
      second_id: user.second_id,
      firstName: user.first_name,
      lastName: user.last_name,
      profilePic: user.profile_pic || "/assets/Image/Avatar_img_2.jpg",
      lastMessage: user.last_message,
      lastSeen: user.last_seen,
      isOnline: user.is_online === 1,
      unreadMessageCount: user.unread_message,
      userRole: user.user_role,
      time: user.time,
      isBlocked: user.is_block === 1,
    })
  );

  // ✅ Close sidebar only on mobile screens
  if (window.innerWidth < 768) {
    setMenuOpen(false);
  }
};


  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`relative w-full shadow-lg h-screen overflow-y-auto ${
        isDarkMode ? "bg-[#2F2F2F] rounded-l-lg" : ""
      }`}
    >
      {/* Sidebar Wrapper */}
      <div
        className={`p-4 flex flex-col gap-6 rounded-l-lg transition-all duration-300 ease-in-out md:block absolute md:relative w-[90%] xl:w-full left-0 top-0 h-full z-10 transform ${
          menuOpen
            ? "translate-x-0 z-50 h-screen bg-white"
            : "-translate-x-full hidden"
        } md:translate-x-0`}
      >
        {/* Title */}
        <div className="mt-4">
          <p
            className={`font-poppins font-normal text-lg ${
              isDarkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Chat
          </p>
        </div>

        {/* Search */}
        <div className=" my-4 md:block">
          <MessageSerchBox />
        </div>

        {/* User Chat List */}
        <div className="cursor-pointer">
          {userlist?.chat_list?.length === 0 ? (
            <p
              className={`text-center mt-4 ${
                isDarkMode ? "text-white" : "text-gray-500"
              }`}
            >
              No users found matching your search criteria.
            </p>
          ) : (
            userlist?.chat_list?.map((user: User) => {
              const isSelected = selectedUserId === user.id;

              return (
                <div
                  key={user.id}
                  className={`w-full flex items-center pt-4 px-2 justify-between py-2 border-b ${
                    isSelected
                      ? "    border-light-button-base bg-light-button-base  bg-opacity-[9%]   rounded-lg " // highlight selected user with red border
                      : "border-gray-200"
                  }`}
                  onClick={() => handleUserClick(user)}
                >
                  {/* Profile Image */}
                  <div className="flex-shrink-0 relative">
                    <Image
                      className="rounded-full w-[60px] h-[60px] object-cover"
                      src={user.profile_pic || "/assets/Image/Avatar_img_2.jpg"}
                      alt={`${user.last_name} profile`}
                      width={60}
                      height={60}
                    />
                  </div>

                  {/* User Info */}
                  <div className="w-full h-full flex justify-between items-center">
                    <div className="flex-1 ml-4 flex-col">
                      <h3
                        className={`font-poppins font-semibold text-lg hover:text-[#226FE4] cursor-pointer transition duration-200 line-clamp-1 ${
                          isDarkMode ? "text-gray-200" : "text-black"
                        }`}
                      >
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="font-poppins text-[#A4A4A4] font-normal text-sm truncate max-w-[180px]">
                        {user.last_message}
                      </p>
                    </div>

                    {/* Time & Unread Count */}
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <p className="font-poppins text-[#A4A4A4] text-[12px]">
                        {user.time}
                      </p>
                      {user.unread_message > 0 && (
                        <div className="relative mt-1">
                          <div className="h-5 w-5 rounded-full bg-[#226FE4] flex justify-center items-center text-xs text-white absolute -top-2 -right-2">
                            {user.unread_message}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSideBox;
