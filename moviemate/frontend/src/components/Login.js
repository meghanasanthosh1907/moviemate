import React from 'react';
import { useState } from "react";
import axios from 'axios';
import "./Login.css"
import { useNavigate } from "react-router-dom";

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    
       function attemptLogin() {
        axios.post('http://127.0.0.1:8000/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            console.log(response.data.token)
            localStorage.setItem('token',response.data.token)
            navigate('/home');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
  return(
    <><div className="login-wrapper">
          <div className="login-box">
              <h1>Login</h1>
 {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
              

              <div className="form-group">
                  <label>Email:</label>
                  <input type="text" 
                   value={email}
                        onInput={(event)=>setEmail(event.target.value)}/>
              </div>

              <div className="form-group">
                  <label>Password:</label>
                  <input type="password" 
                    value={password}
                        onInput={(event)=>setPassword(event.target.value)}/>
              </div>

             

              <div className="form-group">
                  <button className="btn btn-primary" onClick={attemptLogin}>Login</button>
              </div>
               <div className="newuser">
     <p>New User?</p><a href="/register/">Register here</a>
        </div>
          </div>
      </div></>



  )
}

export default Login;