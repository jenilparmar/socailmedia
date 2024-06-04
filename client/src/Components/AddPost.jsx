import React, { useContext, useState } from "react";
import ComentsContext from "../myContext";

export default function AddPost({ activeFunction }) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [filePreview, setFilePreview] = useState(null); // State to store the file preview
  const [caption, setCaption] = useState(""); // State to store the caption

  const handleClick = (navItem) => {
    return () => activeFunction(navItem);
  };
const useName = useContext(ComentsContext)
  const handleUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // After reading the file, set the file preview to the result (data URL)
        setFilePreview(reader.result);

        setIsUploaded(true); // Set isUploaded to true
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value); // Update the caption state when input changes
  };

  const handlePost = () => {
    fetch("/Posts", {
      method: "POST",
      body: JSON.stringify({
        accountName: useName['userName'],
        imgUrl: filePreview,
        likes: {
          p1: 0,
          p2: 0,
          p3: 0,
          p4: 0,
        },
        caption: caption,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => {
        console.log(data);
        handleClick('Home')();
        window.location.reload(true)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="containerAddPost z-10 flex flex-col items-center justify-center h-screen p-4 bg-black">
      <i
        className="P fa-solid fa-xmark text-white absolute right-4 top-4 cursor-pointer"
        onClick={handleClick("Home")}></i>
      <div
        className=" w-80 h-60  self-center"
        style={{
          height: "70vh",
        }}>
        {!isUploaded && (
          <>
            <label
              className="K block text-gray-500 text-sm font-bold relative left-2 top-16 mb-2 self-center"
              htmlFor="imageUpload">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={handleUpload}
              className="block w-full text-sm relative top-20 -left-2 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-yellow-400 hover:file:bg-yellow-400 hover:file:text-black transition-all duration-700"
              style={{
                marginLeft:"1.2em"
              }}
            />
          </>
        )}
      </div>
      {/* Show file preview if an image or video is uploaded */}
      {isUploaded && (
        <div className="mt-4">
          {/* Display image preview */}
          {filePreview && filePreview.startsWith("data:image") && (
            <img
              src={filePreview}
              alt="Uploaded Preview"
              className="J w-40  max-h-28 rounded-lg"
            />
          )}
          {/* Display video preview */}
         
        </div>
      )}
      {/* Caption input field */}
      {isUploaded && (
        <div className="mt-4 w-full max-w-md self-center">
          <label
            className="block text-gray-500 text-sm font-bold mb-2 self-center"
            htmlFor="captionInput">
            Caption
          </label>
          <input
            type="text"
            id="captionInput"
            value={caption}
            onChange={handleCaptionChange}
            className="block w-full text-sm py-2 mx-2 px-4 rounded-full border-0 bg-black text-yellow-400 focus:outline-none  focus:text-white transition-border duration-700"
            style={{
              borderBottom: "0.2vh solid #3d3a3a",
            }}
          />
        </div>
      )}
      {/* Post button */}
      {isUploaded && (
        <button
          onClick={() => {
            handlePost();
            // handleClick('Home');
            // console.log("home");
          }}
          //  onClick={()=>{ handleClick('Home')}
          // }
          className="bg-yellow-400 text-black px-4 py-2 rounded-md mt-4 hover:bg-yellow-500 transition-all duration-300">
          Post
        </button>
      )}
    </div>
  );
}
