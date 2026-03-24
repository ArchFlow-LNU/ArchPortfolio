import "../css/BestProjects.css"
import { useState } from "react";
export default function BestProjects() {
    const projects = [
        {
            title: "Horizon House",
            img: "/imgs/besthouse1.png",
            desc: "Сучасний приватний будинок із відкритим плануванням та панорамними вікнами."
        },
        {
            title: "Urban Villa",
            img: "/imgs/besthouse2.png",
            desc: "Стильний житловий будинок для міського середовища з терасами та балконами."
        }
    ];

    const [current, setCurrent] = useState(0);

    return (
        <section className="best-projects">

            <div className="best-header">
                <h2>Найкращі проєкти</h2>

                <div className="controls">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={current === index ? "active" : ""}
                            onClick={() => setCurrent(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="best-card">
                <img src={projects[current].img} alt="" />

                <div className="best-info">
                    <h3>{projects[current].title}</h3>
                    <p>{projects[current].desc}</p>
                </div>
            </div>

        </section>
    );
}