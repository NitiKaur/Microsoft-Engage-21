
import "./login.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {  useState } from "react";
import React from "react";
import { NavLink } from 'react-router-dom';
import  Auth  from '../../auth'
import axios from 'axios';
import FloatingLabel from "react-bootstrap/FloatingLabel";
function Login() {
  const [loginModal, setloginModal] = useState(true);
  const loginModalClose = () => setloginModal(false);

  // variable for user input
  const [email, setEmail] = useState('');
  const emailUpdate = (event) => {
    setEmail(event.target.value);
  }
  const [password, setPassword] = useState('');
  const passwordUpdate = (event) => {
    setPassword(event.target.value);
  }

  // when user click Login
  const logininto = () => {
    const userDetails ={
      email: email,
      password: password
    }
    if (email !== "" && password !== "") {
      axios.post('http://localhost:5000/api/users/login', userDetails).then(
        (res) => {
          Auth.authenticate();
          Auth.userToken = res.data.token;
          console.log('calles');
          setEmail("");
          setPassword("");
          localStorage.setItem('usertoken', res.data.token);
          document.querySelector('.clickthis').click();
        }
      ).catch(
        error => {
          console.error('There was an error!', error);
        }
      )
      }
  };

        return (
          <div>
            <div className="row">
              <div className="col d-flex justify-content-center">
              <NavLink className="clickthis btn btn-primary btnTOClass" style={{display:'none'}}  to="/" exact>
              Refresh
            </NavLink>
              </div>
            </div>
            <Modal show={loginModal} onHide={loginModalClose} backdrop="static" keyboard={false}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title>Login </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <div className="container">

              
                      
           <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
              <Form.Control type="text" placeholder="Enter email"  onChange={emailUpdate} value={email} />
                <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                </Form.Text>
           </FloatingLabel>
           <FloatingLabel controlId="floatingPassword" label="Password">
             <Form.Control type="text" placeholder="Password"  onChange={passwordUpdate} value={password}/>
           </FloatingLabel>

                      </div>
              </Modal.Body>
                <Modal.Footer>
                    
                <NavLink className="nav-link btn btn-primary" onClick={loginModalClose} to="/register" exact style={{color:'white'}}>
                Register
              </NavLink>
                
              <button className="nav-link btn btn-success" onClick={logininto}  style={{color:'white'}}>
                Login
              </button>
              </Modal.Footer>
      </Modal>
          </div>
    )
}
export default Login;