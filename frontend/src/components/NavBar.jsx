import "../App.css"
import "../css/NavBar.css"
import {useEffect, useState,} from "react";
import {Link} from "react-router-dom";
export default function Navbar(props) {
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

                <div
                className={`menu centered ${menuOpen ? "open" : ""}`}>
                    <Link to={'/'}>
                        <p>Main</p>
                    </Link>
                    <Link to={'/catalog'}>
                        <p>Catalog</p>
                    </Link>
                    <Link to={'/about'}>
                        <p>About us</p>
                    </Link>
                    <Link to={'/contacts'}>
                        <p>Contacts</p>
                    </Link>

                </div>

                {/* гамбургер */}
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <img src="../imgs/main-menu.png" width="45px" height="45px"  alt=""/>
                </div>
                
            </div>


    )
}