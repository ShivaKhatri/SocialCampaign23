import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './components/login/login'
import Home from './Pages/Home/Home'
import Signup from './components/signup/Signup'
import ForgotPassword from './components/forgot-password/forgot-password'
import ChangePassword from './components/change-password/change-password'
import Users from './components/Users/Users';
import './App.css';
import UserProfile from './Pages/UserProfile/UserProfile';

function App() {
    const route = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ]);
    return (
      <div className="App">
        <RouterProvider router={route}> </RouterProvider>
      </div>
    );
  }
  export default App;
