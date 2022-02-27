import React, { useEffect, useState } from 'react';
import {RiForbid2Fill} from "react-icons/ri"


import "./userList.css"

const UserList = () => {

    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    
    

  

    const handleDelete = async(e, id, i) => {
      e.preventDefault()
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
            
        
    }


     useEffect(() => {
        setLoading(true);
        const getUsers = async() => {
            
        const res = await fetch('http://localhost:3000/user/allusers', {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const data = await res.json()
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
    if (loading) {
        return <p>Data is loading...</p>;
      }

      if (error || !Array.isArray(usersList)) {

        
        return <p>There was an error loading your data!</p>;
      }
    
    return (
        <div>
           <div className="card">
             <div className='head'>
               <p>UserName</p>
               <p>Email</p>
               <p>Date</p>
               <p>Action</p>
             </div>
                {usersList.map((user, i) => {
                    const date = new Date(user.date)
                    const id = localStorage.getItem("id")
                    let test= false
                    if(user._id=== id){
                     test=true
                      } else ( 
                        test=false
                      )
                   return( 
                     
                     <div className={`row ${test ? "green" :"" }`}  key ={i}>
                    <p>{user.userName}</p>
                    
                    <p>{user.email}</p>
                    <p>{date.toLocaleDateString("fr")}</p>
                    <button className={`${test ? "hide" :"" }`} onClick={(e) => handleDelete(e, user._id, i)}>X</button>
                    <p className={`not-possible ${test ? "" :"hide" }`} ><RiForbid2Fill /></p>
                    </div>
                    
                )
})}
</div>


            
        </div>
    );
};

export default UserList;