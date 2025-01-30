import React, { useState } from "react";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdsManager.css";

const AdsManager = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      image: "https://placehold.co/200x250/png",
      title: "Winter Sale!",
      category: "Seasonal Offers",
      views: "300",
      clicks: "100",
      description: "Get up to 50% off on all winter clothing. Limited time offer!",
    },
    {
      id: 2,
      image: "https://placehold.co/200x250/png",
      title: "Summer Clearance",
      category: "Seasonal Offers",
      views: "450",
      clicks: "180",
      description: "Enjoy discounts up to 70% on summer collections. Shop now!",
    },
    {
      id: 3,
      image: "https://placehold.co/200x250/png",
      title: "Tech Fest",
      category: "Electronics",
      views: "700",
      clicks: "300",
      description: "Get exclusive deals on the latest gadgets and accessories!",
    },
    {
      id: 4,
      image: "https://placehold.co/200x250/png",
      title: "Back-to-School Sale",
      category: "Education",
      views: "520",
      clicks: "230",
      description: "Up to 40% off on school supplies, backpacks, and more!",
    },
    {
      id: 5,
      image: "https://placehold.co/200x250/png",
      title: "Luxury Watch Deals",
      category: "Luxury",
      views: "320",
      clicks: "120",
      description: "Save big on premium watches from top brands. Limited stock!",
    },
    {
      id: 6,
      image: "https://placehold.co/200x250/png",
      title: "Fitness Gear Sale",
      category: "Health & Fitness",
      views: "640",
      clicks: "260",
      description: "Grab your favorite fitness equipment and accessories at 30% off!",
    },
    {
      id: 7,
      image: "https://placehold.co/200x250/png",
      title: "Home Makeover Discounts",
      category: "Home & Living",
      views: "410",
      clicks: "180",
      description: "Renovate your space with furniture and decor at discounted prices.",
    },
    {
      id: 8,
      image: "https://placehold.co/200x250/png",
      title: "Travel Essentials Sale",
      category: "Travel",
      views: "550",
      clicks: "250",
      description: "Get ready to travel with special deals on luggage and accessories.",
    },
    {
      id: 9,
      image: "https://placehold.co/200x250/png",
      title: "Flash Friday Deals",
      category: "Flash Sales",
      views: "820",
      clicks: "350",
      description: "One day only! Don't miss discounts up to 80% on select items.",
    },
    {
      id: 10,
      image: "https://placehold.co/200x250/png",
      title: "Gadget Giveaway Week",
      category: "Electronics",
      views: "670",
      clicks: "290",
      description: "Win amazing gadgets by participating in our giveaway. Join now!",
    },
    
  ]);

  const [formData, setFormData] = useState({
    id: null,
    image: "",
    title: "",
    category: "",
    description: "",
  });
  const [adsData, setAdsData] = useState({
    id: null,
    image: "",
    title: "",
    category: "",
    description: "",
  });


  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handlePostAd = (e) => {
    e.preventDefault();
    if (!adsData.image || !adsData.title || !adsData.category || !adsData.description) {
      toast.warn("All fields are required", { position: "top-center", autoClose: 1500 });
      return;
    }
   
    toast.success("Ad posted successfully!", { position: "top-center", autoClose: 1500 });
  };

  const openAdDetails = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
    setIsEditing(false);
  };

  const openEditAd = (ad) => {
    setFormData(ad);
    setSelectedAd(ad);
    setShowModal(true);
    setIsEditing(true);
  };

  const handleEditAd = (e) => {
    if (!formData.image || !formData.category || !formData.title || !formData.description) {
      toast.error("All fields are required. Changes are not saved.", {
              position: "top-center",
              autoClose: 1500,
            });
            e.preventDefault();
            return;

    }
   
    e.preventDefault();
    setAds(
      ads.map((ad) => (ad.id === formData.id ? { ...formData } : ad))
    );
    setShowModal(false);
    toast.success("Ad updated successfully!", { position: "top-center", autoClose: 1500 });
  };

  const closeAdDetails = () => {
    setShowModal(false);
    setSelectedAd(null);
    setIsEditing(false);
  };

  return (
    <div className="container ads-container-b">
      <ToastContainer />
      <div className="ads-heading-b">
        <h3>Manage Ads</h3>
      </div>
      <Tabs defaultActiveKey="showAds" id="ads-tabs" className="mb-3 mt-2">
      <Tab eventKey="showAds" className="show-ads-tab" title={`Show Ads (${ads.length})`}>
  <div className="d-flex flex-column gap-3 mt-3">
    {ads.length > 0 ? (
      ads.map((ad) => (
        <div key={ad.id} className="d-flex border mx-2 border-dark rounded p-2  justify-content-between gap-2 align-items-center">
          <div className="flex-grow-1">
            <h5 className="mb-0">{ad.title}</h5>
          
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="secondary"
              onClick={() => openAdDetails(ad)}
            >
              View
            </Button>
            <Button
              variant="primary"
              onClick={() => openEditAd(ad)}
            >
              Edit
            </Button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-muted">No ads posted yet.</p>
    )}
  </div>
</Tab>

        <Tab eventKey="postAd" title="Post Ad">
          <form onSubmit={handlePostAd}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                value={adsData.image}
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
               value={adsData.title}
      
                placeholder="Enter ad title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
               value={adsData.category}
                
                placeholder="Enter category"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                value={adsData.description}
               
                placeholder="Enter ad description"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Post Ad</button>
          </form>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={closeAdDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Ad" : selectedAd?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <form onSubmit={handleEditAd}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleFileChange}
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="img-fluid mt-2" />
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={formData.title}
                  onChange={handleFormChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={formData.category}
                  onChange={handleFormChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          ) : (
            <>
              <img
                src={selectedAd?.image}
                alt={selectedAd?.title}
                className="img-fluid mb-3"
                style={{height: '250px',width:'100%',objectFit:'cover'}}
              />
              <p>
                <strong>Category:</strong> {selectedAd?.category}
              </p>
              <p>
                <strong>Description:</strong> {selectedAd?.description}
              </p>
              <p>
                <strong>Views:</strong> {selectedAd?.views}
              </p>
              <p>
                <strong>Clicks:</strong> {selectedAd?.clicks}
              </p>
            </>
          )}
        </Modal.Body>
        {!isEditing && (
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAdDetails}>
              Close
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default AdsManager;
