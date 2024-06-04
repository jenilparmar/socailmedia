import React, { useContext } from "react";


export default function Loader() {
    
    return (
    <>
     <div className="H z z-50 h-screen w-screen  bg-black"></div>
        <div class="containers z-50 ">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              result="blur"
              stdDeviation="10"
              in="SourceGraphic"></feGaussianBlur>
            <feColorMatrix
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              mode="matrix"
              in="blur"></feColorMatrix>
          </filter>
        </defs>
      </svg>

    </>
  );
}
