
const moment = require('moment')
const fs = require('fs')

const path = "/Users/bilal/log.txt"

const deleteUserLog = (userDeleted, currentUser) => {
  
    const content = "\n\n["+moment().format("DD/MM/YYYY, HH:mm:ss ")+"]"+" User --"+ userDeleted.userName + "-- deleted by " + currentUser.userName
            
            fs.appendFile(path, content, err => {
                if (err) {
                    console.error(err)
                    return
                }else {
                    console.log("File written successfully\n");
                }
                //file written successfully
            })

}

const userConnected = (user) =>{
    const content = "\n\n["+moment().format("DD/MM/YYYY, HH:mm:ss ")+"]"+" User : "+ user.userName + " is connected"
    fs.appendFile(path, content, err => {
        if (err) {
            console.error(err)
            return
        }else {
            console.log("File written successfully\n");
        }
        //file written successfully
    })
}

const userDisconnected =(user)=> {
    const content = "\n\n["+moment().format("DD/MM/YYYY, HH:mm:ss ")+"]"+" User : "+ user.userName + " disconnected"
    fs.appendFile(path, content, err => {
        if (err) {
            console.error(err)
            return
        }else {
            console.log("File written successfully\n");
        }
        //file written successfully
    })
}

const visitedUser =(userVisited, currentUser) => {
    const content = "\n\n["+moment().format("DD/MM/YYYY, HH:mm:ss ")+"]"+" User --"+ userVisited.userName + "-- visited by " + currentUser.userName
            
            fs.appendFile(path, content, err => {
                if (err) {
                    console.error(err)
                    return
                }else {
                    console.log("File written successfully\n");
                }
                //file written successfully
            })
}

const userEditedBy = (userEdited, currentUser) => {
    const content = "\n\n["+moment().format("DD/MM/YYYY, HH:mm:ss ")+"]"+" User --"+ userEdited.userName + "-- edited by " + currentUser.userName
    fs.appendFile(path, content, err => {
        if (err) {
            console.error(err)
            return
        }else {
            console.log("File written successfully\n");
        }
        //file written successfully
    })

}

module.exports = {
    deleteUserLog,
    userConnected,
    userDisconnected,
    visitedUser,
    userEditedBy
}