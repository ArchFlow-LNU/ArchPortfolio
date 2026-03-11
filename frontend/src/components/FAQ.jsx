export default function FAQ() {

    const questions = [
        "How long does construction take?",
        "What materials are used?",
        "Is there a warranty?"
    ]

    return (
        <section className="faq">

            <h2>Frequently Asked Questions</h2>

            {questions.map((q,i)=>(
                <div className="faq-item" key={i}>
                    {q}
                </div>
            ))}

        </section>
    )
}