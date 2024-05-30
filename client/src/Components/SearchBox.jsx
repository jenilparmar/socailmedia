import React, { useContext, useEffect, useState } from "react";
import SearchInbox from "./SearchInbox";
import ComentsContext from "../myContext";
import ProfileVisit from "./ProfileVisit";

export default function SearchBox({ isDarkMode }) {
  const [person, setPerson] = useState({});
  // const [profile,setProfile] = useState({})
  const [searched , setSearched] = useState(false)
  let color = isDarkMode ? "black" : "white";
  const hadnleProfile =()=>{
    setSearched(!searched)
  }
  return (
    <>
      <div
        className={`z-10 containerSearchBox w-80 bg-${
          !isDarkMode ? "black" : "white"
        } h-screen`}>
        <h3 className={`text-${color}`}>Search</h3>
        <br />
        <SearchInbox setPerson={setPerson} />
        {searched?<ProfileVisit person={person}/>:undefined}
      </div>
      <div className="w-64 h-10 bg-black  hover:bg-slate-700  relative left-16  top-28 text-white text-center text-sm z-20" onClick={hadnleProfile}>{person? person['accountName']:"No match Found!!"}</div>
    </>
  );
}
