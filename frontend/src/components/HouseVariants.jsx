export default function HouseVariants() {

    const houses = [
        {title:"House Modern", img:"/imgs/0 22_17_42.png"},
        {title:"kjfewjf", img:"/imgs/0 22_17_42.png"},
        {title:"fewwfef", img:"/imgs/0 22_17_42.png"}
    ]

    return (
        <section className="houses">

            <h2>House Variants</h2>

            <div className="house-grid">

                {houses.map((h,i)=>(
                    <div className="house-card" key={i}>

                        <img src={h.img} alt="" />

                        <p>{h.title}</p>

                    </div>
                ))}

            </div>

        </section>
    )
}