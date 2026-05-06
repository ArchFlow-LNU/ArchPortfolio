import { NavLink } from "react-router-dom";
import "../css/Footer.css"


export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-col">
                    <h3>ModHouse</h3>
                    <p>Ми створюємо сучасні архітектурні рішення.</p>
                    <p>© 2026</p>
                </div>

                <div className="footer-col">
                    <h4>Навігація</h4>
                    <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>Головна</NavLink>
                    <NavLink to="/about" onClick={() => window.scrollTo(0, 0)}>Про нас</NavLink>
                    <NavLink to="/catalog" onClick={() => window.scrollTo(0, 0)}>Проекти</NavLink>
                    {/*<NavLink to="/contacts" onClick={() => window.scrollTo(0, 0)}>Контакти</NavLink>*/}
                </div>

                <div className="footer-col">
                    <h4>Контакти</h4>
                    <p>Телефон: +380 93 604 57 22</p>
                    <p>Email: kovalyshynnatalia@gmail.com</p>
                    <p>Адреса: Львів, вул. Личаківська, 20</p>
                </div>

            </div>
        </footer>
    )

}