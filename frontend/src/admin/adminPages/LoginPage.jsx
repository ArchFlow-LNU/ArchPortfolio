import "../adminCss/LoginPage.css"
import {Link} from "react-router-dom";


export default function LoginPage(){
    return (
        <div className="login-page">
        <div className="wrapper">
            <h1 className="h1">Login </h1>

                <form action="" className="login-form">
                    <input type="email" placeholder="input your emain"/>
                    <input type="password" placeholder="input your password"/>
                </form>
            <button className="login-btn">Login</button>
            <div className="register">
                <p>Don't have an account?</p>
                <Link to={"/admin/register"} className="register-link">Register</Link>
            </div>

        </div>
        </div>
    )
}