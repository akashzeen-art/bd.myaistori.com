import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/Images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/index";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
  const { language, changeLanguage } = useLanguage();
  const t = translations[language] || translations.EN;

  // Listen for Bootstrap collapse events
  useEffect(() => {
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
      const handleShow = () => setIsExpanded(true);
      const handleHide = () => setIsExpanded(false);
      
      navbarNav.addEventListener('show.bs.collapse', handleShow);
      navbarNav.addEventListener('hide.bs.collapse', handleHide);
      
      return () => {
        navbarNav.removeEventListener('show.bs.collapse', handleShow);
        navbarNav.removeEventListener('hide.bs.collapse', handleHide);
      };
    }
  }, []);

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeAuthModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeProfileModal();
  };

  return (
    <>
      <nav data-bs-theme="dark" className={`navbar navbar-expand-lg navbar-dark ${styles.navbarCustom} ${isExpanded ? styles.navbarExpanded : ''}`}>
        <div className="container-fluid">

          {/* Left - Logo */}
          <a className={`navbar-brand d-flex align-items-center ${styles.brand}`} href="/">
            <img src={logo} alt="logo" className={styles.logo} />
            {/* <span className={styles.brandText}>AIWondernest</span> */}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar-toggler ${styles.toggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Center + Right */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Center Nav Links */}
            <ul className={`navbar-nav ${styles.centerNav}`}>
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="/">{t.navbar.home}</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="/features">{t.navbar.features}</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="/stories">{t.navbar.stories}</a>
              </li>
              {/* <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="/pricing">{t.navbar.pricing}</a>
              </li> */}
            </ul>

            {/* Right Icons + Button */}
            <ul className={`navbar-nav ms-lg-auto align-items-lg-center ${styles.rightNav}`}>
              {/* Icons Row for Mobile */}
              <div className={styles.iconsRow}>
                {/* Profile Dropdown */}
                {isLoggedIn ? (
                  <li className="nav-item dropdown">
                    <button
                      className={styles.profileBtn}
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={openProfileModal}
                    >
                      <FaUserCircle className={styles.icon} />
                    </button>
                    <ul className={`dropdown-menu dropdown-menu-end ${styles.customDropdown}`} aria-labelledby="profileDropdown">
                      <li><button className={`dropdown-item ${styles.dropdownItem}`} onClick={openProfileModal}>{t.navbar.profileSettings}</button></li>
                      <li><button className={`dropdown-item ${styles.dropdownItem}`} onClick={openProfileModal}>{t.navbar.myStories}</button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className={`dropdown-item ${styles.dropdownItem}`} onClick={handleLogout}>{t.navbar.logout}</button></li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <button
                      className={styles.profileBtn}
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUserCircle className={styles.icon} />
                    </button>
                    <ul className={`dropdown-menu dropdown-menu-end ${styles.customDropdown}`} aria-labelledby="profileDropdown">
                      <li><button className={`dropdown-item ${styles.dropdownItem}`} onClick={() => openAuthModal("signin")}>{t.navbar.signIn}</button></li>
                      <li><button className={`dropdown-item ${styles.dropdownItem}`} onClick={() => openAuthModal("signup")}>{t.navbar.signUp}</button></li>
                    </ul>
                  </li>
                )}

                {/* Language Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className={styles.langBtn}
                    id="langDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {language === "BN" ? "বাংলা" : "English"} ▾
                  </button>
                  <ul className={`dropdown-menu dropdown-menu-end ${styles.customDropdown}`} aria-labelledby="langDropdown">
                    <li>
                      <button
                        type="button"
                        className={`dropdown-item ${styles.dropdownItem}`}
                        onClick={() => changeLanguage("EN")}
                      >
                        English
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={`dropdown-item ${styles.dropdownItem}`}
                        onClick={() => changeLanguage("BN")}
                      >
                        বাংলা
                      </button>
                    </li>
                  </ul>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authMode}
        onLogin={handleLogin}
      />

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
