import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';  // Import the AuthContext
import Login from './components/login/login';
import Home from './Pages/Home/Home';
import Signup from './components/signup/Signup';
import ForgotPassword from './components/forgot-password/forgot-password';
import ChangePassword from './components/change-password/change-password';
import Users from './components/Users/Users';
import UserProfile from './Pages/UserProfile/UserProfile';
import BusinessProfile from './Pages/BusinessProfile/BusinessProfile';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; // Import the Footer component
import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component
// import { UserProvider } from './components/context/UserContext';

//  Missing Imports Added
import PromotionalManagement from './components/PromotionalManagement/PromotionalManagement';
import UserManagement from './components/UserManagement/UserManagement';
import ContentModeration from './components/ContentModeration/ContentModeration';
import CauseManagement from './components/CauseManagement/CauseManagement';
import BusinessManagement from './components/BusinessManagement/BusinessManagement';

// Layout component that includes the Navbar and Footer
const Layout = () => {
    return (
        <div className="app">
            <Navbar />
            <div className="content">
                <Outlet /> {/* This will render the matched route component */}
            </div>
            <Footer /> {/* Footer will be displayed on all pages */}
        </div>
    );
};

function App() {
    const route = createBrowserRouter([
        {
            path: "/",
            element: <Layout />, // Layout with Navbar and Footer for all other pages
            children: [
                { path: "/", element: <Login /> },
                { path: "/home", element: <Home /> },
                { path: "/signup", element: <Signup /> },
                { path: "/forgot-password", element: <ForgotPassword /> },
                { path: "/change-password", element: <ChangePassword /> },

                // Protected routes wrapped with ProtectedRoute
                {
                    path: "/users",
                    element: (
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/user-profile",
                    element: (
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/business-profile",
                    element: (
                        <ProtectedRoute>
                            <BusinessProfile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/PromotionalManagement",
                    element: (
                        <ProtectedRoute>
                            <PromotionalManagement />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/UserManagement",
                    element: (
                        <ProtectedRoute>
                            <UserManagement />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/ContentModeration",
                    element: (
                        <ProtectedRoute>
                            <ContentModeration />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/CauseManagement",
                    element: (
                        <ProtectedRoute>
                            <CauseManagement />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/BusinessManagement",
                    element: (
                        <ProtectedRoute>
                            <BusinessManagement />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
    ]);

    return (
        <AuthProvider>  {/* Wrap the app with the AuthProvider */}
            <div className="App">
                <RouterProvider router={route} />
            </div>
        </AuthProvider>
    );
}

export default App;
