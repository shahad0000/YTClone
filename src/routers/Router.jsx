import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Video from "../pages/Video";
import Search from "../pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/search", element: <Search /> },
        { path: "/video/:id", element: <Video /> }
    ]
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
