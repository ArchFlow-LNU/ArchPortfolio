import "../adminCss/RegisterPage.css";

export default function RegisterPage() {
    return (
        <div className="register-page">
            <div className="register-wrapper">

                <h1 className="register-title">Реєстрація</h1>

                <form className="register-form">

                    <input type="text" placeholder="Введіть ваше ім’я" />
                    <input type="email" placeholder="Введіть електронну пошту" />
                    <input type="password" placeholder="Введіть пароль" />

                    <button className="register-btn">
                        Зареєструватися
                    </button>

                </form>

            </div>
        </div>
    );
}