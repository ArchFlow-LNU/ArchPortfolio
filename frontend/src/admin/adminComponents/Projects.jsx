import "../adminCss/Projects.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Projects() {
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();

    const API = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${API}/api/projects`)
            .then(res => setHouses(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="projects">
            <h2>Варіанти будинків</h2>

            <div className="projects-list">
                {houses.map((h) => {
                    const mainImage = h.images?.find(img => img.isMain) || h.images?.[0];
                    const imageSrc = mainImage ? `${API}/uploads/${mainImage.imageUrl}` : `${API}/uploads/noPhoto.jpg`;


                    return (
                        <div
                            className="project-card"
                            key={h.id}
                            onClick={() => navigate(`/admin/profile/new`)}
                            style={{ cursor: "pointer" }}
                        >
                            <img src={imageSrc} alt={h.title} />
                            <div className="projec-info">
                                <h3>{h.title}</h3>
                                <p>{h.description}</p>
                                <span>Стиль: {h.category?.name || "—"}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}