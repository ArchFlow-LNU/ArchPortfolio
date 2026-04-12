import "../css/HousePage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HousePage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [house, setHouse] = useState(null);
    const [imgIndex, setImgIndex] = useState(0);

    const nextImg = () => {
        if (imgIndex < house.images.length - 1) {
            setImgIndex(prev => prev + 1);
        }
    };

    const prevImg = () => {
        if (imgIndex > 0) {
            setImgIndex(prev => prev - 1);
        }
    };

    const API = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${API}/api/projects/${id}`)
            .then(res => setHouse(res.data))
            .catch(err => console.log(err));
    }, [id]);

    // loading
    if (!house) {
        return <p style={{ padding: "40px" }}>Loading...</p>;
    }

    // const mainImage = house.images?.find(img => img.isMain);

    return (
        <div className="house-page">

            {/* НАЗАД НА ГОЛОВНУ */}
            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                ← На головну
            </button>

            <div className="house-container">

                <div className="house-gallery">

                    {house.images && house.images.length > 0 ? (
                        <>
                            <img
                                src={`${API}${house.images[imgIndex].imageUrl}`}
                                alt={house.title}
                                className="house-image"
                            />

                            <div className="gallery-controls">
                                <button onClick={prevImg}>←</button>
                                <button onClick={nextImg}>→</button>
                            </div>
                        </>
                    ) : (
                        <img src="/imgs/house1.png" alt="no image" />
                    )}

                </div>

                <div className="house-text">

                    <h1>{house.title}</h1>

                    {/* переноси рядків */}
                    <p style={{ whiteSpace: "pre-line" }}>
                        {house.fullDescription || house.description}
                    </p>

                    <p>
                        <b>Стиль:</b> {house.category?.name || "—"}
                    </p>

                    <p>
                        <b>Рік:</b> {house.year}
                    </p>

                    <p>
                        <b>Площа:</b> {house.area} м²
                    </p>

                </div>

            </div>

        </div>
    );
}