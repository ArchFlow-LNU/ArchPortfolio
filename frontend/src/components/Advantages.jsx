import "../css/Advantages.css"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Advantages() {

    // return (
    //     <section className="advantages">
    //         <div className="container">
    //
    //             <h2 className="advantages-title">
    //                 Переваги нашої компанії
    //             </h2>
    //
    //             <div className="advantages-grid">
    //
    //                 {/* 1 */}
    //                 <div className="adv-image">
    //                     <img src="/imgs/adv1.png" alt="" />
    //                 </div>
    //
    //                 {/* 2 */}
    //                 <div className="adv-card">
    //                     <h3>Індивідуальний підхід</h3>
    //                     <p>
    //                         кожен проект розробляється з урахуванням потреб клієнта,
    //                         особливостей ділянки та побажань щодо стилю.
    //                     </p>
    //                 </div>
    //
    //                 {/* 3 */}
    //                 <div className="adv-card">
    //                     <h3>Сучасні архітектурні рішення</h3>
    //                     <p>
    //                         ми використовуємо актуальні тенденції дизайну та
    //                         функціональні планувальні рішення.
    //                     </p>
    //                 </div>
    //
    //                 {/* 4 */}
    //                 <div className="adv-card">
    //                     <h3>Якість і увага до деталей</h3>
    //                     <p>
    //                         контролюємо всі етапи роботи, щоб забезпечити
    //                         високий рівень виконання проекту.
    //                     </p>
    //                 </div>
    //
    //                 {/* 5 */}
    //                 <div className="adv-card">
    //                     <h3>Комплексний підхід</h3>
    //                     <p>
    //                         супроводжуємо проект від ідеї та проектування
    //                         до фінальної реалізації.
    //                     </p>
    //                 </div>
    //
    //                 {/* 6 */}
    //                 <div className="adv-card">
    //                     <h3>Естетика та практичність</h3>
    //                     <p>
    //                         створюємо простори, які поєднують красу,
    //                         комфорт і зручність для життя.
    //                     </p>
    //                 </div>
    //
    //             </div>
    //         </div>
    //     </section>
    // )

    const [advantages, setAdvantages] = useState([]);
    const API = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${API}/api/advantages`)
            .then(res => setAdvantages(res.data))
            .catch(err => console.log(err));
    }, []);

    if (!advantages.length) return <p>Loading...</p>;

    return (
        <section className="advantages">
            <div className="container">

                <h2 className="advantages-title">
                    Переваги нашої компанії
                </h2>

                <div className="advantages-grid">

                    {advantages.map((a, index) => {

                        // перший — картинка
                        if (index === 0 && a.image) {
                            return (
                                <>
                                    <div className="adv-image" key={a.id + "-img"}>
                                        <img src={`${API}${a.image}`} alt="" />
                                    </div>

                                    <div className="adv-card" key={a.id}>
                                        <h3>{a.title}</h3>
                                        <p>{a.description}</p>
                                    </div>
                                </>
                            );
                        }

                        // решта — карточки
                        return (
                            <div key={a.id} className="adv-card">
                                <h3>{a.title}</h3>
                                <p>{a.description}</p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    )
}