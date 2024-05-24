  import React, { useEffect, useState } from 'react';
  import './App.css';
  import Navbar from './Components/Navbar';
  import Scrollpage from './Components/Scrollpage';
  import Inbox from './Components/Inbox';
  import SearchBox from './Components/SearchBox';
  import Notification from './Components/Notification';
  import Explorepage from './Components/Explorepage';
  import AddPost from './Components/AddPost';
import Profile from './Components/Profile';
import Commentbox from './Components/Commentbox';
  // React.useEffect(() => {
  //   fetch("/PostData")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  export default function App() {
   
    const [active, setActive] = useState('Home');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [commentActive , setCommentActive] = useState(false)
    const handleCommentBox=()=>{
        setCommentActive(!commentActive)
    }
    const handleDarkMode = (mode) => {
      setIsDarkMode(mode);
    };

    const handleClick = (navActive) => {
      setActive(navActive);
    };

    return (
      <>
        <div className={`container2 flex flex-row justify-between ${isDarkMode ? 'dark' : 'light'}`}>
          <Navbar activeFunction={handleClick} darkMode={handleDarkMode} isDarkMode={isDarkMode} />
          {active === 'Search' && <SearchBox isDarkMode={isDarkMode} />}
          {active === 'Notification' && <Notification isDarkMode={isDarkMode} />}
          {active === 'Explore' && active!=="Add Post" ? <Explorepage /> : <Scrollpage active={active} handleCommentBox={handleCommentBox} commentActive = {commentActive}/>}
          {active === 'Add Post' && active!=="Explore" ? <AddPost activeFunction={handleClick} /> : undefined}
         
          {active==="Profile" ? <Profile/>:undefined}
          {commentActive? <Inbox />:<Commentbox/>}
        </div>
      </>
    );
  }
