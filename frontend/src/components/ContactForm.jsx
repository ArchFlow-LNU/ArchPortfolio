export default function ContactForm() {
    return (
        <section className="contact">

            <h2>Not home yet?</h2>

            <form className="form">

                <input placeholder="Name"/>
                <input placeholder="Phone"/>
                <textarea placeholder="Comment"/>

                <button>Отправить</button>

            </form>

        </section>
    )
}