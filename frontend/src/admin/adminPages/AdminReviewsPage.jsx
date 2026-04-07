import { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import api from "../../api/axios"; // 🔥 краще назвати api, не axios
=======
import axios from "../../api/axios";
>>>>>>> dafe44f (update admin reviews page)
=======
import api from "../../api/axios"; // 🔥 краще назвати api, не axios
>>>>>>> 308fba4 (frontend: add admin panel, JWT auth, protected routes and axios with token)
import "../../css/AdminReviews.css";

export default function AdminReviewsPage() {

    const [reviews, setReviews] = useState([]);

<<<<<<< HEAD
<<<<<<< HEAD
=======
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

>>>>>>> dafe44f (update admin reviews page)
=======
>>>>>>> 308fba4 (frontend: add admin panel, JWT auth, protected routes and axios with token)
    const token = localStorage.getItem("token");

    if (!token) {
        return <h2 className="admin-denied">Not authorized</h2>;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") {
        return <h2 className="admin-denied">Access denied</h2>;
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 308fba4 (frontend: add admin panel, JWT auth, protected routes and axios with token)
    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = () => {
        api.get("/api/reviews/admin")
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));
    };

    const approveReview = (id) => {
        api.put(`/api/reviews/${id}/approve`)
            .then(() => loadReviews());
    };

    const deleteReview = (id) => {
        api.delete(`/api/reviews/${id}`)
            .then(() => loadReviews());
    };

<<<<<<< HEAD
=======
>>>>>>> dafe44f (update admin reviews page)
=======
>>>>>>> 308fba4 (frontend: add admin panel, JWT auth, protected routes and axios with token)
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