import React from 'react'

export default function Notification(isDarkMode) {
  let color = isDarkMode ? 'black' : 'white';

  return (
   <>
    <div className={`z-10 containerNotificaion w-72 bg-${!isDarkMode?"white":"black"} h-screen`}>
    <h3 className={`text-${!isDarkMode?"black":"white"}`}>Notifications</h3>

    </div>
   
   </>

  )
}
