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
            //setScrolled(window.scrollY > 50);
            if (props.cl === "main") {
                setScrolled(window.scrollY > 600);
            } else {
                //setScrolled(false);
                setScrolled(window.scrollY > 50);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (

            <div className="navbar">
                <div className="logo">ModHouse</div>

                {/* className={`menu ${menuOpen ? "open" : ""} ${scrolled ? "scrolled" : ""} ${props.cl==="main" ? "":''} ${props.cl==="catalog" ? "catalog":''}`}*/}
                <div
<<<<<<< HEAD
                className={`menu centered ${menuOpen ? "open" : ""}`}>
=======
                    className={`menu ${menuOpen ? "open" : ""} ${scrolled ? "scrolled" : ""} ${props.cl === "main" ? "menu-main" : "menu-default"}`}
                >
>>>>>>> 28b4399b3b0e8720de10416e4743103a3b009ada
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