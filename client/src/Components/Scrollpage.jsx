import React, { useState, useEffect } from "react";
import Post from "./Post";

export default function Scrollpage({ isDarkMode, active }) {
  const [posts, setPosts] = useState([]);
  const blurClass = "blur";

  useEffect(() => {
    fetch("/PostData")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      <div className={`containerScrollPage w-48 h-screen overflow-y-auto bg-black text-white ${active === "Add Post" ? blurClass : undefined}`}>
        <h3>Home</h3>
        {/* Map over posts array and render Post components */}
        {posts.map((post) => ( 
          <Post  name={post.accountName} date={post.date} img = {post["post"]}/> // Assuming "accountName" is the correct property
        ))}
      </div>
    </>
  );
}
