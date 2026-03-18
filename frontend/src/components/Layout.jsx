import NavBar from './NavBar';
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
        <NavBar></NavBar>
            <Outlet></Outlet>
        </>
    )
}