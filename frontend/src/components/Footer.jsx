import { NavLink } from "react-router-dom";
import "../css/Footer.css"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Footer() {
    // return (
    //     <footer className="footer">
    //         <div className="footer-container">
    //
    //             <div className="footer-col">
    //                 <h3>ModHouse</h3>
    //                 <p>Ми створюємо сучасні архітектурні рішення.</p>
    //                 <p>© 2026</p>
    //             </div>
    //
    //             <div className="footer-col">
    //                 <h4>Навігація</h4>
    //                 <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>Головна</NavLink>
    //                 <NavLink to="/about" onClick={() => window.scrollTo(0, 0)}>Про нас</NavLink>
    //                 <NavLink to="/catalog" onClick={() => window.scrollTo(0, 0)}>Проекти</NavLink>
    //                 <NavLink to="/contacts" onClick={() => window.scrollTo(0, 0)}>Контакти</NavLink>
    //             </div>
    //
    //             <div className="footer-col">
    //                 <h4>Контакти</h4>
    //                 <p>Телефон: +380 93 604 57 22</p>
    //                 <p>Email: kovalyshynnatalia@gmail.com</p>
    //                 <p>Адреса: Львів, вул. Личаківська, 20</p>
    //             </div>
    //
    //         </div>
    //     </footer>
    // )
    const [contact, setContact] = useState(null);
    const [copied, setCopied] = useState("");

    const API = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${API}/api/contactinfo`)
            .then(res => setContact(res.data))
            .catch(err => console.log(err));
    }, []);

    const copy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);

        setTimeout(() => setCopied(""), 1500);
    };

    if (!contact) return null;

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* колонка 1 */}
                <div className="footer-col">
                    <h3>ModHouse</h3>
                    <p>Ми створюємо сучасні архітектурні рішення.</p>
                    <p>© 2026</p>
                </div>

                {/* колонка 2 */}
                <div className="footer-col">
                    <h4>Навігація</h4>
                    <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>Головна</NavLink>
                    <NavLink to="/about" onClick={() => window.scrollTo(0, 0)}>Про нас</NavLink>
                    <NavLink to="/catalog" onClick={() => window.scrollTo(0, 0)}>Проекти</NavLink>
                    <NavLink to="/contacts" onClick={() => window.scrollTo(0, 0)}>Контакти</NavLink>
                    <NavLink to="/reviews">Відгуки</NavLink>
                </div>

                {/* колонка 3 (з БД) */}
                <div className="footer-col">
                    <h4>Контакти</h4>

                    <p
                        className="clickable"
                        onClick={() => copy(contact.phone, "phone")}
                    >
                        Телефон: {contact.phone}
                    </p>
                    {copied === "phone" && <span className="copied">Скопійовано ✔</span>}

                    <p
                        className="clickable"
                        onClick={() => copy(contact.email, "email")}
                    >
                        Email: {contact.email}
                    </p>
                    {copied === "email" && <span className="copied">Скопійовано ✔</span>}

                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Адреса: {contact.address}
                    </a>

                </div>

            </div>
        </footer>
    );
}