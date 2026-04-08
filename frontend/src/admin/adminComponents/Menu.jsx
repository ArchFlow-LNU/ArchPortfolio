import "../adminCss/Menu.css"
import {Link, useNavigate} from "react-router-dom";
export default function Menu(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <div className="admin-menu">
            <Link to={"/admin/profile/new"}>New Project Add</Link>
            <Link to={"/admin/reviews"}>Reviews</Link>
            <Link to={"/admin/profile"}>Projects</Link>
            <div className="account">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}