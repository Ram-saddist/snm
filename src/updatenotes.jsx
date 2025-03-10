import React, { useState, useEffect } from "react";
import axios from "axios";
import './common.css'
import { useParams,useNavigate } from "react-router-dom";

export default function UpdateNotes() {
    const { nid } = useParams(); 
    const navigate = useNavigate();
    const [notes, setNotes] = useState(null); // Store fetched note data
    const [updateData, setUpdateData] = useState({
        title: "",
        desc: ""
    });

    // Fetch note data
    useEffect(() => {
        axios
            .get(`https://sivaramcodegnan.pythonanywhere.com/api/updatenotes?nid=${nid}`)
            .then((res) => {
                console.log(res.data);
                const fetchedNote = res.data.note;
                setNotes(fetchedNote);
                setUpdateData({
                    title: fetchedNote.title,
                    desc: fetchedNote.description
                });
            })
            .catch((e) => {
                alert("Something went wrong while fetching the note.");
                console.log(e);
            });
    }, [nid]);

    // Handle form input changes
    function validateForm(e) {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    // Handle form submission to update note
    function handleUpdate(e) {
        e.preventDefault(); // Prevent default form submission behavior
        axios
            .post("https://sivaramcodegnan.pythonanywhere.com/api/updatenotes", {
                nid: nid,
                updateData: updateData
            })
            .then((res) => {
                alert("Note updated successfully!");
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch((e) => {
                alert("Failed to update the note.");
                console.log(e);
            });
    }

    if (!notes) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <section className="commonsection">
                <h1 className="commoncontenth1">Update Notes</h1>
                <div className="commoncontent">
                    <form onSubmit={handleUpdate}>
                        <p>Title</p>
                        <p>
                            <input
                                type="text"
                                name="title"
                                className="forminput"
                                value={updateData.title}
                                onChange={validateForm}
                            />
                        </p>
                        <p>Description</p>
                        <p>
                            <textarea
                                rows="4"
                                cols="50"
                                name="desc"
                                className="forminput"
                                value={updateData.desc}
                                onChange={validateForm}
                            ></textarea>
                        </p>
                        <p>
                            <button  className="formbutton" type="submit">Update</button>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
}

