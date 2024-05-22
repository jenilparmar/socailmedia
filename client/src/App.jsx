import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Scrollpage from "./Components/Scrollpage";
import Inbox from "./Components/Inbox";

export default function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message[3]))
  //     .catch((error) => {
  //       console.error('There was a problem with your fetch operation:', error);
  //     });
  // }, []);

  return (
    <>
      {/* 
          Navbar
          Scroll page 
          inbox
      */}
     <div className="container2 flex flex-row justify-between">
     <Navbar/>
     <Scrollpage/>
      <Inbox/>
     </div>
    </>
  );
}
