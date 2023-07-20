import React, { useState, useEffect } from "react";
import Axios from '../../../middelWare/axios'
import "./displayProduct.css"
import NavScrollExample from "../../navBar/navBar";
function DisplayProduct() {
    const [pic, setPic] = useState([])
    useEffect(() => {
        Axios.get('images')
            .then((res) => {
                setPic(res.data.images)
                console.log(res.data.images)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <>
            <NavScrollExample />

            {

                pic.length != 0
                 ? 
                 <div className="display-main">
               {  pic.map((val) => {
                    return (
                        <>
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={`http://localhost:5001/${val}`} className="card-img-top" height={300}/>
                                <div className="card-body">
                                    <h5 className="card-title text-center">Products</h5>
                                </div>
                            </div>

                        </>
                    )
                }) }
                </div>
                : <h1>No pics Available to show</h1>
            }
        </>
    )
}

export default DisplayProduct