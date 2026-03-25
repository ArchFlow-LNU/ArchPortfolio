import "../css/HouseVariants.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HouseVariants() {

    const navigate = useNavigate();

    const houses = [
        {
            id: 1,
            title: "Мінімалістичний будинок",
            img: "/imgs/house1.png",
            desc: "Сучасний будинок із простими формами, панорамними вікнами та відкритим простором.",
            style: "Мінімалізм"
        },
        {
            id: 2,
            title: "Міська резиденція",
            img: "/imgs/house2.png",
            desc: "Сучасний житловий комплекс для комфортного життя в місті.",
            style: "Сучасний"
        },
        {
            id: 3,
            title: "Клубний будинок",
            img: "/imgs/house3.png",
            desc: "Елегантний будинок із класичними елементами та сучасним плануванням.",
            style: "Сучасний / Преміум"
        }
    ];

    return (
        <section className="houses">
            <h2>Варіанти будинків</h2>

            <motion.div
                className="house-grid"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
            >
                {houses.map((h) => (
                    <motion.div
                        className="house-card"
                        key={h.id}
                        onClick={() => navigate(`/house/${h.id}`)}
                        style={{ cursor: "pointer" }}

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
                        <img src={h.img} alt={h.title} />

                        <div className="house-info">
                            <h3>{h.title}</h3>
                            <p>{h.desc}</p>
                            <span>Стиль: {h.style}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );




}