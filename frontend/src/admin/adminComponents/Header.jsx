import "../adminCss/Header.css";
import {useEffect, useState} from "react";
import api from "../../api/axios.js";

export default function Header({ title = "Dashboard" }) {
    // const email = "admin@email.com"; // потім з auth
    const [email, setEmail] = useState("loading...");

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("/api/auth/me");
                setEmail(res.data.email);
            } catch (err) {
                console.error(err);
                setEmail("unknown");
            }
        }

        fetchUser();
    }, []);

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
    }

    return (
        <div className="header">
            <div className="left">
                <h2>ArchFlow Admin</h2>
                <span>{title}</span>
            </div>

            <div className="right">
                <span>{email}</span>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}