import React from "react";
import {Link} from "react-router-dom";

const Menu = ({menu}) => {
    return (
        <nav className="two">
            <ul>
                <li><Link to='/'>Users</Link></li>
                <li><Link to='/project'>Projects</Link></li>
                <li><Link to='/todo'>ToDo</Link></li>
            </ul>
        </nav>


    )
}

export default Menu