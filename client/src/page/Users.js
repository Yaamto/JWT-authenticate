
import React from 'react';




import UserList from '../components/userList/UserList';

const Users = () => {

   

    

    // const getAllUsers = async(e) => {
    //     e.preventDefault()
    //     const res = await fetch('http://localhost:3000/user/allusers', {
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         credentials: 'include'
    //       })
    //       const data = await res.json()
          
    //      return data.users
    //     }


    

    // useEffect(() => {
    //     const getUsers = async() => {
            
    //     const res = await fetch('http://localhost:3000/user/allusers', {
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         credentials: 'include'
    //       })
    //       const data = await res.json()
    //       setUsers(data.users)
          
    //     }

    //     getUsers()
        
        
    // }, [])

    
    return (
        <div>
            
            
           

        
            <UserList />
        </div>
    );
};

export default Users;