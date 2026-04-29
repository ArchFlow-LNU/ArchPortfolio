import { useEffect, useState } from "react";
import "../adminCss/AdminReviewsPage.css";
import Menu from "../adminComponents/Menu.jsx";
import api from "../../api/axios.js";
import ExpandableMessage from "../adminComponents/ReviewMessage.jsx";
import { motion } from "framer-motion";

export default function AdminReviewsPage() {

    const [reviews, setReviews] = useState([]);
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };


    const loadReviews = async () => {
        try {
            const response = await api.get('/api/reviews/admin');
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const approveReview = async (id) => {
        try {
            await api.put(`/api/reviews/${id}/approve`, null);
            loadReviews();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteReview = async (id) => {
        try {
            await api.delete(`/api/reviews/${id}`);
            loadReviews();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <div className="admin-container">
            <div><Menu></Menu></div>
            <h1 className="admin-title">AdminReviewsPanel</h1>

            <motion.div
                className="admin-list"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {reviews.map(r => (
                    <motion.div
                        key={r.id}
                        className={`admin-card ${r.approved ? "approved" : "pending"}`}
                        variants={item}
                    >

                        <div className="review-auth">
                            <img className='quote' src="/imgs/quote.png" alt="" style={{width:'50px', height:'50px', borderRadius:'50%', backgroundColor:'white',padding:'5px'}} />
                            <h3 >{r.authorName}</h3>
                        </div>


                        <p style={{borderBottom:'black 1px solid'}}>Created at: {r.createdAt.split('T')[0]}</p>
                        <ExpandableMessage message={r.message} />
                        <p className="rating">
                            <span>Rating: {r.rating!=null ? r.rating : "-"}</span>

                            {Array.from({ length: r.rating }, (_, i) => (
                                <img key={i} src="/imgs/star.png" alt="star" style={{width:'25px'}} />
                            ))}
                            {Array.from({ length: 5-r.rating }, (_, i) => (
                                <img key={i} src="/imgs/starEmpty.png" alt="star" style={{width:'25px'}} />
                            ))}
                        </p>

                        <p className="status">
                            Status: {r.approved ? "Approved" : "Pending"}
                        </p>

                        <div className="admin-actions">

                            {!r.approved && (
                                <button
                                    className="btn-approve"
                                    onClick={() => approveReview(r.id)}
                                >
                                    Approve
                                </button>
                            )}

                            <button
                                className="btn-delete"
                                onClick={() => deleteReview(r.id)}
                            >
                                Delete
                            </button>

                        </div>

                    </motion.div>
                ))}
            </motion.div>

        </div>
    );
}