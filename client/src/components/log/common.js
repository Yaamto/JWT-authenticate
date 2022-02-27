import React, { useState } from 'react';
import Login from './login';
import Register from './register'
import "./common.css"


const Common = () => {

    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(true)
   
    const handleRegister = () => {

        setRegister(true)
        setLogin(false)
      
    }
    const handleLogin = () => {
        
        setLogin(true)
        setRegister(false)
      
    }
    
    return (
        
        <div>
            <div className="container">
                <h2>Authentification</h2>
                <div className="logOrRegi">
                    <button onClick={handleLogin} className={`btn login-btn ${login ? "active" :"" }`}>Login</button>
                    <button onClick={handleRegister} className={`btn register-btn ${register ? "active" :"" }`}>Register</button>
                   
                </div>
                {login && <Login />}
                {register && <Register />}
            </div>
        </div>
    );
};

export default Common;