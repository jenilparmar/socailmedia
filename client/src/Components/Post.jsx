import React from 'react';

export default function Post({name,date,img}) {
  return (
    <div className="post-container flex flex-col bg-black"> 
      <div className="containerPost flex flex-row w-full h-80 self-center">
        <div className="post bg-yellow-300 w-3/5 h-72 self-center text-black">{img}</div>
        <div className="description bg-black-700 w-2/5 text-white h-72 self-center">{name} && {date}</div>
      </div>
    </div>
  );
}
