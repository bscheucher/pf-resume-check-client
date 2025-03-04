import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./services/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";

import UserProfile from "./pages/profile/UserProfile";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="user" element={<UserProfile />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
