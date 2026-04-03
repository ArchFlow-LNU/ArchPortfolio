import "../css/ContactForm.css"
import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
    // return (
    //     <section className="contact">
    //         <div className="container">
    //
    //             <div className="contact-overlay">
    //
    //
    //
    //                 <h2 className="contact-title">
    //                     Плануєте будівництво будинку?
    //                 </h2>
    //
    //                 <p className="contact-subtitle">
    //                     Заповніть форму, і наша команда зв’яжеться з вами
    //                 </p>
    //
    //                 <form className="contact-form">
    //
    //                     <input type="text" placeholder="Ваше ім’я" />
    //                     <input type="text" placeholder="Ваш номер телефону" />
    //                     <input type="email" placeholder="Ваша електронна пошта" />
    //                     <textarea placeholder="Коротко опишіть ваш проект або побажання"></textarea>
    //
    //                     <button className="btn-dark">
    //                         Надіслати заявку
    //                     </button>
    //
    //                     <p className="contact-note">
    //                         Ми зв’яжемося з вами найближчим часом для обговорення деталей проекту.
    //                     </p>
    //
    //                 </form>
    //
    //             </div>
    //
    //         </div>
    //
    //     </section>
    // )

    const API = "http://localhost:5000";

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        projectType: ""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // 🔹 обробка інпутів
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 🔹 submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // мінімальна валідація
        if (!form.name || !form.email) {
            setError("Введіть ім’я та email");
            return;
        }

        axios.post(`${API}/api/contactrequests`, {
            name: form.name,
            phone: form.phone,
            email: form.email,
            message: form.message,
            projectType: form.projectType
        })
            .then(() => {
                setSuccess(true);
                setError("");

                setForm({
                    name: "",
                    phone: "",
                    email: "",
                    message: "",
                    projectType: ""
                });
            })
            .catch(() => {
                setError("Помилка при відправці");
            });
    };

    return (
        <section className="contact" id="contact">
            <div className="container">

                <div className="contact-overlay">

                    <h2 className="contact-title">
                        Плануєте будівництво будинку?
                    </h2>

                    <p className="contact-subtitle">
                        Заповніть форму, і наша команда зв’яжеться з вами
                    </p>

                    <form className="contact-form" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Ваше ім’я"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Ваш номер телефону"
                            value={form.phone}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Ваша електронна пошта"
                            value={form.email}
                            onChange={handleChange}
                        />

                        {/* тип проекту */}
                        <input
                            type="text"
                            name="projectType"
                            placeholder="Тип проекту (будинок, котедж...)"
                            value={form.projectType}
                            onChange={handleChange}
                        />

                        <textarea
                            name="message"
                            placeholder="Коротко опишіть ваш проект або побажання"
                            value={form.message}
                            onChange={handleChange}
                        />

                        <button className="btn-dark">
                            Надіслати заявку
                        </button>

                        {/* повідомлення */}
                        {success && (
                            <p style={{ color: "green", textAlign: "center" }}>
                                ✔ Заявку успішно надіслано
                            </p>
                        )}

                        {error && (
                            <p style={{ color: "red", textAlign: "center" }}>
                                {error}
                            </p>
                        )}

                        <p className="contact-note">
                            Ми зв’яжемося з вами найближчим часом для обговорення деталей проекту.
                        </p>

                    </form>

                </div>

            </div>
        </section>
    );
}