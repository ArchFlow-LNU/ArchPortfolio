import "../css/FAQ.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {

    // const [openIndex, setOpenIndex] = useState(null);
    //
    // const faqs = [
    //     {
    //         question: "Скільки часу займає розробка проекту будинку?",
    //         answer: "Залежно від складності проекту, розробка може тривати від 2 до 6 тижнів."
    //     },
    //     {
    //         question: "Чи можна змінити проект під власні потреби?",
    //         answer: "Так, ми адаптуємо проект відповідно до ваших побажань і особливостей ділянки."
    //     },
    //     {
    //         question: "Чи допомагаєте ви з вибором дизайну будинку?",
    //         answer: "Так, ми пропонуємо сучасні дизайнерські рішення та допомагаємо обрати оптимальний стиль."
    //     }
    // ];
    //
    // const toggle = (index) => {
    //     setOpenIndex(openIndex === index ? null : index);
    // };
    //
    // return (
    //     <section className="faq">
    //         <div className="container">
    //
    //             <h2 className="faq-title">
    //                 Часто запитувані питання
    //             </h2>
    //
    //             {faqs.map((item, index) => (
    //                 <div key={index} className="faq-item">
    //
    //                     <div
    //                         className="faq-question"
    //                         onClick={() => toggle(index)}
    //                     >
    //                         <span>{item.question}</span>
    //                         <span className="faq-icon">
    //                             {openIndex === index ? "−" : "+"}
    //                         </span>
    //                     </div>
    //
    //                     {openIndex === index && (
    //                         <div className="faq-answer">
    //                             {item.answer}
    //                         </div>
    //                     )}
    //
    //                 </div>
    //             ))}
    //
    //         </div>
    //     </section>
    // );

    const [openIndex, setOpenIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);

    const API = "http://localhost:5000";

    useEffect(() => {
        axios.get(`${API}/api/faq`)
            .then(res => setFaqs(res.data))
            .catch(err => console.log(err));
    }, []);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs.length) return null;

    return (
        <section className="faq">
            <div className="container">

                <h2 className="faq-title">
                    Часто запитувані питання
                </h2>

                {faqs.map((item, index) => (
                    <div key={item.id} className="faq-item">

                        <div
                            className="faq-question"
                            onClick={() => toggle(index)}
                        >
                            <span>{item.question}</span>
                            <span className="faq-icon">
                                {openIndex === index ? "−" : "+"}
                            </span>
                        </div>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    className="faq-answer"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {item.answer}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                ))}

            </div>
        </section>
    );
}