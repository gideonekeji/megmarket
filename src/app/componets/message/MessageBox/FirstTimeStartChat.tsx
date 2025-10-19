import { useRouter } from "next/navigation";
import React from "react";

function FirstTimeStartChat() {
  const router = useRouter();

  return (
    <h2
      className="text-gray-500 text-xl   cursor-pointer"
      onClick={() => {
        router.push("/store");
      }}
    >
      Type &quot;Hi&quot; To Start Chat
    </h2>
  );
}

export default FirstTimeStartChat;
