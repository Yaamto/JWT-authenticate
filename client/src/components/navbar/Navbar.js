import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {FiLogOut} from "react-icons/fi"

import cookie  from 'js-cookie';

const Navbar = () => {


    const navigate = useNavigate()
    const removeCookie = (key) => {
        if (window !== "undefined"){
            cookie.remove(key, { expires : 1})
        }

    }
   

    const handleLogout = async() => {
        
       
        await axios({
            method:"get",
            url:"http://localhost:3000/user/logout",
            withCredentials:true,
           
           
            
        })
        .then((res) => removeCookie('jwt'))
        .then((res) => localStorage.removeItem("id"))
        .catch((err) => {
            console.log(err)
        })

        navigate('/')

    }
    return (
        
               <div className='Navigation'>
            <NavLink exact to="/all-users" >
                Utilisateurs
                
            </NavLink>
            <NavLink exact to="/profile" >
                Profil
            </NavLink>
            <NavLink exact to="/chat" >
                Chat
            </NavLink>
            <button onClick={handleLogout}><FiLogOut /></button>
          
        </div>
        
    );
};

export default Navbar;

