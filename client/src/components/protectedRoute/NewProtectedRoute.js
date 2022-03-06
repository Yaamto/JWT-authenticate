
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


const NewProtectedRoute = ({children}) => {

  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    async function getAuth() {
      const res = await fetch('http://localhost:3000/jwtid', {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await res.json()
      
      if (data.user._id) {
        setIsAuth(true)
        localStorage.setItem("id", data.user._id )
        localStorage.setItem("userInfo", data.user)
      } else {
        setIsAuth(false)
       
      }
    
    }

    getAuth()
  }, [])

  return isAuth ? children : <Navigate to='/' />

}

export default NewProtectedRoute