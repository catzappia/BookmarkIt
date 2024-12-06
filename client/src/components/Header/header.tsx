import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import stylesheet

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // function to toggle the menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

return (
    <header>
        <nav className={`navbar ${menuOpen ? "open" : ""}`}>
            {/* BookmarkIt Logo */}
            <div className={`title ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={closeMenu}>
                    <h1>BookmarkIt</h1>
                </Link>
            </div>
            {/* Menu Icon (hidden by default) */}

            <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li>
                    <Link to="/" onClick={closeMenu}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/create-account" onClick={closeMenu}>
                        Create an Account
                    </Link>
                </li>
                <li>
                    <Link to="/book-clubs" onClick={closeMenu}>
                        Book Clubs
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
);
};

export default Header;
