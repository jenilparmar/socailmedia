import React, { useEffect, useState } from "react";

export default function ProfileVisit({ person }) {
  // State to store the person's posts (as an array)
  const [postArray, setPostArray] = useState([]);
  const [profilePost,setProfilePost] = useState([])
  // Fetches posts on component mount (empty dependency array [])
  useEffect(() => {
    setPostArray(Object.values(person["posts"])); // Assuming "post" is an object
  }, []);
  useEffect(()=>{
    fetch(`getProfilePosts/${person.accountName}`)
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      console.log(data);
      setProfilePost(data)

    })
    .catch(e=>{
      console.log(e);
    })
  },[])

  // Renders profile information and posts
  return (
    <>
    <div className="overlay3"></div>
      <div className="absolute left-80 top-0 bg-black w-screen h-screen  flex flex-col" style={{
             

      }}>
        {/* Profile header */}
        <div className="relative left-44 top-20 -my-4 mx-4 text-white">
          @{person.accountName}
        </div>
        <div className="flex relative left-20 top-16 flex-row">
          <div className="bg-white w-20 h-20 rounded-full mx-2"></div>
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
       <div className="w-14 h-6 relative left-48 top-4 bg-blue-600 rounded-md flex justify-center hover:bg-blue-700">
       <div className=" text-white self-center text-sm p-4 text-center ">Follow</div>

       </div>
    
        {/* Post list */}
        <div className="flex flex-col overflow-auto w-96 relative top-20 left-20" >
          {profilePost.map((post, index) => (
            <div key={index} className="bg-black text-white"style={{
              borderBottom:"0.2vh solid #3d3a3a",
            }}>
             <div className="flex flex-row h-fit">
              <div className="bg-black self-center  w-20 h-14" style={{
                marginLeft:'1.5vh',
                marginBottom:'2vh',
                marginTop:'2vh',
                backgroundImage:`url(${post['imgUrl']})`,
                backgroundSize:'contain',
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}></div>
              <div className="mx-3   self-center">{post['caption']}</div>
             </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
