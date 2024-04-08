import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  });

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      {!loading ? (
        <div className=" w-screen block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
