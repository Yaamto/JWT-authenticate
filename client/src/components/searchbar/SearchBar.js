import React, { useEffect, useState } from 'react';
import {AiOutlineSearch} from "react-icons/ai"
import "./searchbar.css"

const SearchBar = ({users}) => {

    const [query, setQuery] = useState()


    return (
        <div className='search text-center'>
            <input type="text" placeholder='Search...' onChange={(e) => setQuery(e.target.value)} class="searchbar"/>
            <div className='test'>
            <AiOutlineSearch />
            </div>
            
            <div className="list-items text-center">
            {
            
                users.filter((user) => user.userName.toLowerCase().includes(query)).map((user, i) => {
                    if(query !==""){
                    return <p className="text-center search-item" key={i}>{user.userName}</p>
                    }else{
                        return ""
                    }
                    
                })
            }
            </div>
        </div>
    );
};

export default SearchBar;