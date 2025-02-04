import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./advertisements.css";

const Advertisement = ({ ads }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    console.log("Ads received in Advertisement component:", ads); // Debugging log

    if (!Array.isArray(ads) || ads.length === 0) {
        console.log("No advertisements available.");
        return <p className="text-center">No advertisements available.</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Active Ad Display */}
                <div className="col-md-12 mb-4">
                    <div className="card">
                        <div className="g-0">
                            <div>
                                <img
                                    src={ads[activeIndex]?.imageUrl || "https://placehold.co/500"}
                                    className="active-image"
                                    alt={ads[activeIndex]?.title || "Advertisement"}
                                />
                            </div>
                            <div>
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        {ads[activeIndex]?.title || "No Title"}
                                    </h5>
                                    <p className="card-text">
                                        {ads[activeIndex]?.description || "No Description Available"}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {ads[activeIndex]?.businessName || "Unknown Business"}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ad Thumbnails */}
                <div className="col-md-12">
                    <div className="d-flex ad-elements overflow-auto">
                        {ads.map((item, index) => (
                            <div
                                key={item.businessAdId || `ad-${index}`}
                                className={`card me-2 ${activeIndex === index ? "border-primary" : ""}`}
                                style={{ minWidth: "150px", cursor: "pointer" }}
                                onClick={() => setActiveIndex(index)}
                            >
                                <img
                                    src={item.imageUrl || "https://placehold.co/500"}
                                    className="card-img-top"
                                    alt={item.title || "Ad Thumbnail"}
                                />
                                <div className="card-body p-2">
                                    <p className="card-text small" style={{ fontWeight: "bold" }}>
                                        {item.title || "No Title"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;
