// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar({ isAuthenticated, onLogout }) {
//     return (
//         <nav style={{ backgroundColor: "blue", padding: "10px", color: "white" }}>
//             {isAuthenticated ? (
//                 <>
//                     <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
//                     <select style={{ marginRight: "10px" }}>
//                         <option value="">Select Notes</option>
//                         <option value="note1">Note 1</option>
//                         <option value="note2">Note 2</option>
//                     </select>
//                     <select style={{ marginRight: "10px" }}>
//                         <option value="">Select Files</option>
//                         <option value="file1">File 1</option>
//                         <option value="file2">File 2</option>
//                     </select>
//                     <button onClick={onLogout} style={{ backgroundColor: "white", color: "blue", border: "none" }}>Logout</button>
//                 </>
//             ) : (
//                 <>
//                     <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
//                     <Link to="/login" style={{ color: "white", marginRight: "10px" }}>Login</Link>
//                     <Link to="/register" style={{ color: "white", marginRight: "10px" }}>Register</Link>
//                 </>
//             )}
//         </nav>
//     );
// }

// export default Navbar;
