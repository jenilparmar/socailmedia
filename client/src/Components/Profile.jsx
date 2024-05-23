import React from "react";
import Profileposts from "./Profileposts";

export default function Profile() {
  return (
    <>
      <div className="z-20 containerProfile fixed left-10 w-screen h-screen bg-black text-white">
        <div
          className="bg-yellow-500 fixed left-40 top-16 w-28 h-28"
          style={{
            borderRadius: "50%",
          }}></div>
      </div>
      <div className="text-white fixed left-56  mx-20 text-xl top-16 z-20">_._jenil.p_._</div>
      <div className="z-20 text-sm fixed left-80 -mx-4 text-gray-700 top-24 flex flex-col gap-1">
        <div>100 following</div>
        <div>150 followers</div>
        <div >5 posts</div>
      </div>
      <div className="z-20 w-9/12 h-40 fixed left-44 bottom-10" style={{
        borderTop:".2vh solid #3d3a3a "
      }}>
        <Profileposts/>
      </div>

    </>
  ); 
}
