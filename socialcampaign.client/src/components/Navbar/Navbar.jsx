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
                <Link to='/home'>
               
                <h3  className='text-white'>AwarenessApp</h3>
                </Link>
            </div>
            <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                <a href="#compaigns">Campaigns</a>
                <a href="#business-advertisements">Business Advertisements</a>
                <a href="#contact">Contact</a>
                <a href="/">Logout</a>
            </div>
            <div className="navbar-hamburger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </nav>
    );
};

export default Navbar;