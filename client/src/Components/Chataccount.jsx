import React from "react";

export default function Chataccount({receiverId,timestamp}) {
  return (
    <div className="messages w-inherit h-10 flex flex-row my-0 hover:bg-gray-900" >
      <div className="profilePhoto inbox w-8 h-8 bg-white"></div>
      <div className="z-10 accountName text-sm text-white mx-2">{receiverId}</div>
      <div className="timeAgo text-gray-800">{timestamp}</div>
      <div className="flex flex-row mx-9 gap-3 self-center relative -right-28">
      <div>
        <i className="fa-solid fa-phone self-center text-white"></i>
      </div>

      <div>
        <i className="fa-solid fa-video self-center text-white"></i>
      </div>
      </div>
    </div>
  );
}
