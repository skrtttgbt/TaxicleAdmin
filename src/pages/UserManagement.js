import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserManagement() {
    const [userId , setUserId] = useState([])
    const [Result, setResult] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('https://taxicleserver.onrender.com/admin',{withCredentials:true})
        .then(res => {
          if(res.data.valid) {
            navigate('/user-management')
          }else{
            navigate('/')
          }
        }).catch(err =>console.log(err));
        axios.get('https://taxicleserver.onrender.com/admin-user')
        .then(res => {
            setUserId(res.data.data)
            setResult(res.data.data)
        }
             ).catch(err => console.log(err))
    },[])

    function filter(event) {
        const value = event.target.value.toLowerCase()
        setResult(
            userId.filter(f => f.Email.toLowerCase().includes(value) 
            || f.FirstName.toLowerCase().includes(value)
            || f.LastName.toLowerCase().includes(value)
            || f.PhoneNumber.toLowerCase().includes(value)
            || f.PlateNum.toLowerCase().includes(value)
        ))
    }

    const onDelete = (userEmail) => {
        console.log(userEmail)
        axios.get(`https://taxicleserver.onrender.com/delete-user/${userEmail}`).then(res => {
            if(res.data === "Success") {
              navigate('/user-management')
            }
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Result.map((data, i) =>(
                        <tr>
                            <td>{data.idusers}</td>
                            <td>{(data.FirstName+ " " + data.LastName).toUpperCase()}</td>
                            <td>{data.Email}</td>
                            <td>{data.PhoneNumber}</td>
                            <td>{data.UserType}</td>
                            <td>{data.PlateNum}</td>
                            <td>{data.LicenseNum}</td>
                            <td>
                                <a onClick={ () => onDelete(data.Email)} class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>   
                        ))}       
                    </tbody>
                </table>
            </div>
        </div>  
    </main> 
  )
}

export default UserManagement
