import React from "react";

export default function SearchInbox() {
  return (
    <>
      <input
        type="text"
        name="SearchBox"
        placeholder="Search "
        id="Searchbox"
        className="SearchBox bg-transparent border-2 border-white border-solid focus:bg-white text-black font-semibold w-44 h-8  "
        style={{ borderRadius: "15px", marginLeft: "2.2em" ,width: "25vw" }}
      />
    </>
  );

}
