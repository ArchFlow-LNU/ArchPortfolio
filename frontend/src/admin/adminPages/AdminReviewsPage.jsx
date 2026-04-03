import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../adminCss/AdminReviewsPage.css";

export default function AdminReviewsPage() {

    const [reviews, setReviews] = useState([]);

    const loadReviews = async () => {
        try {
            const res = await api.get("/api/reviews/admin");
            setReviews(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const approve = async (id) => {
        try {
            await api.put(`/api/reviews/${id}/approve`);
            loadReviews();
        } catch (err) {
            console.log(err);
        }
    };

    const remove = async (id) => {
        try {
            await api.delete(`/api/reviews/${id}`);
            loadReviews();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="admin-reviews-page">

            <h1 className="admin-title">Admin Reviews</h1>

            {reviews.length === 0 && (
                <p>Немає відгуків</p>
            )}

            {reviews.map(r => (
                <div key={r.id} className="review-card">

                    <h3>{r.authorName}</h3>

                    <p>{r.message}</p>

                    <p>Rating: {r.rating}</p>

                    <p className={`status ${r.approved ? "approved" : "pending"}`}>
                        {r.approved ? "Approved" : "Pending"}
                    </p>

                    <div className="admin-actions">

                        {!r.approved && (
                            <button 
                                className="btn btn-approve"
                                onClick={() => approve(r.id)}
                            >
                                Approve
                            </button>
                        )}

                        <button 
                            className="btn btn-delete"
                            onClick={() => remove(r.id)}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}