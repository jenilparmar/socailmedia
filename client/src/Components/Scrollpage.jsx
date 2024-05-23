import React, { useEffect } from "react";
import Post from "./Post";

export default function Scrollpage({ isDarkMode,active}) {
  let blurClass = "blur";
  // useEffect(()=>{
  //   if(active=="Add Post") {
  //     blurClass="blur";
  //     // alert(active)
  //   }
  // },[active])
  return (
    <>
      <div className={`containerScrollPage w-48 h-screen overflow-y-auto bg-black text-white ${active==="Add Post"?blurClass:undefined}`}>
        <h3>Home</h3>
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
}
