import React, { useContext, useState } from "react";
import ComentsContext from "../myContext";

export default function SignIn(setAuthenticated) {
  const [profilePhoto, setProfilePhoto] = useState(null);
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const ul = "https://cdn2.vectorstock.com/i/1000x1000/11/41/male-profile-picture-vector-2051141.jpg";

  const handlePhotoClick = () => {
    document.getElementById("profilePhotoInput").click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setFilePreview(reader.resu/lt);
        setProfilePhoto(e.target.result);
         // Logging the file preview
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value

    });
  };
const {setUserName} = useContext(ComentsContext)

  const handleSubmit = () => {
  const { email, password, name } = formData;

  // Create an object with the form data
  const requestData = {
    email: email,
    password: password,
    name: name,
    imgUrl: profilePhoto,
    following:[],
    followers:[],
    posts:[],
    visitedPosts:[]
  };

  fetch(`/Dataentry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Assuming your server responds with some data
    return response.json();
  })
  .then(data => {
    // Do something with the response data if needed
    console.log(data);
    // Fetch user or perform other actions as needed
    fetch(`/findUser/${name}`)
      .then(data => {
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
    setAuthenticated(true);
    setUserName(name);
  })
  .catch(error => {
    console.error('Error submitting form data:', error);
  });
};

  
  return (
    <center style={{ backgroundColor:"#1c1c1c"}}>
      <div className="AL w-11/12 h-screen flex flex-row  justify-between gap-12" style={{
        backgroundColor:"#1c1c1c"
      }}>
        <div className="AM w-40 h-screen flex flex-col justify-center p-6 mx-20">
          <div
            className="border-2 border-yellow-500 w-56 h-56 mb-6 flex items-center justify-center cursor-pointer"
            style={{
              borderRadius: "50%",
              backgroundImage: profilePhoto ? `url(${profilePhoto})` :`url(${ul})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={handlePhotoClick}
          >
            {!profilePhoto && <span className="text-white"></span>}
          </div>
          <input
            type="file"
            id="profilePhotoInput"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
            accept="image/*"
          />
          <div className="bg-transperent text-yellow-500 -my-3 font-bold text-2xl w-56 h-fit">Add Profile Photo</div>
        </div>
        <div className="AN bg-black border-2 border-gray-700 rounded-lg shadow-md w-96 self-center max-w-md p-6 mx-20">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500 text-center">
            Sign-in
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="email"
                className="block text-yellow-500 text-left font-medium"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1  block w-full px-4 py-2 bg-black border focus:text-white text-white border-gray-300 text-left rounded-md focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-yellow-500 text-left font-medium"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block  w-full px-4 py-2 bg-black border focus:text-white text-white border-gray-300 text-left rounded-md focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-yellow-500 text-left font-medium"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full  px-4 py-2 bg-black border focus:text-white text-white border-gray-300 text-left rounded-md focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          
            <div className="text-center my-5 relative top-8">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </center>
  );
}
