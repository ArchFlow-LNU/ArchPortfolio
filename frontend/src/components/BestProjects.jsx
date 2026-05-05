import "../css/BestProjects.css"
import { useState, useEffect } from "react";
import api from '../api/axios.js'
import { motion } from "framer-motion";

export default function BestProjects() {

    const [projects, setProjects] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        api.get("/api/projects/best")
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
    const mainImage = projects[current].images?.find(i => i.isMain) ||  projects[current]?.images?.[0];


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

                <img
                    src={
                        mainImage?.imageUrl
                            ? `${import.meta.env.VITE_API_URL}/uploads/${mainImage.imageUrl}`
                            : `${import.meta.env.VITE_API_URL}/uploads/noPhoto.jpg`
                    }

                />


                <div className="best-info">
                    <h3>{projects[current].title}</h3>
                    <p>{projects[current].description}</p>
                </div>
            </motion.div>

        </section>
    );
}