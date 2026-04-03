import "../css/About.css"
import {useState, useEffect} from "react";
import axios from "axios";

export default function About() {
    // return (
    //     <section className="about">
    //         <div className="container">
    //
    //             <div className="about-grid">
    //
    //                 {/* заголовок */}
    //                 <h1 className="about-title">Про нас</h1>
    //
    //                 {/* текст */}
    //                 <div className="about-text">
    //
    //                     <p>
    //                         Ми — архітектурна компанія з понад 10-річним досвідом у
    //                         проєктуванні та будівництві сучасних модульних будинків.
    //                         Наша історія почалася у Львові, де ми розпочали як невелика
    //                         команда архітекторів.
    //                     </p>
    //
    //                     <p>
    //
    //                         Сьогодні ми реалізуємо проєкти «під ключ» — від ідеї та
    //                         проєктування до виробництва і фінальної реалізації, поєднуючи
    //                         естетику, функціональність і комфорт.
    //                     </p>
    //
    //                     <button className="btn-dark">
    //                         Замовити проект →
    //                     </button>
    //
    //                 </div>
    //
    //                 {/* фото */}
    //                 <div className="about-image">
    //                     <img src="/imgs/about.png" alt="architecture" />
    //                 </div>
    //
    //             </div>
    //         </div>
    //
    //     </section>
    // )

    const [about, setAbout] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:5000/api/about")
        .then(res => setAbout(res.data))
        .catch(err => console.log("error fetch",err));
    }, []);

    if(!about){
        return <p>Loading...</p>
    }

    return(
        <section className="about">
            <div className="container">
                <div className="about-grid">

                    <div className="about-text">
                        <h1 className="about-title">{about.title}</h1>
                        <p>{about.text1}</p>
                        <p>{about.text2}</p>
                        <button className="btn-dark"
                                onClick={() => {
                                    document.getElementById("contact")?.scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }}
                        >
                            Замовити проект →
                        </button>
                    </div>

                    <div className="about-image">
                        <img src={`http://localhost:5000${about.image}`} />
                    </div>
                </div>
            </div>

        </section>
    )
}