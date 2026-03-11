import "../App.css"
import {useEffect, useState} from "react";
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Якщо скрол більше 50px, ставимо true
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="navbar">
            <div className="logo">ModHouse</div>

            <div className={`menu ${menuOpen ? "open" : ""} ${scrolled ? "scrolled" : ""}`}>
                <a>Main</a>
                <a>Catalog</a>
                <a>About Us</a>
                <a>Contacts</a>
            </div>

            {/* гамбургер */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <img src="../imgs/main-menu.png" width="45px" height="45px"  alt=""/>
            </div>

            <button className="btn">Order a call</button>
        </div>
    )
}