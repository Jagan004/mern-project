import React, { useState } from "react";
import "./sign.css"
import Axios from 'axios'
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignIn() {
    const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    const history = useHistory()
    function getHandeler(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        setUser({ ...user, ...obj })
    }
    function submitHandeler() {
        //    toast("login")
        console.log(user)
        Axios.post("http://localhost:5001/api/user/signin", user)
            .then((res) => {
                if (res.statusText) {
                    toast.success("User created", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    history.push("/")
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                  });
                // alert(err.response.data.message)
            })
    }
    return (
        <>
            <div className="sign-main">
                <div>

                    <h1>Sign In</h1>
                    <p>username</p>
                    <input type="text" name="name" onChange={getHandeler} />
                    <p>email</p>
                    <input type="text" name="email" onChange={getHandeler} />
                    <p>phone</p>
                    <input type="text" name="phone" onChange={getHandeler} />
                    <p>password</p>
                    <input type="password" name="password" onChange={getHandeler} /><br></br>
                    <button onClick={submitHandeler}>Login</button>
                </div>

            </div>
        </>
    )
}

export default SignIn