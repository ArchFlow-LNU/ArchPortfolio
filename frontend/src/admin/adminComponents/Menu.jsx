import "../adminCss/Menu.css"
export default function Menu(){
    return (
        <div className="admin-menu">
           <div>ArchFlow</div>
            <div>This is a panel for admin with DB access and operations </div>
            <div className="account">
                <p>Logged in as ... </p>
                <button className="logout">Logout</button>
            </div>
        </div>
    )
}