import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import Profile from '../../Components/Profile/Profile';
import Suggestions from '../../Components/Suggestion/Suggestion';
import Post from '../../Components/Post/Post';
import Advertisement from '../../Components/Advertisement/Advertisement';
import CreatePost from '../../Components/CreatePost/CreatePost';
import Footer from '../../Components/Footer/Footer';
const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePost = (postData) => {
    console.log("Post Data:", postData);
    // Handle post submission logic here
  };
  const suggestionData = [
    {
      id: 1,
      firstName: "Mohammed",
      lastName: "Alomn",
      mutualConnections: 1,
      image: "https://placehold.co/45x45/png", // Replace with actual user image
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      mutualConnections: 2,
      image: "https://placehold.co/45x45/png", // Replace with actual user image
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Smith",
      mutualConnections: 3,
      image: "https://placehold.co/45x45/png", // Replace with actual user image
    },
  ];
  const users = [
    {
      id: 1,
      name: "Salahuddin",
      role: "Admin",
      image: "https://placehold.co/100x100/png", // Replace with the user's image URL

    },]
  const posts = [
    {
      author: "John Doe",
      date: "January 18, 2025",
      location: "New York, USA",
      likes: "5",
      text: "This post do not contain any media",
     
      comments: [
        {
          author: "Jane Smith",
          text: "Great post! Really enjoyed reading this."
        },
        {
          author: "Mike Johnson",
          text: "Thanks for sharing. Looking forward to more content."
        },
        {
          author: "Emily Davis",
          text: "Interesting perspective, thanks for the insights!"
        }
      ]
    },
    {
      author: "John Doe",
      date: "January 18, 2025",
      location: "New York, USA",
      likes: "5",
      text: "This is an example post text. It can contain multiple lines and media.",
      media: {
        type: "image", // Can be 'image', 'video', or 'audio'
        src: "https://placehold.co/600x400/png" // URL to the media file
      },
      comments: [
        {
          author: "Jane Smith",
          text: "Great post! Really enjoyed reading this."
        },
        {
          author: "Mike Johnson",
          text: "Thanks for sharing. Looking forward to more content."
        },
        {
          author: "Emily Davis",
          text: "Interesting perspective, thanks for the insights!"
        }
      ]
    },
    {
      author: "John Doe",
      date: "January 18, 2025",
      location: "New York, USA",
      likes: "5",
      text: "This is an example post text. It can contain multiple lines and media.",
      media: {
        type: "audio",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      }
,    
      comments: [
        {
          author: "Jane Smith",
          text: "Great post! Really enjoyed reading this."
        },
        {
          author: "Mike Johnson",
          text: "Thanks for sharing. Looking forward to more content."
        },
        {
          author: "Emily Davis",
          text: "Interesting perspective, thanks for the insights!"
        }
      ]
    },
    {
      author: "John Doe",
      date: "January 18, 2025",
      location: "New York, USA",
      likes: "5",
      text: "This is an example post text. It can contain multiple lines and media.",
      media: {
        type: "image", // Can be 'image', 'video', or 'audio'
        src: "https://placehold.co/600x400/png" // URL to the media file
      },
      comments: [
        {
          author: "Jane Smith",
          text: "Great post! Really enjoyed reading this."
        },
        {
          author: "Mike Johnson",
          text: "Thanks for sharing. Looking forward to more content."
        },
        {
          author: "Emily Davis",
          text: "Interesting perspective, thanks for the insights!"
        }
      ]
    },
    {
      author: "John Doe",
      date: "January 18, 2025",
      location: "New York, USA",
      likes: "5",
      text: "This is an example post text. It can contain multiple lines and media.",
      media: {
        type: "video", // Can be 'image', 'video', or 'audio'
        src: "https://www.example.com/sample-video.mp4" // URL to the media file
      },
    
      comments: [
        {
          author: "Jane Smith",
          text: "Great post! Really enjoyed reading this."
        },
        {
          author: "Mike Johnson",
          text: "Thanks for sharing. Looking forward to more content."
        },
        {
          author: "Emily Davis",
          text: "Interesting perspective, thanks for the insights!"
        }
      ]
    },

  ];
  return (
    <div className='home-page'>
      <Navbar />
      <div className="container-fluid  mt-4" style={{ minHeight: "100vh" }}>
      <CreatePost
        show={showModal}
        handleClose={handleCloseModal}
        handlePost={handlePost}
      />
        <div className="row">

          {/* Left Sidebar */}
          <div className="col-md-3">
            {users.map((user) => (
              <Profile key={user.id} user={user} />
            ))}
            <Suggestions suggestions={suggestionData} />
          </div>

          {/* Main Content */}
          <div className="col-md-6">

            <div className=" post" style={{ maxHeight: "105vh" }}>
              <button onClick={handleOpenModal} className="btn btn-primary mb-3 my-3 w-100">Create New Post</button>
              {posts.map((post, index) => (
                <Post key={index} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-md-3">
            <Advertisement />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
