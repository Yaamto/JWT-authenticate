import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "./userprofil.css"
import {Spinner} from 'react-bootstrap'
const UserProfil = () => {
    const [singleUser, setSingleUser] = useState([]);
    const [userName, setUserName] = useState()
    const [email, setEmail] =useState()
    const [banned, setBanned] = useState()
    const {id} = useParams()
    const date = new Date(singleUser.date)
    const navigate = useNavigate()
    const [loading, setLoading] =useState(false)

  
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
          

          setBanned(data.user.banned)
          setTimeout(() => setLoading(true),200)
         
          
          
          
        }

        getCurrentUser(id)
        
    }, [])

    
    const updateUser = async(id, userEdited) => {
        const res = await fetch('http://localhost:3000/user/update/'+id, {
            method:"put",
            headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(userEdited)
            })
            
            const datas = await res.json()
            
            navigate("/all-users")
            
    }

    const handleRedirect = () => {
        navigate("/all-users")
    }

    if (loading === false){

        return <div className="text-center align-middle"> <Spinner animation="border" variant="warning" /> </div>
  
      }

  
    return (
        <div className='user-profil'>
          <ul className='profil-items'>
              <li>
                  <label htmlFor="userName">Username :</label>
                  <input className='input-profil' type="text" id="userName" name='userName' defaultValue={singleUser.userName} onChange={(e) => setUserName(e.target.value)}/>
              </li>
              <li>
                  <label htmlFor="email">email : </label>
                  <input className='input-profil' type="text" id="email" name='email' defaultValue={singleUser.email} onChange={(e) => setEmail(e.target.value)}/>
              </li>
              <li>
                  <label htmlFor="date">Created at : </label>
                <span htmlFor="">{date.toLocaleDateString("fr")}</span>
                  
              </li>
              <li>
                  <label htmlFor="">Ban :</label>
                  <input className='input-ban' type="radio" name="ban" id="banned" value="true" defaultChecked={singleUser.banned} onChange={(e) => setBanned(e.target.value)}/>
                  <label className='label-ban' htmlFor="banned">ban</label>
                  <input className='input-ban' type="radio" name="ban" id="unbanned" value="false"  defaultChecked={!singleUser.banned} onChange={(e) => setBanned(e.target.value)} />
                  <label className='label-ban' htmlFor="unbanned">unban</label>
                 
                    

              </li>
          </ul>
            <div className="button-sect">
          <button className='btn-profil' onClick={(e) => updateUser(singleUser._id,{userName: userName, email: email, banned: banned})}>Save</button>
        <button className='btn-profil' onClick={handleRedirect}>Back</button> 
        </div>
        </div>
    );
};

export default UserProfil;