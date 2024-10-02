// components/Header.js
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiPhone } from "react-icons/fi";
import logo from "../assets/elektro-sembol.png"; // Adjust path as necessary

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when clicking outside
  const closeMenu = (e) => {
    if (e.target.closest("nav") || e.target.closest(".navbar-toggler")) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    // Dispatch your signout action here if needed
    setIsOpen(false); // Close the menu after signing out
  };

  return (
    <header className="fixed top-0 left-0 w-full p-3 bg-light shadow-sm z-50">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="h-10" />
          GitTix
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {!currentUser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/signup">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth/signin">
                    Sign In
                  </Link>
                </li>
              </>
            )}
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/tickets/new">
                    Sell Tickets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/orders">
                    My Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>

          <button
            className="btn btn-outline-primary d-none d-lg-inline-flex align-items-center ms-3"
            onClick={() => {
              // Handle call click logic here
            }}
          >
            <FiPhone className="me-2" />
            Jetzt Anrufen
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar-collapse ${isOpen ? "show" : ""} d-lg-none`}>
        <ul className="navbar-nav">
          {!currentUser && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/auth/signup"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/auth/signin"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/tickets/new"
                  onClick={toggleMenu}
                >
                  Sell Tickets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/orders" onClick={toggleMenu}>
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
