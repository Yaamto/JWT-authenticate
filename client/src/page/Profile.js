import React, { useEffect, useState } from 'react';
import {CgProfile} from "react-icons/cg"
import "./profile.css"

const Profile = () => {

    const [singleUser, setSingleUser] = useState([])
    
    useEffect(() => {
        
        const getCurrentUser = async(id) => {
            
        const res = await fetch('http://localhost:3000/user/singleUser/'+id, {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const data = await res.json()
          setSingleUser(data.user)
          console.log(data.user)
          
        }

        getCurrentUser(localStorage.getItem("id"))
    }, [])

    
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
                    <p>Date de creation : {singleUser.date}</p>
                    </div>
                

            </div>
        
    )
}

export default Profile;