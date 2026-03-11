import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import HouseVariants from "./components/HouseVariants"
import About from "./components/About"
import Steps from "./components/Steps"
import Advantages from "./components/Advantages"
import ContactForm from "./components/ContactForm"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

import "./App.css"

function App() {
    return (
        <div className="app">
            <Navbar />
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

export default App