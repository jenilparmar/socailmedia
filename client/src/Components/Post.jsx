import React, { useEffect, useState } from "react";

export default function Post({ name, date, img ,handleCommentBox,commentActive}) {
  const [imgArray, setImgArray] = useState([]);
  const handleClickForComment=()=>{
    handleClickForComment()
  }
  useEffect(() => {
    fetch('/GetLikeButtons')
      .then((res) => {
        return res.json()
      }).then((data) => {
        // console.log(data);
        let array = [];
        Object.keys(data).forEach((key) => {
          array.push(data[key]); // Push the values, not the keys
        })
        setImgArray(array);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div className="post-container flex flex-col bg-black">
      <div className="containerPost flex flex-row w-full h-80 self-center">
        <div className="post bg-yellow-300 w-3/5 h-72 self-center text-black">
          {img}
        </div>
        <div className="description bg-black-700 w-2/5 text-white h-72 self-center">
          <div className="flex flex-row h-10" style={{ borderBottom: "0.2vh solid #3d3a3a" }}>
            <div className="bg-white mx-2 self-center w-7 h-7" style={{ borderRadius: "50%" }}></div>
            <div className="self-center">{name}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs indent-3 max-h-6">{"HI i am a sample discriptiohn it will be a great app and website though"}</div>
            <div className="flex flex-row justify-center gap-2 my-3 ">
              {/* Mapping through imgArray to render divs */}
              {imgArray.map((imgUrl, index) => (
                <div key={index} className="w-12 h-10  hover:border-2 border-slate-200   self-center" style={{
                  borderRadius: "10px",
                  backgroundImage: `url(${imgUrl})`, // Corrected formatting of backgroundImage URL
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat:"no-repeat"
                }}></div>
              ))}
            </div>
            <div className="text-white" onClick={handleClickForComment}>See comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
