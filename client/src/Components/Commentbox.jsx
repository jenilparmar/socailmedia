import React from "react";

export default function Commentbox({handleCommentBox}) {
    const handleClickForComment=()=>{
        handleCommentBox();
    }
  return (
    <div className="flex flex-col  absolute w-80 mx-2  overflow-auto h-screen right-0">
      <h3 className="-mx-0 my-0 bg-black text-white z-20 fixed w-full">
        Comments
      </h3> 
      <i className="fa-solid fa-xmark text-white absolute right-5 top-2 z-20 cursor-pointer" onClick={handleClickForComment}></i>

      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs">
      this is so dark 🤷‍♂️ comment i it is very big comment so i ma making the foldable comment that i want t a big comment ot see that it works or not 
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs">
      this is so dark 🤷‍♂️ comment i it is very big comment so i ma making the foldable comment that i want t a big comment ot see that it works or not 
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="whitespace-normal bg-purple-500 max-w-80 h-fit my-2 text-xs ">
        hi
      </div>
      <div className="comm"></div>
      <div className="flex flex-row justify-center -mx-8 fixed right-56 z-30" ><input type="text" placeholder="comment" className="text bg-black border-color-white  fixed   rounded-md w-56 focus:text-white visited:text-white  target:text-white border-0  bottom-3" style={{
        borderBottom:"2px #3d3a3a solid",
      
      }}/>
      <button className="w-8 h-8 fixed right-5 bottom-3 hover:bg-blue-700 text-black border-color-blue-700" style={{
        borderRadius:"50%",
        border:"2px solid #3d3a3a"
      }}><i class="fa-solid text-white hover:text-white  fa-arrow-up"></i></button></div>
    </div>
  );
}
