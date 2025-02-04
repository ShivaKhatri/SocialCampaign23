import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./advertisements.css";

const adsData = [
    {
        id: 1,
        image: "https://placehold.co/500",
        title: "Customs Clearance",
        description:
            "Experience seamless shipping with our expert customs team. No hidden fees, no delays—just hassle-free deliveries every time.",
        businessName: "Swift Logistics Co., Manila",
        supporters: 54231,
    },
    {
        id: 2,
        image: "https://placehold.co/500",
        title: "Affordable Office Rentals",
        description:
            "Discover modern office spaces tailored to startups and growing businesses with flexible leasing options and great locations.",
        businessName: "SmartWork Hubs, Singapore",
        supporters: 38765,
    },
    {
        id: 3,
        image: "https://placehold.co/500",
        title: "Legal Help",
        description:
            "Simplify legal matters with our affordable plans designed to help small businesses succeed without breaking the bank.",
        businessName: "BizLegal Solutions, Berlin",
        supporters: 45820,
    },
    {
        id: 3,
        image: "https://placehold.co/500",
        title: "Legal Help",
        description:
            "Simplify legal matters with our affordable plans designed to help small businesses succeed without breaking the bank.",
        businessName: "BizLegal Solutions, Berlin",
        supporters: 45820,
    },
    {
        id: 3,
        image: "https://placehold.co/500",
        title: "Legal Help",
        description:
            "Simplify legal matters with our affordable plans designed to help small businesses succeed without breaking the bank.",
        businessName: "BizLegal Solutions, Berlin",
        supporters: 45820,
    },
    {
        id: 3,
        image: "https://placehold.co/500",
        title: "Legal Help",
        description:
            "Simplify legal matters with our affordable plans designed to help small businesses succeed without breaking the bank.",
        businessName: "BizLegal Solutions, Berlin",
        supporters: 45820,
    },

    // Add more dummy items as needed
];



const Advertisement = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Active Section */}
                <div className="col-md-12 mb-4">
                    <div className="card">
                        <div className=" g-0">
                            <div className="">
                                <img
                                    src={adsData[activeIndex].image}
                                    className=" active-image"
                                    alt="Active"
                                />
                            </div>
                            <div className="">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        {adsData[activeIndex].title}
                                    </h5>
                                    <p className="card-text">
                                        {adsData[activeIndex].description}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {adsData[activeIndex].businessName}
                                        </small>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Section */}
                <div className="col-md-12">
                    <div className="d-flex ad-elements  overflow-auto">
                        {adsData.map((item, index) => (
                            <div
                                key={item.id}
                                className={`card me-2 ${activeIndex === index ? "border-primary" : ""
                                    }`}
                                style={{ minWidth: "150px", cursor: "pointer" }}
                                onClick={() => setActiveIndex(index)}
                            >
                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    alt={item.title}
                                />
                                <div className="card-body p-2">
                                    <p className="card-text  small" style={{ fontWeight: "bold" }}>{item.title}</p>
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
