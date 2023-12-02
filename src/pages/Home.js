import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFillPeopleFill, BsFillPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [editFare, setEditFare] = useState(true)
  const [editDiscount, setEditDiscount] = useState(true)
  const [editExceeding, setEditExceeding] = useState(true)
  const [userId , setUserId] = useState([])
  const [Fare , setFare] = useState([])
  const [userCount , setUserCount] = useState()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    MinimumFare:0,
    Discount: 0,
    Exceeding: 0,
  })
  useEffect(()=>{
    axios.get('https://taxicleserver.onrender.com/admin',{withCredentials:true})
    .then(res => {
      if(res.data.user) {
        navigate('/dashboard')
      }else{
        navigate('/')
      }
    }).catch(err =>console.log(err));

    axios.get('https://taxicleserver.onrender.com/admin-user')
    .then(res => {
      setUserCount((res.data.data).length)
      setUserId(res.data.data)
      setFare(res.data.fare)
    }
  ).catch(err => console.log(err))
})

  const handleChange = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }
  const handleSubmit = (event) =>{
    event.preventDefault()
    if(values.MinimumFare === 0) values.MinimumFare = Fare[0].MinimumFare
    if(values.Exceeding === 0) values.Exceeding = Fare[0].Exceeding
    if(values.Discount === 0) values.Discount = Fare[0].Discount
    axios.post('https://taxicleserver.onrender.com/admin-update', values)
    .then(res => {

      if(res.data === "Success") {
        if(event.target.name === "MinimumFareEvent") {
          setEditFare(!editFare)
        }
        if(event.target.name === "DiscountEvent"){
          setEditDiscount(!editDiscount)
        } 
        if(event.target.name === "ExceedingEvent") {
          setEditExceeding(!editExceeding)
        }
      }
    }
  ).catch(err => console.log(err))
  }
  const counter1 = userId.filter(item => item.UserType === 'passenger');
  const PassengerCount = counter1.length;

  const counter2 = userId.filter(item => item.UserType === 'driver');
  const DriverCount = counter2.length;

  const TriggerToggleFare = () => {
    setEditFare(!editFare)
  }
  const TriggerToggleDiscount = () => {
    setEditDiscount(!editDiscount)
  }
  const TriggerToggleExceeding = () => {
    setEditExceeding(!editExceeding)
  }
  return (
    <main className='main-container'>
      <div className='main-title'>
            <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
            <div className='card-inner'>
                <h3>REGISTERED USER</h3>
                <BsFillPeopleFill className='card_icon'/>
            </div>
            <h1>{userCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
              <h3>PASSENGER USERS</h3>
              <BsFillPersonFill className='card_icon'/>
          </div>

          <h1>{PassengerCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
              <h3>DRIVER USERS</h3>
              <BsFillPersonFill className='card_icon'/>
          </div>
          <h1>{DriverCount}</h1>
        </div>
      </div>
      <hr/>
      <div className='main-title'>
            <h3>UPDATE FARE</h3>
      </div>
      <div className='main-cards'>
        <div className='card'>
            <div className='card-inner'>
                <h3>MINIMUM FARE</h3>
            </div>

            { Fare.map((data, i) =>( 

             editFare ?
            <div className='card-inner'>
                <h1>₱{data.MinimumFare }</h1>
                <a class="card_icon" title="Edit" onClick={TriggerToggleFare} data-toggle="tooltip"><i class="material-icons" style={{color:'white'}}>&#xE254;</i></a>
            </div>
            :
              <form onSubmit={handleSubmit} name='MinimumFareEvent'>
                <div className='d-flex card-container'>
                  <input type='number' className='form-control' name="MinimumFare" onChange={handleChange} placeholder='Minimum Fare' defaultValue={data.MinimumFare }/>
                  <input type='submit' class="btn btn-success" value="Save"/>
                </div>
              </form>
           
            ))}

        </div>
        <div className='card'>
          <div className='card-inner'>
              <h3>DISCOUNT</h3>
          </div>
          {Fare.map((data, i) =>( 
            
          editDiscount  ?
           <div className='card-inner'>
          <h1>- ₱{data.Discount}</h1>
          <a class="card_icon" title="Edit" onClick={TriggerToggleDiscount} data-toggle="tooltip"><i class="material-icons" style={{color:'white'}}>&#xE254;</i></a>
          </div>
          :
          <form onSubmit={handleSubmit} name='DiscountEvent'>
                <div className='d-flex card-container'>
                  <input type='text' className='form-control'name="Discount" onChange={handleChange} placeholder='Discount' defaultValue={data.Discount}/>
                  <input type='submit' class="btn btn-success" value="Save"/>
                </div>
          </form>
        ))}
        </div>


        <div className='card'>
          <div className='card-inner'>
              <h3>EXCEEDING KILOMETER</h3>
          </div>
          {Fare.map((data, i) =>( 
           editExceeding ?
          
          <div className='card-inner'>
          <h1>+ ₱{data.Exceeding}</h1>
            <a class="card_icon" title="Edit" onClick={TriggerToggleExceeding} data-toggle="tooltip"><i class="material-icons" style={{color:'white'}}>&#xE254;</i></a>
          </div>
          :
          <form onSubmit={handleSubmit} name='ExceedingEvent'>
          <div className='d-flex card-container'>
            <input type='text' className='form-control' name="Exceeding" onChange={handleChange} placeholder='Exceeding' defaultValue={data.Exceeding}/>
            <input type='submit' class="btn btn-success" value="Save"/>
          </div>
        </form>
          ))}

          </div>
      </div>
    </main>
  )
}

export default Home
