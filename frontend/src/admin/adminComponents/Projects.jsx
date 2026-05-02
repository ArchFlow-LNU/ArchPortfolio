import "../adminCss/Projects.css";
import { useState, useEffect } from "react";
import api from '../../api/axios.js'
import {Link, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";

export default function Projects() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        id: null,
        title: ""
    });

    const [confirmText, setConfirmText] = useState("");

    const API = "http://localhost:5000";
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

    useEffect(() => {
        try{
            api.get(`/api/projects`)
                .then(res => setHouses(res.data))
                .catch(err => console.log(err));
        }catch(err){
            console.log(err)
        }finally {
            setLoading(false);
        }

    }, []);


    function openDeleteModal(id, title) {
        setDeleteModal({
            open: true,
            id,
            title
        });
        setConfirmText("");
    }

    async function confirmDelete() {
        if (confirmText !== deleteModal.title) {
            alert("Назва не співпадає!");
            return;
        }

        try {
            await api.delete(`/api/projects/${deleteModal.id}`);

            setHouses(prev =>
                prev.filter(h => h.id !== deleteModal.id)
            );

            setDeleteModal({ open: false, id: null, title: "" });
        } catch (err) {
            console.log(err);
            alert("Помилка видалення");
        }
    }
    return loading ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            Loading...
        </motion.div>
    ) : (
        <section className="projects">
            <h2>All Progects</h2>
            <div className="add-btn-wrapper">
                <div className="add-new-project-btn">
                    <Link to={"/admin/profile/new"}>
                        <img src="/imgs/add.png" alt="" style={{ width: "25px", height: "25px" }} />
                        <span> Add New Project</span>
                    </Link>
                </div>
            </div>



            <motion.div
                className="projects-list"
                variants={container}
                initial="hidden"
                animate="show"
                >
                { houses.map((h) => {
                    const mainImage = h.images?.find(img => img.isMain) || h.images?.[0];
                    const imageSrc = mainImage ? `${API}/uploads/${mainImage.imageUrl}` : `${API}/uploads/noPhoto.jpg`;



                    return (
                        <motion.div
                    className="project-card"
                    variants={item}
                    initial="hidden"
                    animate="show"
                    key={h.id}
                    style={{ cursor: "pointer" }}>
                            <img src={imageSrc} alt={h.title} />
                            <div className="projec-info">
                                <h3>{h.title}</h3>
                                <p>Year: {h.year} / Area: {h.area}m<sup>2</sup> </p>
                                <p>Description: {h.description}</p>
                                <span>Category: {h.category?.name || "—"}</span>
                            </div>

                            <button className="edit-project-btn" onClick={() => navigate(`/admin/profile/${h.id}`)} type="button">
                                <img src="/imgs/edit.png" alt="Delete" style={{width:'20px', height:'20px'}} />
                            </button>

                            <button className="remove-project-btn" onClick={() => openDeleteModal(h.id, h.title)} type="button">
                                <img src="/imgs/bin.png" alt="Delete" style={{width:'20px', height:'20px'}} />
                            </button>


                        </motion.div>
                    );
                })}
                {deleteModal.open && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <h2>Delete Project</h2>

                            <p>
                                Are you sure you want to delete:
                            </p>

                            <h3 style={{ color: "red" }}>
                                {deleteModal.title}
                            </h3>

                            <p>
                                enter the title to confirm:
                            </p>

                            <input
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="Введіть назву"
                            />

                            <div className="modal-actions">
                                <button onClick={() =>
                                    setDeleteModal({ open: false, id: null, title: "" })
                                }>
                                    Cancel
                                </button>

                                <button
                                    className="danger"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );



}