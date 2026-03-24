import "../adminCss/RegisterPage.css"
export default function RegisterPage() {
    return (
        <div className="register-page">
            <div className="wrapper2">
                <h1 className="h1">Register</h1>

                <form action="" className="register-form">
                    <input type="text" placeholder="enter your name"/>
                    <input type="email" placeholder="input your emain"/>
                    <input type="password" placeholder="input your password"/>
                </form>
                <button className="register-btn">Register</button>

            </div>
        </div>
    )
}