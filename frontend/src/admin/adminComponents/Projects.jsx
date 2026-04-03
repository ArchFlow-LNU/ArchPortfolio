// import "../adminCss/Projects.css"
// export default function Projects() {
//
//     const houses = [
//         {
//             title: "Мінімалістичний будинок",
//             img: "/imgs/house1.png",
//             desc: "Сучасний будинок із простими формами, панорамними вікнами та відкритим простором.",
//             style: "Мінімалізм"
//         },
//         {
//             title: "Міська резиденція",
//             img: "/imgs/house2.png",
//             desc: "Сучасний житловий комплекс для комфортного життя в місті.",
//             style: "Сучасний"
//         },
//         {
//             title: "Клубний будинок",
//             img: "/imgs/house3.png",
//             desc: "Елегантний будинок із класичними елементами та сучасним плануванням.",
//             style: "Сучасний / Преміум"
//         }, {
//             title: "Мінімалістичний будинок",
//             img: "/imgs/house1.png",
//             desc: "Сучасний будинок із простими формами, панорамними вікнами та відкритим простором.",
//             style: "Мінімалізм"
//         },
//         {
//             title: "Міська резиденція",
//             img: "/imgs/house2.png",
//             desc: "Сучасний житловий комплекс для комфортного життя в місті.",
//             style: "Сучасний"
//         },
//         {
//             title: "Клубний будинок",
//             img: "/imgs/house3.png",
//             desc: "Елегантний будинок із класичними елементами та сучасним плануванням.",
//             style: "Сучасний / Преміум"
//         }, {
//             title: "Мінімалістичний будинок",
//             img: "/imgs/house1.png",
//             desc: "Сучасний будинок із простими формами, панорамними вікнами та відкритим простором.",
//             style: "Мінімалізм"
//         },
//         {
//             title: "Міська резиденція",
//             img: "/imgs/house2.png",
//             desc: "Сучасний житловий комплекс для комфортного життя в місті.",
//             style: "Сучасний"
//         },
//         {
//             title: "Клубний будинок",
//             img: "/imgs/house3.png",
//             desc: "Елегантний будинок із класичними елементами та сучасним плануванням.",
//             style: "Сучасний / Преміум"
//         }, {
//             title: "Мінімалістичний будинок",
//             img: "/imgs/house1.png",
//             desc: "Сучасний будинок із простими формами, панорамними вікнами та відкритим простором.",
//             style: "Мінімалізм"
//         },
//         {
//             title: "Міська резиденція",
//             img: "/imgs/house2.png",
//             desc: "Сучасний житловий комплекс для комфортного життя в місті.",
//             style: "Сучасний"
//         },
//         {
//             title: "Клубний будинок",
//             img: "/imgs/house3.png",
//             desc: "Елегантний будинок із класичними елементами та сучасним плануванням.",
//             style: "Сучасний / Преміум"
//         }
//     ]
//
//     return (
//         <section className="projects">
//
//             <h2>Варіанти будинків</h2>
//
//             <div className="projects-list">
//
//                 {houses.map((h, i) => (
//                     <div className="project-card" key={i}>
//
//                         <img src={h.img} alt={h.title} />
//
//                         <div className="projec-info">
//                             <h3>{h.title}</h3>
//                             <p>{h.desc}</p>
//                             <span>Стиль: {h.style}</span>
//                         </div>
//
//                     </div>
//                 ))}
//
//             </div>
//
//         </section>
//     )
// }


// import "../adminCss/Projects.css";
// import Project from "./Project";
//
// export default function Projects() {
//
//     const houses = [
//         {
//             title: "Мінімалістичний будинок",
//             img: "/imgs/house1.png",
//             desc: "Сучасний будинок із простими формами...",
//             style: "Мінімалізм"
//         },
//         {
//             title: "Міська резиденція",
//             img: "/imgs/house2.png",
//             desc: "Сучасний житловий комплекс...",
//             style: "Сучасний"
//         },
//         {
//             title: "Клубний будинок",
//             img: "/imgs/house3.png",
//             desc: "Елегантний будинок...",
//             style: "Сучасний / Преміум"
//         }
//     ];
//
//     return (
//         <section className="projects">
//
//             <h2>Варіанти будинків</h2>
//
//             <div className="projects-list">
//                 {houses.map((h, i) => (
//                     <Project
//                         key={i}
//                         title={h.title}
//                         img={h.img}
//                         desc={h.desc}
//                         style={h.style}
//                     />
//                 ))}
//             </div>
//
//         </section>
//     );
// }


import "../adminCss/Projects.css";
import Project from "./Project";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Projects() {

    const [projects, setProjects] = useState([]);
    const API = "http://localhost:5000";

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await api.get("/api/projects");
                setProjects(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchProjects();
    }, []);

    return (
        <section className="projects">

            <h2>Варіанти будинків</h2>

            <div className="projects-list">
                {projects.map((p) => (
                    <Project
                        key={p.id}
                        title={p.title}
                        img={
                            p.images?.[0]?.imageUrl
                                ? `${API}${p.images[0].imageUrl}`
                                : "/imgs/placeholder.png"
                        }
                        desc={p.description}
                        style={p.category?.name || "—"}
                    />
                ))}
            </div>

        </section>
    );
}