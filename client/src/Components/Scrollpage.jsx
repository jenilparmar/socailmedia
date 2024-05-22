import React from "react";
import Post from "./Post";

export default function Scrollpage() {
  return (
    <>
      <div className="containerScrollPage  w-48 h-screen">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
}
