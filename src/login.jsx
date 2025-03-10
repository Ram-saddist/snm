import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './create.css';
import axios from 'axios';
import Dashboard from './dashboard';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",      
  });

  function loginForm(e) {
    e.preventDefault();
    console.log(formData);
    axios
      .post("https://sivaramcodegnan.pythonanywhere.com/api/login", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.alert("Login Successful");
          localStorage.setItem('user', res.data.user); // Store user in localStorage
          navigate("/dashboard");
          window.location.reload()
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          window.alert("Invalid Credentials");
          console.log(e.response.data);
        }
      });
  }

  function validateForm(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className='main'>
      <h1>Login</h1>
      <div className="content">
        <form method="POST" className="formbody" onSubmit={loginForm}>
          <p className="ptag">Email</p>
          <input
            className="inputbox"
            type="email"
            name="email"
            required
            onChange={validateForm}
          />

          <p className="ptag">Password</p>
          <input
            className="inputbox"
            type="password"
            name="password"
            required
            onChange={validateForm}
          />
          <p>
            <button type="submit">Login</button>
          </p>
        </form>
      </div>
    </div>
  );
}
