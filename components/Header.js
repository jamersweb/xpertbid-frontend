// components/Header.js
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { signOut,useSession } from "next-auth/react";
import Link from 'next/link';
import axios from "axios";

export default function Header() {
  // If any JS is needed (like openMobileMenu, closeMobileMenu), 
  // ensure that is handled either here or via refs.
  // For now, we assume the JS from script.js handles it.
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  

  const handleOpenModal = (modal) => {
    setActiveModal(modal); // Set "signup" or "signin"
  };

  const handleCloseModal = () => {
    setActiveModal(null); // Close all modals
  };

  const handleLogin = (userData) => {
    setUser(userData); // Update user state on login
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
    handleCloseModal(); // Close modal after login
  };
  const handleLogout = async () => {
    try {
      // Revoke token on the backend
      await axios.post("http://127.0.0.1:8000/api/logout");
  
      // Sign out from NextAuth
      signOut({ callbackUrl: "/" });
    } catch (error) {
      signOut({ callbackUrl: "/" });
      console.error("Error during logout:", error);
    }
  };
 

  return (
    <header>
      <div className="header-inner">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg" id="navMobile">
            <a className="logo" href="/expertbid.html">
              <img src="/assets/images/header-logo.png" alt="" />
            </a>
            <button className="navbar-toggler desktop" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse menuBar" id="navbarSupportedContent">
              <form className="d-flex search-forms" role="search">
                <button className="search-btn" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input className="search-box" type="search" placeholder="Search any auction listing here" aria-label="Search" />
              </form>
              <ul className="navbar-nav">
                <li className="nav-item mobile-registrations">
                    {!session ? (
                    <div>
                      <button className="loginButton login" onClick={() => handleOpenModal("signin")}>Login</button>
                      <button className="SignupButton signup" onClick={() => handleOpenModal("signup")}>Signs Up</button>
                    </div>
                  ) : (
                    // Show username and logout button if the user is logged in
                    <div>
                    <p>Welcome, {session.user.name}!</p>
                    <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                  )}  
                  <a className="nav-link sellnow" href="#">Sell Now</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/categories"}>
                    Categories
                  </Link>
                  
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/marketplace"}>
                    Marketplace
                  </Link>
                 
                </li>
              </ul>
            </div>
            <div className="registration-btns">
            {!session ? (
                <div>
                  <button className="loginButton login" onClick={() => handleOpenModal("signin")}>Login</button>
                  <button className="SignupButton signup" onClick={() => handleOpenModal("signup")}>Sign Up</button>
                </div>
              ) : (
                // Show username and logout button if the user is logged in
                <div>
                <p>Welcome, {session.user.name}!</p>
                <button onClick={() => handleLogout()}>Logout</button>
                </div>
              )}    
              
              <a href="#" className="sellnow">Sell Now</a>
              <i className="fa-solid fa-bars mobileMenuOpen" onClick={() => { /* openMobileMenu() */ }}></i>
            </div>

            <div id="mobile-menu">
              <div id="closeMobileMenu" className="closeMobileMenu">
                <i className="fa-solid fa-xmark" onClick={() => { /* closeMobileMenu() */ }}></i>
              </div>
              <ul className="mobile-buttons-web">
                <li className="mobile-child-menu">
                  <form className="d-flex search-forms" role="search">
                    <button className="search-btn" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    <input className="search-box" type="search" placeholder="Search any auction listing here" aria-label="Search" />
                  </form>
                </li>
                <li className="mobile-child-menu"><a href="#" className="mobile-sellnow">Sell Now</a></li>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categories
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Marketplace
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/marketplace.html">Marketplace</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                    </ul>
                  </li>
                </ul>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <SignupModal isOpen={activeModal === "signup"} onClose={handleCloseModal} onSignup={handleLogin}/>
      <LoginModal isOpen={activeModal === "signin"} onClose={handleCloseModal} onLogin={handleLogin}/>
    </header>
    
  )
}