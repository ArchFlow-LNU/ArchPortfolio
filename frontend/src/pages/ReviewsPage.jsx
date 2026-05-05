import { useEffect, useState } from "react";
import '../App.css'


import api from "../api/axios"; // ЗАМІСТЬ axios

import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import "../css/ReviewPage.css";

export default function ReviewsPage() {

    const [reviews, setReviews] = useState([]);

    const [form, setForm] = useState({
        authorName: "",
        authorEmail: "",
        rating: "",
        message: ""
    });

    const renderStars = (rating) => {
        return "★".repeat(Math.min(rating, 5)) + "☆".repeat(Math.max(0, 5 - rating));
        // Якщо рейтинг до 10, можна ділити на 2 або залишити цифру поруч
    };
    const loadReviews = async () => {
        try {
            const res = await api.get("/api/reviews");
            setReviews(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        loadReviews();

        api.get("/api/reviews")
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));

    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        api.post("/api/reviews", {
            ...form,
            rating: Number(form.rating)
        })
            .then(() => api.get("/api/reviews"))
            .then(res => {
                setReviews(res.data);

                setForm({
                    authorName: "",
                    authorEmail: "",
                    rating: "",
                    message: ""
                });

                alert("Відгук відправлено");
            })
            .catch(err => {
                console.log("ERROR:", err.response?.data || err.message);
            });
    };

    return (
        <div className="reviews-page">

            <Navbar />

            <div className="page-content">

                <section className="reviews-header">
                    <h1>Відгуки клієнтів</h1>
                    <p>Дізнайтесь, що говорять про нас</p>
                </section>

                <section className="reviews-slider">
                    <div className="reviews-track">
                        {reviews.map(r => (
                            <div key={r.id} className="review-card">
                                <div className="review-card-header">
                                    <div className="author-info">
                                        <h3>{r.authorName}</h3>
                                        <span className="review-date">
                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
            </span>
                                    </div>
                                    <div className="review-rating">{renderStars(r.rating)}</div>
                                </div>
                                <div className="review-body">
                                    <p>{r.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="review-form-section">

                    <h2>Залишити відгук</h2>

                    <form onSubmit={handleSubmit} className="review-form">
                        <div className="review-row">
                            <div className="input-group">
                                <input
                                    name="authorName"
                                    type="text"
                                    placeholder="Ім'я"
                                    className="minimal-input"
                                    value={form.authorName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group rating-input">
                                <input
                                    name="rating"
                                    type="number"
                                    placeholder="Оцінка (1-10)"
                                    className="minimal-input"
                                    min="1"
                                    max="10"
                                    value={form.rating}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <input
                            name="authorEmail"
                            type="email"
                            placeholder="Email"
                            className="minimal-input"
                            value={form.authorEmail}
                            onChange={handleChange}
                        />

                        <textarea
                            name="message"
                            placeholder="Ваш відгук..."
                            className="minimal-textarea"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="btn-submit-review">
                            Надіслати відгук
                        </button>
                    </form>

                </section>

            </div>

            <Footer />

        </div>
    );
}
