import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './commontable.css'
import { Link } from 'react-router-dom';

export default function ViewAllFiles() {
    const [files, setFiles] = useState([]);
    const [fileViewUrl, setFileViewUrl] = useState(null); // To store file URL for viewing

    useEffect(() => {
        const user = localStorage.getItem('user');
        axios
            .post("http://127.0.0.1:5000/api/viewallfiles", { user })
            .then((res) => {
                setFiles(res.data.result);
            })
            .catch((e) => {
                alert("Something is wrong");
                console.log(e);
            });
    }, []);

    const handleView = (id) => {
        axios
            .post("http://127.0.0.1:5000/api/viewfile", { nid: id }, { responseType: 'blob' })
            .then((res) => {
                const fileUrl = URL.createObjectURL(new Blob([res.data]));
                setFileViewUrl(fileUrl);
            })
            .catch((e) => {
                window.alert("Failed to fetch file");
                console.log(e);
            });
    };

   const handleDownload = (id) => {
    axios
        .post("http://127.0.0.1:5000/api/downloadfile", { nid: id }, { responseType: 'blob' })
        .then((res) => {
            // Create a URL for the blob object
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;

            // Get the filename from the content-disposition header (if provided)
            const contentDisposition = res.headers['content-disposition'];
            let filename = 'downloaded_file';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch.length > 1) {
                    filename = filenameMatch[1];
                }
            }
            link.setAttribute('download', filename);
            
            // Append the link to the body and trigger download
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch((e) => {
            alert("Failed to Download file");
            console.log(e);
        });
};


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            axios
                .post("http://127.0.0.1:5000/api/deletefile", { nid: id })
                .then((res) => {
                    alert("File deleted successfully!");
                    setFiles((prevFiles) => prevFiles.filter((file) => file.fid !== id));
                })
                .catch((e) => {
                    alert("Failed to delete the file.");
                    console.log(e);
                });
        }
    };

    return (
        <div className="tablesection">
            <h1 className="tablecontenth1">View All Files</h1>
            <table border="1px" className="tablebody">
                <thead>
                    <tr>
                        <th>File ID</th>
                        <th>File Name</th>
                        <th>Created At</th>
                        <th>View</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.fid}>
                            <td>{file.fid}</td>
                            <td>{file.filename}</td>
                            <td>{file.created_at}</td>
                            <td>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleView(file.fid);
                                    }}
                                >
                                    View
                                </a>
                            </td>
                            <td>
                               <a href='#' onClick={(e)=>{e.preventDefault();
                                                          handleDownload(file.fid);  
                                                          }}>Download</a>
                            </td>
                            <td>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(file.fid);
                                    }}
                                >
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {fileViewUrl && (
                <div>
                    <h2>File Preview</h2>
                    <iframe src={fileViewUrl} width="600" height="400" title="File Preview"></iframe>
                    <button onClick={() => setFileViewUrl(null)}>Close Preview</button>
                </div>
            )}
        </div>
    );
}
