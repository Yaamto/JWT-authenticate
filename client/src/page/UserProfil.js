import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import "./userprofil.css"
const UserProfil = () => {
    const [singleUser, setSingleUser] = useState([]);
    const [userName, setUserName] = useState()
    const [email, setEmail] =useState()
    const [banned, setBanned] = useState()
    const {id} = useParams()
    const date = new Date(singleUser.date)
    const navigate = useNavigate()
    

    console.log(banned)
    console.log(singleUser._id)
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
            console.log(datas)
            
    }

    const handleRedirect = () => {
        navigate("/all-users")
    }
    return (
        <div className='user-profil'>
          <ul className='profil-items'>
              <li>
                  <label htmlFor="userName">Username :</label>
                  <input type="text" id="userName" name='userName' defaultValue={singleUser.userName} onChange={(e) => setUserName(e.target.value)}/>
              </li>
              <li>
                  <label htmlFor="email">email : </label>
                  <input type="text" id="email" name='email' defaultValue={singleUser.email} onChange={(e) => setEmail(e.target.value)}/>
              </li>
              <li>
                  <label htmlFor="date">Created at : </label>
                  <span htmlFor="">{date.toLocaleDateString("fr")}</span>
                  
              </li>
              <li>
                  <label htmlFor="">Ban :</label>
                  <label htmlFor="banned">Oui</label>
                  <input type="radio" name="ban" id="banned" value="true" onChange={(e) => setBanned(e.target.value)}/>
                  <label htmlFor="banned">Non</label>
                  <input type="radio" name="ban" id="unbanned" value="false"   onChange={(e) => setBanned(e.target.value)} />
                    

              </li>
          </ul>

          <button onClick={(e) => updateUser(singleUser._id,{userName: userName, email: email, banned: banned})}>Save</button>
        <button onClick={handleRedirect}>Back</button> 
        </div>
    );
};

export default UserProfil;