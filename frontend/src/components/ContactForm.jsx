import "../css/ContactForm.css"
export default function ContactForm() {
    return (
        <section className="contact">
            <div className="container">

                <div className="contact-overlay">



                    <h2 className="contact-title">
                        Плануєте будівництво будинку?
                    </h2>

                    <p className="contact-subtitle">
                        Заповніть форму, і наша команда зв’яжеться з вами
                    </p>

                    <form className="contact-form">

                        <input type="text" placeholder="Ваше ім’я" />
                        <input type="text" placeholder="Ваш номер телефону" />
                        <input type="email" placeholder="Ваша електронна пошта" />
                        <textarea placeholder="Коротко опишіть ваш проект або побажання"></textarea>

                        <button className="btn-dark">
                            Надіслати заявку
                        </button>

                        <p className="contact-note">
                            Ми зв’яжемося з вами найближчим часом для обговорення деталей проекту.
                        </p>

                    </form>

                </div>

            </div>

        </section>
    )
}