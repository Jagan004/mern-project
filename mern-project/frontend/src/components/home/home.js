import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Axios from '../../middelWare/axios'
import './home.css'
import NavScrollExample from "../navBar/navBar";
import DisplayProduct from "../Products/displayProduct/displayProduct";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home()
{
 

  

    const history = useHistory()
    function logoutHandeler()
    {
        sessionStorage.removeItem("userName")
        sessionStorage.removeItem("token")
        history.push("/")
    }

    // useEffect(()=>{
    //     Axios.get("contact")
    //     .then((res)=>{
    //         console.log(res);
    //     })
    //     .catch((err)=>{
    //         console.error("Error:", err.response);
    //     })
    // },[])

   

    return(
        <>
        <NavScrollExample/>
        <h1 className="text-center">Welcome {sessionStorage.getItem("userName")}</h1>
        <button onClick={logoutHandeler}>Logout</button>
        
      
        </>
    )
}

export default Home