
import React from "react";
import { useState,useEffect } from "react";
import './Users.css'
import Navbar from "../Navbar/Navbar";

const Users = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
    populateUserData();
}, []);

const contents = users.length === 0
    ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
    : <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
            <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user =>
                <tr key={user.userID}>
                    <td>{user.userID}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                </tr>
            )}
        </tbody>
    </table>;

return (
    <div>
 
 <Navbar/>
    <div className="d-flex users  flex-column items-center justify-center">
        <h1 id="tableLabel">User List</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
    </div>
    </div>
);

async function populateUserData() {
    const response = await fetch('https://localhost:53328/api/Users'); // Adjust the URL if necessary
    if (response.ok) {
        const data = await response.json();
        setUsers(data); // Assuming the API returns an array of user objects
    }
}
}
export default Users