import "../css/Steps.css"


export default function Steps() {
    return (
        <section className="steps">
            <div className="container">

                <h2 className="steps-title">Етапи роботи</h2>

                <div className="steps-grid">

                    {/* 1 рядок */}
                    <div className="step step-big">
                        <h3>Проектування</h3>
                        <p>
                            На цьому етапі створюється концепція майбутнього будинку,
                            розробляється планування, архітектурні рішення та візуалізації.
                            Враховуються побажання клієнта, особливості ділянки та функціональність простору.
                        </p>
                    </div>

                    <div className="step-image">
                        <img src="/imgs/step1.png" alt=""/>
                    </div>

                    {/* 2 рядок */}
                    <div className="step-image">
                        <img src="/imgs/step2.png" alt=""/>
                    </div>

                    <div className="step">
                        <h3>Виготовлення</h3>
                        <p>
                            Після затвердження проекту розпочинається реалізація і виготовлення
                            необхідних конструкцій та елементів. Контролюється якість матеріалів
                            і відповідність усіх робіт затвердженому проекту.
                        </p>
                    </div>

                    <div className="step">
                        <h3>Фінальні роботи</h3>
                        <p>
                            На завершальному етапі проводяться оздоблювальні та завершальні роботи.
                            Перевіряється якість виконання, після чого об’єкт повністю готовий до використання.
                        </p>
                    </div>

                </div>
            </div>

        </section>
    )


}