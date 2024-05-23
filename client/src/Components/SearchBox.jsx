import React from 'react'
import SearchInbox from "./SearchInbox";


export default function SearchBox({isDarkMode}) {
  let color = isDarkMode ? 'black' : 'white';

  return (
    <div className={`z-10 containerSearchBox w-80 bg-${!isDarkMode?"black":"white"} h-screen`}>
      <h3 className={`text-${color}`}>Search</h3>
      <br />
      <SearchInbox/>
    </div>
  )
}
