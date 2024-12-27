import React, { useState } from "react";
import Link from "next/link";
//import axios from "axios";
const DashboardMenu = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isUserSettingsOpen, setUserSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handlers for toggling menus
  const toggleNotificationPopup = () => setNotificationOpen(!isNotificationOpen);
  const toggleUserSettingPopup = () => setUserSettingsOpen(!isUserSettingsOpen);
  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
    // const handleLogout = async () => {
    //   try {
    //     // Revoke token on the backend
    //     await axios.post("https://violet-meerkat-830212.hostingersite.com/public/api/logout");
    
    //     // Sign out from NextAuth
    //     signOut({ callbackUrl: "/" });
    //   } catch (error) {
    //     signOut({ callbackUrl: "/" });
    //     console.error("Error during logout:", error);
    //   }
    // };

  return (
    <header>
      <div className="header-inner">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg mobile-menu">
            {/* Logo */}
            <Link href="/home">
              <a className="logo">
                <img src="/assets/images/header-logo.png" alt="Logo" />
              </a>
            </Link>

            {/* Navbar Toggler */}
            <button
              className="navbar-toggler desktop"
              type="button"
              aria-label="Toggle navigation"
              onClick={openMobileMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Desktop Navigation */}
            <div className="collapse navbar-collapse menuBar">
              <ul className="navbar-nav dashboard-nav">
                <li className="nav-item">
                  <Link href="/dashboard">
                    <a className="nav-link">Dashboard</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">Explore</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/biddings">
                    <a className="nav-link">Biddings</a>
                  </Link>
                </li>
                <li className="nav-item activemenu">
                  <Link href="/listings">
                    <a className="nav-link">My Listings</a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Side Dashboard Menu */}
            <div className="registration-btns-dashboard dashboard-menu">
              {/* User Balance */}
              <p className="user-amount">
                <i className="fa-solid fa-dollar-sign"></i>
                <span className="amount">789.4</span>
              </p>

              {/* Search Button */}
              <button className="search">
                <img src="/assets/images/searchicon.svg" alt="Search Icon" />
              </button>

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
                      <Link href="/notifications">
                        <a>See All Notifications</a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Settings */}
              <div className="user-profile-setting-container">
                <button className="user-profile-setting" onClick={toggleUserSettingPopup}>
                  <img src="/assets/images/dashboard-profile.png" alt="User Profile" />
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                {isUserSettingsOpen && (
                  <div id="userProfileSettingPopup" className="user-profile-setting-popup">
                    <ul className="user-setting-menu">
                      <li>
                        <img src="/assets/images/profile-setting.svg" alt="Settings" />{" "}
                        Account Settings
                      </li>
                      <li>
                        <img src="/assets/images/wallet.svg" alt="Wallet" /> My Wallet
                      </li>
                      <li>
                        <img src="/assets/images/order-box.svg" alt="Order Transportation" />{" "}
                        Order Transportation
                      </li>
                      <li>
                        <Link href="/favourites">
                          <a>
                            <img src="/assets/images/setting-heart.svg" alt="Favorites" /> My
                            Favorites
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/listings">
                          <a>
                            <img src="/assets/images/mainListing.svg" alt="Listings" /> My
                            Listings
                          </a>
                        </Link>
                      </li>
                      <li>
                        <img src="/assets/images/myBids.svg" alt="Bids" /> My Bids
                      </li>
                      <li>
                        <img src="/assets/images/invoice.svg" alt="Invoices" /> Invoices
                      </li>
                      <li>
                        <img src="/assets/images/logout.svg" alt="Logout" /> Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Sell Now Button */}
              <Link href="/sell-now">
                <a className="sellnow">Sell Now</a>
              </Link>

              {/* Mobile Menu */}
              <i className="fa-solid fa-bars mobileMenuOpen" onClick={openMobileMenu}></i>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div id="mobile-menu">
                <div id="closeMobileMenu" className="closeMobileMenu">
                  <i className="fa-solid fa-xmark" onClick={closeMobileMenu}></i>
                </div>

                <ul className="mobile-buttons">
                  <li>
                    <p className="mobile-user-amount">
                      <i className="fa-solid fa-dollar-sign"></i>
                      <span className="amount">789.4</span>
                    </p>
                  </li>
                  <li>
                    <button className="mobile-search">
                      <img src="/assets/images/searchicon.svg" alt="Search" />
                    </button>
                  </li>
                  <li>
                    <Link href="/sell-now">
                      <a className="mobile-sellnow">Sell Now</a>
                    </Link>
                  </li>
                </ul>

                <ul className="mobile-menu-bar">
                  <li className="mobile-item">
                    <Link href="/dashboard">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                  <li className="mobile-item">
                    <Link href="/explore">
                      <a>Explore</a>
                    </Link>
                  </li>
                  <li className="mobile-item">
                    <Link href="/biddings">
                      <a>Biddings</a>
                    </Link>
                  </li>
                  <li className="mobile-item">
                    <Link href="/listings">
                      <a>My Listings</a>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DashboardMenu