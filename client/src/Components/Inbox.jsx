import React, { useEffect, useState } from "react";
import Chataccount from "./Chataccount";
import SearchInbox from "./SearchInbox";

export default function Inbox() {
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    fetch("/GetChats/user123")
      .then((res) => res.json())
      .then((data) => {
        setChatData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="containerInbox w-80 h-fit bg-black fixed gap-4 right-0 flex flex-col justify-between gap-0">
      <h3 className="text-white font-semibold mx-0">Chats</h3>
      <SearchInbox/>
      <div className="mes">
      {chatData.map((chat, index) => (
        Object.entries(chat.receivers).map(([receiverId, receiverData]) => (
          <Chataccount
            key={index + receiverId}
            receiverId={receiverId}
            message={receiverData.message}
            read={receiverData.read}
          />
        ))
      ))}
      </div>  
    </div>
  );
}
