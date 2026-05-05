import { useEffect, useState } from "react";
import "../adminCss/AdminContactsPage.css";
import Menu from "../adminComponents/Menu.jsx";
import api from "../../api/axios.js";
import ExpandableMessage from "../adminComponents/ReviewMessage.jsx";
import { motion } from "framer-motion";

export default function AdminContactsPage() {

    const [contacts, setContacts] = useState([]);

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


    const loadContacts = async () => {
        try {
            const res = await api.get('/api/contactrequests');
            setContacts(res.data ?? []);
        } catch (error) {
            console.error(error);
            setContacts([]);
        }
    };

    const deleteReview = async (id) => {
        try {
            await api.delete(`/api/contactrequests/${id}`);
            loadContacts();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className="admin-container">

            <Menu />

            <h1 className="admin-title">Admin Contacts Panel</h1>

            <motion.div
                className="admin-list"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {contacts.map((r) => {

                    const date = r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : "-";

                    return (
                        <motion.div
                            key={r.id}
                            className={`admin-card ${r.approved ? "approved" : "pending"}`}
                            variants={item}
                        >

                            <div className="review-auth">
                                <img
                                    className="quote"
                                    src="/imgs/phone-call2.png"
                                    alt=""
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: '#361500',
                                        padding: '5px'
                                    }}
                                />
                                <h3>{r.authorName}</h3>
                            </div>

                            <p style={{ borderBottom: 'black 1px solid' }}>
                                Created at: {date}
                            </p>

                            <div className="contact-info">

                                <p><b>Number:</b> {r.id}</p>

                                <p><b>Email:</b> {r.email}</p>

                                <p>
                                    <b>Phone:</b> {r.phone ?? "—"}
                                </p>

                                <p>
                                    <b>Project type:</b> {r.projectType ?? "—"}
                                </p>

                                <p>
                                    <b>Status:</b> {r.status}
                                </p>

                                <p>
                                    <b>Created:</b> {date}
                                </p>

                            </div>

                            <div className="contact-message">
                                <ExpandableMessage message={r.message} />
                            </div>

                            <div className="admin-actions">

                                <button
                                    className="btn-delete"
                                    onClick={() => deleteReview(r.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </motion.div>
                    );
                })}
            </motion.div>

        </div>
    );
}