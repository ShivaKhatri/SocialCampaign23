import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar px-4 bg-primary">
            <div className="navbar-logo">
                <Link to='/'>
                    <h3 className='text-white'>AwarenessApp</h3>
                </Link>
            </div>
            <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/post">Post</Link>
                <Link to="/suggestion">Suggestion</Link>
                <Link to="/users">Users</Link>
            </div>
            <div className="navbar-hamburger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </nav>
    );
};

export default Navbar;
