import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import ContactForm from "../components/ContactForm.jsx";
import "../css/ContactPage.css"
export default function ContactPage() {
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

                    <div className="contact-block">
                        <h3>Телефон</h3>
                        <p>+380 93 604 57 22</p>
                    </div>

                    <div className="contact-block">
                        <h3>Email</h3>
                        <p>kovalyshynnatalia@gmail.com</p>
                    </div>

                    <div className="contact-block">
                        <h3>Адреса</h3>
                        <p>Львів, вул. Личаківська, 20</p>
                    </div>

                </div>
            </section>

            <ContactForm />

            <Footer />

        </div>
    )
}