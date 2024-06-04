import React, { useContext, useEffect, useState } from "react";
import SearchInbox from "./SearchInbox";
import ComentsContext from "../myContext";
import ProfileVisit from "./ProfileVisit";

export default function SearchBox({ isDarkMode, handleClick }) {
  const [person, setPerson] = useState({});
  const [searched, setSearched] = useState(false);
  const [followingCount,setFollowingCount] = useState(-1)
  const [followersCount,setFollowersCount] = useState(-1)
  const [info, setInfo] = useState({});
  const [flag,setFlag] = useState(false)
  let len = 0;
  if (!info) {
    len = info["posts"].length;
  }
  let color = isDarkMode ? "black" : "white";
  const hadnleProfile = () => {
    setSearched(!searched);
  };
  setInterval(()=>{
    if(person["following"]){
      setFollowingCount(person["following"].length)
      
      clearInterval()
    }else{
      setFollowingCount(-1)
    }
  },1000)
  setInterval(()=>{
    if(person["followers"]){
      setFollowersCount(person["followers"].length)
      clearInterval()
    }else{
      setFollowingCount(-1)
    }
  },1000)
  return (
    <>
      <div
        className={`z-10 containerSearchBox w-80 bg-${
          !isDarkMode ? "black" : "white"
        } h-screen`}>
        <h3 className={`text-${color}`}>Search</h3>
        <i
          className="AK z-20 fa-solid fa-xmark absolute top-6 right-8 text-white"
          onClick={() => handleClick("Home")}></i>
        <br />
        <SearchInbox setFlag={setFlag} setPerson={setPerson} setInfo={setInfo} />
        {searched ? <ProfileVisit person={person} info={info} /> : undefined}
      </div>
      {flag ? (
        <div
          className="w-64 h-12 bg-black rounded-md -mx-1 hover:bg-slate-700 flex flex-col relative left-16  top-28 text-white text-center text-sm z-20"
          onClick={hadnleProfile}>
          <div className="text-left font-bold text-xl">
            {info["name"]}
          </div>
          {info?<div className="flex flex-row gap-3">
            <div>{followersCount==-1?0:followersCount} followers</div>
            <div>{followingCount==-1?0:followingCount} followings</div>
         
          </div>:undefined}
        </div>
      ) : undefined}
    </>
  );
}
