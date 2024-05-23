import React, { useEffect, useState } from "react";

export default function Explorepage({ isDarkMode }) {
  const [color, setColor] = useState(isDarkMode ? "black" : "white");

  useEffect(() => {
    setColor(isDarkMode ? "black" : "white");
  }, [isDarkMode]);

  return (
    <div className={`containerExplorePage bg-${color} w-48 h-screen`}>
      <h3 className={`text-${isDarkMode ? "white" : "black"}`}>Explore Around</h3>
    </div>
  );
}
