import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section d-flex align-items-center justify-content-center bg-primary text-white">
      <div className="container text-center">
        <h1 className="display-4 fw-bold mb-4">Together for a Better Tomorrow</h1>
        <p className="lead mb-4">
          Join us in raising awareness about the issues that matter the most.
          Learn, act, and make a difference in your community today.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-primary btn-lg shadow">
            Get Involved
          </button>
          <button className="btn btn-outline-light btn-lg shadow">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

