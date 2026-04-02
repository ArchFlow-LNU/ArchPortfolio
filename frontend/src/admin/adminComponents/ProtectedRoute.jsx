import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    // якщо токена нема
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    // пробуємо розпарсити токен (щоб не впасти)
    try {
        JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        // токен кривий → видаляємо і на логін
        localStorage.removeItem("token");
        return <Navigate to="/admin/login" replace />;
    }

    // все ок — пускаємо
    return children;
}