export default function Advantages() {

    const items = [
        "Time savings",
        "High quality",
        "Thoughtful design",
        "Energy efficiency"
    ]

    return (
        <section className="advantages">

            <h2>Advantages of our company</h2>

            <div className="adv-grid">

                {items.map((a,i)=>(
                    <div className="adv-card" key={i}>
                        {a}
                    </div>
                ))}

            </div>

        </section>
    )
}