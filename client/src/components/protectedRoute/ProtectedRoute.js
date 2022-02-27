

import axios from 'axios'

import {Navigate, Outlet} from 'react-router-dom'



const getAuth = async() => {
   
    await axios({
        method:"get",
        url:"http://localhost:3000/jwtid",
        withCredentials:true,
        headers : {
            'Access-Control-Allow-Credentials' : true,
            
        }
       
       
        
    })
    .then((res) => {
        if(res) {
            console.log( "true : " +res)
            return true
        } else{
            console.log( "false : " +res)
            return false
        }
    })

    .catch((err) => {
        console.log(err)
    })

    


}

const ProtectedRoute = () => {
    
    return getAuth ? <Outlet /> : <Navigate to="/" />;
  };


export default ProtectedRoute