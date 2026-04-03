import Menu from "../adminComponents/Menu.jsx";
import Projects from "../adminComponents/Projects.jsx";
import "../adminCss/ProfilePage.css"
import Header from "../adminComponents/Header.jsx";
export default function ProfilePage() {
    return (
        <div className="profile-page">
            <Header title="Projects" />
            <div><Menu></Menu></div>
            <div> <Projects></Projects></div>

        </div>
    )
}