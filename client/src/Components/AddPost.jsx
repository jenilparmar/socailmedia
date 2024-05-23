import React from 'react';

export default function AddPost({ activeFunction }) {
  const handleClick = (navItem) => {
    return () => activeFunction(navItem);
  };

  return (
    <div className="containerAddPost z-10 flex flex-col items-center justify-center h-full p-4 bg-black">
      <i className="fa-solid fa-xmark text-white relative left-32 -top-6 cursor-pointer" onClick={handleClick("Home")}></i>
      <div className="mb-4 w-full max-w-sm self-center">
        <label className="block text-gray-500 text-sm font-bold mb-2 self-center" htmlFor="imageUpload">
          Upload Image/Video
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          id="imageUpload"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-yellow-400 hover:file:bg-yellow-400 hover:file:text-black transition-all duration-700" 
        />
      </div>
    </div>
  );
}
