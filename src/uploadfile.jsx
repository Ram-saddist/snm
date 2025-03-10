import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './common.css'

export default function uploadfile() {
  const [file, setFile] = useState();
  const navigate =useNavigate()
  const id = localStorage.getItem('user')
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  function handleFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file);
    axios.post("https://sivaramcodegnan.pythonanywhere.com/api/uploadfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          alert("File added Succefully")
          navigate("/dashboard");

        }
        else {
          alert("something is wrong")
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 409) {
          alert("Duplicate Entry");
          navigate("/dashboard");
          console.log(e.response.data);
        }
      });
  }
  return (
    <section className="commonsection">
      <h1 className="commoncontenth1">Upload File</h1>
      <div className="commoncontent">
        <form method="POST" encType="multipart/form-data">
          <p>File</p>
          <p><input type="file" name="file" className="forminput" accept=".jpg, .png, .pdf, .txt, .docx" onChange={handleFileChange} required/></p>
          <p><button className="formbutton" onClick={handleFile}>Add File</button></p>
        </form>
      </div>
    </section>
  )
}
