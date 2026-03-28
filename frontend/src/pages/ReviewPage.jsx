import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import "../css/ReviewPage.css";

export default function ReviewsPage() {

    const API = "http://localhost:5000";

    const [reviews, setReviews] = useState([]);

    const [form, setForm] = useState({
        authorName: "",
        authorEmail: "",
        rating: "",
        message: ""
    });

    useEffect(() => {
        axios.get(`${API}/api/reviews`)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${API}/api/reviews`, form)
            .then(() => {
                alert("Відгук відправлено");
                setForm({
                    authorName: "",
                    authorEmail: "",
                    rating: "",
                    message: ""
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="reviews-page">

            <Navbar />

            <div className="page-content">

            {/* HEADER */}
            <section className="reviews-header">
                <h1>Відгуки клієнтів</h1>
                <p>Дізнайтесь, що говорять про нас</p>
            </section>

            {/* СКРОЛ ВІДГУКІВ */}
            <section className="reviews-slider">

                <div className="reviews-track">
                    {reviews.map(r => (
                        <div key={r.id} className="review-card">

                            <h3>{r.authorName}</h3>

                            <p>Оцінка: {r.rating}</p>

                            <p>{r.message}</p>

                            <span>
                                {new Date(r.createdAt).toLocaleDateString()}
                            </span>

                        </div>
                    ))}
                </div>

            </section>

            {/* ФОРМА */}
            <section className="review-form-section">

                <h2>Залишити відгук</h2>

                <form onSubmit={handleSubmit} className="review-form">

                    <div className="review-row">
                        <input
                            name="authorName"
                            placeholder="Ім'я"
                            value={form.authorName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="rating"
                            type="number"
                            placeholder="Оцінка(1-10)"
                            min="1"
                            max="10"
                            value={form.rating}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        name="authorEmail"
                        placeholder="Email"
                        value={form.authorEmail}
                        onChange={handleChange}
                    />

                    <textarea
                        name="message"
                        placeholder="Ваш відгук..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="btn-dark">
                        Надіслати
                    </button>

                </form>

            </section>
            </div>

            <Footer />

        </div>
    );
}