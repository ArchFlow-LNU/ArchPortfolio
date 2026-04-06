import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../css/AdminReviews.css";

export default function AdminReviewsPage() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = () => {
        axios.get("/api/reviews/admin")
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));
    };

    const approveReview = (id) => {
        axios.put(`/api/reviews/${id}/approve`)
            .then(() => loadReviews());
    };

    const deleteReview = (id) => {
        axios.delete(`/api/reviews/${id}`)
            .then(() => loadReviews());
    };

    const token = localStorage.getItem("token");

    if (!token) {
        return <h2 className="admin-denied">Not authorized</h2>;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") {
        return <h2 className="admin-denied">Access denied</h2>;
    }

    return (
        <div className="admin-container">

            <h1 className="admin-title">Admin Reviews Panel</h1>

            <div className="admin-list">
                {reviews.map(r => (
                    <div key={r.id} className={`admin-card ${r.approved ? "approved" : "pending"}`}>

                        <h3>{r.authorName}</h3>
                        <p className="message">{r.message}</p>
                        <p className="rating">Rating: {r.rating}</p>
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

                    </div>
                ))}
            </div>

        </div>
    );
}