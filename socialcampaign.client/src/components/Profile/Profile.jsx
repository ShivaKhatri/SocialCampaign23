import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
const Profile = ({ user }) => (
    <div
        className="card text-center mb-3"
        style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            overflow: "hidden",
            maxWidth: "300px",
            margin: "0 auto",
        }}
    >
        {/* Top background section */}
        <div
            style={{
                backgroundColor: user.bgColor || "#0d6efd", // Customizable background color
                height: "100px",
                position: "relative",
            }}
        >
            {/* Profile image */}
            <img
                src={user.image}
                alt="Profile"
                className="rounded-circle"
                style={{
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                    bottom: "-50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: "5px solid white",
                }}
            />
        </div>

        {/* Card body */}
        <div className="card-body" style={{ marginTop: "35px" }}>
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.role}</p>
           <Link to='/user-profile'>
          
                <button className="btn  btn-outline-primary" >
                    View Profile
                </button>
                </Link>
            
        </div>
    </div>
);

export default Profile;
