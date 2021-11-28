import "./register.css"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import React from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
const server = "http://localhost:5000";

function Register() {
  const [registerModal, setregisterModal] = useState(true);
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const registerModalClose = () => setregisterModal(false);
  const registerModalCloseUpdate = () => {
    setregisterModal(false);

    const userDetails ={
      name: userName,
      email: email,
      password: password,
      password2: password2
    }

    axios.post('http://localhost:5000/api/users/register', userDetails).then(
      (res) => {
        console.log('new' + JSON.stringify(res));
      }
    ).catch(
      error => {
      console.error('There was an error!', error);
      }
    )
  }
    return (
        <div>
           <Modal show={registerModal} onHide={registerModalClose} backdrop="static" keyboard={false}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <div className="container">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={event => setuserName(event.target.value)} value={userName} placeholder="Enter name" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={event => setemail(event.target.value)} value={email} placeholder="Enter email"/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Class ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter classroom ID" />
                        <Form.Text className="text-muted">
                          Given by the College
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={event => setpassword(event.target.value)} value={password} placeholder="******************" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" onChange={event => setpassword2(event.target.value)} value={password2} placeholder="******************" />
                      </Form.Group>
                      </div>
              </Modal.Body>
                <Modal.Footer>
                    
                <NavLink className="nav-link btn btn-primary" onClick={registerModalClose} to="/login" exact style={{color:'white'}}>
                Login
              </NavLink>
                
              <NavLink className="nav-link btn btn-success" onClick={registerModalCloseUpdate} to="/login" exact style={{color:'white'}}>
                Register
              </NavLink>
              </Modal.Footer>
      </Modal>
        </div>
    )
}
export default Register;