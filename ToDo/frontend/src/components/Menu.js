import React from "react";
import {Link} from "react-router-dom";

const Menu = ({is_authenticated, logout}) => {
    return (
        <nav className="two">
            <ul>
                <li><Link to='/'>Users</Link></li>
                <li><Link to='/projects'>Projects</Link></li>
                <li><Link to='/todos'>ToDo</Link></li>
                <li> {is_authenticated ? <Link onClick={logout}>Logout</Link> :<Link to='/login'>Login</Link>}
                </li>
            </ul>
        </nav>
    )
}
export default Menu