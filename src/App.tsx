import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Navbar } from "./NavbarComponents/Navbar";
import { About, Contact, Chess, Home } from "./NavbarComponents/pages";
import { ChessPage } from "./ChessBoardComponents/Chesspage/chessPage";
import SignUp from "./ChessBoardComponents/signUp";
import LogIn from "./ChessBoardComponents/login/logIn";
import { firebaseConfig } from "../src/database/firebase";
import { initializeApp } from "firebase/app";
import React, { useEffect, useState, useRef } from "react";
import {
  getAuth,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
  User
} from "firebase/auth";

interface PrivateRouteProps {
  element: JSX.Element;
  user: User | null;
}

// Define PrivateRoute component
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  user,
  ...rest
}) => {
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await setPersistence(auth, browserLocalPersistence);
      }
      // Whether user is logged in or not, set authResolved to true
      setAuthResolved(true);
    });

    return () => unsubscribe();
  }, []);

  // Render nothing until auth state is resolved
  if (!authResolved) {
    return null;
  }

  return user ? element : <Navigate to="/login" />;
};

export let user1: User | null;

function App() {
  const [user, setUser] = useState<User | null>(null);
  initializeApp(firebaseConfig);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="app">
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/home"
              element={<PrivateRoute element={<Home />} user={user} />}
            />
            <Route
              path="/about"
              element={<PrivateRoute element={<About />} user={user} />}
            />
            <Route
              path="/contact"
              element={<PrivateRoute element={<Contact />} user={user} />}
            />
            <Route
              path="/chess"
              element={<PrivateRoute element={<Chess />} user={user} />}
            />
          </Routes>
        </div>
      </div>
      <div id="not-app">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />} // Redirect "/" to "/login"
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/chesspage"
            element={<PrivateRoute element={<ChessPage />} user={user} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
