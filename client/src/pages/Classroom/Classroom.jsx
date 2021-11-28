import React, { useEffect, useState } from 'react'
import Card from './cards/cards';
import './Classroom.css'
import Auth from '../../auth';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Classroom = () => {
  const imageAddress = 'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg';
  const notification = ['data', 'shivam', 'rajesh'];
  const url = 'http://localhost:5000/';
  const [userClassesData,setuserClassesData] = useState(null);
  let [one,setone] = useState(1);
  axios.defaults.headers.common['Authorization'] = Auth.haveToken() ? localStorage.getItem('usertoken') : Auth.userToken;
  useEffect(() => {
    if (one === 1) {
      axios.get(url + 'api/classroom/').then(
        (res) => {
          setuserClassesData(res.data);
          console.log(userClassesData);
          Auth.userDataTempStorage = userClassesData;
          setone(2);
        }
      ).catch(
        error => {
          console.error('There was an error!', error);
        }
      )
    }
  })


// Make className modal logic start
  
const [makeClass, setMakeClass] = useState(false);

  function MakeClass(props) {
    const [className, setclassName] = useState("");
    const classNameUpdate = (event)=>{
      setclassName(event.target.value);
    }
    const [classCode, setclassCode] = useState("");
    const classCodeUpdate = (event)=>{
      setclassCode(event.target.value);
    }
    const makeNewClassBackEnd = () => {
     let makeClassData = {
       name: className,
       courseCode: classCode
    }
      axios.post(url + 'api/classroom/create', makeClassData).then(
        (res) => {
          console.log(res);
          setone(1);
          props.onHide();
        }
      ).catch(
        (error) => {
          console.log('Error : '+error)
        }
      )
    }
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Make Class
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <>
           <FloatingLabel
             controlId="floatingInput"
             label="Class Name"
             className="mb-3"
           >
            <Form.Control type="text" placeholder="english" onChange={classNameUpdate}/>
           </FloatingLabel>
           <FloatingLabel controlId="floatingPassword" label="Course Code">
             <Form.Control type="text" placeholder="Course Code" onChange={classCodeUpdate}/>
           </FloatingLabel>
         </>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={()=> {setMakeClass(false); setAddClass(true);}}>Join Class</button>
        <button className="btn btn-danger" onClick={makeNewClassBackEnd}>Make Class</button>
      </Modal.Footer>
    </Modal>
  );
}

// Make class modal logic end

// Join class modal logic start
  
  const [addClass, setAddClass] = useState(false);

  function AddClass(props) {

    const [inviteCode, setInviteCode] = useState("");
    const inviteCodeUpdate = (event)=>{
      setInviteCode(event.target.value)
    }
    const joinClassClicked = ()=>{
      props.onHide();
      axios.post(url + 'api/classroom/join/',{inviteCode: inviteCode}).then(
        (res) => {
          console.log(res);
        }
      ).catch(
        (error) => {
          console.log('Error : '+error)
        }
      )
    }
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Join Class
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <FloatingLabel controlId="floatingPassword" label="Invite Code">
              <Form.Control type="text" placeholder="Invite Code" maxLength="20" onChange={inviteCodeUpdate} />
            </FloatingLabel >
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={()=>{setAddClass(false); setMakeClass(true);}}>Make Class</button>
          <button className="btn btn-danger" onClick={joinClassClicked}>Join Class</button>
        </Modal.Footer>
      </Modal>
    );
  }
// Join class modal logic end
  return (
    <div className="container">
      <div className="row ">
  
        {userClassesData !== null ? userClassesData.map((data, index) => {
                return <div key={index} className="col d-flex justify-content-around">
                <div className="make">
                    <Card  image={imageAddress} index={index} notification={notification} userClassesData={data} />
                </div>
                </div>
              }) : "Wait To Load"
        }
        
      </div>
      <button className="btn btn-primary btn-editing" onClick={() => { setAddClass(true) }}>
      <i className="fas fa-plus plusico"></i>
      </button>
      <AddClass show={addClass} onHide={() => setAddClass(false)}  />
      <MakeClass show={makeClass} onHide={() => setMakeClass(false)}  />
    </div>
  )
}
export default Classroom;