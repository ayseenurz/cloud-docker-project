import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={
            user ? <Dashboard /> : <Navigate to="/" />
          }
        />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;