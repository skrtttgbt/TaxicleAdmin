import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ImageModal from './ImageModal'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineVerified } from "react-icons/md";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function UserManagement() {
    const [userId , setUserId] = useState([])
    const [Result, setResult] = useState([])
    const [lgShow, setLgShow] = useState(false);
    const [folder, setFolder] = useState()
    const [verified, setVerified] = useState()
    const navigate = useNavigate() 

    useEffect(()=>{
        axios.get('https://taxicleserver.onrender.com/admin' ,{withCredentials:true})
        .then(res => {
          if(res.data.valid) {
            navigate('/user-management')
          }else{
            navigate('/')
          }
        }).catch(err =>console.log(err));
    },[])

    useEffect(()=>{
        axios.get('https://taxicleserver.onrender.com/admin-user')
        .then(res => {
            setUserId(res.data.data)
            setResult(res.data.data)
        }
             ).catch(err => console.log(err))
    },[Result])


    function filter(event) {
        const value = event.target.value.toLowerCase()
        setResult(
            userId.filter( 
            (f) => 
               f.Email.toLowerCase().includes(value) 
            || f.FirstName.toLowerCase().includes(value)
            || f.LastName.toLowerCase().includes(value)
            || f.PhoneNumber.toLowerCase().includes(value)
            || f.PlateNum.toLowerCase().includes(value)
            || f.LicenseNum.toLowerCase().includes(value)
        ));
    }
    
    const onDelete = (userEmail) => {
        console.log(userEmail)
        axios.post(`https://taxicleserver.onrender.com/delete-user/${userEmail}`).then(res => {
            if(res.data === "Success") {
              navigate('/user-management')
            }
        })
        axios.get('https://taxicleserver.onrender.com/admin-user')
        .then(res => {
            setUserId(res.data.data)
            setResult(res.data.data)
        }
             ).catch(err => console.log(err))
    }

    const handleApprove = (email) =>{
      axios.post('https://taxicleserver.onrender.com/admin-approve', {email}) 
      .then(res => {
        if(res.data.message === 'success') {
            navigate('/user-management')
        }
      }).catch(err => console.log(err))
      axios.get('https://taxicleserver.onrender.com/admin-user')
          .then(res => {
              setUserId(res.data.data)
              setResult(res.data.data)
          }).catch(err => console.log(err))
    }
  return (
    <main className="main-container">
        <div className="table-responsive">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="table_header d-flex align-items-center justify-content-start">
                        
                        <div className="user-text">
                            <h1>User lists</h1>
                        </div>
                     
                    </div>
                    <div className="searchbox-holder d-flex align-items-center justify-content-start" >
                          <div className="search-box">
                            <input type="text" className="form-control " placeholder="Search&hellip;" onChange={filter}/>
                            <i className="material-icons">&#xE8B6;</i>
                          </div>    
                    </div>
                </div>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>User Type</th>
                            <th>Plate Number</th>
                            <th>License Number</th>
                            <th>Documents</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Result ? (
                        Result.map((data, i) =>(
                        <tr key={i}>
                            <td>{data.idusers}</td>
                            <td>{(data.FirstName+ " " + data.LastName).toUpperCase()}</td>
                            <td>{data.Email}</td>
                            <td>{data.PhoneNumber}</td>
                            <td>{data.UserType}</td>
                            <td>{data.PlateNum}</td>
                            <td>{data.LicenseNum}</td>
                            <td className='view-btn'>
                                {data.imgPassengerID || data.imgMTOP ? (
                                  data.Verified === 0 ?
                                <div className='btn-container d-flex justify-content-center align-items-center'>
                                        <Button className='btn btn-primary' onClick={() => {setVerified(false);setFolder(data.Email); setLgShow(true); }}>View Documents</Button>
                                </div>
                                :

                                <div className='btn-container d-flex justify-content-center align-items-center'>
                                  <MdOutlineVerified  color='#4bb543' fontSize='30px'/>
                                <Button className='btn btn-primary' onClick={() => {setVerified(true);setFolder(data.Email); setLgShow(true); }}>View Documents</Button>
                                </div>
                                ):
                                data.Verified === 0 ?
                                 <div className='btn-container d-flex justify-content-center align-items-center'>
                                <button className='btn btn-success' onClick={() =>handleApprove(data.Email)}>Approve Application</button>
                                </div>
                                :
                                <div className='btn-container d-flex justify-content-center align-items-center'>

                                <p style={{fontSize:'15px'}}><MdOutlineVerified  color='#4bb543' fontSize='30px'/> Verified</p>
                                </div>
                                
                                }
                            </td>
                            <td className='act-btn'>
                                <span onClick={() => onDelete(data.Email)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></span>
                            </td>
                        </tr> 
                                      ))) : (
                                        <tr>
                                        <td colSpan="10" className="text-center">
                                          Connecting To Server...
                                        </td>
                                      </tr>
                                    )}        
                    </tbody>
                </table>
            </div>
        </div>  
        <Modal id='image_modal'
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Body>
            <ImageModal email={folder} verify={verified}/>
        </Modal.Body>
      </Modal>
    </main> 
  )
}

export default UserManagement;
