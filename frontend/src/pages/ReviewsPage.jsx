import { useEffect, useState } from "react";
import '../App.css'
import { motion } from "framer-motion";



import api from "../api/axios"; // ЗАМІСТЬ axios

import Navbar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import "../css/ReviewPage.css";
import ContentForReviewPage from "../components/ContentForReviewPage.jsx";

export default function ReviewsPage() {

    const [reviews, setReviews] = useState([]);

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

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="reviews-page">

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

                    <ContentForReviewPage  setReviews={setReviews}></ContentForReviewPage>

                </section>

            </div>

            <Footer />

        </motion.section>
    );
}
