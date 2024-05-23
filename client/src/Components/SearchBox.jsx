import React from 'react'

export default function SearchBox({isDarkMode}) {
  let color = isDarkMode ? 'black' : 'white';

  return (
    <div className={`z-10 containerSearchBox w-72 bg-${!isDarkMode?"black":"white"} h-screen`}>
      <h3 className={`text-${color}`}>Search</h3>
    </div>
  )
}
