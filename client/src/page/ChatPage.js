import React, { useEffect, useState } from 'react';
import axios from "axios"
import io from "socket.io-client"
import "./chatpage.css"
import Message from '../components/message/Message';

const ENDPOINT = "http://localhost:3000";
var socket, selectChatCompare;

const ChatPage = () => {
  

    const [chatList, setChatList] = useState([])
    const [userId, setUserId] = useState()
    const [query, setQuery] = useState("")
    const [usersList, setUsersList] = useState([])
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState([])
    const [selectedChat, setSelectedChat] = useState()
    const [socketConnection, setsocketConnection] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", localStorage.getItem("id"))
        socket.on('connected', () =>  setsocketConnection(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, [])

    useEffect(() => {
        getMessage(selectedChat)
        selectChatCompare = selectedChat
    }, [selectedChat])


    useEffect(() =>{
        
        socket.on("message recieved", (newMessageRecieved) => {
            if(!selectChatCompare || selectChatCompare !== newMessageRecieved.chat._id){

                
            }else {
                console.log("problème " + newMessageRecieved.content)
                const newMessages = [...msg]               
                newMessages.push(newMessageRecieved)            
                setMsg(newMessages)
                
                console.log(msg)
            }
        })
    })
    
   


 const deleteChat = async(id, e, i) => {
     e.preventDefault()
     const res = await fetch('http://localhost:3000/chat/delete/'+id, {
            method:"delete",
            headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            })
            const data = await res.json()
            console.log("test")
            const newChatList = [...chatList]   
            newChatList.splice(i, 1)   
            setChatList(newChatList)
 }
    const getMessage = async(id, e) => {

        e.preventDefault()
      

              axios({
                method:"get",
                url:'http://localhost:3000/message/'+id,
                withCredentials:true,
                headers : {
                    'Access-Control-Allow-Credentials' : true,
                    
                }
                
            })
            .then((res) => {
                console.log(res.data)
                setMsg(res.data)
                setSelectedChat(id)
                socket.emit("join chat", id)
                console.log(id)
              
    })
}
 
    useEffect(() => {

        
        

        const getChat = async() => {
            
        const res = await fetch('http://localhost:3000/chat/', {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          
          const data = await res.json()
          console.log(data)
          setChatList(data)
          
        }
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

        getChat()
        getUsers()
    },[])

    const addChat = async(id, e) => {
        e.preventDefault()
        axios({
            method:"post",
            url:"http://localhost:3000/chat",
            withCredentials:true,
            data: {
                userId: id
               
            },
            headers : {
                'Access-Control-Allow-Credentials' : true,
                
            }
            
        })
        .then((res) => {
            
            if(res.data.isExist){
                console.log("pas possible")
            }else {
                const newChatList = [...chatList]               
                newChatList.push(res.data)            
                setChatList(newChatList)
               
            }
          
        //   newChatList.push(data)
          
        //   const NewChatList = [...chatList]
        //   NewChatList.push()
        })

        setShow(false)
    }

    

   
    return (
        <div >

            <div className="addChat">
                <input type="text" id="newChat" name="newChat" onChange={(e) => setUserId(e.target.value)} value={userId} onFocus={(e) =>setShow(true)} autoComplete="off" />
                <div className={`chat-user-list ${show ? "" :"hide" }`}>
                    {usersList.map((user, i) => {
                        return <p key={i} className='user-chat' onClick={(e) => addChat(user._id, e)}>{user.userName}</p>
                    })}
                </div>

                
            </div>
            <div className="chat-page">
            <div className="chat-list" onClick={(e) => setShow(false)}>
                
                {chatList.map((chat, i) => {
                    var chatName = ""
                    chat.users.map((user) => {
                        if(user._id !== localStorage.getItem("id")){
                           return  chatName = user.userName
                        } else return console.log("probleme")
                    })
                    if(chat.latestMessage){
                    return <div className="chat-card" key={i} onClick={(e) =>getMessage(chat._id,e)}>
                        <p className='chatName' >{chatName} :</p>
                        <p>{chat.latestMessage.content}</p>
                        <button className='delete-chat' onClick={(e) => deleteChat(chat._id, e, i)}>X</button>
                        
                    </div>
                    } else {
                        return <div className="chat-card" key={i} onClick={(e) => getMessage(chat._id, e)}>
                            <p className='chatName' >{chatName} : </p>
                            <p>cliquez pour envoyer votre message</p>
                            <button className='delete-chat' onClick={(e) => deleteChat(chat._id, e, i)}>X</button>
                        
                            
                        </div>
                        
                      
                    }
                    
                })
                
                }
               
                
                
            </div>
            <Message messages={msg} selectedChat={selectedChat} setMessages={setMsg} socket={socket} socketConnection={socketConnection} 
            setsocketConnection={setsocketConnection} typing={typing} setTyping={setTyping} isTyping={isTyping} 
            />
            
            </div>

            
                
                
            
        </div>
    );
};

export default ChatPage;