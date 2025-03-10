import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom';
import './commontable.css'

export default function viewallnotes() {
    const [notes,setnotes]=useState([]);
    useEffect(()=>{
        const user=localStorage.getItem('user')
        axios.post("https://sivaramcodegnan.pythonanywhere.com/api/viewallnotes",{user})
        .then((res)=>{
            setnotes(res.data.result);
        })
        .catch((e)=>{
            alert("something is wrong")
            console.log(e)
        })
    },[]);

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this note?")) {
          axios
              .post("https://sivaramcodegnan.pythonanywhere.com/api/deletenote", { nid: id })
              .then((res) => {
                  alert("Note deleted successfully!");
                  // Filter out the deleted note from the state
                  setnotes((prevNotes) => prevNotes.filter((note) => note.n_id !== id));
            
              })
              .catch((e) => {
                  alert("Failed to delete the note.");
                  console.log(e);
              });
      }
  };

  return (
       <div className="tablesection">
      <h1 className="tablecontenth1">View All Notes</h1>
      <table border="1px" className="tablebody">
        <thead>
          <tr>
            <th>Notes_id</th>
            <th>Title</th>
            <th>Created_At</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.n_id}>
              <td>{note.n_id}</td>
              <td>{note.title}</td>
              <td>{note.create_at}</td>
              <td>
                <Link to={`/Viewnotes/${note.n_id}`}>View</Link>
              </td>
              <td>
              <Link to={`/updatenotes/${note.n_id}`}>Update</Link>
              </td>
              <td>
              <a href="#" onClick={(e) => {
                                        e.preventDefault(); // Prevent default anchor behavior
                                        handleDelete(note.n_id);
                                    }}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


