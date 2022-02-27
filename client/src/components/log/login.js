import React, { useState} from 'react';
import { useNavigate} from "react-router-dom";
import axios from 'axios'
import "./login.css"

const Login = () => {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const handleLogin = (e) => {
       
        e.preventDefault()
        axios({
            method:"post",
            url:"http://localhost:3000/user/login",
            withCredentials:true,
            data: {
                email: email,
                password: password
            },
            headers : {
                'Access-Control-Allow-Credentials' : true,
                
            }
            
        })
        .then((res) => {
            console.log(res)
            navigate("/all-users")
        })

        .catch((err) => {
            console.log(err)
        })

    }
    return (
        
        <div>
           
         
            <form onSubmit={handleLogin}>
  
		<div className='field'>
			<label for="Email" className="floatLabel">Email</label>
			<input id="Email" name="Email" type="text" className="inp" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email}/>
		</div>
		<div className='field'>
			<label for="password" className="floatLabel">Password</label>
			<input id="password" name="password" type="password" className="inp" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password}/>
			
		</div>
		
		<div className='field'>
			<input type="submit" value="Login" id="submit"/>
		</div>
	</form>
        </div>
    );
};

export default Login;