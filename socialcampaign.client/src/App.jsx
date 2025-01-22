import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import Post from './components/Post/Post';
import Suggestion from './components/Suggestion/Suggestion';
import Users from './components/Users/Users';
import UserList from "./components/UserList";
function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Login />} /> {/* Home route displays UserList */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/post" element={<Post />} />
                        <Route path="/suggestion" element={<Suggestion />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                    
                </main>
            </div>
        </Router>
    );
}

export default App;
