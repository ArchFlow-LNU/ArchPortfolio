import "../css/BestProjects.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function BestProjects() {

    const [projects, setProjects] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/Projects/best")
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.error("Error loading projects:", err);
            });
    }, []);

    // щоб не падало поки дані не прийшли
    if (projects.length === 0) {
        return <p>Loading...</p>;
    }

    // беремо головне фото
    const mainImage = projects[current].images?.find(i => i.isMain);

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

            <motion.div className="best-card"
                        key={current} // КЛЮЧ = тригер анімації

                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
            >
                <img src={`http://localhost:5000${mainImage?.imageUrl}`} />



                <div className="best-info">
                    <h3>{projects[current].title}</h3>
                    <p>{projects[current].description}</p>
                </div>
            </motion.div>

        </section>
    );
}