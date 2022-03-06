import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import NewProtectedRoute from './components/protectedRoute/NewProtectedRoute';
import ChatPage from './page/ChatPage';

import Home from './page/Home';
import Profile from './page/Profile';
import UserProfil from './page/UserProfil';
import Users from './page/Users';


//import logo from './logo.svg';
//import './App.css';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
          


          </Route>
          <Route path="/user/:id"
            element={
              <NewProtectedRoute>
                <Navbar />
                 <UserProfil />             
              </NewProtectedRoute>
            }
        />

          <Route path="/all-users"
            element={
              <NewProtectedRoute>
                <Navbar />
                <Users />               
              </NewProtectedRoute>
            }
        />
         <Route path="/profile"
            element={
              <NewProtectedRoute>
                <Navbar />
                <Profile />               
              </NewProtectedRoute>
            }
        />
         <Route path="/chat"
            element={
              <NewProtectedRoute>
                <Navbar />
                <ChatPage />               
              </NewProtectedRoute>
            }
        />
            
          
          {/* <Route path="/all-users" element={<Users/>}></Route> */}

        </Routes>
      </Router>
  </>
  );
}

export default App;
