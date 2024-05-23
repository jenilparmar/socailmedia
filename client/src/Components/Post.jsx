import React from 'react';

export default function Post() {
  return (
    <div className="post-container flex flex-col bg-black"> 
      <div className="containerPost flex flex-row w-full h-80 self-center">
        <div className="post bg-yellow-300 w-3/5 h-72 self-center"></div>
        <div className="description bg-blue-700 w-2/5 h-72 self-center"></div>
      </div>
    </div>
  );
}
