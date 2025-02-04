import React, { useState, useEffect } from "react";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAdsByBusinessId, createBusinessAd, deleteBusinessAd } from "../../services/businessAdService";
import CreateAdvertisement from "../Advertisement/createAdvertisement"; // Import Advertisement component
import "./AdsManager.css";

const AdsManager = ({ businessId }) => {
    const [ads, setAds] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", image: null });
    const [activeTab, setActiveTab] = useState("showAds");
    const [loading, setLoading] = useState(true);
    const [selectedAd, setSelectedAd] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!businessId) return;

        const fetchAds = async () => {
            try {
                const fetchedAds = await getAdsByBusinessId(businessId);
                setAds(fetchedAds);
                setActiveTab(fetchedAds.length > 0 ? "showAds" : "postAd");
            } catch (error) {
                console.error("Error fetching ads:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [businessId]);

    // Handle form inputs
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    // Refresh ads after update and update the selectedAd if it's the one being updated
    const handleUpdateSuccess = async () => {
        const updatedAds = await getAdsByBusinessId(businessId);
        setAds(updatedAds);

        // If the currently viewed ad was updated, update its data in the modal
        if (selectedAd) {
            const updatedAd = updatedAds.find(ad => ad.businessAdId === selectedAd.businessAdId);
            if (updatedAd) {
                setSelectedAd(updatedAd);
            }
        }
    };


    // Submit new ad
    const handlePostAd = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.image) {
            toast.warn("All fields are required!", { position: "top-center", autoClose: 1500 });
            return;
        }

        try {
            const newAd = await createBusinessAd(businessId, formData);
            setAds([...ads, newAd]);
            toast.success("Ad posted successfully!", { position: "top-center", autoClose: 1500 });

            // Reset form fields
            setFormData({ title: "", description: "", image: null });

            // Clear file input manually
            document.getElementById("image").value = "";

            setActiveTab("showAds");
        } catch (error) {
            toast.error("Failed to create ad!", { position: "top-center", autoClose: 1500 });
        }
    };

    // Delete Ad with Confirmation Prompt
    const handleDeleteAd = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ad? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            await deleteBusinessAd(id);
            setAds(ads.filter((ad) => ad.businessAdId !== id));
            toast.success("Ad deleted successfully!", { position: "top-center", autoClose: 1500 });
        } catch (error) {
            toast.error("Failed to delete ad!", { position: "top-center", autoClose: 1500 });
        }
    };

    // Open Advertisement Modal and fetch updated ad details
    const handleViewAd = async (ad) => {
        try {
            // Fetch the latest version of the ad from the backend
            const latestAdData = ads.find(a => a.businessAdId === ad.businessAdId) || ad;
            setSelectedAd(latestAdData);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching updated ad:", error);
            setSelectedAd(ad); // Fallback to current ad if fetch fails
            setShowModal(true);
        }
    };


    // Close Modal and Reset Selected Ad
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAd(null);
        toast.dismiss(); // Dismiss any lingering toasts
    };

    return (
        <div className="container ads-container-b">
            <ToastContainer />
            <div className="ads-heading-b">
                <h3>Manage Ads</h3>
            </div>

            <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} id="ads-tabs" className="mb-3 mt-2">
                {ads.length === 0 ? (
                    <Tab eventKey="noAds" title="No Ads Found">
                        <div className="text-center mt-4">
                            <h5>No ads created yet.</h5>
                            <p>Create an ad for your business.</p>
                            <Button variant="primary" onClick={() => setActiveTab("postAd")}>
                                Create Ad
                            </Button>
                        </div>
                    </Tab>
                ) : (
                    <Tab eventKey="showAds" title={`Show Ads (${ads.length})`}>
                        <div className="d-flex flex-column gap-3 mt-3">
                            {ads.map((ad) => (
                                <div
                                    key={`ad-${ad.businessAdId}`} // Ensure unique key
                                    className="border mx-2 border-dark rounded p-3 d-flex justify-content-between align-items-center"
                                >
                                    {/* Title */}
                                    <h5 className="mb-0">{ad.title}</h5>

                                    {/* Buttons & Status */}
                                    <div className="d-flex gap-2">
                                        {/* Pending Status Button */}
                                        <span
                                            className={`btn btn-sm fw-bold ${ad.status === "Pending"
                                                ? "btn-warning text-dark"
                                                : ad.status === "Approved"
                                                    ? "btn-success"
                                                    : "btn-danger"
                                                }`}
                                            style={{
                                                cursor: "default", // Makes it non-clickable
                                                minWidth: "80px", // Ensures a uniform size
                                            }}
                                        >
                                            {ad.status}
                                        </span>

                                        {/* View Button */}
                                        <Button variant="secondary" size="sm" onClick={() => handleViewAd(ad)}>
                                            View
                                        </Button>

                                        {/* Delete Button */}
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteAd(ad.businessAdId)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab>
                )}

                <Tab eventKey="postAd" title="Post Ad">
                    <form onSubmit={handlePostAd}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" value={formData.title} onChange={handleFormChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="4" value={formData.description} onChange={handleFormChange}></textarea>
                        </div>
                        <input type="file" className="form-control" id="image" onChange={handleFileChange} />
                        <button type="submit" className="btn btn-primary mt-3">Post Ad</button>
                    </form>
                </Tab>
            </Tabs>

            {/* MODAL FOR VIEWING & EDITING ADS */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Advertisement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAd && <CreateAdvertisement adData={selectedAd} onUpdateSuccess={handleUpdateSuccess} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdsManager;
