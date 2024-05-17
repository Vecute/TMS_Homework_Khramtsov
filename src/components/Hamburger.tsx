import React, { useState } from "react";

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button onClick={toggleMenu} className="hamburger-button">
            <span className={`line ${isOpen ? "close-line-1" : ""}`}></span>
            <span className={`line ${isOpen ? "close-line-2" : ""}`}></span>
            <span className={`line ${isOpen ? "close-line-3" : ""}`}></span>
        </button>
    );
};

export default Hamburger