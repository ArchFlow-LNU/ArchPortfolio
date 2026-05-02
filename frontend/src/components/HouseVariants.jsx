import "../css/HouseVariants.css"
import {useState, useEffect} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function HouseVariants() {



    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const API = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${API}/api/projects`)
            .then(res => setProjects(res.data))
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

    const next = () => {
        if (index < projects.length - visibleCount) {
            setIndex(prev => prev + 1);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(prev => prev - 1);
        }
    };

    return (
        // <section className="houses">
        //
        //     <h2>Варіанти будинків</h2>
        //
        //     <motion.div
        //         className="house-grid"
        //         initial="hidden"
        //         animate="visible"
        //         variants={{
        //             hidden: {},
        //             visible: {
        //                 transition: {
        //                     staggerChildren: 0.2
        //                 }
        //             }
        //         }}
        //     >
        //         {projects.map((h) => {
        //             //const mainImage = h.images?.find(img => img.isMain);
        //             const mainImage = h.images?.find(img => img.isMain) || h.images?.[0];
        //
        //             return (
        //                 <motion.div
        //                     className="house-card"
        //                     key={h.id}
        //                     onClick={() => navigate(`/house/${h.id}`)}
        //                     style={{ cursor: "pointer" }}
        //
        //                     variants={{
        //                         hidden: {
        //                             opacity: 0,
        //                             y: 40,
        //                             scale: 0.95
        //                         },
        //                         visible: {
        //                             opacity: 1,
        //                             y: 0,
        //                             scale: 1
        //                         }
        //                     }}
        //
        //                     transition={{
        //                         duration: 0.2,
        //                         ease: "easeOut"
        //                     }}
        //
        //                     whileHover={{
        //                         y: -8,
        //                         scale: 1.03
        //                     }}
        //                 >
        //
        //                     {/*<img*/}
        //                     {/*    src={*/}
        //                     {/*        h.images?.length*/}
        //                     {/*            ? `${API}/uploads/${mainImage?.imageUrl || h.images[0].imageUrl}`*/}
        //                     {/*            : "/imgs/house1.png"*/}
        //                     {/*    }*/}
        //                     {/*    alt={h.title}*/}
        //                     {/*/>*/}
        //
        //                     <img
        //                         src={
        //                             mainImage
        //                                 ? `${API}${mainImage.imageUrl}`
        //                                 : "/imgs/house1.png"
        //                         }
        //                         alt={h.title}
        //                     />
        //
        //
        //
        //                     <div className="house-info">
        //                         <h3>{h.title}</h3>
        //                         <p>{h.description}</p>
        //                         <span>
        //                             Стиль: {h.category?.name || "—"}
        //                         </span>
        //                     </div>
        //
        //                 </motion.div>
        //             );
        //         })}
        //     </motion.div>
        //
        // </section>


        <section className="houses">

            <h2>Варіанти будинків</h2>

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
                        const mainImage = h.images?.find(img => img.isMain) || h.images?.[0];
                        const imageSrc = mainImage ? `${API}${mainImage.imageUrl}` : `${API}/uploads/noPhoto.jpg`;


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

                                <img src={imageSrc} alt={h.title} />

                                <div className="house-info">
                                    <h3>{h.title}</h3>
                                    <p>{h.description}</p>
                                    <span>Стиль: {h.category?.name || "—"}</span>
                                </div>

                            </motion.div>
                        );
                    })}

                </motion.div>

                <div className="slider-controls">
                    <button onClick={prev}>←</button>
                    <button onClick={next}>→</button>
                </div>

            </div>

        </section>
    );
}