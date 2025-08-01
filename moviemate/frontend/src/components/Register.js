import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"
function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        if (password!=passwordConf){
            setErrorMessage(`Password doesn\'t match`);
            return
        }
        var user = {
            name: name,
            email: email,
            password: password,
        }
        
        axios.post('http://127.0.0.1:8000/signup',user).then(response=>{
            setErrorMessage('');
            console.log("ok")
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }
  return(
  <><div className="register-wrapper">
          <div className="register-box">
              <h1>Register</h1>
{errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
              <div className="form-group">
                  <label>Name:</label>
                  <input type="text" 
                 value={name}
                        onInput={(event)=>setName(event.target.value)} />
              </div>

              <div className="form-group">
                  <label>Email:</label>
                  <input type="text" 
                  value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
              </div>

              <div className="form-group">
                  <label>Password:</label>
                  <input type="password" 
                  value={password}
                        onInput={(event)=>setPassword(event.target.value)}/>
              </div>

              <div className="form-group">
                  <label>Confirm Password:</label>
                  <input type="password" 
                    value={passwordConf}
                        onInput={(event)=>setPasswordConf(event.target.value)}/>
              </div>

              <div className="form-group">
                  <button className="btn btn-primary" onClick={registerUser}>Signup</button>
              </div>
              <div className="registered">
     <p>Already registered?</p><a href="/login/">Login here</a>
        </div>
          </div>
      </div></>
);
}
export default Register;