import { useState} from "react";
import api from "../api/axios.js";
import "../css/ReviewPage.css";


export default function ContentForReviewPage({  setReviews }){


    const [form, setForm] = useState({
        authorName: "",
        authorEmail: "",
        rating: "",
        message: ""
    });



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

    return(
        <>
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
        </>
    )
}