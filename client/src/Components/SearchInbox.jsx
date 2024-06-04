import React, { useContext, useState } from "react";
import ComentsContext from "../myContext";

export default function SearchInbox({ setPerson ,setFlag,setInfo}) {
  const [searchValue, setSearchValue] = useState("");
  const handleSetFunction = (name) => {
    setPerson(name);
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
const { handleClick} = useContext(ComentsContext)
const { userName} = useContext(ComentsContext)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // console.log(userName['userName']);
      if(searchValue == userName ){
        handleClick("Profile")
      }
      else{
      fetch(`/search/${searchValue}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          if(data===null) handleSetFunction(null);
          else {
            console.log(data);
            handleSetFunction(data.name);
            setFlag(true)
            setInfo(data)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }}
  };

  return (
    <>
      <input
        type="text"
        name="SearchBox"
        placeholder="Search"
        id="Searchbox"
        className="SearchBox text-white bg-transparent border-2  border-white border-solid focus:font-semibold h-8"
        style={{ borderRadius: "15px", marginLeft: "2.2em" }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}

      />
    </>
  );
}
