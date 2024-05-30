import React, { useContext, useEffect, useState } from "react";
import SearchInbox from "./SearchInbox";
import ComentsContext from "../myContext";
import ProfileVisit from "./ProfileVisit";

export default function SearchBox({ isDarkMode, handleClick }) {
  const [person, setPerson] = useState({});
  // const [profile,setProfile] = useState({})
  const [searched, setSearched] = useState(false);
  const [info, setInfo] = useState({});
  let len = 0;
  if (!info) {
    len = info["posts"].length;
  }
  let color = isDarkMode ? "black" : "white";
  const hadnleProfile = () => {
    setSearched(!searched);
  };
  return (
    <>
      <div
        className={`z-10 containerSearchBox w-80 bg-${
          !isDarkMode ? "black" : "white"
        } h-screen`}>
        <h3 className={`text-${color}`}>Search</h3>
        <i
          className="z-20 fa-solid fa-xmark absolute top-6 right-8 text-white"
          onClick={() => handleClick("Home")}></i>
        <br />
        <SearchInbox setPerson={setPerson} setInfo={setInfo} />
        {searched ? <ProfileVisit person={person} /> : undefined}
      </div>
      {person ? (
        <div
          className="w-64 h-12 bg-black  hover:bg-slate-700 flex flex-col relative left-16  top-28 text-white text-center text-sm z-20"
          onClick={hadnleProfile}>
          <div className="text-left font-bold text-xl">
            {info["accountName"]}
          </div>
          {info?<div className="flex flex-row gap-3">
            <div>{info["followers"]} followers</div>
            <div>{info["following"]} followings</div>
            <div>{len} Posts</div>
          </div>:undefined}
        </div>
      ) : undefined}
    </>
  );
}
