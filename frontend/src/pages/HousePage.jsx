import "../css/HousePage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../api/axios.js'
import Navbar from "../components/NavBar.jsx";

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


    useEffect(() => {
        setHouse(null)
        api.get(`/api/projects/${id}`)
            .then(res => {
                setHouse(res.data);
                setImgIndex(0);
            })
            .catch(err => console.log(err));
    }, [id]);

    // loading
    if (!house) {
        return <p style={{ padding: "40px" }}>Loading...</p>;
    }
    const mainImage = house.images?.[imgIndex];


    return (
        <div className="house-page">

            <Navbar />

            <div className="house-main-section">

                <div className="house-gallery">

                    <div className="main-img-container">
                        {house.images && house.images.length >= 0 ? (
                            <>
                                <img
                                    src={
                                        mainImage?.imageUrl
                                            ? `${import.meta.env.VITE_API_URL}/uploads/${mainImage.imageUrl}`
                                            : `${import.meta.env.VITE_API_URL}/uploads/noPhoto.jpg`
                                    }                                    alt={house.title}
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

                </div>

                <div className="house-info">
                    <span className="category-tag">{house.category?.name || "Приватний будинок"}</span>
                    <h1>{house.title}</h1>

                    <div className="specs-grid">
                        <div className="spec-item">
                            <span className="label">Площа</span>
                            <span className="value">{house.area} м²</span>
                        </div>
                        <div className="spec-item">
                            <span className="label">Рік</span>
                            <span className="value">{house.year}</span>
                        </div>
                        <div className="spec-item">
                            <span className="label">Стиль</span>
                            <span className="value">{house.category?.name || "Modern"}</span>
                        </div>
                    </div>

                    <div className="description">
                        <h3>Про проект</h3>
                        <p>{house.fullDescription || house.description}</p>
                    </div>

                    <button className="order-btn"
                            onClick={() => navigate("/#contact")}

                    >
                        Замовити консультацію</button>
                </div>

            </div>

        </div>
    );
}