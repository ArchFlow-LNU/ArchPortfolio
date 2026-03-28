import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import ContactForm from "../components/ContactForm.jsx";
import "../css/ContactPage.css"
import { useState, useEffect } from "react";
import axios from "axios";

export default function ContactPage() {
    // return (
    //     <div className="contact-page">
    //
    //         <Navbar />
    //
    //         <section className="contact-hero">
    //             <div className="container">
    //                 <h1>Контакти</h1>
    //                 <p>Зв’яжіться з нами — допоможемо реалізувати ваш проект</p>
    //             </div>
    //         </section>
    //
    //         <section className="contact-info">
    //             <div className="container contact-info-grid">
    //
    //                 <div className="contact-block">
    //                     <h3>Телефон</h3>
    //                     <p>+380 93 604 57 22</p>
    //                 </div>
    //
    //                 <div className="contact-block">
    //                     <h3>Email</h3>
    //                     <p>kovalyshynnatalia@gmail.com</p>
    //                 </div>
    //
    //                 <div className="contact-block">
    //                     <h3>Адреса</h3>
    //                     <p>Львів, вул. Личаківська, 20</p>
    //                 </div>
    //
    //             </div>
    //         </section>
    //
    //         <ContactForm />
    //
    //         <Footer />
    //
    //     </div>
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
        <div className="contact-page">

            <Navbar />

            <section className="contact-hero">
                <div className="container">
                    <h1>Контакти</h1>
                    <p>Зв’яжіться з нами — допоможемо реалізувати ваш проект</p>
                </div>
            </section>

            <section className="contact-info">
                <div className="container contact-info-grid">

                    {/* ТЕЛЕФОН */}
                    <div className="contact-block">
                        <h3>Телефон</h3>
                        <p
                            className="clickable"
                            onClick={() => copy(contact.phone, "phone")}
                        >
                            {contact.phone}
                        </p>
                        {copied === "phone" && <span className="copied">Скопійовано</span>}
                    </div>

                    {/* EMAIL */}
                    <div className="contact-block">
                        <h3>Email</h3>
                        <p
                            className="clickable"
                            onClick={() => copy(contact.email, "email")}
                        >
                            {contact.email}
                        </p>
                        {copied === "email" && <span className="copied">Скопійовано</span>}
                    </div>

                    {/* АДРЕСА (як карту) */}
                    <div className="contact-block">
                        <h3>Адреса</h3>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                            target="_blank"
                        >
                            {contact.address}
                        </a>
                    </div>

                </div>
            </section>

            <ContactForm />

            <Footer />

        </div>
    );
}