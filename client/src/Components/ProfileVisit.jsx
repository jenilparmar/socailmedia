import React, { useEffect, useState } from "react";

export default function ProfileVisit({ person }) {
  // State to store the person's posts (as an array)
  const [postArray, setPostArray] = useState([]);

  // Fetches posts on component mount (empty dependency array [])
  useEffect(() => {
    setPostArray(Object.values(person["post"])); // Assuming "post" is an object
  }, []);

  // Renders profile information and posts
  return (
    <>
      <div className="absolute left-80 top-0 bg-red-800 w-screen h-screen flex flex-col">
        {/* Profile header */}
        <div className="relative left-44 top-20 -my-4 text-white">
          @{person.accountName}
        </div>
        <div className="flex relative left-20 top-16 flex-row">
          <div className="bg-black w-20 h-20 rounded-full"></div>
          <div className="text-gray-600 text-sm w-fit h-4 self-center mx-4">
            {person["following"]} following
          </div>
          <div className="text-gray-600 text-sm w-fit h-4 self-center mx-4">
            {person["followers"]} followers
          </div>
          <div className="text-gray-600 text-sm w-fit h-4 self-center mx-4">
            {postArray.length} posts
          </div>
        </div>
        <div className="text-center w-96 left-20 relative text-white top-24 border-b border-t border-gray-700">
          Posts
        </div>

        {/* Post list */}
        <div className="flex flex-col overflow-auto w-96 relative top-24 left-20" >
          {postArray.map((post, index) => (
            <div key={index} className="bg-black text-white"style={{
              borderBottom:"0.2vh solid #3d3a3a"
            }}>
             {post}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
