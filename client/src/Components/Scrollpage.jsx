import React, { useState, useEffect } from "react";
import Post from "./Post";

export default function Scrollpage({ isDarkMode, active,handleCommentBox,commentActive }) {
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
        console.log(data);
      // console.log(data["comment"]);
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
        <i className="z-20 fa-solid fa-arrow-rotate-right absolute top-6 right-2 text-white"></i>
        {/* Map over posts array and render Post components */}
        {posts.map((post) => ( 
          <Post handleCommentBox={handleCommentBox} commenterID={post["_id"]} comment={post["comment"]} commentActive = {commentActive} name={post.accountName} date={post.date} img = {post["post"]}/> // Assuming "accountName" is the correct property
        ))}
      </div>
    </>
  );
}
