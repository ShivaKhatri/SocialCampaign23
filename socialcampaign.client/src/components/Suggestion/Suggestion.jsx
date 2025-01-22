import React from "react";
import "./Suggestion.css";

const Suggestions = ({ suggestions }) => (
  <div className="card mb-3">
    <div className="card-header">Suggestions</div>
    <ul className="list-group list-group-flush">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="fs-6 suggestion d-flex align-items-center">
            <img
              src={suggestion.image}
              alt="User"
              className="rounded-circle me-2"
              style={{ width: "45px", height: "45px" }}
            />
            <div>
              <div>{suggestion.firstName}</div>
              <div className="lastName">{suggestion.lastName}</div>
              <div className="text-muted mutual-text">{suggestion.mutualConnections} mutual connection(s)</div>
            </div>
          </div>
          <span className="text-primary follow">Follow</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Suggestions;
