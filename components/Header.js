// components/Header.js
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { signOut,useSession } from "next-auth/react";
import Link from 'next/link';
import axios from "axios";
import WalletBalance from '../components/walletDisplay'
export default function Header() {
  // If any JS is needed (like openMobileMenu, closeMobileMenu), 
  // ensure that is handled either here or via refs.
  // For now, we assume the JS from script.js handles it.
  const [activeModal, setActiveModal] = useState(null);
 // const [user, setUser] = useState(null);
  const { data: session } = useSession();
   const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isUserSettingsOpen, setUserSettingsOpen] = useState(false);
//    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//console.log(session);
    // Handlers for toggling menus
    const toggleNotificationPopup = () => setNotificationOpen(!isNotificationOpen);
    const toggleUserSettingPopup = () => setUserSettingsOpen(!isUserSettingsOpen);
    const openMobileMenu = () => setMobileMenuOpen(true);
    //const closeMobileMenu = () => setMobileMenuOpen(false);

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
      await axios.post("https://violet-meerkat-830212.hostingersite.com/public/api/logout");
  
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
            <Link className="logo" href={"/"}>
              <img src="/assets/images/header-logo.png" alt="" />
            </Link>
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
              {!session ? (
                <>
                <ul className="navbar-nav">
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
               
               <div className="nav-item registration-btns">
                 <button className="SignupButton signup" onClick={() => handleOpenModal("signup")}>Sign Up</button>
                 <Link className="nav-link sellnow" href="#">Sell</Link>
                 <button className="loginButton login" onClick={() => handleOpenModal("signin")}>Login</button>
               </div>
               </>
           
                  ) : (
                    // Show username and logout button if the user is logged in
                    <>
                      

                            <ul className="navbar-nav dashboard-nav"
                                id="navbarDesktop">
                                <li className="nav-item ">
                                    <Link className="nav-link" href="/userDashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" href="/marketplace">Explore</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" href="/mybid">Bidings</Link>
                                </li>
                                <li className="nav-item activemenu">
                                    <Link className="nav-link" href="/MyListings">My Listings</Link>
                                </li>
                            </ul>

                      
                      <div className="registration-btns-dashboard dashboard-menu">
                        {/* User Balance */}
                        <p className="user-amount">
                          <i className="fa-solid fa-dollar-sign"></i>
                          <Link className="amount" href={'/wallet'}><span ><WalletBalance /></span></Link>
                        </p>

                        

                        {/* Notifications */}
                        <div className="notification-container">
                          <button className="notification" onClick={toggleNotificationPopup}>
                            <img src="/assets/images/notificationIcon.svg" alt="Notifications" />
                          </button>
                          {isNotificationOpen && (
                            <div id="notificationPopup" className="notification-popup">
                              <div className="notification-content">
                                <h3>No new notifications</h3>
                                <button className="markAsRead">
                                  <img src="/assets/images/double-tick.svg" alt="Mark All" /> Mark all
                                  as read
                                </button>
                              </div>
                              <div className="notification-body">
                                <div className="notification-popup-bar">
                                  <div className="notificationPopupMessage">
                                    <div className="notification-popup-bar-img-1">
                                      <img src="/assets/images/money-tick.svg" alt="Notification" />
                                    </div>
                                    <div className="notify-message-and-time">
                                      <p className="bid-notify-msg">
                                        Payment received for Seating Area, bar....
                                      </p>
                                      <p className="bid-notify-time">
                                        <span className="notify-date">9 Oct 2022</span>,{" "}
                                        <span className="time">11:30 PM</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* Add more notifications here */}
                              </div>
                              <div className="notification-footer">
                                <Link href={"/notifications"}>
                                  See All Notifications
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* User Profile Settings */}
                        <div className="user-profile-setting-container">
                          <button className="user-profile-setting" onClick={toggleUserSettingPopup}>
                            {!session.user.avatar ? (
                              <img src="/assets/images/dashboard-profile.png" alt="User Profile0" />
                              
                            ) : (
                              <img src={session.user.avatar} alt="User Profile1" />
                           )} 
                            <i className="fa-solid fa-chevron-down"></i>
                          </button>
                          
                          {isUserSettingsOpen && (
                            
                            <div id="userProfileSettingPopup" className="user-profile-setting-popup">
                              <div className='user-profile-setting-content'>
                                <ul className="user-setting-menu">
                                  <li>
                                  <Link href={"/account"}>
                                    <img src="/assets/images/profile-setting.svg" alt="Settings" />{" "}
                                    Account Settings
                                  </Link>
                                  </li>
                                  <li>
                                  <Link href={"/wallet"}>
                                    <img src="/assets/images/wallet.svg" alt="Wallet" /> My Wallet
                                  </Link>
                                  </li>
                                  {/*<li>
                                   <Link href={"/transportation"}>
                                    <img src="/assets/images/order-box.svg" alt="Order Transportation" />{" "}
                                    Order Transportation
                                  </Link> 
                                  </li>*/}
                                  <li>
                                    <Link href={"/favourites"}>
                                        <img src="/assets/images/setting-heart.svg" alt="Favorites" /> My
                                        Favorites
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href={"/MyListings"}>
                                        <img src="/assets/images/mainListing.svg" alt="Listings" /> My
                                        Listings
                                    </Link>
                                  </li>
                                  <li>
                                  <Link href={"/mybid"}>
                                    <img src="/assets/images/myBids.svg" alt="Bids" /> My Bids
                                  </Link>
                                  </li>
                                  <li>
                                  <Link href={"/Invoices"}>
                                    <img src="/assets/images/invoice.svg" alt="Invoices" /> Invoices
                                  </Link>
                                  </li>
                                  <li>
                                  <button className="transparent-button" onClick={() => handleLogout()} >
                                    <img src="/assets/images/logout.svg" alt="Logout" /> Log Out
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>

                          {/* Sell Now Button */}
                          <Link href="/sell" className="sellnow">
                            Sell Now
                          </Link>

                          {/* Mobile Menu */}
                          <i className="fa-solid fa-bars mobileMenuOpen" onClick={openMobileMenu}></i>
                      </div>
                    {/* <p>Welcome, {session.user.name}!</p>
                    <button onClick={() => handleLogout()}>Logout</button>*/}
                    </> 
                  )
              }  
                
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
                <li className="mobile-child-menu"><a href="/sell" className="mobile-sellnow">Sell Now</a></li>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categories
                    </a>
                    
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/marketplace.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Marketplace
                    </a>
                    
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