import React, { useEffect, useState } from "react";
import SearchInbox from "./SearchInbox";

export default function SearchBox({ isDarkMode }) {
  const [person, setPerson] = useState("");
  let flag = false;
  // useEffect(() => {}, [person]);
  let color = isDarkMode ? "black" : "white";

  return (
    <>
      <div
        className={`z-10 containerSearchBox w-80 bg-${
          !isDarkMode ? "black" : "white"
        } h-screen`}>
        <h3 className={`text-${color}`}>Search</h3>
        <br />
        <SearchInbox setPerson={setPerson} />
      </div>
      <div className="w-64 h-10 bg-black  hover:bg-slate-700  relative left-16  top-28 text-white text-center text-sm z-20">{person!==" " ? person:"No match Found!!"}</div>
    </>
  );
}
