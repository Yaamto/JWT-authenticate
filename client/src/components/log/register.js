import React, { useState } from 'react';
import axios from 'axios'
import "./register.css"
import Login from './login';
const Register = () => {

    const [formSubmit, setFormSubmit] = useState(false)
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()



    const handleRegister = (e) => {
        e.preventDefault()
        const emailUsedError = document.querySelector('#emailUsed')

        const loginBtn = document.querySelector(".login-btn")
        const registerBtn = document.querySelector(".register-btn")
        axios({
            method:"post",
            url:"http://localhost:3000/user/register",
            data: {
                userName:userName,
                email: email,
                password: password
            }
        })
        .then((res) => {
            if(res.data.error){
                emailUsedError.innerHTML =res.data.error
                
            } else {
                emailUsedError.innerHTML =""
                setFormSubmit(true)
                loginBtn.classList.add("active")
                registerBtn.classList.remove("active")
            }
           
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <div>
            { formSubmit ? (
                <Login />
            ): (
                
                <form onSubmit={handleRegister}>
            <div className='field'>
                    <label for="userName" className="floatLabel">Username</label>
                    <input id="userName" name="userName" type="text" className="inp" placeholder='Username..' onChange={(e) => setUserName(e.target.value)} value={userName} />
                </div>
                <div className='field'>
                    <label for="Email" className="floatLabel">Email</label>
                    <input id="Email" name="Email" type="email" className="inp" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <span id="emailUsed" className='error'></span>
                </div>
                 
                <div className='field'>
                    <label for="password" className="floatLabel">Password</label>
                    <input id="password" name="password" type="password" className="inp" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password}/>

                </div>

                <div className='field'>
                    <input type="submit" value="Register" id="submit"  />
                </div>
            </form>
                )}
        </div>
    );
};

export default Register;