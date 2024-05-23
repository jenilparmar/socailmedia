import React, { useEffect, useState } from "react";

export default function Explorepage({ isDarkMode }) {

  const [color, setColor] = useState(isDarkMode ? "black" : "white");

  useEffect(() => {
    setColor(isDarkMode ? "black" : "white");
  }, [isDarkMode]);

  return (
    <div className={`containerExplorePage bg-black flex flex-col w-48 h-screen overflow-y-auto`}>
        <h3 className={`text-white bg-black`}>Explore</h3>
        <div className="bg-yellow-400 w-full flex flex-row justify-center">
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
        </div>
        <div className="bg-yellow-400 w-full flex flex-row justify-center">
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
        </div> 
        <div className="bg-yellow-400 w-full flex flex-row justify-center">
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
          <div className="bg-red-500 w-64 my-2 h-40 mx-7"></div>
        </div>
    </div>
  );
}
