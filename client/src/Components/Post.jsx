import React, { useEffect, useState, useContext } from "react";
import ComentsContext from "../myContext";

export default function Post({ name, img, handleCommentBox, commentActive }) {
  const [imgArray, setImgArray] = useState([]);
  const {setName} = useContext(ComentsContext)
  const handleClickForComment = (name) => {
    handleCommentBox();
  setName(name)

  };

  useEffect(() => {
    fetch(`/GetLikeButtons`)
      .then((res) => res.json())
      .then((data) => {
        let array = [];
        Object.keys(data).forEach((key) => {
          array.push(data[key]);
        });
        setImgArray(array);
        Object.keys(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Group the imgArray into sub-arrays of two items each
  const groupedImgArray = [];
  for (let i = 0; i < imgArray.length; i += 2) {
    groupedImgArray.push(imgArray.slice(i, i + 2));
  }

  return (
    <div className="post-container flex flex-col bg-black">
      <div className="containerPost flex flex-row w-full h-80 self-center">
        <div className="post bg-yellow-300 w-3/5 h-72 self-center text-black">
          {img}
        </div>
        <div className="description bg-black-700 w-2/5 text-white h-72 self-center">
          <div
            className="flex flex-row h-10"
            style={{ borderBottom: "0.2vh solid #3d3a3a" }}>
            <div
              className="bg-white mx-2 self-center w-7 h-7"
              style={{ borderRadius: "50%" }}></div>
            <div className="self-center">{name}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs indent-3 max-h-6">
              {
                "HI i am a sample discriptiohn it will be a great app and website though"
              }
            </div>
            <div className="flex flex-col gap-2 my-3">
              {groupedImgArray.map((group, groupIndex) => (
                <div
                  className="flex flex-row justify-center gap-2"
                  key={groupIndex}>
                  {group.map((imgUrl, index) => (
                    <div className="flex flex-row gap-2" key={index}>
                      <div
                        className="w-20 h-20 hover:border-2 border-slate-200 self-center"
                        style={{
                          borderRadius: "10px",
                          backgroundImage: `url(${imgUrl})`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}></div>
                      <div className="self-center text-gray-700 text-sm">
                        {"25%"}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className="text-white cursor-pointer text-sm mx-3 hover:text-blue-700"
              onClick={()=>handleClickForComment(name)}>
              See comments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
