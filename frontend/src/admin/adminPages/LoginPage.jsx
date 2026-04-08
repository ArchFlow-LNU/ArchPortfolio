import { useState } from "react";

import "../adminCss/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios.js";

export default function LoginPage(){

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleLogin =async () => {
        try{
            setLoading(true);
            const res = await API.post("/api/auth/login", form);
            localStorage.setItem("token", res.data.token);
            alert("Login success");
            navigate("/admin/reviews");
        }catch(err){

            console.error(err);
            alert(err.response?.data || "Login failed");
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="login-page">
            <div className="wrapper">
                <h1 className="h1">Login</h1>
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </form>
                <button className="login-btn" onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
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