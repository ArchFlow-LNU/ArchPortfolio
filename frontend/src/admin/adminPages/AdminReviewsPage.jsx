import { useEffect, useState } from "react";
import "../adminCss/AdminReviewsPage.css";
import Menu from "../adminComponents/Menu.jsx";
import axios from "axios";
import ExpandableMessage from "../adminComponents/ReviewMessage.jsx";

export default function AdminReviewsPage() {

    const [reviews, setReviews] = useState([]);


    const token = localStorage.getItem('token');

    const loadReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reviews/admin', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const approveReview = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/reviews/${id}/approve`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            loadReviews();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteReview = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            loadReviews();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);



    // const approveReview = (id) => {
    //     const token = localStorage.getItem("token");
    //
    //     api.put(`/api/reviews/${id}/approve`, null, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(() => loadReviews());
    // };
    //
    // const deleteReview = (id) => {
    //     const token = localStorage.getItem("token");
    //
    //     api.delete(`/api/reviews/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(() => loadReviews());
    // };



    return (
        <div className="admin-container">
            <div><Menu></Menu></div>


            <h1 className="admin-title">AdminReviewsPanel</h1>

            <div className="admin-list">
                {reviews.map(r => (
                    <div key={r.id} className={`admin-card ${r.approved ? "approved" : "pending"}`}>

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

                    </div>
                ))}
            </div>

        </div>
    );
}