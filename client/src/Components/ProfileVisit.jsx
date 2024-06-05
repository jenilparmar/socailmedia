import React, { useContext, useEffect, useState } from "react";
import ComentsContext from "../myContext";

export default function ProfileVisit({ person, info }) {
  // State to store the person's posts (as an array)
  const [postArray, setPostArray] = useState([]);
  const [profilePost, setProfilePost] = useState([]);
  const [followingCount, setFollowingCount] = useState(-1);
  const [followersCount, setFollowersCount] = useState(-1);
  const [flag, setFlag] = useState(false);
  const [image, setImage] = useState("");

  // Fetches posts on component mount (empty dependency array [])
  useEffect(() => {
    setPostArray(info["posts"]); // Assuming "post" is an object
  }, []);
  useEffect(() => {
    fetch(`/getProfilePosts/${person}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setProfilePost(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  setInterval(() => {
    // console.log(info["following"]);
    if (info["following"] != []) {
      setFollowingCount(info["following"].length);
      clearInterval();
    } else {
      setFollowingCount(0);
    }
  }, 1000);
  setInterval(() => {
    if (info["followers"]) {
      setFollowersCount(info["followers"].length);
      clearInterval();
    } else {
      setFollowingCount(0);
    }
  }, 1000);

  const { userName } = useContext(ComentsContext);
  useEffect(() => {
    fetch(`/checkIsFollowing/${person}/${userName}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFlag(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  function addToFollow() {
    fetch(`/addFollowing/${person}/${userName}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });

    fetch(`/addFollower/${userName}/${person}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setFlag(true);
  }
  // Renders profile information and posts
  useEffect(() => {
    fetch(`/findUser/${person}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setImage(data["imgUrl"]);
        // console.log(image);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className="overlay3">
      <div
        className="Q  bg-black w-screen h-screen  flex flex-col"
        style={{}}>
        {/* Profile header */}
        <div className="AC relative left-44 top-20 -my-4 mx-4 text-white">
          @{person}
        </div>
        <div
            className="AE w-20 h-20 rounded-full mx-2"
            style={{
              backgroundImage: `url(${
                image !== ""
                ? image
                  : "https://cdn2.vectorstock.com/i/1000x1000/11/41/male-profile-picture-vector-2051141.jpg"
              })`,
              backgroundColor:"red",
              backgroundSize:"cover",
              backgroundPosition:"center",
              backgroundRepeat:"no-repeat"
            }}></div>
        <div className="AD flex relative left-20 top-16 flex-row">
        
          <div className="text-gray-600 text-sm w-fit h-4 text-center self-center mx-4">
            {followingCount} <br />following
          </div>
          <div className="text-gray-600 text-sm w-fit h-4  text-center self-center mx-4">
            {followersCount} <br />followers
          </div>
          <div className="text-gray-600 text-sm w-fit h-4 text-center self-center mx-4">
            {postArray.length} <br /> posts
          </div>
        </div>
        <div className="AG text-center w-96 left-20 relative text-white top-24 border-b  border-gray-700">
          Posts
        </div>
        {!flag ? (
          <div
            className="AF z-50 w-14 h-6 relative left-48 top-4 bg-blue-600 rounded-md flex justify-center cursor-pointer hover:bg-red-700"
            onClick={addToFollow}>
            <div className="z-50 text-white  self-center text-sm p-4 text-center ">
              Follow
            </div>
          </div>
        ) : (
          <div className="AF z-50 w-14 h-6 cursor-pointer relative left-48 top-4  rounded-md flex justify-center ">
            <div className="z-50 text-white self-center text-sm p-4 text-center ">
              Following
            </div>
          </div>
        )}

        {/* Post list */}
        <div className="AH flex flex-col overflow-auto w-96 relative top-20 left-20">
          {profilePost
            .slice()
            .reverse()
            .map((post, index) => (
              <div
                key={index}
                className="bg-black text-white"
                style={{
                  borderBottom: "0.2vh solid #3d3a3a",
                }}>
                <div className="flex flex-row h-fit">
                  <div
                    className="AI bg-black self-center  w-20 h-14"
                    style={{
                      marginLeft: "1.5vh",
                      marginBottom: "2vh",
                      marginTop: "2vh",
                      backgroundImage: `url(${post["imgUrl"]})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}></div>
                  <div className="mx-3  AJ self-center">{post["caption"]}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      </div>
    </>
  );
}
