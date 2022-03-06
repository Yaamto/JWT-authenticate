import React, { useEffect, useState } from 'react';
import {MdNotInterested} from "react-icons/md"
import {BsTrash} from "react-icons/bs"
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "./userList.css"
import ConfirmModal from './ConfirmModal';
import SearchBar from '../searchbar/SearchBar';
import {BsFillPencilFill} from "react-icons/bs"
import {AiOutlineSearch} from "react-icons/ai"

const UserList = () => {

    const [usersList, setUsersList] = useState([])
    const [error, setError] = useState();
    const [shownModalId, setShownModalId] = useState()
    const [userId, setUserId] = useState()
    const [loading, setLoading] =useState(false)
    const [query, setQuery] = useState("")


    const handleDelete = async( id, i) => {
    
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

    const handleBan = async(e, id, i) => {
      e.preventDefault()
      const res = await fetch('http://localhost:3000/user/ban/'+id, {
        method:"get",
        headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const data = await res.json()
        console.log(data)
        
    }

    const handleUnBan = async(e, id, i) => {
      e.preventDefault()
      const res = await fetch('http://localhost:3000/user/unban/'+id, {
        method:"get",
        headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const data = await res.json()
        console.log(data)
     
        
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
          <div className="search-sec">
            <input type="text" placeholder='Search...' onChange={(e) => setQuery(e.target.value)} class="searchbar"/>
            <span className='loupe'><AiOutlineSearch /></span>
            </div>
           <table>
    <thead className="tbl-header">
        <tr className='t-head'>
            <th>username</th>
            <th>mail</th>
            <th>date</th>
            <th>action</th>
            <th>status</th>
        </tr>
    </thead>
    <tbody>
                {usersList.filter((user) => user.userName.toLowerCase().includes(query)).map((user, i) => {
                    const date = new Date(user.date)
                    
                    let test= false
                    
                    if(user._id=== userId){
                     test=true
                      } else ( 
                        test=false
                      )

                     
                   return( 
                   
                     
                     
                    
                     <tr className={` ${test ? "green" :"" }`}  key ={i}>
                     
                       <td>{user.userName} </td>
                       <td>{user.email}</td>
                       <td>{date.toLocaleDateString("fr")}</td>
                       <td>
                         <Link to={{
                         pathname: `/user/${user._id}`,

                       }}
                         key={user._id}
                       ><BsFillPencilFill className={`edit-user ${test ? "hide" :"" }`}/></Link>
                         <span className={`trash ${test ? "hide" :"" }`} onClick={() => {setShownModalId(i)}}
                           
                          
                           
                        ><BsTrash /></span>
                         
                         <ConfirmModal showModal={shownModalId === i} onConfirm={() => {
                           setShownModalId(null)
                           handleDelete(user._id, i)
                           
                         } } onClose={() => setShownModalId(null)} nameUser={user.userName}/>
                         <p className={`not-possible ${test ? "" :"hide" }`} ><MdNotInterested /></p>
                         </td>
                          <td>
                            {user.banned ? "banned": "unbanned"}
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