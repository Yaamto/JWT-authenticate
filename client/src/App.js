import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import NewProtectedRoute from './components/protectedRoute/NewProtectedRoute';

import Home from './page/Home';
import Profile from './page/Profile';
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
            
          
          {/* <Route path="/all-users" element={<Users/>}></Route> */}

        </Routes>
      </Router>
  </>
  );
}

export default App;
