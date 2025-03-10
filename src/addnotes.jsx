import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './common.css'
export default function addnotes() {
    const navigate = useNavigate();
    const user=localStorage.getItem('user')
    const [addData, setAddData] = useState({
        title: "",
        desc: ""
    })
    function validateForm(e) {
        const { name, value } = e.target
        setAddData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    function handleData(e){
        e.preventDefault()
        axios.post("https://sivaramcodegnan.pythonanywhere.com/api/addnotes",{addData,user})
        .then((res)=>{
            console.log(res)
            if (res.status === 200) {
                alert("Notes added Succefully")
                navigate("/dashboard");

            }
            else{
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
        <div>
            <section className="commonsection">
                <h1 className='commoncontenth1'>Add Notes</h1>
                <div className="commoncontent">
                    <form method="POST" onSubmit={handleData}>
                        <p>Title</p>
                        <p><input type="text" placeholder="Enter the title" name="title"  className="forminput" onChange={validateForm} /></p>
                        <p>Description</p>
                        <p><textarea rows="4" cols="50" name="desc" className="forminput" onChange={validateForm}></textarea></p>
                        <p><button className="formbutton">Add</button></p>
                    </form>
                </div>
            </section>
        </div>
    )
}
