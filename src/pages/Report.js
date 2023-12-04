import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdCheckCircle } from "react-icons/md";

function Report() {
    const [Result, setResult] = useState([])
    const navigate = useNavigate() 
    useEffect(()=>{
        axios.get('https://taxicleserver.onrender.com/admin' ,{withCredentials:true})
        .then(res => {
          if(res.data.valid) {
            navigate('/report')
          }else{
            navigate('/')
          }
        }).catch(err =>console.log(err));
    },[])
    
    useEffect(()=>{
        axios.get('https://taxicleserver.onrender.com/admin-report')
        .then(res => {
            setResult(res.data.report)
        }
             ).catch(err => console.log(err))
    },[Result])

    const dateFormat = (date) => {
        return moment(date).format('LL');
    }
    const handleCaseEnded = (Email, travelID) => {
      
    axios.post('https://taxicleserver.onrender.com/admin-case', {Email,travelID})
          .then(res => {
            if(res.data.message === 'success'){
                setResult(res.data.report);
            }
          })
          .catch(err => console.log(err));
      };

  return (
    <main className="main-container">
 <div className="table-responsive">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="user-text">
                                <h1>Report List</h1>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="search-box">
                                <i className="material-icons">&#xE8B6;</i>
                                <input type="text" className="form-control" placeholder="Search&hellip;"/>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover table-bordered">
                    <thead>

                        <tr>
                            <th>Body Number</th>
                            <th>Report's Email</th>
                            <th>Report's Contact</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Report Type</th>
                            <th>Complain</th>
                            <th>Date of Incident</th>
                            <th>Date of Report</th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Result && Result.map((data, i) => (
                        <tr key={i}>
                            <th scope="row">{data.BodyNumber || ''}</th>
                            <td>{data.Email || ''}</td>
                            <td>{data.mobile || ''}</td>
                            <td>{data.From || ''}</td>
                            <td>{data.To || ''}</td>
                            <td>{data.ReportType || ''}</td>
                            <td>{data.complain || ''}</td>
                            <td>{dateFormat(data.IncidentDate) || ''}</td>
                            <td>{dateFormat(data.ReportDate) || ''}</td>
                            <td>
                                {data.CaseEnded === 0 ?
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={() => handleCaseEnded(data.Email,data.TravelID )} className='btn btn-success case_end'>Case Solve</button>
                                </div>
                                :
                                <div className='d-flex justify-content-center align-items-center'>
                                <p style={{fontSize:'20px'}}><MdCheckCircle color='#4bb543'/> Solved</p>
                                </div>
                                }
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

export default Report
