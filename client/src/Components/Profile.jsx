import React, { useContext, useEffect, useState } from "react";
import ComentsContext from "../myContext";
import Loader from "./Loader";
export default function Profile() {
  const userName = useContext(ComentsContext);
  const {setCommentActive} = useContext(ComentsContext)
  setCommentActive(true)
  const [profile, setProfile] = useState({});
  const [followersCount, setFollowersCount] = useState(-1);
  const [followingCount, setFollowingCount] = useState(-1);
  const [len, setLen] = useState(0);
  const [loading , setLoading] = useState(true)


  const [profilePost, setProfilePost] = useState([]);

  useEffect(() => {
    fetch(`/search/${userName["userName"]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProfile(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  setInterval(() => {
    if (profile["posts"]) {
      setLen(profile["posts"].length);
      setFollowingCount(profile["following"].length);
      setFollowersCount(profile["followers"].length);
      setLoading(false)
      clearInterval();
    } else {
      setLen(-1);
      setFollowingCount(-1);
      setFollowingCount(-1);
    }
  }, 2000);
  useEffect(() => {
    fetch(`getProfilePosts/${userName["userName"]}`)
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
  useEffect(() => {
    setProfile(profile);
  }, [profile]);
  const handleDelete = (index) => {
    let id = profile["posts"][index];
    // console.log(id);

    fetch(`/deletePost/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    fetch(`/deleteFromFindUser/${userName["userName"]}/${index}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
     {loading?<Loader/>:<>
     <div className="z-20 containerProfile fixed left-10 w-screen h-screen bg-black text-white">
        <div
          className="bg-black fixed left-56 top-6 w-56 h-56"
          style={{
            borderRadius: "50%",
            backgroundImage: `url(${profile["imgUrl"]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}></div>
      </div>
      <div className="l first-letter:capitalize text-white fixed right-80 mx-24 text-5xl font-bold top-8 z-20">
        {profile["name"]}
      </div>
      <div className=" z-20 text-xl absolute right-96 mx-20 text-gray-400 top-24 flex flex-col gap-1">
        <div>{followingCount == -1 ? 0 : followingCount} following</div>
        <div>{followersCount == -1 ? 0 : followersCount} followers</div>
        <div>{len} posts</div>
      </div>
      <div
        className="z-20 w-9/12 h-40 fixed overflow-y-auto left-44 top-72"
        style={{
          borderTop: ".2vh solid #3d3a3a ",
        }}>
        {profilePost
          .map((post, index) => (
            <div
              key={index}
              className="bg-black   text-white"
              style={{
                borderBottom: "0.2vh solid #3d3a3a",
              }}>
              <div className="flex  flex-row h-fit">
                <div
                  className="bg-black self-center  w-20 h-14"
                  style={{
                    marginLeft: "1.5vh",
                    marginBottom: "2vh",
                    marginTop: "2vh",
                    backgroundImage: `url(${post["imgUrl"]})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}></div>
                <div className="mx-3   self-center">{post["caption"]}</div>
                <div className="self-center absolute right-8">
                  <i
                    class="fa-regular text-xl  fa-trash-can hover:text-2xl hover:text-red-600 transition-all duration-500"
                    id="d"
                    onClick={() => handleDelete(index)}></i>
                </div>
              </div>
            </div>
          ))}
      </div>
     </>}
    </>
  );
}
