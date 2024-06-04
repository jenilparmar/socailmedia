import React, { useEffect, useState, useContext } from "react";
import ComentsContext from "../myContext";

export default function Commentbox() {
  const { name, setCommentActive } = useContext(ComentsContext);
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const handleClickForComment = () => {
    setCommentActive(true);
  };
  const handleSendComment = () => {
    fetch(`/PostComment/${id["id"]}/${commentText}`)
      .then((data) => {
        // console.log(data);       
          let i = document.getElementById('input')// Clear the input field after 
          i.value = ""
          setComment((prevComments) => [...prevComments, commentText]);
          // console.log("I have come fomr sendcom");
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };
  

  const id = useContext(ComentsContext);

  useEffect(() => {
    // console.log(id['id']);
    fetch(`/PostData/${id['id']}`)
    
      .then((res) => res.json())
      .then((data) => {
        if (data && data.comments) {
          
          setComment(Object.values(data.comments));
        
        }
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [name]);

  return (
    <div className="flex flex-col absolute w-80 mx-2 overflow-auto h-screen right-0">
      <h3 className="M -mx-0 my-0 bg-black text-white z-30 fixed w-full">
        Comments
      </h3>
      <i
        className="N fa-solid fa-xmark text-white fixed right-5 top-2 z-30 cursor-pointer"
        onClick={handleClickForComment}></i>
      <div className="over2"></div>
      <div className="comm text-white text-wrap bg-black flex flex-col z-20 mt-10">
        {comment
          .slice()
          .reverse()
          .map((e, index) => (
            <div className="O text-white z-20 h-fit text-sm hover:bg-gray-900 indent-4 hover:opacity-95" key={index}>
              {index+1} : {e}
            </div>
          ))}
      </div>
          <div className="over z-30"></div>
      <div className="flex flex-row justify-center gap-3 -mx-8  fixed right-16 z-40 bottom-3">
        <input
          type="text"
          placeholder="comment"
          id="input"
          className="text bg-black text-white border-color-white rounded-md w-56 focus:text-white visited:text-white target:text-white border-0"
          style={{
            borderBottom: "2px #3d3a3a solid",
          }}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        />
        <button
          className="w-8 h-8 hover:bg-blue-700 text-black border-color-blue-700"
          style={{
            borderRadius: "50%",
            border: "2px solid #3d3a3a",
          }}
          onClick={handleSendComment}>
          <i
            className="fa-solid text-white hover:text-white fa-arrow-up"
           ></i>
        </button>
      </div>
    </div>
  );
}
