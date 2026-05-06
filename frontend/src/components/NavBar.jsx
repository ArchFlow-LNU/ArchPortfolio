// import "../App.css"
// import "../css/NavBar.css"
// import {useEffect, useState,} from "react";
// import {Link} from "react-router-dom";
// export default function Navbar(props) {
//     const [menuOpen, setMenuOpen] = useState(false);
//
//     const [scrolled, setScrolled] = useState(false);
//
//     useEffect(() => {
//         const handleScroll = () => {
//             // Якщо скрол більше 50px, ставимо true
//             setScrolled(window.scrollY > 50);
//         };
//
//         window.addEventListener("scroll", handleScroll);
//
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);
//     return (
//
//             <div className="navbar">
//                 <div className="logo">ModHouse</div>
//
//                 <div
//                     className={`menu ${menuOpen ? "open" : ""} ${scrolled ? "scrolled" : ""} ${props.cl==="main" ? "":''} ${props.cl==="catalog" ? "catalog":''}`}>
//                     <Link to={'/'}>
//                         <p>Main</p>
//                     </Link>
//                     <Link to={'/catalog'}>
//                         <p>Catalog</p>
//                     </Link>
//                     <Link to={'/about'}>
//                         <p>About us</p>
//                     </Link>
//                     <Link to={'/contacts'}>
//                         <p>Contacts</p>
//                     </Link>
//
//                 </div>
//
//                 {/* гамбургер */}
//                 <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//                     <img src="../imgs/main-menu.png" width="45px" height="45px"  alt=""/>
//                 </div>
//
//                 <button className="btn">Order a call</button>
//
//             </div>
//
//
//     )
// }
import "../App.css"
import "../css/NavBar.css"
import {useEffect, useState,} from "react";
import { NavLink, useNavigate} from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();

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

        <div className="user-menu">
            <div className="user-menu-icon" >
                <img src="/imgs/lotus.png" alt="" style={{width:"45px"}} />
                <span>ModenHouse</span>
            </div>

            <nav className='nav-links-user-menu'>

                <NavLink to="/">
                    <img src="/imgs/home.png" alt="" style={{width:"25px",  padding:"0px", margin:"0px"}} />
                    <span>Головна</span>
                </NavLink>
                <NavLink to="/about">
                    <img src="/imgs/inf.png" alt="" style={{width:"25px",  padding:"0px", margin:"0px"}} />
                    <span>Про нас</span>
                </NavLink>
                <NavLink to="/reviews">
                    <img src="/imgs/review.png" alt="" style={{width:"25px",  padding:"0px", margin:"0px"}} />
                    <span>Відгуки</span>
                </NavLink>


            </nav>

            <div className="order">
                <button
                    onClick={() => navigate("/#contact")}

                >
                    <img src="/imgs/phone-call.png" alt="" style={{width:"25px",  padding:"0px", margin:"0px"}} />
                    <div>Contact</div>
                </button>
            </div>

        </div>


            )
            }