import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Axios from '../../middelWare/axios'
import './home.css'
function Home()
{
    const [selectedFile, setSelectedFile] = useState(null)
    const [image,setImage] = useState(null)
    const [pic,setPic] = useState([])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    Axios
      .post('/upload', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data.imageUrl);
        setImage(response.data.imageUrl)
      })
      .catch((error) => {
        console.error(error); // Handle error response
      });
  };

  useEffect(()=>{
    Axios.get('images')
    .then((res)=>{
        setPic(res.data.images)
        console.log(res.data.images)
    })
    .catch((err)=>{
        console.log(err);
    })
  },[image])

    const history = useHistory()
    function logoutHandeler()
    {
        sessionStorage.removeItem("userName")
        sessionStorage.removeItem("token")
        history.push("/")
    }

    useEffect(()=>{
        Axios.get("contact")
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.error("Error:", err.response);
        })
    },[])

    return(
        <>
        <h1>Welcome {sessionStorage.getItem("userName")}</h1>
        <button onClick={logoutHandeler}>Logout</button>
        <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button><br></br>
      {
        pic.map((val)=>{
            return (
            <>
            <img src={`http://localhost:5001/${val}`} height={50} width={50}/>
            </>
            )
        })
      }
        </>
    )
}

export default Home