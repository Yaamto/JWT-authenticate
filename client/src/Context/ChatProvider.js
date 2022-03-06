import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext()

const ChatProvider =({children}) => {
  
    
   
    return(
        <ChatContext.Provider >{children}</ChatContext.Provider>
    )
}
// export const chatState = () => {
//     return useContext(ChatContext)
// }

export default ChatProvider