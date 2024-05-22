import React from 'react'

export default function Navbar() {
  return (
    <>
    <div className="container bg-black text-white w-10  h-screen mx-0 fixed  gap-10 left-0 flex flex-col justify-center">
    <i class="fa-solid fa-house text-white justify-center self-center "></i>
    <i class="fa-solid fa-magnifying-glass  text-white justify-center self-center "></i>
    <i class="fa-regular fa-heart  text-white justify-center self-center"></i>
    <i class="fa-regular fa-compass   text-white justify-center self-center"></i>
    <i class="fa-solid fa-plus  text-white justify-center self-center "></i>
    <i class="fa-regular fa-sun text-white justify-center self-center"></i>
    <i class="fa-regular fa-moon text-white justify-center self-center"></i>
    <div className="profilePhoto w-6 h-6  bg-white justify-center self-center"></div>
    </div>
    </>
  )
}
