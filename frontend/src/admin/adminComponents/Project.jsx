import "../adminCss/Projects.css";

export default function Project({ title, img, desc, style }) {
    return (
        <div className="project-card">

            <img src={img} alt={title} />

            <div className="project-info">
                <h3>{title}</h3>
                <p>{desc}</p>
                <span>Стиль: {style}</span>
            </div>

        </div>
    );
}