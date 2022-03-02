import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {CgProfile} from "react-icons/cg"
import {Spinner} from 'react-bootstrap'
import "./profile.css"



const Profile = () => {

    const [singleUser, setSingleUser] = useState([])
    const [loading, setLoading] = useState(false)
  
    
    useEffect(() => {
        const id = localStorage.getItem("id")
        const getCurrentUser = async(id) => {
            
        const res = await fetch('http://localhost:3000/user/singleUser/'+id, {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const data = await res.json()
          setSingleUser(data.user)
          setTimeout(() =>  setLoading(true), 200)
         
          console.log(data.user)
          
        }

        getCurrentUser(id)
    }, [])

    if (loading === false){

      return <div className="text-center align-middle"> <Spinner animation="border" variant="warning" /> </div>

    }
     return (
        <div>
            
            <div className="main">
                <div className="icon-profile">
                <CgProfile />
                


            </div>
            </div>
            <div className='Block'>
                    
                    <p>Nom d'utilisateur : {singleUser.userName}</p>
                    <p>Email: {singleUser.email}</p>
                    <p>Date de creation : {new Date(singleUser.date).toLocaleDateString("fr")}</p>
                    </div>
                

            </div>
        
    )
}

export default Profile;