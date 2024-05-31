import React, { useEffect, useState, useContext } from "react";
import ComentsContext from "../myContext";

export default function Post({
  name,
  img,
  handleCommentBox,
  id,
  commentActive,
  likesCount,
  caption,
}) {
  const [imgArray, setImgArray] = useState([]);
  const { setName } = useContext(ComentsContext);
  const { setID } = useContext(ComentsContext);
  const [LIKECOUNT, SETLIKECOUNT] = useState(likesCount);
  const handleClickForComment = (name) => {
    handleCommentBox();
    setName(name);
    setID(id);
  };
  let total = 0;
  let a = Object.values(LIKECOUNT);
  a.forEach((e) => {
    total += e;
  });
  // console.log(likesCount);

  const handleLiking = (id, groupIndex, index) => {
    total = 0;
    let a = Object.values(LIKECOUNT);
    a.forEach((e) => {
      total += e;
    });
    let parameter = "";
    if (groupIndex === 0 && index === 0) parameter = "p1";
    else if (groupIndex === 0 && index === 1) parameter = "p2";
    else if (groupIndex === 1 && index === 0) parameter = "p3";
    else if (groupIndex === 1 && index === 1) parameter = "p4";

    fetch(`/AddLike/${id}/${parameter}`)
      .then((data) => {
        SETLIKECOUNT((prevLikesCount) => {
          const updatedLikesCount = { ...prevLikesCount };
          updatedLikesCount[parameter] += 1;
          return updatedLikesCount;
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const groupedImgArray = [];
  for (let i = 0; i < imgArray.length; i += 2) {
    groupedImgArray.push(imgArray.slice(i, i + 2));
  }

  return (
    <div className="post-container flex flex-col bg-black">
      <div className="containerPost flex flex-row w-full h-80 self-center">
        <div
          className="post bg-black w-3/5 h-72 self-center text-black"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "0.2vh solid #3d3a3a",
          }}></div>
        <div className="description bg-black-700 w-2/5 text-white h-72 self-center">
          <div
            className="flex flex-row h-10"
            style={{
              borderBottom: "0.2vh solid #3d3a3a",
              borderTop: "0.2vh solid #3d3a3a ",
            }}>
            <div
              className="bg-white mx-2 self-center w-7 h-7"
              style={{ borderRadius: "50%" }}></div>
            <div className="self-center" style={{}}>
              {name}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs overflow-y-auto indent-3 max-h-12">{caption}</div>
            <div className="flex flex-col gap-2 ">
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
                        }}
                        onClick={() =>
                          handleLiking(id, groupIndex, index)
                        }></div>
                      <div className="self-center text-gray-400 text-xs">
                        {`${(
                          (LIKECOUNT[`p${groupIndex * 2 + index + 1}`] /
                            total) *
                          100
                        ).toFixed(0)}%`}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className="text-white cursor-pointer text-sm mx-3 hover:text-blue-700"
              onClick={() => handleClickForComment(name)}>
              See comments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
