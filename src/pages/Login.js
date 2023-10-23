
import {  useEffect, useState } from 'react'
import Logo from '../taxicle.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Login(){
  const [errorMessage, setErrorMessage] = useState('')
  const [values, setValues] = useState({
    admin: '',
    password: '',
  })
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('https://taxicleserver.onrender.com/admin',{withCredentials:true})
    .then(res => {
      if(res.data.valid) {
        navigate('/dashboard')
      }else{
        navigate('/')
      }
    }).catch(err =>console.log(err));
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      axios.post('https://taxicleserver.onrender.com/admin-login', values ,{withCredentials:true})
      .then(res => {
        if(res.data.Login){
          navigate('/dashboard')
        }else{
          setErrorMessage(res.data.message)
        }
      })
      .catch(err =>console.log(err));
    } catch (error) {
      console.log('User Sign In Failed', error.message);
    }
  };

  const handleChange = (event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  return(
    <div className="home-container">
      <div className='row d-block'>
        <div className="col login-header">
          <img src={Logo} className="logo react" alt="logo" />
        </div>
        <div className="col home-wrapper">
            <div className='col admin'>
              <h3>ADMINISTRATION</h3>
            </div>
            <hr className='LineLogin'></hr>
            <div className='errormsg'>
              <em style={{color:'red'}}> {errorMessage}</em>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='row d-block form-item'>
                <div className="col">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      name="admin"
                      className='form-control'
                      onChange={handleChange}
                      placeholder="Admin"
                      required
                    />
                </div>
                <div className="col">
                  <i className="fas fa-lock"></i>
                  <input
                    type='password'
                    name='password'
                    className='form-control'
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="col button d-block">
                  <div className='subbtn'>
                    <input id='recaptcha' value="Login" type="submit" />
                  </div>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

