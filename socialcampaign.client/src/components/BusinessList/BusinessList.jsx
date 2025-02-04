import React from 'react';
import './BusinessList.css';

const BusinessList = ({ businesses, onSelectBusiness, onCreateBusiness }) => {
    //console.log(" Businesses received in BusinessList:", businesses); // Debugging log

    return (
        <div className="business-list-container">
            <h2>Your Businesses</h2>
            {businesses.length > 0 ? (
                <>
                    <div className="business-list">
                        {businesses.map((business, index) => {
                            //console.log(" Individual Business Object:", business); // Debug each business item

                            return (
                                <div key={business.businessId || index} className="business-card">
                                    <h3>{business.businessName}</h3>
                                    <p><strong>Address:</strong> {business.address}</p>
                                    <p><strong>Phone:</strong> {business.phone}</p>
                                    <p><strong>Email:</strong> {business.email}</p>
                                    <button className="create-business-btn" onClick={() => onSelectBusiness(business.businessId)}>
                                        View
                                    </button>
                                </div>
                            );
                        })}

                        <div className="business-card">
                            <p>Add Another Business</p>
                            <button className="create-business-btn" onClick={onCreateBusiness}>
                                Create a Business
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="no-businesses">
                    <p>You have not created any businesses yet.</p>
                    <button className="create-business-btn" onClick={onCreateBusiness}>
                        Create a Business
                    </button>
                </div>
            )}
        </div>
    );
};

export default BusinessList;
