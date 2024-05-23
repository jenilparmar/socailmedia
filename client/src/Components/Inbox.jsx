import React from "react";
import Chataccount from "./Chataccount";

export default function Inbox() {
  return (
    <>
      <div className="containerInbox w-80 h-screen bg-black fixed right-0 flex flex-col justify-between gap-0">
      <Chataccount/>
      <Chataccount/>
      <Chataccount/>
      <Chataccount/>
      <Chataccount/>
      <Chataccount/>
      <Chataccount/>
      <Chataccount/>
      <Chataccount/>
        
      </div>
    </>
  );
}
