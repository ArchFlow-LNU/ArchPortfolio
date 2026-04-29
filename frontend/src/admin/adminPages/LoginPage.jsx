import { useState } from "react";
import "../adminCss/LoginPage.css";
import {  useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

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
            const res = await api.post("/api/auth/login", form);
            localStorage.setItem("token", res.data.token);
            // alert("Login success");
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
            <div className="leftAndRight">
                <div className="instructions">
                    {/*<img className='admin' src="/imgs/administrator.png" alt="" style={{width:'45px'}} />*/}
                    <h2>The admin panel is designed to manage the content of an architectural firm's website. </h2>
                </div>
                <div className="wrapper">
                    <img className='astericks' src="/imgs/asterisk.png" alt=""  style={{width:'45px', height:'45px'}} />
                    <h2 className="h2">Get Started Now</h2>
                    <h3 style={{margin:'0', opacity:'0.5'}}>Please log in to your account to continue</h3>
                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <label > <b>Email address</b></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="   ✉ Email "
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <label><b>Password</b></label>
                        <input
                            type="password"
                            name="password"
                            placeholder="   👁 Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </form>
                    <button className="login-btn" onClick={handleLogin} disabled={loading}>
                        {loading ? "Logging in..." : "Get Started"}
                    </button>

                </div>
            </div>

        </div>
    );
}