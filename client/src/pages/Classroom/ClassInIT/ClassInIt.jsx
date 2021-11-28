import React, {useCallback} from 'react'
import { useState } from "react";
import "./classInit.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropzone from 'react-dropzone'
import axios from 'axios';
import Auth from '../../../auth';
import FloatingLabel from "react-bootstrap/FloatingLabel";

const ClassInIt = () => {
  const url = 'http://localhost:5000/';
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const type = queryParams.get('type');
  const classData = Auth.userDataTempStorage[id];
  const classDetails = {
    image: 'https://s35691.pcdn.co/wp-content/uploads/2016/09/iStock_87294393_LARGE.160928.jpg',
    className: classData.name,
    owner: classData.owner,
    stream: classData.stream,
    members: classData.members,
    inviteCode: classData.inviteCode,
    courseCode: classData.courseCode,
    meetLink: classData.meetingLink,
  }

// File Uploading Logic Start

  const [attachFileModal, setAttachFileModal] = useState(false);
  const [fileOfUser, setfileOfUser] = useState(null);
  const attachFileModalOpen = () => setAttachFileModal(true);
  const [uploadedFileID, setuploadedFileID] = useState(null);
  const attachFileModalCloseAndUpload = async () => {
    let formData = new FormData();
    formData.append('files', fileOfUser[0]);
    formData.append('files', fileOfUser[1]);
    formData.append('name', "shivam");
    console.log('formData');
    console.log(formData);
    await axios({
      method: "post",
      url: url + 'api/upload/multipleFiles',
      data: formData,
      headers: { 'accept': 'application/json', 'Accept-Language': 'en-US,en;q=0.8', 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
    }).then(
      (res) => {
        console.log(res.data.files);
        setuploadedFileID(res.data._id);
      }
    ).catch((err) => {
      console.log("thisis error :"+err);
    })
    setAttachFileModal(false);
    setTimeout(
      setFileUploadText('Drop your files, or click to select files [only one file for now]'), 1000);
  }
  const attachFileModalClose = () => {
    setAttachFileModal(false);
    setfileOfUser(null);
    setTimeout(
      setFileUploadText('Drag and drop your files, or click to select files'), 1000);
  };
  const [fileUploadText, setFileUploadText] = useState('Drop your files, or click to select files [only one file for now]');
  const acceptedFiles = (acceptedFiles) => {
    console.log(acceptedFiles);
    setfileOfUser(acceptedFiles);
    setFileUploadText("Uploaded no of files : " + acceptedFiles.length);
  };

// File Uploading Logic End
// message Area Code start
  function MessageArea() {
    const [title, setTitle] = useState("");
    const onChangeTile =(event)=> {
      setTitle(event.target.value);
    }
    const [desc, setDesc] = useState("");
    const onChangeDesc =(event)=> {
      setDesc(event.target.value);
    }
    const sendDataToServer = () => {
      console.log(title + " " + desc + " " + uploadedFileID);
      const dataToPost = {
        title:title,
        description:desc,
        files:uploadedFileID,
      } 
      if ((title !== "" && desc !== "") || uploadedFileID !== null) {
        axios.post(url + 'api/classroom/work', dataToPost).then(
          (res) => {
            console.log(res);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
      } else {
      }
      setTitle("");
      setDesc ("");
      setuploadedFileID(null);
    }
    return <>
      <div className="messageAreaAll" style={{}}>
            <FloatingLabel controlId="floatingInput" label="Title :" className="mb-3" >
          <Form.Control type="text" placeholder="Title" value={ title} onChange={onChangeTile} autoComplete="off"  className="message" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingTextarea2" label="Description :" >
          <Form.Control as="textarea" placeholder="Description" value={desc} onChange={onChangeDesc} autoComplete="off"  className="message" style={{ height: '100px'}} />
              </FloatingLabel>
              <ul className='meassageAreaBtn'>
                <li style={{ float: 'right' }}>
                  <Button onClick={sendDataToServer} style={{color:'#333',border:'0px', borderRadius: "20%", width: '25px', padding: '6px', paddingRight: '28px' }} variant="outline-dark">
                    <i className="imgIcon fa fa-paper-plane"></i>
                  </Button></li>
                <li style={{ float: 'right' }}>
            <Button onClick={attachFileModalOpen} variant="outline-dark"
                 style={{ color: '#333', border: '0px', borderRadius: "20%", width: '25px', padding: '6px', paddingRight: '28px' }}>
                    <i className="imgIcon fa fa-paperclip "></i>
                  </Button>
                </li>
              </ul>
      </div>
    </>
  }
  return (
    <div className="container-fluid" style={{ marginTop: `-30px` }}>
        <div className="mainClassWork">
          <div className="classText">
          <h1><strong>{classDetails.className}</strong></h1>
          </div>
        </div>
        <br></br>

        <div className="container-fluid">
        <div className="row">
            <div className="col-sm-3 d-flex justify-content-center">
              <div className="row" style={{width:'100%'}}>
              <div className="col">
                <a href={classDetails.meetLink} className="btn btn-success" style={{ width: '100%', marginBottom: '20px' }}>Join Meet</a>

              </div>
              </div>
            </div>
            {/* messaging part goes here */}
          <div className="col-sm-9" >
            <MessageArea />
            
            </div>
        </div>
        </div>

      <br></br>

{/* modal for uploading file open here*/}
      <Modal show={attachFileModal} onHide={attachFileModalClose} backdrop="static" keyboard={false}
              size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                  <Modal.Title>Upload File</Modal.Title>
                </Modal.Header>
                <Modal.Body>

            <div className="row d-flex justify-content-center" style={{border:'2px dotted orange', borderRadius:'10px',margin:'0', height:'20vh', width:'100%'}}>
              <div className="col d-flex justify-content-center"  >
            <Dropzone style={{width:'100%'}} onDrop={acceptedFiles}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                      <p style={{ marginTop: '45px', color: '#333' }}>{fileUploadText}</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
          </div>
            </div>

                </Modal.Body>
                  <Modal.Footer>
                      
                 <Button onClick={attachFileModalClose}>Close</Button>
                 <Button onClick={attachFileModalCloseAndUpload} variant="primary">Upload</Button>
                </Modal.Footer>
      </Modal>
{/* modal for uploading  file over*/}
      </div>
    )
  }
  export default ClassInIt;