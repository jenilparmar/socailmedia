import React, { useEffect, useState } from "react";

export default function Commentbox({
  handleCommentBox,
  setViewComments,
  viewComments,
}) {
  const [comments, setComments] = useState([]);

  const handleSetComments = (array) => {
    setComments(array);
  };

  const handleClickForComment = () => {
    handleCommentBox();
  };

  useEffect(() => {
    if (viewComments != null) {
      const array = Object.values(viewComments["comment"]);
      handleSetComments(array);
    }
  }, [viewComments]);

  return (
    <div className="flex flex-col absolute w-80 mx-2 overflow-auto h-screen right-0">
      <h3 className="-mx-0 my-0 bg-black text-white z-20 fixed w-full">
        Comments
      </h3>
      <i
        className="fa-solid fa-xmark text-white absolute right-5 top-2 z-20 cursor-pointer"
        onClick={handleClickForComment}
      ></i>

      {/* Render comments dynamically */}
      {comments.map((elem, index) => (
        <div key={index} className="whitespace-normal text-red-500 bg-black max-w-80 h-fit my-2 text-xs">
          {elem['commentText']}
        </div>
      ))}

      <div className="comm"></div>
      <div className="flex flex-row justify-center -mx-8 fixed right-56 z-30">
        <input
          type="text"
          placeholder="comment"
          className="text bg-black border-color-white fixed rounded-md w-56 focus:text-white visited:text-white target:text-white border-0 bottom-3"
          style={{
            borderBottom: "2px #3d3a3a solid",
          }}
        />
        <button
          className="w-8 h-8 fixed right-5 bottom-3 hover:bg-blue-700 text-black border-color-blue-700"
          style={{
            borderRadius: "50%",
            border: "2px solid #3d3a3a",
          }}
        >
          <i className="fa-solid text-white hover:text-white fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}
