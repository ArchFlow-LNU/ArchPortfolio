import Navbar from "../components/NavBar.jsx";
import Hero from "../components/Hero.jsx";
import HouseVariants from "../components/HouseVariants.jsx";
import About from "../components/About.jsx";
import Steps from "../components/Steps.jsx";
import Advantages from "../components/Advantages.jsx";
import ContactForm from "../components/ContactForm.jsx";
import FAQ from "../components/FAQ.jsx";
import Footer from "../components/Footer.jsx";
import "../App.css"

export default function MainPage() {
    return(
        <div className="app">
            <Navbar cl="main"/>
            <Hero />

            <div className="container">
                <HouseVariants />
                <About />
                <Steps />
            </div>

            {/*<BestProjects />*/}
            <Advantages />
            <ContactForm />
            <FAQ />
            <Footer />
        </div>

    )
}