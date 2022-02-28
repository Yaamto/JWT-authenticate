import React, { useEffect, useState } from 'react';
import {MdNotInterested} from "react-icons/md"
import {BsTrash} from "react-icons/bs"



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
                    const id = localStorage.getItem("id")
                    let test= false
                    if(user._id=== id){
                     test=true
                      } else ( 
                        test=false
                      )
                   return( 
                     
                    //  <div className={`row ${test ? "green" :"" }`}  key ={i}>
                    // <p>{user.userName}</p>
                    
                    // <p>{user.email}</p>
                    // <p>{date.toLocaleDateString("fr")}</p>
                    // <button className={`${test ? "hide" :"" }`} onClick={(e) => handleDelete(e, user._id, i)}>X</button>
                    // <p className={`not-possible ${test ? "" :"hide" }`} ><RiForbid2Fill /></p>
                    // </div>
                    
                     <tr className={` ${test ? "green" :"" }`}  key ={i}>
                       <td>{user.userName}</td>
                       <td>{user.email}</td>
                       <td>{date.toLocaleDateString("fr")}</td>
                       <td>
                         <span className={`trash ${test ? "hide" :"" }`} onClick={(e) => handleDelete(e, user._id, i)}><BsTrash /></span>
                         <p className={`not-possible ${test ? "" :"hide" }`} ><MdNotInterested /></p>
                         </td>
                      
                     </tr>
                )
})}
</tbody>
</table>
</div>


            
      
    );
};

export default UserList;