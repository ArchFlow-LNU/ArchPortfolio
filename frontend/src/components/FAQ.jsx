import "../css/FAQ.css"
import { useState } from "react";

export default function FAQ() {

    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Скільки часу займає розробка проекту будинку?",
            answer: "Залежно від складності проекту, розробка може тривати від 2 до 6 тижнів."
        },
        {
            question: "Чи можна змінити проект під власні потреби?",
            answer: "Так, ми адаптуємо проект відповідно до ваших побажань і особливостей ділянки."
        },
        {
            question: "Чи допомагаєте ви з вибором дизайну будинку?",
            answer: "Так, ми пропонуємо сучасні дизайнерські рішення та допомагаємо обрати оптимальний стиль."
        }
    ];

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq">
            <div className="container">

                <h2 className="faq-title">
                    Часто запитувані питання
                </h2>

                {faqs.map((item, index) => (
                    <div key={index} className="faq-item">

                        <div
                            className="faq-question"
                            onClick={() => toggle(index)}
                        >
                            <span>{item.question}</span>
                            <span className="faq-icon">
                                {openIndex === index ? "−" : "+"}
                            </span>
                        </div>

                        {openIndex === index && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}

                    </div>
                ))}

            </div>
        </section>
    );
}