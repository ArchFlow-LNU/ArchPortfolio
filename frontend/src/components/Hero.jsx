
import "../css/Hero.css"
export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <h1>Архітектурне бюро в Україні</h1>
                <p>
                    Архітектурно-будівельна компанія спеціалізується
                    на проєктуванні різних типів будівель і
                    надає повний спектр проєктних та ремонтно-будівельних
                    послуг — від розробки концепції до реалізації об’єктів.
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