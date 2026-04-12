import "../adminCss/Menu.css"
import { NavLink, useNavigate} from "react-router-dom";
export default function Menu(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <div className="admin-menu">
            <div className="admin-menu-icon" >
                <img src="/imgs/administrator.png" alt="" style={{width:"45px"}} />
                <span>AdminPanel</span>
            </div>

            <nav className='nav-links'>

                <NavLink to="/admin/profile/new">
                    <img src="/imgs/add.png" alt="" style={{width:"25px",  padding:"0px", margin:"0px"}}/>
                    <span>Project</span></NavLink>
                <NavLink to="/admin/reviews">
                    <img src="/imgs/review.png" alt="" style={{width:"25px",  padding:"0px", margin:"0px"}} />
                    <span>Reviews</span>
                </NavLink>
                <NavLink to="/admin/profile" end>
                    <img src="/imgs/layers.png" alt="" style={{width:"25px",  padding:"0px", margin:"0px"}}/>
                    <span>Projects</span>
                </NavLink>
            </nav>

            <div className="account">
                <button onClick={handleLogout}>
                    <img src="/imgs/logout.png" alt="" style={{width:"25px", padding:"0px", margin:"0px", filter:'brightness(0) invert(1)'}} />
                    <p>Logout</p>
                </button>
            </div>
        </div>
    )
}