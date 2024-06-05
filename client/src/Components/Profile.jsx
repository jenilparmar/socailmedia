import React, { useContext, useEffect, useState } from "react";
import ComentsContext from "../myContext";
import Loader from "./Loader";

export default function Profile() {
  const userName = useContext(ComentsContext);
  const { setCommentActive } = useContext(ComentsContext);
  setCommentActive(true);
  const [profile, setProfile] = useState({});
  const [followersCount, setFollowersCount] = useState(-1);
  const [followingCount, setFollowingCount] = useState(-1);
  const [len, setLen] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profilePost, setProfilePost] = useState([]);

  useEffect(() => {
    fetch(`/search/${userName["userName"]}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (profile["posts"]) {
      setLen(profile["posts"].length);
      setFollowingCount(profile["following"].length);
      setFollowersCount(profile["followers"].length);
     
      setLoading(false);
    } else {
      setLen(-1);
      setFollowingCount(-1);
      setFollowingCount(-1);
    }
  }, [profile]);

  useEffect(() => {
    fetch(`/getProfilePosts/${userName["userName"]}`)
      .then((res) => res.json())
      .then((data) => {
        setProfilePost(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userName]);

  const handleDelete = (index) => {
    const id = profile["posts"][index];

    fetch(`/deletePost/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // After deleting, update the profilePost state
        setProfilePost(profilePost.filter((_, i) => i !== index));
      })
      .catch((e) => {
        console.log(e);
      });

    fetch(`/deleteFromFindUser/${userName["userName"]}/${index}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="z-20 containerProfile fixed left-10 w-screen h-screen bg-black text-white">
            <div
              className="G bg-black fixed left-56 top-6 w-56 h-56"
              style={{
                borderRadius: "50%",
                backgroundImage: `url(${ profile["imgUrl"]!=null ?profile['imgUrl'] :"https://cdn2.vectorstock.com/i/1000x1000/11/41/male-profile-picture-vector-2051141.jpg"})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <div className="LS text-white B first-letter:capitalize  mx-24 text-5xl font-bold z-20">
            {profile["name"]}
          </div>
          <div className="W z-20 text-xl absolute right-64 mx-20 text-gray-400 top-28 flex flex-row gap-3">
            <div className="w-fit text-center">{followingCount == -1 ? 0 : followingCount} <br /> following</div>
            <div className="w-fit text-center">{followersCount == -1 ? 0 : followersCount} <br /> followers</div>
            <div className="w-fit text-center">{len} <br /> posts</div>
          </div>
          <div
            className="A z-20 w-9/12 h-40 fixed overflow-y-auto left-44 top-72"
            style={{
              borderTop: ".2vh solid #3d3a3a ",
            }}
          >
            {profilePost.map((post, index) => (
              <div
                key={index}
                className="Y bg-black text-white"
                style={{
                  borderBottom: "0.2vh solid #3d3a3a",
                }}
              >
                <div className="AB flex  flex-row h-fit">
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
                    }}
                  ></div>
                  <div className="mx-3   self-center">{post["caption"]}</div>
                  <div className="DA self-center absolute right-8">
                    <i
                      className="fa-regular text-xl  fa-trash-can hover:text-2xl hover:text-red-600 transition-all duration-500"
                      id="d"
                      onClick={() => handleDelete(index)}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
