import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import './common.css'

export default function viewnotes() {
    const [notes,setnotes]=useState([]);
    const {nid}=useParams()
    
    useEffect(()=>{
        axios.post("https://sivaramcodegnan.pythonanywhere.com/api/viewnotes",{nid})
        .then((res)=>{
            setnotes(res.data.notes);
        })
        .catch((e)=>{
            alert("something is wrong")
            console.log(e)
        })
    },[]);
    return (
        <section className='commonsection'>
            <div className="commoncontent"> 
                <form method="POST">
                    <h2>Title:</h2>
                    <p className="forminput">{notes[1]}</p>
                    <h2>Description</h2>
                    <p>{notes[2]}</p>
                    <p className="forminput">Created At:{notes[3]}</p>
                </form>
            </div>
        </section>
    )
}
