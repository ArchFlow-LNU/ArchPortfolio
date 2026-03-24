import "../css/Advantages.css"
export default function Advantages() {

    return (
        <section className="advantages">
            <div className="container">

                <h2 className="advantages-title">
                    Переваги нашої компанії
                </h2>

                <div className="advantages-grid">

                    {/* 1 */}
                    <div className="adv-image">
                        <img src="/imgs/adv1.png" alt="" />
                    </div>

                    {/* 2 */}
                    <div className="adv-card">
                        <h3>Індивідуальний підхід</h3>
                        <p>
                            кожен проект розробляється з урахуванням потреб клієнта,
                            особливостей ділянки та побажань щодо стилю.
                        </p>
                    </div>

                    {/* 3 */}
                    <div className="adv-card">
                        <h3>Сучасні архітектурні рішення</h3>
                        <p>
                            ми використовуємо актуальні тенденції дизайну та
                            функціональні планувальні рішення.
                        </p>
                    </div>

                    {/* 4 */}
                    <div className="adv-card">
                        <h3>Якість і увага до деталей</h3>
                        <p>
                            контролюємо всі етапи роботи, щоб забезпечити
                            високий рівень виконання проекту.
                        </p>
                    </div>

                    {/* 5 */}
                    <div className="adv-card">
                        <h3>Комплексний підхід</h3>
                        <p>
                            супроводжуємо проект від ідеї та проектування
                            до фінальної реалізації.
                        </p>
                    </div>

                    {/* 6 */}
                    <div className="adv-card">
                        <h3>Естетика та практичність</h3>
                        <p>
                            створюємо простори, які поєднують красу,
                            комфорт і зручність для життя.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}