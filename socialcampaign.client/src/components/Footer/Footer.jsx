import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer  text-center py-2">
      <div className="container">
        {/* Social Media Icons */}
        <div className="mb-3">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
          </a>
        </div>

        {/* Copyright Text */}
        <div className="">
          <FontAwesomeIcon icon={faCopyright} /> 2025 AwarenessApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
