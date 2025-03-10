import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './create.css'
import axios from 'axios'

export default function register() {
    const [formData,setFormData]=useState({
        user_name:"",
        email:"",
        password:"",
        confirm_password:""
    })
    const navigate = useNavigate()
    function handleRegister(e){
        const {name,value}=e.target
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    function register(e){
        e.preventDefault()
        console.log(formData)
        axios.post("http://127.0.0.1:5000/api/create",{formData})
            .then((res)=>{
                console.log(res)
                if(res.status===200){
                    alert("OTP send Successful")
                    navigate(res.data.redirect_to, { state: { data: res.data.data } });
                }   
            })
            .catch((e)=>{
                if(e.status===409){
                    console.log(e.response.data)
                    alert("Email already exists")
                }
            })
    }
   
    return (
        <div className='main'>
            <h1>Registration</h1>
            <div className="content">
                <form method="POST" class="formbody" onSubmit={register}>
                    <p className="ptag">User Name</p>
                    <p>
                        <input 
                            className="inputbox" 
                            type="text" 
                            name="user_name" 
                            required 
                            onChange={handleRegister}/>
                    </p>

                    <p className="ptag">Email</p>
                    <p>
                        <input className="inputbox" type="email" name="email" required onChange={handleRegister} />
                    </p>
                    <p className="ptag">Password</p>
                    <p>
                        <input className="inputbox" type="password" name="password" required onChange={handleRegister}/></p>

                    <p className="ptag">Confirm Password</p>
                    <p>
                        <input className="inputbox" type="password" name="confirm_password" required onChange={handleRegister}/></p>

                    <p><button type="submit" >Create</button></p>
                </form>
            </div>
          
        </div>
    )
}
