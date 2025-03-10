import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import './create.css'

export default function otp() {
    const [otpr,setOtp]=useState("")
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.data
    function handleOtp(e){
        e.preventDefault()
        console.log(otpr,userData)
        axios.post("https://sivaramcodegnan.pythonanywhere.com/api/otp",{otpr,userData})
            .then((res)=>{
                console.log(res)
                if(res.status===200){
                    alert("Registered Successful")
                    navigate("/login");
                }   
            })
            .catch((e)=>{
                if(e.status===409){
                    console.log(e.response.data)
                    alert("Wrong OTP")
                }
            })
    }
    return (
        <>
            <h1>OTP</h1>
            <div class="content">
                <form method="POST" className="formbody">
                    <p class="ptag">Enter your OTP</p>
                    <input className="inputbox" type="text" name="otp" onChange={(e)=>setOtp(e.target.value)} required />
                    <p><button type="submit" onClick={handleOtp}>submit</button></p>
                </form>
            </div>
        </>
    )
}
