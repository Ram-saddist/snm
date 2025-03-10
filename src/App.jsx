import './App.css';
import Login from './login.jsx';
import Register from './register.jsx';
import Home from './Home';
import OTP from './otp.jsx';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import Dashboard from './dashboard.jsx';
import AddNotes from './addnotes.jsx';
import Navigation from './Navigation.jsx';
import Viewallnotes from './viewallnotes.jsx'
import Viewnotes from './viewnotes.jsx'
import Updatenotes from './updatenotes.jsx'
import Uploadfile from './uploadfile.jsx'
import Viewallfiles from './viewallfiles.jsx';
import { useEffect, useState } from 'react';

function App() {
   // Get user session from localStorage
   const [user,setUser]=useState(null)
   useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser); // Set the user from localStorage
    }
  }, []);
  return (
    <div className="main-container">
      <BrowserRouter>
        <Navigation user={user} setUser={setUser}  /> {/* Pass user info to Navigation */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/otp" element={<OTP />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/addnotes" element={<AddNotes />}></Route>
          <Route path="/viewallnotes" element={<Viewallnotes />}></Route>
          <Route path="/viewnotes/:nid" element={<Viewnotes />}></Route>
          <Route path="/updatenotes/:nid" element={<Updatenotes />}></Route>
          <Route path="/uploadfile" element={<Uploadfile />}></Route>
          <Route path="/viewallfiles" element={<Viewallfiles />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
