import React, { useEffect, useState, useContext } from "react";
import ComentsContext from "../myContext";
import Post from "./Post";

export default function Scrollpage({
  active,
  handleCommentBox,
  commentActive,
}) {
  const [posts, setPosts] = useState([]);
  const { userName } = useContext(ComentsContext); // Moved useContext to the top
  const blurClass = "blur";

  useEffect(() => {
    if (userName) {
     
      fetch(`/GetAllPosts/${userName}`)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          setPosts(data); // Update state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userName]); // Add userName as a dependency to re-fetch posts when it changes

  return (
    <>
      <div
        className={`containerScrollPage w-48 h-screen overflow-y-auto bg-black text-white ${
          active === "Add Post" ? blurClass : ""
        }`}>
        <h3>Home</h3>
        <div className="l q text-white z-20 absolute right-10 flex flex-row gap-2 top-5 font-serif">
          𝐻𝑒𝓁𝓁𝑜 <div className="first-letter:capitalize">{userName}!!</div>
        </div>
        <i
          className="i a z-20 fa-solid fa-arrow-rotate-right absolute top-6 right-2 text-white"
          onClick={() => {
            window.location.reload();
          }}></i>
        {/* Map over posts array and render Post components */}
        <div className="d">
          {posts.slice().reverse().map((post) => (
            <Post
              key={post._id} // Add a key prop for each Post component
              handleCommentBox={handleCommentBox}
              commentActive={commentActive}
              name={post.accountName}
              date={post.date}
              caption={post.caption}
              img={post.imgUrl}
              id={post._id}
              likesCount={post.likes}
            />
          ))}
        </div>
      </div>
    </>
  );
}
