import "../css/HouseVariants.css"
import {useState, useEffect} from "react";
import api from '../api/axios.js'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function HouseVariants() {

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/api/projects`)
            .then(res => {setProjects(res.data); })
            .catch(err => console.log(err));
    }, []);

    const [index, setIndex] = useState(0);

    const getVisibleCount = () => {
        if (window.innerWidth < 600) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCount());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    return (


        <section className="houses">


            <div className="slider">


                <motion.div
                    className="slider-track"

                    initial="hidden"
                    animate="visible"

                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}

                    style={{
                        transform: `translateX(-${index * (100 / visibleCount)}%)`
                    }}
                >

                    {projects.map((h) => {
                        const mainImage =  h.images?.find(img => img.isMain) || h.images?.[0];
                        const imageSrc = mainImage
                            ? mainImage.imageUrl.startsWith("http")
                                ? mainImage.imageUrl
                                : `${import.meta.env.VITE_API_URL}${mainImage.imageUrl}`
                            : `${import.meta.env.VITE_API_URL}noPhoto.jpg`;
                        console.log(imageSrc);
                        return (
                            <motion.div
                                className="house-card"
                                key={h.id}
                                onClick={() => navigate(`/house/${h.id}`)}

                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 40,
                                        scale: 0.95
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }
                                }}

                                transition={{
                                    duration: 0.2,
                                    ease: "easeOut"
                                }}

                                whileHover={{
                                    y: -8,
                                    scale: 1.03
                                }}
                            >

                                <h2>Варіант Проекту</h2>
                                <img src={imageSrc} alt={h.title} />

                                <div className="house-info-var">
                                    <h3>{h.title}</h3>
                                    <p>{h.description}</p>
                                    <span>Стиль: {h.category?.name || "—"}</span>
                                </div>

                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>

        </section>
    );
}