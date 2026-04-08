import { useState } from "react";
import axios from "axios";
import "../adminCss/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(){

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.type === "email" ? "email" : "password"]: e.target.value
        });
    };

    const handleLogin = () => {
        axios.post("http://localhost:5000/api/auth/login", form)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                alert("Login success");

                navigate("/admin/reviews"); // перекид на адмінку
            })
            .catch(err => {
                console.log(err);
                alert("Login failed");
            });
    };

    return (
        <div className="login-page">
            <div className="wrapper">

                <h1 className="h1">Login</h1>

                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="input your email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input 
                        type="password" 
                        placeholder="input your password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </form>

                <button className="login-btn" onClick={handleLogin}>
                    Login
                </button>

                <div className="register">
                    <p>Don't have an account?</p>
                    <Link to={"/admin/register"} className="register-link">
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
}