import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "./context/Firebase";

const ProtectedRoute = ({ children }) => {
  const firebase = useFirebase();

  console.log(firebase.isLoggedIn);

  const navigate = useNavigate();

  console.log(firebase.isLoggedIn);

  if (!firebase.isLoggedIn) {
    console.log(firebase.isLoggedIn);
    return navigate("/");
  }

  return children;
};

export default ProtectedRoute;
