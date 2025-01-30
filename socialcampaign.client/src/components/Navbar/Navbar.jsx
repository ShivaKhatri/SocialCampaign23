import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext); // Access login status and logout function

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">AwarenessApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Use NavLink to highlight the active link */}
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/home"
                                activeClassName="active" // This will add 'active' class when the link is active
                                exact // Ensure it applies only to the exact route
                            >
                                Home
                            </NavLink>
                        </li>

                        {/* Conditionally render links based on login status */}
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/user-profile"
                                        activeClassName="active"
                                    >
                                        User Profile
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/business-profile"
                                        activeClassName="active"
                                    >
                                        Business Profile
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={logout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    activeClassName="active"
                                >
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
