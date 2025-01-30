const ProfilePicture = ({ onImageSelect }) => {
    const [imagePreview, setImagePreview] = useState('https://placehold.co/180x180?text=profile');

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            onImageSelect(file); // Pass file to the parent
        } else {
            toast.error('Failed to load image. Please try again.');
        }
    };

    return (
        <div className='info-container'>
            <ToastContainer />
            <div className='info-heading'>
                <h3>Profile Picture</h3>
            </div>
            <div className='d-flex flex-column mt-4'>
                <img src={imagePreview} alt="Profile" className="img-thumbnail profile-image rounded-circle" />
                <label htmlFor="imageUpload" className="btn btn-link mt-3">Change Picture</label>
                <input
                    id="imageUpload"
                    type="file"
                    className="form-control mt-3"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

export default ProfilePicture;
