import { Profiler, useState } from "react";
import "./App.css";
import Feed from "./Feed";
import Login from "./components/Login";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets.jsx";
import Signup from "./Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Profile from "./components/Proile";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },

    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
