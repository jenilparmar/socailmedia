import React, { useEffect, useState } from "react";
import ComentsContext from "./myContext"; // Import the ComentsContext
import "./App.css";
import Navbar from "./Components/Navbar";
import Scrollpage from "./Components/Scrollpage";
import Inbox from "./Components/Inbox";
import SearchBox from "./Components/SearchBox";
import Notification from "./Components/Notification";
import AddPost from "./Components/AddPost";
import Profile from "./Components/Profile";
import Commentbox from "./Components/Commentbox";
import AuthenticationPage from "./Components/AuthenticationPage";


export default function App() {
  const [active, setActive] = useState("Home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentActive, setCommentActive] = useState(true);
  const [name, setName] = useState("");
  const [authenticated , setAuthenticated] = useState(false);
  const [getSigning, setGetSigning] = useState(false);
  const [userName , setUserName]  = useState("")
  const [id,setID]  = useState("")
  let flag = false;
  const handleCommentBox = () => {
    setCommentActive(false);
  };

  const handleDarkMode = (mode) => {
    setIsDarkMode(mode);
  };
  
  useEffect(() => {
    // Check if the user is authenticated from localStorage
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth === "true") {
      setAuthenticated(true);
      // Retrieve the username from localStorage if authenticated
      const storedUserName = localStorage.getItem("useName");
      if (storedUserName) {
        console.log(userName);
        setUserName(storedUserName);
      }
    }
  }, []);

  const handleClick = (navActive) => {
    setActive(navActive);
  };
  return (
    <>
      <ComentsContext.Provider
        value={{ setCommentActive, commentActive,id,setID,setName, name ,getSigning ,setGetSigning,userName,handleClick ,setUserName}}>
        {" "} 
        {/* Provide the context value */}
        {!true ? (
          <AuthenticationPage  setAuthenticated={setAuthenticated}/> 
          //  {!false ? (
          //   <AuthenticationPage  setAuthenticated={setAuthenticated}/>
        ) : (
          <div
            className={`container2 flex flex-row bg-black justify-between `}>
            <Navbar
              activeFunction={handleClick}
              darkMode={handleDarkMode}
              isDarkMode={isDarkMode}
            />
        
            {active === "Search" && <SearchBox isDarkMode={isDarkMode} handleClick={handleClick}/>}
            {active === "Notification" && (
              <Notification isDarkMode={isDarkMode} />
            )}
            {active === "Explore" && active !== "Add Post" ? undefined : (
              <Scrollpage
                active={active}
                handleCommentBox={handleCommentBox}
                commentActive={commentActive}
              />
            )}
            {active === "Add Post" ? (
              <AddPost activeFunction={handleClick} />
            ) : undefined}

            {active === "Profile" ? <Profile /> : undefined}
            {commentActive ? (
              <Inbox />
            ) : (
              <Commentbox handleCommentBox={handleCommentBox} />
            )}
          </div>
        )}{" "}
      </ComentsContext.Provider>{" "}
      {/* Close the context provider */}
    </>
  );
}
