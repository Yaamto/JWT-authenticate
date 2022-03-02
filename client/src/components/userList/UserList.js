import React, { useEffect, useState } from 'react';
import {MdNotInterested} from "react-icons/md"
import {BsTrash} from "react-icons/bs"
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from 'react-bootstrap'

import "./userList.css"
import ConfirmModal from './ConfirmModal';

const UserList = () => {

    const [usersList, setUsersList] = useState([])
    const [error, setError] = useState();
    const [shownModalId, setShownModalId] = useState()
    const [userId, setUserId] = useState()
    const [loading, setLoading] =useState(false)

    const handleDelete = async( id, i) => {
      setLoading(false)
        const res = await fetch('http://localhost:3000/user/delete/'+id, {
            method:"delete",
            headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            })
            const data = await res.json()

            const newUsersList = [...usersList]   
            newUsersList.splice(i, 1)   
            setUsersList(newUsersList)
            setTimeout(() => setLoading(true),100)
        
    }

  

     useEffect(() => {
       
        const getUsers = async() => {
            
        const res = await fetch('http://localhost:3000/user/allusers', {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const data = await res.json()
          setTimeout(() => setLoading(true),200)
          setUserId(localStorage.getItem("id"))
          setUsersList(data.users)
          
        }

        getUsers()

        .catch((err) => {
          
            setError(err);
        })
        .finally(() => {
            setLoading(false);
          });
        
        
    }, [])
    if (loading === false) {
        return <div className="text-center align-middle"><Spinner animation="border" variant="warning" /></div>
      }

      if (error || !Array.isArray(usersList)) {

        
        return <p>There was an error loading your data!</p>;
      }
    
    return (
        <div>
         

           <table>
    <thead className="tbl-header">
        <tr className='t-head'>
            <th>username</th>
            <th>mail</th>
            <th>date</th>
            <th>action</th>
        </tr>
    </thead>
    <tbody>
                {usersList.map((user, i) => {
                    const date = new Date(user.date)
                    
                    let test= false
                    if(user._id=== userId){
                     test=true
                      } else ( 
                        test=false
                      )
                   return( 
                   
                     
                     
                    
                     <tr className={` ${test ? "green" :"" }`}  key ={i}>
                       <td>{user.userName}</td>
                       <td>{user.email}</td>
                       <td>{date.toLocaleDateString("fr")}</td>
                       <td>
                         <span className={`trash ${test ? "hide" :"" }`} onClick={() => {setShownModalId(i)}}
                           
                          
                           
                        ><BsTrash /></span>
                         
                         <ConfirmModal showModal={shownModalId === i} onConfirm={() => {
                           setShownModalId(null)
                           handleDelete(user._id, i)
                           
                         } } onClose={() => setShownModalId(null)} nameUser={user.userName}/>
                         <p className={`not-possible ${test ? "" :"hide" }`} ><MdNotInterested /></p>
                         </td>
                      
                     </tr>
                    //  (e) => handleDelete(e, user._id, i)
                )
})}
</tbody>

</table>
</div>
 
      
    );
};

export default UserList;