import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
export default function Navigation({ user }) {
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear session data
    window.location.href = "/"; // Redirect to home page
  };
  function navigateTo(url) {
    if (url && url !== "#") {
      window.location.href = url;
    } else {
      alert("This option is currently unavailable.");
    }
  }
  

  return (
    <div>
      <nav>
        {!user ? (
          <div className="navbar">
            <Link to="/" className="a1">Home</Link>
            <Link to="/register" className="a1">Register</Link>
            <Link to="/login" className="a2">Login</Link>
          </div>
        ) : (
          <div className="dashnav">
            {/* Display additional options when logged in */}
            <Link to="/dashboard" className="a1">Home</Link>

            {/* Select for Notes */}
            <select name="notes" id="notes" onChange={(e) => navigateTo(e.target.value)}>
              <option value="">Select Notes</option>
              <option value="/addnotes">Add Notes</option>
              <option value="/viewallnotes">View All Notes</option>
            </select>

            {/* Select for Files */}
            <select name="files" id="files" onChange={(e) => navigateTo(e.target.value)}>
              <option value="">Select Files</option>
              <option value="/uploadfile">Upload File</option>
              <option value="/viewallfiles">View All Files</option>
            </select>
            
            {user}

            {/* Logout Button */}
            <Link onClick={handleLogout}>Logout</Link>
            <i className="fa-regular fa-user"></i>
          </div>
        )}
      </nav>
    </div>
  );
}

