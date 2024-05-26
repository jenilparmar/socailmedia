import React, { useEffect, useState } from "react";
import Chataccount from "./Chataccount";
import SearchInboxForChat from "./SearchInboxForChat";

export default function Inbox() {
  const [chatData, setChatData] = useState([]);
  const [person, setPerson] = useState("");
  // useEffect(() => {
  //   fetch("/GetChats/user123")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setChatData(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="containerInbox w-80 h-fit bg-black fixed  right-0 flex flex-col justify-between gap-0">
      <h3 className="text-white font-semibold mx-0">Chats</h3>
      <SearchInboxForChat setPerson={setPerson}/>
      {person !== "" ? <div className="w-72 mx-4 h-12 text-red-800 bg-black text-center self-center my-2 hover:bg-gray-700">{person}</div> : undefined}

      <div className="mes">
        {chatData.map((chat, index) =>
          Object.entries(chat.receivers).map(([receiverId, receiverData]) => (
            <Chataccount
              key={index + receiverId}
              receiverId={receiverId}
              message={receiverData.message}
              read={receiverData.read}
            />
          ))
        )}
      </div>
    </div>
  );
}
