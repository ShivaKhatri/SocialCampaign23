import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(getAllUsers);
                if (!response.ok) {
                    throw new Error("Network response la not ok");
                }
                const data = await response.json();
                setUsers(getAllUsers);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchUsers();
    }, []);


    if (error) {
        return <div>Errorssssss: {error}</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            {users.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userID}>
                                <td>{user.userID}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
