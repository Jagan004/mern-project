import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./navBar.css"
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from '../../middelWare/axios'
import uploadImg from "../../assets/pngegg (7).png"

function NavScrollExample() {
    const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [selectedFile, setSelectedFile] = useState(null)
const [image,setImage] = useState(null)



const handleFileChange = (event) => {
setSelectedFile(event.target.files[0]);
const formData = new FormData();
formData.append('image', event.target.files[0]);

Axios
  .post('/upload', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response) => {
    console.log(response);
    setImage(response.data.imageUrl)
    if(response.status == 200)
    {
        handleClose()
      toast('image uploaded successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  })
  .catch((err) => {
    console.error(err);
    err.response.data.error ? toast.error(err.response.data.error, {
        position: toast.POSITION.TOP_RIGHT
      }) : toast.error("Something Went wrong", {
        position: toast.POSITION.TOP_RIGHT
      });
  });
};
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary navbar-main " >
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link><Link to="/home">Home</Link></Nav.Link>
            <Nav.Link ><Link to="/displayProduct">View Products</Link></Nav.Link>
            <Nav.Link onClick={handleShow}>Add Products</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <div className="app">
          <div className="parent">
            <div className="file-upload">
              <img src={uploadImg} alt="upload" height={130} width={130} />
              <h3>Click box to upload</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={handleFileChange}/>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default NavScrollExample;