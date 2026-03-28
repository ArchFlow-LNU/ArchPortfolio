
import "../css/Hero.css"
export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <h1>Architecture Firm in Ukraine</h1>
                <p>
                    Проєктування, будівництво та реалізація
                </p>

                <div className="hero-stats">

                    <div className="stat">
                        <h2>250+</h2>
                        <p>збудованих будинків</p>
                    </div>

                    <div className="stat">
                        <h2>25</h2>
                        <p>проєктів</p>
                    </div>

                    <div className="stat">
                        <h2>100%</h2>
                        <p>задоволених клієнтів</p>
                    </div>

                </div>

            </div>

        </section>
    )
}