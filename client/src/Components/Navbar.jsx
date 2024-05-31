import React, { useContext, useState,useEffect } from "react";
import ComentsContext from "../myContext";

export default function Navbar({ activeFunction, darkMode, isDarkMode }) {
  const handleClick = (navItem) => {
    activeFunction(navItem);
  };

  let color = isDarkMode ? "black" : "white";
  const { setCommentActive } = useContext(ComentsContext);

  const { userName } = useContext(ComentsContext);
  const [image , setImage] = useState("")
  useEffect(()=>{
    // console.log(name);
    fetch(`/findUser/${userName}`)
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      // console.log(data);
      setImage(data['imgUrl'])
      // console.log(image);
    })
    .catch(e=>{
      console.log(e);
    })
  },[])
  return (
    <>
      <div
        className={`container bg-${
          !isDarkMode ? "black" : "white"
        } text-${color} w-10 h-screen mx-0 fixed gap-10 left-0 flex flex-col justify-center`}
        style={{
          borderRight: ".2vh solid #3d3a3a ",
        }}>
        <i
          className={`fa-solid fa-house text-${color} justify-center self-center`}
          onClick={() => {
            handleClick("Home");
            setCommentActive(true);
          }}></i>
        <i
          className={`fa-solid fa-magnifying-glass text-${color} justify-center self-center`}
          onClick={() => handleClick("Search")}></i>

        <i
          className={`fa-solid fa-plus text-${color} justify-center self-center`}
          onClick={() => handleClick("Add Post")}></i>
        {!isDarkMode ? (
          <i
            className={`fa-regular fa-moon text-${color} justify-center self-center`}
            onClick={() => darkMode(true)}></i>
        ) : (
          <i
            className={`fa-regular fa-sun text-${color} justify-center self-center`}
            onClick={() => darkMode(false)}></i>
        )}
        <div
          className={`profilePhoto w-6 h-6 bg-black justify-center self-center`}
          onClick={() => {
            handleClick("Profile");
            setCommentActive(true);
          }} 
          style={{
            backgroundImage:`url(${image})`,
            backgroundPosition:"center",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
          }}></div>
      </div>
    </>
  );
}
