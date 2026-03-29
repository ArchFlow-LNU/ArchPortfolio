import "../adminCss/LoginPage.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="wrapper">

                <h1 className="h1">Вхід</h1>

                <form className="login-form">

                    <input 
                        type="email" 
                        placeholder="Введіть електронну пошту"
                        autoComplete="email"
                    />

                    <input 
                        type="password" 
                        placeholder="Введіть пароль"
                        autoComplete="current-password"
                    />

                    <button className="login-btn">
                        Увійти
                    </button>

                </form>

                <div className="register">
                    <p>Ще не маєте акаунта?</p>

                    <Link to="/admin/register" className="register-link">
                        Зареєструватися
                    </Link>
                </div>

            </div>
        </div>
    );
}