import About from "../components/About.jsx";
import Steps from "../components/Steps.jsx";
import Advantages from "../components/Advantages.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/NavBar.jsx";

export default function AboutPage() {
    return (
        <div className="app">

            <Navbar />

            <div className="container">
                <About />
                <Steps />
            </div>

            <Advantages />
            <Footer />

        </div>
    )
}