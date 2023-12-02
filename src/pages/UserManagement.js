import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Modal, Carousel, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaRegEye } from "react-icons/fa";
import ImageModal from './ImageModal'; 
import { imageDB } from '../config/config'
import { getDownloadURL, listAll, ref } from "firebase/storage";

function UserManagement() {
    const [userId , setUserId] = useState([])
    const [Result, setResult] = useState([])
    const [Images, setImg] = useState([])

    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedImages, setSelectedImages] = useState([]); // State to store selected image path
    const navigate = useNavigate() 

    useEffect(()=>{
        axios.get('https://taxicleserver.onrender.com/admin' ,{withCredentials:true})
        .then(res => {
            console.log(res.data)
          if(res.data.Login) {
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
    },[])

    const handleImageClick = (images) => {
        setSelectedImages(images.map((image) => process.env.PUBLIC_URL + image));
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setSelectedImages([]); // Clear selected images when closing modal
        setShowModal(false);
    };

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
    const handleStatusChange = (userEmail, newStatus) => {
        // Find the user by email
        const userToUpdate = userId.find(user => user.Email === userEmail);
      
        // Check if the status is actually changing
        if (userToUpdate && userToUpdate.Status !== newStatus) {
          // Update the status
          userToUpdate.Status = newStatus;
      
          // Update the state
          setUserId([...userId]);
      
          // Implement the logic to update the user status in the backend
          axios.post(`https://taxicleserver.onrender.com/update-user-status/${userEmail}`, { status: newStatus })
            .then(res => {
              // Handle the response if needed
              console.log(`Status updated successfully to ${newStatus}`);
            })
            .catch(err => {
              // Handle errors
              console.log(err);
              // Revert the local state change if the backend call fails
              userToUpdate.Status = userToUpdate.Status; // Set it back to the original status
              setUserId([...userId]);
            });
        } else {
          // Log or handle the case where the status is not changing
          console.log(`Status is not changing for user ${userEmail}`);
        }
      };
      const traverseImg = (email)  => {
        listAll(ref(imageDB, `${email}/`)).then(imgs=>{
            console.log(imgs)
            imgs.items.forEach(val=>{
                getDownloadURL(val).then(url=>{
                    setImg(data=>[...data,url])
                })
            })
        })
      }
  return (
    <main class="main-container">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="user-text">
                                <h1>User lists</h1>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="search-box">
                                <i class="material-icons">&#xE8B6;</i>
                                <input type="text" class="form-control" placeholder="Search&hellip;" onChange={filter}/>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>User Type</th>
                            <th>Plate Number</th>
                            <th>License Number</th>
                            <th>Upload</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Result.map((data, i) =>(
                        <tr key={i}>
                            <td>{data.idusers}</td>
                            <td>{(data.FirstName+ " " + data.LastName).toUpperCase()}</td>
                            <td>{data.Email}</td>
                            <td>{data.PhoneNumber}</td>
                            <td>{data.UserType}</td>
                            <td>{data.PlateNum}</td>
                            <td>{data.LicenseNum}</td>
                            <td className='view-btn'>
                                {/* {traverseImg(data.Email) }
                                {
                                Images.map(dataVal=><div>
                                            <img src={dataVal} height="200px" width="200px" />
                                            <br/> 
                                        </div>)
                                                } */}
                            </td>
                            <td>{/* Dropdown for selecting status */}
                                <DropdownButton id={`dropdownMenu${i}`} title="Change Status">
                                    <Dropdown.Item onClick={() => handleStatusChange(data.Email, 'pending')}>Pending</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleStatusChange(data.Email, 'not-verified')}>Not Verified</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleStatusChange(data.Email, 'verified')}>Verified</Dropdown.Item>
                                </DropdownButton>
                            </td>
                            <td className='act-btn'>
                                <a onClick={() => onDelete(data.Email)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>   
                        ))}       
                    </tbody>
                </table>
            </div>
        </div>  
        {showModal? 
        <ImageModal /> :
        <></>
        }
    </main> 
  )
}

export default UserManagement;
