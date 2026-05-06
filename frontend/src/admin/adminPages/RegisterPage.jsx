import "../adminCss/RegisterPage.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
/*THIS PAGE IS NOT INCLUDE TEMP*/
export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/auth/register", {
                email,
                password
            });


            localStorage.setItem("token", res.data.token);


            navigate("/admin/profile");

        } catch (err) {
            console.log("ERROR FULL:", err);
            console.log("RESPONSE:", err.response);
            console.log("DATA:", err.response?.data);

            if (err.response) {
                if (err.response.status === 400) {
                    alert(err.response.data || "Користувач вже існує");
                } else if (err.response.status === 500) {
                    alert("Помилка сервера");
                } else {
                    alert("Щось пішло не так");
                }
            } else {
                alert("Немає зʼєднання з сервером");
            }
        }
    };

    return (
        <div className="register-page">
            <div className="wrapper2">
                <h1 className="h1">Register</h1>

                <form className="register-form" onSubmit={handleRegister}>
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

                    <button className="register-btn">Register</button>
                </form>
            </div>
        </div>
    )
}