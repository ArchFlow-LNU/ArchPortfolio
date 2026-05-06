import About from "../components/About.jsx";
import Steps from "../components/Steps.jsx";
import Advantages from "../components/Advantages.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/NavBar.jsx";
import "../css/AboutPage.css";
import { motion } from "framer-motion";


export default function AboutPage() {
    return (
        <div className="app">

            <Navbar />

            <div className="container">
                <About />
                <motion.section
                    className="we-arch"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >

                    <h2 className="we-title">
                        Про архітектурне бюро
                    </h2>

                    <p className="we-text">
                        Ми займаємось проєктуванням сучасних будинків,
                        створюючи простори, які поєднують естетику,
                        функціональність та комфорт. Кожен проєкт — це
                        індивідуальне рішення під клієнта.
                    </p>

                    <div className="hero-stats">

                        <div className="stat" >
                            <h2>250+</h2>
                            <p>збудованих будинків</p>
                        </div>

                        <div className="stat">
                            <h2>25</h2>
                            <p>унікальних проєктів</p>
                        </div>

                        <div className="stat">
                            <h2>100%</h2>
                            <p>задоволених клієнтів</p>
                        </div>

                    </div>

                </motion.section>

                <Steps />
                <Advantages />
            </div>

            {/*<Advantages />*/}
            <Footer />

        </div>
    )
}