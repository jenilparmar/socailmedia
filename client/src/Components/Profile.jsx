import React, { useContext, useEffect, useState } from "react";
import Profileposts from "./Profileposts";
import ComentsContext from "../myContext";


export default function Profile() {
  const userName = useContext(ComentsContext)
  const [profile , setProfile]= useState({})
  const [len , setLen]  = useState(0)
useEffect(()=>{
fetch(`/search/${userName['userName']}`)
.then(res=>{
  return res.json()
})
.then(data=>{
  console.log(data);
  setProfile(data)
})
.catch(e=>{
  console.log(e);
})
},[])
setInterval(()=>{
  if(profile['posts']){
    setLen(profile['posts'].length)
    clearInterval()
  }
  else{
    setLen(0)
  }
},2000)
  return (
    <>
      <div className="z-20 containerProfile fixed left-10 w-screen h-screen bg-black text-white">
        <div
          className="bg-yellow-500 fixed left-40 top-16 w-28 h-28"
          style={{
            borderRadius: "50%",
          }}></div>
      </div>
      <div className="text-white fixed left-56  mx-20 text-xl top-16 z-20">{profile['accountName']}</div>
      <div className="z-20 text-sm fixed left-80 -mx-4 text-gray-700 top-24 flex flex-col gap-1">
        <div>{profile['following']} following</div>
        <div>{profile['followers']} followers</div>
        <div >{len} posts</div>
      </div>
      <div className="z-20 w-9/12 h-40 fixed left-44 bottom-10" style={{
        borderTop:".2vh solid #3d3a3a "
      }}>
        <Profileposts/>
      </div>

    </>
  ); 
}
