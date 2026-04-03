// import "../adminCss/LoginPage.css"
// import {Link} from "react-router-dom";
//
//
// export default function LoginPage(){
//     return (
//         <div className="login-page">
//         <div className="wrapper">
//             <h1 className="h1">Login </h1>
//
//                 <form action="" className="login-form">
//                     <input type="email" placeholder="input your emain"/>
//                     <input type="password" placeholder="input your password"/>
//                 </form>
//             <button className="login-btn">Login</button>
//             <div className="register">
//                 <p>Don't have an account?</p>
//                 <Link to={"/admin/register"} className="register-link">Register</Link>
//             </div>
//
//         </div>
//         </div>
//     )
// }
import "../adminCss/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post("/api/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            navigate("/admin/profile");

        } catch (err) {
            alert("Неправильний логін або пароль");
        }
    }

    return (
        <div className="login-page">
            <div className="wrapper">

                <h1 className="h1">Login</h1>

                <form className="login-form" onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="input your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="input your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="login-btn">Login</button>

                </form>

                <div className="register">
                    <p>Don't have an account?</p>
                    <Link to="/admin/register" className="register-link">
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
}