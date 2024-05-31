import React, { useState } from "react";

export default function SearchInbox({ setPerson ,setInfo}) {
  const [searchValue, setSearchValue] = useState("");
  const handleSetFunction = (name) => {
    setPerson(name);
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(`/search/${searchValue}`);
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
            
            setInfo(data)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <input
        type="text"
        name="SearchBox"
        placeholder="Search"
        id="Searchbox"
        className="SearchBox text-white bg-transparent border-2  border-white border-solid focus:font-semibold  w-44 h-8"
        style={{ borderRadius: "15px", marginLeft: "2.2em", width: "25vw" }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}
