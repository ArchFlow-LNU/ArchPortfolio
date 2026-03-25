import "../css/HouseVariants.css";
import { useNavigate } from "react-router-dom";

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

            <div className="house-grid">

                {houses.map((h) => (
                    <div 
                        className="house-card" 
                        key={h.id}
                        onClick={() => navigate(`/house/${h.id}`)}
                        style={{ cursor: "pointer" }}
                    >

                        <img src={h.img} alt={h.title} />

                        <div className="house-info">
                            <h3>{h.title}</h3>
                            <p>{h.desc}</p>
                            <span>Стиль: {h.style}</span>
                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}