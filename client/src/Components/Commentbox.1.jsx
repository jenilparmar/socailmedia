import React, { useEffect, useState, useContext } from "react";
import ComentsContext from "../myContext";

export default function Commentbox() {
  const { name, setCommentActive } = useContext(ComentsContext);
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const handleClickForComment = () => {
    setCommentActive(true);
  };
  const handleComment = () => {
    fetch(`/PostComment/${commentText}/${name}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => alert(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetch(`/PostData/${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.commets) {
          setComment(Object.values(data.commets));
        }
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [name]);

  return (
    <div className="flex flex-col absolute w-80 mx-2 overflow-auto h-screen right-0">
      <h3 className="-mx-0 my-0 bg-black text-white z-20 fixed w-full">
        Comments
      </h3>
      <i
        className="fa-solid fa-xmark text-white absolute right-5 top-2 z-20 cursor-pointer"
        onClick={handleClickForComment}></i>

      <div className="comm text-white flex flex-col z-20 mt-10">
        {comment.map((e, index) => (
          <div className="text-red-500 z-20" key={index}>
            {e}
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-center gap-3 -mx-8 fixed right-16 z-30 bottom-3">
        <input
          type="text"
          placeholder="comment"
          className="text bg-black border-color-white rounded-md w-56 focus:text-white visited:text-white target:text-white border-0"
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
          onClick={handleComment}>
          <i className="fa-solid text-white hover:text-white fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}
