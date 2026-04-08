import "../css/About.css"
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    return (
        <section className="about">
            <div className="container">

                <div className="about-grid">

                    {/* заголовок */}


                    {/* текст */}
                    <div className="about-text">

                        <h1 className="about-title">Про нас</h1>

                        <p>
                            Ми — архітектурна компанія з понад 10-річним досвідом у
                            проєктуванні та будівництві сучасних модульних будинків.
                            Наша історія почалася у Львові, де ми розпочали як невелика
                            команда архітекторів.
                        </p>

                        <p>

                            Сьогодні ми реалізуємо проєкти «під ключ» — від ідеї та
                            проєктування до виробництва і фінальної реалізації, поєднуючи
                            естетику, функціональність і комфорт.
                        </p>

                        <button  className="btn-dark"
                                // onClick={() => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                                 onClick={() => navigate("/#contact")}
                        >
                            Замовити проект →
                        </button>

                    </div>

                    {/* фото */}
                    <div className="about-image">
                        <img src="/imgs/about.png" alt="architecture" />
                    </div>

                </div>
            </div>

        </section>
    )


}