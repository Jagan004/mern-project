import React, { useState } from "react"
import "./login.css"
import Axios from '../../../middelWare/axios'
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
function Login()
{
    const [user,setUser] = useState({
        name:"",
        password:""
    })
    const history = useHistory()
    function getHandeler(e)
    {
        let obj = {}
        obj[e.target.name] = e.target.value
        setUser({...user,...obj})
    }
    function submitHandeler()
    {
        Axios.post("user/login",user)
        .then((res)=>{
            if(res.status == 200)
            {
                history.push("/home")
                sessionStorage.setItem("userName",res.data.currentUser.name)
                sessionStorage.setItem("token",res.data.token)
            }
            
        })
        .catch((err)=>{
            if(err.response.data.message)
            {
                toast.error("Error", {
                    position: toast.POSITION.TOP_RIGHT
                });
                
            }
            else
            {
                toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            }
            
        })
    }
    return(
        <>
        <div className="login-main">
            <div>
            <h1>Login</h1>
        <p>username</p>
        <input type="text" name="name" onChange={getHandeler}/>
        <p>password</p>
        <input type="password" name="password" onChange={getHandeler}/><br></br>
        <button onClick={submitHandeler}>Login</button><br></br>
        <Link to="sign">sign in</Link>
            </div>
       
        </div>
        
        </>
    )
}

export default Login