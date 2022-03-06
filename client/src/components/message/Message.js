import React, { useEffect, useState } from 'react';
import axios from "axios"
import "./message.css"
import io from "socket.io-client"



// const ENDPOINT = "http://localhost:3000";
// var socket, selectChatCompare;

const Message = ({messages, selectedChat, setMessages, socket, socketConnection, setsocketConnection, typing, setTyping, isTyping}) => {

    const userData = localStorage.getItem("id")
    const [msgContent, setMsgContent] = useState()
    
    

    console.log(messages)
    console.log(selectedChat)



  
    const typingHandler =(e) => {
        e.preventDefault()
        setMsgContent(e.target.value)

        if(!socketConnection) return;

        if(!typing) {
            setTyping(true)
            socket.emit("typing", selectedChat)
        }

        let lastTypingTime = new Date().getTime()
        var timerLength = 3000;
        setTimeout(() =>{
            var timeNow = new Date().getTime()

            var timeDiff = timeNow - lastTypingTime

            if(timeDiff >= timerLength && typing){
                socket.emit('stop typing', selectedChat)
                setTyping(false)
            }

        }, timerLength)

    }
    
    const sendMessage = (e) => {
        socket.emit("stop typing", selectedChat)
        e.preventDefault()
        axios({
            method:"post",
            url:"http://localhost:3000/message",
            withCredentials:true,
            data: {
                content: msgContent,
                chatId: selectedChat
               
            },
            headers : {
                'Access-Control-Allow-Credentials' : true,
                
            }
            
        })
        .then((res) => {
            
            console.log(res)

                
                socket.emit('new message', res.data)
                const newMessages = [...messages]               
                newMessages.push(res.data)            
                 setMessages(newMessages)
                 
                 setMsgContent("")
                
               
            
    })
}

   if(messages.length === 0){
       return  <div className="message-chat">
           <h1>Pas encore de message</h1>
           <input type="text" name="" id="" placeholder='Write something ...' onChange={(e) =>setMsgContent(e.target.value)} value={msgContent}/>
                <button onClick={(e) => sendMessage(e)}>Envoyer</button>
           </div>
   }else{
    return (
        <div>
            <div className="message-chat">
                {console.log(messages)}
                    
                {messages.map((msg, i) => {
                   
                    const date = new Date(msg.createdAt)
                        var myMsg = false
                       console.log(msg)
                    if(msg.sender._id === localStorage.getItem('id')){
                        myMsg = true
                    }else {
                        myMsg =false
                    }

                        return <div key={i} className={`Msg ${myMsg ? "myMsg-right" :"Msg-left" }`}>
                             <p  className={`singleMessage ${myMsg ? "myMsg" :"senderMsg" }`}><span className='sender-name'>{myMsg ? "moi : ": msg.sender.userName + " : "}</span>{msg.content}</p> 
                                <p className='send-date'>{date.toLocaleTimeString("fr")} - </p>
                                <p className='send-date'>{date.toLocaleDateString("fr")}</p>
                        </div>
                        
                  
                    
                })}
                {isTyping ? <div>Typing...</div> :(<></>)}
                <input type="text" name="" id="" placeholder='Write something ...' onChange={(e) =>typingHandler(e)} value={msgContent}/>
                <button onClick={(e) => sendMessage(e)}>Envoyer</button>
            </div>
        </div>
    );
            }    
};

export default Message;