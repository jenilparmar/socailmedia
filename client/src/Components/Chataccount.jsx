import React from "react";

export default function Chataccount() {
  return (
    <div className="messages bg-gray-500 w-inherit h-10 flex flex-row ">
      <div className="profilePhoto inbox w-8 h-8 bg-white"></div>
      <div className="accountName text-sm text-white mx-2">_._jenil.p_._</div>
      <div className="timeAgo text-gray-800">2 min ago</div>
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
